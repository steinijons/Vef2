/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nls = require("vscode-nls");
const vscode = require("vscode");
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs = require("fs");
const utilities_1 = require("./utilities");
const protocolDetection_1 = require("./protocolDetection");
const processPicker_1 = require("./processPicker");
const childProcesses_1 = require("./childProcesses");
const localize = nls.loadMessageBundle(__filename);
//---- NodeConfigurationProvider
class NodeConfigurationProvider {
    constructor(extensionContext) {
        this.extensionContext = extensionContext;
    }
    /**
     * Returns an initial debug configuration based on contextual information, e.g. package.json or folder.
     */
    provideDebugConfigurations(folder, token) {
        return [createLaunchConfigFromContext(folder, false)];
    }
    /**
     * Try to add all missing attributes to the debug configuration being launched.
     */
    resolveDebugConfiguration(folder, config, token) {
        // if launch.json is missing or empty
        if (!config.type && !config.request && !config.name) {
            config = createLaunchConfigFromContext(folder, true, config);
            if (!config.program) {
                const message = localize(0, null);
                return vscode.window.showInformationMessage(message).then(_ => {
                    return undefined; // abort launch
                });
            }
        }
        // make sure that config has a 'cwd' attribute set
        if (!config.cwd) {
            if (folder) {
                config.cwd = folder.uri.fsPath;
            }
            else if (config.program) {
                // derive 'cwd' from 'program'
                config.cwd = path_1.dirname(config.program);
            }
        }
        // "nvm" support
        if (config.runtimeVersion && config.runtimeVersion !== 'default') {
            // if a runtime version is specified we prepend env.PATH with the folder that corresponds to the version
            if (process.platform === 'win32') {
                const home = process.env['NVM_HOME'];
                if (home) {
                    const bin = path_1.join(home, `v${config.runtimeVersion}`);
                    if (fs.existsSync(bin)) {
                        if (!config.env) {
                            config.env = {};
                        }
                        config.env['Path'] = `${bin};${process.env['Path']}`;
                    }
                    else {
                        return vscode.window.showErrorMessage(localize(1, null, config.runtimeVersion)).then(_ => {
                            return undefined; // abort launch
                        });
                    }
                }
                else {
                    return vscode.window.showErrorMessage(localize(2, null)).then(_ => {
                        return undefined; // abort launch
                    });
                }
            }
            else {
                const dir = process.env['NVM_DIR'];
                if (dir) {
                    const bin = path_1.join(dir, 'versions', 'node', `v${config.runtimeVersion}`, 'bin');
                    if (fs.existsSync(bin)) {
                        if (!config.env) {
                            config.env = {};
                        }
                        config.env['PATH'] = `${bin}:${process.env['PATH']}`;
                    }
                    else {
                        return vscode.window.showErrorMessage(localize(3, null, config.runtimeVersion)).then(_ => {
                            return undefined; // abort launch
                        });
                    }
                }
                else {
                    return vscode.window.showErrorMessage(localize(4, null)).then(_ => {
                        return undefined; // abort launch
                    });
                }
            }
        }
        // is "auto attach child process" mode enabled?
        if (config.autoAttachChildProcesses) {
            childProcesses_1.prepareAutoAttachChildProcesses(config);
        }
        // determine which protocol to use
        return determineDebugType(config).then(debugType => {
            if (debugType) {
                config.type = debugType;
            }
            return this.fixupLogParameters(config);
        });
    }
    fixupLogParameters(config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config.trace && !config.logFilePath) {
                const fileName = config.type === 'node' ?
                    'debugadapter-legacy.txt' :
                    'debugadapter.txt';
                config.logFilePath = path_1.join(yield this.extensionContext.logger.logDirectory, fileName);
            }
            return config;
        });
    }
}
exports.NodeConfigurationProvider = NodeConfigurationProvider;
//---- helpers ----------------------------------------------------------------------------------------------------------------
function createLaunchConfigFromContext(folder, resolve, existingConfig) {
    const config = {
        type: 'node',
        request: 'launch',
        name: localize(5, null)
    };
    if (existingConfig && existingConfig.noDebug) {
        config['noDebug'] = true;
    }
    const pkg = loadJSON(folder, 'package.json');
    if (pkg && pkg.name === 'mern-starter') {
        if (resolve) {
            utilities_1.log(localize(6, null, 'Mern Starter'));
        }
        configureMern(config);
    }
    else {
        let program;
        let useSourceMaps = false;
        if (pkg) {
            // try to find a value for 'program' by analysing package.json
            program = guessProgramFromPackage(folder, pkg, resolve);
            if (program && resolve) {
                utilities_1.log(localize(7, null));
            }
        }
        if (!program) {
            // try to use file open in editor
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const languageId = editor.document.languageId;
                if (languageId === 'javascript' || isTranspiledLanguage(languageId)) {
                    const wf = vscode.workspace.getWorkspaceFolder(editor.document.uri);
                    if (wf === folder) {
                        program = vscode.workspace.asRelativePath(editor.document.uri);
                        if (!path_1.isAbsolute(program)) {
                            program = '${workspaceFolder}/' + program;
                        }
                    }
                }
                useSourceMaps = isTranspiledLanguage(languageId);
            }
        }
        // if we couldn't find a value for 'program', we just let the launch config use the file open in the editor
        if (!resolve && !program) {
            program = '${file}';
        }
        if (program) {
            config['program'] = program;
        }
        // prepare for source maps by adding 'outFiles' if typescript or coffeescript is detected
        if (useSourceMaps || vscode.workspace.textDocuments.some(document => isTranspiledLanguage(document.languageId))) {
            if (resolve) {
                utilities_1.log(localize(8, null));
            }
            let dir = '';
            const tsConfig = loadJSON(folder, 'tsconfig.json');
            if (tsConfig && tsConfig.compilerOptions && tsConfig.compilerOptions.outDir) {
                const outDir = tsConfig.compilerOptions.outDir;
                if (!path_1.isAbsolute(outDir)) {
                    dir = outDir;
                    if (dir.indexOf('./') === 0) {
                        dir = dir.substr(2);
                    }
                    if (dir[dir.length - 1] !== '/') {
                        dir += '/';
                    }
                }
                config['preLaunchTask'] = 'tsc: build - tsconfig.json';
            }
            config['outFiles'] = ['${workspaceFolder}/' + dir + '**/*.js'];
        }
    }
    return config;
}
function loadJSON(folder, file) {
    if (folder) {
        try {
            const path = path_1.join(folder.uri.fsPath, file);
            const content = fs.readFileSync(path, 'utf8');
            return JSON.parse(content);
        }
        catch (error) {
            // silently ignore
        }
    }
    return undefined;
}
function configureMern(config) {
    config.protocol = 'inspector';
    config.runtimeExecutable = 'nodemon';
    config.program = '${workspaceFolder}/index.js';
    config.restart = true;
    config.env = {
        BABEL_DISABLE_CACHE: '1',
        NODE_ENV: 'development'
    };
    config.console = 'integratedTerminal';
    config.internalConsoleOptions = 'neverOpen';
}
function isTranspiledLanguage(languagId) {
    return languagId === 'typescript' || languagId === 'coffeescript';
}
/*
 * try to find the entry point ('main') from the package.json
 */
function guessProgramFromPackage(folder, packageJson, resolve) {
    let program;
    try {
        if (packageJson.main) {
            program = packageJson.main;
        }
        else if (packageJson.scripts && typeof packageJson.scripts.start === 'string') {
            // assume a start script of the form 'node server.js'
            program = packageJson.scripts.start.split(' ').pop();
        }
        if (program) {
            let path;
            if (path_1.isAbsolute(program)) {
                path = program;
            }
            else {
                path = folder ? path_1.join(folder.uri.fsPath, program) : undefined;
                program = path_1.join('${workspaceFolder}', program);
            }
            if (resolve && path && !fs.existsSync(path) && !fs.existsSync(path + '.js')) {
                return undefined;
            }
        }
    }
    catch (error) {
        // silently ignore
    }
    return program;
}
//---- debug type -------------------------------------------------------------------------------------------------------------
function determineDebugType(config) {
    if (config.request === 'attach' && typeof config.processId === 'string') {
        return determineDebugTypeForPidConfig(config);
    }
    else if (config.protocol === 'legacy') {
        return Promise.resolve('node');
    }
    else if (config.protocol === 'inspector') {
        return Promise.resolve('node2');
    }
    else {
        // 'auto', or unspecified
        return protocolDetection_1.detectDebugType(config);
    }
}
function determineDebugTypeForPidConfig(config) {
    const getPidP = isPickProcessCommand(config.processId) ?
        processPicker_1.pickProcess() :
        Promise.resolve(config.processId);
    return getPidP.then(pid => {
        if (pid && pid.match(/^[0-9]+$/)) {
            const pidNum = Number(pid);
            putPidInDebugMode(pidNum);
            return determineDebugTypeForPidInDebugMode(config, pidNum);
        }
        else {
            throw new Error(localize(9, null, pid));
        }
    }).then(debugType => {
        if (debugType) {
            // processID is handled, so turn this config into a normal port attach config
            config.processId = undefined;
            config.port = debugType === 'node2' ? protocolDetection_1.INSPECTOR_PORT_DEFAULT : protocolDetection_1.LEGACY_PORT_DEFAULT;
        }
        return debugType;
    });
}
function isPickProcessCommand(configProcessId) {
    configProcessId = configProcessId.trim();
    return configProcessId === '${command:PickProcess}' || configProcessId === '${command:extension.pickNodeProcess}';
}
function putPidInDebugMode(pid) {
    try {
        if (process.platform === 'win32') {
            // regular node has an undocumented API function for forcing another node process into debug mode.
            // 		(<any>process)._debugProcess(pid);
            // But since we are running on Electron's node, process._debugProcess doesn't work (for unknown reasons).
            // So we use a regular node instead:
            const command = `node -e process._debugProcess(${pid})`;
            child_process_1.execSync(command);
        }
        else {
            process.kill(pid, 'SIGUSR1');
        }
    }
    catch (e) {
        throw new Error(localize(10, null, pid, e));
    }
}
function determineDebugTypeForPidInDebugMode(config, pid) {
    let debugProtocolP;
    if (config.port === protocolDetection_1.INSPECTOR_PORT_DEFAULT) {
        debugProtocolP = Promise.resolve('inspector');
    }
    else if (config.port === protocolDetection_1.LEGACY_PORT_DEFAULT) {
        debugProtocolP = Promise.resolve('legacy');
    }
    else if (config.protocol) {
        debugProtocolP = Promise.resolve(config.protocol);
    }
    else {
        debugProtocolP = protocolDetection_1.detectProtocolForPid(pid);
    }
    return debugProtocolP.then(debugProtocol => {
        return debugProtocol === 'inspector' ? 'node2' :
            debugProtocol === 'legacy' ? 'node' :
                null;
    });
}

//# sourceMappingURL=../../../out/node/extension/configurationProvider.js.map

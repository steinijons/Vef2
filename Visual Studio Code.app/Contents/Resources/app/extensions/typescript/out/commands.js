"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const tsconfig_1 = require("./utils/tsconfig");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
class ReloadTypeScriptProjectsCommand {
    constructor(lazyClientHost) {
        this.lazyClientHost = lazyClientHost;
        this.id = 'typescript.reloadProjects';
    }
    execute() {
        this.lazyClientHost.value.reloadProjects();
    }
}
exports.ReloadTypeScriptProjectsCommand = ReloadTypeScriptProjectsCommand;
class ReloadJavaScriptProjectsCommand {
    constructor(lazyClientHost) {
        this.lazyClientHost = lazyClientHost;
        this.id = 'javascript.reloadProjects';
    }
    execute() {
        this.lazyClientHost.value.reloadProjects();
    }
}
exports.ReloadJavaScriptProjectsCommand = ReloadJavaScriptProjectsCommand;
class SelectTypeScriptVersionCommand {
    constructor(lazyClientHost) {
        this.lazyClientHost = lazyClientHost;
        this.id = 'typescript.selectTypeScriptVersion';
    }
    execute() {
        this.lazyClientHost.value.serviceClient.onVersionStatusClicked();
    }
}
exports.SelectTypeScriptVersionCommand = SelectTypeScriptVersionCommand;
class OpenTsServerLogCommand {
    constructor(lazyClientHost) {
        this.lazyClientHost = lazyClientHost;
        this.id = 'typescript.openTsServerLog';
    }
    execute() {
        this.lazyClientHost.value.serviceClient.openTsServerLogFile();
    }
}
exports.OpenTsServerLogCommand = OpenTsServerLogCommand;
class RestartTsServerCommand {
    constructor(lazyClientHost) {
        this.lazyClientHost = lazyClientHost;
        this.id = 'typescript.restartTsServer';
    }
    execute() {
        this.lazyClientHost.value.serviceClient.restartTsServer();
    }
}
exports.RestartTsServerCommand = RestartTsServerCommand;
class TypeScriptGoToProjectConfigCommand {
    constructor(lazyClientHost) {
        this.lazyClientHost = lazyClientHost;
        this.id = 'typescript.goToProjectConfig';
    }
    execute() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            goToProjectConfig(this.lazyClientHost.value, true, editor.document.uri);
        }
    }
}
exports.TypeScriptGoToProjectConfigCommand = TypeScriptGoToProjectConfigCommand;
class JavaScriptGoToProjectConfigCommand {
    constructor(lazyClientHost) {
        this.lazyClientHost = lazyClientHost;
        this.id = 'javascript.goToProjectConfig';
    }
    execute() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            goToProjectConfig(this.lazyClientHost.value, false, editor.document.uri);
        }
    }
}
exports.JavaScriptGoToProjectConfigCommand = JavaScriptGoToProjectConfigCommand;
async function goToProjectConfig(clientHost, isTypeScriptProject, resource) {
    const client = clientHost.serviceClient;
    const rootPath = client.getWorkspaceRootForResource(resource);
    if (!rootPath) {
        vscode.window.showInformationMessage(localize(0, null));
        return;
    }
    const file = client.normalizePath(resource);
    // TSServer errors when 'projectInfo' is invoked on a non js/ts file
    if (!file || !clientHost.handles(file)) {
        vscode.window.showWarningMessage(localize(1, null));
        return;
    }
    let res = undefined;
    try {
        res = await client.execute('projectInfo', { file, needFileNameList: false });
    }
    catch (_a) {
        // noop
    }
    if (!res || !res.body) {
        vscode.window.showWarningMessage(localize(2, null));
        return;
    }
    const { configFileName } = res.body;
    if (configFileName && !tsconfig_1.isImplicitProjectConfigFile(configFileName)) {
        const doc = await vscode.workspace.openTextDocument(configFileName);
        vscode.window.showTextDocument(doc, vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined);
        return;
    }
    let ProjectConfigAction;
    (function (ProjectConfigAction) {
        ProjectConfigAction[ProjectConfigAction["None"] = 0] = "None";
        ProjectConfigAction[ProjectConfigAction["CreateConfig"] = 1] = "CreateConfig";
        ProjectConfigAction[ProjectConfigAction["LearnMore"] = 2] = "LearnMore";
    })(ProjectConfigAction || (ProjectConfigAction = {}));
    const selected = await vscode.window.showInformationMessage((isTypeScriptProject
        ? localize(3, null)
        : localize(4, null)), {
        title: isTypeScriptProject
            ? localize(5, null)
            : localize(6, null),
        id: ProjectConfigAction.CreateConfig
    }, {
        title: localize(7, null),
        id: ProjectConfigAction.LearnMore
    });
    switch (selected && selected.id) {
        case ProjectConfigAction.CreateConfig:
            tsconfig_1.openOrCreateConfigFile(isTypeScriptProject, rootPath, client.configuration);
            return;
        case ProjectConfigAction.LearnMore:
            if (isTypeScriptProject) {
                vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://go.microsoft.com/fwlink/?linkid=841896'));
            }
            else {
                vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://go.microsoft.com/fwlink/?linkid=759670'));
            }
            return;
    }
}
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f88bbf9137d24d36d968ea6b2911786bfe103002/extensions/typescript/out/commands.js.map

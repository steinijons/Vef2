"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const PConst = require("../protocol.const");
const Previewer = require("../utils/previewer");
const convert_1 = require("../utils/convert");
const nls = require("vscode-nls");
const codeAction_1 = require("../utils/codeAction");
const languageModeIds = require("../utils/languageModeIds");
const localize = nls.loadMessageBundle(__filename);
class MyCompletionItem extends vscode_1.CompletionItem {
    constructor(position, document, line, tsEntry, enableDotCompletions, useCodeSnippetsOnMethodSuggest) {
        super(tsEntry.name);
        this.position = position;
        this.document = document;
        this.tsEntry = tsEntry;
        if (tsEntry.isRecommended) {
            // Make sure isRecommended property always comes first
            // https://github.com/Microsoft/vscode/issues/40325
            this.sortText = '\0' + tsEntry.sortText;
        }
        else if (tsEntry.source) {
            // De-prioritze auto-imports
            // https://github.com/Microsoft/vscode/issues/40311
            this.sortText = '\uffff' + tsEntry.sortText;
        }
        else {
            this.sortText = tsEntry.sortText;
        }
        this.kind = MyCompletionItem.convertKind(tsEntry.kind);
        this.position = position;
        this.commitCharacters = MyCompletionItem.getCommitCharacters(enableDotCompletions, !useCodeSnippetsOnMethodSuggest, tsEntry.kind);
        this.useCodeSnippet = useCodeSnippetsOnMethodSuggest && (this.kind === vscode_1.CompletionItemKind.Function || this.kind === vscode_1.CompletionItemKind.Method);
        if (tsEntry.replacementSpan) {
            this.range = convert_1.tsTextSpanToVsRange(tsEntry.replacementSpan);
        }
        if (typeof tsEntry.insertText === 'string') {
            this.insertText = tsEntry.insertText;
            if (tsEntry.replacementSpan) {
                this.range = convert_1.tsTextSpanToVsRange(tsEntry.replacementSpan);
                if (this.insertText[0] === '[') {
                    this.filterText = '.' + this.label;
                }
                // Make sure we only replace a single line at most
                if (!this.range.isSingleLine) {
                    this.range = new vscode_1.Range(this.range.start.line, this.range.start.character, this.range.start.line, line.length);
                }
            }
        }
        if (tsEntry.kindModifiers.match(/\boptional\b/)) {
            this.insertText = this.label;
            this.filterText = this.label;
            this.label += '?';
        }
    }
    resolve() {
        if (!this.range) {
            // Try getting longer, prefix based range for completions that span words
            const wordRange = this.document.getWordRangeAtPosition(this.position);
            const text = this.document.getText(new vscode_1.Range(this.position.line, Math.max(0, this.position.character - this.label.length), this.position.line, this.position.character)).toLowerCase();
            const entryName = this.label.toLowerCase();
            for (let i = entryName.length; i >= 0; --i) {
                if (text.endsWith(entryName.substr(0, i)) && (!wordRange || wordRange.start.character > this.position.character - i)) {
                    this.range = new vscode_1.Range(this.position.line, Math.max(0, this.position.character - i), this.position.line, this.position.character);
                    break;
                }
            }
        }
    }
    static convertKind(kind) {
        switch (kind) {
            case PConst.Kind.primitiveType:
            case PConst.Kind.keyword:
                return vscode_1.CompletionItemKind.Keyword;
            case PConst.Kind.const:
                return vscode_1.CompletionItemKind.Constant;
            case PConst.Kind.let:
            case PConst.Kind.variable:
            case PConst.Kind.localVariable:
            case PConst.Kind.alias:
                return vscode_1.CompletionItemKind.Variable;
            case PConst.Kind.memberVariable:
            case PConst.Kind.memberGetAccessor:
            case PConst.Kind.memberSetAccessor:
                return vscode_1.CompletionItemKind.Field;
            case PConst.Kind.function:
                return vscode_1.CompletionItemKind.Function;
            case PConst.Kind.memberFunction:
            case PConst.Kind.constructSignature:
            case PConst.Kind.callSignature:
            case PConst.Kind.indexSignature:
                return vscode_1.CompletionItemKind.Method;
            case PConst.Kind.enum:
                return vscode_1.CompletionItemKind.Enum;
            case PConst.Kind.module:
            case PConst.Kind.externalModuleName:
                return vscode_1.CompletionItemKind.Module;
            case PConst.Kind.class:
            case PConst.Kind.type:
                return vscode_1.CompletionItemKind.Class;
            case PConst.Kind.interface:
                return vscode_1.CompletionItemKind.Interface;
            case PConst.Kind.warning:
            case PConst.Kind.file:
            case PConst.Kind.script:
                return vscode_1.CompletionItemKind.File;
            case PConst.Kind.directory:
                return vscode_1.CompletionItemKind.Folder;
        }
        return vscode_1.CompletionItemKind.Property;
    }
    static getCommitCharacters(enableDotCompletions, enableCallCompletions, kind) {
        switch (kind) {
            case PConst.Kind.memberGetAccessor:
            case PConst.Kind.memberSetAccessor:
            case PConst.Kind.constructSignature:
            case PConst.Kind.callSignature:
            case PConst.Kind.indexSignature:
            case PConst.Kind.enum:
            case PConst.Kind.interface:
                return enableDotCompletions ? ['.'] : undefined;
            case PConst.Kind.module:
            case PConst.Kind.alias:
            case PConst.Kind.const:
            case PConst.Kind.let:
            case PConst.Kind.variable:
            case PConst.Kind.localVariable:
            case PConst.Kind.memberVariable:
            case PConst.Kind.class:
            case PConst.Kind.function:
            case PConst.Kind.memberFunction:
                return enableDotCompletions ? (enableCallCompletions ? ['.', '('] : ['.']) : undefined;
        }
        return undefined;
    }
}
class ApplyCompletionCodeActionCommand {
    constructor(client) {
        this.client = client;
        this.id = ApplyCompletionCodeActionCommand.ID;
    }
    async execute(_file, codeActions) {
        if (codeActions.length === 0) {
            return true;
        }
        if (codeActions.length === 1) {
            return codeAction_1.applyCodeAction(this.client, codeActions[0]);
        }
        const selection = await vscode_1.window.showQuickPick(codeActions.map((action, i) => ({
            label: action.description,
            description: '',
            index: i
        })), {
            placeHolder: localize(0, null)
        });
        if (!selection) {
            return false;
        }
        const action = codeActions[selection.index];
        if (!action) {
            return false;
        }
        return codeAction_1.applyCodeAction(this.client, action);
    }
}
ApplyCompletionCodeActionCommand.ID = '_typescript.applyCompletionCodeAction';
var Configuration;
(function (Configuration) {
    Configuration.useCodeSnippetsOnMethodSuggest = 'useCodeSnippetsOnMethodSuggest';
    Configuration.nameSuggestions = 'nameSuggestions';
    Configuration.quickSuggestionsForPaths = 'quickSuggestionsForPaths';
    Configuration.autoImportSuggestions = 'autoImportSuggestions.enabled';
})(Configuration || (Configuration = {}));
class TypeScriptCompletionItemProvider {
    constructor(client, typingsStatus, commandManager) {
        this.client = client;
        this.typingsStatus = typingsStatus;
        commandManager.register(new ApplyCompletionCodeActionCommand(this.client));
    }
    async provideCompletionItems(document, position, token, context) {
        if (this.typingsStatus.isAcquiringTypings) {
            return Promise.reject({
                label: localize(1, null),
                detail: localize(2, null)
            });
        }
        const file = this.client.normalizePath(document.uri);
        if (!file) {
            return [];
        }
        const line = document.lineAt(position.line);
        const config = this.getConfiguration(document.uri);
        if (context.triggerCharacter === '"' || context.triggerCharacter === '\'') {
            if (!config.quickSuggestionsForPaths) {
                return [];
            }
            // make sure we are in something that looks like the start of an import
            const pre = line.text.slice(0, position.character);
            if (!pre.match(/\b(from|import)\s*["']$/) && !pre.match(/\b(import|require)\(['"]$/)) {
                return [];
            }
        }
        if (context.triggerCharacter === '/') {
            if (!config.quickSuggestionsForPaths) {
                return [];
            }
            // make sure we are in something that looks like an import path
            const pre = line.text.slice(0, position.character);
            if (!pre.match(/\b(from|import)\s*["'][^'"]*$/) && !pre.match(/\b(import|require)\(['"][^'"]*$/)) {
                return [];
            }
        }
        if (context.triggerCharacter === '@') {
            // make sure we are in something that looks like the start of a jsdoc comment
            const pre = line.text.slice(0, position.character);
            if (!pre.match(/^\s*\*[ ]?@/) && !pre.match(/\/\*\*+[ ]?@/)) {
                return [];
            }
        }
        try {
            const args = Object.assign({}, convert_1.vsPositionToTsFileLocation(file, position), { includeExternalModuleExports: config.autoImportSuggestions, includeInsertTextCompletions: true });
            const msg = await this.client.execute('completions', args, token);
            // This info has to come from the tsserver. See https://github.com/Microsoft/TypeScript/issues/2831
            // let isMemberCompletion = false;
            // let requestColumn = position.character;
            // if (wordAtPosition) {
            // 	requestColumn = wordAtPosition.startColumn;
            // }
            // if (requestColumn > 0) {
            // 	let value = model.getValueInRange({
            // 		startLineNumber: position.line,
            // 		startColumn: requestColumn - 1,
            // 		endLineNumber: position.line,
            // 		endColumn: requestColumn
            // 	});
            // 	isMemberCompletion = value === '.';
            // }
            const completionItems = [];
            const body = msg.body;
            if (body) {
                // Only enable dot completions in TS files for now
                let enableDotCompletions = document && (document.languageId === languageModeIds.typescript || document.languageId === languageModeIds.typescriptreact);
                // TODO: Workaround for https://github.com/Microsoft/TypeScript/issues/13456
                // Only enable dot completions when previous character is an identifier.
                // Prevents incorrectly completing while typing spread operators.
                if (position.character > 1) {
                    const preText = document.getText(new vscode_1.Range(position.line, 0, position.line, position.character - 1));
                    enableDotCompletions = preText.match(/[a-z_$\)\]\}]\s*$/ig) !== null;
                }
                for (const element of body) {
                    if (element.kind === PConst.Kind.warning && !config.nameSuggestions) {
                        continue;
                    }
                    if (!config.autoImportSuggestions && element.hasAction) {
                        continue;
                    }
                    const item = new MyCompletionItem(position, document, line.text, element, enableDotCompletions, config.useCodeSnippetsOnMethodSuggest);
                    completionItems.push(item);
                }
            }
            return completionItems;
        }
        catch (_a) {
            return [];
        }
    }
    async resolveCompletionItem(item, token) {
        if (!(item instanceof MyCompletionItem)) {
            return undefined;
        }
        const filepath = this.client.normalizePath(item.document.uri);
        if (!filepath) {
            return undefined;
        }
        item.resolve();
        const args = Object.assign({}, convert_1.vsPositionToTsFileLocation(filepath, item.position), { entryNames: [
                item.tsEntry.source ? { name: item.tsEntry.name, source: item.tsEntry.source } : item.tsEntry.name
            ] });
        let response;
        try {
            response = await this.client.execute('completionEntryDetails', args, token);
        }
        catch (_a) {
            return item;
        }
        const details = response.body;
        if (!details || !details.length || !details[0]) {
            return item;
        }
        const detail = details[0];
        item.detail = detail.displayParts.length ? Previewer.plain(detail.displayParts) : undefined;
        item.documentation = this.getDocumentation(detail, item);
        if (detail.codeActions && detail.codeActions.length) {
            item.command = {
                title: '',
                command: ApplyCompletionCodeActionCommand.ID,
                arguments: [filepath, detail.codeActions]
            };
        }
        if (detail && item.useCodeSnippet) {
            const shouldCompleteFunction = await this.isValidFunctionCompletionContext(filepath, item.position);
            if (shouldCompleteFunction) {
                item.insertText = this.snippetForFunctionCall(item, detail);
            }
            return item;
        }
        return item;
    }
    getDocumentation(detail, item) {
        const documentation = new vscode_1.MarkdownString();
        if (detail.source) {
            let importPath = `'${Previewer.plain(detail.source)}'`;
            if (this.client.apiVersion.has260Features() && !this.client.apiVersion.has262Features()) {
                // Try to resolve the real import name that will be added
                if (detail.codeActions && detail.codeActions[0]) {
                    const action = detail.codeActions[0];
                    if (action.changes[0] && action.changes[0].textChanges[0]) {
                        const textChange = action.changes[0].textChanges[0];
                        const matchedImport = textChange.newText.match(/(['"])(.+?)\1/);
                        if (matchedImport) {
                            importPath = matchedImport[0];
                            item.detail += ` — from ${matchedImport[0]}`;
                        }
                    }
                }
                documentation.appendMarkdown(localize(3, null, importPath));
            }
            else {
                const autoImportLabel = localize(4, null, importPath);
                item.detail = `${autoImportLabel}\n${item.detail}`;
            }
            documentation.appendMarkdown('\n\n');
        }
        Previewer.addMarkdownDocumentation(documentation, detail.documentation, detail.tags);
        return documentation.value.length ? documentation : undefined;
    }
    async isValidFunctionCompletionContext(filepath, position) {
        // Workaround for https://github.com/Microsoft/TypeScript/issues/12677
        // Don't complete function calls inside of destructive assigments or imports
        try {
            const infoResponse = await this.client.execute('quickinfo', convert_1.vsPositionToTsFileLocation(filepath, position));
            const info = infoResponse.body;
            switch (info && info.kind) {
                case 'var':
                case 'let':
                case 'const':
                case 'alias':
                    return false;
                default:
                    return true;
            }
        }
        catch (e) {
            return true;
        }
    }
    snippetForFunctionCall(item, detail) {
        let hasOptionalParameters = false;
        let hasAddedParameters = false;
        const snippet = new vscode_1.SnippetString();
        snippet.appendText(item.label || item.insertText);
        snippet.appendText('(');
        let parenCount = 0;
        let i = 0;
        for (; i < detail.displayParts.length; ++i) {
            const part = detail.displayParts[i];
            // Only take top level paren names
            if (part.kind === 'parameterName' && parenCount === 1) {
                const next = detail.displayParts[i + 1];
                // Skip optional parameters
                const nameIsFollowedByOptionalIndicator = next && next.text === '?';
                if (!nameIsFollowedByOptionalIndicator) {
                    if (hasAddedParameters) {
                        snippet.appendText(', ');
                    }
                    hasAddedParameters = true;
                    snippet.appendPlaceholder(part.text);
                }
                hasOptionalParameters = hasOptionalParameters || nameIsFollowedByOptionalIndicator;
            }
            else if (part.kind === 'punctuation') {
                if (part.text === '(') {
                    ++parenCount;
                }
                else if (part.text === ')') {
                    --parenCount;
                }
                else if (part.text === '...' && parenCount === 1) {
                    // Found rest parmeter. Do not fill in any further arguments
                    hasOptionalParameters = true;
                    break;
                }
            }
        }
        if (hasOptionalParameters) {
            snippet.appendTabstop();
        }
        snippet.appendText(')');
        snippet.appendTabstop(0);
        return snippet;
    }
    getConfiguration(resource) {
        // Use shared setting for js and ts
        const typeScriptConfig = vscode_1.workspace.getConfiguration('typescript', resource);
        return {
            useCodeSnippetsOnMethodSuggest: typeScriptConfig.get(Configuration.useCodeSnippetsOnMethodSuggest, false),
            quickSuggestionsForPaths: typeScriptConfig.get(Configuration.quickSuggestionsForPaths, true),
            autoImportSuggestions: typeScriptConfig.get(Configuration.autoImportSuggestions, true),
            nameSuggestions: vscode_1.workspace.getConfiguration('javascript', resource).get(Configuration.nameSuggestions, true)
        };
    }
}
exports.default = TypeScriptCompletionItemProvider;
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f88bbf9137d24d36d968ea6b2911786bfe103002/extensions/typescript/out/features/completionItemProvider.js.map

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
function activate(context) {
    vscode_1.languages.setLanguageConfiguration('python', {
        onEnterRules: [
            {
                beforeText: /^\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async).*?:\s*$/,
                action: { indentAction: vscode_1.IndentAction.Indent }
            }
        ]
    });
}
exports.activate = activate;
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f88bbf9137d24d36d968ea6b2911786bfe103002/extensions/python/out/pythonMain.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode = require("vscode");
const convert_1 = require("./convert");
function createWorkspaceEditFromFileCodeEdits(client, edits) {
    const workspaceEdit = new vscode.WorkspaceEdit();
    for (const edit of edits) {
        for (const textChange of edit.textChanges) {
            workspaceEdit.replace(client.asUrl(edit.fileName), convert_1.tsTextSpanToVsRange(textChange), textChange.newText);
        }
    }
    return workspaceEdit;
}
exports.createWorkspaceEditFromFileCodeEdits = createWorkspaceEditFromFileCodeEdits;
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f88bbf9137d24d36d968ea6b2911786bfe103002/extensions/typescript/out/utils/workspaceEdit.js.map

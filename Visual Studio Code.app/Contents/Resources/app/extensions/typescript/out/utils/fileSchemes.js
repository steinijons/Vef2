"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = 'file';
exports.untitled = 'untitled';
exports.walkThroughSnippet = 'walkThroughSnippet';
exports.supportedSchemes = [
    exports.file,
    exports.untitled,
    exports.walkThroughSnippet
];
function isSupportedScheme(scheme) {
    return exports.supportedSchemes.indexOf(scheme) >= 0;
}
exports.isSupportedScheme = isSupportedScheme;
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f88bbf9137d24d36d968ea6b2911786bfe103002/extensions/typescript/out/utils/fileSchemes.js.map

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!function(){const e=require("path"),o=require("module"),r=e.join(__dirname,"../node_modules"),t=r+".asar",n=o._resolveLookupPaths;o._resolveLookupPaths=function(e,o){const s=n(e,o),a=s[1];for(let e=0,o=a.length;e<o;e++)if(a[e]===r){a.splice(e,0,t);break}return s}}(),require("./bootstrap-amd").bootstrap("vs/code/node/cli");
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f88bbf9137d24d36d968ea6b2911786bfe103002/core/cli.js.map

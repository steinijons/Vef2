/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
define("vs/code/electron-main/main.nls",{"vs/base/common/severity":["Error","Warning","Info"],"vs/base/node/ps":["Collecting CPU and memory information. This might take a couple of seconds."],"vs/code/electron-main/auth":["Proxy Authentication Required","The proxy {0} requires authentication."],
"vs/code/electron-main/logUploader":["Invalid log uploader endpoint","Uploading...","Upload successful! Log file ID: {0}","You are about to upload your session logs to a secure Microsoft endpoint that only Microsoft's members of the VS Code team can access.","Session logs may contain personal information such as full paths or file contents. Please review and redact your session log files here: '{0}'","By continuing you confirm that you have reviewed and redacted your session log files and that you agree to Microsoft using them to debug VS Code.","Please run code with '--upload-logs={0}' to proceed with upload","Error posting logs: {0}","Error posting logs. Got {0} — {1}","Error parsing response","Error zipping logs: {0}"],"vs/code/electron-main/main":["Another instance of {0} is running but not responding","Please close all other instances and try again.","A second instance of {0} is already running as administrator.","Please close the other instance and try again.","&&Close"],
"vs/code/electron-main/menus":["&&File","&&Edit","&&Selection","&&View","&&Go","&&Debug","Window","&&Help","&&Tasks","New &&Window","About {0}","Services","Hide {0}","Hide Others","Show All","Quit {0}","&&New File","&&New File","&&Open...","&&Open...","Open Wor&&kspace...","Open Wor&&kspace...","Open &&Folder...","Open &&Folder...","&&Open File...","&&Open File...","Open &&Recent","Save Workspace As...","A&&dd Folder to Workspace...","&&Save","Save &&As...","Save A&&ll","Auto Save","New &&Window","Re&&vert File","Clos&&e Window","Close &&Workspace","Close &&Folder","&&Close Editor","E&&xit","&&Settings","&&Keyboard Shortcuts","&&Keymap Extensions","User &&Snippets","&&Color Theme","File &&Icon Theme","&&Preferences","&&Reopen Closed Editor","&&More...","&&Clear Recently Opened","&&Undo","&&Redo","Cu&&t","&&Copy","&&Paste","&&Undo","&&Redo","Cu&&t","&&Copy","&&Paste","&&Find","&&Replace","Find &&in Files","Replace &&in Files","Emmet: E&&xpand Abbreviation","E&&mmet...","&&Toggle Line Comment","Toggle &&Block Comment","Switch to Alt+Click for Multi-Cursor","Switch to Cmd+Click for Multi-Cursor","Switch to Ctrl+Click for Multi-Cursor","&&Add Cursor Above","A&&dd Cursor Below","Add C&&ursors to Line Ends","Add &&Next Occurrence","Add P&&revious Occurrence","Select All &&Occurrences","&&Copy Line Up","Co&&py Line Down","Mo&&ve Line Up","Move &&Line Down","&&Select All","&&Select All","&&Expand Selection","&&Shrink Selection","&&Explorer","&&Search","S&&CM","&&Debug","E&&xtensions","&&Output","De&&bug Console","&&Integrated Terminal","&&Problems","Additional &&Views","&&Command Palette...","&&Open View...","Toggle &&Full Screen","Toggle Zen Mode","Toggle Menu &&Bar","Split &&Editor","Toggle Editor Group &&Layout","&&Toggle Side Bar","&&Move Side Bar Right","&&Move Side Bar Left","Toggle &&Panel","&&Hide Status Bar","&&Show Status Bar","Hide &&Activity Bar","Show &&Activity Bar","Toggle &&Word Wrap","Toggle &&Minimap","Toggle &&Render Whitespace","Toggle &&Control Characters","&&Zoom In","Zoom O&&ut","&&Reset Zoom","&&Back","&&Forward","&&Next Editor","&&Previous Editor","&&Next Used Editor in Group","&&Previous Used Editor in Group","Switch &&Editor","&&First Group","&&Second Group","&&Third Group","&&Next Group","&&Previous Group","Switch &&Group","Go to &&File...","Go to &&Symbol in File...","Go to Symbol in &&Workspace...","Go to &&Definition","Go to &&Type Definition","Go to &&Implementation","Go to &&Line...","&&Start Debugging","Start &&Without Debugging","&&Stop Debugging","&&Restart Debugging","Open &&Configurations","Add Configuration...","Step &&Over","Step &&Into","Step O&&ut","&&Continue","Toggle &&Breakpoint","&&Conditional Breakpoint...","C&&olumn Breakpoint","&&Function Breakpoint...","&&New Breakpoint","Enable All Breakpoints","Disable A&&ll Breakpoints","Remove &&All Breakpoints","&&Install Additional Debuggers...","Minimize","Zoom","Bring All to Front","Switch &&Window...","Show Previous Tab","Show Next Tab","Move Tab to New Window","Merge All Windows","&&Toggle Developer Tools","Accessibility &&Options","Report &&Issue","&&Welcome","&&Interactive Playground","&&Documentation","&&Release Notes","&&Keyboard Shortcuts Reference","Introductory &&Videos","&&Tips and Tricks","&&Join us on Twitter","&&Search Feature Requests","View &&License","&&Privacy Statement","&&About","&&Run Task...","Run &&Build Task...","Show Runnin&&g Tasks...","R&&estart Running Task...","&&Terminate Task...","&&Configure Tasks...","Configure De&&fault Build Task...","Accessibility Options","Check for Updates...","Checking For Updates...","Download Available Update","Downloading Update...","Install Update...","Installing Update...","Restart to Update...","Version {0}\nCommit {1}\nDate {2}\nShell {3}\nRenderer {4}\nNode {5}\nArchitecture {6}","OK","&&Copy"],
"vs/code/electron-main/window":["You can still access the menu bar by pressing the **Alt** key."],"vs/code/electron-main/windows":["OK","Path does not exist","The path '{0}' does not seem to exist anymore on disk.","&&Reopen","&&Keep Waiting","&&Close","The window is no longer responding","You can reopen or close the window or keep waiting.","&&Reopen","&&Close","The window has crashed","We are sorry for the inconvenience! You can reopen the window to continue where you left off.","Open","Open Folder","Open File","OK","Unable to save workspace '{0}'","The workspace is already opened in another window. Please close that window first and then try again.","&&Open","Open Workspace","&&Save","Do&&n't Save","Cancel","Do you want to save your workspace configuration as a file?","Save your workspace if you plan to open it again.","&&Save","Save Workspace"],
"vs/platform/configuration/common/configurationRegistry":["Default Configuration Overrides","Configure editor settings to be overridden for {0} language.","Configure editor settings to be overridden for a language.","Cannot register '{0}'. This matches property pattern '\\\\[.*\\\\]$' for describing language specific editor settings. Use 'configurationDefaults' contribution.","Cannot register '{0}'. This property is already registered."],
"vs/platform/environment/node/argv":["Arguments in `--goto` mode should be in the format of `FILE(:LINE(:CHARACTER))`.","Compare two files with each other.","Add folder(s) to the last active window.","Open a file at the path on the specified line and character position.","Force to open a new window.","Force to open a file or folder in the last active window.","Wait for the files to be closed before returning.","The locale to use (e.g. en-US or zh-TW).","Specifies the directory that user data is kept in. Can be used to open multiple distinct instances of Code.","Print version.","Print usage.","Set the root path for extensions.","List the installed extensions.","Show versions of installed extensions, when using --list-extension.","Installs an extension.","Uninstalls an extension.","Enables proposed api features for an extension.","Print verbose output (implies --wait).","Log level to use. Default is 'info'. Allowed values are 'critical', 'error', 'warn', 'info', 'debug', 'trace', 'off'.","Print process usage and diagnostics information.","Start with the 'Developer: Startup Performance' command enabled.","Run CPU profiler during startup","Disable all installed extensions.","Allow debugging and profiling of extensions. Check the developer tools for the connection uri.","Allow debugging and profiling of extensions with the extension host being paused after start. Check the developer tools for the connection uri.","Disable GPU hardware acceleration.","Uploads logs from current session to a secure endpoint.","Usage","options","paths","To read output from another program, append '-' (e.g. 'echo Hello World | {0} -')","To read from stdin, append '-' (e.g. 'ps aux | grep code | {0} -')","Options","Extensions Management","Troubleshooting"],
"vs/platform/extensionManagement/common/extensionManagement":["Extensions","Preferences"],"vs/platform/extensionManagement/node/extensionGalleryService":["Unable to download because the extension compatible with current version '{0}' of VS Code is not found."],
"vs/platform/extensions/node/extensionValidator":["Could not parse `engines.vscode` value {0}. Please use, for example: ^0.10.0, ^1.2.3, ^0.11.0, ^0.10.x, etc.","Version specified in `engines.vscode` ({0}) is not specific enough. For vscode versions before 1.0.0, please define at a minimum the major and minor desired version. E.g. ^0.10.0, 0.10.x, 0.11.0, etc.","Version specified in `engines.vscode` ({0}) is not specific enough. For vscode versions after 1.0.0, please define at a minimum the major desired version. E.g. ^1.10.0, 1.10.x, 1.x.x, 2.x.x, etc.","Extension is not compatible with Code {0}. Extension requires: {1}.","Got empty extension description","property `{0}` is mandatory and must be of type `string`","property `{0}` is mandatory and must be of type `string`","property `{0}` is mandatory and must be of type `string`","property `{0}` is mandatory and must be of type `object`","property `{0}` is mandatory and must be of type `string`","property `{0}` can be omitted or must be of type `string[]`","property `{0}` can be omitted or must be of type `string[]`","properties `{0}` and `{1}` must both be specified or must both be omitted","property `{0}` can be omitted or must be of type `string`","Expected `main` ({0}) to be included inside extension's folder ({1}). This might make the extension non-portable.","properties `{0}` and `{1}` must both be specified or must both be omitted","Extension version is not semver compatible."],
"vs/platform/history/electron-main/historyMainService":["New Window","Opens a new window","Recent Workspaces","{0} {1}","Code Workspace"],"vs/platform/issue/electron-main/issueService":["Issue Reporter"],"vs/platform/message/common/message":["Close","Later","Cancel","...1 additional file not shown","...{0} additional files not shown"],"vs/platform/request/node/request":["HTTP","The proxy setting to use. If not set will be taken from the http_proxy and https_proxy environment variables","Whether the proxy server certificate should be verified against the list of supplied CAs.","The value to send as the 'Proxy-Authorization' header for every network request."],"vs/platform/telemetry/common/telemetryService":["Telemetry","Enable usage data and errors to be sent to Microsoft."],"vs/platform/workspaces/common/workspaces":["Code Workspace","Untitled (Workspace)","{0} (Workspace)","{0} (Workspace)"]});
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f88bbf9137d24d36d968ea6b2911786bfe103002/core/vs/code/electron-main/main.nls.js.map

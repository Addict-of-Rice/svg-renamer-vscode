import * as vscode from "vscode";

import { replaceSvgAttributes, svgPreview } from "./services/svg.service";

function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "svg-fix" is now active!');

  const replaceSvgAttributesDisposable = vscode.commands.registerCommand(
    "svg-fix.replaceSvgAttributes",
    replaceSvgAttributes
  );

  const svgPrevieDisposable = vscode.commands.registerCommand(
    "svg-fix.previewSvg",
    svgPreview
  );

  context.subscriptions.push(svgPrevieDisposable);
  context.subscriptions.push(replaceSvgAttributesDisposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

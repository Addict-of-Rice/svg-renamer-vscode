import * as vscode from "vscode";

import { replaceSvgAttributes, svgPreview } from "./services/svg.service";

function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "svg-fix" is now active!');

  const replaceSvgAttributesHyphenDisposable = vscode.commands.registerCommand(
    "svg-fix.replaceSvgAttributesHyphen",
    () => replaceSvgAttributes(true, false)
  );

  const replaceSvgAttributesColonDisposable = vscode.commands.registerCommand(
    "svg-fix.replaceSvgAttributesColon",
    () => replaceSvgAttributes(false, true)
  );

  const replaceSvgAttributesDisposable = vscode.commands.registerCommand(
    "svg-fix.replaceSvgAttributes",
    () => replaceSvgAttributes(true, true)
  );

  const svgPrevieDisposable = vscode.commands.registerCommand(
    "svg-fix.previewSvg",
    svgPreview
  );

  context.subscriptions.push(svgPrevieDisposable);
  context.subscriptions.push(replaceSvgAttributesDisposable);
  context.subscriptions.push(replaceSvgAttributesHyphenDisposable);
  context.subscriptions.push(replaceSvgAttributesColonDisposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

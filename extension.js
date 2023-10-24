import * as fs from "fs";
import * as vscode from "vscode";

function activate(context) {
  console.log(
    'Congratulations, your extension "rename-svg-attributes" is now active!'
  );

  const replaceSvgAttributes = vscode.commands.registerCommand(
    "rename-svg-attributes.replaceSvgAttributes",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const text = document.getText();

        const updatedText = text.replace(
          /([a-z]+)-([a-z])/g,
          (_match, prefix, suffix) => `${prefix}${suffix.toUpperCase()}`
        );

        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(text.length)
        );
        const edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, fullRange, updatedText);
        vscode.workspace.applyEdit(edit);
      } else {
        vscode.window.showInformationMessage(
          "This command only works for XML/SVG files."
        );
      }

      vscode.window.showInformationMessage(`ohh yeah!`);
    }
  );

  const svgPrevieDisposable = vscode.commands.registerCommand(
    "extension.previewSvg",
    () => {
      const svgPath = vscode.window.activeTextEditor.document.uri.fsPath;
      if (svgPath) {
        const svgContent = fs.readFileSync(svgPath, "utf8");
        const panel = vscode.window.createWebviewPanel(
          "svgPreview",
          "SVG Preview",
          vscode.ViewColumn.One,
          {}
        );

        panel.webview.html = getWebviewContent(svgContent);
      }
    }
  );

  context.subscriptions.push(svgPrevieDisposable);
  context.subscriptions.push(replaceSvgAttributes);
}

function getWebviewContent(svgContent) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SVG Preview</title>
        </head>
        <body>
            <div>
                ${svgContent}
            </div>
        </body>
        </html>
    `;
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
  getWebviewContent,
};

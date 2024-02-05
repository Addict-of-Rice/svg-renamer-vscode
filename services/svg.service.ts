import * as fs from "fs";
import * as vscode from "vscode";

export const replaceSvgAttributes = (hyphen: boolean, colon: boolean) => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    const text = document.getText();

    let updatedText = text;
    
    if (hyphen) {
      updatedText = updatedText.replace(
        /([a-z]+)-([a-z])/g,
        (_match, prefix, suffix) => `${prefix}${suffix.toUpperCase()}`
      );
    }

    if (colon) {
      updatedText = updatedText.replace(
        /([a-z]+):([a-zA-Z])/g,
        (_match, prefix, suffix) => `${prefix}${suffix.toUpperCase()}`
      );
    }

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
};

export const svgPreview = () => {
  const svgPath = vscode.window.activeTextEditor?.document.uri.fsPath;
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
};

function extractSvgContent(sourceCode: string): string | null {
  const svgRegex = /<svg.*?<\/svg>/s; // Regular expression to match SVG code

  const match = sourceCode.match(svgRegex);
  return match ? match[0] : null;
}

function getWebviewContent(svgContent: string): string {
  const extractedSvg = extractSvgContent(svgContent);
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SVG Preview</title>
            <style>
            .center {
              display: flex;
              justify-content: center;
              align-items: center;
            }
            </style>
        </head>
        <body>
            <div class='center'>
                ${extractedSvg}
            </div>
        </body>
        </html>
    `;
}

const vscode = require("vscode");

function activate(context) {
  console.log(
    'Congratulations, your extension "rename-svg-attributes" is now active!'
  );

  let replaceSvgAttributes = vscode.commands.registerCommand(
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
  context.subscriptions.push(replaceSvgAttributes);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

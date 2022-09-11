import * as vscode from 'vscode';
import { integer } from 'vscode-languageclient';

const tokenTypes = ['comment', 'string', 'keyword', 'number', 'regexp', 'operator', 'namespace',
'type', 'struct', 'class', 'interface', 'enum', 'typeParameter', 'function',
'method', 'decorator', 'macro', 'variable', 'parameter', 'property', 'label'];
const tokenModifiers = ['declaration', 'documentation', 'readonly', 'static', 'abstract', 'deprecated',
'modification', 'async'];
const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);

let vars = new Array

const provider: vscode.DocumentSemanticTokensProvider = {
  provideDocumentSemanticTokens(
    document: vscode.TextDocument
  ): vscode.ProviderResult<vscode.SemanticTokens> {
    // analyze the document and return semantic tokens

    const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
    highlightVariables(document, tokensBuilder)
    console.log(tokensBuilder)
    return tokensBuilder.build();
  }
};

const selector = { language: 'algofr', scheme: 'file' };

export function initSemanticTokenProvider(){
  vscode.languages.registerDocumentSemanticTokensProvider(selector, provider, legend);
}

function getVariablesDeclarationLineRange(file: vscode.TextDocument) : [integer,integer]{
  let startIndex = 0
  let endIndex
  const lines = file.getText().split(/\r\n|\r|\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if(line.includes("Variables:")){
        startIndex = i + 1
    }
    if(line.includes("Début")){
      endIndex = i
      return [startIndex,endIndex-startIndex]
    }
  }
}

function getInstructionsLineRange(file: vscode.TextDocument) : [integer,integer]{
  let startIndex = 0
  let endIndex
  const lines = file.getText().split(/\r\n|\r|\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if(line.includes("Début")){
        startIndex = i + 1
    }
    if(line === "Fin"){
      endIndex = i
      return [startIndex,endIndex-startIndex]
    }
  }
}

function fetchDeclaredVariable(file: vscode.TextDocument){
  vars = new Array
  let variableBounds = getVariablesDeclarationLineRange(file)
  console.log(variableBounds)
  const lines = file.getText().split(/\r\n|\r|\n/);
  for (let i = 0; i < variableBounds[1]; i++) {
    const line = lines[variableBounds[0] + i].trim();
    const varAndType = line.split(" : ")
    vars.push(varAndType[0])
  }
}

function highlightVariables(file: vscode.TextDocument,tokenBuilder : vscode.SemanticTokensBuilder){
  console.log("highlighting")
  fetchDeclaredVariable(file)
  console.log(vars)
  const lines = file.getText().split(/\r\n|\r|\n/);
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const words = line.split(" ")
    let charIndex = 0
    for (let x = 0; x < words.length; x++) {
      const word = words[x];
      if(vars.includes(word)){
        console.log("line : "+i+" contain at "+charIndex+" lenght "+word.length)
        tokenBuilder.push(
          new vscode.Range(new vscode.Position(i,charIndex), new vscode.Position(i,charIndex+word.length)),
          'variable',
          []
        );
      }
      charIndex += word.length + 1
    }
  }
}
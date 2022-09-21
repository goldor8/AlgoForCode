import * as vscode from 'vscode';
import { integer } from 'vscode-languageclient';

const tokenTypes = ['comment', 'string', 'keyword', 'number', 'regexp', 'operator', 'namespace',
'type', 'struct', 'class', 'interface', 'enum', 'typeParameter', 'function',
'method', 'decorator', 'macro', 'variable', 'parameter', 'property', 'label'];
const tokenModifiers = ['declaration', 'documentation', 'readonly', 'static', 'abstract', 'deprecated',
'modification', 'async'];
const separationCaracter = [' ','=','<','>','+','-','*','/','%','(',')','[',']','{','}',',']
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
  const lines = file.getText().split(/\r\n|\r|\n/);
  for (let i = 0; i < variableBounds[1]; i++) {
    const line = lines[variableBounds[0] + i].trim();
    const varAndType = line.split(" : ")
    const inlineVars = varAndType[0].split(",");
    for(let y = 0; y < inlineVars.length; y++){
      vars.push(inlineVars[y].trim())
    }
  }
}

function highlightVariables(file: vscode.TextDocument,tokenBuilder : vscode.SemanticTokensBuilder){
  fetchDeclaredVariable(file)
  const lines = file.getText().split(/\r\n|\r|\n/);
  for (let i = 1; i < lines.length; i++) {
    highlightVariablesInLine(lines[i], i, tokenBuilder)
  }
}

function highlightVariablesInLine(line: string,lineNumber: integer, tokenBuilder : vscode.SemanticTokensBuilder){
  let i = 0;
  let wordIndex = 0
  let possibleVars = vars
  let newPossibleVars = new Array
  while(i < line.length){
    if(separationCaracter.includes(line[i])){
      checkVariableBefore()
      possibleVars = vars
      wordIndex = 0
      i++
      continue
    }

    for(let x = 0; x < possibleVars.length; x++){
      if(wordIndex > possibleVars[x].length - 1){
        continue
      }
      else if(possibleVars[x][wordIndex] == line[i]){
        newPossibleVars.push(possibleVars[x])
        wordIndex++
      }
    }
    possibleVars = newPossibleVars
    newPossibleVars = new Array
    i++
    
    if(i == line.length){
      checkVariableBefore()
    }
  }

  function checkVariableBefore(){
    if(isVariableCorrectLenght(line.substring(i-wordIndex,i),possibleVars) && wordIndex > 0){
      tokenBuilder.push(
        new vscode.Range(new vscode.Position(lineNumber,i-wordIndex), new vscode.Position(lineNumber,i)),
        'variable',
        []
      );
    }
  }
}

function isVariableCorrectLenght(possibleVar: string,possibleVars : Array<string>) : boolean{
  let possibilities = 0
  for(let x = 0; x < possibleVars.length; x++){
    if(possibleVars[x].length === possibleVar.length){
      possibilities++
    }
  }
  if(possibilities > 1){
    console.warn("multiple possibilities for variable : "+possibleVar)
  }

  if(possibilities === 0){
    return false
  }

  return true
}
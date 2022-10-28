import { CompletionItem, CompletionItemKind, InsertTextFormat } from 'vscode-languageserver';
import { vars } from './variablesFetcher';

export function getCompletion() : CompletionItem[]{
	var completionItems = new Array<CompletionItem>();
		for (let i = 0; i < vars.length; i++) {
			completionItems.push({
				label: vars[i],
				kind: CompletionItemKind.Variable,
			});
		}
	completionItems = completionItems.concat(defaultCompletionItems)
	console.log(completionItems);
	return completionItems;
}

const defaultCompletionItems: CompletionItem[] =[
	{
		label: 'Template',
		kind: CompletionItemKind.Snippet,
		data: 1,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Algorithme ${1:name}\nVariables:\n\t${2:variables}\nDébut\n\t$0\nFin'
	},
	{
		label: 'Algorithme',
		kind: CompletionItemKind.Class,
		data: 2,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Algorithme ${1:name}\n$0'
	},
	{
		label: 'Variables',
		kind: CompletionItemKind.Snippet,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Variables:\n\t$0'
	},
	{
		label: 'Début',
		kind: CompletionItemKind.Snippet,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Début\n\t$0\nFin'
	},
	{
		label: 'Si Alors',
		kind: CompletionItemKind.Snippet,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Si ${1:condition} alors\n\t$0\nFin si'
	},
	{
		label: 'Si Alors Sinon',
		kind: CompletionItemKind.Snippet,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Si ${1:condition} alors\n\t$2\nSinon\n\t$0\nFin si'
	},
	{
		label: 'Sinon',
		kind: CompletionItemKind.Snippet,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Sinon\n\t$0'
	},
	{
		label: 'Afficher',
		kind: CompletionItemKind.Function,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Afficher($1)\n$0'
	},
	{
		label: 'Saisir',
		kind: CompletionItemKind.Function,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Saisir(${1:variable})\n$0'
	},
	{
		label: '= (affectation)',
		kind: CompletionItemKind.Operator,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: '←'
	},
	{
		label: 'Tant que',
		kind: CompletionItemKind.Snippet,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Tant que ${1:condition} faire\n\t$0\nFin tant que'
	},
	{
		label: 'Pour',
		kind: CompletionItemKind.Snippet,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Pour ${1:variable} ← ${2:debut} à ${3:fin} faire\n\t$0\nFin pour'
	},
	{
		label: 'Répéter Tant que',
		kind: CompletionItemKind.Snippet,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Répéter\n\t$0\nTant que ${1:condition}'
	},
	{
		label: 'longueur',
		kind: CompletionItemKind.Function,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'longueur(${1:chaine})'
	},
	{
		label: 'Selon que',
		kind: CompletionItemKind.Snippet,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'Selon ${1:variable}\n\tcas${1:valeur} : ${2;action}\n\tSinon : ${3:defaut}$0\nFin selon'
	},
	{
		label: 'cas',
		kind: CompletionItemKind.Snippet,
		insertTextFormat: InsertTextFormat.Snippet,
		insertText: 'cas ${1:valeur} : ${2;action}'
	},
	{
		label: 'entier',
		kind: CompletionItemKind.TypeParameter,
		insertTextFormat: InsertTextFormat.PlainText,
		insertText: 'entier'
	},
	{
		label: 'réel',
		kind: CompletionItemKind.TypeParameter,
		insertTextFormat: InsertTextFormat.PlainText,
		insertText: 'réel'
	},
	{
		label: 'chaîne de caractères',
		kind: CompletionItemKind.TypeParameter,
		insertTextFormat: InsertTextFormat.PlainText,
		insertText: 'chaîne de caractères'
	},
	{
		label: 'caractère',
		kind: CompletionItemKind.TypeParameter,
		insertTextFormat: InsertTextFormat.PlainText,
		insertText: 'caractère'
	},
	{
		label: 'booléen',
		kind: CompletionItemKind.TypeParameter,
		insertTextFormat: InsertTextFormat.PlainText,
		insertText: 'booléen'
	},
	{
		label: 'OU',
		kind: CompletionItemKind.Operator,
		insertTextFormat: InsertTextFormat.PlainText,
		insertText: 'OU'
	},
	{
		label: 'ET',
		kind: CompletionItemKind.Operator,
		insertTextFormat: InsertTextFormat.PlainText,
		insertText: 'ET'
	},
]
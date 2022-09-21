export let vars = new Array

function getVariablesDeclarationLineRange(file: string) : [number,number]{
	let startIndex = 0
	let endIndex = 0
	const lines = file.split(/\r\n|\r|\n/);
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

	return [0,0]
  }

export function fetchDeclaredVariable(file: string){
	vars = new Array
	let variableBounds = getVariablesDeclarationLineRange(file)
	const lines = file.split(/\r\n|\r|\n/);
	for (let i = 0; i < variableBounds[1]; i++) {
	  const line = lines[variableBounds[0] + i].trim();
	  const varAndType = line.split(" : ")
	  const inlineVars = varAndType[0].split(",");
	  for(let y = 0; y < inlineVars.length; y++){
		vars.push(inlineVars[y].trim())
	  }
	}
  }
try {
	var data='/(((by){1}(\s){1,}){,1}(window|size|parent|node|item|html|script|document|current|empty|newline|((text){1}(\s){1,}((\s){1,}([\S]){1,}){1,}(\s){1,}(as){1}(\s){1,}(one|some|number|boolean|object){1}){1}){1,}/';
	var command='/(((say|break|closed|(loop((\s){1,}([0-9]){1,}(\s){1,}times){,1})){1})|(' + data + ')){1,}/';
	var storage='/((([a-zA-Z]){1,}(\s){1,}(((will){1}(\s){1,}(gain|store|lose|do){1})|equal){1})|(' + data + ')){1,}/';
	var next='/(((also|with|without){1})|(' + data + ')){1,}/';/';

	var testGiselleAssignmentLine='/^('+ '(\s){1,}' + storage + '(\s){1,}' + '((' + command + '){,1}' + '(\s){1,}' + '' + data + '' + '(\s){1,}' + '(' + next + '(\s){1,}' + '' + command + '){,1}' + '(\s){,1}' + '' + data + '){,}){,1}' + '(\s){1,}(' + data + '){1}$/';
	var testGiselleActivityLine='/^('+ '(\s){1,}' + command + '(\s){1,}' + '' + data + '' + '(\s){1,}' + '){1}$/';

	var thrower = false;
	var currentScope = 0;
	var parametersDegree = 0;
	var code = [];
	var lines = document.currentScript.getAttribute("code").split('\n');

} catch(exception) {

	alert('Internal Error: Please report a bug to the developer.');
} try {

	var innerModes = ['operand','operation'];

	function DegreeUp(){

		parameterDegree++;
		code[i] += '(';
	}

	function DegreeDown(){

		parameterDegree--;
		code[i] += ')';
	}

	function Dependent(arg1,arg2,arg3){

		if (arg1){

			if (arg2 == '/^(\*)(.){1,}$/'){

				thrower = true;
				throw new Error('Error in line ' + i + ': ' + arg2.toString().substring(1) + '.');
			} else {
				return arg2;
			}
		} else {
			if (arg3 == '/^(\*)(.){1,}$/'){

				thrower = true;
				throw new Error('Error in line ' + i + ': ' + arg3.toString().substring(1) + '.');
			} else {
				return arg3;
			}
		}
	}

	function Looper(arg){

		var l = Math.Random();

		if (typeof arg == 'number'){

			return 'for (var _' + l + ' = 0 ; _' + l + ' < ' + arg + ' ; _' + l + '++){';
		} else {
			return 'while (' + arg + '){';
		}

		currentScope++;
	}

	function Giselle(arg1,arg2,arg3,arg4,arg5 = "++"){

		if (currentMode == 'operation'){

			if (arg1 == '/^(\*)(.){1,}$/'){

				thrower = true;
				throw new Error('Error in line ' + i + ': ' + arg1.toString().substring(1) + '.');
			} else {
				if (arg5.substring(1) == "+"){
					code[i] += ' ' + arg1.toString();
				} elseif (arg5.substring(1) == "-"){
					code[i] += arg1.toString();
				}
			}

		} elseif (currentMode == 'operand'){

			if (arg2 == '/^(\*)(.){1,}$/'){

				thrower = true;
				throw new Error('Error in line ' + i + ': ' + arg2.toString().substring(1) + '.');
			} else {
				if (arg5.substring(0,1) == "+"){
					code[i] += ',' + arg1.toString();
				} elseif (arg5.substring(0,1) == "-"){
					code[i] += '+' + arg1.toString();
				}
			}
		}

		if (arg3 != 2){

			currentMode = innerModes[arg3];
		}

		currentScope += arg4;
	}

	for (var i = 0 ; i < lines.length ; i++){

		var ifAssignment = lines[i].test(testGiselleAssignmentLine);
		var ifActivity = lines[i].test(testGiselleActivityLine);

		var currentMode = innerModes[0];
		var lastWord = "";

		if (ifAssignment == true || ifActivity == true){

			var words = lines[i].split('/(\s){1,}/');

			words += [''];

			for (var j = 0 ; j < words.length - 1 ; j++){

				var nextWord = words[j+1];

				var word = words[j];

				word == '/^=(\S){1,}$/' && Giselle('*unknown command "' + word + '"',word.substring(1).replaceAll("\'","\\\'").replaceAll("\"","\\\""),2,0) || word == 'loop' && Giselle(Dependent('nextWord==\'/([0-9]){1,}/\' && words[j+2]=="times"',Dependent('parametersDegree==0',Looper(nextWord),'*could not create a loop as a parameter. Please create the loop in a seperate line of code'),Dependent('parametersDegree==0',Looper(true),'*could not create a loop as a parameter. Please create the loop in a seperate line of code')),'\"loop\"',2,0) || word == 'times' && Giselle(Dependent('words[j-2]==loop','','*unknown command "times"'),'\"times\"',2,0) || word == 'not' && Giselle(Dependent('lastWord=="is"','','*unknown command not. You may forgot using "is"'),'not',2,0) || word == '=' && Giselle('*unknown command "="','\" \"',2,0,"+-") || word == 'by' && Giselle('.','\"by\"',2,0,'-+') || word == 'size' && Giselle(Dependent('lastWord=="by"','length','*unknown command "size"'),'\"size\"',2,0,'-+') || word == 'parent' && Giselle(Dependent('lastWord=="by"','parentNode','*unknown command "parent"'),'\"parent\"',2,0,'-+') || word == 'break' && Giselle('break','\"break\"',2,0) || word == empty && Giselle() || word == 'node' && Giselle(Dependent('lastWord=="by"','nodeType','*unknown command "size"'),'\"node\"',2,0,'-+') || word == 'item' && Giselle(Dependent('lastWord=="by"','item','*unknown command "item"'),'\"item\"',2,0,'-+') || word == 'html' && Giselle(Dependent('lastWord=="by"','innerHTML','*unknown command "html"'),'\"html\"',2,0,'-+') || word == 'script' && Giselle(Dependent('lastWord=="by"','currentScript','*unknown command "script"'),'\"script\"',2,0,'-+') || word == 'document' && Giselle(Dependent('lastWord=="by"','document','*unknown command "document"'),'\"document\"',2,0,'-+') || word == 'window' && Giselle('window','\"window\"',2,0) || word == 'current' && Giselle('this','\"this\"',2,0,Dependent('lastWord=="by"',"-+","++")) || word == 'newline' && Giselle('*unknown command "newline"','\n',2,0,"+-") || word == 'text' && Giselle('[\"\"','text',0,0) || word == 'as' && Giselle('*unknown command "as"',']',1,0) || word == 'one' && Giselle(Dependent('lastWord=="as"','[*]','*unknown command "one"'),'\"one\"',2,0) || word == 'some' && Giselle(Dependent('lastWord=="as"','[@].ForEach(this.toString())','*unknown command "some"'),'\"some\"',2,0) || word == 'number' && Giselle(Dependent('lastWord=="as"','[@]ForEach(Number(this))','*unknown command "number"'),'\"number\"',2,0) || word == 'boolean' && Giselle(Dependent('lastWord=="as"','[@].ForEach(this===true)','*unknown command "boolean"'),'\"boolean\"',2,0) || word == 'object' && Giselle(Dependent('lastWord=="as"','[@].ForEach(Object(this))','*unknown command "object"'),'\"object\"',2,0) || word == 'say' && Giselle('alert','say',2,0) && DegreeUp() || word == 'with' && Giselle('&&','with',2,0) || word == 'without' && Giselle('&&','without',2,0) || word == 'also' && Giselle(Dependent('currentScope>0',';','*please start a new line in your code, instead of using "also" keyword'),'also',2,0) || word == 'closed' && Giselle(Dependent('parametersDegree==0',';}',')'),'closed',2,-1) && Dependent('parametersDegree>0',DegreeDown(),'') || word == 'do' && Giselle(Dependent('lastWord==will',Dependent('parametersDegree==0','=> {','*you can not create a function as a parameter. Instead, please define the function in a seperate line in your code, then, call it as a parameter'),'*unknown command gain. You may forgot using "will"'),'do',2,1) || word == 'will' && Giselle('','will',2,0) || word == 'gain' && Giselle(Dependent('lastWord==will','+=','*unknown command gain. You may forgot using "will"'),'gain',2,0) || word == 'lose' && Giselle(Dependent('lastWord==will','-=','*unknown command gain. You may forgot using "will"'),'lose',2,0) || word == 'store' && Giselle(Dependent('lastWord==will','=','*unknown command gain. You may forgot using "will"'),'store',2,0) || word == '/^([a-zA-Z_]){1}([a-zA-Z0-9_]){,}$/' && Giselle(Dependent('nextWord=="will"','var ' + word,Dependent('lastWord=="loop"',word,'*unknown command "' + word + '"')),'"' + word + '"',2,0,Dependent(lastWord=="by","-+","++")) || Giselle(Dependent('nextWord=="will"','*storage name could not be used by JS: ' + word,'*unknown command "' + word + '"'),'"' + word.replaceAll("\'","\\\'").replaceAll("\"","\\\"") + '"',2,0,Dependent(lastWord=="by","-+","++"));

				lastWord = word;
			}

			for (var j = 0 ; j < parametersDegree ; parametersDegree--){

				DegreeDown;
			}

			for (var j = 0 ; j < currentScope ; currentScope--){

				code[i] += ';}';
			}

			code[i] += ';'

		} else {
			thrower = true;
			throw new Error('Phrasing Error: line ' + i + ' is not understandable.\nPlease check the phrasing in:\n' + lines[i].toString());
		}
	}	

} catch(exception) {

	if (thrower == true){

		alert(exception.message);

	} elseif (thrower == false){

		alert('Internal Error: Please report a bug to the developer.');
	}
} try {
	for (var k = 0 ; k < code.length ; k++){

		code[k];
	}

} catch(exception) {

	alert('Logical Error: line ' + k + ' could not be executed. Please check the logical side of the given code:\n' + lines[k].toString());
}

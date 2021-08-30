try {
	function DegreeUp(){

		parametersDegree++;
		code[i] += '(';
	}

	function DegreeDown(){

		parametersDegree--;
		code[i] += ')';
	}

	function Dependent(arg1,arg2,arg3){

		if (arg1){

			if (arg2 == /^(\*){1}(.){1,}$/ ){

				theDev = false;
				throw new Error('Error in line ' + (i+1) + ': ' + arg2.toString().substring(1) + '.');
			} else {
				return arg2;
			}
		} else {
			if (arg3 == /^(\*){1}(.){1,}$/ ){

				theDev = false;
				throw new Error('Error in line ' + (i+1) + ': ' + arg3.toString().substring(1) + '.');
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

	function Giselle(arg1,arg2,arg3,arg4,arg5){

		if (arg5==""){

			arg5 = "++";
		}

		if (currentMode == 'operation'){

			if (arg1 == /^(\*){1}(.){1,}$/ ){

				theDev = false;
				throw new Error('Error in line ' + (i+1) + ': ' + arg1.toString().substring(1) + '.');
			} else {
				if (arg5.substring(1) == "+"){
					code[i] += ' ' + arg1.toString();
				} else if (arg5.substring(1) == "-"){
					code[i] += arg1.toString();
				}
			}

		} else if (currentMode == 'operand'){

			if (arg2 == /^(\*){1}(.){1,}$/ ){

				theDev = false;
				throw new Error('Error in line ' + (i+1) + ': ' + arg2.toString().substring(1) + '.');
			} else {
				if (arg5.substring(0,1) == "+"){
					code[i] += ',' + arg1.toString();
				} else if (arg5.substring(0,1) == "-"){
					code[i] += '+' + arg1.toString();
				}
			}
		}

		if (arg3 != 2){

			currentMode = innerModes[arg3];
		}

		currentScope += arg4;
	}

	var inter='Internal Error: Please report a bug to the developer, with the following details: ';
	var currentScope = 0;
	var parametersDegree = 0;
	var code = [];
	var innerModes = ['operand','operation'];

	var regOpen = '(';
	var regOr = '|';
	var regCloseAny = '){,}';
	var regCloseOne = '){1}';
	var regCloseOneOrZero = '){,1}';
	var regCloseOneOrMore = '){1,}';

	var regAnySpace = ''+
		regOpen + 
			'[ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]' + 
		regCloseAny ;

	var regSpace = ''+
		regOpen + 
			'[ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]' +
		regCloseOneOrMore ;

	var regVariableName = ''+
		regOpen + 
			regAnySpace +
			regOpen + 
				'[a-zA-Z_]' + 
			regCloseOne + 
			regOpen + 
				'[a-zA-Z0-9_]' + 
			regCloseAny +
			regAnySpace +
		regCloseOne ;

	var regLoop = ''+
		regOpen + 
			regAnySpace +
			'loop' + 
		regCloseOne + 
		regOpen + 
			regOpen + 
				regSpace + 
				'[0-9]' + 
			regCloseOneOrMore + 
			regOpen + 
				regSpace + 
				'times' + 
			regCloseOne + 
			regAnySpace +
		regCloseOneOrZero ;

	var regCommands = ''+
		regOpen + 
			regAnySpace +
			regOpen + 
				'say' + 
			regCloseOne + 
			regOr + 
			regOpen + 
				'break' + 
			regCloseOne + 
			regOr + 
			regOpen + 
				'closed' + 
			regCloseOne + 
			regOr + 
			regOpen + 
				regLoop + 
			regCloseOne + 
			regAnySpace +
		regCloseOne ;

	var regBy = ''+
		regOpen + 
			regAnySpace +
			'by' + 
			regSpace + 
			regOpen + 
				'[a-zA-Z]' + 
			regCloseOneOrMore + 
			regAnySpace +
		regCloseOne ;

	var regKeys = ''+
		regOpen + 
			regAnySpace +
			regOpen + 
				'window' + 
			regCloseOneOrZero + 
			regOpen + 
				'current' + 
			regCloseOneOrZero + 
			regOpen + 
				'empty' + 
			regCloseOneOrZero + 
			regOpen + 
				'newline' + 
			regCloseOneOrZero + 
			regAnySpace +
		regCloseOne ;

	var regText = ''+
		regOpen + 
			regOpen + 
				regAnySpace +
				'text' + 
			regCloseOne + 
			regOpen + 
				regSpace + 
				regOpen + 
					'[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]' +
				regCloseOneOrMore + 
			regCloseOneOrMore + 
			regSpace + 
			regOpen + 
				regAnySpace +
				'as' + 
			regCloseOne + 
			regSpace +
			regOpen + 
				'one' + 
				regOr + 
				'some' + 
				regOr + 
				'number'+ 
				regOr + 
				'boolean' + 
				regOr + 
				'object' + 
			regCloseOne + 
			regAnySpace +
		regCloseOneOrMore ;

	var regStorage = ''+
		regOpen +
			regAnySpace +
			regVariableName + 
			regOpen +
				regSpace + 
				'will' + 
				regSpace +
				regOpen + 
					'store' + 
					regOr + 
					'gain' + 
					regOr + 
					'lose' + 
					regOr + 
					'do' + 
				regCloseOne +
			regCloseOne +
			regOr +
			regOpen +
				regSpace + 
				'is' + 
				regSpace +
				regOpen + 
					'like' + 
					regOr + 
					'not' + 
				regCloseOne +
			regCloseOne +
			regAnySpace +
		regCloseOne ;

	var regData = ''+
		regOpen +
			regBy +
			regOr + 
			regText +
			regOr + 
			regKeys +
		regCloseOne ;

	var regFullCommand = ''+
		regOpen +
			regCommands +
			regOr +
			regData +
		regCloseOneOrMore ;

	var regFullStorage = ''+
		regOpen +
			regStorage +
			regOr +
			regData +
		regCloseOneOrMore ;

	var regNext = ''+
		regOpen +
			regAnySpace +
			regOpen +
				'also' +
				regOr +
				'with' +
				regOr +
				'without' +
			regCloseOne +
			regAnySpace +
		regCloseOne ;

	var regAssignment = ''+
		regOpen +
			regAnySpace + 
			regFullStorage + 
			regAnySpace + 
			regOpen + 
				regSpace + 
				regFullCommand + 
				regOpen + 
					regAnySpace + 
					regNext + 
					regAnySpace + 
					regFullCommand +
				regCloseAny + 
			regCloseOneOrZero + 
			regAnySpace +
		regCloseOne ;


	var regActivity = ''+
		regOpen +
			regAnySpace + 
			regFullCommand + 
			regAnySpace + 
		regCloseOne ;

	var regTester = ''+
		regOpen +
			regAssignment + 
			regOr + 
			regActivity + 
		regCloseOne ;

	var reg = new RegExp('^' + regTester + '$');

} catch(exception) {

	alert(inter + exception.message);
} try {
	var theDev = false;

	var lines = document.currentScript.getAttribute("code").split('\n');

	for (var i = 0 ; i < lines.length ; i++){

		theDev = true;

		var ifGiselle = reg.test(lines[i]);

		var currentMode = innerModes[0];

		var lastWord = "";

		if (ifGiselle){

			theDev = false;

			var words = lines[i].split(/[ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/);

			words += [''];

			for (var j = 0 ; j < words.length - 1 ; j++){

				var nextWord = words[j+1];

				var word = words[j];

				theDev = true;

				word == '/^(=){1}([^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]){1,}$/' && Giselle('*unknown command "' + word + '"',word.substring(1).replaceAll("\'","\\\'").replaceAll("\"","\\\""),2,0) || 
				word == 'loop' && Giselle(Dependent('nextWord==\'/([0-9]){1,}/\' && words[j+2]=="times"',Dependent('parametersDegree==0',Looper(nextWord),'*could not create a loop as a parameter. Please create the loop in a seperate line of code'),Dependent('parametersDegree==0',Looper(true),'*could not create a loop as a parameter. Please create the loop in a seperate line of code')),'\"loop\"',2,0) || 
				word == 'times' && Giselle(Dependent('words[j-2]==loop','','*unknown command "times"'),'\"times\"',2,0) || 
				word == 'not' && Giselle(Dependent('lastWord=="is"','','*unknown command not. You may forgot using "is"'),'not',2,0) || 
				word == '=' && Giselle('*unknown command "="','\" \"',2,0,"+-") || 
				word == 'by' && Giselle('.','\"by\"',2,0,'-+') || 
				word == 'size' && Giselle(Dependent('lastWord=="by"','length','*unknown command "size"'),'\"size\"',2,0,'-+') || 
				word == 'parent' && Giselle(Dependent('lastWord=="by"','parentNode','*unknown command "parent"'),'\"parent\"',2,0,'-+') || 
				word == 'break' && Giselle('break','\"break\"',2,0) || 
				word == 'empty' && Giselle('\"\"','\"empty\"',2,0) || 
				word == 'node' && Giselle(Dependent('lastWord=="by"','nodeType','*unknown command "size"'),'\"node\"',2,0,'-+') || 
				word == 'item' && Giselle(Dependent('lastWord=="by"','item','*unknown command "item"'),'\"item\"',2,0,'-+') || 
				word == 'html' && Giselle(Dependent('lastWord=="by"','innerHTML','*unknown command "html"'),'\"html\"',2,0,'-+') || 
				word == 'script' && Giselle(Dependent('lastWord=="by"','currentScript','*unknown command "script"'),'\"script\"',2,0,'-+') || 
				word == 'document' && Giselle(Dependent('lastWord=="by"','document','*unknown command "document"'),'\"document\"',2,0,'-+') || 
				word == 'window' && Giselle('window','\"window\"',2,0) || 
				word == 'current' && Giselle('this','\"this\"',2,0,Dependent('lastWord=="by"',"-+","++")) || 
				word == 'newline' && Giselle('*unknown command "newline"','\n',2,0,"+-") || 
				word == 'text' && Giselle('[\"\"','text',0,0) || 
				word == 'as' && Giselle('*unknown command "as"',']',1,0) || 
				word == 'one' && Giselle(Dependent('lastWord=="as"','[*]','*unknown command "one"'),'\"one\"',2,0) || 
				word == 'some' && Giselle(Dependent('lastWord=="as"','[@].ForEach(this.toString())','*unknown command "some"'),'\"some\"',2,0) || 
				word == 'number' && Giselle(Dependent('lastWord=="as"','[@]ForEach(Number(this))','*unknown command "number"'),'\"number\"',2,0) || 
				word == 'boolean' && Giselle(Dependent('lastWord=="as"','[@].ForEach(this===true)','*unknown command "boolean"'),'\"boolean\"',2,0) || 
				word == 'object' && Giselle(Dependent('lastWord=="as"','[@].ForEach(Object(this))','*unknown command "object"'),'\"object\"',2,0) || 
				word == 'say' && Giselle('alert','say',2,0) && DegreeUp() || 
				word == 'with' && Giselle('&&','with',2,0) || 
				word == 'without' && Giselle('&&','without',2,0) || 
				word == 'also' && Giselle(Dependent('currentScope>0',';','*please start a new line in your code, instead of using "also" keyword'),'also',2,0) || 
				word == 'closed' && Giselle(Dependent('parametersDegree==0',';}',')'),'closed',2,-1) && Dependent('parametersDegree>0',DegreeDown(),'') || 
				word == 'do' && Giselle(Dependent('lastWord==will',Dependent('parametersDegree==0','=> {','*you can not create a function as a parameter. Instead, please define the function in a seperate line in your code, then, call it as a parameter'),'*unknown command gain. You may forgot using "will"'),'do',2,1) || 
				word == 'is' && Giselle('','is',2,0) || 
				word == 'like' && Giselle(Dependent('lastWord=="is"','==','*unknown command like. You may forgot using "is"'),'like',2,0) || 
				word == 'not' && Giselle(Dependent('lastWord=="is"','!=','*unknown command not. You may forgot using "is"'),'not',2,0) || 
				word == 'will' && Giselle('','will',2,0) || 
				word == 'gain' && Giselle(Dependent('lastWord=="will"','+=','*unknown command gain. You may forgot using "will"'),'gain',2,0) || 
				word == 'lose' && Giselle(Dependent('lastWord=="will"','-=','*unknown command gain. You may forgot using "will"'),'lose',2,0) || 
				word == 'store' && Giselle(Dependent('lastWord=="will"','=','*unknown command gain. You may forgot using "will"'),'store',2,0) || 
				word == '/^([a-zA-Z_]){1}([a-zA-Z0-9_]){,}$/' && Giselle(Dependent('nextWord=="will"','var ' + word,Dependent('lastWord=="loop"',word,'*unknown command "' + word + '"')),'"' + word + '"',2,0,Dependent('lastWord=="by"',"-+","++")) || 
				Giselle(Dependent('nextWord=="will"','*storage name could not be used by JS: ' + word,'*unknown command "' + word + '"'),'"' + word.replaceAll("\'","\\\'").replaceAll("\"","\\\"") + '"',2,0,Dependent('lastWord=="by"',"-+","++")) ;

				lastWord = word;
			}

			theDev = true;

			for (var j = 0 ; j < parametersDegree ; parametersDegree--){

				DegreeDown();
			}

			for (var j = 0 ; j < currentScope ; currentScope--){

				code[i] += ';}';
			}

			code[i] += ';';

		} else {
			theDev = false;
			throw new Error('Phrasing Error: line ' + (i+1) + ' is not understandable.\nPlease check the phrasing in:\n' + lines[i].toString());
		}
		var theDev = false;
	}	

} catch(exception) {

	if (!(theDev)){

		alert(exception.message);

	} else if (theDev){

		alert(inter + exception.message);
	}
} try {
	for (var k = 0 ; k < code.length ; k++){

		code[k];
	}

} catch(exception) {

	alert('Logical Error: line ' + k + ' could not be executed. Please check the logical side of the given code:\n' + lines[k].toString());
}

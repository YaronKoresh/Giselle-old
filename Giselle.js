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

		alert("Dependent-params: " + arg1 + ";" + arg2 + ";" + arg3) //

		if (arg1){

			if (arg2 == /^\*/ ){

				theDev = false;
				throw new Error('Error in line ' + (i+1) + ': ' + arg2.toString().substring(1) + '.');
			} else {
				return arg2;
			}
		} else {
			if (arg3 == /^\*/ ){

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

		if (typeof arg5 == 'undefined'){

			arg5 = "++";
		}

		alert(arg5) //

		if (currentMode == 'operation'){

			if (arg1 == /^\*/ ){

				theDev = false;
				throw new Error('Error in line ' + (i+1) + ': ' + arg1.toString().substring(1) + '.');

			} else {

				if (arg5.substring(1) == "+"){

					code[i] += ' ' + arg1.toString();

					alert('operation => + => ' + arg1) //

				} else if (arg5.substring(1) == "-"){

					code[i] += arg1.toString();

					alert('operation => - => ' + arg1) //
				}
			}

		} else if (currentMode == 'operand'){

			if (arg2 == /^\*/ ){

				theDev = false;
				throw new Error('Error in line ' + (i+1) + ': ' + arg2.toString().substring(1) + '.');

			} else {

				if (arg5.substring(0,1) == "+"){

					code[i] += ',' + arg1.toString();

					alert('operand => + => ' + arg1) //

				} else if (arg5.substring(0,1) == "-"){

					code[i] += '+' + arg1.toString();

					alert('operand => - => ' + arg1) //
				}
			}
		}

		if (arg3 != 2){

			currentMode = innerModes[arg3];
		}

		alert(code[i]) //

		currentScope += arg4;
	}

	var inter='Internal Error: Please report a bug to the developer, with the following details: ';
	var currentScope = 0;
	var parametersDegree = 0;
	var code;
	var innerModes = ['operand','operation'];
	var currentMode = "";
	var lastWord = "";
	var words = [];
	var nextWord = "";
	var lastWord = "";
	var word = "";
	var found = false;

	var regOpen = '(';
	var regOr = '|';
	var regCloseAny = '){0,}';
	var regCloseOne = '){1}';
	var regCloseOneOrZero = '){0,1}';
	var regCloseOneOrMore = '){1,}';

	var regAnySpace = ''+
		regOpen + 
			regOpen + 
				' ' +
				regOr +
				'	' +
			regCloseOne + 
		regCloseAny ;

	var regSpace = ''+
		regOpen + 
			regOpen + 
				' ' +
				regOr +
				'	' +
			regCloseOne + 
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
			regSpace + 
			regOpen + 
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
			regAnySpace + 
			regAssignment + 
			regOr + 
			regActivity + 
			regAnySpace + 
		regCloseOne ;

	var reg = new RegExp('^' + regTester + '$');

} catch(exception) {

	alert(inter + exception.message);
} try {
	var theDev = false;

	var lines = document.currentScript.getAttribute("code").replaceAll('\n\n','').replaceAll(/^\n/g,'').replaceAll(/\n$/g,'').split('\n');

	for (var i = 0 ; i < lines.length ; i++){

		theDev = true;

		currentMode = innerModes[1];

		lastWord = "";

		if (reg.test(lines[i])){ 

			theDev = false;

			words = lines[i].split(/[ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/);

			code[i] += '(';

			for (var j = 0 ; j < words.length - 1 ; j++){

				found = false;

				nextWord = ( words[j+1] || "" );

				word = words[j];

				theDev = true;

				(word == /^(=){1}([^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]){1,}$/) && Giselle('*unknown command "' + word + '"','\"' + word.substring(1).replaceAll("\'","\\\'").replaceAll("\"","\\\"") + '\"',2,0) && (found = true) ;
				(found == false) && (word == 'loop') && Giselle(Dependent('nextWord==\'/([0-9]){1,}/\' && words[j+2]=="times"',Dependent('parametersDegree==0',Looper(nextWord),'*could not create a loop as a parameter. Please create the loop in a seperate line of code'),Dependent('parametersDegree==0',Looper(true),'*could not create a loop as a parameter. Please create the loop in a seperate line of code')),'\"loop\"',2,0) && (found = true) ;
				(found == false) && (word == 'times') && Giselle(Dependent('words[j-2]==\"loop\"','','*unknown command "times"'),'\"times\"',2,0)  && (found = true) ;
				(found == false) && (word == 'not') && Giselle(Dependent('lastWord=="is"','','*unknown command not. You may forgot using "is"'),'not',2,0) && (found = true) ;
				(found == false) && (word == '=') && Giselle('*unknown command "="','\" \"',2,0,"+-") && (found = true) ;
				(found == false) && (word == 'by') && Giselle('.','\"by\"',2,0,'-+') && (found = true) ;
				(found == false) && (word == 'size') && Giselle(Dependent('lastWord=="by"','length','*unknown command "size"'),'\"size\"',2,0,'-+') && (found = true) ;
				(found == false) && (word == 'parent') && Giselle(Dependent('lastWord=="by"','parentNode','*unknown command "parent"'),'\"parent\"',2,0,'-+') && (found = true) ;
				(found == false) && (word == 'break') && Giselle('break','\"break\"',2,0) && (found = true) ;
				(found == false) && (word == 'empty') && Giselle('\"\"','\"empty\"',2,0) && (found = true) ;
				(found == false) && (word == 'node') && Giselle(Dependent('lastWord=="by"','nodeType','*unknown command "size"'),'\"node\"',2,0,'-+') && (found = true) ;
				(found == false) && (word == 'item') && Giselle(Dependent('lastWord=="by"','item','*unknown command "item"'),'\"item\"',2,0,'-+') && (found = true) ;
				(found == false) && (word == 'html') && Giselle(Dependent('lastWord=="by"','innerHTML','*unknown command "html"'),'\"html\"',2,0,'-+') && (found = true) ;
				(found == false) && (word == 'script') && Giselle(Dependent('lastWord=="by"','currentScript','*unknown command "script"'),'\"script\"',2,0,'-+')  && (found = true) ;
				(found == false) && (word == 'document') && Giselle(Dependent('lastWord=="by"','document','*unknown command "document"'),'\"document\"',2,0,'-+') && (found = true) ;
				(found == false) && (word == 'window') && Giselle('window','\"window\"',2,0)  && (found = true) ;
				(found == false) && (word == 'current') && Giselle('this','\"this\"',2,0,Dependent('lastWord=="by"',"-+","++"))  && (found = true) ;
				(found == false) && (word == 'newline') && Giselle('*unknown command "newline"','\n',2,0,"+-") && (found = true) ;
				(found == false) && (word == 'text') && Giselle('[\"\"','text',0,0)  && (found = true) ;
				(found == false) && (word == 'as') && Giselle('*unknown command "as"','',1,0)  && (found = true) ;
				(found == false) && (word == 'one') && Giselle(Dependent('lastWord=="as"','].join("")','*unknown command "one"'),'\"one\"',2,0,'-+') && (found = true) ;
				(found == false) && (word == 'some') && Giselle(Dependent('lastWord=="as"',']','*unknown command "some"'),'\"some\"',2,0,'-+')  && (found = true) ;
				(found == false) && (word == 'number') && Giselle(Dependent('lastWord=="as"','].forEach(_$D$A$T$A$_ => parseInt(_$D$A$T$A$_))','*unknown command "number"'),'\"number\"',2,0,'-+') && (found = true) ;
				(found == false) && (word == 'boolean') && Giselle(Dependent('lastWord=="as"','].forEach(_$D$A$T$A$_ => this === _$D$A$T$A$_)','*unknown command "boolean"'),'\"boolean\"',2,0,'-+') && (found = true) ;
				(found == false) && (word == 'object') && Giselle(Dependent('lastWord=="as"','].forEach(_$D$A$T$A$_ => Object(_$D$A$T$A$_))','*unknown command "object"'),'\"object\"',2,0,'-+') && (found = true) ;
				(found == false) && (word == 'say') && Giselle('alert','\"say\"',2,0) && DegreeUp()   && (found = true) ;
				(found == false) && (word == 'with') && Giselle(')&&(','with',2,0) && (found = true) ;
				(found == false) && (word == 'without') && Giselle(')&&(_$I$F$_=true);(_$I$F$_==false)&&(','without',2,0) && (found = true) ;
				(found == false) && (word == 'also') && Giselle(Dependent('currentScope>0',');(_$I$F$_ = false);(','*please start a new line in your code, instead of using "also" keyword'),'also',2,0) && (found = true) ;
				(found == false) && (word == 'do') && Giselle(Dependent('lastWord==will',Dependent('parametersDegree==0','=> {','*you can not create a function as a parameter. Instead, please define the function in a seperate line in your code, then, call it as a parameter'),'*unknown command gain. You may forgot using "will"'),'do',2,1) && (found = true) ;
				(found == false) && (word == 'is') && Giselle('','is',2,0)  && (found = true) ;
				(found == false) && (word == 'like') && Giselle(Dependent('lastWord=="is"','==','*unknown command like. You may forgot using "is"'),'like',2,0)  && (found = true) ;
				(found == false) && (word == 'not') && Giselle(Dependent('lastWord=="is"','!=','*unknown command not. You may forgot using "is"'),'not',2,0) && (found = true) ;
				(found == false) && (word == 'will') && Giselle('','will',2,0) && (found = true) ;
				(found == false) && (word == 'gain') && Giselle(Dependent('lastWord=="will"','+=','*unknown command gain. You may forgot using "will"'),'gain',2,0) && (found = true) ;
				(found == false) && (word == 'lose') && Giselle(Dependent('lastWord=="will"','-=','*unknown command gain. You may forgot using "will"'),'lose',2,0) && (found = true) ;
				(found == false) && (word == 'store') && Giselle(Dependent('lastWord=="will"','=','*unknown command gain. You may forgot using "will"'),'store',2,0) && (found = true) ;
				(found == false) && (word == /^([a-zA-Z_]){1}([a-zA-Z0-9_]){,}$/) && Giselle(Dependent('nextWord=="will"','var ' + word,Dependent('lastWord=="loop"',word,'*unknown command "' + word + '"')),'\"' + word + '\"',2,0,Dependent('lastWord=="by"',"-+","++")) && (found = true) ;
				(found == false) && (Giselle(Dependent('nextWord=="will"','*storage name could not be used by JS: ' + word,'*unknown command "' + word + '"'),'"' + word.replaceAll("\'","\\\'").replaceAll("\"","\\\"") + '"',2,0,Dependent('lastWord=="by"',"-+","++"))) && (found = true) ;

				lastWord = word;
			}

			theDev = true;

			for (var j = 0 ; j < parametersDegree ; parametersDegree--){

				DegreeDown();
			}

			for (var j = 0 ; j < currentScope ; currentScope--){

				code[i] += ';}';
			}

			code[i] += ');_$I$F$_=false;';

		} else {
			theDev = false;
			throw new Error('Phrasing Error: line ' + (i+1) + ' is not understandable.\nPlease check the phrasing in:\n' + lines[i].toString());
		}
		theDev = false;
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

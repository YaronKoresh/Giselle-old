export default function Giselle(allCode) {
	function DegreeUp() {
		parametersDegree++;
		code[i] += '(';
	}
	function DegreeDown() {
		parametersDegree--;
		code[i] += ')';
	}
	function Dependent(arg1, arg2, arg3) {
		if (arg1) {
			if (arg2 == /^\*/) {
				theDev = false;
				throw new Error('Error in line ' + (i + 1) + ': ' + arg2.toString().substring(1) + '.');
			} else {
				return arg2;
			}
		} else {
			if (arg3 == /^\*/) {
				theDev = false;
				throw new Error('Error in line ' + (i + 1) + ': ' + arg3.toString().substring(1) + '.');
			} else {
				return arg3;
			}
		}
	}
	function Looper(arg) {
		var l = Math.Random();
    currentScope++;
		if (typeof arg == 'number') {
			return 'for (var _' + l + ' = 0 ; _' + l + ' < ' + arg + ' ; _' + l + '++){';
		} else {
			return 'while (' + arg + '){';
		}
	}
	function GiselleCalc(arg1, arg2, arg3, arg4, arg5) {
		if (typeof arg5 == 'undefined') {
			arg5 = '++';
		}
		if (currentMode == 'operation') {
			if (arg1 == /^\*/) {
				theDev = false;
				throw new Error('Error in line ' + (i + 1) + ': ' + arg1.toString().substring(1) + '.');
			} else {
				if (arg5.substring(1) == '+') {
					code[i] += ' ' + arg1.toString();
				} else if (arg5.substring(1) == '-') {
					code[i] += arg1.toString();
				}
			}
		} else if (currentMode == 'operand') {
			if (arg2 == /^\*/) {
				theDev = false;
				throw new Error('Error in line ' + (i + 1) + ': ' + arg2.toString().substring(1) + '.');
			} else {
				if (arg5.substring(0, 1) == '+') {
					code[i] += ',' + arg1.toString();
				} else if (arg5.substring(0, 1) == '-') {
					code[i] += '+' + arg1.toString();
				}
			}
		}
		if (arg3 != 2) {
			currentMode = innerModes[arg3];
		}
		currentScope += arg4;
	}
	var i = 0;
  var j = 0;
  var k = 0;
  var inter = 'Internal Error: Please report a bug to the developer, with the following details: ';
  var currentScope = 0;
	var parametersDegree = 0;
	var innerModes = [
		'operand',
		'operation'
	];
  var code = [];
  var arrayNow = false;
	var currentMode = '';
	var lastWord = '';
	var nextWord = '';
	var word = '';
	var found = false;
	var regOpen = '(';
  var regOr = '|';
	var regCloseAny = '){0,}';
	var regCloseOne = '){1}';
	var regCloseOneOrZero = '){0,1}';
	var regCloseOneOrMore = '){1,}';
	var regAnySpace = regOpen + regOpen + ' ' + regOr + '\t' + regCloseOne + regCloseAny;
	var regSpace = regOpen + regOpen + ' ' + regOr + '\t' + regCloseOne + regCloseOneOrMore;
	var regVariableName = regOpen + regAnySpace + regOpen + '[a-zA-Z_]' + regCloseOne + regOpen + '[a-zA-Z0-9_]' + regCloseAny + regAnySpace + regCloseOne;
	var regLoop = regOpen + regAnySpace + 'loop' + regCloseOne + regOpen + regSpace + regOpen + '[0-9]' + regCloseOneOrMore + regOr + regOpen + regVariableName + regCloseOne + regOpen + regSpace + 'times' + regCloseOne + regAnySpace + regCloseOneOrZero;
	var regCommands = regOpen + regAnySpace + regOpen + regOpen + 'say' + regCloseOne + regOr + regOpen + 'identifier' + regCloseOne + regOr + regOpen + 'element' + regCloseOne + regOr + regOpen + 'sql' + regCloseOne + regOr + regOpen + 'attribute' + regCloseOne + regOr + regOpen + 'attributing' + regCloseOne + regOr + regOpen + 'break' + regCloseOne + regOr + regOpen + regLoop + regCloseOne + regCloseOne + regAnySpace + regCloseOne;
	var regBy = regOpen + regAnySpace + 'by' + regSpace + regOpen + '[a-zA-Z]' + regCloseOneOrMore + regAnySpace + regCloseOne;
  var regKeys = regOpen + regAnySpace + regOpen + 'window' + regCloseOneOrZero + regOpen + 'current' + regCloseOneOrZero + regOpen + 'empty' + regCloseOneOrZero + regOpen + 'newline' + regCloseOneOrZero + regAnySpace + regCloseOne;
	var regText = regOpen + regOpen + regAnySpace + 'text' + regCloseOne + regOpen + regSpace + regOpen + '[^ \f\n\r\t\x0B\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]' + regCloseOneOrMore + regCloseOneOrMore + regSpace + regOpen + regAnySpace + 'as' + regCloseOne + regSpace + regOpen + 'one' + regOr + 'some' + regOr + 'number' + regOr + 'boolean' + regOr + 'object' + regCloseOne + regAnySpace + regCloseOneOrMore;
  var regIn = regOpen + regAnySpace + 'in' + regSpace + regOpen + regVariableName + regOr + regText + regCloseOne + regAnySpace + regCloseOne;
	var regStorage = regOpen + regAnySpace + regVariableName + regOpen + regSpace + regOpen + regIn + regSpace + regCloseOneOrZero + 'will' + regSpace + regOpen + 'store' + regOr + 'gain' + regOr + 'lose' + regOr + 'do' + regCloseOne + regCloseOne + regOr + regOpen + regSpace + 'is' + regSpace + regOpen + 'like' + regOr + 'not' + regCloseOne + regCloseOne + regAnySpace + regCloseOne;
	var regData = regOpen + regBy + regOr + regIn + regOr + regText + regOr + regKeys + regCloseOne;
	var regFullCommand = regOpen + regCommands + regOr + regData + regCloseOneOrMore;
	var regFullStorage = regOpen + regStorage + regOr + regData + regCloseOneOrMore;
	var regNext = regOpen + regAnySpace + regOpen + 'also' + regOr + 'with' + regOr + 'without' + regCloseOne + regAnySpace + regCloseOne;
	var regAssignment = regOpen + regAnySpace + regFullStorage + regAnySpace + regOpen + regSpace + regFullCommand + regOpen + regAnySpace + regNext + regAnySpace + regFullCommand + regCloseAny + regCloseOneOrZero + regAnySpace + regCloseOne;
	var regActivity = regOpen + regAnySpace + regFullCommand + regAnySpace + regCloseOne;
	var regTester = regOpen + regAnySpace + regAssignment + regOr + regActivity + regAnySpace + regCloseOne;
	var reg = new RegExp('^' + regTester + '$');
  try {
  	var theDev = false;
	(var lines = allCode.replace('\n\n', '').replace(/^\n/, '').replace(/\n$/, '').split('\n')) || (var lines = window.document.currentScript.getAttribute("code").replace('\n\n', '').replace(/^\n/, '').replace(/\n$/, '').split('\n'));
		for (i = 0; i < lines.length; i++) {
			theDev = true;
			currentMode = innerModes[1];
			lastWord = '';
			if (reg.test(lines[i])) {
				theDev = false;
				var words = lines[i].split(/(( |\t){1}){0,}/);
				code[i] = '(';
				for (j = 0; j < words.length - 1; j++) {
					found = false;
					(nextWord = words[j + 1]) || (nextWord = '');
					word = words[j];
					theDev = true;
					(word == 'loop') && (GiselleCalc(Dependent('words[j+2]=="times"', Dependent('parametersDegree==0', Looper(nextWord), '*could not create a loop as a parameter. Please create the loop in a seperate line of code'), Dependent('parametersDegree==0', Looper(true), '*could not create a loop as a parameter. Please create the loop in a seperate line of code')), '"loop"', 2, 0)) && (found = true);
					(found == false) && (word == 'times') && (GiselleCalc(Dependent('words[j-2]=="loop"', '', '*unknown command "times"'), '"times"', 2, 0)) && (found = true);
					(found == false) && (word == 'not') && (GiselleCalc(Dependent('lastWord=="is"', '', '*unknown command not. You may forgot using "is"'), 'not', 2, 0)) && (found = true);
					(found == false) && (word == /^(~){1}([^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]){1,}$/) && (GiselleCalc('*unknown command ' + word.substring(1), word.substring(1), 2, 0, '+-')) && (found = true);
					(found == false) && (word == 'by') && (GiselleCalc('.', '"by"', 2, 0, '-+')) && (found = true);
					(found == false) && (word == 'sql') && (GiselleCalc('require("sqlite3").Database("/GiselleDB").run', '"sql"', 2, 0, '++') && DegreeUp()) && (found = true);
					(found == false) && (word == 'size') && (GiselleCalc(Dependent('lastWord=="by"', 'length', '*unknown command "size"'), '"size"', 2, 0, '-+')) && (found = true);
					(found == false) && (word == 'parent') && (GiselleCalc(Dependent('lastWord=="by"', 'parentNode', '*unknown command "parent"'), '"parent"', 2, 0, '-+')) && (found = true);
					(found == false) && (word == 'break') && (GiselleCalc('break', '"break"', 2, 0)) && (found = true);
					(found == false) && (word == 'node') && (GiselleCalc(Dependent('lastWord=="by"', 'nodeType', '*unknown command "size"'), '"node"', 2, 0, '-+')) && (found = true);
					(found == false) && (word == 'inside') && (GiselleCalc(Dependent('lastWord=="by"', 'innerHTML', '*unknown command "inside"'), '"inside"', 2, 0, '-+')) && (found = true);
					(found == false) && (word == 'script') && (GiselleCalc(Dependent('lastWord=="by"', 'currentScript', '*unknown command "script"'), '"script"', 2, 0, '-+')) && (found = true);
					(found == false) && (word == 'document') && (GiselleCalc(Dependent('lastWord=="by"', 'document', '*unknown command "document"'), '"document"', 2, 0, '-+')) && (found = true);
					(found == false) && (word == 'window') && (GiselleCalc('window', '"window"', 2, 0)) && (found = true);
					(found == false) && (word == 'link') && (GiselleCalc(Dependent('lastWord=="by"', 'open', '*unknown command "link"'), '"link"', 2, 0) && DegreeUp()) && (found = true);
					(found == false) && (word == 'current') && (GiselleCalc('this', '"this"', 2, 0, Dependent('lastWord=="by"', '-+', '++'))) && (found = true);
					(found == false) && (word == 'newline') && (GiselleCalc('*unknown command "newline"', '\n', 2, 0, '+-')) && (found = true);
					(found == false) && (word == 'tab') && (GiselleCalc('*unknown command "tab"', '\t', 2, 0, '+-')) && (found = true);
					(found == false) && (word == 'space') && (GiselleCalc('*unknown command "space"', '" "', 2, 0, '+-')) && (found = true);
					(found == false) && (word == 'text') && (GiselleCalc('[""', 'text', 0, 0)) && (found = true);
          				(found == false) && (word == 'in') && (GiselleCalc('[', '\"in\"', 2, 0,'-+')) && (arrayNow = true) && (found = true);
					(found == false) && (word == 'as') && (GiselleCalc('*unknown command "as"', '', 1, 0)) && (found = true);
					(found == false) && (word == 'one') && (GiselleCalc(Dependent('lastWord=="as"', '].join("")', '*unknown command "one"'), '"one"', 2, 0, '-+')) && (found = true);
					(found == false) && (word == 'some') && (GiselleCalc(Dependent('lastWord=="as"', '].shift()', '*unknown command "some"'), '"some"', 2, 0, '-+')) && (found = true);
					(found == false) && (word == 'number') && (GiselleCalc(Dependent('lastWord=="as"', '].forEach(_$D$A$T$A$_ => parseInt(_$D$A$T$A$_))', '*unknown command "number"'), '"number"', 2, 0, '-+')) && Dependent('arrayNow=="true"', 'code[i] += "]"','') && (arrayNow = false) && (found = true);
					(found == false) && (word == 'boolean') && (GiselleCalc(Dependent('lastWord=="as"', '].forEach(_$D$A$T$A$_ => this === _$D$A$T$A$_)', '*unknown command "boolean"'), '"boolean"', 2, 0, '-+')) && (found = true);
					(found == false) && (word == 'object') && (GiselleCalc(Dependent('lastWord=="as"', '].forEach(_$D$A$T$A$_ => _$D$A$T$A$_)', '*unknown command "object"'), '"object"', 2, 0, '-+')) && (found = true);
					(found == false) && (word == 'say') && (GiselleCalc('\"alert\"', '\"say\"', 2, 0) && DegreeUp()) && (found = true);
					(found == false) && (word == 'attribute') && (GiselleCalc('\"getAttribute\"', '\"attribute\"', 2, 0) && DegreeUp()) && (found = true);
					(found == false) && (word == 'attributing') && (GiselleCalc('\"setAttribute\"', '\"attributing\"', 2, 0) && DegreeUp()) && (found = true);
					(found == false) && (word == 'identifier') && (GiselleCalc('\"getElementByID\"', '\"identifier\"', 2, 0) && DegreeUp()) && (found = true);
					(found == false) && (word == 'element') && (GiselleCalc('\"getElementByName\"', '\"element\"', 2, 0) && DegreeUp()) && (found = true);
					(found == false) && (word == 'with') && (GiselleCalc(')&&(', 'with', 2, 0)) && (found = true);
					(found == false) && (word == 'without') && (GiselleCalc(')&&(_$I$F$_=true);(_$I$F$_==false)&&(', 'without', 2, 0)) && (found = true);
					(found == false) && (word == 'also') && (GiselleCalc(Dependent('parametersDegree>0', ',' ,Dependent('currentScope>0', ');(_$I$F$_ = false);(', '*please start a new line in your code, instead of using "also" keyword')), 'also', 2, 0)) && (found = true);
					(found == false) && (word == 'do') && (GiselleCalc(Dependent('lastWord==will', Dependent('parametersDegree==0', '=> {', '*you can not create a function as a parameter. Instead, please define the function in a seperate line in your code, then, call it as a parameter'), '*unknown command gain. You may forgot using "will"'), 'do', 2, 1)) && (found = true);
					(found == false) && (word == 'is') && (GiselleCalc('', 'is', 2, 0)) && (found = true);
					(found == false) && (word == 'like') && (GiselleCalc(Dependent('lastWord=="is"', '==', '*unknown command like. You may forgot using "is"'), 'like', 2, 0)) && (found = true);
					(found == false) && (word == 'not') && (GiselleCalc(Dependent('lastWord=="is"', '!=', '*unknown command "not". You may forgot using "is"'), 'not', 2, 0)) && (found = true);
					(found == false) && (word == 'over') && (GiselleCalc(Dependent('lastWord=="is"', '>', '*unknown command "over". You may forgot using "is"'), 'over', 2, 0)) && (found = true);
					(found == false) && (word == 'under') && (GiselleCalc(Dependent('lastWord=="is"', '<', '*unknown command "under". You may forgot using "is"'), 'under', 2, 0)) && (found = true);
					(found == false) && (word == 'will') && (GiselleCalc('', 'will', 2, 0)) && (found = true);
					(found == false) && (word == 'gain') && (GiselleCalc(Dependent('lastWord=="will"', '+=', '*unknown command gain. You may forgot using "will"'), 'gain', 2, 0)) && (found = true);
					(found == false) && (word == 'lose') && (GiselleCalc(Dependent('lastWord=="will"', '-=', '*unknown command gain. You may forgot using "will"'), 'lose', 2, 0)) && (found = true);
					(found == false) && (word == 'store') && (GiselleCalc(Dependent('lastWord=="will"', '=', '*unknown command gain. You may forgot using "will"'), 'store', 2, 0)) && (found = true);
					(found == false) && (word == /^([a-zA-Z_]){1}([a-zA-Z0-9_]){,}$/) && (GiselleCalc(Dependent('(nextWord=="will") || ((nextWord=="in") && ((words[j+3]=="will") || (words[j+6]=="will")))', 'var ' + word, Dependent('lastWord=="loop"', word, '*unknown command "' + word + '"')), '"' + word + '"', 2, 0, Dependent('lastWord=="by"', '-+', '++'))) && Dependent('arrayNow=="true"', 'code[i] += "]"','') && (arrayNow = false) && (found = true);
					(found == false) && (word == /^([^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]){1,}$/) && (GiselleCalc(Dependent('nextWord=="will"', '*storage name could not be used by JS: ' + word, '*unknown command "' + word + '"'), '"' + word.replace('\'', '\\\'').replace('"', '\\"').replace('\'', '\\\'') + '"', 2, 0, Dependent('lastWord=="by"', '-+', '++')));
					lastWord = word;
				}
				theDev = true;
				for (j = 0; j < parametersDegree; parametersDegree--) {
					DegreeDown();
				}
				for (j = 0; j < currentScope; currentScope--) {
					code[i] += ';}';
				}
				code[i] += ');_$I$F$_=false;';
			} else {
				theDev = false;
				throw new Error('Phrasing Error: line ' + (i + 1) + ' is not understandable.\nPlease check the phrasing in:\n' + lines[i].toString());
			}
			theDev = false;
		}
	} catch (exception) {
		if (!theDev) {
			alert(exception.message);
		} else if (theDev) {
			alert(inter + exception.message);
		}
	}
	try {
		for (k = 0; k < code.length; k++) {
			code[k];
		}
	} catch (exception) {
		alert('Logical Error: line ' + (k+1) + ' could not be executed. Please check the logical side of the given code:\n' + lines[k].toString());
	}
}

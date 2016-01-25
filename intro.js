
// greet :: String -> String
function greet(who){
    return "Hello, "+who+" :)";
}

// power :: Integer -> Integer -> Integer
function power(base, exponent){
    if(exponent == 0){
	return 1;
    }else if(exponent % 2 == 0){
	var p = power(base, exponent/2)
	return p*p;
    }else{
	return base * power(base,exponent-1);
    }
}

// findSolution :: Integer -> String
function findSolution(target){
    function find(start, history){
	if (start == target){
	    return history;
	}else if (start > target){
	    return null;
	}else{
	    return find(start*3, "(" + history + " * 3)") ||
		find(start+5, "(" + history + " + 5)");
	}
    }
    return find(1, "1");
}

// Min :: Integer -> Integer -> Integer
function Min(a,b){
    if(a < b){
	return a ;
    }else{
	return b ;
    }
}

// isEven :: Integer -> Bool
function isEven(n){
    if(n == 0){
	return true;
    }else if(n == 1){
	return false;
    }else{
	return isEven(n-2);
    }
}

// countBs :: String -> Integer
function countBs(s){
    return countChar(s,"B");
}

// countChar :: String -> Char -> Integer
function countChar(s,target){
    var result = 0 ;
    for(i = 0; i < s.length; i++){
	if(s.charAt(i) == target){
	    result++ ;
	}
    }
    return result ;
}

// Objects and Arrays

// The Lycanthrope's Journal

function phi(table){
    return (table[3]*table[0] - table[2]*table[1])/
	Math.sqrt((table[2] + table[3])*
		  (table[0] + table[1])*
		  (table[1] + table[3])*
		  (table[0] + table[2]));
}

function hasEvent(event, entry){
    return entry.events.indexOf(event) != -1;
}

function tableFor(event, journal){
    var table = [0, 0, 0, 0];
    for (var i=0; i < journal.length; i++){
	var entry = journal[i];
	if(hasEvent(event, entry) && entry.squirrel){
	    table[3] += 1;
	}else if (hasEvent(event, entry)){
	    table[1] += 1;
	}else if (entry.squirrel){
	    table[2] += 1;
	}else{
	    table[0] += 1;
	}
    }
    return table;
}

function gatherCorrelations(journal){
    var phis = {};
    journal.forEach(function(entry){
	entry.events.forEach(function(event){
	    if(!(event in phis)){
		phis[event] = phi(tableFor(event, journal));
	    }
	});
    });
    return phis;
}

function range(a,b){
    var result = [];
    var step = arguments[2];
    if(step == null){
	step = 1;
    }
    for(var i=a; ((i-b)*(step/Math.abs(step)) <= 0) ; i += step){
	result.push(i);
    }
    return result ;
}

function sum(ls){
    var result = 0;
    for(var i = 0; i < ls.length; i++){
	result += ls[i];
    }
    return result;
}

function reverseArray(arr){
    var result = [] ;
    for(var i=0; i < arr.length; i++){
	result.unshift(arr[i]);
    }
    return result;
}

function reverseArrayInPlace(arr){
    var l = arr.length ;
    for(var i=0; i < l/2 ;i++){
	var a = arr[i];
	var b = arr[l-1-i];
	arr[i] = b;
	arr[l-i-1] = a;
    }
}    

function arrayToList(arr){
    if(arr.length == 0){
	return null;
    }else{
	return {
	    value : arr.shift(),
	    rest: arrayToList(arr)
	};
    }
}

function prepend(el, list){
    return {
	value: el,
	rest: list
    };
}

function nth(n, list){
    if(!list){
	return undefined;
    }else if(n == 0){
	return list.value;
    }else{
	return nth(n-1, list.rest);
    }
}

function listToArray(list){
    var result = [];
    var i = 0;
    while(nth(i,list)){
	result.push(nth(i,list));
	i = i+1;
    }
    return result;
}

// Higher Order Functions

function forEach(arr, action){
    for(var i = 0 ; i < arr.length ; i++){
	action(arr[i]);
    }
}

function filter(arr, test){
    var passed = [];
    arr.forEach(function(el){
	if(test(el)){
	    passed.push(el);
	}
    });
    return passed;
}

function map(arr, transform){
    var result = [];
    arr.forEach(function(el){
	result.push(transform(el));
    });
    return result;
}

function reduce(arr, combine, start){
    var current = start;
    arr.forEach(function(el){
	current = combine(current, el);
    });
    return current;
}

function average(arr){
    function plus(a, b){return a+b}
    return arr.reduce(plus) / arr.length;
}

function male(p){return p.sex == "m"}

function female(p){return p.sex == "f"}

function age(p){return p.died - p.born}

/*

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

*/

function ageDiffMother(p){
  if((p.mother == null) || (byName[p.mother] == undefined)){
    return null;
  }else{
    return (p.born - byName[p.mother].born);
  }
}

/* 

console.log(average(ancestry.map(ageDiffMother).filter(function(diff){return diff})));

var byCentury = {};
var ancestry = JSON.parse(ANCESTRY_FILE);


ancestry.forEach(function(p){
  if(century(p) in byCentury){
     byCentury[century(p)].push(age(p));	
  }else{
    byCentury[century(p)] = [age(p)] ;
  }
});
for(var item in byCentury){
  console.log(item + " : " + average(byCentury[item]));
}

*/

function every(arr, action){
  function and(a, b){
    return a && b ;
  } 
  return arr.map(action).reduce(and);
}

function some(arr, action){
  function or(a, b){
    return a || b ;
  } 
  return arr.map(action).reduce(or);
}

// Object Oriented Programming

function Rabbit(type){
    this.type = type ;
}

Rabbit.prototype.speak = function(line){
    return "The " + this.type + " rabbit says " + line ;
} ;

Rabbit.prototype.toString = function(){
  return "This is a " + this.type + " Rabbit!"  
};

// Table Cells Representation

function TextCell(text){
    this.text = text.split("\n");
}

TextCell.prototype.minHeight = function(){
    return this.text.length;
}

TextCell.prototype.minWidth = function(){
    return this.text.reduce(function(width, line){
	return Math.max(width, line.length);
    }, 0)
}

function repeat(string, times){
    var result = "";
	for(var i = 0; i < times; i++){
	    result += string;
	}
    return result;
}


TextCell.prototype.draw = function(width, height){
    var result = [];
    
    for(var i = 0; i < height; i++){
	var line = this.text[i] || "" ;
	result.push(line + repeat(" ", width - line.length));
    }
    return result;
}


function UnderlinedCell(inner){
    this.inner = inner;
}

UnderlinedCell.prototype.minHeight = function(){
    return this.inner.minHeight() + 1;
}

UnderlinedCell.prototype.minWidth = function(){
    return this.inner.minWidth();
}

UnderlinedCell.prototype.draw = function(width, height){
    return this.inner.draw(width, height - 1)
	.concat([repeat("-", width)])
}

function RTextCell(text){
    TextCell.call(this, text);
}

RTextCell.prototype = Object.create(TextCell.prototype);

RTextCell.prototype.draw = function(width, height){
    var result = [];
    
    for(var i = 0; i < height; i++){
	var line = this.text[i] || "" ;
	result.push(repeat(" ", width - line.length) + line);
    }
    return result;
}


// Methods for calculating the minimum heights and widths for the
// rows and columns of table to be drawn out of above table cells

function rowHeights(rows){
    return rows.map(function(row){
	return row.reduce(function(current, cell){
	    return Math.max(current, cell.minHeight());
	}, 0);
    });
}

function colWidths(rows){
    return rows[0].map(function(_, i){
	return rows.reduce(function(current, row){
	    return Math.max(current, row[i].minWidth());
	}, 0);
    });
}

// Draw table method for drawing the tables out of array of arrays of table cells

function drawTable(rows){
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    function drawLine(blocks, lineNo){
	return blocks.map(function(block){
	    return block[lineNo];
	}).join("\t");
    }

    function drawRow(row, rowNum){
	var blocks = row.map(function(cell, colNum){
	    return cell.draw(widths[colNum], heights[rowNum]);
	});

	return blocks[0].map(function(_, lineNo){
	    return drawLine(blocks, lineNo);
	}).join("\n");
    }

    return rows.map(drawRow).join("\n");
    
}

function dataConvert(data){
    var keys = Object.keys(data[0]);
    var keysTable = keys.map(function(key){
	return new UnderlinedCell(new TextCell(key.toString()));	
    });
    var dataTable =  data.map(function(entry){
	var row = [];
	keys.forEach(function(key){
	    var el = entry[key];
	    if (typeof el == "number"){
		row.push(new RTextCell(el.toString()));
	    }else{
		row.push(new TextCell(el.toString()));
	    }
	});
	return row;
    });
    dataTable.unshift(keysTable);
    return dataTable;
}

// Vector Representation

function Vector(x, y){
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(that){
    return new Vector(this.x + that.x, this.y + that.y);
}

Vector.prototype.minus = function(that){
    return new Vector(this.x - that.x, this.y - that.y);
}

Object.defineProperty(Vector.prototype, "length", {
    get: function(){
	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
});

// Stretched Cell Representation

function StretchCell(inner, width, height){
    this.inner = inner;
    this.width = width;
    this.height = height;
}

StretchCell.prototype.minHeight = function(){
    return Math.max(this.height, this.inner.minHeight());
}

StretchCell.prototype.minWidth = function(){
    return Math.max(this.width, this.inner.minWidth());
}

StretchCell.prototype.draw = function(width, height){
    return this.inner.draw(Math.max(this.minWidth(), width),
			   Math.max(this.minHeight(), height));
}


// Bugs & Error Handling

function loop(a, b){
    if(!isNaN(a) && !isNaN(b) && a < b) return range(a, b);
    throw new Error("Not a valid pair of input!");
}

// Regular Expressions

function findDate(s){
    var dateTime = /(\d{1,2})-(\d{1,2})-(\d{1,4})/ ;
    var match = dateTime.exec(s);
    return new Date(Number(match[3]),
		    Number(match[2])-1,
		    Number(match[1]));
}

var stock = "1 lemon , 2 cabbages , and 101 eggs ";
function minusOne ( match , amount , unit ) {
    amount = Number ( amount ) - 1;
    if ( amount == 1)
	unit = unit . slice (0 , unit . length - 1) ;
    else if ( amount == 0){
	amount = " no ";
	unit = unit + "s";
    }
    return amount + " " + unit ;
}

function stripComments(code){
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "")
}



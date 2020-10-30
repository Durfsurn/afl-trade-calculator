(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


// BYTES

function _Bytes_width(bytes)
{
	return bytes.byteLength;
}

var _Bytes_getHostEndianness = F2(function(le, be)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(new Uint8Array(new Uint32Array([1]))[0] === 1 ? le : be));
	});
});


// ENCODERS

function _Bytes_encode(encoder)
{
	var mutableBytes = new DataView(new ArrayBuffer($elm$bytes$Bytes$Encode$getWidth(encoder)));
	$elm$bytes$Bytes$Encode$write(encoder)(mutableBytes)(0);
	return mutableBytes;
}


// SIGNED INTEGERS

var _Bytes_write_i8  = F3(function(mb, i, n) { mb.setInt8(i, n); return i + 1; });
var _Bytes_write_i16 = F4(function(mb, i, n, isLE) { mb.setInt16(i, n, isLE); return i + 2; });
var _Bytes_write_i32 = F4(function(mb, i, n, isLE) { mb.setInt32(i, n, isLE); return i + 4; });


// UNSIGNED INTEGERS

var _Bytes_write_u8  = F3(function(mb, i, n) { mb.setUint8(i, n); return i + 1 ;});
var _Bytes_write_u16 = F4(function(mb, i, n, isLE) { mb.setUint16(i, n, isLE); return i + 2; });
var _Bytes_write_u32 = F4(function(mb, i, n, isLE) { mb.setUint32(i, n, isLE); return i + 4; });


// FLOATS

var _Bytes_write_f32 = F4(function(mb, i, n, isLE) { mb.setFloat32(i, n, isLE); return i + 4; });
var _Bytes_write_f64 = F4(function(mb, i, n, isLE) { mb.setFloat64(i, n, isLE); return i + 8; });


// BYTES

var _Bytes_write_bytes = F3(function(mb, offset, bytes)
{
	for (var i = 0, len = bytes.byteLength, limit = len - 4; i <= limit; i += 4)
	{
		mb.setUint32(offset + i, bytes.getUint32(i));
	}
	for (; i < len; i++)
	{
		mb.setUint8(offset + i, bytes.getUint8(i));
	}
	return offset + len;
});


// STRINGS

function _Bytes_getStringWidth(string)
{
	for (var width = 0, i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		width +=
			(code < 0x80) ? 1 :
			(code < 0x800) ? 2 :
			(code < 0xD800 || 0xDBFF < code) ? 3 : (i++, 4);
	}
	return width;
}

var _Bytes_write_string = F3(function(mb, offset, string)
{
	for (var i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		offset +=
			(code < 0x80)
				? (mb.setUint8(offset, code)
				, 1
				)
				:
			(code < 0x800)
				? (mb.setUint16(offset, 0xC080 /* 0b1100000010000000 */
					| (code >>> 6 & 0x1F /* 0b00011111 */) << 8
					| code & 0x3F /* 0b00111111 */)
				, 2
				)
				:
			(code < 0xD800 || 0xDBFF < code)
				? (mb.setUint16(offset, 0xE080 /* 0b1110000010000000 */
					| (code >>> 12 & 0xF /* 0b00001111 */) << 8
					| code >>> 6 & 0x3F /* 0b00111111 */)
				, mb.setUint8(offset + 2, 0x80 /* 0b10000000 */
					| code & 0x3F /* 0b00111111 */)
				, 3
				)
				:
			(code = (code - 0xD800) * 0x400 + string.charCodeAt(++i) - 0xDC00 + 0x10000
			, mb.setUint32(offset, 0xF0808080 /* 0b11110000100000001000000010000000 */
				| (code >>> 18 & 0x7 /* 0b00000111 */) << 24
				| (code >>> 12 & 0x3F /* 0b00111111 */) << 16
				| (code >>> 6 & 0x3F /* 0b00111111 */) << 8
				| code & 0x3F /* 0b00111111 */)
			, 4
			);
	}
	return offset;
});


// DECODER

var _Bytes_decode = F2(function(decoder, bytes)
{
	try {
		return $elm$core$Maybe$Just(A2(decoder, bytes, 0).b);
	} catch(e) {
		return $elm$core$Maybe$Nothing;
	}
});

var _Bytes_read_i8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getInt8(offset)); });
var _Bytes_read_i16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getInt16(offset, isLE)); });
var _Bytes_read_i32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getInt32(offset, isLE)); });
var _Bytes_read_u8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getUint8(offset)); });
var _Bytes_read_u16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getUint16(offset, isLE)); });
var _Bytes_read_u32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getUint32(offset, isLE)); });
var _Bytes_read_f32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getFloat32(offset, isLE)); });
var _Bytes_read_f64 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 8, bytes.getFloat64(offset, isLE)); });

var _Bytes_read_bytes = F3(function(len, bytes, offset)
{
	return _Utils_Tuple2(offset + len, new DataView(bytes.buffer, bytes.byteOffset + offset, len));
});

var _Bytes_read_string = F3(function(len, bytes, offset)
{
	var string = '';
	var end = offset + len;
	for (; offset < end;)
	{
		var byte = bytes.getUint8(offset++);
		string +=
			(byte < 128)
				? String.fromCharCode(byte)
				:
			((byte & 0xE0 /* 0b11100000 */) === 0xC0 /* 0b11000000 */)
				? String.fromCharCode((byte & 0x1F /* 0b00011111 */) << 6 | bytes.getUint8(offset++) & 0x3F /* 0b00111111 */)
				:
			((byte & 0xF0 /* 0b11110000 */) === 0xE0 /* 0b11100000 */)
				? String.fromCharCode(
					(byte & 0xF /* 0b00001111 */) << 12
					| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
					| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
				)
				:
				(byte =
					((byte & 0x7 /* 0b00000111 */) << 18
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 12
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
						| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
					) - 0x10000
				, String.fromCharCode(Math.floor(byte / 0x400) + 0xD800, byte % 0x400 + 0xDC00)
				);
	}
	return _Utils_Tuple2(offset, string);
});

var _Bytes_decodeFailure = F2(function() { throw 0; });



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2(
		{copied: $elm$core$Maybe$Nothing, export_modal: false, future_picks_checked: _List_Nil, future_picks_going: _List_Nil, hash: $elm$core$Maybe$Nothing, hash_error: '', import_modal: false, picks_checked: _List_Nil, picks_going: _List_Nil, player_filter: '', players_checked: _List_Nil, players_going: _List_Nil, teams_checked: _List_Nil},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Main$CopyDone = function (a) {
	return {$: 'CopyDone', a: a};
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Ports$copyDone = _Platform_incomingPort('copyDone', $elm$json$Json$Decode$string);
var $author$project$Main$subscriptions = function (_v0) {
	return $author$project$Ports$copyDone($author$project$Main$CopyDone);
};
var $ivadzy$bbase64$Base64$Decode$Decoder = function (a) {
	return {$: 'Decoder', a: a};
};
var $elm$bytes$Bytes$Encode$getWidth = function (builder) {
	switch (builder.$) {
		case 'I8':
			return 1;
		case 'I16':
			return 2;
		case 'I32':
			return 4;
		case 'U8':
			return 1;
		case 'U16':
			return 2;
		case 'U32':
			return 4;
		case 'F32':
			return 4;
		case 'F64':
			return 8;
		case 'Seq':
			var w = builder.a;
			return w;
		case 'Utf8':
			var w = builder.a;
			return w;
		default:
			var bs = builder.a;
			return _Bytes_width(bs);
	}
};
var $elm$bytes$Bytes$LE = {$: 'LE'};
var $elm$bytes$Bytes$Encode$write = F3(
	function (builder, mb, offset) {
		switch (builder.$) {
			case 'I8':
				var n = builder.a;
				return A3(_Bytes_write_i8, mb, offset, n);
			case 'I16':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_i16,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'I32':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_i32,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'U8':
				var n = builder.a;
				return A3(_Bytes_write_u8, mb, offset, n);
			case 'U16':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_u16,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'U32':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_u32,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'F32':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_f32,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'F64':
				var e = builder.a;
				var n = builder.b;
				return A4(
					_Bytes_write_f64,
					mb,
					offset,
					n,
					_Utils_eq(e, $elm$bytes$Bytes$LE));
			case 'Seq':
				var bs = builder.b;
				return A3($elm$bytes$Bytes$Encode$writeSequence, bs, mb, offset);
			case 'Utf8':
				var s = builder.b;
				return A3(_Bytes_write_string, mb, offset, s);
			default:
				var bs = builder.a;
				return A3(_Bytes_write_bytes, mb, offset, bs);
		}
	});
var $elm$bytes$Bytes$Encode$writeSequence = F3(
	function (builders, mb, offset) {
		writeSequence:
		while (true) {
			if (!builders.b) {
				return offset;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$builders = bs,
					$temp$mb = mb,
					$temp$offset = A3($elm$bytes$Bytes$Encode$write, b, mb, offset);
				builders = $temp$builders;
				mb = $temp$mb;
				offset = $temp$offset;
				continue writeSequence;
			}
		}
	});
var $elm$bytes$Bytes$Encode$encode = _Bytes_encode;
var $elm$bytes$Bytes$Encode$Seq = F2(
	function (a, b) {
		return {$: 'Seq', a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$getWidths = F2(
	function (width, builders) {
		getWidths:
		while (true) {
			if (!builders.b) {
				return width;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$width = width + $elm$bytes$Bytes$Encode$getWidth(b),
					$temp$builders = bs;
				width = $temp$width;
				builders = $temp$builders;
				continue getWidths;
			}
		}
	});
var $elm$bytes$Bytes$Encode$sequence = function (builders) {
	return A2(
		$elm$bytes$Bytes$Encode$Seq,
		A2($elm$bytes$Bytes$Encode$getWidths, 0, builders),
		builders);
};
var $ivadzy$bbase64$Base64$Decode$encodeBytes = function (encoders) {
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			$elm$core$List$reverse(encoders)));
};
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $ivadzy$bbase64$Base64$Table$charToCodeMap = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('A', 0),
			_Utils_Tuple2('B', 1),
			_Utils_Tuple2('C', 2),
			_Utils_Tuple2('D', 3),
			_Utils_Tuple2('E', 4),
			_Utils_Tuple2('F', 5),
			_Utils_Tuple2('G', 6),
			_Utils_Tuple2('H', 7),
			_Utils_Tuple2('I', 8),
			_Utils_Tuple2('J', 9),
			_Utils_Tuple2('K', 10),
			_Utils_Tuple2('L', 11),
			_Utils_Tuple2('M', 12),
			_Utils_Tuple2('N', 13),
			_Utils_Tuple2('O', 14),
			_Utils_Tuple2('P', 15),
			_Utils_Tuple2('Q', 16),
			_Utils_Tuple2('R', 17),
			_Utils_Tuple2('S', 18),
			_Utils_Tuple2('T', 19),
			_Utils_Tuple2('U', 20),
			_Utils_Tuple2('V', 21),
			_Utils_Tuple2('W', 22),
			_Utils_Tuple2('X', 23),
			_Utils_Tuple2('Y', 24),
			_Utils_Tuple2('Z', 25),
			_Utils_Tuple2('a', 26),
			_Utils_Tuple2('b', 27),
			_Utils_Tuple2('c', 28),
			_Utils_Tuple2('d', 29),
			_Utils_Tuple2('e', 30),
			_Utils_Tuple2('f', 31),
			_Utils_Tuple2('g', 32),
			_Utils_Tuple2('h', 33),
			_Utils_Tuple2('i', 34),
			_Utils_Tuple2('j', 35),
			_Utils_Tuple2('k', 36),
			_Utils_Tuple2('l', 37),
			_Utils_Tuple2('m', 38),
			_Utils_Tuple2('n', 39),
			_Utils_Tuple2('o', 40),
			_Utils_Tuple2('p', 41),
			_Utils_Tuple2('q', 42),
			_Utils_Tuple2('r', 43),
			_Utils_Tuple2('s', 44),
			_Utils_Tuple2('t', 45),
			_Utils_Tuple2('u', 46),
			_Utils_Tuple2('v', 47),
			_Utils_Tuple2('w', 48),
			_Utils_Tuple2('x', 49),
			_Utils_Tuple2('y', 50),
			_Utils_Tuple2('z', 51),
			_Utils_Tuple2('0', 52),
			_Utils_Tuple2('1', 53),
			_Utils_Tuple2('2', 54),
			_Utils_Tuple2('3', 55),
			_Utils_Tuple2('4', 56),
			_Utils_Tuple2('5', 57),
			_Utils_Tuple2('6', 58),
			_Utils_Tuple2('7', 59),
			_Utils_Tuple2('8', 60),
			_Utils_Tuple2('9', 61),
			_Utils_Tuple2('+', 62),
			_Utils_Tuple2('/', 63)
		]));
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $ivadzy$bbase64$Base64$Table$decode = function (_char) {
	return A2(
		$elm$core$Dict$get,
		$elm$core$String$fromChar(_char),
		$ivadzy$bbase64$Base64$Table$charToCodeMap);
};
var $ivadzy$bbase64$Base64$Shift$Shift2 = {$: 'Shift2'};
var $ivadzy$bbase64$Base64$Shift$Shift4 = {$: 'Shift4'};
var $ivadzy$bbase64$Base64$Shift$Shift6 = {$: 'Shift6'};
var $ivadzy$bbase64$Base64$Shift$Shift0 = {$: 'Shift0'};
var $ivadzy$bbase64$Base64$Shift$decodeNext = function (shift) {
	switch (shift.$) {
		case 'Shift0':
			return $ivadzy$bbase64$Base64$Shift$Shift2;
		case 'Shift2':
			return $ivadzy$bbase64$Base64$Shift$Shift4;
		case 'Shift4':
			return $ivadzy$bbase64$Base64$Shift$Shift6;
		default:
			return $ivadzy$bbase64$Base64$Shift$Shift0;
	}
};
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $ivadzy$bbase64$Base64$Shift$toInt = function (shift) {
	switch (shift.$) {
		case 'Shift0':
			return 0;
		case 'Shift2':
			return 2;
		case 'Shift4':
			return 4;
		default:
			return 6;
	}
};
var $ivadzy$bbase64$Base64$Shift$shiftRightZfBy = F2(
	function (shift, value) {
		return value >>> $ivadzy$bbase64$Base64$Shift$toInt(shift);
	});
var $ivadzy$bbase64$Base64$Decode$finishPartialByte = F3(
	function (shift, sextet, partialByte) {
		return partialByte | A2($ivadzy$bbase64$Base64$Shift$shiftRightZfBy, shift, sextet);
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $ivadzy$bbase64$Base64$Shift$shiftLeftBy = F2(
	function (shift, value) {
		return value << $ivadzy$bbase64$Base64$Shift$toInt(shift);
	});
var $elm$bytes$Bytes$Encode$U8 = function (a) {
	return {$: 'U8', a: a};
};
var $elm$bytes$Bytes$Encode$unsignedInt8 = $elm$bytes$Bytes$Encode$U8;
var $ivadzy$bbase64$Base64$Decode$decodeStep = F2(
	function (sextet, _v0) {
		var shift = _v0.a;
		var partialByte = _v0.b;
		var deferredEncoders = _v0.c;
		var nextBlankByte = function () {
			switch (shift.$) {
				case 'Shift0':
					return A2($ivadzy$bbase64$Base64$Shift$shiftLeftBy, $ivadzy$bbase64$Base64$Shift$Shift2, sextet);
				case 'Shift2':
					return A2($ivadzy$bbase64$Base64$Shift$shiftLeftBy, $ivadzy$bbase64$Base64$Shift$Shift4, sextet);
				case 'Shift4':
					return A2($ivadzy$bbase64$Base64$Shift$shiftLeftBy, $ivadzy$bbase64$Base64$Shift$Shift6, sextet);
				default:
					return 0;
			}
		}();
		var finishedByte = function () {
			switch (shift.$) {
				case 'Shift0':
					return $elm$core$Maybe$Nothing;
				case 'Shift2':
					return $elm$core$Maybe$Just(
						A3($ivadzy$bbase64$Base64$Decode$finishPartialByte, $ivadzy$bbase64$Base64$Shift$Shift4, sextet, partialByte));
				case 'Shift4':
					return $elm$core$Maybe$Just(
						A3($ivadzy$bbase64$Base64$Decode$finishPartialByte, $ivadzy$bbase64$Base64$Shift$Shift2, sextet, partialByte));
				default:
					return $elm$core$Maybe$Just(partialByte | sextet);
			}
		}();
		var nextDeferredDecoders = function () {
			if (finishedByte.$ === 'Just') {
				var byte_ = finishedByte.a;
				return A2(
					$elm$core$List$cons,
					$elm$bytes$Bytes$Encode$unsignedInt8(byte_),
					deferredEncoders);
			} else {
				return deferredEncoders;
			}
		}();
		return _Utils_Tuple3(
			$ivadzy$bbase64$Base64$Shift$decodeNext(shift),
			nextBlankByte,
			nextDeferredDecoders);
	});
var $elm$core$String$foldl = _String_foldl;
var $ivadzy$bbase64$Base64$Decode$initialState = _Utils_Tuple3($ivadzy$bbase64$Base64$Shift$Shift0, 0, _List_Nil);
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$String$endsWith = _String_endsWith;
var $ivadzy$bbase64$Base64$Decode$strip = function (input) {
	return A2($elm$core$String$endsWith, '==', input) ? $elm$core$Result$Ok(
		A2($elm$core$String$dropRight, 2, input)) : (A2($elm$core$String$endsWith, '=', input) ? $elm$core$Result$Ok(
		A2($elm$core$String$dropRight, 1, input)) : $elm$core$Result$Ok(input));
};
var $ivadzy$bbase64$Base64$Decode$ValidationError = {$: 'ValidationError'};
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$contains = _Regex_contains;
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $ivadzy$bbase64$Base64$Decode$validate = function (input) {
	var regex = A2(
		$elm$core$Maybe$withDefault,
		$elm$regex$Regex$never,
		$elm$regex$Regex$fromString('^[A-Za-z0-9\\/+]*$'));
	return A2($elm$regex$Regex$contains, regex, input) ? $elm$core$Result$Ok(input) : $elm$core$Result$Err($ivadzy$bbase64$Base64$Decode$ValidationError);
};
var $ivadzy$bbase64$Base64$Decode$tryDecode = function (input) {
	return A2(
		$elm$core$Result$map,
		A2(
			$elm$core$String$foldl,
			F2(
				function (_char, state) {
					return A2(
						$elm$core$Maybe$withDefault,
						state,
						A2(
							$elm$core$Maybe$map,
							function (sextet) {
								return A2($ivadzy$bbase64$Base64$Decode$decodeStep, sextet, state);
							},
							$ivadzy$bbase64$Base64$Table$decode(_char)));
				}),
			$ivadzy$bbase64$Base64$Decode$initialState),
		A2(
			$elm$core$Result$andThen,
			$ivadzy$bbase64$Base64$Decode$validate,
			$ivadzy$bbase64$Base64$Decode$strip(input)));
};
var $ivadzy$bbase64$Base64$Decode$bytes = $ivadzy$bbase64$Base64$Decode$Decoder(
	function (input) {
		var _v0 = $ivadzy$bbase64$Base64$Decode$tryDecode(input);
		if (_v0.$ === 'Ok') {
			var _v1 = _v0.a;
			var deferredEncoders = _v1.c;
			return $elm$core$Result$Ok(
				$ivadzy$bbase64$Base64$Decode$encodeBytes(deferredEncoders));
		} else {
			var e = _v0.a;
			return $elm$core$Result$Err(e);
		}
	});
var $ivadzy$bbase64$Base64$Encode$BytesEncoder = function (a) {
	return {$: 'BytesEncoder', a: a};
};
var $ivadzy$bbase64$Base64$Encode$bytes = function (input) {
	return $ivadzy$bbase64$Base64$Encode$BytesEncoder(input);
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Ports$copy = _Platform_outgoingPort('copy', $elm$json$Json$Encode$string);
var $ivadzy$bbase64$Base64$Decode$decode = F2(
	function (_v0, input) {
		var decoder = _v0.a;
		return decoder(input);
	});
var $elm$bytes$Bytes$Decode$decode = F2(
	function (_v0, bs) {
		var decoder = _v0.a;
		return A2(_Bytes_decode, decoder, bs);
	});
var $author$project$Main$ImportModel = F7(
	function (teams_checked, picks_checked, future_picks_checked, players_checked, picks_going, future_picks_going, players_going) {
		return {future_picks_checked: future_picks_checked, future_picks_going: future_picks_going, picks_checked: picks_checked, picks_going: picks_going, players_checked: players_checked, players_going: players_going, teams_checked: teams_checked};
	});
var $author$project$Main$IS = F2(
	function (_int, string) {
		return {_int: _int, string: string};
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $elm$json$Json$Decode$field = _Json_decodeField;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $author$project$Main$decodeIntStr = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'string',
	$elm$json$Json$Decode$string,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'int',
		$elm$json$Json$Decode$int,
		$elm$json$Json$Decode$succeed($author$project$Main$IS)));
var $author$project$Main$ISS = F3(
	function (_int, string2, string3) {
		return {_int: _int, string2: string2, string3: string3};
	});
var $author$project$Main$decodeIntStrStr = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'string2',
	$elm$json$Json$Decode$string,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'string1',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'int',
			$elm$json$Json$Decode$int,
			$elm$json$Json$Decode$succeed($author$project$Main$ISS))));
var $author$project$Teams$Player = F5(
	function (name, rat, pos, team, id) {
		return {id: id, name: name, pos: pos, rat: rat, team: team};
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $author$project$Main$decodePlayer = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'id',
	$elm$json$Json$Decode$string,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'team',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'pos',
			$elm$json$Json$Decode$string,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'rat',
				$elm$json$Json$Decode$float,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'name',
					$elm$json$Json$Decode$string,
					$elm$json$Json$Decode$succeed($author$project$Teams$Player))))));
var $author$project$Main$PS = F2(
	function (pl, string) {
		return {pl: pl, string: string};
	});
var $author$project$Main$decodePlayerStr = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'string',
	$elm$json$Json$Decode$string,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'player',
		$author$project$Main$decodePlayer,
		$elm$json$Json$Decode$succeed($author$project$Main$PS)));
var $author$project$Main$StrStr = F2(
	function (string1, string2) {
		return {string1: string1, string2: string2};
	});
var $author$project$Main$decodeStrStr = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'string2',
	$elm$json$Json$Decode$string,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'string1',
		$elm$json$Json$Decode$string,
		$elm$json$Json$Decode$succeed($author$project$Main$StrStr)));
var $author$project$Main$SSS = F3(
	function (string1, string2, string3) {
		return {string1: string1, string2: string2, string3: string3};
	});
var $author$project$Main$decodeStrStrStr = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'string3',
	$elm$json$Json$Decode$string,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'string2',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'string1',
			$elm$json$Json$Decode$string,
			$elm$json$Json$Decode$succeed($author$project$Main$SSS))));
var $author$project$Teams$Team = F3(
	function (name, players, picks) {
		return {name: name, picks: picks, players: players};
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Main$decodeTeam = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'picks',
	$elm$json$Json$Decode$list($elm$json$Json$Decode$int),
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'players',
		$elm$json$Json$Decode$list($author$project$Main$decodePlayer),
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'name',
			$elm$json$Json$Decode$string,
			$elm$json$Json$Decode$succeed($author$project$Teams$Team))));
var $author$project$Main$decodeModel = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'players_going',
	$elm$json$Json$Decode$list($author$project$Main$decodePlayerStr),
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'future_picks_going',
		$elm$json$Json$Decode$list($author$project$Main$decodeStrStrStr),
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'picks_going',
			$elm$json$Json$Decode$list($author$project$Main$decodeIntStrStr),
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'players_checked',
				$elm$json$Json$Decode$list($author$project$Main$decodePlayer),
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'future_picks_checked',
					$elm$json$Json$Decode$list($author$project$Main$decodeStrStr),
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'picks_checked',
						$elm$json$Json$Decode$list($author$project$Main$decodeIntStr),
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'teams_checked',
							$elm$json$Json$Decode$list($author$project$Main$decodeTeam),
							$elm$json$Json$Decode$succeed($author$project$Main$ImportModel))))))));
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $folkertdev$elm_flate$Flate$Dynamic = function (a) {
	return {$: 'Dynamic', a: a};
};
var $folkertdev$elm_flate$Flate$WithWindowSize = function (a) {
	return {$: 'WithWindowSize', a: a};
};
var $elm$bytes$Bytes$Decode$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$bytes$Bytes$Decode$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$bytes$Bytes$Decode$Decoder = function (a) {
	return {$: 'Decoder', a: a};
};
var $elm$bytes$Bytes$Decode$bytes = function (n) {
	return $elm$bytes$Bytes$Decode$Decoder(
		_Bytes_read_bytes(n));
};
var $elm$core$Basics$ge = _Utils_ge;
var $elm$bytes$Bytes$Decode$map = F2(
	function (func, _v0) {
		var decodeA = _v0.a;
		return $elm$bytes$Bytes$Decode$Decoder(
			F2(
				function (bites, offset) {
					var _v1 = A2(decodeA, bites, offset);
					var aOffset = _v1.a;
					var a = _v1.b;
					return _Utils_Tuple2(
						aOffset,
						func(a));
				}));
	});
var $elm$bytes$Bytes$Decode$succeed = function (a) {
	return $elm$bytes$Bytes$Decode$Decoder(
		F2(
			function (_v0, offset) {
				return _Utils_Tuple2(offset, a);
			}));
};
var $folkertdev$elm_flate$Deflate$Internal$chunksHelp = F2(
	function (chunkSize, _v0) {
		var sizeRemaining = _v0.a;
		var accum = _v0.b;
		return (!sizeRemaining) ? $elm$bytes$Bytes$Decode$succeed(
			$elm$bytes$Bytes$Decode$Done(_List_Nil)) : ((_Utils_cmp(chunkSize, sizeRemaining) > -1) ? A2(
			$elm$bytes$Bytes$Decode$map,
			function (_new) {
				return $elm$bytes$Bytes$Decode$Done(
					$elm$core$List$reverse(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(true, _new),
							accum)));
			},
			$elm$bytes$Bytes$Decode$bytes(sizeRemaining)) : A2(
			$elm$bytes$Bytes$Decode$map,
			function (_new) {
				return $elm$bytes$Bytes$Decode$Loop(
					_Utils_Tuple2(
						sizeRemaining - chunkSize,
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(false, _new),
							accum)));
			},
			$elm$bytes$Bytes$Decode$bytes(chunkSize)));
	});
var $elm$bytes$Bytes$Decode$loopHelp = F4(
	function (state, callback, bites, offset) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var decoder = _v0.a;
			var _v1 = A2(decoder, bites, offset);
			var newOffset = _v1.a;
			var step = _v1.b;
			if (step.$ === 'Loop') {
				var newState = step.a;
				var $temp$state = newState,
					$temp$callback = callback,
					$temp$bites = bites,
					$temp$offset = newOffset;
				state = $temp$state;
				callback = $temp$callback;
				bites = $temp$bites;
				offset = $temp$offset;
				continue loopHelp;
			} else {
				var result = step.a;
				return _Utils_Tuple2(newOffset, result);
			}
		}
	});
var $elm$bytes$Bytes$Decode$loop = F2(
	function (state, callback) {
		return $elm$bytes$Bytes$Decode$Decoder(
			A2($elm$bytes$Bytes$Decode$loopHelp, state, callback));
	});
var $elm$bytes$Bytes$width = _Bytes_width;
var $folkertdev$elm_flate$Deflate$Internal$chunks = F2(
	function (chunkSize, buffer) {
		var _v0 = A2(
			$elm$bytes$Bytes$Decode$decode,
			A2(
				$elm$bytes$Bytes$Decode$loop,
				_Utils_Tuple2(
					$elm$bytes$Bytes$width(buffer),
					_List_Nil),
				$folkertdev$elm_flate$Deflate$Internal$chunksHelp(chunkSize)),
			buffer);
		if (_v0.$ === 'Nothing') {
			return _List_fromArray(
				[
					_Utils_Tuple2(
					true,
					$elm$bytes$Bytes$Encode$encode(
						$elm$bytes$Bytes$Encode$sequence(_List_Nil)))
				]);
		} else {
			if (!_v0.a.b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						true,
						$elm$bytes$Bytes$Encode$encode(
							$elm$bytes$Bytes$Encode$sequence(_List_Nil)))
					]);
			} else {
				var value = _v0.a;
				return value;
			}
		}
	});
var $folkertdev$elm_flate$Deflate$Internal$default_block_size = 1024 * 1024;
var $folkertdev$elm_flate$Deflate$BitWriter$empty = {bitsWritten: 0, encoders: _List_Nil, tag: 0};
var $folkertdev$elm_flate$Deflate$Symbol$code = function (symbol) {
	switch (symbol.$) {
		case 'Literal':
			var _byte = symbol.a;
			return _byte;
		case 'EndOfBlock':
			return 256;
		default:
			var length = symbol.a;
			return ((length >= 3) && (length <= 10)) ? ((257 + length) - 3) : (((length >= 11) && (length <= 18)) ? (265 + (((length - 11) / 2) | 0)) : (((length >= 19) && (length <= 34)) ? (269 + (((length - 19) / 4) | 0)) : (((length >= 35) && (length <= 66)) ? (273 + (((length - 35) / 8) | 0)) : (((length >= 67) && (length <= 130)) ? (277 + (((length - 67) / 16) | 0)) : (((length >= 131) && (length <= 257)) ? (281 + (((length - 131) / 32) | 0)) : ((length === 258) ? 285 : (-1)))))));
	}
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $folkertdev$elm_flate$Deflate$Symbol$distance = function (symbol) {
	if (symbol.$ === 'Share') {
		var distance_ = symbol.b;
		if (distance_ <= 4) {
			return $elm$core$Maybe$Just(
				_Utils_Tuple3(distance_ - 1, 0, 0));
		} else {
			var go = F3(
				function (extraBits, code_, base) {
					go:
					while (true) {
						if (_Utils_cmp(base * 2, distance_) < 0) {
							var $temp$extraBits = extraBits + 1,
								$temp$code_ = code_ + 2,
								$temp$base = base * 2;
							extraBits = $temp$extraBits;
							code_ = $temp$code_;
							base = $temp$base;
							continue go;
						} else {
							return _Utils_Tuple3(extraBits, code_, base);
						}
					}
				});
			var _v1 = A3(go, 1, 4, 4);
			var extraBits = _v1.a;
			var code_ = _v1.b;
			var base = _v1.c;
			var delta = (distance_ - base) - 1;
			var half = (base / 2) | 0;
			return (_Utils_cmp(distance_, base + half) < 1) ? $elm$core$Maybe$Just(
				_Utils_Tuple3(
					code_,
					extraBits,
					A2($elm$core$Basics$modBy, half, delta))) : $elm$core$Maybe$Just(
				_Utils_Tuple3(
					code_ + 1,
					extraBits,
					A2($elm$core$Basics$modBy, half, delta)));
		}
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_v0.$ === 'SubTree') {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $folkertdev$elm_flate$Deflate$Symbol$update = F3(
	function (index, tagger, array) {
		var _v0 = A2($elm$core$Array$get, index, array);
		if (_v0.$ === 'Nothing') {
			return array;
		} else {
			var value = _v0.a;
			return A3(
				$elm$core$Array$set,
				index,
				tagger(value),
				array);
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$dynamicFindFrequencies = F2(
	function (symbol, _v0) {
		var literalCounts = _v0.a;
		var distanceCounts = _v0.b;
		var emptyDistanceCount = _v0.c;
		var _v1 = $folkertdev$elm_flate$Deflate$Symbol$distance(symbol);
		if (_v1.$ === 'Nothing') {
			return _Utils_Tuple3(
				A3(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					$folkertdev$elm_flate$Deflate$Symbol$code(symbol),
					function (v) {
						return v + 1;
					},
					literalCounts),
				distanceCounts,
				emptyDistanceCount);
		} else {
			var _v2 = _v1.a;
			var d = _v2.a;
			return _Utils_Tuple3(
				A3(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					$folkertdev$elm_flate$Deflate$Symbol$code(symbol),
					function (v) {
						return v + 1;
					},
					literalCounts),
				A3(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					d,
					function (v) {
						return v + 1;
					},
					distanceCounts),
				false);
		}
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $elm$core$List$sortWith = _List_sortWith;
var $folkertdev$elm_flate$Huffman$calcOptimalMaxBitWidth = function (frequencies) {
	var heapModificationLoop = function (heap) {
		heapModificationLoop:
		while (true) {
			if (!heap.b) {
				return 0;
			} else {
				if (!heap.b.b) {
					var _v1 = heap.a;
					var value = _v1.b;
					return A2($elm$core$Basics$max, 1, value);
				} else {
					var _v2 = heap.a;
					var weight1 = _v2.a;
					var width1 = _v2.b;
					var _v3 = heap.b;
					var _v4 = _v3.a;
					var weight2 = _v4.a;
					var width2 = _v4.b;
					var rest = _v3.b;
					var $temp$heap = A2(
						$elm$core$List$sortWith,
						F2(
							function (a, b) {
								return A2($elm$core$Basics$compare, b, a);
							}),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								weight1 + weight2,
								1 + A2($elm$core$Basics$max, width1, width2)),
							rest));
					heap = $temp$heap;
					continue heapModificationLoop;
				}
			}
		}
	};
	var createHeapFolder = F2(
		function (freq, heap) {
			return (freq > 0) ? A2(
				$elm$core$List$cons,
				_Utils_Tuple2(-freq, 0),
				heap) : heap;
		});
	var createHeap = A3($elm$core$Array$foldl, createHeapFolder, _List_Nil, frequencies);
	return heapModificationLoop(createHeap);
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Array$filter = F2(
	function (isGood, array) {
		return $elm$core$Array$fromList(
			A3(
				$elm$core$Array$foldr,
				F2(
					function (x, xs) {
						return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
					}),
				_List_Nil,
				array));
	});
var $elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var $elm$core$Array$indexedMap = F2(
	function (func, _v0) {
		var len = _v0.a;
		var tree = _v0.c;
		var tail = _v0.d;
		var initialBuilder = {
			nodeList: _List_Nil,
			nodeListSize: 0,
			tail: A3(
				$elm$core$Elm$JsArray$indexedMap,
				func,
				$elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.nodeListSize * $elm$core$Array$branchFactor;
					var mappedLeaf = $elm$core$Array$Leaf(
						A3($elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						nodeList: A2($elm$core$List$cons, mappedLeaf, builder.nodeList),
						nodeListSize: builder.nodeListSize + 1,
						tail: builder.tail
					};
				}
			});
		return A2(
			$elm$core$Array$builderToArray,
			true,
			A3($elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map = F2(
	function (func, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = function (node) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return $elm$core$Array$SubTree(
					A2($elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return $elm$core$Array$Leaf(
					A2($elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2($elm$core$Elm$JsArray$map, helper, tree),
			A2($elm$core$Elm$JsArray$map, func, tail));
	});
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.tail)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.tail, tail);
		return (notAppended < 0) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: $elm$core$Elm$JsArray$empty
		} : {nodeList: builder.nodeList, nodeListSize: builder.nodeListSize, tail: appended});
	});
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (value.$ === 'SubTree') {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$appendHelpTree = F2(
	function (toAppend, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		var itemsToAppend = $elm$core$Elm$JsArray$length(toAppend);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(tail)) - itemsToAppend;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, tail, toAppend);
		var newArray = A2($elm$core$Array$unsafeReplaceTail, appended, array);
		if (notAppended < 0) {
			var nextTail = A3($elm$core$Elm$JsArray$slice, notAppended, itemsToAppend, toAppend);
			return A2($elm$core$Array$unsafeReplaceTail, nextTail, newArray);
		} else {
			return newArray;
		}
	});
var $elm$core$Array$builderFromArray = function (_v0) {
	var len = _v0.a;
	var tree = _v0.c;
	var tail = _v0.d;
	var helper = F2(
		function (node, acc) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
			} else {
				return A2($elm$core$List$cons, node, acc);
			}
		});
	return {
		nodeList: A3($elm$core$Elm$JsArray$foldl, helper, _List_Nil, tree),
		nodeListSize: (len / $elm$core$Array$branchFactor) | 0,
		tail: tail
	};
};
var $elm$core$Array$append = F2(
	function (a, _v0) {
		var aTail = a.d;
		var bLen = _v0.a;
		var bTree = _v0.c;
		var bTail = _v0.d;
		if (_Utils_cmp(bLen, $elm$core$Array$branchFactor * 4) < 1) {
			var foldHelper = F2(
				function (node, array) {
					if (node.$ === 'SubTree') {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, array, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpTree, leaf, array);
					}
				});
			return A2(
				$elm$core$Array$appendHelpTree,
				bTail,
				A3($elm$core$Elm$JsArray$foldl, foldHelper, a, bTree));
		} else {
			var foldHelper = F2(
				function (node, builder) {
					if (node.$ === 'SubTree') {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, builder, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpBuilder, leaf, builder);
					}
				});
			return A2(
				$elm$core$Array$builderToArray,
				true,
				A2(
					$elm$core$Array$appendHelpBuilder,
					bTail,
					A3(
						$elm$core$Elm$JsArray$foldl,
						foldHelper,
						$elm$core$Array$builderFromArray(a),
						bTree)));
		}
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeLoop = F3(
	function (xarr, yarr, accum) {
		mergeLoop:
		while (true) {
			var _v0 = _Utils_Tuple2(xarr, yarr);
			if (!_v0.a.b) {
				return A2(
					$elm$core$Array$append,
					accum,
					$elm$core$Array$fromList(yarr));
			} else {
				if (!_v0.b.b) {
					return A2(
						$elm$core$Array$append,
						accum,
						$elm$core$Array$fromList(xarr));
				} else {
					var _v1 = _v0.a;
					var x = _v1.a;
					var xrest = _v1.b;
					var _v2 = _v0.b;
					var y = _v2.a;
					var yrest = _v2.b;
					if (_Utils_cmp(x.weight, y.weight) < 0) {
						var $temp$xarr = xrest,
							$temp$yarr = yarr,
							$temp$accum = A2($elm$core$Array$push, x, accum);
						xarr = $temp$xarr;
						yarr = $temp$yarr;
						accum = $temp$accum;
						continue mergeLoop;
					} else {
						var $temp$xarr = xarr,
							$temp$yarr = yrest,
							$temp$accum = A2($elm$core$Array$push, y, accum);
						xarr = $temp$xarr;
						yarr = $temp$yarr;
						accum = $temp$accum;
						continue mergeLoop;
					}
				}
			}
		}
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$merge = F2(
	function (x, y) {
		return A3(
			$folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeLoop,
			$elm$core$Array$toList(x),
			$elm$core$Array$toList(y),
			$elm$core$Array$empty);
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeNodes = F2(
	function (node1, node2) {
		return {
			symbols: A2($elm$core$Array$append, node1.symbols, node2.symbols),
			weight: node1.weight + node2.weight
		};
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$package = function (nodes) {
	if ($elm$core$Array$length(nodes) >= 2) {
		var newLen = ($elm$core$Array$length(nodes) / 2) | 0;
		var loop = F2(
			function (currentNodes, accum) {
				loop:
				while (true) {
					if (currentNodes.b && currentNodes.b.b) {
						var self = currentNodes.a;
						var _v1 = currentNodes.b;
						var other = _v1.a;
						var rest = _v1.b;
						var $temp$currentNodes = rest,
							$temp$accum = A2(
							$elm$core$List$cons,
							A2($folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeNodes, self, other),
							accum);
						currentNodes = $temp$currentNodes;
						accum = $temp$accum;
						continue loop;
					} else {
						return $elm$core$Array$fromList(
							$elm$core$List$reverse(accum));
					}
				}
			});
		return A2(
			loop,
			$elm$core$Array$toList(nodes),
			_List_Nil);
	} else {
		return nodes;
	}
};
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			$elm$core$Array$initialize,
			n,
			function (_v0) {
				return e;
			});
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$singletonNode = F2(
	function (symbol, weight) {
		return {
			symbols: A2($elm$core$Array$repeat, 1, symbol),
			weight: weight
		};
	});
var $elm_community$list_extra$List$Extra$stableSortWith = F2(
	function (pred, list) {
		var predWithIndex = F2(
			function (_v1, _v2) {
				var a1 = _v1.a;
				var i1 = _v1.b;
				var a2 = _v2.a;
				var i2 = _v2.b;
				var result = A2(pred, a1, a2);
				if (result.$ === 'EQ') {
					return A2($elm$core$Basics$compare, i1, i2);
				} else {
					return result;
				}
			});
		var listWithIndex = A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, a) {
					return _Utils_Tuple2(a, i);
				}),
			list);
		return A2(
			$elm$core$List$map,
			$elm$core$Tuple$first,
			A2($elm$core$List$sortWith, predWithIndex, listWithIndex));
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$update = F3(
	function (index, tagger, array) {
		var _v0 = A2($elm$core$Array$get, index, array);
		if (_v0.$ === 'Nothing') {
			return array;
		} else {
			var value = _v0.a;
			return A3(
				$elm$core$Array$set,
				index,
				tagger(value),
				array);
		}
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$calculate = F2(
	function (maxBitWidth, frequencies) {
		var source = $elm$core$Array$fromList(
			A2(
				$elm_community$list_extra$List$Extra$stableSortWith,
				F2(
					function (a, b) {
						return A2($elm$core$Basics$compare, a.weight, b.weight);
					}),
				$elm$core$Array$toList(
					A2(
						$elm$core$Array$map,
						function (_v3) {
							var symbol = _v3.a;
							var weight = _v3.b;
							return A2($folkertdev$elm_flate$LengthLimitedHuffmanCodes$singletonNode, symbol, weight);
						},
						A2(
							$elm$core$Array$filter,
							function (_v2) {
								var f = _v2.b;
								return f > 0;
							},
							A2($elm$core$Array$indexedMap, $elm$core$Tuple$pair, frequencies))))));
		var weighted = A3(
			$elm$core$List$foldl,
			F2(
				function (_v1, w) {
					return A2(
						$folkertdev$elm_flate$LengthLimitedHuffmanCodes$merge,
						$folkertdev$elm_flate$LengthLimitedHuffmanCodes$package(w),
						source);
				}),
			source,
			A2($elm$core$List$range, 0, maxBitWidth - 2));
		var loop = F2(
			function (symbols, accum) {
				loop:
				while (true) {
					if (!symbols.b) {
						return accum;
					} else {
						var symbol = symbols.a;
						var rest = symbols.b;
						var $temp$symbols = rest,
							$temp$accum = A3(
							$folkertdev$elm_flate$LengthLimitedHuffmanCodes$update,
							symbol,
							function (v) {
								return v + 1;
							},
							accum);
						symbols = $temp$symbols;
						accum = $temp$accum;
						continue loop;
					}
				}
			});
		var allSymbols = A2(
			$elm$core$List$concatMap,
			A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.symbols;
				},
				$elm$core$Array$toList),
			$elm$core$Array$toList(
				$folkertdev$elm_flate$LengthLimitedHuffmanCodes$package(weighted)));
		return A2(
			loop,
			allSymbols,
			A2(
				$elm$core$Array$repeat,
				$elm$core$Array$length(frequencies),
				0));
	});
var $folkertdev$elm_flate$Huffman$Tree = function (a) {
	return {$: 'Tree', a: a};
};
var $folkertdev$elm_flate$Huffman$Code = function (a) {
	return {$: 'Code', a: a};
};
var $folkertdev$elm_flate$Huffman$codeFromRecord = $folkertdev$elm_flate$Huffman$Code;
var $folkertdev$elm_flate$Huffman$new = function (n) {
	return $folkertdev$elm_flate$Huffman$Tree(
		A2(
			$elm$core$Array$repeat,
			n,
			$folkertdev$elm_flate$Huffman$codeFromRecord(
				{bits: 0, width: 0})));
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $folkertdev$elm_flate$Huffman$inverseEndianLoop = F4(
	function (i, limit, f, t) {
		inverseEndianLoop:
		while (true) {
			if (_Utils_cmp(i, limit) < 0) {
				var $temp$i = i + 1,
					$temp$limit = limit,
					$temp$f = f >> 1,
					$temp$t = (f & 1) | (t << 1);
				i = $temp$i;
				limit = $temp$limit;
				f = $temp$f;
				t = $temp$t;
				continue inverseEndianLoop;
			} else {
				return t;
			}
		}
	});
var $folkertdev$elm_flate$Huffman$inverseEndian = function (_v0) {
	var width = _v0.a.width;
	var bits = _v0.a.bits;
	var inverseBits = A4($folkertdev$elm_flate$Huffman$inverseEndianLoop, 0, width, bits, 0);
	return $folkertdev$elm_flate$Huffman$Code(
		{bits: inverseBits, width: width});
};
var $folkertdev$elm_flate$Huffman$setMapping = F3(
	function (symbol, code, _v0) {
		var array = _v0.a;
		return $folkertdev$elm_flate$Huffman$Tree(
			A3(
				$elm$core$Array$set,
				symbol,
				$folkertdev$elm_flate$Huffman$inverseEndian(code),
				array));
	});
var $folkertdev$elm_flate$Huffman$restoreCanonicalHuffmanCodes = F2(
	function (bitWidths, tree) {
		var symbols = A2(
			$elm_community$list_extra$List$Extra$stableSortWith,
			F2(
				function (_v4, _v5) {
					var a = _v4.b;
					var b = _v5.b;
					return A2($elm$core$Basics$compare, a, b);
				}),
			$elm$core$Array$toList(
				A2(
					$elm$core$Array$filter,
					function (_v3) {
						var codeBitWidth = _v3.b;
						return codeBitWidth > 0;
					},
					A2($elm$core$Array$indexedMap, $elm$core$Tuple$pair, bitWidths))));
		var loop = F2(
			function (_v1, _v2) {
				var symbol = _v1.a;
				var bitWidth = _v1.b;
				var code = _v2.a;
				var prevWidth = _v2.b;
				var currentTree = _v2.c;
				var newBits = code << (bitWidth - prevWidth);
				var nextCode = $folkertdev$elm_flate$Huffman$Code(
					{bits: newBits, width: bitWidth});
				return _Utils_Tuple3(
					newBits + 1,
					bitWidth,
					A3($folkertdev$elm_flate$Huffman$setMapping, symbol, nextCode, currentTree));
			});
		return function (_v0) {
			var x = _v0.c;
			return x;
		}(
			A3(
				$elm$core$List$foldl,
				loop,
				_Utils_Tuple3(0, 0, tree),
				symbols));
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $folkertdev$elm_flate$Huffman$fromBitWidths = function (bitWidths) {
	var symbolCount = function (v) {
		return v + 1;
	}(
		A2(
			$elm$core$Maybe$withDefault,
			0,
			A2(
				$elm$core$Maybe$map,
				$elm$core$Tuple$first,
				function (a) {
					return A2(
						$elm$core$Array$get,
						$elm$core$Array$length(a) - 1,
						a);
				}(
					A2(
						$elm$core$Array$filter,
						function (e) {
							return e.b > 0;
						},
						A2($elm$core$Array$indexedMap, $elm$core$Tuple$pair, bitWidths))))));
	return A2(
		$folkertdev$elm_flate$Huffman$restoreCanonicalHuffmanCodes,
		bitWidths,
		$folkertdev$elm_flate$Huffman$new(symbolCount));
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $folkertdev$elm_flate$Huffman$fromFrequencies = F2(
	function (symbolFrequencies, maxBitWidth_) {
		var maxBitWidth = A2(
			$elm$core$Basics$min,
			maxBitWidth_,
			$folkertdev$elm_flate$Huffman$calcOptimalMaxBitWidth(symbolFrequencies));
		var codeBitWidhts = A2($folkertdev$elm_flate$LengthLimitedHuffmanCodes$calculate, maxBitWidth, symbolFrequencies);
		return $folkertdev$elm_flate$Huffman$fromBitWidths(codeBitWidhts);
	});
var $folkertdev$elm_flate$Deflate$Symbol$buildDynamicHuffmanCodec = function (symbols) {
	var _v0 = A3(
		$elm$core$Array$foldl,
		$folkertdev$elm_flate$Deflate$Symbol$dynamicFindFrequencies,
		_Utils_Tuple3(
			A2($elm$core$Array$repeat, 286, 0),
			A2($elm$core$Array$repeat, 30, 0),
			true),
		symbols);
	var literalCounts = _v0.a;
	var distanceCounts = _v0.b;
	var emptyDistanceCount = _v0.c;
	return {
		distance: emptyDistanceCount ? A2(
			$folkertdev$elm_flate$Huffman$fromFrequencies,
			A3($elm$core$Array$set, 0, 1, distanceCounts),
			15) : A2($folkertdev$elm_flate$Huffman$fromFrequencies, distanceCounts, 15),
		literal: A2($folkertdev$elm_flate$Huffman$fromFrequencies, literalCounts, 15)
	};
};
var $folkertdev$elm_flate$Deflate$Symbol$EndOfBlock = {$: 'EndOfBlock'};
var $folkertdev$elm_flate$Deflate$Symbol$Literal = function (a) {
	return {$: 'Literal', a: a};
};
var $folkertdev$elm_flate$Deflate$Symbol$Share = F2(
	function (a, b) {
		return {$: 'Share', a: a, b: b};
	});
var $folkertdev$elm_flate$Deflate$Internal$codeToSymbol = function (code) {
	if (code.$ === 'Literal') {
		var v = code.a;
		return $folkertdev$elm_flate$Deflate$Symbol$Literal(v);
	} else {
		var length = code.a;
		var backwardDistance = code.b;
		return A2($folkertdev$elm_flate$Deflate$Symbol$Share, length, backwardDistance);
	}
};
var $folkertdev$elm_flate$LZ77$Literal = function (a) {
	return {$: 'Literal', a: a};
};
var $folkertdev$elm_flate$LZ77$Pointer = F2(
	function (a, b) {
		return {$: 'Pointer', a: a, b: b};
	});
var $folkertdev$elm_flate$PrefixTable$Small = function (a) {
	return {$: 'Small', a: a};
};
var $folkertdev$elm_flate$PrefixTable$Large = function (a) {
	return {$: 'Large', a: a};
};
var $folkertdev$elm_flate$PrefixTable$LargePrefixTable = function (a) {
	return {$: 'LargePrefixTable', a: a};
};
var $folkertdev$elm_flate$PrefixTable$insertInList = F6(
	function (i, array, p2, position, remaining, accum) {
		insertInList:
		while (true) {
			if (!remaining.b) {
				var newPositions = A2(
					$elm$core$List$cons,
					_Utils_Tuple2(p2, position),
					accum);
				return _Utils_Tuple2(
					$folkertdev$elm_flate$PrefixTable$Large(
						$folkertdev$elm_flate$PrefixTable$LargePrefixTable(
							A3($elm$core$Array$set, i, newPositions, array))),
					$elm$core$Maybe$Nothing);
			} else {
				var current = remaining.a;
				var key = current.a;
				var oldValue = current.b;
				var rest = remaining.b;
				if (!(key - p2)) {
					var newPositions = _Utils_ap(
						accum,
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(key, position),
							rest));
					return _Utils_Tuple2(
						$folkertdev$elm_flate$PrefixTable$Large(
							$folkertdev$elm_flate$PrefixTable$LargePrefixTable(
								A3($elm$core$Array$set, i, newPositions, array))),
						$elm$core$Maybe$Just(oldValue));
				} else {
					var $temp$i = i,
						$temp$array = array,
						$temp$p2 = p2,
						$temp$position = position,
						$temp$remaining = rest,
						$temp$accum = A2($elm$core$List$cons, current, accum);
					i = $temp$i;
					array = $temp$array;
					p2 = $temp$p2;
					position = $temp$position;
					remaining = $temp$remaining;
					accum = $temp$accum;
					continue insertInList;
				}
			}
		}
	});
var $folkertdev$elm_flate$PrefixTable$insert = F3(
	function (_v0, position, ptable) {
		var prefix_ = _v0.a;
		var prefix = 16777215 & (prefix_ >>> 0);
		if (ptable.$ === 'Small') {
			var dict = ptable.a;
			var _v2 = A2($elm$core$Dict$get, prefix, dict);
			if (_v2.$ === 'Nothing') {
				return _Utils_Tuple2(
					$folkertdev$elm_flate$PrefixTable$Small(
						A3($elm$core$Dict$insert, prefix, position, dict)),
					$elm$core$Maybe$Nothing);
			} else {
				var oldValue = _v2.a;
				return _Utils_Tuple2(
					$folkertdev$elm_flate$PrefixTable$Small(
						A3($elm$core$Dict$insert, prefix, position, dict)),
					$elm$core$Maybe$Just(oldValue));
			}
		} else {
			var array = ptable.a.a;
			var index = prefix >> 8;
			var _v3 = A2($elm$core$Array$get, index, array);
			if (_v3.$ === 'Nothing') {
				return _Utils_Tuple2(ptable, $elm$core$Maybe$Nothing);
			} else {
				var positions = _v3.a;
				return A6($folkertdev$elm_flate$PrefixTable$insertInList, index, array, 255 & prefix, position, positions, _List_Nil);
			}
		}
	});
var $folkertdev$elm_flate$Experimental$ByteArray$length = function (_v0) {
	var array = _v0.a;
	var finalSize = _v0.b;
	var finalBytes = _v0.c;
	var _v1 = $elm$core$Array$length(array) * 4;
	if (!_v1) {
		return finalSize;
	} else {
		var l = _v1;
		return l + finalSize;
	}
};
var $folkertdev$elm_flate$Experimental$ByteArray$get = F2(
	function (index, _v0) {
		var array = _v0.a;
		var finalSize = _v0.b;
		var finalBytes = _v0.c;
		var offset = index % 4;
		if (_Utils_cmp(
			index,
			($elm$core$Array$length(array) * 4) + finalSize) > -1) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (_Utils_cmp(
				index,
				$elm$core$Array$length(array) * 4) > -1) {
				return $elm$core$Maybe$Just(255 & (finalBytes >>> (8 * (3 - offset))));
			} else {
				var internalIndex = (index / 4) | 0;
				var _v1 = A2($elm$core$Array$get, internalIndex, array);
				if (_v1.$ === 'Nothing') {
					return $elm$core$Maybe$Nothing;
				} else {
					var int32 = _v1.a;
					return $elm$core$Maybe$Just(255 & (int32 >>> (8 * (3 - offset))));
				}
			}
		}
	});
var $folkertdev$elm_flate$LZ77$longestCommonPrefixLoop = F5(
	function (i, j, limit, accum, array) {
		longestCommonPrefixLoop:
		while (true) {
			if (_Utils_cmp(i, limit) < 0) {
				var _v0 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, i, array);
				if (_v0.$ === 'Nothing') {
					return accum;
				} else {
					var value1 = _v0.a;
					var _v1 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, j, array);
					if (_v1.$ === 'Nothing') {
						return accum;
					} else {
						var value2 = _v1.a;
						if (!(value1 - value2)) {
							var $temp$i = i + 1,
								$temp$j = j + 1,
								$temp$limit = limit,
								$temp$accum = accum + 1,
								$temp$array = array;
							i = $temp$i;
							j = $temp$j;
							limit = $temp$limit;
							accum = $temp$accum;
							array = $temp$array;
							continue longestCommonPrefixLoop;
						} else {
							return accum;
						}
					}
				}
			} else {
				return accum;
			}
		}
	});
var $folkertdev$elm_flate$LZ77$max_length = 258;
var $folkertdev$elm_flate$LZ77$longestCommonPrefix = F3(
	function (i, j, array) {
		var remaining = A2(
			$elm$core$Basics$min,
			$folkertdev$elm_flate$LZ77$max_length - 3,
			$folkertdev$elm_flate$Experimental$ByteArray$length(array) - j);
		return A5($folkertdev$elm_flate$LZ77$longestCommonPrefixLoop, i, j, i + remaining, 0, array);
	});
var $folkertdev$elm_flate$PrefixTable$OutOfBounds = {$: 'OutOfBounds'};
var $folkertdev$elm_flate$PrefixTable$Prefix = F2(
	function (a, b) {
		return {$: 'Prefix', a: a, b: b};
	});
var $folkertdev$elm_flate$PrefixTable$PrefixCode = function (a) {
	return {$: 'PrefixCode', a: a};
};
var $folkertdev$elm_flate$PrefixTable$Trailing1 = function (a) {
	return {$: 'Trailing1', a: a};
};
var $folkertdev$elm_flate$PrefixTable$Trailing2 = F2(
	function (a, b) {
		return {$: 'Trailing2', a: a, b: b};
	});
var $folkertdev$elm_flate$Experimental$ByteArray$getInt32 = F2(
	function (index, _v0) {
		var array = _v0.a;
		var finalBytes = _v0.c;
		var size = $elm$core$Array$length(array);
		return (!(index - size)) ? $elm$core$Maybe$Just(finalBytes) : A2($elm$core$Array$get, index, array);
	});
var $folkertdev$elm_flate$PrefixTable$prefixAt = F2(
	function (k, input) {
		var size = $folkertdev$elm_flate$Experimental$ByteArray$length(input);
		if (_Utils_cmp(k + 2, size) > -1) {
			if (_Utils_cmp(k, size) > -1) {
				return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
			} else {
				if (_Utils_cmp(k + 1, size) > -1) {
					var _v0 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, k, input);
					if (_v0.$ === 'Nothing') {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var value = _v0.a;
						return $folkertdev$elm_flate$PrefixTable$Trailing1(value);
					}
				} else {
					var _v1 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, k, input);
					if (_v1.$ === 'Nothing') {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var v1 = _v1.a;
						var _v2 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, k + 1, input);
						if (_v2.$ === 'Nothing') {
							return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
						} else {
							var v2 = _v2.a;
							return A2($folkertdev$elm_flate$PrefixTable$Trailing2, v1, v2);
						}
					}
				}
			}
		} else {
			var offset = k % 4;
			var internalIndex = (k / 4) | 0;
			switch (offset) {
				case 0:
					var _v4 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v4.$ === 'Nothing') {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v4.a;
						var first = 255 & ((int32 >> 24) >>> 0);
						var code = int32 >> 8;
						return A2(
							$folkertdev$elm_flate$PrefixTable$Prefix,
							first,
							$folkertdev$elm_flate$PrefixTable$PrefixCode(code));
					}
				case 1:
					var _v5 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v5.$ === 'Nothing') {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v5.a;
						var first = 255 & ((255 & (int32 >> 16)) >>> 0);
						var code = 16777215 & int32;
						return A2(
							$folkertdev$elm_flate$PrefixTable$Prefix,
							first,
							$folkertdev$elm_flate$PrefixTable$PrefixCode(code));
					}
				case 2:
					var _v6 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v6.$ === 'Nothing') {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v6.a;
						var _v7 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex + 1, input);
						if (_v7.$ === 'Nothing') {
							return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
						} else {
							var nextInt32 = _v7.a;
							var first = 255 & ((255 & (int32 >> 8)) >>> 0);
							var code = 16777215 & (((255 & (nextInt32 >> 24)) | ((65535 & int32) << 8)) >>> 0);
							return A2(
								$folkertdev$elm_flate$PrefixTable$Prefix,
								first,
								$folkertdev$elm_flate$PrefixTable$PrefixCode(code));
						}
					}
				default:
					var _v8 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v8.$ === 'Nothing') {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v8.a;
						var _v9 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex + 1, input);
						if (_v9.$ === 'Nothing') {
							return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
						} else {
							var nextInt32 = _v9.a;
							var first = 255 & ((255 & int32) >>> 0);
							var code = (65535 & (nextInt32 >> 16)) | ((255 & int32) << 16);
							return A2(
								$folkertdev$elm_flate$PrefixTable$Prefix,
								first,
								$folkertdev$elm_flate$PrefixTable$PrefixCode(code));
						}
					}
			}
		}
	});
var $folkertdev$elm_flate$LZ77$updatePrefixTableLoop = F4(
	function (k, limit, buffer, prefixTable) {
		updatePrefixTableLoop:
		while (true) {
			if (_Utils_cmp(k, limit) < 0) {
				var _v0 = A2($folkertdev$elm_flate$PrefixTable$prefixAt, k, buffer);
				if (_v0.$ === 'Prefix') {
					var code = _v0.b;
					var _v1 = A3($folkertdev$elm_flate$PrefixTable$insert, code, k, prefixTable);
					var newPrefixTable = _v1.a;
					var $temp$k = k + 1,
						$temp$limit = limit,
						$temp$buffer = buffer,
						$temp$prefixTable = newPrefixTable;
					k = $temp$k;
					limit = $temp$limit;
					buffer = $temp$buffer;
					prefixTable = $temp$prefixTable;
					continue updatePrefixTableLoop;
				} else {
					return prefixTable;
				}
			} else {
				return prefixTable;
			}
		}
	});
var $folkertdev$elm_flate$LZ77$flushLoop = F5(
	function (i, windowSize, buffer, prefixTable, encoders) {
		flushLoop:
		while (true) {
			var _v0 = A2($folkertdev$elm_flate$PrefixTable$prefixAt, i, buffer);
			switch (_v0.$) {
				case 'OutOfBounds':
					return encoders;
				case 'Trailing1':
					var p1 = _v0.a;
					return A2(
						$elm$core$Array$push,
						$folkertdev$elm_flate$LZ77$Literal(p1),
						encoders);
				case 'Trailing2':
					var p1 = _v0.a;
					var p2 = _v0.b;
					return A2(
						$elm$core$Array$push,
						$folkertdev$elm_flate$LZ77$Literal(p2),
						A2(
							$elm$core$Array$push,
							$folkertdev$elm_flate$LZ77$Literal(p1),
							encoders));
				default:
					var p1 = _v0.a;
					var key = _v0.b;
					var _v1 = A3($folkertdev$elm_flate$PrefixTable$insert, key, i, prefixTable);
					var newPrefixTable = _v1.a;
					var matched = _v1.b;
					if (matched.$ === 'Just') {
						var j = matched.a;
						var distance = i - j;
						if ((distance - windowSize) <= 0) {
							var length = 3 + A3($folkertdev$elm_flate$LZ77$longestCommonPrefix, i + 3, j + 3, buffer);
							var newEncoders = A2(
								$elm$core$Array$push,
								A2($folkertdev$elm_flate$LZ77$Pointer, length, distance),
								encoders);
							var newerPrefixTable = A4($folkertdev$elm_flate$LZ77$updatePrefixTableLoop, i + 1, i + length, buffer, newPrefixTable);
							var $temp$i = i + length,
								$temp$windowSize = windowSize,
								$temp$buffer = buffer,
								$temp$prefixTable = newerPrefixTable,
								$temp$encoders = newEncoders;
							i = $temp$i;
							windowSize = $temp$windowSize;
							buffer = $temp$buffer;
							prefixTable = $temp$prefixTable;
							encoders = $temp$encoders;
							continue flushLoop;
						} else {
							var $temp$i = i + 1,
								$temp$windowSize = windowSize,
								$temp$buffer = buffer,
								$temp$prefixTable = newPrefixTable,
								$temp$encoders = A2(
								$elm$core$Array$push,
								$folkertdev$elm_flate$LZ77$Literal(p1),
								encoders);
							i = $temp$i;
							windowSize = $temp$windowSize;
							buffer = $temp$buffer;
							prefixTable = $temp$prefixTable;
							encoders = $temp$encoders;
							continue flushLoop;
						}
					} else {
						var $temp$i = i + 1,
							$temp$windowSize = windowSize,
							$temp$buffer = buffer,
							$temp$prefixTable = newPrefixTable,
							$temp$encoders = A2(
							$elm$core$Array$push,
							$folkertdev$elm_flate$LZ77$Literal(p1),
							encoders);
						i = $temp$i;
						windowSize = $temp$windowSize;
						buffer = $temp$buffer;
						prefixTable = $temp$prefixTable;
						encoders = $temp$encoders;
						continue flushLoop;
					}
			}
		}
	});
var $folkertdev$elm_flate$PrefixTable$max_distance = 32768;
var $folkertdev$elm_flate$PrefixTable$max_window_size = $folkertdev$elm_flate$PrefixTable$max_distance;
var $folkertdev$elm_flate$PrefixTable$newLargePrefixTable = $folkertdev$elm_flate$PrefixTable$LargePrefixTable(
	A2($elm$core$Array$repeat, 65535, _List_Nil));
var $folkertdev$elm_flate$PrefixTable$new = function (nbytes) {
	return (_Utils_cmp(nbytes, $folkertdev$elm_flate$PrefixTable$max_window_size) < 0) ? $folkertdev$elm_flate$PrefixTable$Small($elm$core$Dict$empty) : $folkertdev$elm_flate$PrefixTable$Large($folkertdev$elm_flate$PrefixTable$newLargePrefixTable);
};
var $folkertdev$elm_flate$LZ77$flush = F2(
	function (windowSize, buffer) {
		var codes = A5(
			$folkertdev$elm_flate$LZ77$flushLoop,
			0,
			windowSize,
			buffer,
			$folkertdev$elm_flate$PrefixTable$new(
				$folkertdev$elm_flate$Experimental$ByteArray$length(buffer)),
			$elm$core$Array$empty);
		return codes;
	});
var $folkertdev$elm_flate$Experimental$ByteArray$ByteArray = F3(
	function (a, b, c) {
		return {$: 'ByteArray', a: a, b: b, c: c};
	});
var $folkertdev$elm_flate$Experimental$ByteArray$empty = A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, $elm$core$Array$empty, 0, 0);
var $elm$bytes$Bytes$BE = {$: 'BE'};
var $elm$bytes$Bytes$Decode$andThen = F2(
	function (callback, _v0) {
		var decodeA = _v0.a;
		return $elm$bytes$Bytes$Decode$Decoder(
			F2(
				function (bites, offset) {
					var _v1 = A2(decodeA, bites, offset);
					var newOffset = _v1.a;
					var a = _v1.b;
					var _v2 = callback(a);
					var decodeB = _v2.a;
					return A2(decodeB, bites, newOffset);
				}));
	});
var $elm$bytes$Bytes$Decode$map2 = F3(
	function (func, _v0, _v1) {
		var decodeA = _v0.a;
		var decodeB = _v1.a;
		return $elm$bytes$Bytes$Decode$Decoder(
			F2(
				function (bites, offset) {
					var _v2 = A2(decodeA, bites, offset);
					var aOffset = _v2.a;
					var a = _v2.b;
					var _v3 = A2(decodeB, bites, aOffset);
					var bOffset = _v3.a;
					var b = _v3.b;
					return _Utils_Tuple2(
						bOffset,
						A2(func, a, b));
				}));
	});
var $elm$bytes$Bytes$Decode$map5 = F6(
	function (func, _v0, _v1, _v2, _v3, _v4) {
		var decodeA = _v0.a;
		var decodeB = _v1.a;
		var decodeC = _v2.a;
		var decodeD = _v3.a;
		var decodeE = _v4.a;
		return $elm$bytes$Bytes$Decode$Decoder(
			F2(
				function (bites, offset) {
					var _v5 = A2(decodeA, bites, offset);
					var aOffset = _v5.a;
					var a = _v5.b;
					var _v6 = A2(decodeB, bites, aOffset);
					var bOffset = _v6.a;
					var b = _v6.b;
					var _v7 = A2(decodeC, bites, bOffset);
					var cOffset = _v7.a;
					var c = _v7.b;
					var _v8 = A2(decodeD, bites, cOffset);
					var dOffset = _v8.a;
					var d = _v8.b;
					var _v9 = A2(decodeE, bites, dOffset);
					var eOffset = _v9.a;
					var e = _v9.b;
					return _Utils_Tuple2(
						eOffset,
						A5(func, a, b, c, d, e));
				}));
	});
var $elm$bytes$Bytes$Decode$unsignedInt16 = function (endianness) {
	return $elm$bytes$Bytes$Decode$Decoder(
		_Bytes_read_u16(
			_Utils_eq(endianness, $elm$bytes$Bytes$LE)));
};
var $elm$bytes$Bytes$Decode$unsignedInt32 = function (endianness) {
	return $elm$bytes$Bytes$Decode$Decoder(
		_Bytes_read_u32(
			_Utils_eq(endianness, $elm$bytes$Bytes$LE)));
};
var $elm$bytes$Bytes$Decode$unsignedInt8 = $elm$bytes$Bytes$Decode$Decoder(_Bytes_read_u8);
var $folkertdev$elm_flate$Experimental$ByteArray$fromBytesHelp = function (_v0) {
	var remaining = _v0.a;
	var array = _v0.b;
	if (remaining >= 40) {
		return A2(
			$elm$bytes$Bytes$Decode$andThen,
			$elm$core$Basics$identity,
			A6(
				$elm$bytes$Bytes$Decode$map5,
				F5(
					function (a, b, c, d, e) {
						return A6(
							$elm$bytes$Bytes$Decode$map5,
							F5(
								function (f, g, h, i, j) {
									return $elm$bytes$Bytes$Decode$Loop(
										_Utils_Tuple2(
											remaining - 40,
											A2(
												$elm$core$Array$append,
												array,
												$elm$core$Array$fromList(
													_List_fromArray(
														[a, b, c, d, e, f, g, h, i, j])))));
								}),
							$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
							$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
							$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
							$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
							$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE));
					}),
				$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
				$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
				$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
				$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
				$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE)));
	} else {
		if (remaining >= 20) {
			return A6(
				$elm$bytes$Bytes$Decode$map5,
				F5(
					function (a, b, c, d, e) {
						return $elm$bytes$Bytes$Decode$Loop(
							_Utils_Tuple2(
								remaining - 20,
								A2(
									$elm$core$Array$push,
									e,
									A2(
										$elm$core$Array$push,
										d,
										A2(
											$elm$core$Array$push,
											c,
											A2(
												$elm$core$Array$push,
												b,
												A2($elm$core$Array$push, a, array)))))));
					}),
				$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
				$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
				$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
				$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE),
				$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE));
		} else {
			if (remaining >= 4) {
				return A2(
					$elm$bytes$Bytes$Decode$map,
					function (a) {
						return $elm$bytes$Bytes$Decode$Loop(
							_Utils_Tuple2(
								remaining - 4,
								A2($elm$core$Array$push, a, array)));
					},
					$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE));
			} else {
				switch (remaining) {
					case 0:
						return $elm$bytes$Bytes$Decode$succeed(
							$elm$bytes$Bytes$Decode$Done(
								_Utils_Tuple3(0, 0, array)));
					case 1:
						return A2(
							$elm$bytes$Bytes$Decode$map,
							function (_byte) {
								return $elm$bytes$Bytes$Decode$Done(
									_Utils_Tuple3(1, _byte << 24, array));
							},
							$elm$bytes$Bytes$Decode$unsignedInt8);
					case 2:
						return A2(
							$elm$bytes$Bytes$Decode$map,
							function (_byte) {
								return $elm$bytes$Bytes$Decode$Done(
									_Utils_Tuple3(2, _byte << 16, array));
							},
							$elm$bytes$Bytes$Decode$unsignedInt16($elm$bytes$Bytes$BE));
					default:
						return A3(
							$elm$bytes$Bytes$Decode$map2,
							F2(
								function (bytes, _byte) {
									return $elm$bytes$Bytes$Decode$Done(
										_Utils_Tuple3(3, (bytes << 16) | (_byte << 8), array));
								}),
							$elm$bytes$Bytes$Decode$unsignedInt16($elm$bytes$Bytes$BE),
							$elm$bytes$Bytes$Decode$unsignedInt8);
				}
			}
		}
	}
};
var $folkertdev$elm_flate$Experimental$ByteArray$fromBytes = function (buffer) {
	var _v0 = A2(
		$elm$bytes$Bytes$Decode$decode,
		A2(
			$elm$bytes$Bytes$Decode$loop,
			_Utils_Tuple2(
				$elm$bytes$Bytes$width(buffer),
				$elm$core$Array$empty),
			$folkertdev$elm_flate$Experimental$ByteArray$fromBytesHelp),
		buffer);
	if (_v0.$ === 'Nothing') {
		return $folkertdev$elm_flate$Experimental$ByteArray$empty;
	} else {
		var _v1 = _v0.a;
		var finalSize = _v1.a;
		var finalBytes = _v1.b;
		var array = _v1.c;
		return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes);
	}
};
var $folkertdev$elm_flate$LZ77$encodeWithOptions = F2(
	function (_v0, buffer) {
		var windowSize = _v0.windowSize;
		return A2(
			$folkertdev$elm_flate$LZ77$flush,
			windowSize,
			$folkertdev$elm_flate$Experimental$ByteArray$fromBytes(buffer));
	});
var $folkertdev$elm_flate$ByteArray$decodeByteArrayHelp = function (_v0) {
	var remaining = _v0.a;
	var accum = _v0.b;
	return (remaining >= 4) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_new) {
			var byte4 = 255 & (_new >>> 0);
			var byte3 = 255 & ((_new >> 8) >>> 0);
			var byte2 = 255 & ((_new >> 16) >>> 0);
			var byte1 = 255 & ((_new >> 24) >>> 0);
			var newAccum = A2(
				$elm$core$Array$push,
				byte4,
				A2(
					$elm$core$Array$push,
					byte3,
					A2(
						$elm$core$Array$push,
						byte2,
						A2($elm$core$Array$push, byte1, accum))));
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(remaining - 4, newAccum));
		},
		$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE)) : ((remaining > 0) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_new) {
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(
					remaining - 1,
					A2($elm$core$Array$push, _new, accum)));
		},
		$elm$bytes$Bytes$Decode$unsignedInt8) : $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done(accum)));
};
var $folkertdev$elm_flate$ByteArray$decoder = function (n) {
	return A2(
		$elm$bytes$Bytes$Decode$loop,
		_Utils_Tuple2(n, $elm$core$Array$empty),
		$folkertdev$elm_flate$ByteArray$decodeByteArrayHelp);
};
var $folkertdev$elm_flate$ByteArray$fromBytes = function (buffer) {
	var _v0 = A2(
		$elm$bytes$Bytes$Decode$decode,
		$folkertdev$elm_flate$ByteArray$decoder(
			$elm$bytes$Bytes$width(buffer)),
		buffer);
	if (_v0.$ === 'Nothing') {
		return $elm$core$Array$empty;
	} else {
		var value = _v0.a;
		return value;
	}
};
var $folkertdev$elm_flate$Deflate$Internal$compress = F2(
	function (maybeWindowSize, buf) {
		if (maybeWindowSize.$ === 'Nothing') {
			return A2(
				$elm$core$Array$push,
				$folkertdev$elm_flate$Deflate$Symbol$EndOfBlock,
				A2(
					$elm$core$Array$map,
					$folkertdev$elm_flate$Deflate$Symbol$Literal,
					$folkertdev$elm_flate$ByteArray$fromBytes(buf)));
		} else {
			var windowSize = maybeWindowSize.a;
			return A2(
				$elm$core$Array$push,
				$folkertdev$elm_flate$Deflate$Symbol$EndOfBlock,
				A2(
					$elm$core$Array$map,
					$folkertdev$elm_flate$Deflate$Internal$codeToSymbol,
					A2(
						$folkertdev$elm_flate$LZ77$encodeWithOptions,
						{windowSize: windowSize},
						buf)));
		}
	});
var $elm$bytes$Bytes$Encode$U16 = F2(
	function (a, b) {
		return {$: 'U16', a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$unsignedInt16 = $elm$bytes$Bytes$Encode$U16;
var $folkertdev$elm_flate$Deflate$BitWriter$flushIfNeeded = F3(
	function (tag, bitsWritten, encoders) {
		return (bitsWritten >= 16) ? {
			bitsWritten: bitsWritten - 16,
			encoders: A2(
				$elm$core$List$cons,
				A2($elm$bytes$Bytes$Encode$unsignedInt16, $elm$bytes$Bytes$LE, tag),
				encoders),
			tag: tag >> 16
		} : {bitsWritten: bitsWritten, encoders: encoders, tag: tag};
	});
var $folkertdev$elm_flate$Deflate$BitWriter$writeBits = F3(
	function (bitwidth, bits, state) {
		return A3($folkertdev$elm_flate$Deflate$BitWriter$flushIfNeeded, state.tag | (bits << state.bitsWritten), state.bitsWritten + bitwidth, state.encoders);
	});
var $folkertdev$elm_flate$Huffman$encode = F2(
	function (symbol, _v0) {
		var table = _v0.a;
		var _v1 = A2($elm$core$Array$get, symbol, table);
		if (_v1.$ === 'Nothing') {
			return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 0, 0);
		} else {
			var width = _v1.a.a.width;
			var bits = _v1.a.a.bits;
			return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, width, bits);
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$extraLength = function (symbol) {
	if (symbol.$ === 'Share') {
		var length = symbol.a;
		return (((length >= 3) && (length <= 10)) || (length === 258)) ? $elm$core$Maybe$Nothing : (((length >= 11) && (length <= 18)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				1,
				A2($elm$core$Basics$modBy, 2, length - 11))) : (((length >= 19) && (length <= 34)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				2,
				A2($elm$core$Basics$modBy, 4, length - 19))) : (((length >= 35) && (length <= 66)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				3,
				A2($elm$core$Basics$modBy, 8, length - 35))) : (((length >= 67) && (length <= 130)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				4,
				A2($elm$core$Basics$modBy, 16, length - 67))) : (((length >= 131) && (length <= 257)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				5,
				A2($elm$core$Basics$modBy, 32, length - 131))) : $elm$core$Maybe$Nothing)))));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $folkertdev$elm_flate$Deflate$Symbol$encode = F3(
	function (symbol, htrees, bitWriter) {
		var maybeExtra = function () {
			var _v2 = $folkertdev$elm_flate$Deflate$Symbol$extraLength(symbol);
			if (_v2.$ === 'Nothing') {
				return $elm$core$Basics$identity;
			} else {
				var _v3 = _v2.a;
				var bits = _v3.a;
				var extra = _v3.b;
				return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, bits, extra);
			}
		}();
		var maybeDistance = function () {
			var _v0 = $folkertdev$elm_flate$Deflate$Symbol$distance(symbol);
			if (_v0.$ === 'Nothing') {
				return $elm$core$Basics$identity;
			} else {
				var _v1 = _v0.a;
				var code_ = _v1.a;
				var bits = _v1.b;
				var extra = _v1.c;
				return A2(
					$elm$core$Basics$composeR,
					A2($folkertdev$elm_flate$Huffman$encode, code_, htrees.distance),
					(bits > 0) ? A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, bits, extra) : $elm$core$Basics$identity);
			}
		}();
		return maybeDistance(
			maybeExtra(
				A3(
					$folkertdev$elm_flate$Huffman$encode,
					$folkertdev$elm_flate$Deflate$Symbol$code(symbol),
					htrees.literal,
					bitWriter)));
	});
var $folkertdev$elm_flate$Deflate$Symbol$bitwidth_code_order = _List_fromArray(
	[16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var $folkertdev$elm_flate$Deflate$Symbol$calculateCodes = function (runLengths) {
	var loop2 = F3(
		function (r, c, codes) {
			loop2:
			while (true) {
				if (c >= 3) {
					var n = A2($elm$core$Basics$min, 6, c);
					var $temp$r = r,
						$temp$c = c - n,
						$temp$codes = A2(
						$elm$core$Array$push,
						_Utils_Tuple3(16, 2, n - 3),
						codes);
					r = $temp$r;
					c = $temp$c;
					codes = $temp$codes;
					continue loop2;
				} else {
					return A2(
						$elm$core$Array$append,
						codes,
						A2(
							$elm$core$Array$repeat,
							c,
							_Utils_Tuple3(r.value, 0, 0)));
				}
			}
		});
	var loop1 = F2(
		function (c, codes) {
			loop1:
			while (true) {
				if (c >= 11) {
					var n = A2($elm$core$Basics$min, 138, c);
					var $temp$c = c - n,
						$temp$codes = A2(
						$elm$core$Array$push,
						_Utils_Tuple3(18, 7, n - 11),
						codes);
					c = $temp$c;
					codes = $temp$codes;
					continue loop1;
				} else {
					if (c >= 3) {
						return A2(
							$elm$core$Array$push,
							_Utils_Tuple3(17, 3, c - 3),
							codes);
					} else {
						return A2(
							$elm$core$Array$append,
							codes,
							A2(
								$elm$core$Array$repeat,
								c,
								_Utils_Tuple3(0, 0, 0)));
					}
				}
			}
		});
	var folder = F2(
		function (r, codes) {
			return (!r.value) ? A2(loop1, r.count, codes) : A3(
				loop2,
				r,
				r.count - 1,
				A2(
					$elm$core$Array$push,
					_Utils_Tuple3(r.value, 0, 0),
					codes));
		});
	return A3($elm$core$Array$foldl, folder, $elm$core$Array$empty, runLengths);
};
var $folkertdev$elm_flate$Huffman$getWidth = function (_v0) {
	var width = _v0.a.width;
	return width;
};
var $folkertdev$elm_flate$Huffman$lookup = F2(
	function (symbol, _v0) {
		var array = _v0.a;
		return A2($elm$core$Array$get, symbol, array);
	});
var $folkertdev$elm_flate$Deflate$Symbol$calculateRunLengths = F2(
	function (lengths, accum) {
		calculateRunLengths:
		while (true) {
			if (!lengths.b) {
				return A3($elm$core$List$foldr, $elm$core$Array$push, $elm$core$Array$empty, accum);
			} else {
				var _v1 = lengths.a;
				var e = _v1.a;
				var size = _v1.b;
				var rest = lengths.b;
				var list = A2(
					$elm$core$List$indexedMap,
					$elm$core$Tuple$pair,
					A2(
						$elm$core$List$map,
						function (x) {
							return A2(
								$elm$core$Maybe$withDefault,
								0,
								A2(
									$elm$core$Maybe$map,
									$folkertdev$elm_flate$Huffman$getWidth,
									A2($folkertdev$elm_flate$Huffman$lookup, x, e)));
						},
						A2($elm$core$List$range, 0, size - 1)));
				var folder = F2(
					function (_v3, runLengths) {
						var i = _v3.a;
						var c = _v3.b;
						if (!runLengths.b) {
							return A2(
								$elm$core$List$cons,
								{count: 1, value: c},
								runLengths);
						} else {
							var last = runLengths.a;
							var remaining = runLengths.b;
							return _Utils_eq(last.value, c) ? A2(
								$elm$core$List$cons,
								{count: last.count + 1, value: last.value},
								remaining) : A2(
								$elm$core$List$cons,
								{count: 1, value: c},
								runLengths);
						}
					});
				var $temp$lengths = rest,
					$temp$accum = A3($elm$core$List$foldl, folder, accum, list);
				lengths = $temp$lengths;
				accum = $temp$accum;
				continue calculateRunLengths;
			}
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$buildBitWidthCodes = F3(
	function (literalCodeCount, distanceCodeCount, trees) {
		var runLengths = A2(
			$folkertdev$elm_flate$Deflate$Symbol$calculateRunLengths,
			_List_fromArray(
				[
					_Utils_Tuple2(trees.literal, literalCodeCount),
					_Utils_Tuple2(trees.distance, distanceCodeCount)
				]),
			_List_Nil);
		return $folkertdev$elm_flate$Deflate$Symbol$calculateCodes(runLengths);
	});
var $folkertdev$elm_flate$Deflate$Symbol$positionLoop = F3(
	function (predicate, i, elements) {
		positionLoop:
		while (true) {
			if (!elements.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = elements.a;
				var xs = elements.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(i);
				} else {
					var $temp$predicate = predicate,
						$temp$i = i + 1,
						$temp$elements = xs;
					predicate = $temp$predicate;
					i = $temp$i;
					elements = $temp$elements;
					continue positionLoop;
				}
			}
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$position = F2(
	function (predicate, elements) {
		return A3($folkertdev$elm_flate$Deflate$Symbol$positionLoop, predicate, 0, elements);
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $folkertdev$elm_flate$Huffman$positionFromTheEnd = F2(
	function (predicated, array) {
		var folder = F2(
			function (element, _v1) {
				var index = _v1.a;
				var accum = _v1.b;
				if (accum.$ === 'Just') {
					return _Utils_Tuple2(index, accum);
				} else {
					return predicated(element) ? _Utils_Tuple2(
						index,
						$elm$core$Maybe$Just(index)) : _Utils_Tuple2(index - 1, $elm$core$Maybe$Nothing);
				}
			});
		var finalIndex = $elm$core$Array$length(array) - 1;
		return A2(
			$elm$core$Maybe$map,
			function (v) {
				return finalIndex - v;
			},
			A3(
				$elm$core$Array$foldr,
				folder,
				_Utils_Tuple2(finalIndex, $elm$core$Maybe$Nothing),
				array).b);
	});
var $folkertdev$elm_flate$Huffman$usedMaxSymbol = function (_v0) {
	var array = _v0.a;
	return A2(
		$elm$core$Maybe$map,
		function (trailingZeros) {
			return ($elm$core$Array$length(array) - 1) - trailingZeros;
		},
		A2(
			$folkertdev$elm_flate$Huffman$positionFromTheEnd,
			function (_v1) {
				var value = _v1.a;
				return value.width > 0;
			},
			array));
};
var $folkertdev$elm_flate$Deflate$Symbol$writeDynamicHuffmanCodec = F2(
	function (trees, bitWriter) {
		var literal_code_count = A2(
			$elm$core$Basics$max,
			257,
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$folkertdev$elm_flate$Huffman$usedMaxSymbol(trees.literal)) + 1);
		var distance_code_count = A2(
			$elm$core$Basics$max,
			1,
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$folkertdev$elm_flate$Huffman$usedMaxSymbol(trees.distance)) + 1);
		var codes = A3(
			$folkertdev$elm_flate$Deflate$Symbol$buildBitWidthCodes,
			literal_code_count,
			distance_code_count,
			{distance: trees.distance, literal: trees.literal});
		var codeCounts = A3(
			$elm$core$Array$foldl,
			function (_v2) {
				var i = _v2.a;
				return A2(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					i,
					function (v) {
						return v + 1;
					});
			},
			A2($elm$core$Array$repeat, 19, 0),
			codes);
		var bitWidthEncoder = A2($folkertdev$elm_flate$Huffman$fromFrequencies, codeCounts, 7);
		var bitwidthCodeCount = A2(
			$elm$core$Basics$max,
			4,
			A2(
				$elm$core$Maybe$withDefault,
				0,
				A2(
					$elm$core$Maybe$map,
					function (trailingZeros) {
						return 19 - trailingZeros;
					},
					A2(
						$folkertdev$elm_flate$Deflate$Symbol$position,
						function (i) {
							var _v1 = A2($folkertdev$elm_flate$Huffman$lookup, i, bitWidthEncoder);
							if (_v1.$ === 'Nothing') {
								return false;
							} else {
								var value = _v1.a;
								return $folkertdev$elm_flate$Huffman$getWidth(value) > 0;
							}
						},
						$elm$core$List$reverse($folkertdev$elm_flate$Deflate$Symbol$bitwidth_code_order)))));
		var v1 = function (writer) {
			return A3(
				$elm$core$List$foldl,
				F2(
					function (i, current) {
						var width = _Utils_eq(
							A2($elm$core$Array$get, i, codeCounts),
							$elm$core$Maybe$Just(0)) ? 0 : A2(
							$elm$core$Maybe$withDefault,
							0,
							A2(
								$elm$core$Maybe$map,
								$folkertdev$elm_flate$Huffman$getWidth,
								A2($folkertdev$elm_flate$Huffman$lookup, i, bitWidthEncoder)));
						return A3($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 3, width, current);
					}),
				writer,
				A2($elm$core$List$take, bitwidthCodeCount, $folkertdev$elm_flate$Deflate$Symbol$bitwidth_code_order));
		};
		var v2 = function (writer) {
			return A3(
				$elm$core$Array$foldl,
				F2(
					function (_v0, current) {
						var code_ = _v0.a;
						var bits = _v0.b;
						var extra = _v0.c;
						return (bits > 0) ? A3(
							$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
							bits,
							extra,
							A3($folkertdev$elm_flate$Huffman$encode, code_, bitWidthEncoder, current)) : A3($folkertdev$elm_flate$Huffman$encode, code_, bitWidthEncoder, current);
					}),
				writer,
				codes);
		};
		return v2(
			v1(
				A3(
					$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
					4,
					bitwidthCodeCount - 4,
					A3(
						$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
						5,
						distance_code_count - 1,
						A3($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 5, literal_code_count - 257, bitWriter)))));
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeCompressDynamic = F3(
	function (maybeWindowSize, buf, bitWriter) {
		var compressed = A2($folkertdev$elm_flate$Deflate$Internal$compress, maybeWindowSize, buf);
		var huffmanTree = $folkertdev$elm_flate$Deflate$Symbol$buildDynamicHuffmanCodec(compressed);
		var huffmanTreeWriter = A2($folkertdev$elm_flate$Deflate$Symbol$writeDynamicHuffmanCodec, huffmanTree, bitWriter);
		return A3(
			$elm$core$Array$foldl,
			F2(
				function (symbol, first) {
					return A3($folkertdev$elm_flate$Deflate$Symbol$encode, symbol, huffmanTree, first);
				}),
			huffmanTreeWriter,
			compressed);
	});
var $folkertdev$elm_flate$Deflate$BitWriter$writeBit = function (b) {
	if (!b) {
		return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 1, 0);
	} else {
		return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 1, 1);
	}
};
var $folkertdev$elm_flate$Deflate$Internal$encodeDynamicBlock = F3(
	function (windowSize, _v0, bitWriter) {
		var isLastBlock = _v0.a;
		var buffer = _v0.b;
		return A3(
			$folkertdev$elm_flate$Deflate$Internal$encodeCompressDynamic,
			windowSize,
			buffer,
			A3(
				$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
				2,
				2,
				A2($folkertdev$elm_flate$Deflate$BitWriter$writeBit, isLastBlock, bitWriter)));
	});
var $folkertdev$elm_flate$Deflate$BitWriter$flushLoop = F3(
	function (tag, bitsWritten, encoders) {
		flushLoop:
		while (true) {
			if (bitsWritten > 0) {
				var $temp$tag = tag >> 8,
					$temp$bitsWritten = A2($elm$core$Basics$max, 0, bitsWritten - 8),
					$temp$encoders = A2(
					$elm$core$List$cons,
					$elm$bytes$Bytes$Encode$unsignedInt8(tag),
					encoders);
				tag = $temp$tag;
				bitsWritten = $temp$bitsWritten;
				encoders = $temp$encoders;
				continue flushLoop;
			} else {
				return {bitsWritten: bitsWritten, encoders: encoders, tag: tag};
			}
		}
	});
var $folkertdev$elm_flate$Deflate$BitWriter$flush = function (state) {
	return A3($folkertdev$elm_flate$Deflate$BitWriter$flushLoop, state.tag, state.bitsWritten, state.encoders);
};
var $folkertdev$elm_flate$Deflate$BitWriter$run = function (state) {
	return $elm$core$List$reverse(state.encoders);
};
var $folkertdev$elm_flate$Deflate$Internal$encodeDynamic = F2(
	function (windowSize, buffer) {
		var encodedChunks = A2(
			$elm$core$List$map,
			$folkertdev$elm_flate$Deflate$Internal$encodeDynamicBlock(windowSize),
			A2($folkertdev$elm_flate$Deflate$Internal$chunks, $folkertdev$elm_flate$Deflate$Internal$default_block_size, buffer));
		return $elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(
				$folkertdev$elm_flate$Deflate$BitWriter$run(
					$folkertdev$elm_flate$Deflate$BitWriter$flush(
						A3(
							$elm$core$List$foldl,
							F2(
								function (chunk, first) {
									return chunk(first);
								}),
							$folkertdev$elm_flate$Deflate$BitWriter$empty,
							encodedChunks)))));
	});
var $elm$bytes$Bytes$Encode$Bytes = function (a) {
	return {$: 'Bytes', a: a};
};
var $elm$bytes$Bytes$Encode$bytes = $elm$bytes$Bytes$Encode$Bytes;
var $elm$core$Bitwise$complement = _Bitwise_complement;
var $folkertdev$elm_flate$Deflate$Internal$max_non_compressed_block_size = 65535;
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (node.$ === 'SubTree') {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						nodeList: _List_Nil,
						nodeListSize: 0,
						tail: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (_v0.$ === 'SubTree') {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (_v0.$ === 'SubTree') {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $elm$bytes$Bytes$Encode$U32 = F2(
	function (a, b) {
		return {$: 'U32', a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$unsignedInt32 = $elm$bytes$Bytes$Encode$U32;
var $folkertdev$elm_flate$ByteArray$fasterEncodeFolderR = F2(
	function (_byte, _v0) {
		var bytesOnAccum = _v0.a;
		var accum = _v0.b;
		var encoders = _v0.c;
		switch (bytesOnAccum) {
			case 0:
				var value = 255 & _byte;
				return _Utils_Tuple3(1, value, encoders);
			case 1:
				var value = accum | ((255 & _byte) << 8);
				return _Utils_Tuple3(2, value, encoders);
			case 2:
				var value = accum | ((255 & _byte) << 16);
				return _Utils_Tuple3(3, value, encoders);
			default:
				var value = accum | ((255 & _byte) << 24);
				return _Utils_Tuple3(
					0,
					0,
					A2(
						$elm$core$List$cons,
						A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, value),
						encoders));
		}
	});
var $folkertdev$elm_flate$ByteArray$fasterEncodeR = function (_v0) {
	var bytesOnAccum = _v0.a;
	var accum = _v0.b;
	var otherEncoders = _v0.c;
	var encoders = function () {
		switch (bytesOnAccum) {
			case 0:
				return otherEncoders;
			case 1:
				return A2(
					$elm$core$List$cons,
					$elm$bytes$Bytes$Encode$unsignedInt8(accum),
					otherEncoders);
			case 2:
				return A2(
					$elm$core$List$cons,
					A2($elm$bytes$Bytes$Encode$unsignedInt16, $elm$bytes$Bytes$BE, accum),
					otherEncoders);
			default:
				var otherBytes = accum >> 8;
				var firstByte = 255 & accum;
				return A2(
					$elm$core$List$cons,
					A2($elm$bytes$Bytes$Encode$unsignedInt16, $elm$bytes$Bytes$BE, otherBytes),
					A2(
						$elm$core$List$cons,
						$elm$bytes$Bytes$Encode$unsignedInt8(firstByte),
						otherEncoders));
		}
	}();
	return encoders;
};
var $folkertdev$elm_flate$ByteArray$toBytes = function (array) {
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			$folkertdev$elm_flate$ByteArray$fasterEncodeR(
				A3(
					$elm$core$Array$foldr,
					$folkertdev$elm_flate$ByteArray$fasterEncodeFolderR,
					_Utils_Tuple3(0, 0, _List_Nil),
					array))));
};
var $folkertdev$elm_flate$Deflate$BitWriter$writeEncoder = F2(
	function (encoder, state) {
		return {
			bitsWritten: state.bitsWritten,
			encoders: A2($elm$core$List$cons, encoder, state.encoders),
			tag: state.tag
		};
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeRawBlock = F2(
	function (_v0, bitWriter) {
		var isLastBlock = _v0.a;
		var buffer = _v0.b;
		var byteArray = $folkertdev$elm_flate$ByteArray$fromBytes(buffer);
		var size = A2(
			$elm$core$Basics$min,
			$elm$core$Array$length(byteArray),
			$folkertdev$elm_flate$Deflate$Internal$max_non_compressed_block_size);
		var sliced = A3($elm$core$Array$slice, 0, size, byteArray);
		return A2(
			$folkertdev$elm_flate$Deflate$BitWriter$writeEncoder,
			$elm$bytes$Bytes$Encode$bytes(
				$folkertdev$elm_flate$ByteArray$toBytes(sliced)),
			A2(
				$folkertdev$elm_flate$Deflate$BitWriter$writeEncoder,
				A2($elm$bytes$Bytes$Encode$unsignedInt16, $elm$bytes$Bytes$LE, ~size),
				A2(
					$folkertdev$elm_flate$Deflate$BitWriter$writeEncoder,
					A2($elm$bytes$Bytes$Encode$unsignedInt16, $elm$bytes$Bytes$LE, size),
					$folkertdev$elm_flate$Deflate$BitWriter$flush(
						A3(
							$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
							2,
							0,
							A2($folkertdev$elm_flate$Deflate$BitWriter$writeBit, isLastBlock, bitWriter))))));
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeRaw = function (buffer) {
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			$folkertdev$elm_flate$Deflate$BitWriter$run(
				A3(
					$elm$core$List$foldl,
					F2(
						function (chunk, first) {
							return A2($folkertdev$elm_flate$Deflate$Internal$encodeRawBlock, chunk, first);
						}),
					$folkertdev$elm_flate$Deflate$BitWriter$empty,
					A2(
						$folkertdev$elm_flate$Deflate$Internal$chunks,
						A2($elm$core$Basics$min, $folkertdev$elm_flate$Deflate$Internal$max_non_compressed_block_size, $folkertdev$elm_flate$Deflate$Internal$default_block_size),
						buffer)))));
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $folkertdev$elm_flate$Huffman$fromList = A2(
	$elm$core$Basics$composeL,
	A2($elm$core$Basics$composeL, $folkertdev$elm_flate$Huffman$Tree, $elm$core$Array$fromList),
	$elm$core$List$map($folkertdev$elm_flate$Huffman$codeFromRecord));
var $folkertdev$elm_flate$Huffman$hardcodedStaticHuffmanTree = {
	distance: $folkertdev$elm_flate$Huffman$fromList(
		_List_fromArray(
			[
				{bits: 0, width: 5},
				{bits: 16, width: 5},
				{bits: 8, width: 5},
				{bits: 24, width: 5},
				{bits: 4, width: 5},
				{bits: 20, width: 5},
				{bits: 12, width: 5},
				{bits: 28, width: 5},
				{bits: 2, width: 5},
				{bits: 18, width: 5},
				{bits: 10, width: 5},
				{bits: 26, width: 5},
				{bits: 6, width: 5},
				{bits: 22, width: 5},
				{bits: 14, width: 5},
				{bits: 30, width: 5},
				{bits: 1, width: 5},
				{bits: 17, width: 5},
				{bits: 9, width: 5},
				{bits: 25, width: 5},
				{bits: 5, width: 5},
				{bits: 21, width: 5},
				{bits: 13, width: 5},
				{bits: 29, width: 5},
				{bits: 3, width: 5},
				{bits: 19, width: 5},
				{bits: 11, width: 5},
				{bits: 27, width: 5},
				{bits: 7, width: 5},
				{bits: 23, width: 5}
			])),
	literal: $folkertdev$elm_flate$Huffman$fromList(
		_List_fromArray(
			[
				{bits: 12, width: 8},
				{bits: 140, width: 8},
				{bits: 76, width: 8},
				{bits: 204, width: 8},
				{bits: 44, width: 8},
				{bits: 172, width: 8},
				{bits: 108, width: 8},
				{bits: 236, width: 8},
				{bits: 28, width: 8},
				{bits: 156, width: 8},
				{bits: 92, width: 8},
				{bits: 220, width: 8},
				{bits: 60, width: 8},
				{bits: 188, width: 8},
				{bits: 124, width: 8},
				{bits: 252, width: 8},
				{bits: 2, width: 8},
				{bits: 130, width: 8},
				{bits: 66, width: 8},
				{bits: 194, width: 8},
				{bits: 34, width: 8},
				{bits: 162, width: 8},
				{bits: 98, width: 8},
				{bits: 226, width: 8},
				{bits: 18, width: 8},
				{bits: 146, width: 8},
				{bits: 82, width: 8},
				{bits: 210, width: 8},
				{bits: 50, width: 8},
				{bits: 178, width: 8},
				{bits: 114, width: 8},
				{bits: 242, width: 8},
				{bits: 10, width: 8},
				{bits: 138, width: 8},
				{bits: 74, width: 8},
				{bits: 202, width: 8},
				{bits: 42, width: 8},
				{bits: 170, width: 8},
				{bits: 106, width: 8},
				{bits: 234, width: 8},
				{bits: 26, width: 8},
				{bits: 154, width: 8},
				{bits: 90, width: 8},
				{bits: 218, width: 8},
				{bits: 58, width: 8},
				{bits: 186, width: 8},
				{bits: 122, width: 8},
				{bits: 250, width: 8},
				{bits: 6, width: 8},
				{bits: 134, width: 8},
				{bits: 70, width: 8},
				{bits: 198, width: 8},
				{bits: 38, width: 8},
				{bits: 166, width: 8},
				{bits: 102, width: 8},
				{bits: 230, width: 8},
				{bits: 22, width: 8},
				{bits: 150, width: 8},
				{bits: 86, width: 8},
				{bits: 214, width: 8},
				{bits: 54, width: 8},
				{bits: 182, width: 8},
				{bits: 118, width: 8},
				{bits: 246, width: 8},
				{bits: 14, width: 8},
				{bits: 142, width: 8},
				{bits: 78, width: 8},
				{bits: 206, width: 8},
				{bits: 46, width: 8},
				{bits: 174, width: 8},
				{bits: 110, width: 8},
				{bits: 238, width: 8},
				{bits: 30, width: 8},
				{bits: 158, width: 8},
				{bits: 94, width: 8},
				{bits: 222, width: 8},
				{bits: 62, width: 8},
				{bits: 190, width: 8},
				{bits: 126, width: 8},
				{bits: 254, width: 8},
				{bits: 1, width: 8},
				{bits: 129, width: 8},
				{bits: 65, width: 8},
				{bits: 193, width: 8},
				{bits: 33, width: 8},
				{bits: 161, width: 8},
				{bits: 97, width: 8},
				{bits: 225, width: 8},
				{bits: 17, width: 8},
				{bits: 145, width: 8},
				{bits: 81, width: 8},
				{bits: 209, width: 8},
				{bits: 49, width: 8},
				{bits: 177, width: 8},
				{bits: 113, width: 8},
				{bits: 241, width: 8},
				{bits: 9, width: 8},
				{bits: 137, width: 8},
				{bits: 73, width: 8},
				{bits: 201, width: 8},
				{bits: 41, width: 8},
				{bits: 169, width: 8},
				{bits: 105, width: 8},
				{bits: 233, width: 8},
				{bits: 25, width: 8},
				{bits: 153, width: 8},
				{bits: 89, width: 8},
				{bits: 217, width: 8},
				{bits: 57, width: 8},
				{bits: 185, width: 8},
				{bits: 121, width: 8},
				{bits: 249, width: 8},
				{bits: 5, width: 8},
				{bits: 133, width: 8},
				{bits: 69, width: 8},
				{bits: 197, width: 8},
				{bits: 37, width: 8},
				{bits: 165, width: 8},
				{bits: 101, width: 8},
				{bits: 229, width: 8},
				{bits: 21, width: 8},
				{bits: 149, width: 8},
				{bits: 85, width: 8},
				{bits: 213, width: 8},
				{bits: 53, width: 8},
				{bits: 181, width: 8},
				{bits: 117, width: 8},
				{bits: 245, width: 8},
				{bits: 13, width: 8},
				{bits: 141, width: 8},
				{bits: 77, width: 8},
				{bits: 205, width: 8},
				{bits: 45, width: 8},
				{bits: 173, width: 8},
				{bits: 109, width: 8},
				{bits: 237, width: 8},
				{bits: 29, width: 8},
				{bits: 157, width: 8},
				{bits: 93, width: 8},
				{bits: 221, width: 8},
				{bits: 61, width: 8},
				{bits: 189, width: 8},
				{bits: 125, width: 8},
				{bits: 253, width: 8},
				{bits: 19, width: 9},
				{bits: 275, width: 9},
				{bits: 147, width: 9},
				{bits: 403, width: 9},
				{bits: 83, width: 9},
				{bits: 339, width: 9},
				{bits: 211, width: 9},
				{bits: 467, width: 9},
				{bits: 51, width: 9},
				{bits: 307, width: 9},
				{bits: 179, width: 9},
				{bits: 435, width: 9},
				{bits: 115, width: 9},
				{bits: 371, width: 9},
				{bits: 243, width: 9},
				{bits: 499, width: 9},
				{bits: 11, width: 9},
				{bits: 267, width: 9},
				{bits: 139, width: 9},
				{bits: 395, width: 9},
				{bits: 75, width: 9},
				{bits: 331, width: 9},
				{bits: 203, width: 9},
				{bits: 459, width: 9},
				{bits: 43, width: 9},
				{bits: 299, width: 9},
				{bits: 171, width: 9},
				{bits: 427, width: 9},
				{bits: 107, width: 9},
				{bits: 363, width: 9},
				{bits: 235, width: 9},
				{bits: 491, width: 9},
				{bits: 27, width: 9},
				{bits: 283, width: 9},
				{bits: 155, width: 9},
				{bits: 411, width: 9},
				{bits: 91, width: 9},
				{bits: 347, width: 9},
				{bits: 219, width: 9},
				{bits: 475, width: 9},
				{bits: 59, width: 9},
				{bits: 315, width: 9},
				{bits: 187, width: 9},
				{bits: 443, width: 9},
				{bits: 123, width: 9},
				{bits: 379, width: 9},
				{bits: 251, width: 9},
				{bits: 507, width: 9},
				{bits: 7, width: 9},
				{bits: 263, width: 9},
				{bits: 135, width: 9},
				{bits: 391, width: 9},
				{bits: 71, width: 9},
				{bits: 327, width: 9},
				{bits: 199, width: 9},
				{bits: 455, width: 9},
				{bits: 39, width: 9},
				{bits: 295, width: 9},
				{bits: 167, width: 9},
				{bits: 423, width: 9},
				{bits: 103, width: 9},
				{bits: 359, width: 9},
				{bits: 231, width: 9},
				{bits: 487, width: 9},
				{bits: 23, width: 9},
				{bits: 279, width: 9},
				{bits: 151, width: 9},
				{bits: 407, width: 9},
				{bits: 87, width: 9},
				{bits: 343, width: 9},
				{bits: 215, width: 9},
				{bits: 471, width: 9},
				{bits: 55, width: 9},
				{bits: 311, width: 9},
				{bits: 183, width: 9},
				{bits: 439, width: 9},
				{bits: 119, width: 9},
				{bits: 375, width: 9},
				{bits: 247, width: 9},
				{bits: 503, width: 9},
				{bits: 15, width: 9},
				{bits: 271, width: 9},
				{bits: 143, width: 9},
				{bits: 399, width: 9},
				{bits: 79, width: 9},
				{bits: 335, width: 9},
				{bits: 207, width: 9},
				{bits: 463, width: 9},
				{bits: 47, width: 9},
				{bits: 303, width: 9},
				{bits: 175, width: 9},
				{bits: 431, width: 9},
				{bits: 111, width: 9},
				{bits: 367, width: 9},
				{bits: 239, width: 9},
				{bits: 495, width: 9},
				{bits: 31, width: 9},
				{bits: 287, width: 9},
				{bits: 159, width: 9},
				{bits: 415, width: 9},
				{bits: 95, width: 9},
				{bits: 351, width: 9},
				{bits: 223, width: 9},
				{bits: 479, width: 9},
				{bits: 63, width: 9},
				{bits: 319, width: 9},
				{bits: 191, width: 9},
				{bits: 447, width: 9},
				{bits: 127, width: 9},
				{bits: 383, width: 9},
				{bits: 255, width: 9},
				{bits: 511, width: 9},
				{bits: 0, width: 7},
				{bits: 64, width: 7},
				{bits: 32, width: 7},
				{bits: 96, width: 7},
				{bits: 16, width: 7},
				{bits: 80, width: 7},
				{bits: 48, width: 7},
				{bits: 112, width: 7},
				{bits: 8, width: 7},
				{bits: 72, width: 7},
				{bits: 40, width: 7},
				{bits: 104, width: 7},
				{bits: 24, width: 7},
				{bits: 88, width: 7},
				{bits: 56, width: 7},
				{bits: 120, width: 7},
				{bits: 4, width: 7},
				{bits: 68, width: 7},
				{bits: 36, width: 7},
				{bits: 100, width: 7},
				{bits: 20, width: 7},
				{bits: 84, width: 7},
				{bits: 52, width: 7},
				{bits: 116, width: 7},
				{bits: 3, width: 8},
				{bits: 131, width: 8},
				{bits: 67, width: 8},
				{bits: 195, width: 8},
				{bits: 35, width: 8},
				{bits: 163, width: 8},
				{bits: 99, width: 8},
				{bits: 227, width: 8}
			]))
};
var $folkertdev$elm_flate$Deflate$Internal$encodeCompressStatic = F3(
	function (maybeWindowSize, buf, bitWriter) {
		var huffmanTrees = $folkertdev$elm_flate$Huffman$hardcodedStaticHuffmanTree;
		var compressed = A2($folkertdev$elm_flate$Deflate$Internal$compress, maybeWindowSize, buf);
		return A3(
			$elm$core$Array$foldl,
			F2(
				function (symbol, first) {
					return A3($folkertdev$elm_flate$Deflate$Symbol$encode, symbol, huffmanTrees, first);
				}),
			bitWriter,
			compressed);
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeStaticBlock = F3(
	function (windowSize, _v0, bitWriter) {
		var isLastBlock = _v0.a;
		var buffer = _v0.b;
		return A3(
			$folkertdev$elm_flate$Deflate$Internal$encodeCompressStatic,
			windowSize,
			buffer,
			A3(
				$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
				2,
				1,
				A2($folkertdev$elm_flate$Deflate$BitWriter$writeBit, isLastBlock, bitWriter)));
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeStatic = F2(
	function (windowSize, buffer) {
		return $elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(
				$folkertdev$elm_flate$Deflate$BitWriter$run(
					$folkertdev$elm_flate$Deflate$BitWriter$flush(
						A3(
							$elm$core$List$foldl,
							F2(
								function (chunk, first) {
									return A3($folkertdev$elm_flate$Deflate$Internal$encodeStaticBlock, windowSize, chunk, first);
								}),
							$folkertdev$elm_flate$Deflate$BitWriter$empty,
							A2($folkertdev$elm_flate$Deflate$Internal$chunks, $folkertdev$elm_flate$Deflate$Internal$default_block_size, buffer))))));
	});
var $folkertdev$elm_flate$Flate$deflateWithOptions = F2(
	function (encoding, buffer) {
		switch (encoding.$) {
			case 'Raw':
				return $folkertdev$elm_flate$Deflate$Internal$encodeRaw(buffer);
			case 'Static':
				if (encoding.a.$ === 'NoCompression') {
					var _v1 = encoding.a;
					return A2($folkertdev$elm_flate$Deflate$Internal$encodeStatic, $elm$core$Maybe$Nothing, buffer);
				} else {
					var w = encoding.a.a;
					return A2(
						$folkertdev$elm_flate$Deflate$Internal$encodeStatic,
						$elm$core$Maybe$Just(w),
						buffer);
				}
			default:
				if (encoding.a.$ === 'NoCompression') {
					var _v2 = encoding.a;
					return A2($folkertdev$elm_flate$Deflate$Internal$encodeDynamic, $elm$core$Maybe$Nothing, buffer);
				} else {
					var w = encoding.a.a;
					return A2(
						$folkertdev$elm_flate$Deflate$Internal$encodeDynamic,
						$elm$core$Maybe$Just(w),
						buffer);
				}
		}
	});
var $folkertdev$elm_flate$LZ77$max_distance = 32768;
var $folkertdev$elm_flate$LZ77$maxWindowSize = $folkertdev$elm_flate$LZ77$max_distance;
var $folkertdev$elm_flate$Flate$deflate = $folkertdev$elm_flate$Flate$deflateWithOptions(
	$folkertdev$elm_flate$Flate$Dynamic(
		$folkertdev$elm_flate$Flate$WithWindowSize($folkertdev$elm_flate$LZ77$maxWindowSize)));
var $elm$bytes$Bytes$Encode$Utf8 = F2(
	function (a, b) {
		return {$: 'Utf8', a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$string = function (str) {
	return A2(
		$elm$bytes$Bytes$Encode$Utf8,
		_Bytes_getStringWidth(str),
		str);
};
var $ivadzy$bbase64$Base64$Shift$and = F2(
	function (shift, value) {
		switch (shift.$) {
			case 'Shift0':
				return value;
			case 'Shift2':
				return 3 & value;
			case 'Shift4':
				return 15 & value;
			default:
				return 63 & value;
		}
	});
var $ivadzy$bbase64$Base64$Table$codeToCharMap = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(0, 'A'),
			_Utils_Tuple2(1, 'B'),
			_Utils_Tuple2(2, 'C'),
			_Utils_Tuple2(3, 'D'),
			_Utils_Tuple2(4, 'E'),
			_Utils_Tuple2(5, 'F'),
			_Utils_Tuple2(6, 'G'),
			_Utils_Tuple2(7, 'H'),
			_Utils_Tuple2(8, 'I'),
			_Utils_Tuple2(9, 'J'),
			_Utils_Tuple2(10, 'K'),
			_Utils_Tuple2(11, 'L'),
			_Utils_Tuple2(12, 'M'),
			_Utils_Tuple2(13, 'N'),
			_Utils_Tuple2(14, 'O'),
			_Utils_Tuple2(15, 'P'),
			_Utils_Tuple2(16, 'Q'),
			_Utils_Tuple2(17, 'R'),
			_Utils_Tuple2(18, 'S'),
			_Utils_Tuple2(19, 'T'),
			_Utils_Tuple2(20, 'U'),
			_Utils_Tuple2(21, 'V'),
			_Utils_Tuple2(22, 'W'),
			_Utils_Tuple2(23, 'X'),
			_Utils_Tuple2(24, 'Y'),
			_Utils_Tuple2(25, 'Z'),
			_Utils_Tuple2(26, 'a'),
			_Utils_Tuple2(27, 'b'),
			_Utils_Tuple2(28, 'c'),
			_Utils_Tuple2(29, 'd'),
			_Utils_Tuple2(30, 'e'),
			_Utils_Tuple2(31, 'f'),
			_Utils_Tuple2(32, 'g'),
			_Utils_Tuple2(33, 'h'),
			_Utils_Tuple2(34, 'i'),
			_Utils_Tuple2(35, 'j'),
			_Utils_Tuple2(36, 'k'),
			_Utils_Tuple2(37, 'l'),
			_Utils_Tuple2(38, 'm'),
			_Utils_Tuple2(39, 'n'),
			_Utils_Tuple2(40, 'o'),
			_Utils_Tuple2(41, 'p'),
			_Utils_Tuple2(42, 'q'),
			_Utils_Tuple2(43, 'r'),
			_Utils_Tuple2(44, 's'),
			_Utils_Tuple2(45, 't'),
			_Utils_Tuple2(46, 'u'),
			_Utils_Tuple2(47, 'v'),
			_Utils_Tuple2(48, 'w'),
			_Utils_Tuple2(49, 'x'),
			_Utils_Tuple2(50, 'y'),
			_Utils_Tuple2(51, 'z'),
			_Utils_Tuple2(52, '0'),
			_Utils_Tuple2(53, '1'),
			_Utils_Tuple2(54, '2'),
			_Utils_Tuple2(55, '3'),
			_Utils_Tuple2(56, '4'),
			_Utils_Tuple2(57, '5'),
			_Utils_Tuple2(58, '6'),
			_Utils_Tuple2(59, '7'),
			_Utils_Tuple2(60, '8'),
			_Utils_Tuple2(61, '9'),
			_Utils_Tuple2(62, '+'),
			_Utils_Tuple2(63, '/')
		]));
var $ivadzy$bbase64$Base64$Table$encode = function (code) {
	var _v0 = A2($elm$core$Dict$get, code, $ivadzy$bbase64$Base64$Table$codeToCharMap);
	if (_v0.$ === 'Just') {
		var char_ = _v0.a;
		return char_;
	} else {
		return '';
	}
};
var $ivadzy$bbase64$Base64$Shift$next = function (shift) {
	switch (shift.$) {
		case 'Shift0':
			return $ivadzy$bbase64$Base64$Shift$Shift2;
		case 'Shift2':
			return $ivadzy$bbase64$Base64$Shift$Shift4;
		case 'Shift4':
			return $ivadzy$bbase64$Base64$Shift$Shift6;
		default:
			return $ivadzy$bbase64$Base64$Shift$Shift2;
	}
};
var $ivadzy$bbase64$Base64$Encode$sixtet = F2(
	function (octet, _v0) {
		var shift = _v0.a;
		var sixtet_ = _v0.b;
		var strAcc = _v0.c;
		switch (shift.$) {
			case 'Shift0':
				return A2($ivadzy$bbase64$Base64$Shift$shiftRightZfBy, $ivadzy$bbase64$Base64$Shift$Shift2, octet);
			case 'Shift2':
				return A2($ivadzy$bbase64$Base64$Shift$shiftLeftBy, $ivadzy$bbase64$Base64$Shift$Shift4, sixtet_) | A2($ivadzy$bbase64$Base64$Shift$shiftRightZfBy, $ivadzy$bbase64$Base64$Shift$Shift4, octet);
			case 'Shift4':
				return A2($ivadzy$bbase64$Base64$Shift$shiftLeftBy, $ivadzy$bbase64$Base64$Shift$Shift2, sixtet_) | A2($ivadzy$bbase64$Base64$Shift$shiftRightZfBy, $ivadzy$bbase64$Base64$Shift$Shift6, octet);
			default:
				return sixtet_;
		}
	});
var $ivadzy$bbase64$Base64$Encode$encodeStep = F2(
	function (octet, encodeState) {
		var shift = encodeState.a;
		var strAcc = encodeState.c;
		var nextSixtet = function () {
			switch (shift.$) {
				case 'Shift0':
					return A2($ivadzy$bbase64$Base64$Shift$and, $ivadzy$bbase64$Base64$Shift$Shift2, octet);
				case 'Shift2':
					return A2($ivadzy$bbase64$Base64$Shift$and, $ivadzy$bbase64$Base64$Shift$Shift4, octet);
				case 'Shift4':
					return A2($ivadzy$bbase64$Base64$Shift$and, $ivadzy$bbase64$Base64$Shift$Shift6, octet);
				default:
					return A2($ivadzy$bbase64$Base64$Shift$and, $ivadzy$bbase64$Base64$Shift$Shift2, octet);
			}
		}();
		var currentSixtet = A2($ivadzy$bbase64$Base64$Encode$sixtet, octet, encodeState);
		var base64Char = function () {
			if (shift.$ === 'Shift6') {
				return _Utils_ap(
					$ivadzy$bbase64$Base64$Table$encode(currentSixtet),
					$ivadzy$bbase64$Base64$Table$encode(
						A2($ivadzy$bbase64$Base64$Shift$shiftRightZfBy, $ivadzy$bbase64$Base64$Shift$Shift2, octet)));
			} else {
				return $ivadzy$bbase64$Base64$Table$encode(currentSixtet);
			}
		}();
		return _Utils_Tuple3(
			$ivadzy$bbase64$Base64$Shift$next(shift),
			nextSixtet,
			_Utils_ap(strAcc, base64Char));
	});
var $ivadzy$bbase64$Base64$Encode$decodeStep = F2(
	function (octetDecoder, _v0) {
		var n = _v0.a;
		var encodeState = _v0.b;
		return (n <= 0) ? $elm$bytes$Bytes$Decode$succeed(
			$elm$bytes$Bytes$Decode$Done(encodeState)) : A2(
			$elm$bytes$Bytes$Decode$map,
			function (octet) {
				return $elm$bytes$Bytes$Decode$Loop(
					_Utils_Tuple2(
						n - 1,
						A2($ivadzy$bbase64$Base64$Encode$encodeStep, octet, encodeState)));
			},
			octetDecoder);
	});
var $ivadzy$bbase64$Base64$Encode$finalize = function (_v0) {
	var shift = _v0.a;
	var sixtet_ = _v0.b;
	var strAcc = _v0.c;
	switch (shift.$) {
		case 'Shift6':
			return _Utils_ap(
				strAcc,
				$ivadzy$bbase64$Base64$Table$encode(sixtet_));
		case 'Shift4':
			return strAcc + ($ivadzy$bbase64$Base64$Table$encode(
				A2($ivadzy$bbase64$Base64$Shift$shiftLeftBy, $ivadzy$bbase64$Base64$Shift$Shift2, sixtet_)) + '=');
		case 'Shift2':
			return strAcc + ($ivadzy$bbase64$Base64$Table$encode(
				A2($ivadzy$bbase64$Base64$Shift$shiftLeftBy, $ivadzy$bbase64$Base64$Shift$Shift4, sixtet_)) + '==');
		default:
			return strAcc;
	}
};
var $ivadzy$bbase64$Base64$Encode$initialEncodeState = _Utils_Tuple3($ivadzy$bbase64$Base64$Shift$Shift0, 0, '');
var $ivadzy$bbase64$Base64$Encode$tryEncode = function (input) {
	var decoderInitialState = _Utils_Tuple2(
		$elm$bytes$Bytes$width(input),
		$ivadzy$bbase64$Base64$Encode$initialEncodeState);
	var base64Decoder = A2(
		$elm$bytes$Bytes$Decode$loop,
		decoderInitialState,
		$ivadzy$bbase64$Base64$Encode$decodeStep($elm$bytes$Bytes$Decode$unsignedInt8));
	return A2(
		$elm$core$Maybe$map,
		$ivadzy$bbase64$Base64$Encode$finalize,
		A2($elm$bytes$Bytes$Decode$decode, base64Decoder, input));
};
var $ivadzy$bbase64$Base64$Encode$encode = function (encoder) {
	if (encoder.$ === 'StringEncoder') {
		var input = encoder.a;
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			$ivadzy$bbase64$Base64$Encode$tryEncode(
				$elm$bytes$Bytes$Encode$encode(
					$elm$bytes$Bytes$Encode$string(input))));
	} else {
		var input = encoder.a;
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			$ivadzy$bbase64$Base64$Encode$tryEncode(input));
	}
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$Main$encodeIntStr = function (_v0) {
	var _int = _v0.a;
	var str = _v0.b;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'int',
				$elm$json$Json$Encode$int(_int)),
				_Utils_Tuple2(
				'string',
				$elm$json$Json$Encode$string(str))
			]));
};
var $author$project$Main$encodeIntStrStr = function (_v0) {
	var _v1 = _v0.a;
	var _int = _v1.a;
	var str1 = _v1.b;
	var str2 = _v0.b;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'int',
				$elm$json$Json$Encode$int(_int)),
				_Utils_Tuple2(
				'string1',
				$elm$json$Json$Encode$string(str1)),
				_Utils_Tuple2(
				'string2',
				$elm$json$Json$Encode$string(str2))
			]));
};
var $elm$json$Json$Encode$float = _Json_wrap;
var $author$project$Main$encodePlayer = function (p) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(p.name)),
				_Utils_Tuple2(
				'rat',
				$elm$json$Json$Encode$float(p.rat)),
				_Utils_Tuple2(
				'pos',
				$elm$json$Json$Encode$string(p.pos)),
				_Utils_Tuple2(
				'team',
				$elm$json$Json$Encode$string(p.team)),
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$string(p.id))
			]));
};
var $author$project$Main$encodePlayerStr = function (_v0) {
	var pl = _v0.a;
	var str = _v0.b;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'player',
				$author$project$Main$encodePlayer(pl)),
				_Utils_Tuple2(
				'string',
				$elm$json$Json$Encode$string(str))
			]));
};
var $author$project$Main$encodeStrStr = function (_v0) {
	var str1 = _v0.a;
	var str2 = _v0.b;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'string1',
				$elm$json$Json$Encode$string(str1)),
				_Utils_Tuple2(
				'string2',
				$elm$json$Json$Encode$string(str2))
			]));
};
var $author$project$Main$encodeStrStrStr = function (_v0) {
	var _v1 = _v0.a;
	var str1 = _v1.a;
	var str2 = _v1.b;
	var str3 = _v0.b;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'string1',
				$elm$json$Json$Encode$string(str1)),
				_Utils_Tuple2(
				'string2',
				$elm$json$Json$Encode$string(str2)),
				_Utils_Tuple2(
				'string3',
				$elm$json$Json$Encode$string(str3))
			]));
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $author$project$Main$encodeTeam = function (t) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(t.name)),
				_Utils_Tuple2(
				'players',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodePlayer, t.players)),
				_Utils_Tuple2(
				'picks',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$int, t.picks))
			]));
};
var $author$project$Main$encodeModel = function (m) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'teams_checked',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodeTeam, m.teams_checked)),
				_Utils_Tuple2(
				'picks_checked',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodeIntStr, m.picks_checked)),
				_Utils_Tuple2(
				'future_picks_checked',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodeStrStr, m.future_picks_checked)),
				_Utils_Tuple2(
				'players_checked',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodePlayer, m.players_checked)),
				_Utils_Tuple2(
				'picks_going',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodeIntStrStr, m.picks_going)),
				_Utils_Tuple2(
				'future_picks_going',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodeStrStrStr, m.future_picks_going)),
				_Utils_Tuple2(
				'players_going',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodePlayerStr, m.players_going))
			]));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Main$isToIntStr = function (is) {
	return _Utils_Tuple2(is._int, is.string);
};
var $author$project$Main$isstoIntStrStr = function (iss) {
	return _Utils_Tuple2(
		_Utils_Tuple2(iss._int, iss.string2),
		iss.string3);
};
var $author$project$Main$pstoPlayerStr = function (ps) {
	return _Utils_Tuple2(ps.pl, ps.string);
};
var $author$project$Main$ssstoStrStrStr = function (sss) {
	return _Utils_Tuple2(
		_Utils_Tuple2(sss.string1, sss.string2),
		sss.string3);
};
var $author$project$Main$strStrToStrStr = function (str_str) {
	return _Utils_Tuple2(str_str.string1, str_str.string2);
};
var $author$project$Main$importModelToModel = F3(
	function (hash, m, im) {
		return _Utils_update(
			m,
			{
				export_modal: true,
				future_picks_checked: A2($elm$core$List$map, $author$project$Main$strStrToStrStr, im.future_picks_checked),
				future_picks_going: A2($elm$core$List$map, $author$project$Main$ssstoStrStrStr, im.future_picks_going),
				hash: $elm$core$Maybe$Just(hash),
				import_modal: false,
				picks_checked: A2($elm$core$List$map, $author$project$Main$isToIntStr, im.picks_checked),
				picks_going: A2($elm$core$List$map, $author$project$Main$isstoIntStrStr, im.picks_going),
				players_checked: im.players_checked,
				players_going: A2($elm$core$List$map, $author$project$Main$pstoPlayerStr, im.players_going),
				teams_checked: im.teams_checked
			});
	});
var $folkertdev$elm_flate$Inflate$BitReader$decode = F2(
	function (bytes, _v0) {
		var reader = _v0.a;
		var initialState = {bitsAvailable: 0, buffer: bytes, reserve: 0, reserveAvailable: 0, tag: 0};
		var _v1 = reader(initialState);
		if (_v1.$ === 'Ok') {
			var _v2 = _v1.a;
			var value = _v2.a;
			return $elm$core$Result$Ok(value);
		} else {
			var e = _v1.a;
			return $elm$core$Result$Err(e);
		}
	});
var $folkertdev$elm_flate$Inflate$BitReader$BitReader = function (a) {
	return {$: 'BitReader', a: a};
};
var $folkertdev$elm_flate$Inflate$BitReader$loopHelp = F3(
	function (accum, callback, state) {
		loopHelp:
		while (true) {
			var _v0 = callback(accum);
			var decoder = _v0.a;
			var _v1 = decoder(state);
			if (_v1.$ === 'Err') {
				var e = _v1.a;
				return $elm$core$Result$Err(e);
			} else {
				if (_v1.a.a.$ === 'Loop') {
					var _v2 = _v1.a;
					var newAccum = _v2.a.a;
					var newState = _v2.b;
					var $temp$accum = newAccum,
						$temp$callback = callback,
						$temp$state = newState;
					accum = $temp$accum;
					callback = $temp$callback;
					state = $temp$state;
					continue loopHelp;
				} else {
					var _v3 = _v1.a;
					var result = _v3.a.a;
					var newState = _v3.b;
					return $elm$core$Result$Ok(
						_Utils_Tuple2(result, newState));
				}
			}
		}
	});
var $folkertdev$elm_flate$Inflate$BitReader$loop = F2(
	function (state, callback) {
		return $folkertdev$elm_flate$Inflate$BitReader$BitReader(
			A2($folkertdev$elm_flate$Inflate$BitReader$loopHelp, state, callback));
	});
var $folkertdev$elm_flate$Inflate$BitReader$map = F2(
	function (f, _v0) {
		var g = _v0.a;
		return $folkertdev$elm_flate$Inflate$BitReader$BitReader(
			function (s) {
				var _v1 = g(s);
				if (_v1.$ === 'Ok') {
					var _v2 = _v1.a;
					var value = _v2.a;
					var newState = _v2.b;
					return $elm$core$Result$Ok(
						_Utils_Tuple2(
							f(value),
							newState));
				} else {
					var e = _v1.a;
					return $elm$core$Result$Err(e);
				}
			});
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $folkertdev$elm_flate$Experimental$ByteArray$toBytes = function (_v0) {
	var array = _v0.a;
	var finalSize = _v0.b;
	var finalBytes = _v0.c;
	var initial = function () {
		var finalInt32 = finalBytes >>> ((4 - finalSize) * 8);
		switch (finalSize) {
			case 4:
				return _List_fromArray(
					[
						A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, finalBytes)
					]);
			case 1:
				return _List_fromArray(
					[
						$elm$bytes$Bytes$Encode$unsignedInt8(finalInt32)
					]);
			case 2:
				return _List_fromArray(
					[
						A2($elm$bytes$Bytes$Encode$unsignedInt16, $elm$bytes$Bytes$BE, finalInt32)
					]);
			case 3:
				return _List_fromArray(
					[
						A2($elm$bytes$Bytes$Encode$unsignedInt16, $elm$bytes$Bytes$BE, finalInt32 >> 8),
						$elm$bytes$Bytes$Encode$unsignedInt8(255 & finalInt32)
					]);
			default:
				return _List_Nil;
		}
	}();
	var folder = F2(
		function (element, accum) {
			return A2(
				$elm$core$List$cons,
				A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$BE, element),
				accum);
		});
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			A3($elm$core$Array$foldr, folder, initial, array)));
};
var $folkertdev$elm_flate$Inflate$BitReader$andThen = F2(
	function (f, _v0) {
		var g = _v0.a;
		return $folkertdev$elm_flate$Inflate$BitReader$BitReader(
			function (s) {
				var _v1 = g(s);
				if (_v1.$ === 'Ok') {
					var _v2 = _v1.a;
					var value = _v2.a;
					var newState = _v2.b;
					var _v3 = f(value);
					var h = _v3.a;
					return h(newState);
				} else {
					var e = _v1.a;
					return $elm$core$Result$Err(e);
				}
			});
	});
var $folkertdev$elm_flate$Experimental$ByteArray$push = F2(
	function (value, input) {
		var array = input.a;
		var finalSize = input.b;
		var finalBytes = input.c;
		if (finalSize === 4) {
			return A3(
				$folkertdev$elm_flate$Experimental$ByteArray$ByteArray,
				A2($elm$core$Array$push, finalBytes, array),
				1,
				value << 24);
		} else {
			if (!finalSize) {
				return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, 1, value << 24);
			} else {
				var offset = finalSize;
				var internalIndex = $elm$core$Array$length(array) - 1;
				var _new = ((255 & value) << ((3 - offset) * 8)) | finalBytes;
				var mask = 4278190080 >>> (offset * 8);
				return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize + 1, _new);
			}
		}
	});
var $folkertdev$elm_flate$Experimental$ByteArray$pushMany = F3(
	function (nbytes, value_, input) {
		var array = input.a;
		var finalSize = input.b;
		var finalBytes = input.c;
		var value = (nbytes === 4) ? value_ : (((1 << (nbytes * 8)) - 1) & value_);
		if (!nbytes) {
			return input;
		} else {
			if (finalSize === 4) {
				return A3(
					$folkertdev$elm_flate$Experimental$ByteArray$ByteArray,
					A2($elm$core$Array$push, finalBytes, array),
					nbytes,
					value << ((4 - nbytes) * 8));
			} else {
				if (!finalSize) {
					return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, nbytes, value << ((4 - nbytes) * 8));
				} else {
					var freeSpace = 4 - finalSize;
					if (_Utils_cmp(nbytes, freeSpace) > 0) {
						var bytesLeftOver = (finalSize + nbytes) - 4;
						var forFinal = value >>> (bytesLeftOver * 8);
						var newFinal = finalBytes | forFinal;
						var amount = ((8 - finalSize) - nbytes) * 8;
						var forNextFinal = (((1 << (bytesLeftOver * 8)) - 1) & value) << amount;
						return A3(
							$folkertdev$elm_flate$Experimental$ByteArray$ByteArray,
							A2($elm$core$Array$push, newFinal, array),
							nbytes - freeSpace,
							forNextFinal);
					} else {
						var amount = (4 - (finalSize + nbytes)) * 8;
						var forFinal = value << amount;
						var newFinal = finalBytes | forFinal;
						return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize + nbytes, newFinal);
					}
				}
			}
		}
	});
var $folkertdev$elm_flate$Experimental$ByteArray$appendBytesHelp = function (_v0) {
	var remaining = _v0.a;
	var bytearray = _v0.b;
	var array = bytearray.a;
	var finalSize = bytearray.b;
	var finalBytes = bytearray.c;
	return (remaining >= 4) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_new) {
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(
					remaining - 4,
					A3($folkertdev$elm_flate$Experimental$ByteArray$pushMany, 4, _new, bytearray)));
		},
		$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$BE)) : ((remaining >= 1) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_new) {
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(
					remaining - 1,
					A2($folkertdev$elm_flate$Experimental$ByteArray$push, _new, bytearray)));
		},
		$elm$bytes$Bytes$Decode$unsignedInt8) : $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done(bytearray)));
};
var $folkertdev$elm_flate$Experimental$ByteArray$appendBytes = F2(
	function (bytes, barray) {
		var array = barray.a;
		var finalSize = barray.b;
		var finalBytes = barray.c;
		var decoder = A2(
			$elm$bytes$Bytes$Decode$loop,
			_Utils_Tuple2(
				$elm$bytes$Bytes$width(bytes),
				barray),
			$folkertdev$elm_flate$Experimental$ByteArray$appendBytesHelp);
		var _v0 = A2($elm$bytes$Bytes$Decode$decode, decoder, bytes);
		if (_v0.$ === 'Just') {
			var v = _v0.a;
			return v;
		} else {
			return barray;
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $folkertdev$elm_flate$Inflate$Internal$buildTree = F3(
	function (lengths, offset, num) {
		var tableDict = function () {
			var updater = function (maybeValue) {
				if (maybeValue.$ === 'Nothing') {
					return $elm$core$Maybe$Just(1);
				} else {
					var v = maybeValue.a;
					return $elm$core$Maybe$Just(v + 1);
				}
			};
			var folder = F3(
				function (key, value, accum) {
					return ((_Utils_cmp(key, offset) > -1) && (_Utils_cmp(key, num + offset) < 0)) ? A3($elm$core$Dict$update, value, updater, accum) : accum;
				});
			return A3($elm$core$Dict$foldl, folder, $elm$core$Dict$empty, lengths);
		}();
		var offsetsDict = A3(
			$elm$core$Dict$foldl,
			F3(
				function (key, value, _v4) {
					var sum = _v4.a;
					var dict = _v4.b;
					return _Utils_Tuple2(
						sum + value,
						A3($elm$core$Dict$insert, key, sum, dict));
				}),
			_Utils_Tuple2(0, $elm$core$Dict$empty),
			tableDict);
		var newTable = function () {
			var helper = F4(
				function (key, value, i, array) {
					helper:
					while (true) {
						if (_Utils_cmp(i, key) > 0) {
							var $temp$key = key,
								$temp$value = value,
								$temp$i = i - 1,
								$temp$array = A2($elm$core$List$cons, 0, array);
							key = $temp$key;
							value = $temp$value;
							i = $temp$i;
							array = $temp$array;
							continue helper;
						} else {
							return A2($elm$core$List$cons, value, array);
						}
					}
				});
			var foldHelp = F3(
				function (key, value, _v3) {
					var i = _v3.a;
					var array = _v3.b;
					return _Utils_Tuple2(
						key - 1,
						A4(helper, key, value, i, array));
				});
			var anotherGo = F2(
				function (i, array) {
					anotherGo:
					while (true) {
						if (i >= 0) {
							var $temp$i = i - 1,
								$temp$array = A2($elm$core$List$cons, 0, array);
							i = $temp$i;
							array = $temp$array;
							continue anotherGo;
						} else {
							return array;
						}
					}
				});
			return function (_v2) {
				var a = _v2.a;
				var b = _v2.b;
				return A2(anotherGo, a, b);
			}(
				A3(
					$elm$core$Dict$foldr,
					foldHelp,
					_Utils_Tuple2(15, _List_Nil),
					tableDict));
		}();
		var go2 = F3(
			function (i, currentTranslation, currentOffsets) {
				go2:
				while (true) {
					if ((i - num) < 0) {
						var _v0 = A2($elm$core$Dict$get, offset + i, lengths);
						if (_v0.$ === 'Nothing') {
							var $temp$i = i + 1,
								$temp$currentTranslation = currentTranslation,
								$temp$currentOffsets = currentOffsets;
							i = $temp$i;
							currentTranslation = $temp$currentTranslation;
							currentOffsets = $temp$currentOffsets;
							continue go2;
						} else {
							var v = _v0.a;
							if (!(!v)) {
								var _v1 = A2($elm$core$Dict$get, v, currentOffsets);
								if (_v1.$ === 'Nothing') {
									return currentTranslation;
								} else {
									var w = _v1.a;
									var $temp$i = i + 1,
										$temp$currentTranslation = A3($elm$core$Array$set, w, i, currentTranslation),
										$temp$currentOffsets = A3($elm$core$Dict$insert, v, w + 1, currentOffsets);
									i = $temp$i;
									currentTranslation = $temp$currentTranslation;
									currentOffsets = $temp$currentOffsets;
									continue go2;
								}
							} else {
								var $temp$i = i + 1,
									$temp$currentTranslation = currentTranslation,
									$temp$currentOffsets = currentOffsets;
								i = $temp$i;
								currentTranslation = $temp$currentTranslation;
								currentOffsets = $temp$currentOffsets;
								continue go2;
							}
						}
					} else {
						return currentTranslation;
					}
				}
			});
		var translation2 = A3(
			go2,
			0,
			A2($elm$core$Array$repeat, num, 0),
			offsetsDict.b);
		return {table: newTable, trans: translation2};
	});
var $folkertdev$elm_flate$Inflate$Internal$clcIndices = _List_fromArray(
	[16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var $folkertdev$elm_flate$Inflate$BitSet$BitSet320 = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {$: 'BitSet320', a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $folkertdev$elm_flate$Inflate$BitSet$insert = F2(
	function (n, input) {
		var b1 = input.a;
		var b2 = input.b;
		var b3 = input.c;
		var b4 = input.d;
		var b5 = input.e;
		var b6 = input.f;
		var b7 = input.g;
		var b8 = input.h;
		var b9 = input.i;
		var b10 = input.j;
		if (n >= 320) {
			return input;
		} else {
			var bit = 1 << (n % 32);
			var _v0 = (n / 32) | 0;
			switch (_v0) {
				case 0:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(bit | b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 1:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(bit | b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 2:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(bit | b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 3:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(bit | b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 4:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(bit | b5)(b6)(b7)(b8)(b9)(b10);
				case 5:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(bit | b6)(b7)(b8)(b9)(b10);
				case 6:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(bit | b7)(b8)(b9)(b10);
				case 7:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(bit | b8)(b9)(b10);
				case 8:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(bit | b9)(b10);
				case 9:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(bit | b10);
				default:
					return input;
			}
		}
	});
var $folkertdev$elm_flate$Inflate$BitSet$member = F2(
	function (n, input) {
		var b1 = input.a;
		var b2 = input.b;
		var b3 = input.c;
		var b4 = input.d;
		var b5 = input.e;
		var b6 = input.f;
		var b7 = input.g;
		var b8 = input.h;
		var b9 = input.i;
		var b10 = input.j;
		if (n >= 320) {
			return false;
		} else {
			var bit = 1 << (n % 32);
			var _v0 = (n / 32) | 0;
			switch (_v0) {
				case 0:
					return (bit & b1) > 0;
				case 1:
					return (bit & b2) > 0;
				case 2:
					return (bit & b3) > 0;
				case 3:
					return (bit & b4) > 0;
				case 4:
					return (bit & b5) > 0;
				case 5:
					return (bit & b6) > 0;
				case 6:
					return (bit & b7) > 0;
				case 7:
					return (bit & b8) > 0;
				case 8:
					return (bit & b9) > 0;
				case 9:
					return (bit & b10) > 0;
				default:
					return false;
			}
		}
	});
var $folkertdev$elm_flate$Inflate$BitSet$remove = F2(
	function (n, input) {
		var b1 = input.a;
		var b2 = input.b;
		var b3 = input.c;
		var b4 = input.d;
		var b5 = input.e;
		var b6 = input.f;
		var b7 = input.g;
		var b8 = input.h;
		var b9 = input.i;
		var b10 = input.j;
		if (n >= 320) {
			return input;
		} else {
			var bit = ~(1 << (n % 32));
			var _v0 = (n / 32) | 0;
			switch (_v0) {
				case 0:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(bit & b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 1:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(bit & b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 2:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(bit & b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 3:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(bit & b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 4:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(bit & b5)(b6)(b7)(b8)(b9)(b10);
				case 5:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(bit & b6)(b7)(b8)(b9)(b10);
				case 6:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(bit & b7)(b8)(b9)(b10);
				case 7:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(bit & b8)(b9)(b10);
				case 8:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(bit & b9)(b10);
				case 9:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(bit & b10);
				default:
					return input;
			}
		}
	});
var $folkertdev$elm_flate$Inflate$Internal$copySegment = F5(
	function (i, value, bitset, lengths, length) {
		var end = i + length;
		var go = F3(
			function (j, currentBitSet, accum) {
				go:
				while (true) {
					if ((j - end) < 0) {
						if (!(!value)) {
							var $temp$j = j + 1,
								$temp$currentBitSet = A2($folkertdev$elm_flate$Inflate$BitSet$insert, j, currentBitSet),
								$temp$accum = A3($elm$core$Dict$insert, j, value, accum);
							j = $temp$j;
							currentBitSet = $temp$currentBitSet;
							accum = $temp$accum;
							continue go;
						} else {
							if (A2($folkertdev$elm_flate$Inflate$BitSet$member, j, currentBitSet)) {
								var $temp$j = j + 1,
									$temp$currentBitSet = A2($folkertdev$elm_flate$Inflate$BitSet$remove, j, currentBitSet),
									$temp$accum = A2($elm$core$Dict$remove, j, accum);
								j = $temp$j;
								currentBitSet = $temp$currentBitSet;
								accum = $temp$accum;
								continue go;
							} else {
								var $temp$j = j + 1,
									$temp$currentBitSet = currentBitSet,
									$temp$accum = accum;
								j = $temp$j;
								currentBitSet = $temp$currentBitSet;
								accum = $temp$accum;
								continue go;
							}
						}
					} else {
						return _Utils_Tuple2(currentBitSet, accum);
					}
				}
			});
		var _v0 = A3(go, i, bitset, lengths);
		var newBitSet = _v0.a;
		var newLengths = _v0.b;
		return _Utils_Tuple3(i + length, newBitSet, newLengths);
	});
var $folkertdev$elm_flate$Inflate$Internal$decodeSymbolInnerLoop = F5(
	function (table, cur, tag, bitsAvailable, sum) {
		decodeSymbolInnerLoop:
		while (true) {
			var newTag = tag >>> 1;
			if (!table.b) {
				return {bitsAvailable: bitsAvailable, cur: cur, sum: sum, tag: tag};
			} else {
				var value = table.a;
				var rest = table.b;
				var newerCur = ((cur << 1) + (tag & 1)) - value;
				var newSum = sum + value;
				if (newerCur >= 0) {
					var $temp$table = rest,
						$temp$cur = newerCur,
						$temp$tag = newTag,
						$temp$bitsAvailable = bitsAvailable - 1,
						$temp$sum = newSum;
					table = $temp$table;
					cur = $temp$cur;
					tag = $temp$tag;
					bitsAvailable = $temp$bitsAvailable;
					sum = $temp$sum;
					continue decodeSymbolInnerLoop;
				} else {
					return {bitsAvailable: bitsAvailable - 1, cur: newerCur, sum: newSum, tag: newTag};
				}
			}
		}
	});
var $folkertdev$elm_flate$Inflate$BitReader$moveFromReserve = F2(
	function (nbits, state) {
		var masked = (nbits === 32) ? (state.reserve << state.bitsAvailable) : ((((1 << nbits) - 1) & state.reserve) << state.bitsAvailable);
		return {bitsAvailable: state.bitsAvailable + nbits, buffer: state.buffer, reserve: state.reserve >>> nbits, reserveAvailable: state.reserveAvailable - nbits, tag: masked | state.tag};
	});
var $folkertdev$elm_flate$Inflate$BitReader$runDecoder = F3(
	function (width, valueDecoder, state) {
		var decoder = A3(
			$elm$bytes$Bytes$Decode$map2,
			$elm$core$Tuple$pair,
			valueDecoder,
			$elm$bytes$Bytes$Decode$bytes(
				$elm$bytes$Bytes$width(state.buffer) - width));
		var _v0 = A2($elm$bytes$Bytes$Decode$decode, decoder, state.buffer);
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return $elm$core$Result$Ok(value);
		} else {
			return $elm$core$Result$Err('BitReader.runDecoder: Unexpected end of Bytes');
		}
	});
var $folkertdev$elm_flate$Inflate$BitReader$unsignedInt24 = function (endianness) {
	if (endianness.$ === 'LE') {
		return A3(
			$elm$bytes$Bytes$Decode$map2,
			F2(
				function (b2, b1) {
					return (b1 << 16) | b2;
				}),
			$elm$bytes$Bytes$Decode$unsignedInt16(endianness),
			$elm$bytes$Bytes$Decode$unsignedInt8);
	} else {
		return A3(
			$elm$bytes$Bytes$Decode$map2,
			F2(
				function (b1, b2) {
					return (b1 << 16) | b2;
				}),
			$elm$bytes$Bytes$Decode$unsignedInt16(endianness),
			$elm$bytes$Bytes$Decode$unsignedInt8);
	}
};
var $folkertdev$elm_flate$Inflate$BitReader$readMoreBits = function (state) {
	readMoreBits:
	while (true) {
		var freeSpaceOnTag = 32 - state.bitsAvailable;
		if ((_Utils_cmp(freeSpaceOnTag, state.reserveAvailable) < 1) && (state.reserveAvailable > 0)) {
			return $elm$core$Result$Ok(
				A2($folkertdev$elm_flate$Inflate$BitReader$moveFromReserve, freeSpaceOnTag, state));
		} else {
			if (!$elm$bytes$Bytes$width(state.buffer)) {
				return $elm$core$Result$Ok(
					A2($folkertdev$elm_flate$Inflate$BitReader$moveFromReserve, state.reserveAvailable, state));
			} else {
				var state1 = A2($folkertdev$elm_flate$Inflate$BitReader$moveFromReserve, state.reserveAvailable, state);
				var _v0 = function () {
					var _v1 = $elm$bytes$Bytes$width(state.buffer);
					switch (_v1) {
						case 0:
							return _Utils_Tuple3(
								0,
								0,
								$elm$bytes$Bytes$Decode$succeed(0));
						case 1:
							return _Utils_Tuple3(1, 8, $elm$bytes$Bytes$Decode$unsignedInt8);
						case 2:
							return _Utils_Tuple3(
								2,
								16,
								$elm$bytes$Bytes$Decode$unsignedInt16($elm$bytes$Bytes$LE));
						case 3:
							return _Utils_Tuple3(
								3,
								24,
								$folkertdev$elm_flate$Inflate$BitReader$unsignedInt24($elm$bytes$Bytes$LE));
						default:
							return _Utils_Tuple3(
								4,
								32,
								$elm$bytes$Bytes$Decode$unsignedInt32($elm$bytes$Bytes$LE));
					}
				}();
				var width = _v0.a;
				var additionallyAvailable = _v0.b;
				var decoder = _v0.c;
				var _v2 = A3($folkertdev$elm_flate$Inflate$BitReader$runDecoder, width, decoder, state1);
				if (_v2.$ === 'Err') {
					var e = _v2.a;
					return $elm$core$Result$Err(e);
				} else {
					var _v3 = _v2.a;
					var newReserve = _v3.a;
					var newBuffer = _v3.b;
					var $temp$state = {bitsAvailable: state1.bitsAvailable, buffer: newBuffer, reserve: newReserve, reserveAvailable: additionallyAvailable, tag: state1.tag};
					state = $temp$state;
					continue readMoreBits;
				}
			}
		}
	}
};
var $folkertdev$elm_flate$Inflate$Internal$decodeSymbol = F2(
	function (table, tree) {
		return $folkertdev$elm_flate$Inflate$BitReader$BitReader(
			function (state) {
				var _v0 = (state.bitsAvailable < 16) ? $folkertdev$elm_flate$Inflate$BitReader$readMoreBits(state) : $elm$core$Result$Ok(state);
				if (_v0.$ === 'Err') {
					var e = _v0.a;
					return $elm$core$Result$Err(e);
				} else {
					var d = _v0.a;
					var _v1 = A5($folkertdev$elm_flate$Inflate$Internal$decodeSymbolInnerLoop, table, 0, d.tag, d.bitsAvailable, 0);
					var cur = _v1.cur;
					var tag = _v1.tag;
					var bitsAvailable = _v1.bitsAvailable;
					var sum = _v1.sum;
					var _v2 = A2($elm$core$Array$get, sum + cur, tree.trans);
					if (_v2.$ === 'Nothing') {
						return $elm$core$Result$Err('Index into trans tree out of bounds');
					} else {
						var result = _v2.a;
						return $elm$core$Result$Ok(
							_Utils_Tuple2(
								result,
								{bitsAvailable: bitsAvailable, buffer: d.buffer, reserve: d.reserve, reserveAvailable: d.reserveAvailable, tag: tag}));
					}
				}
			});
	});
var $folkertdev$elm_flate$Inflate$BitReader$readBits = F2(
	function (numberOfBits, base) {
		return $folkertdev$elm_flate$Inflate$BitReader$BitReader(
			function (state) {
				if (!numberOfBits) {
					return $elm$core$Result$Ok(
						_Utils_Tuple2(base, state));
				} else {
					var _v0 = (_Utils_cmp(state.bitsAvailable, numberOfBits) < 0) ? $folkertdev$elm_flate$Inflate$BitReader$readMoreBits(state) : $elm$core$Result$Ok(state);
					if (_v0.$ === 'Err') {
						var e = _v0.a;
						return $elm$core$Result$Err(e);
					} else {
						var d = _v0.a;
						var val = d.tag & (65535 >>> (16 - numberOfBits));
						var newTag = d.tag >>> numberOfBits;
						return $elm$core$Result$Ok(
							_Utils_Tuple2(
								val + base,
								{bitsAvailable: d.bitsAvailable - numberOfBits, buffer: d.buffer, reserve: d.reserve, reserveAvailable: d.reserveAvailable, tag: newTag}));
					}
				}
			});
	});
var $folkertdev$elm_flate$Inflate$BitReader$succeed = function (x) {
	return $folkertdev$elm_flate$Inflate$BitReader$BitReader(
		function (s) {
			return $elm$core$Result$Ok(
				_Utils_Tuple2(x, s));
		});
};
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $folkertdev$elm_flate$Inflate$Internal$decodeDynamicTreeLength = F4(
	function (codeTree, hlit, hdist, _v0) {
		var i = _v0.a;
		var bitset = _v0.b;
		var lengths = _v0.c;
		if (_Utils_cmp(i, hlit + hdist) < 0) {
			var table = A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(codeTree.table));
			return A2(
				$folkertdev$elm_flate$Inflate$BitReader$andThen,
				function (sym) {
					switch (sym) {
						case 16:
							var prev = A2(
								$elm$core$Maybe$withDefault,
								0,
								A2($elm$core$Dict$get, i - 1, lengths));
							return A2(
								$folkertdev$elm_flate$Inflate$BitReader$map,
								A2(
									$elm$core$Basics$composeR,
									A4($folkertdev$elm_flate$Inflate$Internal$copySegment, i, prev, bitset, lengths),
									$elm$bytes$Bytes$Decode$Loop),
								A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 2, 3));
						case 17:
							return A2(
								$folkertdev$elm_flate$Inflate$BitReader$map,
								A2(
									$elm$core$Basics$composeR,
									A4($folkertdev$elm_flate$Inflate$Internal$copySegment, i, 0, bitset, lengths),
									$elm$bytes$Bytes$Decode$Loop),
								A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 3, 3));
						case 18:
							return A2(
								$folkertdev$elm_flate$Inflate$BitReader$map,
								A2(
									$elm$core$Basics$composeR,
									A4($folkertdev$elm_flate$Inflate$Internal$copySegment, i, 0, bitset, lengths),
									$elm$bytes$Bytes$Decode$Loop),
								A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 7, 11));
						case 0:
							return A2($folkertdev$elm_flate$Inflate$BitSet$member, i, bitset) ? $folkertdev$elm_flate$Inflate$BitReader$succeed(
								$elm$bytes$Bytes$Decode$Loop(
									_Utils_Tuple3(
										i + 1,
										bitset,
										A2($elm$core$Dict$remove, i, lengths)))) : $folkertdev$elm_flate$Inflate$BitReader$succeed(
								$elm$bytes$Bytes$Decode$Loop(
									_Utils_Tuple3(i + 1, bitset, lengths)));
						default:
							return $folkertdev$elm_flate$Inflate$BitReader$succeed(
								$elm$bytes$Bytes$Decode$Loop(
									_Utils_Tuple3(
										i + 1,
										A2($folkertdev$elm_flate$Inflate$BitSet$insert, i, bitset),
										A3($elm$core$Dict$insert, i, sym, lengths))));
					}
				},
				A2($folkertdev$elm_flate$Inflate$Internal$decodeSymbol, table, codeTree));
		} else {
			return $folkertdev$elm_flate$Inflate$BitReader$succeed(
				$elm$bytes$Bytes$Decode$Done(lengths));
		}
	});
var $folkertdev$elm_flate$Inflate$BitSet$empty = $folkertdev$elm_flate$Inflate$BitSet$BitSet320(0)(0)(0)(0)(0)(0)(0)(0)(0)(0);
var $folkertdev$elm_flate$Inflate$Internal$decodeTreeLengths = F4(
	function (hlit, hdist, hclen, codeLengths) {
		var clcs = A2($elm$core$List$take, hclen, $folkertdev$elm_flate$Inflate$Internal$clcIndices);
		var initialLengths = function () {
			var go = F3(
				function (xs, ys, accum) {
					go:
					while (true) {
						if (!xs.b) {
							return accum;
						} else {
							var index = xs.a;
							var restIndex = xs.b;
							if (!ys.b) {
								return accum;
							} else {
								var codeLength = ys.a;
								var restCodeLength = ys.b;
								if (!(!codeLength)) {
									var $temp$xs = restIndex,
										$temp$ys = restCodeLength,
										$temp$accum = A3($elm$core$Dict$insert, index, codeLength, accum);
									xs = $temp$xs;
									ys = $temp$ys;
									accum = $temp$accum;
									continue go;
								} else {
									var $temp$xs = restIndex,
										$temp$ys = restCodeLength,
										$temp$accum = accum;
									xs = $temp$xs;
									ys = $temp$ys;
									accum = $temp$accum;
									continue go;
								}
							}
						}
					}
				});
			return A3(go, clcs, codeLengths, $elm$core$Dict$empty);
		}();
		var codeTree = A3($folkertdev$elm_flate$Inflate$Internal$buildTree, initialLengths, 0, 19);
		var initialBitSet = A3(
			$elm$core$Dict$foldl,
			F2(
				function (i, _v0) {
					return $folkertdev$elm_flate$Inflate$BitSet$insert(i);
				}),
			$folkertdev$elm_flate$Inflate$BitSet$empty,
			initialLengths);
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$loop,
			_Utils_Tuple3(0, initialBitSet, initialLengths),
			A3($folkertdev$elm_flate$Inflate$Internal$decodeDynamicTreeLength, codeTree, hlit, hdist));
	});
var $folkertdev$elm_flate$Inflate$BitReader$exactly = F2(
	function (tableCount, decoder) {
		var helper = function (_v0) {
			var n = _v0.a;
			var xs = _v0.b;
			return (n <= 0) ? $folkertdev$elm_flate$Inflate$BitReader$succeed(
				$elm$bytes$Bytes$Decode$Done(
					$elm$core$List$reverse(xs))) : A2(
				$folkertdev$elm_flate$Inflate$BitReader$map,
				function (x) {
					return $elm$bytes$Bytes$Decode$Loop(
						_Utils_Tuple2(
							n - 1,
							A2($elm$core$List$cons, x, xs)));
				},
				decoder);
		};
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$loop,
			_Utils_Tuple2(tableCount, _List_Nil),
			helper);
	});
var $folkertdev$elm_flate$Inflate$Internal$cont = F3(
	function (hlit, hdist, hclen) {
		var buildTrees = function (lengths) {
			return _Utils_Tuple2(
				A3($folkertdev$elm_flate$Inflate$Internal$buildTree, lengths, 0, hlit),
				A3($folkertdev$elm_flate$Inflate$Internal$buildTree, lengths, hlit, hdist));
		};
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$map,
			buildTrees,
			A2(
				$folkertdev$elm_flate$Inflate$BitReader$andThen,
				A3($folkertdev$elm_flate$Inflate$Internal$decodeTreeLengths, hlit, hdist, hclen),
				A2(
					$folkertdev$elm_flate$Inflate$BitReader$exactly,
					hclen,
					A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 3, 0))));
	});
var $folkertdev$elm_flate$Inflate$BitReader$map2 = F3(
	function (f, _v0, _v1) {
		var fa = _v0.a;
		var fb = _v1.a;
		return $folkertdev$elm_flate$Inflate$BitReader$BitReader(
			function (state) {
				var _v2 = fa(state);
				if (_v2.$ === 'Err') {
					var e = _v2.a;
					return $elm$core$Result$Err(e);
				} else {
					var _v3 = _v2.a;
					var a = _v3.a;
					var newState = _v3.b;
					var _v4 = fb(newState);
					if (_v4.$ === 'Err') {
						var e = _v4.a;
						return $elm$core$Result$Err(e);
					} else {
						var _v5 = _v4.a;
						var b = _v5.a;
						var newerState = _v5.b;
						return $elm$core$Result$Ok(
							_Utils_Tuple2(
								A2(f, a, b),
								newerState));
					}
				}
			});
	});
var $folkertdev$elm_flate$Inflate$BitReader$andMap = F2(
	function (a, f) {
		return A3($folkertdev$elm_flate$Inflate$BitReader$map2, $elm$core$Basics$apL, f, a);
	});
var $folkertdev$elm_flate$Inflate$BitReader$map3 = F4(
	function (f, a, b, c) {
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$andMap,
			c,
			A2(
				$folkertdev$elm_flate$Inflate$BitReader$andMap,
				b,
				A2(
					$folkertdev$elm_flate$Inflate$BitReader$andMap,
					a,
					$folkertdev$elm_flate$Inflate$BitReader$succeed(f))));
	});
var $folkertdev$elm_flate$Inflate$Internal$decodeTrees = A2(
	$folkertdev$elm_flate$Inflate$BitReader$andThen,
	$elm$core$Basics$identity,
	A4(
		$folkertdev$elm_flate$Inflate$BitReader$map3,
		$folkertdev$elm_flate$Inflate$Internal$cont,
		A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 5, 257),
		A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 5, 1),
		A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 4, 4)));
var $folkertdev$elm_flate$Inflate$BitReader$error = function (e) {
	return $folkertdev$elm_flate$Inflate$BitReader$BitReader(
		function (s) {
			return $elm$core$Result$Err(e);
		});
};
var $folkertdev$elm_flate$Inflate$BitReader$getBit = A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 1, 0);
var $folkertdev$elm_flate$Experimental$ByteArray$copyToBackInternal = F5(
	function (startIndex, size, array, finalSize, finalBytes) {
		copyToBackInternal:
		while (true) {
			var offset = startIndex % 4;
			var internalIndex = (startIndex / 4) | 0;
			if (size <= 0) {
				return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes);
			} else {
				if (_Utils_cmp(
					startIndex + 4,
					(($elm$core$Array$length(array) - 1) * 4) + finalSize) > -1) {
					var _v0 = A2(
						$folkertdev$elm_flate$Experimental$ByteArray$get,
						startIndex,
						A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes));
					if (_v0.$ === 'Nothing') {
						return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes);
					} else {
						var value = _v0.a;
						var _v1 = A2(
							$folkertdev$elm_flate$Experimental$ByteArray$push,
							value,
							A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes));
						var newArray = _v1.a;
						var newFinalSize = _v1.b;
						var newFinalBytes = _v1.c;
						var $temp$startIndex = startIndex + 1,
							$temp$size = size - 1,
							$temp$array = newArray,
							$temp$finalSize = newFinalSize,
							$temp$finalBytes = newFinalBytes;
						startIndex = $temp$startIndex;
						size = $temp$size;
						array = $temp$array;
						finalSize = $temp$finalSize;
						finalBytes = $temp$finalBytes;
						continue copyToBackInternal;
					}
				} else {
					var _v2 = A2($elm$core$Array$get, internalIndex, array);
					if (_v2.$ === 'Nothing') {
						return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes);
					} else {
						var value = _v2.a;
						var written = A2($elm$core$Basics$min, 4 - offset, size);
						var maskedFront = value << (8 * offset);
						var maskedBack = function () {
							if (_Utils_cmp(4 - offset, size) > 0) {
								var bytesWeNeedToRemove = 4 - size;
								var bytesWeHave = (3 - offset) + 1;
								return maskedFront >> (bytesWeNeedToRemove * 8);
							} else {
								return maskedFront >> (offset * 8);
							}
						}();
						var _v3 = A3(
							$folkertdev$elm_flate$Experimental$ByteArray$pushMany,
							written,
							maskedBack,
							A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes));
						var x = _v3.a;
						var y = _v3.b;
						var z = _v3.c;
						var $temp$startIndex = startIndex + written,
							$temp$size = size - written,
							$temp$array = x,
							$temp$finalSize = y,
							$temp$finalBytes = z;
						startIndex = $temp$startIndex;
						size = $temp$size;
						array = $temp$array;
						finalSize = $temp$finalSize;
						finalBytes = $temp$finalBytes;
						continue copyToBackInternal;
					}
				}
			}
		}
	});
var $folkertdev$elm_flate$Experimental$ByteArray$copyToBack = F3(
	function (startIndex, size, _v0) {
		var array = _v0.a;
		var finalSize = _v0.b;
		var finalBytes = _v0.c;
		return A5($folkertdev$elm_flate$Experimental$ByteArray$copyToBackInternal, startIndex, size, array, finalSize, finalBytes);
	});
var $folkertdev$elm_flate$Inflate$Internal$HuffmanTable = function (a) {
	return {$: 'HuffmanTable', a: a};
};
var $folkertdev$elm_flate$Inflate$Internal$buildBitsBase = F2(
	function (delta, first) {
		var initializer = function (i) {
			return (_Utils_cmp(i, delta) < 0) ? 0 : (((i - delta) / delta) | 0);
		};
		var folder = F2(
			function (bit, _v0) {
				var sum = _v0.a;
				var accum = _v0.b;
				return _Utils_Tuple2(
					sum + (1 << bit),
					A2(
						$elm$core$Array$push,
						{base: sum, bits: bit},
						accum));
			});
		var bits = A2($elm$core$Array$initialize, 30, initializer);
		var base = A3(
			$elm$core$Array$foldl,
			folder,
			_Utils_Tuple2(first, $elm$core$Array$empty),
			bits).b;
		return $folkertdev$elm_flate$Inflate$Internal$HuffmanTable(base);
	});
var $folkertdev$elm_flate$Inflate$Internal$hardcodedDistanceTable = A2($folkertdev$elm_flate$Inflate$Internal$buildBitsBase, 2, 1);
var $folkertdev$elm_flate$Inflate$Internal$hardcodedLengthTable = function (_v0) {
	var array = _v0.a;
	return $folkertdev$elm_flate$Inflate$Internal$HuffmanTable(
		A3(
			$elm$core$Array$set,
			28,
			{base: 258, bits: 0},
			array));
}(
	A2($folkertdev$elm_flate$Inflate$Internal$buildBitsBase, 4, 3));
var $folkertdev$elm_flate$Inflate$Internal$readHuffmanTable = F2(
	function (index, _v0) {
		var table = _v0.a;
		return A2($elm$core$Array$get, index, table);
	});
var $folkertdev$elm_flate$Inflate$Internal$decodeLength = function (symbol) {
	var _v0 = A2($folkertdev$elm_flate$Inflate$Internal$readHuffmanTable, symbol - 257, $folkertdev$elm_flate$Inflate$Internal$hardcodedLengthTable);
	if (_v0.$ === 'Nothing') {
		return $folkertdev$elm_flate$Inflate$BitReader$error(
			function () {
				var _v1 = $folkertdev$elm_flate$Inflate$Internal$hardcodedDistanceTable;
				var internal = _v1.a;
				return 'index out of bounds in hardcodedLengthTable: requested index ' + ($elm$core$String$fromInt(symbol - 257) + ('but hardcodedLengthTable has length ' + $elm$core$String$fromInt(
					$elm$core$Array$length(internal))));
			}());
	} else {
		var entry = _v0.a;
		return A2($folkertdev$elm_flate$Inflate$BitReader$readBits, entry.bits, entry.base);
	}
};
var $folkertdev$elm_flate$Inflate$Internal$decodeOffset = F2(
	function (outputLength, dt) {
		var table_ = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			$elm$core$List$tail(dt.table));
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$andThen,
			function (distance) {
				var _v0 = A2($folkertdev$elm_flate$Inflate$Internal$readHuffmanTable, distance, $folkertdev$elm_flate$Inflate$Internal$hardcodedDistanceTable);
				if (_v0.$ === 'Nothing') {
					return $folkertdev$elm_flate$Inflate$BitReader$error(
						function () {
							var _v1 = $folkertdev$elm_flate$Inflate$Internal$hardcodedDistanceTable;
							var internal = _v1.a;
							return 'index out of bounds in hardcodedDistanceTable: requested index ' + ($elm$core$String$fromInt(distance) + ('but hardcodedLengthTable has length ' + $elm$core$String$fromInt(
								$elm$core$Array$length(internal))));
						}());
				} else {
					var entry = _v0.a;
					return A2(
						$folkertdev$elm_flate$Inflate$BitReader$map,
						function (v) {
							return outputLength - v;
						},
						A2($folkertdev$elm_flate$Inflate$BitReader$readBits, entry.bits, entry.base));
				}
			},
			A2($folkertdev$elm_flate$Inflate$Internal$decodeSymbol, table_, dt));
	});
var $folkertdev$elm_flate$Inflate$Internal$inflateBlockDataHelp = F2(
	function (trees, _v0) {
		var outputLength = _v0.a;
		var output = _v0.b;
		var table = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			$elm$core$List$tail(trees.literal.table));
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$andThen,
			function (symbol) {
				return (symbol === 256) ? $folkertdev$elm_flate$Inflate$BitReader$succeed(
					$elm$bytes$Bytes$Decode$Done(output)) : ((symbol < 256) ? $folkertdev$elm_flate$Inflate$BitReader$succeed(
					$elm$bytes$Bytes$Decode$Loop(
						_Utils_Tuple2(
							outputLength + 1,
							A2($folkertdev$elm_flate$Experimental$ByteArray$push, symbol, output)))) : A3(
					$folkertdev$elm_flate$Inflate$BitReader$map2,
					F2(
						function (length, offset) {
							return $elm$bytes$Bytes$Decode$Loop(
								_Utils_Tuple2(
									outputLength + length,
									A3($folkertdev$elm_flate$Experimental$ByteArray$copyToBack, offset, length, output)));
						}),
					$folkertdev$elm_flate$Inflate$Internal$decodeLength(symbol),
					A2($folkertdev$elm_flate$Inflate$Internal$decodeOffset, outputLength, trees.distance)));
			},
			A2($folkertdev$elm_flate$Inflate$Internal$decodeSymbol, table, trees.literal));
	});
var $folkertdev$elm_flate$Inflate$Internal$inflateBlockData = F3(
	function (trees, outputLength, output) {
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$loop,
			_Utils_Tuple2(outputLength, output),
			$folkertdev$elm_flate$Inflate$Internal$inflateBlockDataHelp(trees));
	});
var $folkertdev$elm_flate$Inflate$BitReader$flushHelp = function (state0) {
	var availableSpace = 32 - state0.bitsAvailable;
	var state = A2(
		$folkertdev$elm_flate$Inflate$BitReader$moveFromReserve,
		A2($elm$core$Basics$min, availableSpace, state0.reserveAvailable),
		state0);
	var reserveEncoder = (state.reserveAvailable > 24) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$LE, state.reserve)
		]) : ((state.reserveAvailable > 16) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt16, $elm$bytes$Bytes$LE, state.reserve),
			$elm$bytes$Bytes$Encode$unsignedInt8(state.reserve >> 16)
		]) : ((state.reserveAvailable > 8) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt16, $elm$bytes$Bytes$LE, state.reserve)
		]) : ((state.reserveAvailable > 1) ? _List_fromArray(
		[
			$elm$bytes$Bytes$Encode$unsignedInt8(state.reserve)
		]) : _List_Nil)));
	var tagEncoder = (state.bitsAvailable > 24) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt32, $elm$bytes$Bytes$LE, state.tag)
		]) : ((state.bitsAvailable > 16) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt16, $elm$bytes$Bytes$LE, state.tag),
			$elm$bytes$Bytes$Encode$unsignedInt8(state.tag >> 16)
		]) : ((state.bitsAvailable > 8) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt16, $elm$bytes$Bytes$LE, state.tag)
		]) : ((state.bitsAvailable > 1) ? _List_fromArray(
		[
			$elm$bytes$Bytes$Encode$unsignedInt8(state.tag)
		]) : _List_Nil)));
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			_Utils_ap(
				tagEncoder,
				_Utils_ap(
					reserveEncoder,
					_List_fromArray(
						[
							$elm$bytes$Bytes$Encode$bytes(state.buffer)
						])))));
};
var $folkertdev$elm_flate$Inflate$BitReader$flush = function (state) {
	return {
		bitsAvailable: 0,
		buffer: $folkertdev$elm_flate$Inflate$BitReader$flushHelp(state),
		reserve: 0,
		reserveAvailable: 0,
		tag: 0
	};
};
var $elm$bytes$Bytes$Decode$fail = $elm$bytes$Bytes$Decode$Decoder(_Bytes_decodeFailure);
var $folkertdev$elm_flate$Inflate$Internal$uncompressedBlockDecoder = function (bufferWidth) {
	var decodeLengths = A3(
		$elm$bytes$Bytes$Decode$map2,
		$elm$core$Tuple$pair,
		$elm$bytes$Bytes$Decode$unsignedInt16($elm$bytes$Bytes$LE),
		$elm$bytes$Bytes$Decode$unsignedInt16($elm$bytes$Bytes$LE));
	return A2(
		$elm$bytes$Bytes$Decode$andThen,
		function (_v0) {
			var length = _v0.a;
			var invlength = _v0.b;
			if (!_Utils_eq(length, (~invlength) & 65535)) {
				return $elm$bytes$Bytes$Decode$fail;
			} else {
				var remainingSize = (bufferWidth - 4) - length;
				return A3(
					$elm$bytes$Bytes$Decode$map2,
					$elm$core$Tuple$pair,
					$elm$bytes$Bytes$Decode$bytes(length),
					$elm$bytes$Bytes$Decode$bytes(remainingSize));
			}
		},
		decodeLengths);
};
var $folkertdev$elm_flate$Inflate$Internal$inflateUncompressedBlock = $folkertdev$elm_flate$Inflate$BitReader$BitReader(
	function (state_) {
		var state = $folkertdev$elm_flate$Inflate$BitReader$flush(state_);
		var _v0 = A2(
			$elm$bytes$Bytes$Decode$decode,
			$folkertdev$elm_flate$Inflate$Internal$uncompressedBlockDecoder(
				$elm$bytes$Bytes$width(state.buffer)),
			state.buffer);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Result$Err('inflateUncompressedBlock: ran out of bounds');
		} else {
			var _v1 = _v0.a;
			var block = _v1.a;
			var newBuffer = _v1.b;
			return $elm$core$Result$Ok(
				_Utils_Tuple2(
					block,
					_Utils_update(
						state,
						{buffer: newBuffer})));
		}
	});
var $folkertdev$elm_flate$Inflate$Internal$sdtree = {
	table: _List_fromArray(
		[0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
	trans: A2(
		$elm$core$Array$append,
		$elm$core$Array$fromList(
			_List_fromArray(
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])),
		A2($elm$core$Array$repeat, 288 - 32, 0))
};
var $folkertdev$elm_flate$Inflate$Internal$sltree = {
	table: _List_fromArray(
		[0, 0, 0, 0, 0, 0, 0, 24, 152, 112, 0, 0, 0, 0, 0, 0]),
	trans: $elm$core$Array$fromList(
		_List_fromArray(
			[256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 280, 281, 282, 283, 284, 285, 286, 287, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255]))
};
var $folkertdev$elm_flate$Inflate$Internal$uncompressHelp = function (output) {
	var uncompressBlock = function (btype) {
		switch (btype) {
			case 0:
				return A2(
					$folkertdev$elm_flate$Inflate$BitReader$map,
					function (bytes) {
						return A2($folkertdev$elm_flate$Experimental$ByteArray$appendBytes, bytes, output);
					},
					A2(
						$folkertdev$elm_flate$Inflate$BitReader$andThen,
						function (_v1) {
							return $folkertdev$elm_flate$Inflate$Internal$inflateUncompressedBlock;
						},
						A2($folkertdev$elm_flate$Inflate$BitReader$exactly, 5, $folkertdev$elm_flate$Inflate$BitReader$getBit)));
			case 1:
				return A3(
					$folkertdev$elm_flate$Inflate$Internal$inflateBlockData,
					{distance: $folkertdev$elm_flate$Inflate$Internal$sdtree, literal: $folkertdev$elm_flate$Inflate$Internal$sltree},
					$folkertdev$elm_flate$Experimental$ByteArray$length(output),
					output);
			case 2:
				return A2(
					$folkertdev$elm_flate$Inflate$BitReader$andThen,
					function (_v2) {
						var ltree = _v2.a;
						var dtree = _v2.b;
						return A3(
							$folkertdev$elm_flate$Inflate$Internal$inflateBlockData,
							{distance: dtree, literal: ltree},
							$folkertdev$elm_flate$Experimental$ByteArray$length(output),
							output);
					},
					$folkertdev$elm_flate$Inflate$Internal$decodeTrees);
			default:
				return $folkertdev$elm_flate$Inflate$BitReader$error(
					'invalid block type: ' + ($elm$core$String$fromInt(btype) + ' (only 0, 1 and 2 are valid block types)'));
		}
	};
	var readTwoBits = A3(
		$folkertdev$elm_flate$Inflate$BitReader$map2,
		F2(
			function (b1, b2) {
				return b1 + (2 * b2);
			}),
		$folkertdev$elm_flate$Inflate$BitReader$getBit,
		$folkertdev$elm_flate$Inflate$BitReader$getBit);
	var go = F2(
		function (isFinal, blockType) {
			return (!(!isFinal)) ? A2(
				$folkertdev$elm_flate$Inflate$BitReader$map,
				$elm$bytes$Bytes$Decode$Done,
				uncompressBlock(blockType)) : A2(
				$folkertdev$elm_flate$Inflate$BitReader$map,
				$elm$bytes$Bytes$Decode$Loop,
				uncompressBlock(blockType));
		});
	return A2(
		$folkertdev$elm_flate$Inflate$BitReader$andThen,
		$elm$core$Basics$identity,
		A3($folkertdev$elm_flate$Inflate$BitReader$map2, go, $folkertdev$elm_flate$Inflate$BitReader$getBit, readTwoBits));
};
var $folkertdev$elm_flate$Inflate$Internal$uncompress = A2(
	$folkertdev$elm_flate$Inflate$BitReader$map,
	A2($elm$core$Basics$composeR, $folkertdev$elm_flate$Experimental$ByteArray$toBytes, $elm$core$List$singleton),
	A2($folkertdev$elm_flate$Inflate$BitReader$loop, $folkertdev$elm_flate$Experimental$ByteArray$empty, $folkertdev$elm_flate$Inflate$Internal$uncompressHelp));
var $folkertdev$elm_flate$Inflate$Internal$inflate = function (buffer) {
	var _v0 = A2($folkertdev$elm_flate$Inflate$BitReader$decode, buffer, $folkertdev$elm_flate$Inflate$Internal$uncompress);
	if (_v0.$ === 'Err') {
		var e = _v0.a;
		return $elm$core$Result$Err(e);
	} else {
		var values = _v0.a;
		return $elm$core$Result$Ok(
			$elm$bytes$Bytes$Encode$encode(
				$elm$bytes$Bytes$Encode$sequence(
					A2($elm$core$List$map, $elm$bytes$Bytes$Encode$bytes, values))));
	}
};
var $folkertdev$elm_flate$Inflate$Inflate$inflate = function (buffer) {
	var _v0 = $folkertdev$elm_flate$Inflate$Internal$inflate(buffer);
	if (_v0.$ === 'Err') {
		return $elm$core$Maybe$Nothing;
	} else {
		var newBuffer = _v0.a;
		return $elm$core$Maybe$Just(newBuffer);
	}
};
var $folkertdev$elm_flate$Flate$inflate = $folkertdev$elm_flate$Inflate$Inflate$inflate;
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Teams$shortNameToLong = function (s) {
	switch (s) {
		case 'AC':
			return 'Adelaide Crows';
		case 'BL':
			return 'Brisbane Lions';
		case 'CB':
			return 'Carlton Blues';
		case 'CM':
			return 'Collingwood Magpies';
		case 'EB':
			return 'Essendon Bombers';
		case 'FD':
			return 'Fremantle Dockers';
		case 'GC':
			return 'Geelong Cats';
		case 'GCS':
			return 'Gold Coast Suns';
		case 'GWSG':
			return 'Greater Western Sydney Giants';
		case 'HH':
			return 'Hawthorn Hawks';
		case 'MD':
			return 'Melbourne Demons';
		case 'NMK':
			return 'North Melbourne Kangaroos';
		case 'PAP':
			return 'Port Adelaide Power';
		case 'RT':
			return 'Richmond Tigers';
		case 'SKS':
			return 'St Kilda Saints';
		case 'SS':
			return 'Sydney Swans';
		case 'WCE':
			return 'West Coast Eagles';
		case 'WB':
			return 'Western Bulldogs';
		default:
			return 'unidentified team';
	}
};
var $elm$bytes$Bytes$Decode$string = function (n) {
	return $elm$bytes$Bytes$Decode$Decoder(
		_Bytes_read_string(n));
};
var $author$project$Main$stringAsBytes = function (s) {
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$string(s));
};
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'PlayerChecked':
				var player = msg.a;
				var _v1 = $elm$core$List$length(
					A2(
						$elm$core$List$filter,
						function (p) {
							return _Utils_eq(p, player);
						},
						model.players_checked));
				if (_v1 === 1) {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								players_checked: A2(
									$elm$core$List$filter,
									function (p) {
										return !_Utils_eq(p, player);
									},
									model.players_checked),
								players_going: A2(
									$elm$core$List$filter,
									function (p) {
										return !_Utils_eq(p.a, player);
									},
									model.players_going)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								players_checked: A2($elm$core$List$cons, player, model.players_checked)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'PickChecked':
				var pick = msg.a;
				var _v2 = $elm$core$List$length(
					A2(
						$elm$core$List$filter,
						function (p) {
							return _Utils_eq(p, pick);
						},
						model.picks_checked));
				if (_v2 === 1) {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								picks_checked: A2(
									$elm$core$List$filter,
									function (p) {
										return !_Utils_eq(p, pick);
									},
									model.picks_checked),
								picks_going: A2(
									$elm$core$List$filter,
									function (p) {
										return !_Utils_eq(p.a.a, pick.a);
									},
									model.picks_going)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								picks_checked: A2($elm$core$List$cons, pick, model.picks_checked)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'TeamChecked':
				var team = msg.a;
				var _v3 = $elm$core$List$length(
					A2(
						$elm$core$List$filter,
						function (t) {
							return _Utils_eq(t, team);
						},
						model.teams_checked));
				if (_v3 === 1) {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								teams_checked: A2(
									$elm$core$List$filter,
									function (t) {
										return !_Utils_eq(t, team);
									},
									model.teams_checked)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								teams_checked: A2($elm$core$List$cons, team, model.teams_checked)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'PlayerGoing':
				var pl = msg.a;
				var team = msg.b;
				var new_list = A2(
					$elm$core$List$filter,
					function (pg) {
						return !_Utils_eq(pg.a, pl);
					},
					model.players_going);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							players_going: A2(
								$elm$core$List$filter,
								function (l) {
									return l.b !== '...';
								},
								A2(
									$elm$core$List$cons,
									_Utils_Tuple2(pl, team),
									new_list))
						}),
					$elm$core$Platform$Cmd$none);
			case 'PickGoing':
				var p = msg.a;
				var old_t = msg.b;
				var new_t = msg.c;
				var new_list = A2(
					$elm$core$List$filter,
					function (pg) {
						return !_Utils_eq(pg.a.a, p);
					},
					model.picks_going);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							picks_going: A2(
								$elm$core$List$filter,
								function (l) {
									return l.b !== '...';
								},
								A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										_Utils_Tuple2(p, old_t),
										$author$project$Teams$shortNameToLong(new_t)),
									new_list))
						}),
					$elm$core$Platform$Cmd$none);
			case 'ExportModal':
				var state = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{copied: $elm$core$Maybe$Nothing, export_modal: state, hash: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 'ImportModal':
				var state = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{copied: $elm$core$Maybe$Nothing, hash: $elm$core$Maybe$Nothing, import_modal: state}),
					$elm$core$Platform$Cmd$none);
			case 'PlayerFilter':
				var inp = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{player_filter: inp}),
					$elm$core$Platform$Cmd$none);
			case 'FuturePick':
				var team = msg.a;
				var pick = msg.b;
				var new_list = A2(
					$elm$core$List$member,
					_Utils_Tuple2(pick, team.name),
					model.future_picks_checked) ? A2(
					$elm$core$List$filter,
					function (tp) {
						return !_Utils_eq(
							tp,
							_Utils_Tuple2(pick, team.name));
					},
					model.future_picks_checked) : A2(
					$elm$core$List$cons,
					_Utils_Tuple2(pick, team.name),
					model.future_picks_checked);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{future_picks_checked: new_list}),
					$elm$core$Platform$Cmd$none);
			case 'FuturePickGoing':
				var p = msg.a;
				var old_t = msg.b;
				var new_t = msg.c;
				var new_list = A2(
					$elm$core$List$filter,
					function (pg) {
						return !_Utils_eq(pg.a.a, p);
					},
					model.future_picks_going);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							future_picks_going: A2(
								$elm$core$List$filter,
								function (l) {
									return l.b !== '...';
								},
								A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										_Utils_Tuple2(p, old_t),
										new_t),
									new_list))
						}),
					$elm$core$Platform$Cmd$none);
			case 'CalculateHash':
				var mdl = A2(
					$elm$json$Json$Encode$encode,
					0,
					$author$project$Main$encodeModel(model));
				var deflate = $folkertdev$elm_flate$Flate$deflate(
					$author$project$Main$stringAsBytes(mdl));
				return _Utils_Tuple2(
					model,
					$author$project$Ports$copy(
						$ivadzy$bbase64$Base64$Encode$encode(
							$ivadzy$bbase64$Base64$Encode$bytes(deflate))));
			case 'CopyDone':
				var str = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							copied: $elm$core$Maybe$Just(str)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var str = msg.a;
				var b_decoded_str = A2($ivadzy$bbase64$Base64$Decode$decode, $ivadzy$bbase64$Base64$Decode$bytes, str);
				if (b_decoded_str.$ === 'Ok') {
					var b_d_str = b_decoded_str.a;
					var inflate = $folkertdev$elm_flate$Flate$inflate(b_d_str);
					if (inflate.$ === 'Just') {
						var b = inflate.a;
						var b_str = A2(
							$elm$bytes$Bytes$Decode$decode,
							$elm$bytes$Bytes$Decode$string(
								$elm$bytes$Bytes$width(b)),
							b);
						if (b_str.$ === 'Just') {
							var s = b_str.a;
							var mdl = A2($elm$json$Json$Decode$decodeString, $author$project$Main$decodeModel, s);
							if (mdl.$ === 'Ok') {
								var m = mdl.a;
								return _Utils_Tuple2(
									A3($author$project$Main$importModelToModel, s, model, m),
									$elm$core$Platform$Cmd$none);
							} else {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{hash: $elm$core$Maybe$Nothing, hash_error: 'Could not decode json to model.'}),
									$elm$core$Platform$Cmd$none);
							}
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{hash: $elm$core$Maybe$Nothing, hash_error: 'Could not decode bytes to string.'}),
								$elm$core$Platform$Cmd$none);
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{hash: $elm$core$Maybe$Nothing, hash_error: 'Could not inflate hash.'}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{hash: $elm$core$Maybe$Nothing, hash_error: 'Could not decode hash.'}),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Main$CalculateHash = {$: 'CalculateHash'};
var $author$project$Main$ExportModal = function (a) {
	return {$: 'ExportModal', a: a};
};
var $author$project$Main$FuturePick = F2(
	function (a, b) {
		return {$: 'FuturePick', a: a, b: b};
	});
var $author$project$Main$FuturePickGoing = F3(
	function (a, b, c) {
		return {$: 'FuturePickGoing', a: a, b: b, c: c};
	});
var $author$project$Main$ImportHash = function (a) {
	return {$: 'ImportHash', a: a};
};
var $author$project$Main$ImportModal = function (a) {
	return {$: 'ImportModal', a: a};
};
var $author$project$Main$PickChecked = function (a) {
	return {$: 'PickChecked', a: a};
};
var $author$project$Main$PickGoing = F3(
	function (a, b, c) {
		return {$: 'PickGoing', a: a, b: b, c: c};
	});
var $author$project$Main$PlayerChecked = function (a) {
	return {$: 'PlayerChecked', a: a};
};
var $author$project$Main$PlayerFilter = function (a) {
	return {$: 'PlayerFilter', a: a};
};
var $author$project$Main$PlayerGoing = F2(
	function (a, b) {
		return {$: 'PlayerGoing', a: a, b: b};
	});
var $author$project$Main$TeamChecked = function (a) {
	return {$: 'TeamChecked', a: a};
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$br = _VirtualDom_node('br');
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Teams$futurePickRat = function (s) {
	var base = A2($elm$core$String$contains, 'R1', s) ? 500 : (A2($elm$core$String$contains, 'R2', s) ? 400 : (A2($elm$core$String$contains, 'R3', s) ? 200 : 100));
	return A2($elm$core$String$contains, '2021', s) ? (base / 1) : (A2($elm$core$String$contains, '2022', s) ? (base / 1.1) : (A2($elm$core$String$contains, '2023', s) ? (base / 1.2) : (base / 1.3)));
};
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $elm$html$Html$h5 = _VirtualDom_node('h5');
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$core$Basics$not = _Basics_not;
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$Teams$picLookup = function (s) {
	return 'https://s.afl.com.au/staticfile/AFL%20Tenant/AFL/Players/ChampIDImages/XLarge2020/' + (A3($elm$core$String$replace, 'CD_I', '', s.id) + '.png');
};
var $author$project$Teams$pickRat = function (i) {
	switch (i) {
		case 1:
			return 3000;
		case 2:
			return 2517;
		case 3:
			return 2234;
		case 4:
			return 2034;
		case 5:
			return 1878;
		case 6:
			return 1751;
		case 7:
			return 1644;
		case 8:
			return 1551;
		case 9:
			return 1469;
		case 10:
			return 1395;
		case 11:
			return 1329;
		case 12:
			return 1268;
		case 13:
			return 1212;
		case 14:
			return 1161;
		case 15:
			return 1112;
		case 16:
			return 1067;
		case 17:
			return 1025;
		case 18:
			return 985;
		case 19:
			return 948;
		case 20:
			return 912;
		case 21:
			return 878;
		case 22:
			return 845;
		case 23:
			return 815;
		case 24:
			return 785;
		case 25:
			return 756;
		case 26:
			return 729;
		case 27:
			return 703;
		case 28:
			return 677;
		case 29:
			return 653;
		case 30:
			return 629;
		case 31:
			return 606;
		case 32:
			return 584;
		case 33:
			return 563;
		case 34:
			return 542;
		case 35:
			return 522;
		case 36:
			return 502;
		case 37:
			return 483;
		case 38:
			return 465;
		case 39:
			return 446;
		case 40:
			return 429;
		case 41:
			return 412;
		case 42:
			return 395;
		case 43:
			return 378;
		case 44:
			return 362;
		case 45:
			return 347;
		case 46:
			return 331;
		case 47:
			return 316;
		case 48:
			return 302;
		case 49:
			return 287;
		case 50:
			return 273;
		case 51:
			return 259;
		case 52:
			return 246;
		case 53:
			return 233;
		case 54:
			return 220;
		case 55:
			return 207;
		case 56:
			return 194;
		case 57:
			return 182;
		case 58:
			return 170;
		case 59:
			return 158;
		case 60:
			return 146;
		case 61:
			return 135;
		case 62:
			return 123;
		case 63:
			return 112;
		case 64:
			return 101;
		case 65:
			return 90;
		case 66:
			return 80;
		case 67:
			return 69;
		case 68:
			return 59;
		case 69:
			return 49;
		case 70:
			return 39;
		case 71:
			return 29;
		case 72:
			return 19;
		case 73:
			return 9;
		case 74:
			return 0;
		default:
			return 0;
	}
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $author$project$Teams$positionPretty = function (s) {
	switch (s) {
		case 'KEY_DEFENDER':
			return 'Key Def';
		case 'KEY_FORWARD':
			return 'Key Fwd';
		case 'MEDIUM_DEFENDER':
			return 'Medium Def';
		case 'MEDIUM_FORWARD':
			return 'Medium Fwd';
		case 'MIDFIELDER_FORWARD':
			return 'Midfielder Fwd';
		case 'MIDFIELDER':
			return 'Midfielder';
		case 'RUCK':
			return 'Ruck';
		default:
			return s;
	}
};
var $author$project$Teams$retiredPlayers = _List_fromArray(
	['Bryce Gibbs', 'Riley Knight', 'Ayce Taylor', 'Patrick Wilson', 'Jacob Allison', 'Allen Christensen', 'Matt Eagles', 'Corey Lyons', 'Sam Skinner', 'Toby Wooller', 'Hugh Goddard', 'Matthew Kreuzer', 'Darcy Lang', 'Finbar O\'Dwyer', 'Ben Silvagni', 'Kade Simpson', 'Tim Broomhead', 'Lynden Dunn', 'Ben Reid ', 'Matthew Scharenberg', 'Travis Varcoe', 'Josh Begley', 'Tom Bellchambers', 'Noah Gown', 'Mitch Hibberd', 'Conor McKenna ', 'Shaun McKernan', 'Kobe Mutch', 'Isaiah Butters', 'Jason Carter', 'Hugh Dixon', 'Brandon Matera', 'Cam McCarthy', 'Tom North', 'Dillon O\'Reilly', 'Jarvis Pina', 'Gary Ablett', 'Jacob Kennerley', 'James Parsons', 'Blake Schlensog', 'Jacob Dawson', 'Corey Ellis', 'Sam Fletcher', 'Pearce Hanley', 'Jacob Heron', 'George Horlin-Smith', 'Jesse Joyce', 'Anthony Miles', 'Mitch Riordan', 'Josh Schoenfeld', 'Sam Jacobs', 'Heath Shaw', 'Tom Sheridan', 'James Frawley', 'Conor Glass', 'Will Golds', 'Ricky Henderson', 'Darren Minchington', 'Paul Puopolo', 'Jackson Ross', 'Ben Stratton', 'Harley Bennell', 'Kyle Dunkley', 'Corey Wagner', 'Josh Wagner', 'Paul Ahern', 'Joel Crocker', 'Majak Daw', 'Sam Durdin', 'Lachie Hosie', 'Ben Jacobs', 'Jamie Macmillan', 'Tom Murphy', 'Jasper Pittard', 'Marley Williams', 'Mason Wood', 'Joe Atley', 'Wylie Buzza', 'Tobin Cox', 'Brad Ebert', 'Riley Grundy', 'Cam Sutcliffe', 'Jack Watts', 'Justin Westhoff', 'Luke English', 'Fraser Turner', 'Ryan Abbott', 'Logan Austin', 'Jack Bell', 'Nathan Brown', 'Doulton Langlands', 'Jack Mayo', 'Michael Knoll', 'Jack Maibaum', 'Harry Reynolds', 'Brady Rowles', 'Ryley Stoddart', 'Hamish Brayshaw', 'Mitch O\'Neill', 'Nic Reid', 'Will Schofield', 'Anthony Treacy', 'Francis Watson', 'Tory Dickson', 'Alex Rance']);
var $elm$core$Basics$round = _Basics_round;
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$core$List$sortBy = _List_sortBy;
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$td = _VirtualDom_node('td');
var $author$project$Teams$adelaideCrowsPicks = _List_fromArray(
	[1, 8, 20, 44, 48, 60, 74]);
var $author$project$Teams$adelaideCrowsPlayers = _List_fromArray(
	[
		{id: 'CD_I1000908', name: 'Myles Poholke', pos: 'MIDFIELDER_FORWARD', rat: 33.1, team: 'Adelaide Crows'},
		{id: 'CD_I1000932', name: 'Tom Doedee', pos: 'KEY_DEFENDER', rat: 117.7, team: 'Adelaide Crows'},
		{id: 'CD_I1000998', name: 'Lachlan Murphy', pos: 'MEDIUM_FORWARD', rat: 242.4, team: 'Adelaide Crows'},
		{id: 'CD_I1004995', name: 'Jordon Butts', pos: 'KEY_DEFENDER', rat: 9.3, team: 'Adelaide Crows'},
		{id: 'CD_I1005199', name: 'Elliott Himmelberg', pos: 'KEY_FORWARD', rat: 132.7, team: 'Adelaide Crows'},
		{id: 'CD_I1006136', name: 'Lachlan Sholl', pos: 'MIDFIELDER', rat: 45.9, team: 'Adelaide Crows'},
		{id: 'CD_I1006203', name: 'Chayce Jones', pos: 'MIDFIELDER', rat: 121.7, team: 'Adelaide Crows'},
		{id: 'CD_I1008159', name: 'Will Hamill', pos: 'MEDIUM_DEFENDER', rat: 25.4, team: 'Adelaide Crows'},
		{id: 'CD_I1008185', name: 'Ned McHenry', pos: 'MEDIUM_FORWARD', rat: 26.3, team: 'Adelaide Crows'},
		{id: 'CD_I1008543', name: 'Harry Schoenberg', pos: 'MIDFIELDER_FORWARD', rat: 51.6, team: 'Adelaide Crows'},
		{id: 'CD_I1008752', name: 'Kieran Strachan', pos: 'RUCK', rat: 3.0, team: 'Adelaide Crows'},
		{id: 'CD_I1009201', name: 'Fischer McAsey', pos: 'KEY_DEFENDER', rat: 31.0, team: 'Adelaide Crows'},
		{id: 'CD_I1011254', name: 'Ronin O\'Connor', pos: 'MIDFIELDER', rat: 0.0, team: 'Adelaide Crows'},
		{id: 'CD_I1011981', name: 'Josh Worrell', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Adelaide Crows'},
		{id: 'CD_I1016214', name: 'Ayce Taylor', pos: 'KEY_DEFENDER', rat: 0.0, team: 'Adelaide Crows'},
		{id: 'CD_I1018075', name: 'Lachlan Gollant', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Adelaide Crows'},
		{id: 'CD_I250362', name: 'David Mackay', pos: 'MEDIUM_DEFENDER', rat: 266.9, team: 'Adelaide Crows'},
		{id: 'CD_I250417', name: 'Bryce Gibbs', pos: 'MEDIUM_DEFENDER', rat: 174.7, team: 'Adelaide Crows'},
		{id: 'CD_I270938', name: 'Tom Lynch', pos: 'MEDIUM_FORWARD', rat: 342.6, team: 'Adelaide Crows'},
		{id: 'CD_I270963', name: 'Rory Sloane', pos: 'MIDFIELDER', rat: 459.1, team: 'Adelaide Crows'},
		{id: 'CD_I280506', name: 'Taylor Walker', pos: 'KEY_FORWARD', rat: 318.7, team: 'Adelaide Crows'},
		{id: 'CD_I280934', name: 'Daniel Talia', pos: 'KEY_DEFENDER', rat: 282.9, team: 'Adelaide Crows'},
		{id: 'CD_I290228', name: 'Kyle Hartigan', pos: 'KEY_DEFENDER', rat: 158.2, team: 'Adelaide Crows'},
		{id: 'CD_I291748', name: 'Brodie Smith', pos: 'MEDIUM_DEFENDER', rat: 367.2, team: 'Adelaide Crows'},
		{id: 'CD_I293193', name: 'Luke Brown', pos: 'MEDIUM_DEFENDER', rat: 228.0, team: 'Adelaide Crows'},
		{id: 'CD_I293222', name: 'Rory Laird', pos: 'MIDFIELDER', rat: 351.3, team: 'Adelaide Crows'},
		{id: 'CD_I294307', name: 'Brad Crouch', pos: 'MIDFIELDER', rat: 325.3, team: 'Adelaide Crows'},
		{id: 'CD_I294472', name: 'Rory Atkins', pos: 'MIDFIELDER', rat: 249.7, team: 'Adelaide Crows'},
		{id: 'CD_I294733', name: 'Paul Seedsman', pos: 'MIDFIELDER', rat: 228.3, team: 'Adelaide Crows'},
		{id: 'CD_I295103', name: 'Riley Knight', pos: 'MEDIUM_FORWARD', rat: 125.1, team: 'Adelaide Crows'},
		{id: 'CD_I295964', name: 'Patrick Wilson', pos: 'MIDFIELDER', rat: 3.5, team: 'Adelaide Crows'},
		{id: 'CD_I297401', name: 'Matt Crouch', pos: 'MIDFIELDER', rat: 355.6, team: 'Adelaide Crows'},
		{id: 'CD_I297473', name: 'Jake Kelly', pos: 'MEDIUM_DEFENDER', rat: 225.2, team: 'Adelaide Crows'},
		{id: 'CD_I297523', name: 'Reilly O\'Brien', pos: 'RUCK', rat: 391.0, team: 'Adelaide Crows'},
		{id: 'CD_I298417', name: 'Ben Davis', pos: 'MEDIUM_FORWARD', rat: 6.9, team: 'Adelaide Crows'},
		{id: 'CD_I298470', name: 'Shane McAdam', pos: 'MEDIUM_FORWARD', rat: 99.8, team: 'Adelaide Crows'},
		{id: 'CD_I990882', name: 'Wayne Milera', pos: 'MEDIUM_DEFENDER', rat: 204.6, team: 'Adelaide Crows'},
		{id: 'CD_I991773', name: 'Billy Frampton', pos: 'KEY_FORWARD', rat: 28.3, team: 'Adelaide Crows'},
		{id: 'CD_I993796', name: 'Ben Crocker', pos: 'MEDIUM_FORWARD', rat: 27.9, team: 'Adelaide Crows'},
		{id: 'CD_I993946', name: 'Ben Keays', pos: 'MIDFIELDER', rat: 144.3, team: 'Adelaide Crows'},
		{id: 'CD_I997206', name: 'Andrew McPherson', pos: 'MEDIUM_DEFENDER', rat: 62.3, team: 'Adelaide Crows'},
		{id: 'CD_I997230', name: 'Tyson Stengle', pos: 'MEDIUM_FORWARD', rat: 93.1, team: 'Adelaide Crows'},
		{id: 'CD_I998106', name: 'Jordan Gallucci', pos: 'MEDIUM_FORWARD', rat: 109.6, team: 'Adelaide Crows'},
		{id: 'CD_I999331', name: 'Darcy Fogarty', pos: 'KEY_FORWARD', rat: 101.4, team: 'Adelaide Crows'}
	]);
var $author$project$Teams$brisbaneLionsPicks = _List_fromArray(
	[18, 19, 38, 64, 80, 90]);
var $author$project$Teams$brisbaneLionsPlayers = _List_fromArray(
	[
		{id: 'CD_I1000978', name: 'Hugh McCluggage', pos: 'MIDFIELDER', rat: 393.6, team: 'Brisbane Lions'},
		{id: 'CD_I1002235', name: 'Cam Rayner', pos: 'MEDIUM_FORWARD', rat: 212.1, team: 'Brisbane Lions'},
		{id: 'CD_I1002244', name: 'Toby Wooller', pos: 'MIDFIELDER_FORWARD', rat: 0.0, team: 'Brisbane Lions'},
		{id: 'CD_I1002312', name: 'Zac Bailey', pos: 'MIDFIELDER_FORWARD', rat: 235.4, team: 'Brisbane Lions'},
		{id: 'CD_I1002347', name: 'Jack Payne', pos: 'KEY_DEFENDER', rat: 27.1, team: 'Brisbane Lions'},
		{id: 'CD_I1002351', name: 'Connor Ballenden', pos: 'KEY_FORWARD', rat: 7.0, team: 'Brisbane Lions'},
		{id: 'CD_I1002401', name: 'Brandon Starcevich', pos: 'MEDIUM_DEFENDER', rat: 115.6, team: 'Brisbane Lions'},
		{id: 'CD_I1004863', name: 'Mitchell Hinge', pos: 'MIDFIELDER', rat: 31.0, team: 'Brisbane Lions'},
		{id: 'CD_I1005053', name: 'Noah Answerth', pos: 'MEDIUM_DEFENDER', rat: 182.5, team: 'Brisbane Lions'},
		{id: 'CD_I1005521', name: 'Oscar McInerney', pos: 'RUCK', rat: 284.3, team: 'Brisbane Lions'},
		{id: 'CD_I1006033', name: 'Ely Smith', pos: 'MIDFIELDER_FORWARD', rat: 0.0, team: 'Brisbane Lions'},
		{id: 'CD_I1006059', name: 'Keidean Coleman', pos: 'MEDIUM_FORWARD', rat: 21.0, team: 'Brisbane Lions'},
		{id: 'CD_I1006085', name: 'Connor McFadyen', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Brisbane Lions'},
		{id: 'CD_I1006100', name: 'Thomas Berry', pos: 'MEDIUM_FORWARD', rat: 27.1, team: 'Brisbane Lions'},
		{id: 'CD_I1006150', name: 'Tom Joyce', pos: 'MIDFIELDER', rat: 0.0, team: 'Brisbane Lions'},
		{id: 'CD_I1009242', name: 'Brock Smith', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Brisbane Lions'},
		{id: 'CD_I1009385', name: 'Deven Robertson', pos: 'MEDIUM_FORWARD', rat: 3.7, team: 'Brisbane Lions'},
		{id: 'CD_I1009386', name: 'Jaxon Prior', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Brisbane Lions'},
		{id: 'CD_I1013532', name: 'Tom Fullarton', pos: 'KEY_FORWARD', rat: 5.1, team: 'Brisbane Lions'},
		{id: 'CD_I1013978', name: 'James Madden', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Brisbane Lions'},
		{id: 'CD_I240302', name: 'Grant Birchall', pos: 'MEDIUM_DEFENDER', rat: 106.5, team: 'Brisbane Lions'},
		{id: 'CD_I261224', name: 'Dayne Zorko', pos: 'MIDFIELDER', rat: 441.9, team: 'Brisbane Lions'},
		{id: 'CD_I271072', name: 'Daniel Rich', pos: 'MEDIUM_DEFENDER', rat: 380.6, team: 'Brisbane Lions'},
		{id: 'CD_I280763', name: 'Stefan Martin', pos: 'RUCK', rat: 361.1, team: 'Brisbane Lions'},
		{id: 'CD_I280918', name: 'Allen Christensen', pos: 'MEDIUM_FORWARD', rat: 164.2, team: 'Brisbane Lions'},
		{id: 'CD_I290311', name: 'Mitch Robinson', pos: 'MIDFIELDER', rat: 364.2, team: 'Brisbane Lions'},
		{id: 'CD_I290326', name: 'Matt Eagles', pos: 'RUCK', rat: 0.9, team: 'Brisbane Lions'},
		{id: 'CD_I291548', name: 'Ryan Lester', pos: 'MEDIUM_DEFENDER', rat: 197.5, team: 'Brisbane Lions'},
		{id: 'CD_I293479', name: 'Cameron Ellis-Yolmen', pos: 'MIDFIELDER_FORWARD', rat: 216.4, team: 'Brisbane Lions'},
		{id: 'CD_I293535', name: 'Lachie Neale', pos: 'MIDFIELDER', rat: 543.8, team: 'Brisbane Lions'},
		{id: 'CD_I293581', name: 'Lincoln McCarthy', pos: 'MEDIUM_FORWARD', rat: 247.3, team: 'Brisbane Lions'},
		{id: 'CD_I293716', name: 'Jarryd Lyons', pos: 'MIDFIELDER', rat: 491.4, team: 'Brisbane Lions'},
		{id: 'CD_I294168', name: 'Marcus Adams', pos: 'KEY_DEFENDER', rat: 69.2, team: 'Brisbane Lions'},
		{id: 'CD_I296269', name: 'Darcy Gardiner', pos: 'KEY_DEFENDER', rat: 253.3, team: 'Brisbane Lions'},
		{id: 'CD_I297504', name: 'Daniel McStay', pos: 'KEY_FORWARD', rat: 244.6, team: 'Brisbane Lions'},
		{id: 'CD_I298437', name: 'Callum Ah Chee', pos: 'MEDIUM_DEFENDER', rat: 113.3, team: 'Brisbane Lions'},
		{id: 'CD_I990609', name: 'Charlie Cameron', pos: 'MEDIUM_FORWARD', rat: 335.7, team: 'Brisbane Lions'},
		{id: 'CD_I992752', name: 'Archie Smith', pos: 'RUCK', rat: 31.2, team: 'Brisbane Lions'},
		{id: 'CD_I993828', name: 'Rhys Mathieson', pos: 'MIDFIELDER_FORWARD', rat: 103.6, team: 'Brisbane Lions'},
		{id: 'CD_I993836', name: 'Sam Skinner', pos: 'KEY_FORWARD', rat: -5.7, team: 'Brisbane Lions'},
		{id: 'CD_I993953', name: 'Eric Hipwood', pos: 'KEY_FORWARD', rat: 231.8, team: 'Brisbane Lions'},
		{id: 'CD_I994047', name: 'Cedric Cox', pos: 'MEDIUM_FORWARD', rat: 6.2, team: 'Brisbane Lions'},
		{id: 'CD_I996059', name: 'Harris Andrews', pos: 'KEY_DEFENDER', rat: 414.0, team: 'Brisbane Lions'},
		{id: 'CD_I998105', name: 'Corey Lyons', pos: 'MIDFIELDER', rat: 0.0, team: 'Brisbane Lions'},
		{id: 'CD_I998128', name: 'Alex Witherden', pos: 'MEDIUM_DEFENDER', rat: 184.7, team: 'Brisbane Lions'},
		{id: 'CD_I998133', name: 'Jarrod Berry', pos: 'MIDFIELDER', rat: 336.4, team: 'Brisbane Lions'},
		{id: 'CD_I998268', name: 'Jacob Allison', pos: 'MIDFIELDER', rat: 9.9, team: 'Brisbane Lions'}
	]);
var $author$project$Teams$carltonBluesPicks = _List_fromArray(
	[7, 27, 45, 81]);
var $author$project$Teams$carltonBluesPlayers = _List_fromArray(
	[
		{id: 'CD_I1000953', name: 'Harry McKay', pos: 'KEY_FORWARD', rat: 223.2, team: 'Carlton Blues'},
		{id: 'CD_I1001028', name: 'Jack Silvagni', pos: 'MEDIUM_FORWARD', rat: 162.5, team: 'Carlton Blues'},
		{id: 'CD_I1001398', name: 'Matthew Kennedy', pos: 'MIDFIELDER_FORWARD', rat: 149.9, team: 'Carlton Blues'},
		{id: 'CD_I1002256', name: 'Paddy Dow', pos: 'MIDFIELDER_FORWARD', rat: 206.4, team: 'Carlton Blues'},
		{id: 'CD_I1002259', name: 'Lochie O\'Brien', pos: 'MIDFIELDER', rat: 100.0, team: 'Carlton Blues'},
		{id: 'CD_I1002938', name: 'Josh Honey', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Carlton Blues'},
		{id: 'CD_I1002942', name: 'Sam Ramsay', pos: 'MIDFIELDER', rat: 0.0, team: 'Carlton Blues'},
		{id: 'CD_I1004912', name: 'Tom De Koning', pos: 'RUCK', rat: 47.8, team: 'Carlton Blues'},
		{id: 'CD_I1006094', name: 'Sam Walsh', pos: 'MIDFIELDER', rat: 330.3, team: 'Carlton Blues'},
		{id: 'CD_I1008154', name: 'Matthew Cottrell', pos: 'MIDFIELDER', rat: 22.2, team: 'Carlton Blues'},
		{id: 'CD_I1008312', name: 'Liam Stocker', pos: 'MEDIUM_DEFENDER', rat: 15.7, team: 'Carlton Blues'},
		{id: 'CD_I1009241', name: 'Brodie Kemp', pos: 'MIDFIELDER', rat: 0.0, team: 'Carlton Blues'},
		{id: 'CD_I1011861', name: 'Fraser Phillips', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Carlton Blues'},
		{id: 'CD_I1011924', name: 'Finbar O\'Dwyer', pos: 'KEY_FORWARD', rat: 0.0, team: 'Carlton Blues'},
		{id: 'CD_I1011929', name: 'Sam Philp', pos: 'MEDIUM_FORWARD', rat: 12.6, team: 'Carlton Blues'},
		{id: 'CD_I1011949', name: 'Ben Silvagni', pos: 'KEY_DEFENDER', rat: 0.0, team: 'Carlton Blues'},
		{id: 'CD_I1013973', name: 'Matthew Owies', pos: 'MEDIUM_FORWARD', rat: 3.1, team: 'Carlton Blues'},
		{id: 'CD_I230202', name: 'Kade Simpson', pos: 'MEDIUM_DEFENDER', rat: 269.8, team: 'Carlton Blues'},
		{id: 'CD_I240060', name: 'Eddie Betts', pos: 'MEDIUM_FORWARD', rat: 300.4, team: 'Carlton Blues'},
		{id: 'CD_I250105', name: 'Marc Murphy', pos: 'MIDFIELDER', rat: 323.5, team: 'Carlton Blues'},
		{id: 'CD_I261299', name: 'Matthew Kreuzer', pos: 'RUCK', rat: 198.5, team: 'Carlton Blues'},
		{id: 'CD_I270146', name: 'Ed Curnow', pos: 'MIDFIELDER', rat: 383.5, team: 'Carlton Blues'},
		{id: 'CD_I281078', name: 'Liam Jones', pos: 'KEY_DEFENDER', rat: 276.7, team: 'Carlton Blues'},
		{id: 'CD_I281124', name: 'Levi Casboult', pos: 'KEY_FORWARD', rat: 252.2, team: 'Carlton Blues'},
		{id: 'CD_I291773', name: 'Jack Newnes', pos: 'MIDFIELDER', rat: 261.3, team: 'Carlton Blues'},
		{id: 'CD_I294624', name: 'Lachie Plowman', pos: 'MEDIUM_DEFENDER', rat: 259.0, team: 'Carlton Blues'},
		{id: 'CD_I295518', name: 'Sam Docherty', pos: 'MEDIUM_DEFENDER', rat: 121.1, team: 'Carlton Blues'},
		{id: 'CD_I296190', name: 'Jack Martin', pos: 'MEDIUM_FORWARD', rat: 221.3, team: 'Carlton Blues'},
		{id: 'CD_I296200', name: 'Michael Gibbons', pos: 'MEDIUM_FORWARD', rat: 239.9, team: 'Carlton Blues'},
		{id: 'CD_I296439', name: 'Darcy Lang', pos: 'MEDIUM_FORWARD', rat: 68.8, team: 'Carlton Blues'},
		{id: 'CD_I297255', name: 'Mitch McGovern', pos: 'KEY_FORWARD', rat: 206.7, team: 'Carlton Blues'},
		{id: 'CD_I297907', name: 'Nic Newman', pos: 'MEDIUM_DEFENDER', rat: 238.6, team: 'Carlton Blues'},
		{id: 'CD_I298290', name: 'Marc Pittonet', pos: 'RUCK', rat: 151.0, team: 'Carlton Blues'},
		{id: 'CD_I298302', name: 'Caleb Marchbank', pos: 'MEDIUM_DEFENDER', rat: 119.2, team: 'Carlton Blues'},
		{id: 'CD_I298316', name: 'Hugh Goddard', pos: 'KEY_DEFENDER', rat: 8.8, team: 'Carlton Blues'},
		{id: 'CD_I990704', name: 'Patrick Cripps', pos: 'MIDFIELDER', rat: 490.0, team: 'Carlton Blues'},
		{id: 'CD_I993795', name: 'David Cuningham', pos: 'MEDIUM_FORWARD', rat: 144.4, team: 'Carlton Blues'},
		{id: 'CD_I993832', name: 'Jacob Weitering', pos: 'KEY_DEFENDER', rat: 312.6, team: 'Carlton Blues'},
		{id: 'CD_I994539', name: 'Sam Petrevski-Seton', pos: 'MEDIUM_DEFENDER', rat: 308.1, team: 'Carlton Blues'},
		{id: 'CD_I996731', name: 'Charlie Curnow', pos: 'KEY_FORWARD', rat: 149.0, team: 'Carlton Blues'},
		{id: 'CD_I998100', name: 'Cameron Polson', pos: 'MEDIUM_DEFENDER', rat: 52.7, team: 'Carlton Blues'},
		{id: 'CD_I998167', name: 'Tom Williamson', pos: 'MEDIUM_DEFENDER', rat: 68.8, team: 'Carlton Blues'},
		{id: 'CD_I998215', name: 'Will Setterfield', pos: 'MIDFIELDER', rat: 212.1, team: 'Carlton Blues'},
		{id: 'CD_I998226', name: 'Harrison Macreadie', pos: 'KEY_DEFENDER', rat: 2.5, team: 'Carlton Blues'},
		{id: 'CD_I998569', name: 'Callum Moore', pos: 'KEY_FORWARD', rat: 1.7, team: 'Carlton Blues'},
		{id: 'CD_I999827', name: 'Zac Fisher', pos: 'MEDIUM_FORWARD', rat: 268.2, team: 'Carlton Blues'}
	]);
var $author$project$Teams$collingwoodMagpiesPicks = _List_fromArray(
	[12, 34, 37, 68, 84]);
var $author$project$Teams$collingwoodMagpiesPlayers = _List_fromArray(
	[
		{id: 'CD_I1000072', name: 'John Noble', pos: 'MEDIUM_DEFENDER', rat: 92.1, team: 'Collingwood Magpies'},
		{id: 'CD_I1000960', name: 'Max Lynch', pos: 'KEY_FORWARD', rat: 2.2, team: 'Collingwood Magpies'},
		{id: 'CD_I1001448', name: 'Rupert Wills', pos: 'MIDFIELDER', rat: 112.2, team: 'Collingwood Magpies'},
		{id: 'CD_I1002240', name: 'Jaidyn Stephenson', pos: 'MEDIUM_FORWARD', rat: 281.1, team: 'Collingwood Magpies'},
		{id: 'CD_I1002770', name: 'Callum L. Brown', pos: 'MEDIUM_FORWARD', rat: 297.2, team: 'Collingwood Magpies'},
		{id: 'CD_I1003029', name: 'Brayden Sier', pos: 'MIDFIELDER', rat: 155.5, team: 'Collingwood Magpies'},
		{id: 'CD_I1005013', name: 'Flynn Appleby', pos: 'MEDIUM_FORWARD', rat: 1.7, team: 'Collingwood Magpies'},
		{id: 'CD_I1005054', name: 'Josh Daicos', pos: 'MIDFIELDER', rat: 177.0, team: 'Collingwood Magpies'},
		{id: 'CD_I1005107', name: 'Nathan Murphy', pos: 'MEDIUM_DEFENDER', rat: 10.2, team: 'Collingwood Magpies'},
		{id: 'CD_I1008089', name: 'Isaac Quaynor', pos: 'MEDIUM_DEFENDER', rat: 94.5, team: 'Collingwood Magpies'},
		{id: 'CD_I1008171', name: 'Tyler Brown', pos: 'MIDFIELDER', rat: 63.8, team: 'Collingwood Magpies'},
		{id: 'CD_I1008285', name: 'Will Kelly', pos: 'KEY_FORWARD', rat: 5.5, team: 'Collingwood Magpies'},
		{id: 'CD_I1008288', name: 'Atu Bosenavulagi', pos: 'MEDIUM_FORWARD', rat: 9.1, team: 'Collingwood Magpies'},
		{id: 'CD_I1009186', name: 'Trent Bianco', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Collingwood Magpies'},
		{id: 'CD_I1009383', name: 'Trey Ruscoe', pos: 'MEDIUM_FORWARD', rat: 19.8, team: 'Collingwood Magpies'},
		{id: 'CD_I1010841', name: 'Jack Madgen', pos: 'KEY_DEFENDER', rat: 139.4, team: 'Collingwood Magpies'},
		{id: 'CD_I1013974', name: 'Mark Keane', pos: 'KEY_DEFENDER', rat: 1.7, team: 'Collingwood Magpies'},
		{id: 'CD_I1013975', name: 'Anton Tohill', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Collingwood Magpies'},
		{id: 'CD_I1015793', name: 'Jay Rantall', pos: 'MIDFIELDER', rat: 0.0, team: 'Collingwood Magpies'},
		{id: 'CD_I240232', name: 'Ben Reid', pos: 'KEY_FORWARD', rat: 79.5, team: 'Collingwood Magpies'},
		{id: 'CD_I250290', name: 'Travis Varcoe', pos: 'MEDIUM_DEFENDER', rat: 257.3, team: 'Collingwood Magpies'},
		{id: 'CD_I250548', name: 'Lynden Dunn', pos: 'KEY_DEFENDER', rat: 7.5, team: 'Collingwood Magpies'},
		{id: 'CD_I260257', name: 'Scott Pendlebury', pos: 'MIDFIELDER', rat: 487.7, team: 'Collingwood Magpies'},
		{id: 'CD_I270861', name: 'Levi Greenwood', pos: 'MIDFIELDER', rat: 157.2, team: 'Collingwood Magpies'},
		{id: 'CD_I271001', name: 'Dayne Beams', pos: 'MIDFIELDER', rat: 140.6, team: 'Collingwood Magpies'},
		{id: 'CD_I280012', name: 'Jordan Roughead', pos: 'KEY_DEFENDER', rat: 230.9, team: 'Collingwood Magpies'},
		{id: 'CD_I280416', name: 'Chris Mayne', pos: 'MIDFIELDER', rat: 269.3, team: 'Collingwood Magpies'},
		{id: 'CD_I280965', name: 'Steele Sidebottom', pos: 'MIDFIELDER_FORWARD', rat: 406.3, team: 'Collingwood Magpies'},
		{id: 'CD_I290289', name: 'Josh Thomas', pos: 'MEDIUM_FORWARD', rat: 269.3, team: 'Collingwood Magpies'},
		{id: 'CD_I291313', name: 'Jeremy Howe', pos: 'MEDIUM_DEFENDER', rat: 308.7, team: 'Collingwood Magpies'},
		{id: 'CD_I291720', name: 'Will Hoskin-Elliott', pos: 'MEDIUM_FORWARD', rat: 253.0, team: 'Collingwood Magpies'},
		{id: 'CD_I291776', name: 'Taylor Adams', pos: 'MIDFIELDER', rat: 453.6, team: 'Collingwood Magpies'},
		{id: 'CD_I291790', name: 'Adam Treloar', pos: 'MIDFIELDER', rat: 455.2, team: 'Collingwood Magpies'},
		{id: 'CD_I291849', name: 'Brody Mihocek', pos: 'KEY_FORWARD', rat: 314.4, team: 'Collingwood Magpies'},
		{id: 'CD_I293035', name: 'Tim Broomhead', pos: 'MEDIUM_FORWARD', rat: 4.0, team: 'Collingwood Magpies'},
		{id: 'CD_I293801', name: 'Jamie Elliott', pos: 'MIDFIELDER_FORWARD', rat: 234.8, team: 'Collingwood Magpies'},
		{id: 'CD_I293871', name: 'Jack Crisp', pos: 'MEDIUM_DEFENDER', rat: 375.9, team: 'Collingwood Magpies'},
		{id: 'CD_I293957', name: 'Brodie Grundy', pos: 'RUCK', rat: 521.5, team: 'Collingwood Magpies'},
		{id: 'CD_I295012', name: 'Matthew Scharenberg', pos: 'MEDIUM_DEFENDER', rat: 58.2, team: 'Collingwood Magpies'},
		{id: 'CD_I295444', name: 'Tom Langdon', pos: 'MEDIUM_DEFENDER', rat: 171.5, team: 'Collingwood Magpies'},
		{id: 'CD_I298288', name: 'Darcy Moore', pos: 'KEY_DEFENDER', rat: 325.2, team: 'Collingwood Magpies'},
		{id: 'CD_I990291', name: 'Darcy Cameron', pos: 'KEY_FORWARD', rat: 49.0, team: 'Collingwood Magpies'},
		{id: 'CD_I992010', name: 'Brayden Maynard', pos: 'MEDIUM_DEFENDER', rat: 326.1, team: 'Collingwood Magpies'},
		{id: 'CD_I993797', name: 'Tom Wilson', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Collingwood Magpies'},
		{id: 'CD_I994185', name: 'Jordan De Goey', pos: 'MEDIUM_FORWARD', rat: 342.3, team: 'Collingwood Magpies'},
		{id: 'CD_I996487', name: 'Tom Phillips', pos: 'MIDFIELDER_FORWARD', rat: 280.7, team: 'Collingwood Magpies'},
		{id: 'CD_I998647', name: 'Mason Cox', pos: 'KEY_FORWARD', rat: 265.3, team: 'Collingwood Magpies'}
	]);
var $author$project$Teams$essendonBombersPicks = _List_fromArray(
	[6, 41, 61, 69, 70, 79]);
var $author$project$Teams$essendonBombersPlayers = _List_fromArray(
	[
		{id: 'CD_I1001026', name: 'Jordan Ridley', pos: 'MEDIUM_DEFENDER', rat: 117.5, team: 'Essendon Bombers'},
		{id: 'CD_I1004034', name: 'Brandon Zerk-Thatcher', pos: 'KEY_DEFENDER', rat: 22.5, team: 'Essendon Bombers'},
		{id: 'CD_I1005577', name: 'Sam Draper', pos: 'RUCK', rat: 14.3, team: 'Essendon Bombers'},
		{id: 'CD_I1005721', name: 'Josh Begley', pos: 'MEDIUM_FORWARD', rat: 45.4, team: 'Essendon Bombers'},
		{id: 'CD_I1006097', name: 'Irving Mosquito', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Essendon Bombers'},
		{id: 'CD_I1006506', name: 'Lachlan Johnson', pos: 'MIDFIELDER_FORWARD', rat: 0.0, team: 'Essendon Bombers'},
		{id: 'CD_I1008190', name: 'Brayden Ham', pos: 'MIDFIELDER', rat: 66.9, team: 'Essendon Bombers'},
		{id: 'CD_I1009223', name: 'Ned Cahill', pos: 'MEDIUM_FORWARD', rat: 12.8, team: 'Essendon Bombers'},
		{id: 'CD_I1011755', name: 'Harrison Jones', pos: 'KEY_FORWARD', rat: 0.0, team: 'Essendon Bombers'},
		{id: 'CD_I1011864', name: 'Noah Gown', pos: 'KEY_FORWARD', rat: 0.0, team: 'Essendon Bombers'},
		{id: 'CD_I1011954', name: 'Nick Bryan', pos: 'RUCK', rat: 0.0, team: 'Essendon Bombers'},
		{id: 'CD_I1016097', name: 'Henry Crauford', pos: 'RUCK', rat: 0.0, team: 'Essendon Bombers'},
		{id: 'CD_I1018969', name: 'Cian McBride', pos: 'KEY_FORWARD', rat: 0.0, team: 'Essendon Bombers'},
		{id: 'CD_I1019156', name: 'Ross McQuillan', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Essendon Bombers'},
		{id: 'CD_I1020224', name: 'Tom Hird', pos: 'MIDFIELDER', rat: 0.0, team: 'Essendon Bombers'},
		{id: 'CD_I261320', name: 'Tom Bellchambers', pos: 'RUCK', rat: 349.9, team: 'Essendon Bombers'},
		{id: 'CD_I270588', name: 'Cale Hooker', pos: 'KEY_DEFENDER', rat: 305.2, team: 'Essendon Bombers'},
		{id: 'CD_I270935', name: 'Michael Hurley', pos: 'KEY_DEFENDER', rat: 229.1, team: 'Essendon Bombers'},
		{id: 'CD_I270951', name: 'David Zaharakis', pos: 'MEDIUM_FORWARD', rat: 276.2, team: 'Essendon Bombers'},
		{id: 'CD_I280038', name: 'Shaun McKernan', pos: 'KEY_FORWARD', rat: 197.6, team: 'Essendon Bombers'},
		{id: 'CD_I290629', name: 'Dyson Heppell', pos: 'MIDFIELDER', rat: 364.8, team: 'Essendon Bombers'},
		{id: 'CD_I291771', name: 'Devon Smith', pos: 'MIDFIELDER_FORWARD', rat: 266.3, team: 'Essendon Bombers'},
		{id: 'CD_I291783', name: 'Dylan Shiel', pos: 'MIDFIELDER', rat: 476.8, team: 'Essendon Bombers'},
		{id: 'CD_I291891', name: 'Jacob Townsend', pos: 'MEDIUM_FORWARD', rat: 54.7, team: 'Essendon Bombers'},
		{id: 'CD_I293884', name: 'Jake Stringer', pos: 'MEDIUM_FORWARD', rat: 365.3, team: 'Essendon Bombers'},
		{id: 'CD_I294068', name: 'Andrew Phillips', pos: 'RUCK', rat: 94.4, team: 'Essendon Bombers'},
		{id: 'CD_I294092', name: 'Anthony McDonald-Tipungwuti', pos: 'MEDIUM_FORWARD', rat: 389.6, team: 'Essendon Bombers'},
		{id: 'CD_I294518', name: 'Joe Daniher', pos: 'KEY_FORWARD', rat: 32.5, team: 'Essendon Bombers'},
		{id: 'CD_I294654', name: 'James Stewart', pos: 'KEY_FORWARD', rat: 4.9, team: 'Essendon Bombers'},
		{id: 'CD_I295461', name: 'Adam Saad', pos: 'MEDIUM_DEFENDER', rat: 381.6, team: 'Essendon Bombers'},
		{id: 'CD_I295599', name: 'Patrick Ambrose', pos: 'KEY_DEFENDER', rat: 114.8, team: 'Essendon Bombers'},
		{id: 'CD_I296334', name: 'Orazio Fantasia', pos: 'MEDIUM_DEFENDER', rat: 265.0, team: 'Essendon Bombers'},
		{id: 'CD_I297406', name: 'Tom Cutler', pos: 'MIDFIELDER', rat: 144.8, team: 'Essendon Bombers'},
		{id: 'CD_I297438', name: 'Martin Gleeson', pos: 'MEDIUM_DEFENDER', rat: 108.2, team: 'Essendon Bombers'},
		{id: 'CD_I298280', name: 'Jayden Laverde', pos: 'KEY_FORWARD', rat: 110.8, team: 'Essendon Bombers'},
		{id: 'CD_I298407', name: 'Mitchell Hibberd', pos: 'MIDFIELDER', rat: 13.1, team: 'Essendon Bombers'},
		{id: 'CD_I298630', name: 'Kyle Langford', pos: 'MIDFIELDER_FORWARD', rat: 368.7, team: 'Essendon Bombers'},
		{id: 'CD_I990606', name: 'Will Snelling', pos: 'MEDIUM_FORWARD', rat: 114.3, team: 'Essendon Bombers'},
		{id: 'CD_I990816', name: 'Aaron Francis', pos: 'KEY_DEFENDER', rat: 255.5, team: 'Essendon Bombers'},
		{id: 'CD_I992016', name: 'Zach Merrett', pos: 'MIDFIELDER', rat: 489.7, team: 'Essendon Bombers'},
		{id: 'CD_I993817', name: 'Darcy Parish', pos: 'MIDFIELDER', rat: 356.1, team: 'Essendon Bombers'},
		{id: 'CD_I996232', name: 'Matt Guelfi', pos: 'MEDIUM_DEFENDER', rat: 190.6, team: 'Essendon Bombers'},
		{id: 'CD_I997078', name: 'Mason Redman', pos: 'MEDIUM_DEFENDER', rat: 218.3, team: 'Essendon Bombers'},
		{id: 'CD_I997846', name: 'Conor McKenna', pos: 'MEDIUM_DEFENDER', rat: 374.6, team: 'Essendon Bombers'},
		{id: 'CD_I998102', name: 'Andrew McGrath', pos: 'MIDFIELDER', rat: 347.0, team: 'Essendon Bombers'},
		{id: 'CD_I998109', name: 'Dylan Clarke', pos: 'MIDFIELDER_FORWARD', rat: 76.7, team: 'Essendon Bombers'},
		{id: 'CD_I998212', name: 'Kobe Mutch', pos: 'MEDIUM_DEFENDER', rat: 0.1, team: 'Essendon Bombers'}
	]);
var $author$project$Teams$fremantleDockersPicks = _List_fromArray(
	[10, 28]);
var $author$project$Teams$fremantleDockersPlayers = _List_fromArray(
	[
		{id: 'CD_I1000860', name: 'Lachie Schultz', pos: 'MEDIUM_FORWARD', rat: 104.7, team: 'Fremantle Dockers'},
		{id: 'CD_I1000980', name: 'Lloyd Meek', pos: 'RUCK', rat: 0.0, team: 'Fremantle Dockers'},
		{id: 'CD_I1002232', name: 'Andrew Brayshaw', pos: 'MIDFIELDER', rat: 315.7, team: 'Fremantle Dockers'},
		{id: 'CD_I1002239', name: 'Adam Cerra', pos: 'MIDFIELDER', rat: 272.1, team: 'Fremantle Dockers'},
		{id: 'CD_I1002353', name: 'Mitch Crowden', pos: 'MEDIUM_FORWARD', rat: 110.8, team: 'Fremantle Dockers'},
		{id: 'CD_I1002354', name: 'Stefan Giro', pos: 'MIDFIELDER', rat: 5.9, team: 'Fremantle Dockers'},
		{id: 'CD_I1002372', name: 'Hugh Dixon', pos: 'KEY_FORWARD', rat: 11.2, team: 'Fremantle Dockers'},
		{id: 'CD_I1003132', name: 'Tom North', pos: 'MIDFIELDER', rat: 0.0, team: 'Fremantle Dockers'},
		{id: 'CD_I1004437', name: 'Tobe Watson', pos: 'MEDIUM_DEFENDER', rat: 18.8, team: 'Fremantle Dockers'},
		{id: 'CD_I1004850', name: 'Luke Valente', pos: 'MIDFIELDER', rat: 0.0, team: 'Fremantle Dockers'},
		{id: 'CD_I1005831', name: 'Dillon O\'Reilly', pos: 'KEY_DEFENDER', rat: 0.0, team: 'Fremantle Dockers'},
		{id: 'CD_I1005988', name: 'Liam Henry', pos: 'MEDIUM_FORWARD', rat: 5.6, team: 'Fremantle Dockers'},
		{id: 'CD_I1006151', name: 'Jason Carter', pos: 'MEDIUM_DEFENDER', rat: 3.8, team: 'Fremantle Dockers'},
		{id: 'CD_I1007854', name: 'Jarvis Pina', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Fremantle Dockers'},
		{id: 'CD_I1009256', name: 'Hayden Young', pos: 'MEDIUM_DEFENDER', rat: 18.3, team: 'Fremantle Dockers'},
		{id: 'CD_I1009381', name: 'Leno Thomas', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Fremantle Dockers'},
		{id: 'CD_I1009420', name: 'Caleb Serong', pos: 'MIDFIELDER', rat: 112.5, team: 'Fremantle Dockers'},
		{id: 'CD_I1013611', name: 'Sam Sturt', pos: 'MEDIUM_FORWARD', rat: 24.2, team: 'Fremantle Dockers'},
		{id: 'CD_I1017984', name: 'Isaiah Butters', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Fremantle Dockers'},
		{id: 'CD_I240052', name: 'David Mundy', pos: 'MIDFIELDER', rat: 400.2, team: 'Fremantle Dockers'},
		{id: 'CD_I280336', name: 'Stephen Hill', pos: 'MEDIUM_DEFENDER', rat: 95.1, team: 'Fremantle Dockers'},
		{id: 'CD_I280988', name: 'Travis Colyer', pos: 'MEDIUM_FORWARD', rat: 162.3, team: 'Fremantle Dockers'},
		{id: 'CD_I281007', name: 'Michael Walters', pos: 'MIDFIELDER_FORWARD', rat: 453.1, team: 'Fremantle Dockers'},
		{id: 'CD_I290817', name: 'Brandon Matera', pos: 'MEDIUM_FORWARD', rat: 231.2, team: 'Fremantle Dockers'},
		{id: 'CD_I290823', name: 'Reece Conca', pos: 'MEDIUM_DEFENDER', rat: 194.6, team: 'Fremantle Dockers'},
		{id: 'CD_I291570', name: 'Nat Fyfe', pos: 'MIDFIELDER', rat: 581.0, team: 'Fremantle Dockers'},
		{id: 'CD_I293854', name: 'Matt Taberner', pos: 'KEY_FORWARD', rat: 205.6, team: 'Fremantle Dockers'},
		{id: 'CD_I294125', name: 'Nathan Wilson', pos: 'MEDIUM_DEFENDER', rat: 226.5, team: 'Fremantle Dockers'},
		{id: 'CD_I295067', name: 'James Aish', pos: 'MIDFIELDER', rat: 237.7, team: 'Fremantle Dockers'},
		{id: 'CD_I295222', name: 'Joel Hamling', pos: 'KEY_DEFENDER', rat: 217.0, team: 'Fremantle Dockers'},
		{id: 'CD_I296294', name: 'Blake Acres', pos: 'MIDFIELDER', rat: 251.3, team: 'Fremantle Dockers'},
		{id: 'CD_I296324', name: 'Jesse Hogan', pos: 'KEY_FORWARD', rat: 89.6, team: 'Fremantle Dockers'},
		{id: 'CD_I296371', name: 'Brett Bewley', pos: 'MIDFIELDER', rat: 121.5, team: 'Fremantle Dockers'},
		{id: 'CD_I298409', name: 'Alex Pearce', pos: 'KEY_DEFENDER', rat: 111.9, team: 'Fremantle Dockers'},
		{id: 'CD_I298450', name: 'Connor Blakely', pos: 'MIDFIELDER', rat: 112.4, team: 'Fremantle Dockers'},
		{id: 'CD_I990740', name: 'Rory Lobb', pos: 'RUCK', rat: 363.0, team: 'Fremantle Dockers'},
		{id: 'CD_I992059', name: 'Sam Switkowski', pos: 'MEDIUM_FORWARD', rat: 174.3, team: 'Fremantle Dockers'},
		{id: 'CD_I993816', name: 'Darcy Tucker', pos: 'MIDFIELDER', rat: 256.7, team: 'Fremantle Dockers'},
		{id: 'CD_I995192', name: 'Cam McCarthy', pos: 'MIDFIELDER', rat: 123.4, team: 'Fremantle Dockers'},
		{id: 'CD_I996580', name: 'Ethan Hughes', pos: 'MEDIUM_DEFENDER', rat: 236.6, team: 'Fremantle Dockers'},
		{id: 'CD_I997033', name: 'Brennan Cox', pos: 'KEY_DEFENDER', rat: 203.8, team: 'Fremantle Dockers'},
		{id: 'CD_I997933', name: 'Griffin Logue', pos: 'KEY_DEFENDER', rat: 124.3, team: 'Fremantle Dockers'},
		{id: 'CD_I998115', name: 'Taylin Duman', pos: 'MEDIUM_DEFENDER', rat: 204.1, team: 'Fremantle Dockers'},
		{id: 'CD_I998145', name: 'Sean Darcy', pos: 'RUCK', rat: 266.3, team: 'Fremantle Dockers'},
		{id: 'CD_I998180', name: 'Bailey Banfield', pos: 'MEDIUM_FORWARD', rat: 108.4, team: 'Fremantle Dockers'},
		{id: 'CD_I998659', name: 'Luke Ryan', pos: 'KEY_DEFENDER', rat: 340.2, team: 'Fremantle Dockers'},
		{id: 'CD_I999321', name: 'Michael Frederick', pos: 'MEDIUM_FORWARD', rat: 27.0, team: 'Fremantle Dockers'}
	]);
var $author$project$Teams$geelongCatsPicks = _List_fromArray(
	[11, 15, 16, 33, 88]);
var $author$project$Teams$geelongCatsPlayers = _List_fromArray(
	[
		{id: 'CD_I1000937', name: 'Jack Henry', pos: 'MEDIUM_DEFENDER', rat: 236.3, team: 'Geelong Cats'},
		{id: 'CD_I1002220', name: 'Esava Ratugolea', pos: 'KEY_FORWARD', rat: 200.1, team: 'Geelong Cats'},
		{id: 'CD_I1002228', name: 'Lachie Fogarty', pos: 'MEDIUM_FORWARD', rat: 48.5, team: 'Geelong Cats'},
		{id: 'CD_I1002242', name: 'Charlie Constable', pos: 'MIDFIELDER', rat: 61.1, team: 'Geelong Cats'},
		{id: 'CD_I1004681', name: 'Jacob Kennerley', pos: 'MIDFIELDER', rat: 0.0, team: 'Geelong Cats'},
		{id: 'CD_I1004870', name: 'Zach Guthrie', pos: 'MEDIUM_DEFENDER', rat: 21.6, team: 'Geelong Cats'},
		{id: 'CD_I1004938', name: 'Gryan Miers', pos: 'MEDIUM_FORWARD', rat: 257.9, team: 'Geelong Cats'},
		{id: 'CD_I1004940', name: 'Sam Simpson', pos: 'MEDIUM_FORWARD', rat: 68.3, team: 'Geelong Cats'},
		{id: 'CD_I1004948', name: 'Cooper Stephens', pos: 'MIDFIELDER', rat: 0.0, team: 'Geelong Cats'},
		{id: 'CD_I1006101', name: 'Oscar Brownless', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Geelong Cats'},
		{id: 'CD_I1006152', name: 'Jordan Clark', pos: 'MEDIUM_DEFENDER', rat: 137.5, team: 'Geelong Cats'},
		{id: 'CD_I1007102', name: 'Mark O\'Connor', pos: 'MEDIUM_DEFENDER', rat: 239.0, team: 'Geelong Cats'},
		{id: 'CD_I1008202', name: 'Blake Schlensog', pos: 'KEY_FORWARD', rat: 0.0, team: 'Geelong Cats'},
		{id: 'CD_I1008603', name: 'Cameron Taheny', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Geelong Cats'},
		{id: 'CD_I1008940', name: 'Ben Jarvis', pos: 'MEDIUM_FORWARD', rat: 1.2, team: 'Geelong Cats'},
		{id: 'CD_I1009229', name: 'Sam De Koning', pos: 'KEY_DEFENDER', rat: 0.0, team: 'Geelong Cats'},
		{id: 'CD_I1013977', name: 'Stefan Okunbor', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Geelong Cats'},
		{id: 'CD_I1017255', name: 'Francis Evans', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Geelong Cats'},
		{id: 'CD_I220001', name: 'Gary Ablett', pos: 'MEDIUM_FORWARD', rat: 443.4, team: 'Geelong Cats'},
		{id: 'CD_I250321', name: 'Joel Selwood', pos: 'MIDFIELDER', rat: 381.2, team: 'Geelong Cats'},
		{id: 'CD_I261497', name: 'Harry Taylor', pos: 'KEY_DEFENDER', rat: 268.8, team: 'Geelong Cats'},
		{id: 'CD_I261510', name: 'Tom Hawkins', pos: 'KEY_FORWARD', rat: 383.7, team: 'Geelong Cats'},
		{id: 'CD_I270326', name: 'Lachie Henderson', pos: 'KEY_DEFENDER', rat: 143.0, team: 'Geelong Cats'},
		{id: 'CD_I270912', name: 'Jack Steven', pos: 'MIDFIELDER_FORWARD', rat: 155.6, team: 'Geelong Cats'},
		{id: 'CD_I270917', name: 'Patrick Dangerfield', pos: 'MIDFIELDER', rat: 532.0, team: 'Geelong Cats'},
		{id: 'CD_I280317', name: 'Rhys Stanley', pos: 'RUCK', rat: 340.9, team: 'Geelong Cats'},
		{id: 'CD_I281065', name: 'Mitch Duncan', pos: 'MIDFIELDER', rat: 345.0, team: 'Geelong Cats'},
		{id: 'CD_I290550', name: 'Cameron Guthrie', pos: 'MIDFIELDER', rat: 324.1, team: 'Geelong Cats'},
		{id: 'CD_I291357', name: 'Gary Rohan', pos: 'MEDIUM_FORWARD', rat: 278.6, team: 'Geelong Cats'},
		{id: 'CD_I291526', name: 'Luke Dahlhaus', pos: 'MEDIUM_FORWARD', rat: 282.4, team: 'Geelong Cats'},
		{id: 'CD_I291800', name: 'Tom Stewart', pos: 'MEDIUM_DEFENDER', rat: 251.7, team: 'Geelong Cats'},
		{id: 'CD_I292511', name: 'Zach Tuohy', pos: 'MIDFIELDER', rat: 263.8, team: 'Geelong Cats'},
		{id: 'CD_I293883', name: 'Jed Bews', pos: 'MEDIUM_DEFENDER', rat: 233.3, team: 'Geelong Cats'},
		{id: 'CD_I294199', name: 'Sam Menegola', pos: 'MIDFIELDER', rat: 337.7, team: 'Geelong Cats'},
		{id: 'CD_I294828', name: 'Josh Jenkins', pos: 'RUCK', rat: 126.7, team: 'Geelong Cats'},
		{id: 'CD_I296291', name: 'Jake Kolodjashnij', pos: 'MEDIUM_DEFENDER', rat: 169.7, team: 'Geelong Cats'},
		{id: 'CD_I296733', name: 'Mark Blicavs', pos: 'KEY_DEFENDER', rat: 369.6, team: 'Geelong Cats'},
		{id: 'CD_I298211', name: 'Darcy Fort', pos: 'RUCK', rat: 80.8, team: 'Geelong Cats'},
		{id: 'CD_I298336', name: 'Nakia Cockatoo', pos: 'MIDFIELDER_FORWARD', rat: 0.0, team: 'Geelong Cats'},
		{id: 'CD_I298419', name: 'Brandan Parfitt', pos: 'MIDFIELDER', rat: 303.1, team: 'Geelong Cats'},
		{id: 'CD_I993798', name: 'James Parsons', pos: 'MIDFIELDER', rat: 43.3, team: 'Geelong Cats'},
		{id: 'CD_I994386', name: 'Tom Atkins', pos: 'MEDIUM_FORWARD', rat: 270.2, team: 'Geelong Cats'},
		{id: 'CD_I997254', name: 'Nathan Kreuger', pos: 'KEY_FORWARD', rat: 0.0, team: 'Geelong Cats'},
		{id: 'CD_I999326', name: 'Brad Close', pos: 'MEDIUM_FORWARD', rat: 40.8, team: 'Geelong Cats'},
		{id: 'CD_I999382', name: 'Jake Tarca', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Geelong Cats'},
		{id: 'CD_I999824', name: 'Quinton Narkle', pos: 'MIDFIELDER', rat: 85.9, team: 'Geelong Cats'}
	]);
var $author$project$Teams$goldCoastSunsPicks = _List_fromArray(
	[5, 24, 35, 72, 78]);
var $author$project$Teams$goldCoastSunsPlayers = _List_fromArray(
	[
		{id: 'CD_I1000044', name: 'Jez McLennan', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Gold Coast Suns'},
		{id: 'CD_I1000068', name: 'Chris Burgess', pos: 'KEY_DEFENDER', rat: 94.0, team: 'Gold Coast Suns'},
		{id: 'CD_I1001195', name: 'Izak Rankine', pos: 'MEDIUM_FORWARD', rat: 105.4, team: 'Gold Coast Suns'},
		{id: 'CD_I1002328', name: 'Jacob Heron', pos: 'MEDIUM_FORWARD', rat: 38.3, team: 'Gold Coast Suns'},
		{id: 'CD_I1002331', name: 'Jacob Dawson', pos: 'MEDIUM_DEFENDER', rat: 33.8, team: 'Gold Coast Suns'},
		{id: 'CD_I1004095', name: 'Jack Lukosius', pos: 'MEDIUM_DEFENDER', rat: 243.3, team: 'Gold Coast Suns'},
		{id: 'CD_I1005547', name: 'Josh Corbett', pos: 'MEDIUM_FORWARD', rat: 57.3, team: 'Gold Coast Suns'},
		{id: 'CD_I1005986', name: 'Malcolm Rosas', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Gold Coast Suns'},
		{id: 'CD_I1006087', name: 'Caleb Graham', pos: 'KEY_DEFENDER', rat: 57.5, team: 'Gold Coast Suns'},
		{id: 'CD_I1006108', name: 'Mitch Riordan', pos: 'MIDFIELDER', rat: 0.0, team: 'Gold Coast Suns'},
		{id: 'CD_I1006110', name: 'Sam Fletcher', pos: 'MIDFIELDER', rat: 0.0, team: 'Gold Coast Suns'},
		{id: 'CD_I1006144', name: 'Ben King', pos: 'KEY_FORWARD', rat: 157.9, team: 'Gold Coast Suns'},
		{id: 'CD_I1007881', name: 'Wil Powell', pos: 'MEDIUM_DEFENDER', rat: 196.3, team: 'Gold Coast Suns'},
		{id: 'CD_I1008454', name: 'Connor Budarick', pos: 'MEDIUM_DEFENDER', rat: 68.3, team: 'Gold Coast Suns'},
		{id: 'CD_I1008882', name: 'Charlie Ballard', pos: 'KEY_DEFENDER', rat: 228.6, team: 'Gold Coast Suns'},
		{id: 'CD_I1009199', name: 'Noah Anderson', pos: 'MIDFIELDER', rat: 141.8, team: 'Gold Coast Suns'},
		{id: 'CD_I1009208', name: 'Matt Rowell', pos: 'MIDFIELDER', rat: 69.9, team: 'Gold Coast Suns'},
		{id: 'CD_I1009260', name: 'Sam Flanders', pos: 'MEDIUM_FORWARD', rat: 24.0, team: 'Gold Coast Suns'},
		{id: 'CD_I1009334', name: 'Matt Conroy', pos: 'RUCK', rat: 0.0, team: 'Gold Coast Suns'},
		{id: 'CD_I1009380', name: 'Jeremy Sharp', pos: 'MIDFIELDER', rat: 6.6, team: 'Gold Coast Suns'},
		{id: 'CD_I1016116', name: 'Patrick Murtagh', pos: 'KEY_FORWARD', rat: 0.0, team: 'Gold Coast Suns'},
		{id: 'CD_I1019157', name: 'Luke Towey', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Gold Coast Suns'},
		{id: 'CD_I240254', name: 'Jarrod Harbrow', pos: 'MEDIUM_DEFENDER', rat: 254.3, team: 'Gold Coast Suns'},
		{id: 'CD_I270512', name: 'Pearce Hanley', pos: 'MEDIUM_DEFENDER', rat: 180.8, team: 'Gold Coast Suns'},
		{id: 'CD_I280722', name: 'Zac Smith', pos: 'RUCK', rat: 31.5, team: 'Gold Coast Suns'},
		{id: 'CD_I281075', name: 'Rory Thompson', pos: 'KEY_DEFENDER', rat: 3.6, team: 'Gold Coast Suns'},
		{id: 'CD_I281091', name: 'Hugh Greenwood', pos: 'MIDFIELDER', rat: 407.5, team: 'Gold Coast Suns'},
		{id: 'CD_I290671', name: 'Anthony Miles', pos: 'MIDFIELDER', rat: 155.0, team: 'Gold Coast Suns'},
		{id: 'CD_I290832', name: 'David Swallow', pos: 'MIDFIELDER', rat: 321.0, team: 'Gold Coast Suns'},
		{id: 'CD_I291753', name: 'Sam Day', pos: 'KEY_FORWARD', rat: 170.8, team: 'Gold Coast Suns'},
		{id: 'CD_I291964', name: 'Jack Hombsch', pos: 'KEY_DEFENDER', rat: 142.6, team: 'Gold Coast Suns'},
		{id: 'CD_I291975', name: 'Jarrod Witts', pos: 'RUCK', rat: 418.5, team: 'Gold Coast Suns'},
		{id: 'CD_I293255', name: 'George Horlin-Smith', pos: 'MEDIUM_DEFENDER', rat: 33.2, team: 'Gold Coast Suns'},
		{id: 'CD_I293713', name: 'Brandon Ellis', pos: 'MIDFIELDER', rat: 314.2, team: 'Gold Coast Suns'},
		{id: 'CD_I294013', name: 'Sean Lemmens', pos: 'MEDIUM_FORWARD', rat: 78.5, team: 'Gold Coast Suns'},
		{id: 'CD_I294643', name: 'Alex Sexton', pos: 'MEDIUM_FORWARD', rat: 277.1, team: 'Gold Coast Suns'},
		{id: 'CD_I295446', name: 'Sam Collins', pos: 'KEY_DEFENDER', rat: 253.0, team: 'Gold Coast Suns'},
		{id: 'CD_I295942', name: 'Jordan Murdoch', pos: 'MEDIUM_DEFENDER', rat: 121.7, team: 'Gold Coast Suns'},
		{id: 'CD_I297456', name: 'Nick Holman', pos: 'MEDIUM_FORWARD', rat: 214.4, team: 'Gold Coast Suns'},
		{id: 'CD_I298272', name: 'Touk Miller', pos: 'MIDFIELDER', rat: 366.5, team: 'Gold Coast Suns'},
		{id: 'CD_I298289', name: 'Peter Wright', pos: 'KEY_FORWARD', rat: 168.0, team: 'Gold Coast Suns'},
		{id: 'CD_I298524', name: 'Lachie Weller', pos: 'MIDFIELDER', rat: 359.9, team: 'Gold Coast Suns'},
		{id: 'CD_I991953', name: 'Corey Ellis', pos: 'MEDIUM_DEFENDER', rat: 26.2, team: 'Gold Coast Suns'},
		{id: 'CD_I993799', name: 'Brayden Fiorini', pos: 'MIDFIELDER', rat: 241.2, team: 'Gold Coast Suns'},
		{id: 'CD_I996064', name: 'Jesse Joyce', pos: 'MEDIUM_DEFENDER', rat: 169.1, team: 'Gold Coast Suns'},
		{id: 'CD_I996464', name: 'Darcy MacPherson', pos: 'MEDIUM_FORWARD', rat: 228.7, team: 'Gold Coast Suns'},
		{id: 'CD_I998129', name: 'Will Brodie', pos: 'MIDFIELDER_FORWARD', rat: 86.1, team: 'Gold Coast Suns'},
		{id: 'CD_I998130', name: 'Ben Ainsworth', pos: 'MEDIUM_FORWARD', rat: 210.5, team: 'Gold Coast Suns'},
		{id: 'CD_I998260', name: 'Jack Bowes', pos: 'MEDIUM_DEFENDER', rat: 309.6, team: 'Gold Coast Suns'},
		{id: 'CD_I998511', name: 'Josh Schoenfeld', pos: 'MEDIUM_FORWARD', rat: 15.1, team: 'Gold Coast Suns'},
		{id: 'CD_I999715', name: 'Jy Farrar', pos: 'MEDIUM_FORWARD', rat: 7.0, team: 'Gold Coast Suns'}
	]);
var $author$project$Teams$greaterWesternSydneyGiantsPicks = _List_fromArray(
	[39, 46, 66, 82]);
var $author$project$Teams$greaterWesternSydneyGiantsPlayers = _List_fromArray(
	[
		{id: 'CD_I1001396', name: 'Isaac Cumming', pos: 'MEDIUM_DEFENDER', rat: 41.6, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1002251', name: 'Brent Daniels', pos: 'MEDIUM_FORWARD', rat: 276.8, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1002296', name: 'Nick Shipley', pos: 'MIDFIELDER', rat: 0.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1004286', name: 'Zac Langdon', pos: 'MEDIUM_FORWARD', rat: 153.4, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1005247', name: 'Sam Taylor', pos: 'KEY_DEFENDER', rat: 258.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1006103', name: 'Jye Caldwell', pos: 'MIDFIELDER_FORWARD', rat: 42.6, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1006135', name: 'Xavier O\'Halloran', pos: 'MIDFIELDER', rat: 8.7, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1006148', name: 'Bobby Hill', pos: 'MEDIUM_FORWARD', rat: 59.1, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1007238', name: 'Jake Stein', pos: 'KEY_DEFENDER', rat: 29.4, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1008083', name: 'Connor Idun', pos: 'MEDIUM_DEFENDER', rat: 3.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1008123', name: 'Jake Riccardi', pos: 'KEY_FORWARD', rat: 0.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1008436', name: 'Kieren Briggs', pos: 'KEY_FORWARD', rat: 0.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1009253', name: 'Lachie Ash', pos: 'MEDIUM_DEFENDER', rat: 39.4, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1009528', name: 'Tom Green', pos: 'MIDFIELDER', rat: 21.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1009708', name: 'Jack Buckley', pos: 'MIDFIELDER', rat: 0.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I1014038', name: 'Callum M. Brown', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I240700', name: 'Heath Shaw', pos: 'MEDIUM_DEFENDER', rat: 241.2, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I261374', name: 'Sam J. Reid', pos: 'MEDIUM_DEFENDER', rat: 221.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I270811', name: 'Sam Jacobs', pos: 'RUCK', rat: 278.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I271015', name: 'Matt de Boer', pos: 'MIDFIELDER', rat: 287.7, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I280109', name: 'Callan Ward', pos: 'MIDFIELDER', rat: 283.9, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I280762', name: 'Shane Mumford', pos: 'RUCK', rat: 226.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I280804', name: 'Phil Davis', pos: 'KEY_DEFENDER', rat: 300.9, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I290314', name: 'Lachlan Keeffe', pos: 'KEY_DEFENDER', rat: 117.9, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I290675', name: 'Daniel Lloyd', pos: 'MEDIUM_FORWARD', rat: 186.4, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I291509', name: 'Adam Kennedy', pos: 'MIDFIELDER', rat: 248.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I291792', name: 'Tommy Sheridan', pos: 'MIDFIELDER', rat: 71.2, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I291797', name: 'Matt Buntine', pos: 'MEDIUM_DEFENDER', rat: 89.3, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I291969', name: 'Stephen Coniglio', pos: 'MIDFIELDER', rat: 451.1, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I293845', name: 'Jeremy Cameron', pos: 'KEY_FORWARD', rat: 394.7, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I294305', name: 'Lachie Whitfield', pos: 'MEDIUM_DEFENDER', rat: 372.5, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I294508', name: 'Aidan Corr', pos: 'KEY_DEFENDER', rat: 171.7, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I294685', name: 'Zac Williams', pos: 'MEDIUM_DEFENDER', rat: 387.4, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I295265', name: 'Nick Haynes', pos: 'MEDIUM_DEFENDER', rat: 320.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I295344', name: 'Toby Greene', pos: 'MEDIUM_FORWARD', rat: 336.1, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I296347', name: 'Josh Kelly', pos: 'MIDFIELDER', rat: 457.9, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I296984', name: 'Tom Hutchesson', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I298111', name: 'Jeremy Finlayson', pos: 'KEY_FORWARD', rat: 354.2, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I993107', name: 'Harry Himmelberg', pos: 'KEY_FORWARD', rat: 333.4, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I993902', name: 'Matt Flynn', pos: 'RUCK', rat: 0.0, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I993903', name: 'Jacob Hopper', pos: 'MIDFIELDER', rat: 364.7, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I998172', name: 'Tim Taranto', pos: 'MIDFIELDER', rat: 370.6, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I998205', name: 'Harry Perryman', pos: 'MIDFIELDER', rat: 273.6, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I998225', name: 'Zach Sproule', pos: 'KEY_FORWARD', rat: -1.1, team: 'Greater Western Sydney Giants'},
		{id: 'CD_I999309', name: 'Jackson Hately', pos: 'MIDFIELDER', rat: 60.6, team: 'Greater Western Sydney Giants'}
	]);
var $author$project$Teams$hawthornHawksPicks = _List_fromArray(
	[4, 21, 40, 43, 59, 67, 77]);
var $author$project$Teams$hawthornHawksPlayers = _List_fromArray(
	[
		{id: 'CD_I1000887', name: 'Mitch Lewis', pos: 'KEY_FORWARD', rat: 111.7, team: 'Hawthorn Hawks'},
		{id: 'CD_I1000959', name: 'James Cousins', pos: 'MIDFIELDER', rat: 146.6, team: 'Hawthorn Hawks'},
		{id: 'CD_I1000963', name: 'Harry Morrison', pos: 'MIDFIELDER', rat: 162.9, team: 'Hawthorn Hawks'},
		{id: 'CD_I1001024', name: 'Ned Reeves', pos: 'RUCK', rat: 0.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I1001043', name: 'Oliver Hanrahan', pos: 'MEDIUM_FORWARD', rat: 84.4, team: 'Hawthorn Hawks'},
		{id: 'CD_I1002222', name: 'James Worpel', pos: 'MIDFIELDER', rat: 372.1, team: 'Hawthorn Hawks'},
		{id: 'CD_I1002590', name: 'Mathew Walker', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I1003547', name: 'Conor Glass', pos: 'MIDFIELDER', rat: 62.5, team: 'Hawthorn Hawks'},
		{id: 'CD_I1004919', name: 'Jackson Ross', pos: 'KEY_FORWARD', rat: 0.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I1004991', name: 'Harry Jones', pos: 'MIDFIELDER_FORWARD', rat: 4.7, team: 'Hawthorn Hawks'},
		{id: 'CD_I1005150', name: 'Emerson Jeka', pos: 'KEY_FORWARD', rat: 0.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I1006030', name: 'Jacob Koschitzke', pos: 'KEY_DEFENDER', rat: 0.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I1006128', name: 'Will Golds', pos: 'MIDFIELDER', rat: 0.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I1006159', name: 'Damon Greaves', pos: 'MEDIUM_DEFENDER', rat: 14.9, team: 'Hawthorn Hawks'},
		{id: 'CD_I1006314', name: 'Dylan Moore', pos: 'MEDIUM_FORWARD', rat: 65.2, team: 'Hawthorn Hawks'},
		{id: 'CD_I1007124', name: 'Conor Nash', pos: 'KEY_FORWARD', rat: 116.3, team: 'Hawthorn Hawks'},
		{id: 'CD_I1008537', name: 'Josh Morris', pos: 'MEDIUM_FORWARD', rat: 9.6, team: 'Hawthorn Hawks'},
		{id: 'CD_I1008550', name: 'Will Day', pos: 'MEDIUM_DEFENDER', rat: 86.3, team: 'Hawthorn Hawks'},
		{id: 'CD_I1009421', name: 'Finn Maginness', pos: 'MIDFIELDER', rat: 4.2, team: 'Hawthorn Hawks'},
		{id: 'CD_I1011873', name: 'Harry Pepper', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I210012', name: 'Shaun Burgoyne', pos: 'MEDIUM_FORWARD', rat: 346.9, team: 'Hawthorn Hawks'},
		{id: 'CD_I260288', name: 'James Frawley', pos: 'KEY_DEFENDER', rat: 214.4, team: 'Hawthorn Hawks'},
		{id: 'CD_I260710', name: 'Paul Puopolo', pos: 'MEDIUM_FORWARD', rat: 298.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I261323', name: 'Ben McEvoy', pos: 'RUCK', rat: 439.7, team: 'Hawthorn Hawks'},
		{id: 'CD_I280471', name: 'Ben Stratton', pos: 'MEDIUM_DEFENDER', rat: 170.3, team: 'Hawthorn Hawks'},
		{id: 'CD_I280737', name: 'Liam Shiels', pos: 'MIDFIELDER', rat: 356.7, team: 'Hawthorn Hawks'},
		{id: 'CD_I280744', name: 'Luke Breust', pos: 'MEDIUM_FORWARD', rat: 416.5, team: 'Hawthorn Hawks'},
		{id: 'CD_I280969', name: 'Tom Scully', pos: 'MIDFIELDER_FORWARD', rat: 247.8, team: 'Hawthorn Hawks'},
		{id: 'CD_I290889', name: 'Keegan Brooksby', pos: 'RUCK', rat: 4.1, team: 'Hawthorn Hawks'},
		{id: 'CD_I291201', name: 'Ricky Henderson', pos: 'MIDFIELDER', rat: 350.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I291327', name: 'Jonathon Ceglar', pos: 'RUCK', rat: 279.7, team: 'Hawthorn Hawks'},
		{id: 'CD_I291351', name: 'Jack Gunston', pos: 'KEY_FORWARD', rat: 351.2, team: 'Hawthorn Hawks'},
		{id: 'CD_I291821', name: 'Jonathon Patton', pos: 'KEY_FORWARD', rat: 15.5, team: 'Hawthorn Hawks'},
		{id: 'CD_I291856', name: 'Tom Mitchell', pos: 'MIDFIELDER', rat: 291.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I291962', name: 'Chad Wingard', pos: 'MEDIUM_FORWARD', rat: 372.3, team: 'Hawthorn Hawks'},
		{id: 'CD_I293738', name: 'Sam Frost', pos: 'KEY_DEFENDER', rat: 304.3, team: 'Hawthorn Hawks'},
		{id: 'CD_I294077', name: 'Michael Hartley', pos: 'KEY_DEFENDER', rat: 49.2, team: 'Hawthorn Hawks'},
		{id: 'CD_I294613', name: 'Jaeger O\'Meara', pos: 'MIDFIELDER', rat: 356.8, team: 'Hawthorn Hawks'},
		{id: 'CD_I294877', name: 'Isaac Smith', pos: 'MIDFIELDER_FORWARD', rat: 300.4, team: 'Hawthorn Hawks'},
		{id: 'CD_I296041', name: 'Tim O\'Brien', pos: 'KEY_FORWARD', rat: 232.2, team: 'Hawthorn Hawks'},
		{id: 'CD_I296254', name: 'Jarman Impey', pos: 'MEDIUM_FORWARD', rat: 223.8, team: 'Hawthorn Hawks'},
		{id: 'CD_I296452', name: 'Darren Minchington', pos: 'MEDIUM_FORWARD', rat: 33.3, team: 'Hawthorn Hawks'},
		{id: 'CD_I297566', name: 'James Sicily', pos: 'MEDIUM_DEFENDER', rat: 360.4, team: 'Hawthorn Hawks'},
		{id: 'CD_I992462', name: 'Daniel Howe', pos: 'MIDFIELDER', rat: 164.2, team: 'Hawthorn Hawks'},
		{id: 'CD_I993794', name: 'Blake Hardwick', pos: 'MEDIUM_DEFENDER', rat: 270.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I998114', name: 'Jack Scrimshaw', pos: 'MEDIUM_DEFENDER', rat: 171.0, team: 'Hawthorn Hawks'},
		{id: 'CD_I998390', name: 'Changkuoth Jiath', pos: 'MEDIUM_DEFENDER', rat: 34.0, team: 'Hawthorn Hawks'}
	]);
var $author$project$Teams$melbourneDemonsPicks = _List_fromArray(
	[23, 47, 62, 63, 83]);
var $author$project$Teams$melbourneDemonsPlayers = _List_fromArray(
	[
		{id: 'CD_I1001438', name: 'Bayley Fritsch', pos: 'MEDIUM_FORWARD', rat: 281.3, team: 'Melbourne Demons'},
		{id: 'CD_I1001449', name: 'Mitch Hannan', pos: 'MEDIUM_FORWARD', rat: 132.2, team: 'Melbourne Demons'},
		{id: 'CD_I1002282', name: 'Charlie Spargo', pos: 'MEDIUM_FORWARD', rat: 128.4, team: 'Melbourne Demons'},
		{id: 'CD_I1003546', name: 'Joel Smith', pos: 'KEY_DEFENDER', rat: 42.7, team: 'Melbourne Demons'},
		{id: 'CD_I1004695', name: 'Aaron Nietschke', pos: 'MIDFIELDER', rat: 0.0, team: 'Melbourne Demons'},
		{id: 'CD_I1005330', name: 'Kade Chandler', pos: 'MEDIUM_FORWARD', rat: 9.5, team: 'Melbourne Demons'},
		{id: 'CD_I1006106', name: 'Kyle Dunkley', pos: 'MIDFIELDER', rat: 27.8, team: 'Melbourne Demons'},
		{id: 'CD_I1008139', name: 'Toby Bedford', pos: 'MEDIUM_FORWARD', rat: 4.8, team: 'Melbourne Demons'},
		{id: 'CD_I1008541', name: 'Kysaiah Pickett', pos: 'MEDIUM_FORWARD', rat: 85.1, team: 'Melbourne Demons'},
		{id: 'CD_I1008855', name: 'Oskar Baker', pos: 'MIDFIELDER', rat: 76.2, team: 'Melbourne Demons'},
		{id: 'CD_I1008893', name: 'Harrison Petty', pos: 'KEY_FORWARD', rat: 46.7, team: 'Melbourne Demons'},
		{id: 'CD_I1009378', name: 'Trent Rivers', pos: 'MEDIUM_DEFENDER', rat: 57.2, team: 'Melbourne Demons'},
		{id: 'CD_I1009399', name: 'Luke Jackson', pos: 'KEY_FORWARD', rat: 31.1, team: 'Melbourne Demons'},
		{id: 'CD_I1013409', name: 'James Jordon', pos: 'MIDFIELDER', rat: 0.0, team: 'Melbourne Demons'},
		{id: 'CD_I1014081', name: 'Austin Bradtke', pos: 'RUCK', rat: 0.0, team: 'Melbourne Demons'},
		{id: 'CD_I250222', name: 'Nathan Jones', pos: 'MIDFIELDER_FORWARD', rat: 281.0, team: 'Melbourne Demons'},
		{id: 'CD_I280824', name: 'Jake Melksham', pos: 'MEDIUM_FORWARD', rat: 250.0, team: 'Melbourne Demons'},
		{id: 'CD_I281085', name: 'Steven May', pos: 'KEY_DEFENDER', rat: 262.9, team: 'Melbourne Demons'},
		{id: 'CD_I281280', name: 'Neville Jetta', pos: 'MEDIUM_DEFENDER', rat: 131.6, team: 'Melbourne Demons'},
		{id: 'CD_I290160', name: 'Michael Hibberd', pos: 'MEDIUM_DEFENDER', rat: 243.3, team: 'Melbourne Demons'},
		{id: 'CD_I290528', name: 'Max Gawn', pos: 'RUCK', rat: 602.7, team: 'Melbourne Demons'},
		{id: 'CD_I290622', name: 'Mitch Brown', pos: 'KEY_FORWARD', rat: 166.4, team: 'Melbourne Demons'},
		{id: 'CD_I291533', name: 'Tom McDonald', pos: 'KEY_FORWARD', rat: 269.9, team: 'Melbourne Demons'},
		{id: 'CD_I291594', name: 'Harley Bennell', pos: 'MEDIUM_FORWARD', rat: 28.0, team: 'Melbourne Demons'},
		{id: 'CD_I291819', name: 'Adam Tomlinson', pos: 'KEY_DEFENDER', rat: 204.4, team: 'Melbourne Demons'},
		{id: 'CD_I291902', name: 'Jack Viney', pos: 'MIDFIELDER', rat: 381.8, team: 'Melbourne Demons'},
		{id: 'CD_I294675', name: 'Josh Wagner', pos: 'MEDIUM_DEFENDER', rat: 113.0, team: 'Melbourne Demons'},
		{id: 'CD_I296209', name: 'Kade Kolodjashnij', pos: 'MIDFIELDER', rat: 29.6, team: 'Melbourne Demons'},
		{id: 'CD_I296359', name: 'Christian Salem', pos: 'MEDIUM_DEFENDER', rat: 292.2, team: 'Melbourne Demons'},
		{id: 'CD_I296420', name: 'Alex Neal-Bullen', pos: 'MEDIUM_FORWARD', rat: 263.2, team: 'Melbourne Demons'},
		{id: 'CD_I297899', name: 'James Harmes', pos: 'MEDIUM_DEFENDER', rat: 346.1, team: 'Melbourne Demons'},
		{id: 'CD_I297990', name: 'Aaron vandenBerg', pos: 'MIDFIELDER', rat: 125.8, team: 'Melbourne Demons'},
		{id: 'CD_I298210', name: 'Christian Petracca', pos: 'MIDFIELDER', rat: 499.1, team: 'Melbourne Demons'},
		{id: 'CD_I298264', name: 'Ed Langdon', pos: 'MIDFIELDER', rat: 294.5, team: 'Melbourne Demons'},
		{id: 'CD_I298279', name: 'Angus Brayshaw', pos: 'MIDFIELDER', rat: 370.6, team: 'Melbourne Demons'},
		{id: 'CD_I298281', name: 'Jake Lever', pos: 'KEY_DEFENDER', rat: 202.5, team: 'Melbourne Demons'},
		{id: 'CD_I298390', name: 'Jay Lockhart', pos: 'MEDIUM_DEFENDER', rat: 113.5, team: 'Melbourne Demons'},
		{id: 'CD_I992472', name: 'Oscar McDonald', pos: 'KEY_DEFENDER', rat: 181.1, team: 'Melbourne Demons'},
		{id: 'CD_I992644', name: 'Braydon Preuss', pos: 'RUCK', rat: 72.3, team: 'Melbourne Demons'},
		{id: 'CD_I993806', name: 'Sam Weideman', pos: 'KEY_FORWARD', rat: 187.3, team: 'Melbourne Demons'},
		{id: 'CD_I993940', name: 'Corey Wagner', pos: 'MIDFIELDER_FORWARD', rat: 70.4, team: 'Melbourne Demons'},
		{id: 'CD_I994385', name: 'Jayden Hunt', pos: 'MEDIUM_FORWARD', rat: 234.0, team: 'Melbourne Demons'},
		{id: 'CD_I996692', name: 'Marty Hore', pos: 'MEDIUM_DEFENDER', rat: 103.5, team: 'Melbourne Demons'},
		{id: 'CD_I996701', name: 'Clayton Oliver', pos: 'MIDFIELDER', rat: 483.7, team: 'Melbourne Demons'},
		{id: 'CD_I999391', name: 'Tom Sparrow', pos: 'MIDFIELDER', rat: 52.4, team: 'Melbourne Demons'}
	]);
var $author$project$Teams$northMelbourneKangaroosPicks = _List_fromArray(
	[2, 9, 25, 57, 65, 75]);
var $author$project$Teams$northMelbourneKangaroosPlayers = _List_fromArray(
	[
		{id: 'CD_I1000905', name: 'Tom Murphy', pos: 'MIDFIELDER', rat: 18.1, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1001017', name: 'Nick Larkey', pos: 'KEY_FORWARD', rat: 178.2, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1001351', name: 'Lachlan Hosie', pos: 'MEDIUM_FORWARD', rat: 10.8, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1002143', name: 'Ben McKay', pos: 'KEY_DEFENDER', rat: 106.2, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1002267', name: 'Luke Davies-Uniacke', pos: 'MIDFIELDER', rat: 209.4, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1004894', name: 'Aiden Bonar', pos: 'MEDIUM_DEFENDER', rat: 67.3, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1004965', name: 'Tristan Xerri', pos: 'KEY_FORWARD', rat: 25.3, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1005084', name: 'Will Walker', pos: 'MIDFIELDER', rat: 25.7, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1005729', name: 'Tarryn Thomas', pos: 'MEDIUM_FORWARD', rat: 204.6, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1006058', name: 'Bailey Scott', pos: 'MIDFIELDER_FORWARD', rat: 110.2, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1006137', name: 'Curtis Taylor', pos: 'MEDIUM_FORWARD', rat: 64.0, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1006138', name: 'Joel Crocker', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1006653', name: 'Matt McGuinness', pos: 'KEY_DEFENDER', rat: 0.0, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1009189', name: 'Jack Mahony', pos: 'MEDIUM_FORWARD', rat: 52.5, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1011771', name: 'Flynn Perez', pos: 'MEDIUM_DEFENDER', rat: 10.8, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I1015781', name: 'Charlie Comben', pos: 'KEY_FORWARD', rat: 0.0, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I260227', name: 'Shaun Higgins', pos: 'MIDFIELDER', rat: 374.9, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I270325', name: 'Robbie Tarrant', pos: 'KEY_DEFENDER', rat: 261.5, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I271129', name: 'Todd Goldstein', pos: 'RUCK', rat: 534.0, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I280921', name: 'Ben Cunnington', pos: 'MIDFIELDER', rat: 439.0, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I280944', name: 'Jack Ziebell', pos: 'MEDIUM_FORWARD', rat: 326.4, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I290156', name: 'Jasper Pittard', pos: 'MEDIUM_DEFENDER', rat: 282.2, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I290194', name: 'Jamie Macmillan', pos: 'MEDIUM_DEFENDER', rat: 228.8, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I290199', name: 'Majak Daw', pos: 'KEY_FORWARD', rat: 90.3, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I290246', name: 'Tom Campbell', pos: 'KEY_FORWARD', rat: 11.0, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I290738', name: 'Jared Polec', pos: 'MIDFIELDER', rat: 348.0, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I290787', name: 'Shaun Atley', pos: 'MEDIUM_DEFENDER', rat: 288.5, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I290802', name: 'Ben Jacobs', pos: 'MIDFIELDER', rat: 0.0, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I291550', name: 'Josh Walker', pos: 'KEY_DEFENDER', rat: 241.2, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I291784', name: 'Dom Tyson', pos: 'MIDFIELDER', rat: 93.0, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I291861', name: 'Jed Anderson', pos: 'MIDFIELDER', rat: 407.2, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I291867', name: 'Ben Brown', pos: 'KEY_FORWARD', rat: 293.1, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I295256', name: 'Marley Williams', pos: 'MEDIUM_DEFENDER', rat: 197.7, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I295340', name: 'Mason Wood', pos: 'MEDIUM_FORWARD', rat: 189.4, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I296035', name: 'Trent Dumont', pos: 'MIDFIELDER', rat: 347.3, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I296078', name: 'Taylor Garner', pos: 'MEDIUM_FORWARD', rat: 75.2, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I296355', name: 'Luke McDonald', pos: 'MEDIUM_DEFENDER', rat: 238.4, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I296735', name: 'Aaron Hall', pos: 'MEDIUM_FORWARD', rat: 197.2, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I297767', name: 'Sam Durdin', pos: 'KEY_DEFENDER', rat: 71.5, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I298271', name: 'Paul Ahern', pos: 'MIDFIELDER_FORWARD', rat: 99.8, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I298287', name: 'Ed Vickers-Willis', pos: 'MEDIUM_DEFENDER', rat: 31.9, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I992499', name: 'Kayne Turner', pos: 'MEDIUM_FORWARD', rat: 205.7, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I993998', name: 'Jy Simpkin', pos: 'MIDFIELDER', rat: 351.8, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I998327', name: 'Kyron Hayden', pos: 'MEDIUM_DEFENDER', rat: 43.6, team: 'North Melbourne Kangaroos'},
		{id: 'CD_I998484', name: 'Cameron Zurhaar', pos: 'MEDIUM_FORWARD', rat: 257.8, team: 'North Melbourne Kangaroos'}
	]);
var $author$project$Teams$portAdelaidePowerPicks = _List_fromArray(
	[26, 29, 42, 50, 55, 91]);
var $author$project$Teams$portAdelaidePowerPlayers = _List_fromArray(
	[
		{id: 'CD_I1000972', name: 'Willem Drew', pos: 'MIDFIELDER', rat: 80.1, team: 'Port Adelaide Power'},
		{id: 'CD_I1001299', name: 'Connor Rozee', pos: 'MEDIUM_FORWARD', rat: 305.3, team: 'Port Adelaide Power'},
		{id: 'CD_I1002248', name: 'Sam Hayes', pos: 'RUCK', rat: 0.0, team: 'Port Adelaide Power'},
		{id: 'CD_I1002253', name: 'Kane Farrell', pos: 'MIDFIELDER_FORWARD', rat: 138.9, team: 'Port Adelaide Power'},
		{id: 'CD_I1002355', name: 'Tobin Cox', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Port Adelaide Power'},
		{id: 'CD_I1002392', name: 'Jake Patmore', pos: 'MIDFIELDER_FORWARD', rat: 0.0, team: 'Port Adelaide Power'},
		{id: 'CD_I1004829', name: 'Riley Grundy', pos: 'KEY_DEFENDER', rat: 0.0, team: 'Port Adelaide Power'},
		{id: 'CD_I1004998', name: 'Todd Marshall', pos: 'KEY_FORWARD', rat: 146.1, team: 'Port Adelaide Power'},
		{id: 'CD_I1005326', name: 'Jackson Mead', pos: 'MIDFIELDER', rat: 0.0, team: 'Port Adelaide Power'},
		{id: 'CD_I1006096', name: 'Xavier Duursma', pos: 'MIDFIELDER', rat: 222.2, team: 'Port Adelaide Power'},
		{id: 'CD_I1006121', name: 'Zak Butters', pos: 'MEDIUM_FORWARD', rat: 281.3, team: 'Port Adelaide Power'},
		{id: 'CD_I1008531', name: 'Trent Burgoyne', pos: 'MIDFIELDER_FORWARD', rat: 0.0, team: 'Port Adelaide Power'},
		{id: 'CD_I1009191', name: 'Miles Bergman', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'Port Adelaide Power'},
		{id: 'CD_I1009195', name: 'Dylan Williams', pos: 'MIDFIELDER_FORWARD', rat: 0.0, team: 'Port Adelaide Power'},
		{id: 'CD_I1009389', name: 'Jake Pasini', pos: 'KEY_DEFENDER', rat: 0.0, team: 'Port Adelaide Power'},
		{id: 'CD_I1010174', name: 'Mitch Georgiades', pos: 'KEY_FORWARD', rat: 42.9, team: 'Port Adelaide Power'},
		{id: 'CD_I250365', name: 'Travis Boak', pos: 'MIDFIELDER', rat: 458.2, team: 'Port Adelaide Power'},
		{id: 'CD_I260750', name: 'Justin Westhoff', pos: 'KEY_FORWARD', rat: 338.3, team: 'Port Adelaide Power'},
		{id: 'CD_I261396', name: 'Robbie Gray', pos: 'MEDIUM_FORWARD', rat: 418.4, team: 'Port Adelaide Power'},
		{id: 'CD_I261892', name: 'Hamish Hartlett', pos: 'MEDIUM_DEFENDER', rat: 221.6, team: 'Port Adelaide Power'},
		{id: 'CD_I261911', name: 'Brad Ebert', pos: 'MEDIUM_FORWARD', rat: 246.2, team: 'Port Adelaide Power'},
		{id: 'CD_I270919', name: 'Tom Rockliff', pos: 'MIDFIELDER', rat: 350.8, team: 'Port Adelaide Power'},
		{id: 'CD_I280711', name: 'Charlie Dixon', pos: 'KEY_FORWARD', rat: 268.2, team: 'Port Adelaide Power'},
		{id: 'CD_I280972', name: 'Jack Watts', pos: 'KEY_DEFENDER', rat: 72.8, team: 'Port Adelaide Power'},
		{id: 'CD_I280990', name: 'Steven Motlop', pos: 'MEDIUM_FORWARD', rat: 257.6, team: 'Port Adelaide Power'},
		{id: 'CD_I290527', name: 'Trent McKenzie', pos: 'KEY_DEFENDER', rat: 124.7, team: 'Port Adelaide Power'},
		{id: 'CD_I290733', name: 'Cam Sutcliffe', pos: 'MEDIUM_FORWARD', rat: 53.9, team: 'Port Adelaide Power'},
		{id: 'CD_I290746', name: 'Scott Lycett', pos: 'RUCK', rat: 410.3, team: 'Port Adelaide Power'},
		{id: 'CD_I292145', name: 'Tom Jonas', pos: 'KEY_DEFENDER', rat: 285.7, team: 'Port Adelaide Power'},
		{id: 'CD_I293603', name: 'Sam Mayes', pos: 'MEDIUM_DEFENDER', rat: 30.7, team: 'Port Adelaide Power'},
		{id: 'CD_I293987', name: 'Jarrod Lienert', pos: 'MEDIUM_DEFENDER', rat: 108.2, team: 'Port Adelaide Power'},
		{id: 'CD_I294318', name: 'Ollie Wines', pos: 'MIDFIELDER', rat: 369.3, team: 'Port Adelaide Power'},
		{id: 'CD_I294504', name: 'Tom Clurey', pos: 'KEY_DEFENDER', rat: 298.6, team: 'Port Adelaide Power'},
		{id: 'CD_I297354', name: 'Karl Amon', pos: 'MIDFIELDER', rat: 310.6, team: 'Port Adelaide Power'},
		{id: 'CD_I991930', name: 'Darcy Byrne-Jones', pos: 'MEDIUM_DEFENDER', rat: 329.6, team: 'Port Adelaide Power'},
		{id: 'CD_I992128', name: 'Ryan Burton', pos: 'MEDIUM_DEFENDER', rat: 218.6, team: 'Port Adelaide Power'},
		{id: 'CD_I993979', name: 'Sam Powell-Pepper', pos: 'MIDFIELDER_FORWARD', rat: 295.3, team: 'Port Adelaide Power'},
		{id: 'CD_I994295', name: 'Dan Houston', pos: 'MEDIUM_DEFENDER', rat: 354.3, team: 'Port Adelaide Power'},
		{id: 'CD_I994599', name: 'Riley Bonner', pos: 'MEDIUM_DEFENDER', rat: 190.2, team: 'Port Adelaide Power'},
		{id: 'CD_I997142', name: 'Peter Ladhams', pos: 'RUCK', rat: 129.8, team: 'Port Adelaide Power'},
		{id: 'CD_I997770', name: 'Wylie Buzza', pos: 'KEY_FORWARD', rat: 0.0, team: 'Port Adelaide Power'},
		{id: 'CD_I998126', name: 'Joe Atley', pos: 'MIDFIELDER', rat: 6.7, team: 'Port Adelaide Power'},
		{id: 'CD_I998321', name: 'Joel Garner', pos: 'MEDIUM_DEFENDER', rat: 24.4, team: 'Port Adelaide Power'},
		{id: 'CD_I999320', name: 'Martin Frederick', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Port Adelaide Power'},
		{id: 'CD_I999346', name: 'Boyd Woodcock', pos: 'MEDIUM_FORWARD', rat: 28.3, team: 'Port Adelaide Power'}
	]);
var $author$project$Teams$richmondTigersPicks = _List_fromArray(
	[17, 31, 53, 71, 89]);
var $author$project$Teams$richmondTigersPlayers = _List_fromArray(
	[
		{id: 'CD_I1000061', name: 'Callum Coleman-Jones', pos: 'RUCK', rat: -2.1, team: 'Richmond Tigers'},
		{id: 'CD_I1000223', name: 'Liam Baker', pos: 'MEDIUM_DEFENDER', rat: 280.2, team: 'Richmond Tigers'},
		{id: 'CD_I1000981', name: 'Daniel Rioli', pos: 'MEDIUM_FORWARD', rat: 258.2, team: 'Richmond Tigers'},
		{id: 'CD_I1002227', name: 'Jack Higgins', pos: 'MEDIUM_FORWARD', rat: 248.0, team: 'Richmond Tigers'},
		{id: 'CD_I1002231', name: 'Patrick Naish', pos: 'MIDFIELDER', rat: 18.3, team: 'Richmond Tigers'},
		{id: 'CD_I1002245', name: 'Noah Balta', pos: 'KEY_DEFENDER', rat: 228.9, team: 'Richmond Tigers'},
		{id: 'CD_I1002403', name: 'Ben Miller', pos: 'KEY_DEFENDER', rat: 0.0, team: 'Richmond Tigers'},
		{id: 'CD_I1002583', name: 'Sydney Stack', pos: 'MIDFIELDER_FORWARD', rat: 226.1, team: 'Richmond Tigers'},
		{id: 'CD_I1006133', name: 'Jack Ross', pos: 'MIDFIELDER', rat: 101.3, team: 'Richmond Tigers'},
		{id: 'CD_I1006193', name: 'Bigoa Nyuon', pos: 'RUCK', rat: 0.0, team: 'Richmond Tigers'},
		{id: 'CD_I1006208', name: 'Fraser Turner', pos: 'MIDFIELDER', rat: 0.0, team: 'Richmond Tigers'},
		{id: 'CD_I1006276', name: 'Derek Eggmolesse-Smith', pos: 'MEDIUM_DEFENDER', rat: 43.8, team: 'Richmond Tigers'},
		{id: 'CD_I1006536', name: 'Luke English', pos: 'MIDFIELDER_FORWARD', rat: 0.0, team: 'Richmond Tigers'},
		{id: 'CD_I1008297', name: 'Riley Collier-Dawkins', pos: 'MIDFIELDER', rat: 0.0, team: 'Richmond Tigers'},
		{id: 'CD_I1009226', name: 'Thomson Dow', pos: 'MIDFIELDER', rat: 6.8, team: 'Richmond Tigers'},
		{id: 'CD_I1009308', name: 'Noah Cumberland', pos: 'MIDFIELDER_FORWARD', rat: 0.0, team: 'Richmond Tigers'},
		{id: 'CD_I1009313', name: 'Will Martyn', pos: 'MIDFIELDER', rat: 0.0, team: 'Richmond Tigers'},
		{id: 'CD_I1011985', name: 'Hugo Ralphsmith', pos: 'MIDFIELDER_FORWARD', rat: 0.0, team: 'Richmond Tigers'},
		{id: 'CD_I250312', name: 'Bachar Houli', pos: 'MEDIUM_DEFENDER', rat: 294.1, team: 'Richmond Tigers'},
		{id: 'CD_I250395', name: 'Jack Riewoldt', pos: 'KEY_FORWARD', rat: 277.7, team: 'Richmond Tigers'},
		{id: 'CD_I260930', name: 'Shane Edwards', pos: 'MIDFIELDER', rat: 491.3, team: 'Richmond Tigers'},
		{id: 'CD_I261362', name: 'Alex Rance', pos: 'KEY_DEFENDER', rat: 39.6, team: 'Richmond Tigers'},
		{id: 'CD_I270896', name: 'Trent Cotchin', pos: 'MIDFIELDER', rat: 334.2, team: 'Richmond Tigers'},
		{id: 'CD_I280819', name: 'Dylan Grimes', pos: 'KEY_DEFENDER', rat: 291.9, team: 'Richmond Tigers'},
		{id: 'CD_I290032', name: 'Kane Lambert', pos: 'MIDFIELDER_FORWARD', rat: 377.0, team: 'Richmond Tigers'},
		{id: 'CD_I290198', name: 'David Astbury', pos: 'KEY_DEFENDER', rat: 225.6, team: 'Richmond Tigers'},
		{id: 'CD_I290623', name: 'Josh Caddy', pos: 'MIDFIELDER', rat: 259.7, team: 'Richmond Tigers'},
		{id: 'CD_I290627', name: 'Dion Prestia', pos: 'MIDFIELDER', rat: 472.2, team: 'Richmond Tigers'},
		{id: 'CD_I290847', name: 'Dustin Martin', pos: 'MIDFIELDER_FORWARD', rat: 568.4, team: 'Richmond Tigers'},
		{id: 'CD_I293813', name: 'Tom J. Lynch', pos: 'KEY_FORWARD', rat: 284.4, team: 'Richmond Tigers'},
		{id: 'CD_I294592', name: 'Kamdyn McIntosh', pos: 'MIDFIELDER', rat: 265.6, team: 'Richmond Tigers'},
		{id: 'CD_I294674', name: 'Nick Vlastuin', pos: 'MEDIUM_DEFENDER', rat: 384.2, team: 'Richmond Tigers'},
		{id: 'CD_I295203', name: 'Nathan Broad', pos: 'MEDIUM_DEFENDER', rat: 203.0, team: 'Richmond Tigers'},
		{id: 'CD_I298174', name: 'Toby Nankervis', pos: 'RUCK', rat: 268.4, team: 'Richmond Tigers'},
		{id: 'CD_I298358', name: 'Oleg Markov', pos: 'MEDIUM_DEFENDER', rat: 51.0, team: 'Richmond Tigers'},
		{id: 'CD_I990827', name: 'Jack Graham', pos: 'MIDFIELDER', rat: 294.8, team: 'Richmond Tigers'},
		{id: 'CD_I991933', name: 'Jason Castagna', pos: 'MEDIUM_FORWARD', rat: 217.4, team: 'Richmond Tigers'},
		{id: 'CD_I992049', name: 'Jayden Short', pos: 'MEDIUM_DEFENDER', rat: 273.6, team: 'Richmond Tigers'},
		{id: 'CD_I992786', name: 'Jake Aarts', pos: 'MEDIUM_FORWARD', rat: 95.7, team: 'Richmond Tigers'},
		{id: 'CD_I993771', name: 'Marlion Pickett', pos: 'MIDFIELDER', rat: 141.3, team: 'Richmond Tigers'},
		{id: 'CD_I993993', name: 'Shai Bolton', pos: 'MIDFIELDER', rat: 339.3, team: 'Richmond Tigers'},
		{id: 'CD_I994077', name: 'Mabior Chol', pos: 'RUCK', rat: 167.2, team: 'Richmond Tigers'},
		{id: 'CD_I998218', name: 'Ryan Garthwaite', pos: 'KEY_DEFENDER', rat: 34.8, team: 'Richmond Tigers'},
		{id: 'CD_I998529', name: 'Ivan Soldo', pos: 'RUCK', rat: 256.7, team: 'Richmond Tigers'}
	]);
var $author$project$Teams$stKildaSaintsPicks = _List_fromArray(
	[14, 58, 73, 86]);
var $author$project$Teams$stKildaSaintsPlayers = _List_fromArray(
	[
		{id: 'CD_I1000267', name: 'Matthew Parker', pos: 'MEDIUM_FORWARD', rat: 99.5, team: 'St Kilda Saints'},
		{id: 'CD_I1002213', name: 'Ed Phillips', pos: 'MIDFIELDER', rat: 54.1, team: 'St Kilda Saints'},
		{id: 'CD_I1002264', name: 'Hunter Clark', pos: 'MEDIUM_DEFENDER', rat: 213.2, team: 'St Kilda Saints'},
		{id: 'CD_I1002266', name: 'Oscar Clavarino', pos: 'KEY_DEFENDER', rat: 0.0, team: 'St Kilda Saints'},
		{id: 'CD_I1002922', name: 'Jack Bytel', pos: 'MIDFIELDER', rat: 8.7, team: 'St Kilda Saints'},
		{id: 'CD_I1003520', name: 'Darragh Joyce', pos: 'KEY_DEFENDER', rat: 15.3, team: 'St Kilda Saints'},
		{id: 'CD_I1004360', name: 'Jack Mayo', pos: 'KEY_FORWARD', rat: 0.0, team: 'St Kilda Saints'},
		{id: 'CD_I1004985', name: 'Ben Paton', pos: 'MEDIUM_DEFENDER', rat: 173.9, team: 'St Kilda Saints'},
		{id: 'CD_I1004989', name: 'Doulton Langlands', pos: 'MIDFIELDER', rat: 18.4, team: 'St Kilda Saints'},
		{id: 'CD_I1005530', name: 'Ryan Abbott', pos: 'RUCK', rat: 45.2, team: 'St Kilda Saints'},
		{id: 'CD_I1005717', name: 'Nick Coffield', pos: 'MEDIUM_DEFENDER', rat: 168.9, team: 'St Kilda Saints'},
		{id: 'CD_I1006143', name: 'Max King', pos: 'KEY_FORWARD', rat: 102.2, team: 'St Kilda Saints'},
		{id: 'CD_I1009221', name: 'Jack Bell', pos: 'RUCK', rat: 0.0, team: 'St Kilda Saints'},
		{id: 'CD_I1009228', name: 'Leo Connolly', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'St Kilda Saints'},
		{id: 'CD_I1011994', name: 'Ryan Byrnes', pos: 'MIDFIELDER', rat: 0.1, team: 'St Kilda Saints'},
		{id: 'CD_I1013976', name: 'Sam Alabakis', pos: 'RUCK', rat: 0.0, team: 'St Kilda Saints'},
		{id: 'CD_I250267', name: 'Paddy Ryder', pos: 'RUCK', rat: 431.2, team: 'St Kilda Saints'},
		{id: 'CD_I260113', name: 'Jarryn Geary', pos: 'MEDIUM_DEFENDER', rat: 151.9, team: 'St Kilda Saints'},
		{id: 'CD_I260310', name: 'Nathan Brown', pos: 'KEY_DEFENDER', rat: 139.2, team: 'St Kilda Saints'},
		{id: 'CD_I280858', name: 'Shane Savage', pos: 'MEDIUM_DEFENDER', rat: 238.0, team: 'St Kilda Saints'},
		{id: 'CD_I280933', name: 'Dylan Roberton', pos: 'MEDIUM_DEFENDER', rat: 0.7, team: 'St Kilda Saints'},
		{id: 'CD_I290117', name: 'Dan Hannebery', pos: 'MIDFIELDER', rat: 112.7, team: 'St Kilda Saints'},
		{id: 'CD_I290641', name: 'Jake Carlisle', pos: 'KEY_DEFENDER', rat: 160.2, team: 'St Kilda Saints'},
		{id: 'CD_I290757', name: 'Jimmy Webster', pos: 'MEDIUM_DEFENDER', rat: 86.9, team: 'St Kilda Saints'},
		{id: 'CD_I293846', name: 'Sebastian Ross', pos: 'MIDFIELDER', rat: 387.7, team: 'St Kilda Saints'},
		{id: 'CD_I294429', name: 'Luke Dunstan', pos: 'MIDFIELDER', rat: 267.4, team: 'St Kilda Saints'},
		{id: 'CD_I294570', name: 'Dean Kent', pos: 'MEDIUM_FORWARD', rat: 193.1, team: 'St Kilda Saints'},
		{id: 'CD_I294596', name: 'Tim Membrey', pos: 'KEY_FORWARD', rat: 298.3, team: 'St Kilda Saints'},
		{id: 'CD_I295584', name: 'Bradley Hill', pos: 'MIDFIELDER', rat: 255.0, team: 'St Kilda Saints'},
		{id: 'CD_I296205', name: 'Jack Steele', pos: 'MIDFIELDER', rat: 418.5, team: 'St Kilda Saints'},
		{id: 'CD_I296351', name: 'Jack Billings', pos: 'MIDFIELDER', rat: 307.2, team: 'St Kilda Saints'},
		{id: 'CD_I296422', name: 'Callum Wilkie', pos: 'MEDIUM_DEFENDER', rat: 241.4, team: 'St Kilda Saints'},
		{id: 'CD_I297452', name: 'Nick Hind', pos: 'MEDIUM_FORWARD', rat: 180.6, team: 'St Kilda Saints'},
		{id: 'CD_I298091', name: 'Logan Austin', pos: 'KEY_DEFENDER', rat: 14.4, team: 'St Kilda Saints'},
		{id: 'CD_I298265', name: 'Daniel McKenzie', pos: 'MEDIUM_DEFENDER', rat: 153.8, team: 'St Kilda Saints'},
		{id: 'CD_I298421', name: 'Jade Gresham', pos: 'MIDFIELDER', rat: 357.0, team: 'St Kilda Saints'},
		{id: 'CD_I990548', name: 'Jonathon Marsh', pos: 'KEY_FORWARD', rat: 51.7, team: 'St Kilda Saints'},
		{id: 'CD_I991988', name: 'Zak Jones', pos: 'MIDFIELDER', rat: 311.6, team: 'St Kilda Saints'},
		{id: 'CD_I992000', name: 'Jack Lonie', pos: 'MEDIUM_FORWARD', rat: 193.3, team: 'St Kilda Saints'},
		{id: 'CD_I992374', name: 'Dan Butler', pos: 'MEDIUM_FORWARD', rat: 229.8, team: 'St Kilda Saints'},
		{id: 'CD_I992468', name: 'Rowan Marshall', pos: 'RUCK', rat: 467.4, team: 'St Kilda Saints'},
		{id: 'CD_I993480', name: 'Dougal Howard', pos: 'KEY_DEFENDER', rat: 280.8, team: 'St Kilda Saints'},
		{id: 'CD_I993917', name: 'Ben Long', pos: 'MEDIUM_DEFENDER', rat: 226.8, team: 'St Kilda Saints'},
		{id: 'CD_I994389', name: 'Jack Sinclair', pos: 'MIDFIELDER', rat: 355.7, team: 'St Kilda Saints'},
		{id: 'CD_I998134', name: 'Josh Battle', pos: 'MIDFIELDER_FORWARD', rat: 201.4, team: 'St Kilda Saints'}
	]);
var $author$project$Teams$sydneySwansPicks = _List_fromArray(
	[3, 22, 54, 56, 76]);
var $author$project$Teams$sydneySwansPlayers = _List_fromArray(
	[
		{id: 'CD_I1002291', name: 'James Bell', pos: 'MEDIUM_FORWARD', rat: 42.5, team: 'Sydney Swans'},
		{id: 'CD_I1003203', name: 'Hayden McLean', pos: 'KEY_FORWARD', rat: 57.9, team: 'Sydney Swans'},
		{id: 'CD_I1004113', name: 'Will Gould', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Sydney Swans'},
		{id: 'CD_I1004848', name: 'Dylan Stephens', pos: 'MIDFIELDER', rat: 40.3, team: 'Sydney Swans'},
		{id: 'CD_I1004880', name: 'Ben Ronke', pos: 'MEDIUM_FORWARD', rat: 111.8, team: 'Sydney Swans'},
		{id: 'CD_I1004949', name: 'Matthew Ling', pos: 'MEDIUM_DEFENDER', rat: 7.0, team: 'Sydney Swans'},
		{id: 'CD_I1005997', name: 'Elijah Taylor', pos: 'MEDIUM_FORWARD', rat: 15.5, team: 'Sydney Swans'},
		{id: 'CD_I1006028', name: 'Nick Blakey', pos: 'MIDFIELDER_FORWARD', rat: 256.3, team: 'Sydney Swans'},
		{id: 'CD_I1006126', name: 'James Rowbottom', pos: 'MIDFIELDER', rat: 232.2, team: 'Sydney Swans'},
		{id: 'CD_I1006232', name: 'Sam Wicks', pos: 'MEDIUM_FORWARD', rat: 37.3, team: 'Sydney Swans'},
		{id: 'CD_I1008080', name: 'Ryley Stoddart', pos: 'MEDIUM_DEFENDER', rat: 2.9, team: 'Sydney Swans'},
		{id: 'CD_I1008091', name: 'Joel Amartey', pos: 'RUCK', rat: 3.6, team: 'Sydney Swans'},
		{id: 'CD_I1008198', name: 'Tom McCartin', pos: 'KEY_FORWARD', rat: 216.4, team: 'Sydney Swans'},
		{id: 'CD_I1011789', name: 'Brady Rowles', pos: 'MIDFIELDER', rat: 0.0, team: 'Sydney Swans'},
		{id: 'CD_I1011791', name: 'Zac Foot', pos: 'MEDIUM_FORWARD', rat: 3.0, team: 'Sydney Swans'},
		{id: 'CD_I1011936', name: 'Justin McInerney', pos: 'MIDFIELDER', rat: 81.8, team: 'Sydney Swans'},
		{id: 'CD_I1012014', name: 'Chad Warner', pos: 'MEDIUM_FORWARD', rat: 9.5, team: 'Sydney Swans'},
		{id: 'CD_I1012101', name: 'Michael Knoll', pos: 'RUCK', rat: 0.0, team: 'Sydney Swans'},
		{id: 'CD_I1013624', name: 'Harry Reynolds', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Sydney Swans'},
		{id: 'CD_I1019158', name: 'Barry O\'Connor', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'Sydney Swans'},
		{id: 'CD_I240399', name: 'Lance Franklin', pos: 'KEY_FORWARD', rat: 184.8, team: 'Sydney Swans'},
		{id: 'CD_I260382', name: 'Josh P. Kennedy', pos: 'MIDFIELDER', rat: 400.8, team: 'Sydney Swans'},
		{id: 'CD_I290188', name: 'Sam Reid', pos: 'KEY_FORWARD', rat: 290.1, team: 'Sydney Swans'},
		{id: 'CD_I290307', name: 'Dane Rampe', pos: 'KEY_DEFENDER', rat: 395.4, team: 'Sydney Swans'},
		{id: 'CD_I290722', name: 'Sam Gray', pos: 'MEDIUM_FORWARD', rat: 214.5, team: 'Sydney Swans'},
		{id: 'CD_I290778', name: 'Luke Parker', pos: 'MIDFIELDER', rat: 453.7, team: 'Sydney Swans'},
		{id: 'CD_I291848', name: 'Robbie Fox', pos: 'KEY_DEFENDER', rat: 172.0, team: 'Sydney Swans'},
		{id: 'CD_I291978', name: 'Harry Cunningham', pos: 'MEDIUM_DEFENDER', rat: 237.5, team: 'Sydney Swans'},
		{id: 'CD_I294036', name: 'George Hewett', pos: 'MIDFIELDER', rat: 357.9, team: 'Sydney Swans'},
		{id: 'CD_I294469', name: 'Aliir Aliir', pos: 'KEY_DEFENDER', rat: 331.3, team: 'Sydney Swans'},
		{id: 'CD_I294663', name: 'Jackson Thurlow', pos: 'MEDIUM_DEFENDER', rat: 120.5, team: 'Sydney Swans'},
		{id: 'CD_I294737', name: 'Callum Sinclair', pos: 'RUCK', rat: 261.2, team: 'Sydney Swans'},
		{id: 'CD_I295156', name: 'Kaiden Brand', pos: 'KEY_DEFENDER', rat: 81.0, team: 'Sydney Swans'},
		{id: 'CD_I295342', name: 'Jake Lloyd', pos: 'MEDIUM_DEFENDER', rat: 339.5, team: 'Sydney Swans'},
		{id: 'CD_I296211', name: 'Lewis Taylor', pos: 'MEDIUM_FORWARD', rat: 127.0, team: 'Sydney Swans'},
		{id: 'CD_I298144', name: 'Sam Naismith', pos: 'RUCK', rat: 23.6, team: 'Sydney Swans'},
		{id: 'CD_I298539', name: 'Isaac Heeney', pos: 'MEDIUM_FORWARD', rat: 388.1, team: 'Sydney Swans'},
		{id: 'CD_I992242', name: 'Jordan Dawson', pos: 'MEDIUM_DEFENDER', rat: 340.9, team: 'Sydney Swans'},
		{id: 'CD_I993905', name: 'Callum Mills', pos: 'MEDIUM_DEFENDER', rat: 311.9, team: 'Sydney Swans'},
		{id: 'CD_I996442', name: 'Ryan Clarke', pos: 'MIDFIELDER', rat: 178.8, team: 'Sydney Swans'},
		{id: 'CD_I996743', name: 'Lewis Melican', pos: 'KEY_DEFENDER', rat: 152.7, team: 'Sydney Swans'},
		{id: 'CD_I996765', name: 'Tom Papley', pos: 'MEDIUM_FORWARD', rat: 352.9, team: 'Sydney Swans'},
		{id: 'CD_I997100', name: 'Will Hayward', pos: 'MEDIUM_FORWARD', rat: 211.6, team: 'Sydney Swans'},
		{id: 'CD_I997842', name: 'Colin O\'Riordan', pos: 'MEDIUM_DEFENDER', rat: 134.8, team: 'Sydney Swans'},
		{id: 'CD_I998103', name: 'Oliver Florent', pos: 'MIDFIELDER', rat: 297.4, team: 'Sydney Swans'},
		{id: 'CD_I998662', name: 'Jack Maibaum', pos: 'KEY_DEFENDER', rat: 0.0, team: 'Sydney Swans'}
	]);
var $author$project$Teams$westCoastEaglesPicks = _List_fromArray(
	[32, 51, 52, 87]);
var $author$project$Teams$westCoastEaglesPlayers = _List_fromArray(
	[
		{id: 'CD_I1001412', name: 'Anthony Treacy', pos: 'MEDIUM_FORWARD', rat: 0.0, team: 'West Coast Eagles'},
		{id: 'CD_I1002300', name: 'Jarrod Brander', pos: 'MIDFIELDER_FORWARD', rat: 38.0, team: 'West Coast Eagles'},
		{id: 'CD_I1004356', name: 'Brayden Ainsworth', pos: 'MIDFIELDER_FORWARD', rat: 33.1, team: 'West Coast Eagles'},
		{id: 'CD_I1004364', name: 'Liam Ryan', pos: 'MEDIUM_FORWARD', rat: 324.5, team: 'West Coast Eagles'},
		{id: 'CD_I1004385', name: 'Oscar Allen', pos: 'KEY_FORWARD', rat: 289.0, team: 'West Coast Eagles'},
		{id: 'CD_I1005599', name: 'Luke Foley', pos: 'MEDIUM_DEFENDER', rat: 3.3, team: 'West Coast Eagles'},
		{id: 'CD_I1005793', name: 'Jarrod Cameron', pos: 'MEDIUM_FORWARD', rat: 74.9, team: 'West Coast Eagles'},
		{id: 'CD_I1006114', name: 'Bailey J. Williams', pos: 'RUCK', rat: 14.4, team: 'West Coast Eagles'},
		{id: 'CD_I1006550', name: 'Jack Petruccelle', pos: 'MEDIUM_FORWARD', rat: 156.7, team: 'West Coast Eagles'},
		{id: 'CD_I1008282', name: 'Xavier O\'Neill', pos: 'MIDFIELDER_FORWARD', rat: 19.0, team: 'West Coast Eagles'},
		{id: 'CD_I1009353', name: 'Mitch O\'Neill', pos: 'MIDFIELDER', rat: 0.0, team: 'West Coast Eagles'},
		{id: 'CD_I1011243', name: 'Callum Jamieson', pos: 'RUCK', rat: 0.0, team: 'West Coast Eagles'},
		{id: 'CD_I1011437', name: 'Harry Edwards', pos: 'KEY_DEFENDER', rat: 2.9, team: 'West Coast Eagles'},
		{id: 'CD_I1011464', name: 'Ben Johnson', pos: 'MEDIUM_DEFENDER', rat: 0.0, team: 'West Coast Eagles'},
		{id: 'CD_I240283', name: 'Shannon Hurn', pos: 'MEDIUM_DEFENDER', rat: 337.6, team: 'West Coast Eagles'},
		{id: 'CD_I240406', name: 'Josh J. Kennedy', pos: 'KEY_FORWARD', rat: 266.2, team: 'West Coast Eagles'},
		{id: 'CD_I261214', name: 'Will Schofield', pos: 'KEY_DEFENDER', rat: 139.9, team: 'West Coast Eagles'},
		{id: 'CD_I271045', name: 'Nic Naitanui', pos: 'RUCK', rat: 311.5, team: 'West Coast Eagles'},
		{id: 'CD_I280078', name: 'Luke Shuey', pos: 'MIDFIELDER', rat: 454.5, team: 'West Coast Eagles'},
		{id: 'CD_I280959', name: 'Nathan Vardy', pos: 'RUCK', rat: 144.8, team: 'West Coast Eagles'},
		{id: 'CD_I281052', name: 'Mark Hutchings', pos: 'MIDFIELDER_FORWARD', rat: 145.5, team: 'West Coast Eagles'},
		{id: 'CD_I281080', name: 'Brad Sheppard', pos: 'MEDIUM_DEFENDER', rat: 218.4, team: 'West Coast Eagles'},
		{id: 'CD_I281281', name: 'Lewis Jetta', pos: 'MEDIUM_DEFENDER', rat: 295.1, team: 'West Coast Eagles'},
		{id: 'CD_I281373', name: 'Jack Redden', pos: 'MIDFIELDER', rat: 270.2, team: 'West Coast Eagles'},
		{id: 'CD_I290801', name: 'Andrew Gaff', pos: 'MIDFIELDER', rat: 367.6, team: 'West Coast Eagles'},
		{id: 'CD_I290826', name: 'Jamie Cripps', pos: 'MEDIUM_FORWARD', rat: 358.1, team: 'West Coast Eagles'},
		{id: 'CD_I290838', name: 'Jack Darling', pos: 'KEY_FORWARD', rat: 403.6, team: 'West Coast Eagles'},
		{id: 'CD_I291947', name: 'Brendon Ah Chee', pos: 'MEDIUM_FORWARD', rat: 129.6, team: 'West Coast Eagles'},
		{id: 'CD_I292128', name: 'Elliot Yeo', pos: 'MIDFIELDER', rat: 484.4, team: 'West Coast Eagles'},
		{id: 'CD_I294266', name: 'Tom Hickey', pos: 'RUCK', rat: 269.1, team: 'West Coast Eagles'},
		{id: 'CD_I294859', name: 'Jeremy McGovern', pos: 'KEY_DEFENDER', rat: 404.9, team: 'West Coast Eagles'},
		{id: 'CD_I295898', name: 'Tim Kelly', pos: 'MIDFIELDER', rat: 418.4, team: 'West Coast Eagles'},
		{id: 'CD_I296225', name: 'Willie Rioli', pos: 'MEDIUM_FORWARD', rat: 233.4, team: 'West Coast Eagles'},
		{id: 'CD_I296296', name: 'Dom Sheed', pos: 'MIDFIELDER', rat: 349.3, team: 'West Coast Eagles'},
		{id: 'CD_I297668', name: 'Nic Reid', pos: 'MEDIUM_FORWARD', rat: 12.9, team: 'West Coast Eagles'},
		{id: 'CD_I298268', name: 'Liam Duggan', pos: 'MEDIUM_DEFENDER', rat: 254.6, team: 'West Coast Eagles'},
		{id: 'CD_I298298', name: 'Jackson Nelson', pos: 'MEDIUM_DEFENDER', rat: 139.5, team: 'West Coast Eagles'},
		{id: 'CD_I298474', name: 'Francis Watson', pos: 'MEDIUM_DEFENDER', rat: 13.4, team: 'West Coast Eagles'},
		{id: 'CD_I990290', name: 'Tom Barrass', pos: 'KEY_DEFENDER', rat: 341.6, team: 'West Coast Eagles'},
		{id: 'CD_I993820', name: 'Tom Cole', pos: 'MEDIUM_DEFENDER', rat: 204.1, team: 'West Coast Eagles'},
		{id: 'CD_I996554', name: 'Jake Waterman', pos: 'MEDIUM_FORWARD', rat: 141.2, team: 'West Coast Eagles'},
		{id: 'CD_I997823', name: 'Josh Rotham', pos: 'KEY_DEFENDER', rat: 55.1, team: 'West Coast Eagles'},
		{id: 'CD_I998107', name: 'Hamish Brayshaw', pos: 'MEDIUM_FORWARD', rat: 2.5, team: 'West Coast Eagles'},
		{id: 'CD_I998414', name: 'Daniel Venables', pos: 'MEDIUM_FORWARD', rat: 95.8, team: 'West Coast Eagles'},
		{id: 'CD_I998791', name: 'Jamaine Jones', pos: 'MEDIUM_FORWARD', rat: 5.8, team: 'West Coast Eagles'}
	]);
var $author$project$Teams$westernBulldogsPicks = _List_fromArray(
	[13, 36, 49, 85]);
var $author$project$Teams$westernBulldogsPlayers = _List_fromArray(
	[
		{id: 'CD_I1002383', name: 'Callum Porter', pos: 'MIDFIELDER_FORWARD', rat: 1.1, team: 'Western Bulldogs'},
		{id: 'CD_I1002404', name: 'Aaron Naughton', pos: 'KEY_FORWARD', rat: 289.2, team: 'Western Bulldogs'},
		{id: 'CD_I1003130', name: 'Patrick Lipinski', pos: 'MIDFIELDER', rat: 291.6, team: 'Western Bulldogs'},
		{id: 'CD_I1004592', name: 'Tim English', pos: 'RUCK', rat: 350.3, team: 'Western Bulldogs'},
		{id: 'CD_I1004909', name: 'Lachie Young', pos: 'MIDFIELDER', rat: 34.2, team: 'Western Bulldogs'},
		{id: 'CD_I1005000', name: 'Laitham Vandermeer', pos: 'MIDFIELDER_FORWARD', rat: 45.4, team: 'Western Bulldogs'},
		{id: 'CD_I1006127', name: 'Rhylee West', pos: 'MEDIUM_FORWARD', rat: 48.0, team: 'Western Bulldogs'},
		{id: 'CD_I1006130', name: 'Bailey Smith', pos: 'MIDFIELDER', rat: 345.0, team: 'Western Bulldogs'},
		{id: 'CD_I1006303', name: 'Fergus Greene', pos: 'MEDIUM_FORWARD', rat: 10.9, team: 'Western Bulldogs'},
		{id: 'CD_I1006533', name: 'Riley Garcia', pos: 'MIDFIELDER', rat: 0.0, team: 'Western Bulldogs'},
		{id: 'CD_I1008280', name: 'Ed Richards', pos: 'MIDFIELDER_FORWARD', rat: 260.9, team: 'Western Bulldogs'},
		{id: 'CD_I1011803', name: 'Cody Weightman', pos: 'MEDIUM_FORWARD', rat: 8.6, team: 'Western Bulldogs'},
		{id: 'CD_I1011992', name: 'Louis Butler', pos: 'MEDIUM_DEFENDER', rat: 9.1, team: 'Western Bulldogs'},
		{id: 'CD_I270732', name: 'Matthew Suckling', pos: 'MEDIUM_FORWARD', rat: 243.0, team: 'Western Bulldogs'},
		{id: 'CD_I280013', name: 'Jackson Trengove', pos: 'KEY_DEFENDER', rat: 212.9, team: 'Western Bulldogs'},
		{id: 'CD_I281139', name: 'Easton Wood', pos: 'MEDIUM_DEFENDER', rat: 236.9, team: 'Western Bulldogs'},
		{id: 'CD_I290073', name: 'Sam Lloyd', pos: 'MEDIUM_FORWARD', rat: 278.4, team: 'Western Bulldogs'},
		{id: 'CD_I290085', name: 'Taylor Duryea', pos: 'MEDIUM_DEFENDER', rat: 131.0, team: 'Western Bulldogs'},
		{id: 'CD_I290797', name: 'Alex Keath', pos: 'KEY_DEFENDER', rat: 275.6, team: 'Western Bulldogs'},
		{id: 'CD_I290799', name: 'Tom Liberatore', pos: 'MIDFIELDER', rat: 364.5, team: 'Western Bulldogs'},
		{id: 'CD_I291492', name: 'Josh Bruce', pos: 'KEY_FORWARD', rat: 223.3, team: 'Western Bulldogs'},
		{id: 'CD_I291545', name: 'Mitch Wallis', pos: 'MEDIUM_FORWARD', rat: 308.2, team: 'Western Bulldogs'},
		{id: 'CD_I293651', name: 'Hayden Crozier', pos: 'MEDIUM_DEFENDER', rat: 281.6, team: 'Western Bulldogs'},
		{id: 'CD_I294101', name: 'Jason Johannisen', pos: 'MEDIUM_DEFENDER', rat: 350.3, team: 'Western Bulldogs'},
		{id: 'CD_I294557', name: 'Lachie Hunter', pos: 'MIDFIELDER', rat: 362.5, team: 'Western Bulldogs'},
		{id: 'CD_I295136', name: 'Caleb Daniel', pos: 'MEDIUM_DEFENDER', rat: 392.9, team: 'Western Bulldogs'},
		{id: 'CD_I295313', name: 'Lin Jong', pos: 'MIDFIELDER_FORWARD', rat: 54.2, team: 'Western Bulldogs'},
		{id: 'CD_I295467', name: 'Jack Macrae', pos: 'MIDFIELDER', rat: 482.7, team: 'Western Bulldogs'},
		{id: 'CD_I295712', name: 'Tory Dickson', pos: 'MEDIUM_FORWARD', rat: 176.9, team: 'Western Bulldogs'},
		{id: 'CD_I296070', name: 'Ben Cavarra', pos: 'MEDIUM_FORWARD', rat: 15.6, team: 'Western Bulldogs'},
		{id: 'CD_I297373', name: 'Marcus Bontempelli', pos: 'MIDFIELDER', rat: 550.7, team: 'Western Bulldogs'},
		{id: 'CD_I298277', name: 'Billy Gowers', pos: 'MEDIUM_FORWARD', rat: 69.0, team: 'Western Bulldogs'},
		{id: 'CD_I991939', name: 'Zaine Cordy', pos: 'KEY_DEFENDER', rat: 254.0, team: 'Western Bulldogs'},
		{id: 'CD_I991976', name: 'Will Hayes', pos: 'MIDFIELDER', rat: 72.3, team: 'Western Bulldogs'},
		{id: 'CD_I992054', name: 'Roarke Smith', pos: 'MIDFIELDER_FORWARD', rat: 72.9, team: 'Western Bulldogs'},
		{id: 'CD_I992330', name: 'Jordon Sweet', pos: 'RUCK', rat: 0.0, team: 'Western Bulldogs'},
		{id: 'CD_I992351', name: 'Bailey Williams', pos: 'MEDIUM_DEFENDER', rat: 193.5, team: 'Western Bulldogs'},
		{id: 'CD_I993834', name: 'Josh Dunkley', pos: 'MIDFIELDER_FORWARD', rat: 473.4, team: 'Western Bulldogs'},
		{id: 'CD_I993841', name: 'Josh Schache', pos: 'KEY_FORWARD', rat: 150.7, team: 'Western Bulldogs'},
		{id: 'CD_I994410', name: 'Brad Lynch', pos: 'MEDIUM_DEFENDER', rat: 29.9, team: 'Western Bulldogs'},
		{id: 'CD_I996483', name: 'Toby McLean', pos: 'MEDIUM_FORWARD', rat: 294.6, team: 'Western Bulldogs'},
		{id: 'CD_I996708', name: 'Bailey Dale', pos: 'MEDIUM_FORWARD', rat: 141.1, team: 'Western Bulldogs'},
		{id: 'CD_I997316', name: 'Lewis Young', pos: 'KEY_FORWARD', rat: 33.2, team: 'Western Bulldogs'},
		{id: 'CD_I997501', name: 'Ryan Gardner', pos: 'KEY_DEFENDER', rat: 48.0, team: 'Western Bulldogs'},
		{id: 'CD_I998782', name: 'Buku Khamis', pos: 'KEY_DEFENDER', rat: 0.0, team: 'Western Bulldogs'}
	]);
var $author$project$Teams$teams = _List_fromArray(
	[
		{name: 'Adelaide Crows', picks: $author$project$Teams$adelaideCrowsPicks, players: $author$project$Teams$adelaideCrowsPlayers},
		{name: 'Brisbane Lions', picks: $author$project$Teams$brisbaneLionsPicks, players: $author$project$Teams$brisbaneLionsPlayers},
		{name: 'Carlton Blues', picks: $author$project$Teams$carltonBluesPicks, players: $author$project$Teams$carltonBluesPlayers},
		{name: 'Collingwood Magpies', picks: $author$project$Teams$collingwoodMagpiesPicks, players: $author$project$Teams$collingwoodMagpiesPlayers},
		{name: 'Essendon Bombers', picks: $author$project$Teams$essendonBombersPicks, players: $author$project$Teams$essendonBombersPlayers},
		{name: 'Fremantle Dockers', picks: $author$project$Teams$fremantleDockersPicks, players: $author$project$Teams$fremantleDockersPlayers},
		{name: 'Geelong Cats', picks: $author$project$Teams$geelongCatsPicks, players: $author$project$Teams$geelongCatsPlayers},
		{name: 'Gold Coast Suns', picks: $author$project$Teams$goldCoastSunsPicks, players: $author$project$Teams$goldCoastSunsPlayers},
		{name: 'Greater Western Sydney Giants', picks: $author$project$Teams$greaterWesternSydneyGiantsPicks, players: $author$project$Teams$greaterWesternSydneyGiantsPlayers},
		{name: 'Hawthorn Hawks', picks: $author$project$Teams$hawthornHawksPicks, players: $author$project$Teams$hawthornHawksPlayers},
		{name: 'Melbourne Demons', picks: $author$project$Teams$melbourneDemonsPicks, players: $author$project$Teams$melbourneDemonsPlayers},
		{name: 'North Melbourne Kangaroos', picks: $author$project$Teams$northMelbourneKangaroosPicks, players: $author$project$Teams$northMelbourneKangaroosPlayers},
		{name: 'Port Adelaide Power', picks: $author$project$Teams$portAdelaidePowerPicks, players: $author$project$Teams$portAdelaidePowerPlayers},
		{name: 'Richmond Tigers', picks: $author$project$Teams$richmondTigersPicks, players: $author$project$Teams$richmondTigersPlayers},
		{name: 'St Kilda Saints', picks: $author$project$Teams$stKildaSaintsPicks, players: $author$project$Teams$stKildaSaintsPlayers},
		{name: 'Sydney Swans', picks: $author$project$Teams$sydneySwansPicks, players: $author$project$Teams$sydneySwansPlayers},
		{name: 'West Coast Eagles', picks: $author$project$Teams$westCoastEaglesPicks, players: $author$project$Teams$westCoastEaglesPlayers},
		{name: 'Western Bulldogs', picks: $author$project$Teams$westernBulldogsPicks, players: $author$project$Teams$westernBulldogsPlayers}
	]);
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $elm$core$String$toLower = _String_toLower;
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm_community$list_extra$List$Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return $elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2($elm$core$Set$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2($elm$core$Set$insert, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2($elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$unique = function (list) {
	return A4($elm_community$list_extra$List$Extra$uniqueHelp, $elm$core$Basics$identity, $elm$core$Set$empty, list, _List_Nil);
};
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $elm$core$String$words = _String_words;
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('section'),
				A2($elm$html$Html$Attributes$style, 'padding-top', '10px')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h1,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('title is-1')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('AFL Trade Calculator')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'right', '5px'),
								A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
								A2($elm$html$Html$Attributes$style, 'top', '5px'),
								$elm$html$Html$Attributes$class('button is-small is-primary'),
								$elm$html$Html$Events$onClick(
								$author$project$Main$ImportModal(true))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Import Hash')
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$table,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2(
									$elm$core$List$map,
									function (t) {
										return A2(
											$elm$html$Html$td,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('has-text-centered')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$img,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$width(45),
															$elm$html$Html$Attributes$src(
															'svg/' + ($elm$core$String$toLower(
																A2(
																	$elm$core$Maybe$withDefault,
																	'',
																	$elm$core$List$head(
																		$elm$core$String$words(t.name)))) + '.svg'))
														]),
													_List_Nil)
												]));
									},
									$author$project$Teams$teams)),
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2(
									$elm$core$List$map,
									function (t) {
										return A2(
											$elm$html$Html$td,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('has-text-centered')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$input,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$type_('checkbox'),
															$elm$html$Html$Events$onClick(
															$author$project$Main$TeamChecked(t))
														]),
													_List_Nil)
												]));
									},
									$author$project$Teams$teams)),
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2(
									$elm$core$List$map,
									function (t) {
										return A2(
											$elm$html$Html$td,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('has-text-centered'),
													A2($elm$html$Html$Attributes$style, 'padding', '5px'),
													A2($elm$html$Html$Attributes$style, 'font-size', '0.75rem')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(t.name)
												]));
									},
									$author$project$Teams$teams))
							]))
					])),
				A2(
				$elm$html$Html$hr,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin-bottom', '2px')
					]),
				_List_Nil),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('column is-3'),
						A2($elm$html$Html$Attributes$style, 'padding-bottom', '20px'),
						A2($elm$html$Html$Attributes$style, 'padding-left', '0px')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('label')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Player Filter')
							])),
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('text'),
								$elm$html$Html$Attributes$class('input'),
								$elm$html$Html$Events$onInput($author$project$Main$PlayerFilter)
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('columns'),
								A2($elm$html$Html$Attributes$style, 'overflow-x', 'scroll')
							]),
						A2(
							$elm$core$List$map,
							function (t) {
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('column'),
											A2($elm$html$Html$Attributes$style, 'min-width', '350px')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$h5,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('title is-5'),
													A2($elm$html$Html$Attributes$style, 'min-height', '44px'),
													A2($elm$html$Html$Attributes$style, 'margin-bottom', '10px')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(t.name)
												])),
											A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Picks: ')
												])),
											A2(
											$elm$html$Html$tr,
											_List_Nil,
											A2(
												$elm$core$List$map,
												function (p) {
													return A2(
														$elm$html$Html$td,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'padding', '5px')
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$button,
																_List_fromArray(
																	[
																		$elm$html$Html$Attributes$class('button is-small'),
																		$elm$html$Html$Events$onClick(
																		$author$project$Main$PickChecked(
																			_Utils_Tuple2(p, t.name))),
																		$elm$html$Html$Attributes$class(
																		function () {
																			var _v0 = $elm$core$List$length(
																				A2(
																					$elm$core$List$filter,
																					function (p2) {
																						return _Utils_eq(p2, p);
																					},
																					A2($elm$core$List$map, $elm$core$Tuple$first, model.picks_checked)));
																			if (_v0 === 1) {
																				return 'is-black';
																			} else {
																				return 'is-outlined';
																			}
																		}())
																	]),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		$elm$core$String$fromInt(p))
																	]))
															]));
												},
												t.picks)),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'overflow-x', 'scroll'),
													A2($elm$html$Html$Attributes$style, 'max-width', '300px'),
													A2($elm$html$Html$Attributes$style, 'padding-left', '5px')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R1 2021')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R1 2021', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R1 2021')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R2 2021')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R2 2021', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R2 2021')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R3 2021')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R3 2021', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R3 2021')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R4 2021')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R4 2021', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R4 2021')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R1 2022')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R1 2022', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R1 2022')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R2 2022')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R2 2022', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R2 2022')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R3 2022')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R3 2022', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R3 2022')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R4 2022')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R4 2022', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R4 2022')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R1 2023')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R1 2023', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R1 2023')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R2 2023')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R2 2023', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R2 2023')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R3 2023')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R3 2023', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R3 2023')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R4 2023')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R4 2023', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R4 2023')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R1 2024')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R1 2024', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R1 2024')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R2 2024')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R2 2024', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R2 2024')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R3 2024')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R3 2024', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R3 2024')
																]))
														])),
													A2(
													$elm$html$Html$td,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button is-small'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Main$FuturePick, t, 'R4 2024')),
																	$elm$html$Html$Attributes$class(
																	A2(
																		$elm$core$List$member,
																		_Utils_Tuple2('R4 2024', t.name),
																		model.future_picks_checked) ? 'is-black' : 'is-outlined')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('R4 2024')
																]))
														]))
												])),
											A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															A2($elm$html$Html$Attributes$style, 'max-height', '350px'),
															A2($elm$html$Html$Attributes$style, 'overflow-y', 'scroll'),
															A2($elm$html$Html$Attributes$style, 'max-width', '300px')
														]),
													A2(
														$elm$core$List$map,
														function (pl) {
															return A2(
																$elm$html$Html$tr,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		$elm$html$Html$td,
																		_List_Nil,
																		_List_fromArray(
																			[
																				$elm$html$Html$text(pl.name)
																			])),
																		A2(
																		$elm$html$Html$td,
																		_List_fromArray(
																			[
																				A2($elm$html$Html$Attributes$style, 'width', '5px')
																			]),
																		_List_Nil),
																		A2(
																		$elm$html$Html$td,
																		_List_Nil,
																		_List_fromArray(
																			[
																				A2(
																				$elm$html$Html$input,
																				_List_fromArray(
																					[
																						$elm$html$Html$Events$onClick(
																						$author$project$Main$PlayerChecked(pl)),
																						$elm$html$Html$Attributes$type_('checkbox')
																					]),
																				_List_Nil)
																			]))
																	]));
														},
														A2(
															$elm$core$List$filter,
															function (p) {
																return A2($elm$core$String$contains, model.player_filter, p.name);
															},
															A2(
																$elm$core$List$filter,
																function (p) {
																	return !A2($elm$core$List$member, p.name, $author$project$Teams$retiredPlayers);
																},
																$elm$core$List$reverse(
																	A2(
																		$elm$core$List$sortBy,
																		function ($) {
																			return $.rat;
																		},
																		t.players))))))
												]))
										]));
							},
							A2(
								$elm$core$List$sortBy,
								function ($) {
									return $.name;
								},
								model.teams_checked)))
					])),
				A2($elm$html$Html$hr, _List_Nil, _List_Nil),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h4,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('title is-4')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Pick & Player Pool')
							])),
						A2(
						$elm$html$Html$table,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								_Utils_ap(
									A2(
										$elm$core$List$map,
										function (p) {
											return A2(
												$elm$html$Html$td,
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$style, 'padding', '2.5px')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$button,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('button is-small is-outlined'),
																A2($elm$html$Html$Attributes$style, 'width', '60px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																$elm$core$String$fromInt(p.a))
															]))
													]));
										},
										$elm$core$List$sort(model.picks_checked)),
									A2(
										$elm$core$List$map,
										function (p) {
											return A2(
												$elm$html$Html$td,
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$style, 'padding', '2.5px')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$button,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('button is-small is-outlined')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																A2(
																	$elm$core$Maybe$withDefault,
																	'',
																	$elm$core$List$head(
																		$elm$core$List$reverse(
																			$elm$core$String$words(p.b)))) + ('\' ' + p.a))
															]))
													]));
										},
										$elm$core$List$sort(model.future_picks_checked)))),
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								_Utils_ap(
									A2(
										$elm$core$List$map,
										function (p) {
											return A2(
												$elm$html$Html$td,
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$style, 'padding', '2.5px')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$select,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('select'),
																A2($elm$html$Html$Attributes$style, 'width', '60px'),
																$elm$html$Html$Events$onInput(
																A2($author$project$Main$PickGoing, p.a, p.b))
															]),
														A2(
															$elm$core$List$map,
															function (t) {
																return A2(
																	$elm$html$Html$option,
																	_List_Nil,
																	_List_fromArray(
																		[
																			$elm$html$Html$text(t)
																		]));
															},
															_Utils_ap(
																_List_fromArray(
																	['...']),
																A2(
																	$elm$core$List$map,
																	function (n) {
																		return A2(
																			$elm$core$String$join,
																			'',
																			A2(
																				$elm$core$List$map,
																				$elm$core$String$left(1),
																				$elm$core$String$words(n.name)));
																	},
																	A2(
																		$elm$core$List$filter,
																		function (tc) {
																			return !_Utils_eq(tc.name, p.b);
																		},
																		model.teams_checked)))))
													]));
										},
										$elm$core$List$sort(model.picks_checked)),
									A2(
										$elm$core$List$map,
										function (p) {
											return A2(
												$elm$html$Html$td,
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$style, 'padding', '2.5px')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$select,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('select'),
																$elm$html$Html$Events$onInput(
																A2($author$project$Main$FuturePickGoing, p.a, p.b))
															]),
														A2(
															$elm$core$List$map,
															function (t) {
																return A2(
																	$elm$html$Html$option,
																	_List_Nil,
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			A3($elm$core$String$replace, 'Greater Western Sydney', 'GWS', t))
																		]));
															},
															_Utils_ap(
																_List_fromArray(
																	['...']),
																A2(
																	$elm$core$List$map,
																	function ($) {
																		return $.name;
																	},
																	A2(
																		$elm$core$List$filter,
																		function (tc) {
																			return !_Utils_eq(tc.name, p.b);
																		},
																		model.teams_checked)))))
													]));
										},
										$elm$core$List$sort(model.future_picks_checked))))
							])),
						A2(
						$elm$html$Html$table,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('table')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2(
									$elm$core$List$map,
									function (pl) {
										return A2(
											$elm$html$Html$td,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'padding', '5px'),
													$elm$html$Html$Attributes$class('has-text-centered')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$img,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$width(75),
															$elm$html$Html$Attributes$src(
															$author$project$Teams$picLookup(pl))
														]),
													_List_Nil)
												]));
									},
									model.players_checked)),
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2(
									$elm$core$List$map,
									function (pl) {
										return A2(
											$elm$html$Html$td,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'padding', '5px'),
													$elm$html$Html$Attributes$class('has-text-centered')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(pl.name)
												]));
									},
									model.players_checked)),
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2(
									$elm$core$List$map,
									function (pl) {
										return A2(
											$elm$html$Html$td,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'padding', '5px'),
													$elm$html$Html$Attributes$class('has-text-centered')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$select,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('select'),
															$elm$html$Html$Events$onInput(
															$author$project$Main$PlayerGoing(pl))
														]),
													A2(
														$elm$core$List$map,
														function (t) {
															return A2(
																$elm$html$Html$option,
																_List_Nil,
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		A3($elm$core$String$replace, 'Greater Western Sydney', 'GWS', t))
																	]));
														},
														_Utils_ap(
															_List_fromArray(
																['Select One...']),
															A2(
																$elm$core$List$map,
																function ($) {
																	return $.name;
																},
																A2(
																	$elm$core$List$filter,
																	function (tc) {
																		return !_Utils_eq(tc.name, pl.team);
																	},
																	model.teams_checked)))))
												]));
									},
									model.players_checked))
							]))
					])),
				A2($elm$html$Html$hr, _List_Nil, _List_Nil),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('button is-success'),
								$elm$html$Html$Attributes$disabled(
								$elm$core$List$isEmpty(model.picks_going) && ($elm$core$List$isEmpty(model.players_going) && $elm$core$List$isEmpty(model.future_picks_going))),
								$elm$html$Html$Events$onClick(
								$author$project$Main$ExportModal(true))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Overview')
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('modal'),
						$elm$html$Html$Attributes$class(
						function () {
							var _v1 = _Utils_Tuple2(model.import_modal, model.hash);
							if (_v1.a && (_v1.b.$ === 'Nothing')) {
								var _v2 = _v1.b;
								return 'is-active';
							} else {
								return '';
							}
						}())
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('modal-background')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('modal-card'),
								A2($elm$html$Html$Attributes$style, 'min-width', '85vw'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '30px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$textarea,
								_List_fromArray(
									[
										$elm$html$Html$Events$onInput($author$project$Main$ImportHash),
										$elm$html$Html$Attributes$class('textarea'),
										$elm$html$Html$Attributes$value(''),
										$elm$html$Html$Attributes$placeholder('Paste hash here.')
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('modal-close is-large'),
								$elm$html$Html$Events$onClick(
								$author$project$Main$ImportModal(false))
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('modal'),
						$elm$html$Html$Attributes$class(
						model.export_modal ? 'is-active' : '')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('modal-background')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('modal-card'),
								A2($elm$html$Html$Attributes$style, 'min-width', '85vw'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '30px')
							]),
						_List_fromArray(
							[
								function () {
								var teams_involved = $elm$core$List$sort(
									$elm_community$list_extra$List$Extra$unique(
										A2(
											$elm$core$List$map,
											function (t) {
												return A3($elm$core$String$replace, 'GWS', 'Greater Western Sydney', t);
											},
											_Utils_ap(
												A2($elm$core$List$map, $elm$core$Tuple$second, model.players_going),
												_Utils_ap(
													A2($elm$core$List$map, $elm$core$Tuple$second, model.picks_going),
													_Utils_ap(
														A2(
															$elm$core$List$map,
															function (pg) {
																return pg.a.b;
															},
															model.picks_going),
														_Utils_ap(
															A2($elm$core$List$map, $elm$core$Tuple$second, model.future_picks_going),
															A2(
																$elm$core$List$map,
																function (pg) {
																	return pg.a.b;
																},
																model.future_picks_going))))))));
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-card-body')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('columns has-text-centered')
												]),
											A2(
												$elm$core$List$map,
												function (t) {
													var loss_val = ($elm$core$List$sum(
														A2(
															$elm$core$List$map,
															function (pg) {
																return ($author$project$Teams$pickRat(pg.a.a) / 2) | 0;
															},
															A2(
																$elm$core$List$filter,
																function (pg) {
																	return _Utils_eq(pg.a.b, t);
																},
																model.picks_going))) + $elm$core$List$sum(
														A2(
															$elm$core$List$map,
															function (pg) {
																return $author$project$Teams$futurePickRat(pg.a.a);
															},
															A2(
																$elm$core$List$filter,
																function (pg) {
																	return _Utils_eq(pg.a.b, t);
																},
																model.future_picks_going)))) + $elm$core$List$sum(
														A2(
															$elm$core$List$map,
															function (pg) {
																return pg.a.rat;
															},
															A2(
																$elm$core$List$filter,
																function (pg) {
																	return _Utils_eq(pg.a.team, t);
																},
																model.players_going)));
													var gain_val = ($elm$core$List$sum(
														A2(
															$elm$core$List$map,
															function (pg) {
																return ($author$project$Teams$pickRat(pg.a.a) / 2) | 0;
															},
															A2(
																$elm$core$List$filter,
																function (pg) {
																	return _Utils_eq(pg.b, t);
																},
																model.picks_going))) + $elm$core$List$sum(
														A2(
															$elm$core$List$map,
															function (pg) {
																return $author$project$Teams$futurePickRat(pg.a.a);
															},
															A2(
																$elm$core$List$filter,
																function (pg) {
																	return _Utils_eq(pg.b, t);
																},
																model.future_picks_going)))) + $elm$core$List$sum(
														A2(
															$elm$core$List$map,
															function (pg) {
																return pg.a.rat;
															},
															A2(
																$elm$core$List$filter,
																function (pg) {
																	return _Utils_eq(pg.b, t);
																},
																model.players_going)));
													return A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('column')
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$h4,
																_List_fromArray(
																	[
																		$elm$html$Html$Attributes$class('title is-4'),
																		A2($elm$html$Html$Attributes$style, 'min-height', '54px'),
																		A2($elm$html$Html$Attributes$style, 'margin-bottom', '0px')
																	]),
																_List_fromArray(
																	[
																		$elm$html$Html$text(t)
																	])),
																A2(
																$elm$html$Html$img,
																_List_fromArray(
																	[
																		$elm$html$Html$Attributes$width(80),
																		$elm$html$Html$Attributes$src(
																		'svg/' + ($elm$core$String$toLower(
																			A2(
																				$elm$core$Maybe$withDefault,
																				'',
																				$elm$core$List$head(
																					$elm$core$String$words(t)))) + '.svg'))
																	]),
																_List_Nil),
																A2($elm$html$Html$hr, _List_Nil, _List_Nil),
																A2(
																$elm$html$Html$div,
																_List_fromArray(
																	[
																		$elm$html$Html$Attributes$class('columns')
																	]),
																_List_fromArray(
																	[
																		A2(
																		$elm$html$Html$div,
																		_List_fromArray(
																			[
																				$elm$html$Html$Attributes$class('column'),
																				A2($elm$html$Html$Attributes$style, 'background-color', 'lightpink'),
																				A2($elm$html$Html$Attributes$style, 'min-height', '35vh')
																			]),
																		_Utils_ap(
																			_List_fromArray(
																				[
																					A2(
																					$elm$html$Html$h5,
																					_List_fromArray(
																						[
																							$elm$html$Html$Attributes$class('title is-5')
																						]),
																					_List_fromArray(
																						[
																							$elm$html$Html$text('Lose')
																						]))
																				]),
																			A2(
																				$elm$core$List$intersperse,
																				A2($elm$html$Html$br, _List_Nil, _List_Nil),
																				_Utils_ap(
																					A2(
																						$elm$core$List$map,
																						function (pick) {
																							return A2(
																								$elm$html$Html$p,
																								_List_fromArray(
																									[
																										$elm$html$Html$Attributes$class('has-text-centered')
																									]),
																								_List_fromArray(
																									[
																										$elm$html$Html$text(
																										$elm$core$String$fromInt(pick.a.a))
																									]));
																						},
																						A2(
																							$elm$core$List$filter,
																							function (pg) {
																								return _Utils_eq(pg.a.b, t);
																							},
																							model.picks_going)),
																					_Utils_ap(
																						A2(
																							$elm$core$List$map,
																							function (pick) {
																								return A2(
																									$elm$html$Html$p,
																									_List_fromArray(
																										[
																											$elm$html$Html$Attributes$class('has-text-centered')
																										]),
																									_List_fromArray(
																										[
																											$elm$html$Html$text('Their ' + pick.a.a)
																										]));
																							},
																							A2(
																								$elm$core$List$filter,
																								function (pg) {
																									return _Utils_eq(pg.a.b, t);
																								},
																								model.future_picks_going)),
																						A2(
																							$elm$core$List$map,
																							function (pg) {
																								return A2(
																									$elm$html$Html$p,
																									_List_fromArray(
																										[
																											$elm$html$Html$Attributes$class('has-text-centered')
																										]),
																									_List_fromArray(
																										[
																											$elm$html$Html$text(
																											pg.a.name + (' (' + ($author$project$Teams$positionPretty(pg.a.pos) + ')')))
																										]));
																							},
																							A2(
																								$elm$core$List$filter,
																								function (p) {
																									return _Utils_eq(p.a.team, t);
																								},
																								model.players_going))))))),
																		A2(
																		$elm$html$Html$div,
																		_List_fromArray(
																			[
																				$elm$html$Html$Attributes$class('column'),
																				A2($elm$html$Html$Attributes$style, 'background-color', 'lightgreen'),
																				A2($elm$html$Html$Attributes$style, 'min-height', '35vh')
																			]),
																		_Utils_ap(
																			_List_fromArray(
																				[
																					A2(
																					$elm$html$Html$h5,
																					_List_fromArray(
																						[
																							$elm$html$Html$Attributes$class('title is-5')
																						]),
																					_List_fromArray(
																						[
																							$elm$html$Html$text('Gain')
																						]))
																				]),
																			A2(
																				$elm$core$List$intersperse,
																				A2($elm$html$Html$br, _List_Nil, _List_Nil),
																				_Utils_ap(
																					A2(
																						$elm$core$List$map,
																						function (pick) {
																							return A2(
																								$elm$html$Html$p,
																								_List_fromArray(
																									[
																										$elm$html$Html$Attributes$class('has-text-centered')
																									]),
																								_List_fromArray(
																									[
																										$elm$html$Html$text(
																										$elm$core$String$fromInt(pick.a.a))
																									]));
																						},
																						A2(
																							$elm$core$List$filter,
																							function (pg) {
																								return _Utils_eq(pg.b, t);
																							},
																							model.picks_going)),
																					_Utils_ap(
																						A2(
																							$elm$core$List$map,
																							function (pick) {
																								return A2(
																									$elm$html$Html$p,
																									_List_fromArray(
																										[
																											$elm$html$Html$Attributes$class('has-text-centered')
																										]),
																									_List_fromArray(
																										[
																											$elm$html$Html$text(
																											A2(
																												$elm$core$Maybe$withDefault,
																												'',
																												$elm$core$List$head(
																													$elm$core$List$reverse(
																														$elm$core$String$words(pick.a.b)))) + ('\' ' + pick.a.a))
																										]));
																							},
																							A2(
																								$elm$core$List$filter,
																								function (pg) {
																									return _Utils_eq(pg.b, t);
																								},
																								model.future_picks_going)),
																						A2(
																							$elm$core$List$map,
																							function (pg) {
																								return A2(
																									$elm$html$Html$p,
																									_List_fromArray(
																										[
																											$elm$html$Html$Attributes$class('has-text-centered')
																										]),
																									_List_fromArray(
																										[
																											$elm$html$Html$text(
																											pg.a.name + (' (' + ($author$project$Teams$positionPretty(pg.a.pos) + ')')))
																										]));
																							},
																							A2(
																								$elm$core$List$filter,
																								function (pg) {
																									return _Utils_eq(pg.b, t);
																								},
																								model.players_going)))))))
																	])),
																A2(
																$elm$html$Html$div,
																_List_fromArray(
																	[
																		$elm$html$Html$Attributes$title(
																		$elm$core$String$fromFloat(gain_val - loss_val))
																	]),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		'Net Value: ' + $elm$core$String$fromInt(
																			$elm$core$Basics$round(gain_val - loss_val)))
																	]))
															]));
												},
												teams_involved)),
											A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Net value is calculated from the AFL Player Ratings for players, and the Draft Pick Value Chart for picks.')
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'display', 'flex')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('button is-link is-small'),
															$elm$html$Html$Events$onClick($author$project$Main$CalculateHash)
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Copy hash to clipboard.')
														])),
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															A2($elm$html$Html$Attributes$style, 'padding-left', '5px'),
															A2($elm$html$Html$Attributes$style, 'font-size', '0.8rem'),
															A2($elm$html$Html$Attributes$style, 'padding-top', '10px'),
															A2(
															$elm$html$Html$Attributes$style,
															'color',
															function () {
																var _v3 = model.copied;
																if (_v3.$ === 'Just') {
																	return 'green';
																} else {
																	return 'black';
																}
															}())
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															function () {
																var _v4 = model.copied;
																if (_v4.$ === 'Just') {
																	var str = _v4.a;
																	return 'Copied Hash of ' + ($elm$core$String$fromInt(
																		($elm$core$String$length(str) / 1000) | 0) + 'kb size to clipboard.');
																} else {
																	return 'This produces a compressed string of the current trade, it is recommended to share this via a pastebin.';
																}
															}())
														]))
												]))
										]));
							}()
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('modal-close is-large'),
								$elm$html$Html$Events$onClick(
								$author$project$Main$ExportModal(false))
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$tr,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
						A2($elm$html$Html$Attributes$style, 'padding-bottom', '10px'),
						A2($elm$html$Html$Attributes$style, 'bottom', '0px'),
						A2($elm$html$Html$Attributes$style, 'background-color', 'white')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('v1.0.1, Developed by Durfsurn, 2020')
							])),
						A2(
						$elm$html$Html$td,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'width', '5px')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('button is-link is-small'),
										$elm$html$Html$Attributes$href('mailto:durfsurn@gmail.com')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Report Issues ⚠️')
									]))
							]))
					]))
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));
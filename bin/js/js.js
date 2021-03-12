'use strict';
const js$core$MAX_SAFE_INTEGER$static = 9007199254740991;
const js$core$MIN_SAFE_INTEGER$static = -9007199254740991;
function js$core$string$type($) {
   return true;
}
function js$core$integer$type(x) {
   return (js$core$MIN_SAFE_INTEGER$static <= x) && (x <= js$core$MAX_SAFE_INTEGER$static);
}
function js$core$uinteger$type(x) {
   return (0 <= x) && (x <= js$core$MAX_SAFE_INTEGER$static);
}
function js$core$number$type(x) {
   return true;
}
function js$date$day$type(x) {
   return (x >= 0) && (x <= 6);
}
function js$date$month$type(x) {
   return (x >= 1) && (x <= 31);
}
function js$JSON$parse(str) {
    return JSON.parse(str);
}

function js$JSON$stringify(item) {
    return JSON.stringify(item);
}
function js$core$append$Q6stringQ6string$Q6string(lhs, rhs) {
    return lhs + rhs;
}

function js$core$append$Q6stringQ3intQ6string(lhs, rhs) {
    return lhs + rhs;
}

function js$core$append$Q3intQ6numberQ6string(lhs, rhs) {
    return lhs + rhs;
}


function js$core$append$Q6stringQ6number$Q6string(lhs, rhs) {
    return lhs + rhs;
}

function js$core$append$Q6numberQ6string$Q6string(lhs, rhs) {
    return lhs + rhs;
}
function js$date$now() {
    return Date.now();
}

function js$date$Date(ms) {
    return new Date(ms);
}
function js$math$abs(x) {
    return Math.abs(x);
}

function js$math$sin(radians) {
    return Math.sin(radians)
}

function js$math$cos(radians) {
    return Math.sin(radians)    
}

function js$math$to_radians(degrees) {
    return (degrees * Math.PI) / 180;
}

function js$math$random(magnitude) {
    // Generate random integer between 0 and magnitude.
    return Math.floor(Math.random() * magnitude);
}
/**
 * The module Wy contains various runtime support functions necessary
 * for implementing the Whiley language in JavaScript.
 */
var Wy = {};

/**
 *
 */
Wy.array = function(val, len) {
    var arr = [];
    for(var i=0;i<len;i=i+1) {
	arr[i] = val;
    }
    return arr;
};

/**
 * Provide a generic mechanism for raising assertions
 */
Wy.assert = function(result) {
    if(!result) {
	// Assertion failed, now try to raise exception
	if(typeof console !== "undefined") {
	    // Use console assert (if available)
	    console.assert(false);
	} else {
	    throw "assertion failure";
	}
    }
};

/**
 * Clone an arbitrary value or object.  This is a deep clone,
 * meaning that nested references are also cloned.
 */
Wy.copy = function(obj) {
    if (null == obj || "object" != typeof obj) {
	// Handle primitive types
	return obj;
    } else if(obj.constructor === Array) {
	// Clone whiley arrays by recursively (i.e. deep) cloning
	// all elements.
	var r = [];
	for(var i=0;i!=obj.length;++i) {
	    r[i] = Wy.copy(obj[i]);
	}
	return r;
    } else if(obj.constructor == Wy.Record) {
	// Clone whiley records by recursively (i.e. deep) cloning
	// all fields.
	var r = new Wy.Record({});
	for(var p in obj) {
	    r[p] = Wy.copy(obj[p]);
	}
	return r;
    } else {
	// This represents everything else, including Whiley
	// references and external JS references.
	return obj;
    }
};

/**
 * Provide a generic equality method for objects.
 */
Wy.equals = function(o1, o2) {
    if(o1 === o2) {
	return true;
    } else if(o1 == null || o2 == null) {
	// One is null, and other is not
	return false;
    } else if((typeof o1) == "object" || (typeof o2) == "object") {
	if((typeof o1) == "string") {
	    return Wy.strObjEquals(o1,o2);
	} else if((typeof o2) == "string") {
	    return Wy.strObjEquals(o2,o1);
	} else {
	    return Wy.objObjEquals(o1,o2);
	}
    } else {
	// Primitive types cannot be equal.
	return false;
    }
};

/**
 * Check whether a string and an object are equal, assuming neither is
 * null.
 */
Wy.strObjEquals = function(s1,o2){
    if(s1.length != o2.length) {
	return false;
    } else {
	for (var i = 0; i < s1.length; i++) {
	    if (s1.charCodeAt(i) != o2[i]) {	
		return false;
	    }
	}
	return true;	    
    }
};

/**
 * Check whether two objects (e.g. arrays or records) are equal,
 * assuming neither is null.
 */
Wy.objObjEquals = function(o1,o2) {
    var o1Fields = Object.getOwnPropertyNames(o1);
    var o2Fields = Object.getOwnPropertyNames(o2);
    // Check whether same number of fields
    if (o1Fields.length != o2Fields.length) {
	// No, different numbers of fields
	return false;
    } else {
	// Now, compare fields
	for (var i = 0; i < o1Fields.length; i++) {
	    var field = o1Fields[i];
	    //
	    if (!Wy.equals(o1[field],o2[field])) {
		// Values for this field not equal, hence
		// entire recordnot equal.
		return false;
	    }
	}
    }
    // Done
    return true;
};

/**
 * Whiley record constructor.
 */
Wy.Record = function(x) {
    for(var prop in x) {
	this[prop] = x[prop];
    }
};

/**
 * Whiley reference constuctor.
 */
Wy.Ref = function(x) {
    this.$ref = x;
};

/**
 * Convert a Whiley string into a JavaScript string.  This is done by
 * converting each character code in the array into a JavaScript
 * string character.
 */
Wy.fromString = function(whileyString) {
    var result = "";
    for (var i = 0; i < whileyString.length; i++) {
	result += String.fromCharCode(whileyString[i]);
    }
    return result;
}

/**
 * Convert a JavaScript string into a Whiley string.  
 */
Wy.toString = function(jsString) {
    var result = [];
    for (var i = 0; i < jsString.length; i++) {
	result.push(jsString.charCodeAt(i));
    }
    return result;
}

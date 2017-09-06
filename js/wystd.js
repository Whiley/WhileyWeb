
function resize_aIII(items, size, element) {
    var nitems = Wy.array(element, size);
    var i = 0;
    while((i < size) && (i < items.length)) {
        nitems[i] = items[i];
        i = i + 1;
    }
    return nitems;
}

function indexOf_aII(items, item) {
    return indexOf_aIII(Wy.copy(items), item, 0);
}

function indexOf_aIII(items, item, start) {
    var i = start;
    while(i < items.length) {
        if(items[i] == item) {
            return i;
        }
        i = i + 1;
    }
    return null;
}

function lastIndexOf_aII(items, item) {
    var i = items.length;
    while(i > 0) {
        i = i - 1;
        if(items[i] == item) {
            return i;
        }
    }
    return null;
}

function replace_aIII(items, old, n) {
    var i = 0;
    var oldItems = Wy.copy(items);
    while(i < items.length) {
        if(oldItems[i] == old) {
            items[i] = n;
        }
        i = i + 1;
    }
    return items;
}

function slice_aIII(items, start, end) {
    var nitems = Wy.array(0, end - start);
    var i = 0;
    while(i < nitems.length) {
        nitems[i] = items[i + start];
        i = i + 1;
    }
    return nitems;
}

function append_aIaI(lhs, rhs) {
    var rs = Wy.array(0, lhs.length + rhs.length);
    var i = lhs.length;
    while(i > 0) {
        i = i - 1;
        rs[i] = lhs[i];
    }
    while(i < rhs.length) {
        rs[i + lhs.length] = rhs[i];
        i = i + 1;
    }
    return rs;
}

function append_aII(items, item) {
    var nitems = Wy.array(0, items.length + 1);
    var i = 0;
    while(i < items.length) {
        nitems[i] = items[i];
        i = i + 1;
    }
    nitems[i] = item;
    return nitems;
}

function append_IaI(item, items) {
    var nitems = Wy.array(0, items.length + 1);
    var i = 0;
    while(i < items.length) {
        nitems[i + 1] = items[i];
        i = i + 1;
    }
    nitems[0] = item;
    return nitems;
}

function append_aBaB(lhs, rhs) {
    var rs = Wy.array(false, lhs.length + rhs.length);
    var i = lhs.length;
    while(i > 0) {
        i = i - 1;
        rs[i] = lhs[i];
    }
    while(i < rhs.length) {
        rs[i + lhs.length] = rhs[i];
        i = i + 1;
    }
    return rs;
}

function append_aBB(items, item) {
    var nitems = Wy.array(false, items.length + 1);
    var i = 0;
    while(i < items.length) {
        nitems[i] = items[i];
        i = i + 1;
    }
    nitems[i] = item;
    return nitems;
}

function append_BaB(item, items) {
    var nitems = Wy.array(false, items.length + 1);
    var i = 0;
    while(i < items.length) {
        nitems[i + 1] = items[i];
        i = i + 1;
    }
    nitems[0] = item;
    return nitems;
}

function copy_aIIaIII(src, srcStart, dest, destStart, length) {
    var i = srcStart;
    var j = destStart;
    var srcEnd = srcStart + length;
    while(i < srcEnd) {
        dest[j] = src[i];
        i = i + 1;
        j = j + 1;
    }
    return dest;
}


var NUL = 0;
var SOH = 1;
var STX = 2;
var ETX = 3;
var EOT = 4;
var ENQ = 5;
var ACK = 6;
var BEL = 7;
var BS = 8;
var HT = 9;
var LF = 10;
var VT = 11;
var FF = 12;
var CR = 13;
var SO = 14;
var SI = 15;
var DLE = 16;
var DC1 = 17;
var DC2 = 18;
var DC3 = 19;
var DC4 = 20;
var NAK = 21;
var SYN = 22;
var ETB = 23;
var CAN = 24;
var EM = 25;
var SUB = 26;
var ESC = 27;
var FS = 28;
var GS = 29;
var RS = 30;
var US = 31;
var DEL = 127;

function char$(x) {
    return (0 <= x) && (x <= 127);
}

function letter$(x) {
    return ((97 <= x) && (x <= 122)) || ((65 <= x) && (x <= 90));
}

function uppercase$(x) {
    return (65 <= x) && (x <= 90);
}

function lowercase$(x) {
    return (97 <= x) && (x <= 122);
}

function digit$(x) {
    return (48 <= x) && (x <= 57);
}

function string$($) {
    return true;
}

function toByte_n4char(v) {
    var mask = parseInt('1',2);
    var r = parseInt('0',2);
    var i = 0;
    while(i < 8) {
        if((v % 2) == 1) {
            r = r | mask;
        }
        v = Math.floor(v / 2);
        mask = ((mask << 1) & 0xFF);
        i = i + 1;
    }
    return r;
}

function toBytes_n6string(s) {
    var r = Wy.array(parseInt('0',2), s.length);
    var i = 0;
    while(i < s.length) {
        r[i] = toByte_n4char(s[i]);
        i = i + 1;
    }
    return r;
}

function fromBytes_aU(data) {
    var r = Wy.array(0, data.length);
    var i = 0;
    while(i < data.length) {
        r[i] = toInt_U(data[i]);
        i = i + 1;
    }
    return r;
}

function append_n6stringn6string(s1, s2) {
    var s3 = Wy.array(0, s1.length + s2.length);
    var i = 0;
    while(i < s3.length) {
        if(i < s1.length) {
            s3[i] = s1[i];
        } else {
            s3[i] = s2[i - s1.length];
        }
        i = i + 1;
    }
    return s3;
}

function isUpperCase_n4char(c) {
    return (65 <= c) && (c <= 90);
}

function isLowerCase_n4char(c) {
    return (97 <= c) && (c <= 122);
}

function isLetter_n4char(c) {
    return ((97 <= c) && (c <= 122)) || ((65 <= c) && (c <= 90));
}

function isDigit_n4char(c) {
    return (48 <= c) && (c <= 57);
}

function isWhiteSpace_n4char(c) {
    return (c == 32) || ((c == 9) || ((c == 10) || (c == 13)));
}

function toString_I(item) {
    var sign;
    if(item < 0) {
        sign = false;
        item = -item;
    } else {
        sign = true;
    }
    var tmp = item;
    var digits = 0;
    do {
        tmp = Math.floor(tmp / 10);
        digits = digits + 1;
    } while(tmp != 0);
    var r = Wy.array(48, digits);
    do {
        var remainder = item % 10;
        item = Math.floor(item / 10);
        var digit = 48 + remainder;
        digits = digits - 1;
        r[digits] = digit;
    } while(item != 0);
    if(sign) {
        return r;
    } else {
        return append_n6stringn6string([45], Wy.copy(r));
    }
}

function parseInt_n6string(input) {
    var start = 0;
    var negative;
    if(input[0] == 45) {
        negative = true;
        start = start + 1;
    } else {
        negative = false;
    }
    var r = 0;
    var i = start;
    while(i < input.length) {
        var c = input[i];
        r = r * 10;
        if(!isDigit_n4char(c)) {
            return null;
        }
        r = r + (c - 48);
        i = i + 1;
    }
    if(negative) {
        return -r;
    } else {
        return r;
    }
}


function Stack$($) {
    return true;
}

function Stack_I(max) {
    return Wy.record({items: Wy.array(0, max), length: 0});
}

function size_n5Stack(stack) {
    return stack.length;
}

function top_n5Stack(stack) {
    return stack.items[stack.length - 1];
}

function push_n5StackI(stack, element) {
    stack.items[stack.length] = element;
    stack.length = stack.length + 1;
    return stack;
}

function pop_n5Stack(stack) {
    stack.length = stack.length - 1;
    return stack;
}


var READONLY = 0;
var READWRITE = 1;

function uint$(x) {
    return x >= 0;
}

function File$($) {
    return true;
}

function rwMode$(x) {
    return (x == 0) || (x == 1);
}

function open_n6stringn6rwMode(fileName, mode) {
}


function i8$(x) {
    return (x >= -128) && (x <= 127);
}

function i16$(x) {
    return (x >= -32768) && (x <= 32768);
}

function i32$(x) {
    return (x >= -2147483648) && (x <= 2147483647);
}

function i64$(x) {
    return (x >= -9223372036854775808) && (x <= 9223372036854775807);
}

function u8$(x) {
    return (x >= 0) && (x <= 255);
}

function u16$(x) {
    return (x >= 0) && (x <= 65535);
}

function u32$(x) {
    return (x >= 0) && (x <= 4294967295);
}

function u64$(x) {
    return (x >= 0) && (x <= 18446744073709551615);
}

function uint$(x) {
    return x >= 0;
}

function nat$(x) {
    return x >= 0;
}

function toUnsignedByte_n2u8(v) {
    var mask = parseInt('1',2);
    var r = parseInt('0',2);
    var i = 0;
    while(i < 8) {
        if((v % 2) == 1) {
            r = r | mask;
        }
        v = Math.floor(v / 2);
        mask = ((mask << 1) & 0xFF);
        i = i + 1;
    }
    return r;
}

function toSignedByte_n2i8(v) {
    if(v < 0) {
        v = v + 256;
    }
    return toUnsignedByte_n2u8(v);
}

function toString_U(b) {
    var r = Wy.array(0, 98);
    var i = 0;
    while(i < 8) {
        if((b & parseInt('1',2)) == parseInt('1',2)) {
            r[7 - i] = 49;
        } else {
            r[7 - i] = 48;
        }
        b = ((b >> 1) & 0xFF);
        i = i + 1;
    }
    return r;
}

function toUnsignedInt_U(b) {
    var r = 0;
    var base = 1;
    while(b != parseInt('0',2)) {
        if((b & parseInt('1',2)) == parseInt('1',2)) {
            r = r + base;
        }
        b = ((b >> 1) & 0xFF);
        base = base * 2;
    }
    return r;
}

function toUnsignedInt_aU(bytes) {
    var val = 0;
    var base = 1;
    var i = 0;
    while(i < bytes.length) {
        var v = toUnsignedInt_U(bytes[i]) * base;
        val = val + v;
        base = base * 256;
        i = i + 1;
    }
    return val;
}

function toInt_U(b) {
    var r = 0;
    var base = 1;
    while(b != parseInt('0',2)) {
        if((b & parseInt('1',2)) == parseInt('1',2)) {
            r = r + base;
        }
        b = ((b >> 1) & 0xFF);
        base = base * 2;
    }
    if(r >= 128) {
        return -(256 - r);
    } else {
        return r;
    }
}

function toInt_aU(bytes) {
    var val = 0;
    var base = 1;
    var i = 0;
    while(i < bytes.length) {
        var v = toUnsignedInt_U(bytes[i]) * base;
        val = val + v;
        base = base * 256;
        i = i + 1;
    }
    if(val >= (Math.floor(base / 2))) {
        return -(base - val);
    } else {
        return val;
    }
}


function uint$(x) {
    return x >= 0;
}

function Reader$($) {
    return true;
}

function Writer$($) {
    return true;
}

function print_I(value) {
    Wy.print(value);
}

function print_n6string(value) {
    Wy.print(value);
}

function println_I(value) {
    Wy.println(value);
}

function println_n6string(value) {
    Wy.println(value);
}


function abs_I(x) {
    if(x < 0) {
        return -x;
    } else {
        return x;
    }
}

function max_II(a, b) {
    if(a < b) {
        return b;
    } else {
        return a;
    }
}

function min_II(a, b) {
    if(a > b) {
        return b;
    } else {
        return a;
    }
}

function pow_II(base, exponent) {
    var r = 1;
    var i = 0;
    while(i < exponent) {
        r = r * base;
        i = i + 1;
    }
    return r;
}

function isqrt_I(x) {
    var square = 1;
    var delta = 3;
    while(square <= x) {
        square = square + delta;
        delta = delta + 2;
    }
    return (Math.floor(delta / 2)) - 1;
}


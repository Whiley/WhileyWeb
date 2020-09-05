'use strict';
function std$array$equals$av1Tav1TII$B(lhs, rhs, start, end) {
   return ((lhs.length >= end) && (rhs.length >= end)) && function() {
      for(let i = start;i < end;i = i + 1) {
         if(!Wy.equals(lhs[i], rhs[i]))  {
            return false;
         }
      }
      return true;
   }();
}
function std$array$equals$av1TIav1TII$B(l, l_start, r, r_start, length) {
   return ((l.length >= (l_start + length)) && (r.length >= (r_start + length))) && function() {
      for(let i = 0;i < length;i = i + 1) {
         if(!Wy.equals(l[l_start + i], r[r_start + i]))  {
            return false;
         }
      }
      return true;
   }();
}
function std$array$contains$av1Tv1TII$B(lhs, item, start, end) {
   return function() {
      for(let i = start;i < end;i = i + 1) {
         if(Wy.equals(lhs[i], item))  {
            return true;
         }
      }
      return false;
   }();
}
function std$array$matches$av1Tav1T$B(arr, subseq) {
   return std$array$matches$av1Tav1TII$B(Wy.copy(arr), Wy.copy(subseq), 0, arr.length);
}
function std$array$matches$av1Tav1TII$B(arr, subseq, start, end) {
   return function() {
      for(let i = start;i < end;i = i + 1) {
         if(std$array$equals$av1TIav1TII$B(Wy.copy(arr), i, Wy.copy(subseq), 0, subseq.length))  {
            return true;
         }
      }
      return false;
   }();
}
function std$array$first_match$av1Tav1TI$B(arr, subseq, index) {
   return std$array$equals$av1TIav1TII$B(Wy.copy(arr), index, Wy.copy(subseq), 0, subseq.length) && (!std$array$matches$av1Tav1TII$B(Wy.copy(arr), Wy.copy(subseq), 0, index));
}
function std$array$unique_elements$av1TI$B(items, end) {
   return function() {
      for(let i = 0;i < end;i = i + 1) {
         for(let j = i + 1;j < end;j = j + 1) {
            if(!(!Wy.equals(items[i], items[j])))  {
               return false;
            }
         }
      }
      return true;
   }();
}
function std$array$first_index_of$av1Tv1T$u2Q4uintN(items, item) {
   let index;
   return std$array$first_index_of$av1Tv1TQ4uint$u2Q4uintN(Wy.copy(items), Wy.copy(item), 0);
}
function std$array$first_index_of$av1Tv1TQ4uint$u2Q4uintN(items, item, start) {
   let index;
   for(let i = start;i < items.length;i = i + 1) {
      if(Wy.equals(items[i], item))  {
         return i;
      }
   }
   return null;
}
function std$array$first_index_of$av1Tav1T$u2Q4uintN(items, item) {
   let index;
   return std$array$first_index_of$av1Tav1TQ4uint$u2Q4uintN(Wy.copy(items), Wy.copy(item), 0);
}
function std$array$first_index_of$av1Tav1TQ4uint$u2Q4uintN(items, item, start) {
   let index;
   let i = start;
   while(i <= (items.length - item.length))  {
      let j = 0;
      while(j < item.length)  {
         if(!Wy.equals(items[i + j], item[j]))  {
            break;
         }
          {
            const $0 = j + 1;
            j = $0;
         }
      }
      if(j === item.length)  {
         return i;
      }
       {
         const $1 = i + 1;
         i = $1;
      }
   }
   return null;
}
function std$array$last_index_of$av1Tv1T$u2Q4uintN(items, item) {
   let index;
   let i = items.length;
   while(i > 0)  {
       {
         const $2 = i - 1;
         i = $2;
      }
      if(Wy.equals(items[i], item))  {
         return i;
      }
   }
   return null;
}
function std$array$replace_all$av1Tv1Tv1T$av1T(items, old, n) {
   let r;
   let oldItems = Wy.copy(items);
   for(let i = 0;i < items.length;i = i + 1) {
      if(Wy.equals(oldItems[i], old))  {
         items[i] = Wy.copy(n);
      }
   }
   return Wy.copy(items);
}
function std$array$replace_first$av1Tv1Tv1T$av1T(items, old, n) {
   let r;
   let oldItems = Wy.copy(items);
   for(let i = 0;i < items.length;i = i + 1) {
      if(Wy.equals(oldItems[i], old))  {
         items[i] = Wy.copy(n);
         return Wy.copy(items);
      }
   }
   return Wy.copy(items);
}
function std$array$replace_first$av1Tav1Tav1T$av1T(items, old, n) {
   let r;
   let i = std$array$first_index_of$av1Tav1T$u2Q4uintN(Wy.copy(items), Wy.copy(old));
   if(i === null)  {
      return Wy.copy(items);
   } else  {
      if(old.length === n.length)  {
         return std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(n), 0, Wy.copy(items), i, old.length);
      } else  {
         let size = (items.length - old.length) + n.length;
         let nitems = std$array$resize$av1TI$av1T(Wy.copy(items), size);
          {
            const $3 = std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(n), 0, Wy.copy(nitems), i, n.length);
            nitems = $3;
         }
         let remainder = (size - i) - n.length;
         return std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(items), i + old.length, Wy.copy(nitems), i + n.length, remainder);
      }
   }
}
function std$array$replace_all$av1Tav1Tav1T$av1T(items, old, n) {
   let r;
   while(std$array$first_index_of$av1Tav1T$u2Q4uintN(Wy.copy(items), Wy.copy(old)) !== null)  {
       {
         const $4 = std$array$replace_first$av1Tav1Tav1T$av1T(Wy.copy(items), Wy.copy(old), Wy.copy(n));
         items = $4;
      }
   }
   return Wy.copy(items);
}
function std$array$replace$av1Tav1Taav1T$av1T(items, old, nn) {
   let r;
   let i = 0;
   while((i < nn.length) && (std$array$first_index_of$av1Tav1T$u2Q4uintN(Wy.copy(items), Wy.copy(old)) !== null))  {
       {
         const $5 = std$array$replace_first$av1Tav1Tav1T$av1T(Wy.copy(items), Wy.copy(old), Wy.copy(nn[i]));
         items = $5;
      }
       {
         const $6 = i + 1;
         i = $6;
      }
   }
   return Wy.copy(items);
}
function std$array$slice$av1TQ4uintQ4uint$av1T(items, start, end) {
   let r;
   if(start === end)  {
      return [];
   } else  {
      let nitems = Wy.array(items[0], end - start);
      return std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(items), start, Wy.copy(nitems), 0, nitems.length);
   }
}
function std$array$append$av1Tav1T$av1T(lhs, rhs) {
   let r;
   if(lhs.length === 0)  {
      return Wy.copy(rhs);
   } else  {
      let rs = std$array$resize$av1TIv1T$av1T(Wy.copy(lhs), lhs.length + rhs.length, Wy.copy(lhs[0]));
      return std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(rhs), 0, Wy.copy(rs), lhs.length, rhs.length);
   }
}
function std$array$append$av1Tv1T$av1T(items, item) {
   let r;
   let nitems = Wy.array(item, items.length + 1);
   for(let i = 0;i < items.length;i = i + 1) {
      nitems[i] = Wy.copy(items[i]);
   }
   return Wy.copy(nitems);
}
function std$array$append$v1Tav1T$av1T(item, items) {
   let r;
   let nitems = Wy.array(item, items.length + 1);
   for(let i = 0;i < items.length;i = i + 1) {
      nitems[i + 1] = Wy.copy(items[i]);
   }
   return Wy.copy(nitems);
}
function std$array$resize$av1TI$av1T(src, size) {
   let result;
   if(src.length === 0)  {
      return Wy.copy(src);
   } else  {
      result = Wy.array(src[0], size);
      for(let i = 0;i < size;i = i + 1) {
         result[i] = Wy.copy(src[i]);
      }
      return Wy.copy(result);
   }
}
function std$array$resize$av1TIv1T$av1T(items, size, item) {
   let result;
   let nitems = Wy.array(item, size);
   let i = 0;
   while((i < size) && (i < items.length))  {
      nitems[i] = Wy.copy(items[i]);
       {
         const $7 = i + 1;
         i = $7;
      }
   }
   return Wy.copy(nitems);
}
function std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(src, srcStart, dest, destStart, length) {
   let result;
   let j = destStart;
   let srcEnd = srcStart + length;
   for(let i = srcStart;i < srcEnd;i = i + 1) {
      dest[j] = Wy.copy(src[i]);
       {
         const $8 = j + 1;
         j = $8;
      }
   }
   return Wy.copy(dest);
}
function std$array$remove$av1TQ4uint$av1T(src, ith) {
   let result;
   result = Wy.array(src[0], src.length - 1);
    {
      const $9 = std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(src), 0, Wy.copy(result), 0, ith);
      result = $9;
   }
   return std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(src), ith + 1, Wy.copy(result), ith, result.length - ith);
}
function std$array$swap$av1TQ4uintQ4uint$av1T(src, ith, jth) {
   let result;
   let tmp = Wy.copy(src[ith]);
    {
      const $10 = Wy.copy(src[jth]);
      src[ith] = $10;
   }
   src[jth] = Wy.copy(tmp);
   return Wy.copy(src);
}
function std$array$map$av1Sfv1Sv1T$av1T(items, fn) {
   let r;
   if(items.length === 0)  {
      return [];
   } else  {
      let nitems = Wy.array(fn(Wy.copy(items[0])), items.length);
      for(let i = 1;i < nitems.length;i = i + 1) {
         nitems[i] = fn(Wy.copy(items[i]));
      }
      return Wy.copy(nitems);
   }
}
function std$array$filter$av1Tfv1TB$av1T(items, fn) {
   let r;
   const len = items.length;
   let j = 0;
   for(let i = 0;i < items.length;i = i + 1) {
      if(fn(Wy.copy(items[i])))  {
          {
            const $11 = Wy.copy(items[i]);
            items[j] = $11;
         }
          {
            const $12 = j + 1;
            j = $12;
         }
      }
   }
   return std$array$resize$av1TI$av1T(Wy.copy(items), j);
}
function std$array$foldl$av1Tv1Tf2v1Tv1Tv1T$v1T(items, dEfault, fn) {
   let r;
   if(items.length === 0)  {
      return Wy.copy(dEfault);
   } else  {
      return std$array$foldl$av1Tf2v1Tv1Tv1T$v1T(Wy.copy(items), fn);
   }
}
function std$array$foldl$av1Tf2v1Tv1Tv1T$v1T(items, fn) {
   let r;
   let acc = Wy.copy(items[0]);
   for(let i = 1;i < items.length;i = i + 1) {
       {
         const $13 = fn(Wy.copy(acc), Wy.copy(items[i]));
         acc = $13;
      }
   }
   return Wy.copy(acc);
}
function std$ascii$char$type(x) {
   return (0 <= x) && (x <= 127);
}
function std$ascii$letter$type(x) {
   return ((97 <= x) && (x <= 122)) || ((65 <= x) && (x <= 90));
}
function std$ascii$uppercase$type(x) {
   return (65 <= x) && (x <= 90);
}
function std$ascii$lowercase$type(x) {
   return (97 <= x) && (x <= 122);
}
function std$ascii$digit$type(x) {
   return (48 <= x) && (x <= 57);
}
let std$ascii$NUL$static = 0;
let std$ascii$SOH$static = 1;
let std$ascii$STX$static = 2;
let std$ascii$ETX$static = 3;
let std$ascii$EOT$static = 4;
let std$ascii$ENQ$static = 5;
let std$ascii$ACK$static = 6;
let std$ascii$BEL$static = 7;
let std$ascii$BS$static = 8;
let std$ascii$HT$static = 9;
let std$ascii$LF$static = 10;
let std$ascii$VT$static = 11;
let std$ascii$FF$static = 12;
let std$ascii$CR$static = 13;
let std$ascii$SO$static = 14;
let std$ascii$SI$static = 15;
let std$ascii$DLE$static = 16;
let std$ascii$DC1$static = 17;
let std$ascii$DC2$static = 18;
let std$ascii$DC3$static = 19;
let std$ascii$DC4$static = 20;
let std$ascii$NAK$static = 21;
let std$ascii$SYN$static = 22;
let std$ascii$ETB$static = 23;
let std$ascii$CAN$static = 24;
let std$ascii$EM$static = 25;
let std$ascii$SUB$static = 26;
let std$ascii$ESC$static = 27;
let std$ascii$FS$static = 28;
let std$ascii$GS$static = 29;
let std$ascii$RS$static = 30;
let std$ascii$US$static = 31;
let std$ascii$DEL$static = 127;
function std$ascii$to_byte$Q4char$U(v) {
   let mask = 0b1;
   let r = 0b0;
   for(let i = 0;i < 8;i = i + 1) {
      if((v % 2) === 1)  {
          {
            const $14 = r | mask;
            r = $14;
         }
      }
       {
         const $15 = Math.floor(v / 2);
         v = $15;
      }
       {
         const $16 = mask << 1;
         mask = $16;
      }
   }
   return r;
}
function std$ascii$to_bytes$Q6string$aU(s) {
   let r = Wy.array(0b0, s.length);
   for(let i = 0;i < s.length;i = i + 1) {
      r[i] = std$ascii$to_byte$Q4char$U(s[i]);
   }
   return Wy.copy(r);
}
function std$ascii$from_bytes$aU$Q6string(data) {
   let r = Wy.array(0, data.length);
   for(let i = 0;i < data.length;i = i + 1) {
      let v = std$integer$to_uint$U$Q2u8(data[i]);
      if(v >= 127)  {
         v = 63;
      }
      r[i] = v;
   }
   return Wy.copy(r);
}
function std$ascii$is_upper_case$Q4char$B(c) {
   return (65 <= c) && (c <= 90);
}
function std$ascii$is_lower_case$Q4char$B(c) {
   return (97 <= c) && (c <= 122);
}
function std$ascii$is_letter$Q4char$B(c) {
   return ((97 <= c) && (c <= 122)) || ((65 <= c) && (c <= 90));
}
function std$ascii$is_digit$Q4char$B(c) {
   return (48 <= c) && (c <= 57);
}
function std$ascii$is_whitespace$Q4char$B(c) {
   return (c === 32) || ((c === 9) || ((c === 10) || (c === 13)));
}
function std$ascii$to_string$I$Q6string(item) {
   let sign;
   if(item < 0)  {
      sign = false;
       {
         const $17 = -item;
         item = $17;
      }
   } else  {
      sign = true;
   }
   let tmp = item;
   let digits = 0;
   do {
       {
         const $18 = Math.floor(tmp / 10);
         tmp = $18;
      }
       {
         const $19 = digits + 1;
         digits = $19;
      }
   } while(tmp !== 0);
   let r = Wy.array(48, digits);
   do {
      let remainder = item % 10;
       {
         const $20 = Math.floor(item / 10);
         item = $20;
      }
      let digit = 48 + remainder;
       {
         const $21 = digits - 1;
         digits = $21;
      }
      r[digits] = digit;
   } while(item !== 0);
   if(sign)  {
      return Wy.copy(r);
   } else  {
      return std$array$append$av1Tav1T$av1T(Wy.toString("-"), Wy.copy(r));
   }
}
function std$ascii$to_string$aI$Q6string(items) {
   let r = Wy.toString("");
   for(let i = 0;i < items.length;i = i + 1) {
      if(i !== 0)  {
          {
            const $22 = std$array$append$av1Tav1T$av1T(Wy.copy(r), Wy.toString(","));
            r = $22;
         }
      }
       {
         const $23 = std$array$append$av1Tav1T$av1T(Wy.copy(r), std$ascii$to_string$I$Q6string(items[i]));
         r = $23;
      }
   }
   return Wy.copy(r);
}
function std$ascii$parse_int$Q5ascii6string$u2IN(input) {
   let start = 0;
   let negative;
   if(input[0] === 45)  {
      negative = true;
       {
         const $24 = start + 1;
         start = $24;
      }
   } else  {
      negative = false;
   }
   let r = 0;
   for(let i = start;i < input.length;i = i + 1) {
      let c = input[i];
       {
         const $25 = r * 10;
         r = $25;
      }
      if(!std$ascii$is_digit$Q4char$B(c))  {
         return null;
      }
       {
         const $26 = r + (c - 48);
         r = $26;
      }
   }
   if(negative)  {
      return -r;
   } else  {
      return r;
   }
}
function std$collections$array_set$ArraySet$type(v) {
   return std$array$unique_elements$av1TI$B(Wy.copy(v.items), v.length);
}
function std$collections$array_set$ArraySet$V$Q8ArraySet() {
   let r;
   return new Wy.Record({length: 0, items: []});
}
function std$collections$array_set$ArraySet$av1T$Q6Vector(items) {
   let r;
   return std$collections$vector$Vector$av1T$Q6Vector(Wy.copy(items));
}
function std$collections$array_set$insert$Q8ArraySetv1T$Q8ArraySet(set, item) {
   let r;
   if(std$array$contains$av1Tv1TII$B(Wy.copy(set.items), Wy.copy(item), 0, set.length))  {
      return Wy.copy(set);
   } else  {
      return std$collections$vector$push$Q6Vectorv1T$Q6Vector(Wy.copy(set), Wy.copy(item));
   }
}
function std$collections$hash$hash$I$Q3u32(x) {
   return x % 4294967295;
}
function std$collections$hash$hash$B$Q3u32(b) {
   if(b)  {
      return 1;
   } else  {
      return 0;
   }
}
function std$collections$hash$hash$aI$Q3u32(xs) {
   let r = 0;
   for(let i = 0;i < xs.length;i = i + 1) {
       {
         const $27 = (r + std$collections$hash$hash$I$Q3u32(xs[i])) % 4294967295;
         r = $27;
      }
   }
   return r;
}
function std$collections$hash$hash$aB$Q3u32(xs) {
   let r = 0;
   for(let i = 0;i < xs.length;i = i + 1) {
       {
         const $28 = (r + std$collections$hash$hash$B$Q3u32(xs[i])) % 4294967295;
         r = $28;
      }
   }
   return r;
}
function std$collections$hash_map$HashMap$V$Q7HashMap() {
   let r;
   return std$collections$hash_map$HashMap$Q4hash2fn$Q7HashMap(function(p0) {
      return std$collections$hash$hash$I$Q3u32(p0);
   });
}
function std$collections$hash_map$HashMap$Q4hash2fn$Q7HashMap(hasher) {
   let r;
   let init = std$collections$vector$Vector$V$Q6Vector();
   return new Wy.Record({length: 0, buckets: Wy.array(init, 10), hasher: hasher});
}
function std$collections$hash_map$contains$Q7HashMapv1S$B(map, key) {
   let r;
   let index = map.hasher(Wy.copy(key)) % map.buckets.length;
   let bucket = Wy.copy(map.buckets[index]);
   for(let i = 0;i < std$collections$vector$size$Q6Vector$I(Wy.copy(bucket));i = i + 1) {
      let ith = std$collections$vector$get$Q6VectorI$v1T(Wy.copy(bucket), i);
      if(Wy.equals(ith.first, key))  {
         return true;
      }
   }
   return false;
}
function std$collections$hash_map$get$Q7HashMapv1S$Q6Option(map, key) {
   let r;
   let index = map.hasher(Wy.copy(key)) % map.buckets.length;
   let bucket = Wy.copy(map.buckets[index]);
   for(let i = 0;i < std$collections$vector$size$Q6Vector$I(Wy.copy(bucket));i = i + 1) {
      let ith = std$collections$vector$get$Q6VectorI$v1T(Wy.copy(bucket), i);
      if(Wy.equals(ith.first, key))  {
         return std$option$Some$v1T$Q4Some(Wy.copy(ith.second));
      }
   }
   return std$option$None$static;
}
function std$collections$hash_map$insert$Q7HashMapv1Sv1T$Q7HashMap(map, key, value) {
   let r;
   let index = map.hasher(Wy.copy(key)) % map.buckets.length;
   let bucket = Wy.copy(map.buckets[index]);
   for(let i = 0;i < std$collections$vector$size$Q6Vector$I(Wy.copy(bucket));i = i + 1) {
      let ith = std$collections$vector$get$Q6VectorI$v1T(Wy.copy(bucket), i);
      if(Wy.equals(ith.first, key))  {
         map.buckets[index] = std$collections$vector$set$Q6VectorIv1T$Q6Vector(Wy.copy(bucket), i, std$pair$Pair$v1Sv1T$Q4Pair(Wy.copy(key), Wy.copy(value)));
         return Wy.copy(map);
      }
   }
   map.buckets[index] = std$collections$vector$push$Q6Vectorv1T$Q6Vector(Wy.copy(bucket), std$pair$Pair$v1Sv1T$Q4Pair(Wy.copy(key), Wy.copy(value)));
    {
      const $29 = map.length + 1;
      map.length = $29;
   }
   return Wy.copy(map);
}
function std$collections$hash_map$to_array$Q7HashMap$aQ4Pair(map) {
   let result;
   let [b, i] = std$collections$hash_map$advance$Q7HashMapQ4uintQ4uint$Q4uintQ4uint(Wy.copy(map), 0, 0);
   if(b >= map.buckets.length)  {
      return [];
   } else  {
      let first = std$collections$vector$get$Q6VectorI$v1T(Wy.copy(map.buckets[b]), i);
      let items = Wy.array(first, map.length);
      for(let j = 1;j < items.length;j = j + 1) {
          {
            const $30 = std$collections$hash_map$advance$Q7HashMapQ4uintQ4uint$Q4uintQ4uint(Wy.copy(map), b, i + 1);
            b = $30[0];
            i = $30[1];
         }
         items[j] = std$collections$vector$get$Q6VectorI$v1T(Wy.copy(map.buckets[b]), i);
      }
      return Wy.copy(items);
   }
}
function std$collections$hash_map$iterator$Q7HashMap$Q8Iterator(map) {
   let [b, i] = std$collections$hash_map$advance$Q7HashMapQ4uintQ4uint$Q4uintQ4uint(Wy.copy(map), 0, 0);
   return new Wy.Record({get: function(b, map, i) {
      return function() {
         return std$collections$hash_map$get$Q7HashMapQ4uintQ4uint$Q6Option(Wy.copy(map), b, i);
      };
   }(b, map, i), next: function(b, map, i) {
      return function() {
         return std$collections$hash_map$next$Q7HashMapQ4uintQ4uint$Q8Iterator(Wy.copy(map), b, i);
      };
   }(b, map, i)});
}
function std$collections$hash_map$get$Q7HashMapQ4uintQ4uint$Q6Option(map, bucket, index) {
   if(bucket < map.buckets.length)  {
      return std$option$Some$v1T$Q4Some(std$collections$vector$get$Q6VectorI$v1T(Wy.copy(map.buckets[bucket]), index));
   } else  {
      return std$option$None$static;
   }
}
function std$collections$hash_map$next$Q7HashMapQ4uintQ4uint$Q8Iterator(map, bucket, index) {
   let [b, i] = std$collections$hash_map$advance$Q7HashMapQ4uintQ4uint$Q4uintQ4uint(Wy.copy(map), bucket, index + 1);
   return new Wy.Record({get: function(b, map, i) {
      return function() {
         return std$collections$hash_map$get$Q7HashMapQ4uintQ4uint$Q6Option(Wy.copy(map), b, i);
      };
   }(b, map, i), next: function(b, map, i) {
      return function() {
         return std$collections$hash_map$next$Q7HashMapQ4uintQ4uint$Q8Iterator(Wy.copy(map), b, i);
      };
   }(b, map, i)});
}
function std$collections$hash_map$advance$Q7HashMapQ4uintQ4uint$Q4uintQ4uint(map, bucket, index) {
   let i;
   let b;
   if(bucket < map.buckets.length)  {
      let vec = Wy.copy(map.buckets[bucket]);
      if(index < vec.length)  {
         return [bucket, index];
      } else  {
         return std$collections$hash_map$advance$Q7HashMapQ4uintQ4uint$Q4uintQ4uint(Wy.copy(map), bucket + 1, 0);
      }
   } else  {
      return [map.buckets.length, 0];
   }
}
function std$collections$vector$Vector$type($) {
   return $.length <= $.items.length;
}
function std$collections$vector$Vector$V$Q6Vector() {
   let r;
   return new Wy.Record({items: [], length: 0});
}
function std$collections$vector$Vector$av1T$Q6Vector(items) {
   let r;
   return new Wy.Record({items: Wy.copy(items), length: items.length});
}
function std$collections$vector$top$Q6Vector$v1T(vec) {
   return Wy.copy(vec.items[vec.length - 1]);
}
function std$collections$vector$size$Q6Vector$I(vec) {
   let r;
   return vec.length;
}
function std$collections$vector$get$Q6VectorI$v1T(vec, ith) {
   let item;
   return Wy.copy(vec.items[ith]);
}
function std$collections$vector$to_array$Q6Vector$av1T(vec) {
   let items;
   return std$array$slice$av1TQ4uintQ4uint$av1T(Wy.copy(vec.items), 0, vec.length);
}
function std$collections$vector$push$Q6Vectorv1T$Q6Vector(vec, item) {
   let nvec;
   if(vec.length === vec.items.length)  {
      let nlen = (vec.length * 2) + 1;
       {
         const $31 = std$array$resize$av1TIv1T$av1T(Wy.copy(vec.items), nlen, Wy.copy(item));
         vec.items = $31;
      }
   } else  {
       {
         const $32 = Wy.copy(item);
         vec.items[vec.length] = $32;
      }
   }
    {
      const $33 = vec.length + 1;
      vec.length = $33;
   }
   return Wy.copy(vec);
}
function std$collections$vector$push_all$Q6Vectorav1T$Q6Vector(vec, items) {
   let nvec;
   let len = vec.length + items.length;
   if(items.length === 0)  {
      return Wy.copy(vec);
   } else  {
      if(len > vec.items.length)  {
         let nlen = (vec.length * 2) + items.length;
          {
            const $34 = std$array$resize$av1TIv1T$av1T(Wy.copy(vec.items), nlen, Wy.copy(items[0]));
            vec.items = $34;
         }
      }
   }
    {
      const $35 = std$array$copy$av1TQ4uintav1TQ4uintQ4uint$av1T(Wy.copy(items), 0, Wy.copy(vec.items), vec.length, items.length);
      vec.items = $35;
   }
    {
      const $36 = vec.length + items.length;
      vec.length = $36;
   }
   return Wy.copy(vec);
}
function std$collections$vector$pop$Q6Vector$Q6Vector(vec) {
   let nvec;
    {
      const $37 = vec.length - 1;
      vec.length = $37;
   }
   return Wy.copy(vec);
}
function std$collections$vector$set$Q6VectorIv1T$Q6Vector(vec, ith, item) {
   let result;
   vec.items[ith] = Wy.copy(item);
   return Wy.copy(vec);
}
function std$collections$vector$remove$Q6VectorQ4uint$Q6Vector(vec, ith) {
   let result;
   let items = std$array$remove$av1TQ4uint$av1T(Wy.copy(vec.items), ith);
   return new Wy.Record({items: Wy.copy(items), length: vec.length - 1});
}
function std$collections$vector$swap$Q6VectorQ4uintQ4uint$Q6Vector(vec, ith, jth) {
   let result;
    {
      const $38 = std$array$swap$av1TQ4uintQ4uint$av1T(Wy.copy(vec.items), ith, jth);
      vec.items = $38;
   }
   return Wy.copy(vec);
}
function std$collections$vector$clear$Q6Vector$Q6Vector(vec) {
   let r;
   vec.length = 0;
   return Wy.copy(vec);
}
function std$collections$vector$equals$Q6VectorQ6Vector$B(lhs, rhs) {
   return (lhs.length === rhs.length) && std$array$equals$av1Tav1TII$B(Wy.copy(lhs.items), Wy.copy(rhs.items), 0, lhs.length);
}
function std$filesystem$uint$type(x) {
   return x >= 0;
}
let std$filesystem$READONLY$static = 0;
let std$filesystem$READWRITE$static = 1;
function std$filesystem$rwMode$type(x) {
   return (x === std$filesystem$READONLY$static) || (x === std$filesystem$READWRITE$static);
}
function std$integer$i8$type(x) {
   return (x >= (-128)) && (x <= 127);
}
function std$integer$i16$type(x) {
   return (x >= (-32768)) && (x <= 32768);
}
function std$integer$i32$type(x) {
   return (x >= (-2147483648)) && (x <= 2147483647);
}
function std$integer$u8$type(x) {
   return (x >= 0) && (x <= 255);
}
function std$integer$u16$type(x) {
   return (x >= 0) && (x <= 65535);
}
function std$integer$u32$type(x) {
   return (x >= 0) && (x <= 4294967295);
}
function std$integer$uint$type(x) {
   return x >= 0;
}
function std$integer$nat$type(x) {
   return x >= 0;
}
function std$integer$to_unsigned_byte$Q2u8$U(v) {
   let mask = 0b1;
   let r = 0b0;
   for(let i = 0;i < 8;i = i + 1) {
      if((v % 2) === 1)  {
          {
            const $39 = r | mask;
            r = $39;
         }
      }
       {
         const $40 = Math.floor(v / 2);
         v = $40;
      }
       {
         const $41 = mask << 1;
         mask = $41;
      }
   }
   return r;
}
function std$integer$to_signed_byte$Q2i8$U(v) {
   let u;
   if(v >= 0)  {
      u = v;
   } else  {
      u = v + 256;
   }
   return std$integer$to_unsigned_byte$Q2u8$U(u);
}
function std$integer$to_string$U$Q5ascii6string(b) {
   let r = Wy.array(0, 98);
   for(let i = 0;i < 8;i = i + 1) {
      if((b & 0b1) === 0b1)  {
         r[7 - i] = 49;
      } else  {
         r[7 - i] = 48;
      }
       {
         const $42 = b >> 1;
         b = $42;
      }
   }
   return Wy.copy(r);
}
function std$integer$to_uint$U$Q2u8(b) {
   let r = 0;
   let base = 1;
   while(b !== 0b0)  {
      if((b & 0b1) === 0b1)  {
          {
            const $43 = r + base;
            r = $43;
         }
      }
       {
         const $44 = (b >> 1) & 0b1111111;
         b = $44;
      }
       {
         const $45 = base * 2;
         base = $45;
      }
   }
   return r;
}
function std$integer$to_uint$aU$Q4uint(bytes) {
   let val = 0;
   let base = 1;
   for(let i = 0;i < bytes.length;i = i + 1) {
      let v = std$integer$to_uint$U$Q2u8(bytes[i]) * base;
       {
         const $46 = val + v;
         val = $46;
      }
       {
         const $47 = base * 256;
         base = $47;
      }
   }
   return val;
}
function std$integer$to_int$U$I(b) {
   let r = 0;
   let base = 1;
   while(b !== 0b0)  {
      if((b & 0b1) === 0b1)  {
          {
            const $48 = r + base;
            r = $48;
         }
      }
       {
         const $49 = (b >> 1) & 0b1111111;
         b = $49;
      }
       {
         const $50 = base * 2;
         base = $50;
      }
   }
   if(r >= 128)  {
      return -(256 - r);
   } else  {
      return r;
   }
}
function std$integer$to_int$aU$I(bytes) {
   let val = 0;
   let base = 1;
   for(let i = 0;i < bytes.length;i = i + 1) {
      let v = std$integer$to_uint$U$Q2u8(bytes[i]) * base;
       {
         const $51 = val + v;
         val = $51;
      }
       {
         const $52 = base * 256;
         base = $52;
      }
   }
   if(val >= Math.floor(base / 2))  {
      return -(base - val);
   } else  {
      return val;
   }
}
function std$math$abs$I$I(x) {
   let r;
   if(x < 0)  {
      return -x;
   } else  {
      return x;
   }
}
function std$math$max$II$I(a, b) {
   let r;
   if(a < b)  {
      return b;
   } else  {
      return a;
   }
}
function std$math$min$II$I(a, b) {
   let r;
   if(a > b)  {
      return b;
   } else  {
      return a;
   }
}
function std$math$pow$II$I(base, exponent) {
   let r = 1;
   for(let i = 0;i < exponent;i = i + 1) {
       {
         const $53 = r * base;
         r = $53;
      }
   }
   return r;
}
function std$math$isqrt$I$I(x) {
   let r;
   let square = 1;
   let delta = 3;
   while(square <= x)  {
       {
         const $54 = square + delta;
         square = $54;
      }
       {
         const $55 = delta + 2;
         delta = $55;
      }
   }
   return Math.floor(delta / 2) - 1;
}
function std$option$None$type($) {
   return true;
}
function std$option$Some$type($) {
   return true;
}
let std$option$None$static = null;
function std$option$Some$v1T$Q4Some(value) {
   let r;
   return new Wy.Record({value: Wy.copy(value)});
}
function std$option$contains$Q6Optionv1T$B(option, value) {
   let r;
   if(is$Q6OptionQ4None(option))  {
      return false;
   } else  {
      return Wy.equals(option.value, value);
   }
}
function std$option$unwrap$Q6Optionv1T$v1T(option, dEfault) {
   let r;
   if(is$Q6OptionQ4None(option))  {
      return Wy.copy(dEfault);
   } else  {
      return Wy.copy(option.value);
   }
}
function std$option$map$Q6Optionfv1Sv1T$Q6Option(option, fn) {
   let result;
   if(is$Q6OptionQ4None(option))  {
      return std$option$None$static;
   } else  {
      return std$option$Some$v1T$Q4Some(fn(Wy.copy(option.value)));
   }
}
function std$option$filter$Q6Optionfv1TB$Q6Option(option, filter) {
   let r;
   if((!is$Q6OptionQ4None(option)) && filter(Wy.copy(option.value)))  {
      return Wy.copy(option);
   } else  {
      return std$option$None$static;
   }
}
function std$pair$Pair$v1Sv1T$Q4Pair(first, second) {
   let r;
   return new Wy.Record({first: Wy.copy(first), second: Wy.copy(second)});
}
function std$pair$swap$Q4Pair$Q4Pair(p) {
   let r;
   return new Wy.Record({first: Wy.copy(p.second), second: Wy.copy(p.first)});
}
function std$pair$map$Q4Pairfv1Sv1T$Q4Pair(pair, fn) {
   return new Wy.Record({first: fn(Wy.copy(pair.first)), second: fn(Wy.copy(pair.second))});
}
function std$pair$map_1st$Q4Pairfv1Sv1U$Q4Pair(pair, fn) {
   return new Wy.Record({first: fn(Wy.copy(pair.first)), second: Wy.copy(pair.second)});
}
function std$pair$map_2nd$Q4Pairfv1Tv1U$Q4Pair(pair, fn) {
   return new Wy.Record({first: Wy.copy(pair.first), second: fn(Wy.copy(pair.second))});
}
function std$utf8$uint$type(x) {
   return x >= 0;
}
function std$utf8$char$type(c) {
   return (0 <= c) && (c <= 1112064);
}
function std$utf8$is_internal$U$B(data) {
   return (data & std$utf8$TRAILING_BYTE_MASK$static) === data;
}
function std$utf8$is_start_one$U$B(data) {
   return (data & std$utf8$ONE_BYTE_MASK$static) === data;
}
function std$utf8$is_start_two$U$B(data) {
   return (data & std$utf8$TWO_BYTE_MASK$static) === data;
}
function std$utf8$is_start_three$U$B(data) {
   return (data & std$utf8$THREE_BYTE_MASK$static) === data;
}
function std$utf8$is_start_four$U$B(data) {
   return (data & std$utf8$THREE_BYTE_MASK$static) === data;
}
function std$utf8$is_start_n$UQ4uint$B(data, len) {
   return ((len !== 1) || (std$utf8$is_start_one$U$B(data) || (std$utf8$is_start_two$U$B(data) || (std$utf8$is_start_three$U$B(data) || std$utf8$is_start_four$U$B(data))))) && ((len !== 2) || (std$utf8$is_start_two$U$B(data) || (std$utf8$is_start_three$U$B(data) || std$utf8$is_start_four$U$B(data)))) && ((len !== 3) || (std$utf8$is_start_three$U$B(data) || std$utf8$is_start_four$U$B(data))) && ((len !== 4) || std$utf8$is_start_four$U$B(data));
}
function std$utf8$valid_2nd_byte$aUQ4uint$B(chars, i) {
   return ((i <= 0) || (!std$utf8$is_internal$U$B(chars[i]))) || std$utf8$is_start_n$UQ4uint$B(chars[i - 1], 2);
}
function std$utf8$valid_3rd_byte$aUQ4uint$B(chars, i) {
   return ((i <= 1) || (!std$utf8$is_internal$U$B(chars[i]))) || std$utf8$is_start_n$UQ4uint$B(chars[i - 2], 3);
}
function std$utf8$valid_4th_byte$aUQ4uint$B(chars, i) {
   return ((i <= 2) || (!std$utf8$is_internal$U$B(chars[i]))) || std$utf8$is_start_n$UQ4uint$B(chars[i - 2], 4);
}
function std$utf8$string$type(chars) {
   return function() {
      for(let i = 0;i < chars.length;i = i + 1) {
         if(!std$utf8$valid_2nd_byte$aUQ4uint$B(Wy.copy(chars), i))  {
            return false;
         }
      }
      return true;
   }() && function() {
      for(let i = 0;i < chars.length;i = i + 1) {
         if(!std$utf8$valid_3rd_byte$aUQ4uint$B(Wy.copy(chars), i))  {
            return false;
         }
      }
      return true;
   }() && function() {
      for(let i = 0;i < chars.length;i = i + 1) {
         if(!std$utf8$valid_4th_byte$aUQ4uint$B(Wy.copy(chars), i))  {
            return false;
         }
      }
      return true;
   }();
}
let std$utf8$ONE_BYTE_MASK$static = 0b1111111;
let std$utf8$TWO_BYTE_MASK$static = 0b11011111;
let std$utf8$THREE_BYTE_MASK$static = 0b11101111;
let std$utf8$FOUR_BYTE_MASK$static = 0b11110111;
let std$utf8$TRAILING_BYTE_MASK$static = 0b10111111;
function std$utf8$length$Q6string$Q4uint(str) {
   let x;
   let len = 0;
   for(let i = 0;i < str.length;i = i + 1) {
      let data = str[i];
      if((data & std$utf8$TRAILING_BYTE_MASK$static) !== data)  {
          {
            const $56 = len + 1;
            len = $56;
         }
      }
   }
   return len;
}
function is$u2Q4uintNQ4uint(v) {
   return ((typeof v) === "number") && std$integer$uint$type(v);
}
function is$Q6OptionQ4None(v) {
   return (v === null) && std$option$None$type(v);
}
function is$Q6OptionQ4Some(v) {
   return is$Q6Optionr1v1T5value(v) && std$option$Some$type(v);
}
function is$u2Q4NoneQ4SomeQ4None(v) {
   return (v === null) && std$option$None$type(v);
}
function is$u2NQ4uintQ4uint(v) {
   return ((typeof v) === "number") && std$integer$uint$type(v);
}
function is$u2Q4NoneQ4SomeQ4None(v) {
   return (v === null) && std$option$None$type(v);
}
function is$Q6OptionQ4None(v) {
   return (v === null) && std$option$None$type(v);
}
function is$Q6OptionQ4Some(v) {
   return is$Q6Optionr1v1S5value(v) && std$option$Some$type(v);
}
function is$Q6Optionr1v1S5value(v) {
   return true;
}
function is$Q6Optionr1v1T5value(v) {
   return true;
}

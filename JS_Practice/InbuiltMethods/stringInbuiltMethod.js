/**
 * STRING METHODS
 */

const hello = "Rishabh Gupta IS Software Engineer JOB";
const hello1 = " and looking for a job"

/**
 * charAt()
 * Returns the character at the specified index.
 * It works on 0 base indexing
 */

console.log("String Char At", hello.charAt(1));

/**
 * charCodeAt()
 * Returns a number indicating the Unicode value of the character at the given index.
 * It return decimal value and works on 0 base indexing
 * 82 -> R
 * 105 -> i
 */

console.log("String Char At", hello.charCodeAt());

/**
 * concat()
 * Combines the text of two strings and returns a new string.
 */

console.log("String Concat", hello.concat(hello1))



/**
 * indexOf()
 * Returns the index within the calling String object of the first occurrence of the specified value, or -1 if not found.

 * lastIndexOf()
 * Returns the index within the calling String object of the last occurrence of the specified value, or -1 if not found.
 */

console.log("String Index OF ", hello.indexOf('r'))
console.log("String last Index of ", hello.lastIndexOf('r'))



/**
 * search()
 * Executes the search for a match between a regular expression and a specified string.
 * It gives the starting index of found substring
 */

console.log("String Search", hello.search("Rish"))



/**
 * replace()
 * Used to find a match between a regular expression and a string, and to replace the matched substring with a new substring.
 * Non mutable
 */

console.log("String Replace", hello1.replace('oo', '12')) // output : and l12king ....



/**
 * toLowerCase()
 * Returns the calling string value converted to lower case.
 * non mutable
 *
 * toUpperCase()
 * Returns the calling string value converted to uppercase.
 * Non mutable
 */

console.log("String Lowercase", hello.toLowerCase())
console.log("String UpperCase", hello.toUpperCase())


/**
 * slice()
 * Extracts a section of a string and returns a new string.
 * Non Mutable
 * It Returns new string from starting Index to Last Index (startIndex,LastIndex)
 * 
 * substr()
 * Returns the characters in a string beginning at the specified location through the specified number of characters.
 * 
 */

console.log("STring Slice", hello.slice(10, 15))
console.log("String Substring", hello.substring(0, 5))

/**
 * split()
 * Splits a String object into an array of strings by separating the string into substrings.
 * Non Mutable
 * It splits the string in the way of mentioned return an array
 */

console.log("STRING SPLIT", hello.split("I"));
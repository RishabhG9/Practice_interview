/**
 * https://www.youtube.com/watch?v=m4ZjmNDoIYU&ab_channel=ReactJSDeveloperInterviewSeries
 * 
 * Those who want to give mock interview[𝐅𝐑𝐄𝐄 𝐎𝐅 𝐂𝐎𝐒𝐓] can mail on practicemocks223@gmail.com OR rdev67891@gmail.com.

I have around 2.5 years of experience in Frontend development and given around 100+ interviews.
I know what it takes to crack the interview and I will be able to guide you accordingly as per the industry standards.

After your interview,feedback will be given to you personally in the way you can give better interviews in the near future.[𝐅𝐑𝐄𝐄 𝐎𝐅 𝐂𝐎𝐒𝐓]
Feedback includes:
1.Your doubts
2.Which are the resources that can help you to grow?
3.What are the things or the skills reqiured you to give an edge above other candidates for job selection?
4.Where you can apply for jobs,etc and many more...
 */



// console.log("A" - 1);  // NaN
// console.log("A" - NaN)
// console.log("A" - null)
// console.log("A" + NaN)
// console.log("A" + null)

// console.log('2' + 2 + '2')  // 2222
// console.log('2' + 2 - '2')  // 22 - 2 = 20

// // Find NaN
// console.log("String" * 2); // NaN

// console.log(NaN == NaN);
// console.log(NaN === NaN);

/**
 * QUESTION IS DIFFERENCE BETWEEN MAP AND FILTER
 * 1. Map and Filter mutate the array or not
 * 2. What map return
 * 3. What filter return
 * 4. What is the basic difference between them
 */

const array = [6, 8, 10, 1, 2, 3, 4, 5];
const result = array.map((e) => {
  return e > 2
})

// console.log("Result", result)
/**
 * QUESTION IS ARRAY FUNCTIONS
 * 1. Slice and Splice and do they mutate
 * 2. Sort Function does it mutate
 * 3. Shift and Unshift Functions and will they mutate
 */
console.log("Array Before", array)
const temp = array.sort((a, b) => { return a - b })

console.log(array.unshift(10))
console.log(array.unshift(0))

console.log("Array", array)
console.log(array.unshift(-1))
console.log("temp", temp)
console.log("Array", array)


/**
 * QUESITONS
 * 1. High Order Functions
 * 2. Lexical Scoping
 * 3. Currying and addition of three number
 * 4. Infinite Currying Function 
 */


function currying(a) {
  return function (b) {
    if (b) {
      return currying(a + b)
    }
    else {
      return a
    }
  }
}

console.log("Currying", currying(1)(2)(3)(4)(5)());


/**
 * QUESTIONS
 * 1. Array Destructure
 * 2. object Destructure
 * 3. "Polyphill" in Javascript (Incomplete Answer)
 * 4. Temporal Dead Zone
 * 5. Weak Map and Weak set
 */

/**
 * Now shift it to "HTML"
 * 1. HTML layout Structure
 * 2. Figure tag and Img tag difference
 * 3. image map in html
 * 4. Link <link> tag and (anchor) <a> tag
 * 5. inline level and block level element
 * 6. Void element
 * 7. specific term of the tag  who doesnt have closing tag
 * 8. difference between em tag and i tag
 * 9. difference between strong and bold tag
 */

/**
 * Now SHIFT TO "CSS"
 * 1. Universal Selector
 * 2. Types of selector
 * 3. Priority of selector
 * 4. Positioning Properties
 * 5. Sticky Position
 * 6. CSS counters
 * 7. How can we hide element in css
 * 8. Display none, hidden and visibility hidden difference
 * 9. 
 */
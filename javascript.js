// optional: implement a backspace button (pop current when pressed, need to google the function)
// mod 9 mod 8 -> 98
// some way to get to showing b, so then +/- makes a overwrite b in display


// Initialize globals
let displayValue = 0;                               // Initialize display with 0
let display = document.querySelector('.display');   // Find display node to update it later
let a = "0";                     // Set a and b to empty
let b = "";
let onFirstValue = true;        // Start on first value of operation
let operand = "doNothing";      // Start with an empty operand
let onFirstOperation = true;    // Start on first operation of a string of them
let justFinishedEval = true;    // Start by accepting a new evaluation set  
const numPlaces = 3;            // Constant for number of places to display

// Add click listener to all Number buttons (including dot)
const numberButtons = document.querySelectorAll('.numberButton'); // Find set of number buttons
numberButtons.forEach( (button) => {
    button.addEventListener('click', () => {
        console.log(button.textContent);
        if (justFinishedEval) {     // Reset a and b to take new input 
            resetCalculator();
            a = '';
            b = '';
        }

        if (onFirstValue) {         // If working with a, update a
            a += button.textContent;
            console.log("a: "+a);
            displayValue = a;
            updateDisplay(displayValue);
        } else {                    // If working with b, update b
            b += button.textContent;
            console.log("b: "+b);
            displayValue = b;
            updateDisplay(displayValue);
        }
        justFinishedEval = false;   // We're in the middle of an eval now
    })
})

// Add click listener to all Operand buttons
const operandButtons = document.querySelectorAll('.operandButton'); // Find set of number buttons
operandButtons.forEach( (button) => {
    button.addEventListener('click', () => {
        dotButton.disabled = false; // Re-enable decimal button, since we're gonna enter a new number after this
        
        if (!onFirstOperation && !(a==="") && !(b==="")) {      // If we're chaining operations, Operate then push result to a
            displayValue = operate(operand, parseFloat(a), parseFloat(b));
            console.log("alert: chained an operation");
            updateDisplay(displayValue);
            a = displayValue;               // push result to a, and reset b
            b = "";
        }
        console.log(button.id);
        operand = button.id;                // Set current operand to the pressed button
        onFirstValue = false;               // Received an operand, so on b now
        onFirstOperation = false;           // Received an operand, so allow chaining now
        justFinishedEval = false;           // Received an operand, so in the middle of an eval now
    })
})

// Add behavior for "Clear" button
const clearButton = document.querySelector('.clearButton');
clearButton.addEventListener('click', () => {
    resetCalculator();
})

// Add behavior for "." button
const dotButton = document.querySelector('.dotButton');
dotButton.addEventListener('click', () => {
    dotButton.disabled = true;      // Don't allow multiple decimals in 1 entry
})

// Add behavior for "Off" button
const offButton = document.querySelector('.offButton');
offButton.addEventListener('click', () => {
    resetCalculator();
    window.alert("calculator is sleeping... \n press [ OK ] to wake   ")
})

// const backspaceButton = document.querySelector('.backspaceButton') {
// }

// Add behavior for "=" button
const evalButton = document.querySelector('.equalsButton');
evalButton.addEventListener('click', () => {
    if (a===""||b==="") return;             // Don't allow pressing "=" without defined a and b
    
    displayValue = operate(operand, a, b);  // Operate with current operand, a, and b
    updateDisplay(displayValue);            // Update display
    a = displayValue;                       // Push result to a, clear b
    b = "";
    dotButton.disabled = false;             // Re-enable "." button since we've completed an eval  
    justFinishedEval = true;                // Just finished an eval, so set this to true
})

// Add behavior for "+/-" button
const signButton = document.querySelector('.signButton');
signButton.addEventListener('click', () => {
    displayValue = changeSign(a);           // Update display with negative a
    a = -1*a;                               // Update a to equal -a
    updateDisplay(displayValue);
})

// When called, updates the Display div with the passed value
function updateDisplay(displayValue) {
    display.textContent = displayValue;
}

// When called, resets a, b, display, and all booleans to their initial values
function resetCalculator() {
    a = "0";
    b = "";
    displayValue = 0;
    operand = "doNothing";
    onFirstValue = true;
    onFirstOperation = true;
    justFinishedEval = true;
    updateDisplay(displayValue);
}

// Basic mathematic functions for all operand buttons (excluding +/-)
function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if (b===0 && !(a===0)) {    // Don't allow division by 0
        window.alert("ILLEGAL MATH DETECTED");
        return a;
    }
    if (b===0 & a===0) {        // 0/0 should return 0, rather than NaN
        return 0;
    }
    return a/b;
}

function changeSign(a) {
    return -1*a;
}

function mod(a,b) {
    return a%b;
}

// A useful function for the default behavior of operand: nothing changes
function doNothing(a,b) {
    return a;
}

// Operate function takes in an operation name as a string, then returns the appropriate math.
function operate(operator, a, b) {
    a = parseFloat(a);                  // Convert a and b to float
    b = parseFloat(b);
    onFirstOperation = true;            // We're on our first operation here
 
    let returnValue = 0;                // Initialize return value
    switch (operator) {                 // Operate based on the passed operator
        case "add": 
            returnValue = add(a,b);
            break;
        case "subtract": 
            returnValue = subtract(a,b);
            break;
        case "multiply": 
            returnValue = multiply(a,b);
            break;
        case "divide": 
            returnValue = divide(a,b);
            break;
        case "mod":
            returnValue = mod(a,b);
            break;
        case "doNothing": 
            returnValue = doNothing(a,b);
            break;
        default: 
            console.log("OPERATE took a weird input: "+operator);
            returnValue = a;
            break;
    }

    returnValue = Math.round(returnValue*(10**numPlaces))/(10**numPlaces);  // Round to desired decimal places

    return returnValue;
}
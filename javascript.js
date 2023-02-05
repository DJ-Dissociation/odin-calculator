

// function test() {
//     console.log("hello!")
// }

let displayValue = 0;                               // Initialize display with 0
let display = document.querySelector('.display');   // Find display node to update it later
let a = "";
let b = "";
let onFirstValue = true;
let operand = "add";

const numberButtons = document.querySelectorAll('.numberButton'); // Find set of number buttons
numberButtons.forEach( (button) => {
    button.addEventListener('click', () => {
        console.log(button.textContent);
        if (onFirstValue) {
            a += button.textContent;
            console.log("a: "+a);
            updateDisplay(a)
        } else {
            b += button.textContent;
            console.log("b: "+b);
            updateDisplay(b)
        }
        
    })
})

const operandButtons = document.querySelectorAll('.operandButton'); // Find set of number buttons
operandButtons.forEach( (button) => {
    button.addEventListener('click', () => {
        console.log(button.id);
        operand = button.id;
        onFirstValue = false;

        //displayValue = button.id;
        //updateDisplay(displayValue);
    })
})

const evalButton = document.querySelector('.equalsButton');
evalButton.addEventListener('click', () => {
    displayValue = operate(operand, parseInt(a), parseInt(b));
    console.log(displayValue);
    updateDisplay(displayValue);
    a = displayValue;
})

function updateDisplay(displayValue) {
    display.textContent = displayValue;
}

// Basic 4 arithmetic functions
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
    if (b===0) {        // Don't allow division by 0
        console.log("ILLEGAL MATH DETECTED");
        return a;
    }
    return a/b;
}

// Operate function takes in an operation name as a string, then returns the appropriate math.
function operate(operator, a, b) {
    switch (operator) {
        case "add": return add(a,b);
        case "subtract": return subtract(a,b);
        case "multiply": return multiply(a,b);
        case "divide": return divide(a,b);
        default: 
            console.log("OPERATE took a weird input: "+operator);
            return a;
    }
}
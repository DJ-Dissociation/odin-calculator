// Initialize globals
let displayValue = 0;                               // Initialize display with 0
let display = document.querySelector('.display');   // Find display node to update it later
let a = "";
let b = "";
let onFirstValue = true;
let operand = "doNothing";
let onFirstOperation = true;

const numberButtons = document.querySelectorAll('.numberButton'); // Find set of number buttons
numberButtons.forEach( (button) => {
    button.addEventListener('click', () => {
        console.log(button.textContent);
        if (onFirstValue) {
            a += button.textContent;
            console.log("a: "+a);
            displayValue = a;
            updateDisplay(displayValue);
        } else {
            //console.log("b before clicking is: "+b)
            b += button.textContent;
            //console.log("b after clicking is: "+b)
            console.log("b: "+b);
            displayValue = b;
            updateDisplay(displayValue);
            //console.log("TEST")
        }
        
    })
})

const operandButtons = document.querySelectorAll('.operandButton'); // Find set of number buttons
operandButtons.forEach( (button) => {
    button.addEventListener('click', () => {
        if (!onFirstOperation) {
            displayValue = operate(operand, parseFloat(a), parseFloat(b));
            //console.log(displayValue);
            updateDisplay(displayValue);
            a = displayValue;
            b = "";
        }
        console.log(button.id);
        operand = button.id;
        onFirstValue = false;
        onFirstOperation = false;
    })
})

const clearButton = document.querySelector('.clearButton');
clearButton.addEventListener('click', () => {
    a = "";
    b = "";
    displayValue = 0;
    operand = "doNothing";
    onFirstValue = true;
    onFirstOperation = true;
    updateDisplay(displayValue);
})

const dotButton = document.querySelector('.dotButton');
dotButton.addEventListener('click', () => {
    dotButton.disabled = true;
})

const evalButton = document.querySelector('.equalsButton');
evalButton.addEventListener('click', () => {
    displayValue = operate(operand, parseFloat(a), parseFloat(b));
    //console.log(displayValue);
    updateDisplay(displayValue);
    a = displayValue;
    b = "";
})

const signButton = document.querySelector('.signButton');
signButton.addEventListener('click', () => {
    displayValue = changeSign(a);
    a = -1*a;
    //console.log("a should have changed here: "+a)
    updateDisplay(displayValue);
})

function updateDisplay(displayValue) {
    displayValue = Math.round(displayValue*100)/100
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
    if (b===0 && !(a===0)) {        // Don't allow division by 0
       // console.log("ILLEGAL MATH DETECTED");
        window.alert("ILLEGAL MATH DETECTED");
        return a;
    }
    if (b===0 & a===0) {    // 0/0 should return 0, rather than NaN
        return 0;
    }
    return a/b;
}

function changeSign(a) {
    //a = -1*a;
    return -1*a;
}

function doNothing(a,b) {
    return a;
}

// Operate function takes in an operation name as a string, then returns the appropriate math.
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    onFirstOperation = true;
    dotButton.disabled = false;
 
    let returnValue = 0;
    switch (operator) {
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
        // case "sign":
        //     returnValue = changeSign(a);
        //     break;
        case "doNothing": 
            returnValue = doNothing(a,b);
            break;
        default: 
            console.log("OPERATE took a weird input: "+operator);
            returnValue = b;
            break;
    }

    //let temp = a;
    //b = a;
    //a = temp;
    // a = b;
    // b = 0;
    // console.log("b should be set to 0 here: "+ b)
    return returnValue;
}
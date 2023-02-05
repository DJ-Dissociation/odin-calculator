function test() {
    console.log("hello!")
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
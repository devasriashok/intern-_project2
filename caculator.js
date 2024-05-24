function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero";
    }
    return a / b;
}

function modulo(a, b) {
    return a % b;
}

function power(a, b) {
    return Math.pow(a, b);
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    modulo,
    power
};
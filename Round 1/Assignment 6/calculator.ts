const display = document.getElementById('display') as HTMLInputElement;
let currentInput = '0';
let operator = '';
let prevInput = '0';
let waitingForSecondOperand = false;

function updateDisplay() {
    display.value = currentInput;
}

function handleDigitClick(digit: string) {
    if (currentInput === '0' || waitingForSecondOperand) {
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        currentInput += digit;
    }
    updateDisplay();
}

function handleOperatorClick(newOperator: string) {
    if (operator && !waitingForSecondOperand) {
        calculate();
    }
    operator = newOperator;
    prevInput = currentInput;
    waitingForSecondOperand = true;
}

function calculate() {
    const prevValue = parseFloat(prevInput);
    const currentValue = parseFloat(currentInput);

    switch (operator) {
        case '+':
            currentInput = (prevValue + currentValue).toString();
            break;
        case '-':
            currentInput = (prevValue - currentValue).toString();
            break;
        case '*':
            currentInput = (prevValue * currentValue).toString();
            break;
        case '/':
            currentInput = (prevValue / currentValue).toString();
            break;
    }

    operator = '';
    prevInput = '0';
    updateDisplay();
    waitingForSecondOperand = false;
}

function handleClearClick() {
    currentInput = '0';
    operator = '';
    prevInput = '0';
    waitingForSecondOperand = false;
    updateDisplay();
}

function handleBackspaceClick() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function handleDecimalClick() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            const value = target.textContent;

            if (!isNaN(parseInt(value))) {
                handleDigitClick(value);
            } else if (value === '+' || value === '-' || value === '*' || value === '/') {
                handleOperatorClick(value);
            } else if (value === '=') {
                calculate();
            } else if (value === 'C') {
                handleClearClick();
            } else if (value === '&#9003;') {
                handleBackspaceClick();
            } else if (value === '.') {
                handleDecimalClick();
            }
        });
    });
});

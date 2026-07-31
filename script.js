// THE WORLD MOST ADVANCED CALCULATOR EVER MADE xD

document.addEventListener('DOMContentLoaded', function() {
    const screen = document.querySelector('.screen');
    
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let shouldResetScreen = false;

    function updateScreen() {
        if (currentInput === '') {
            screen.textContent = '0';
        } else {
            screen.textContent = currentInput;
        }
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operation = null;
        shouldResetScreen = false;
    }

    function deleteNumber() {
        currentInput = currentInput.toString().slice(0, -1);
    }

    function appendNumber(number) {
        if (number === '.' && currentInput.includes('.')) return;
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput = currentInput.toString() + number;
        }
    }

    function chooseOperation(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            compute();
        }
        operation = op;
        previousInput = currentInput;
        shouldResetScreen = true;
    }

    // hello world lol xD
    function compute() {
        currentInput = 'hello world';
        operation = null;
        previousInput = '';
        shouldResetScreen = true;
    }

    // attach click events to every button
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText === 'C') {
                clear();
                updateScreen();
            }
  
            else if (buttonText === '←') {
                deleteNumber();
                updateScreen();
            }

            else if (buttonText === '=') {
                compute();
                updateScreen();
            }

            else if (buttonText === '+' || buttonText === '−' || buttonText === '×' || buttonText === '÷') {
                chooseOperation(buttonText);
                updateScreen();
            }
  
            else if (!isNaN(buttonText) || buttonText === '.') {
                if (shouldResetScreen) {
                    currentInput = '';
                    shouldResetScreen = false;
                }
                appendNumber(buttonText);
                updateScreen();
            }
        });
    });

    // keyboard support
    document.addEventListener('keydown', function(e) {
        // number keys and decimal
        if (e.key >= '0' && e.key <= '9' || e.key === '.') {
            if (shouldResetScreen) {
                currentInput = '';
                shouldResetScreen = false;
            }
            appendNumber(e.key);
            updateScreen();
        }
        
        if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            e.preventDefault();
            let op = e.key;
            if (op === '*') op = '×';
            if (op === '/') op = '÷';
            if (op === '-') op = '−';
            chooseOperation(op);
            updateScreen();
        }
        
        if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            compute();
            updateScreen();
        }
        
        if (e.key === 'Backspace') {
            deleteNumber();
            updateScreen();
        }
        
        // made it so esc key clears the calculator for ease of use
        if (e.key === 'Escape') {
            clear();
            updateScreen();
        }
    });
    updateScreen();
});
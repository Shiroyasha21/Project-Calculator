const numDisplay = document.querySelector('.numbers');
const operatorDisplay = document.querySelector('.operators');
const funcDisplay = document.querySelector('.functions');

const arrayOperator = ['*', '-', '+', '=']
const arrayFunc = ['C', 'Del', '%', '/']

function buttonGenerator() {
    for (i = 1; i < 10 ; i++) {
        const numButtons = document.createElement('button');
        numButtons.textContent = i;
        numButtons.className = 'num-btn'
        numDisplay.append(numButtons);
    }
    for (i = 0; i < arrayOperator.length; i++) {
        const operatorBtn = document.createElement('button');
        operatorBtn.textContent = arrayOperator[i];
        operatorBtn.className = 'opr-btn';
        if (arrayOperator[i] === arrayOperator [3]) {
            operatorBtn.classList.add('equal-btn');
        }
        operatorDisplay.append(operatorBtn);
    }
    for (i = 0; i < arrayFunc.length; i++) {
        const funcBtn = document.createElement('button');
        funcBtn.textContent = arrayFunc[i];
        funcBtn.className = 'func-btn';
        funcDisplay.append(funcBtn);
    }
}

buttonGenerator();



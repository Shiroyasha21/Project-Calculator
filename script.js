const numDisplay = document.querySelector('.numbers');
const operatorDisplay = document.querySelector('.operators');

const arrayOperator = ['/', '*', '-', '+']

function buttonGenerator() {
    for (i = 0; i < 10 ; i++) {
        const numButtons = document.createElement('button');
        numButtons.textContent = i;
        numButtons.className = 'num-btn'
        numDisplay.append(numButtons);
    }
    for (i = 0; i < arrayOperator.length; i++) {
        const operatorBtn = document.createElement('button');
        operatorBtn.textContent = arrayOperator[i];
        operatorBtn.className = 'opr-btn';
        operatorDisplay.append(operatorBtn);
    }
}

buttonGenerator();



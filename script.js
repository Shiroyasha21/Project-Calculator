const numDisplay = document.querySelector('.numbers');
const operatorDisplay = document.querySelector('.operators');

const arrayOperator = ['/', '*', '-', '+']

function numButtonMaker() {
    for (i = 0; i < 10 ; i++) {
        const numButtons = document.createElement('button');
        numButtons.textContent = i;
        numDisplay.append(numButtons);
    }
    

}

numButtonMaker();




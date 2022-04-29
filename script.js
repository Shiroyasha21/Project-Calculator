const numDisplay = document.querySelector('.numbers');
const operatorDisplay = document.querySelector('.operators');
const funcDisplay = document.querySelector('.functions');

const arrayOperator = ['x', '-', '+', '=']
const arrayFunc = ['C', 'Del', '-/+', '/']

function buttonGenerator() {
    for (i = 1; i < 10; i++) {
        const numButtons = document.createElement('button');
        numButtons.textContent = i;
        numButtons.classList.add('num-btn');
        numButtons.classList.add('numbers-btn');
        numButtons.setAttribute('data-key', `Numpad${i}`);
        numDisplay.append(numButtons);
    }
    for (i = 0; i < arrayOperator.length; i++) {
        const operatorBtn = document.createElement('button');
        operatorBtn.textContent = arrayOperator[i];
        operatorBtn.classList.add('opr-btn', 'operator-func');
        if (arrayOperator[i] === arrayOperator [3]) {
            operatorBtn.classList.remove('operator-func');
            operatorBtn.classList.add('equal-btn');
            operatorBtn.setAttribute('data-key', 'NumpadEnter');
        } else if (arrayOperator[i] === arrayOperator [0]) {
            operatorBtn.setAttribute('data-key', 'NumpadMultiply');
        }  else if (arrayOperator[i] === arrayOperator [1]) {
            operatorBtn.setAttribute('data-key', 'NumpadSubtract');
        }  else if (arrayOperator[i] === arrayOperator [2]) {
            operatorBtn.setAttribute('data-key', 'NumpadAdd');
        }
        operatorDisplay.append(operatorBtn);
    }
    for (i = 0; i < arrayFunc.length; i++) {
        const funcBtn = document.createElement('button');
        funcBtn.textContent = arrayFunc[i];
        funcBtn.className = 'func-btn';
        if (arrayFunc[i] === arrayFunc[3]) {
            funcBtn.classList.replace('func-btn', 'opr-btn');
            funcBtn.classList.add('operator-func');
            funcBtn.setAttribute('data-key', 'NumpadDivide');
        } else if (arrayFunc[i] === arrayFunc[0]) {
            funcBtn.classList.add('cancel-btn');
        } else if (arrayFunc[i] === arrayFunc[1]) {
            funcBtn.classList.add('del-btn');
            funcBtn.setAttribute('data-key', 'Backspace');
        } else if (arrayFunc[i] === arrayFunc[2]) {
            funcBtn.classList.add('sign-btn');
        }
        funcDisplay.append(funcBtn);
    }
}
buttonGenerator();

const calc = {
    add: function (a, b) {
        if (Number.isInteger(a + b)) {
            let answer = a + b;
            let length = Math.max(Math.floor(Math.log10(Math.abs(answer))), 0) + 1;
            if (length > 8) {
                return answer.toExponential();
            }
            return a + b;
        }
        return (Math.round((a+b) * 100) / 100).toFixed(2);
    },
    subtract: function (a, b) {
        if (Number.isInteger(a - b)) {
            let answer = a - b;
            let length = Math.max(Math.floor(Math.log10(Math.abs(answer))), 0) + 1;
            if (length > 8) {
                return answer.toExponential();
            }
            return a - b;
        }
        return (Math.round((a-b) * 100) / 100).toFixed(2);
    },
    multiply: function (a, b) {
        if (Number.isInteger(a * b)) {
            let answer = a * b;
            let length = Math.max(Math.floor(Math.log10(Math.abs(answer))), 0) + 1;
            if (length > 8) {
                return answer.toExponential();
            }
            return a * b;
        }
        return (Math.round((a*b) * 100) / 100).toFixed(2);
    },
    divide: function (a, b) {
        if (Number.isInteger(a / b)) {
            let answer = a / b;
            let length = Math.max(Math.floor(Math.log10(Math.abs(answer))), 0) + 1;
            if (length > 8) {
                return answer.toExponential();
            }
            return a / b;
        }
        return (Math.round((a/b) * 100) / 100).toFixed(2);
    }
}

const display1 = document.querySelector('.display1');
const display2 = document.querySelector('.display2');
const numButtons = document.querySelectorAll('.numbers-btn');
const dotBtn = document.querySelector('#dot-btn')
const operatorButtons = document.querySelectorAll('.operator-func');
const equalOperator = document.querySelector('.equal-btn');
const cancelFunc = document.querySelector('.cancel-btn');
const delFunc = document.querySelector('.del-btn');
const signFunc = document.querySelector('.sign-btn');

let digitsDisplay = '';
let oprDisplay = '';
let kbKey;

let a;
let b = '';
let num1;
let num2;
let opr = '';
let result;
let isEqualRan = '';

const numArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operatorArray = ['/', 'x', '-', '+'];

window.addEventListener('keydown', function(e) {
    const keyboardFunc = document.querySelector(`button[data-key = "${e.code}"]`);
    if (!keyboardFunc) {
        return 1;
    }
    if (numArray.includes(keyboardFunc.textContent)) {
        this.textContent = keyboardFunc.textContent;
        registerNumBtn();
    } else if (operatorArray.includes(keyboardFunc.textContent)) {
        this.textContent = keyboardFunc.textContent;
        registerOperatorBtn();
    } else if (keyboardFunc.textContent === '=') {
        equalOperate();
    } else if (keyboardFunc.textContent === '.') {
        this.textContent = keyboardFunc.textContent;
        registerDotBtn();
    } else if (keyboardFunc.textContent === 'Del') {
        deleteNum();
    }
});

numButtons.forEach(numBtn  => {
    numBtn.addEventListener('click', registerNumBtn)
})

function registerNumBtn () {
    if (isEqualRan) {
        cancel();
        digitsDisplay += this.textContent;
        display2.textContent = digitsDisplay;
    } else {
        digitsDisplay += this.textContent;
        display2.textContent = digitsDisplay;
        if (opr) {
            b = digitsDisplay;
        }
    }
}

dotBtn.addEventListener('click', registerDotBtn);

function registerDotBtn () {
    if (digitsDisplay.indexOf('.') > -1) {
        void(0);
    } else {
        if (isEqualRan) {
            cancel();
            digitsDisplay += this.textContent;
            display2.textContent = digitsDisplay;
        } else {
            digitsDisplay += this.textContent;
            display2.textContent = digitsDisplay;
            if (opr) {
                b = digitsDisplay;
            }
        }
    }
}

equalOperator.addEventListener('click', equalOperate);

function equalOperate () {
    if (display1.textContent.indexOf('=') > -1) {
        void(0);
    } else {
        if (b === '') {
            void(0);
        } else {
            b = digitsDisplay;
            integerFix();
            operateMethod(num1, num2, opr);
            display1.textContent += `${b} =`;
            isEqualRan = true;
        }
    }
}

operatorButtons.forEach(oprBtn => {
    oprBtn.addEventListener('click', registerOperatorBtn)
})

function registerOperatorBtn () {
    if (isEqualRan) {
        display2.textContent = '';
        a = result;
        opr = this.textContent;
        digitsDisplay = '';
        display1.textContent = '';
        display1.textContent = `${a} ${this.textContent}`
        isEqualRan = false;
    } else {
        if (a == undefined) {
            opr = this.textContent;    
            a = digitsDisplay;
            display1.textContent += `${digitsDisplay} ${this.textContent} `;
        }
        digitsDisplay = '';
        if (b) {
            display1.textContent += `${b} ${this.textContent} `;
            integerFix();
            operateMethod(num1, num2, opr);
            a = result;
            opr = this.textContent;
        }
    }
}

cancelFunc.addEventListener('click', cancel);

function cancel () {
    display1.textContent = '';
    display2.textContent = '';
    digitsDisplay = '';
    oprDisplay = '';
    a = undefined;
    b = '';
    opr = '';
    result = 0;
    isEqualRan = false;
}

delFunc.addEventListener('click', deleteNum);

function deleteNum () {
    if (b) {
        digitsDisplay = digitsDisplay.slice(0, -1);
        display2.textContent = digitsDisplay;
        digitsDisplay = display2.textContent;
        b = digitsDisplay;
    } else {
        digitsDisplay = digitsDisplay.slice(0, -1);
        display2.textContent = digitsDisplay;
    }
}

signFunc.addEventListener('click', function(e) {
    if (digitsDisplay === '') {
        void(0);
    } else {
        digitsDisplay = -(digitsDisplay);
        display2.textContent = digitsDisplay;
    }
})

function integerFix() {
    (Math.round(a * 100) / 100).toFixed(2);
    (Math.round(b * 100) / 100).toFixed(2);
    num1 = parseFloat(a);
    num2 = parseFloat(b);
}

function operateMethod(a, b, opr) {
    if (b === 0 && opr === '/') {
        cancel();
        display2.textContent = 'nooooo'
    } else if (opr === '+') {
        result = calc.add(a, b);
        display2.textContent = result;
    } else if (opr === '-') {
        result = calc.subtract(a,b);
        display2.textContent = result;
    } else if (opr === 'x') {
        result = calc.multiply(a,b)
        display2.textContent = result;
    } else if (opr === '/') {
        result = calc.divide(a,b)
        display2.textContent = result;
    }
}


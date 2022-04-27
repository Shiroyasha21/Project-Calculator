const numDisplay = document.querySelector('.numbers');
const operatorDisplay = document.querySelector('.operators');
const funcDisplay = document.querySelector('.functions');

const arrayOperator = ['*', '-', '+', '=']
const arrayFunc = ['C', 'Del', '-/+', '/']

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
        operatorBtn.classList.add('opr-btn', 'operator-func');
        if (arrayOperator[i] === arrayOperator [3]) {
            operatorBtn.classList.remove('operator-func');
            operatorBtn.classList.add('equal-btn');
        }
        operatorDisplay.append(operatorBtn);
    }
    for (i = 0; i < arrayFunc.length; i++) {
        const funcBtn = document.createElement('button');
        funcBtn.textContent = arrayFunc[i];
        funcBtn.className = 'func-btn';
        if (arrayFunc[i] === arrayFunc[3]) {
            funcBtn.classList.replace('func-btn', 'opr-btn');
        } else if (arrayFunc[i] === arrayFunc[0]) {
            funcBtn.classList.add('cancel-btn');
        } else if (arrayFunc[i] === arrayFunc[1]) {
            funcBtn.classList.add('del-btn');
        } else if (arrayFunc[i] === arrayFunc[2]) {
            funcBtn.classList.add('sign-btn');
        }
        funcDisplay.append(funcBtn);
    }
}
buttonGenerator();

const calc = {
    add: function (a, b) {
        return a + b;
    },
    subtract: function (a, b) {
        return a - b;
    },
    multiply: function (a, b) {
        return a*b;
    },
    divide: function (a, b) {
        return a/b;
    },
}

const display1 = document.querySelector('.display1');
const display2 = document.querySelector('.display2');
const numButtons = document.querySelectorAll('.num-btn');
const operatorButtons = document.querySelectorAll('.operator-func');
const equalOperator = document.querySelector('.equal-btn');
const cancelFunc = document.querySelector('.cancel-btn');
const delFunc = document.querySelector('.del-btn');
const signFunc = document.querySelector('.sign-btn');

let digitsDisplay = '';
let oprDisplay = '';

let a;
let b = '';
let num1;
let num2;
let factorial;
let opr = '';
let result;
let isEqualRan = '';
let factorClicked = '';

numButtons.forEach(numBtn  => {
    numBtn.addEventListener('click', function(e) {
        if (factorClicked) {
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
    })
})

equalOperator.addEventListener('click', function(e) {
    if (b === '') {
        void(0);
    } else {
        b = digitsDisplay;
        integerFix();
        operateMethod(num1, num2, opr);
        display1.textContent += `${b} =`;
        isEqualRan = true;
    }
})

operatorButtons.forEach(oprBtn => {
    oprBtn.addEventListener('click', function(e) {
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
                if (factorClicked) {
                    opr = this.textContent;
                    display1.textContent += `${digitsDisplay}! ${this.textContent} `;
                    a = result;
                    factorCheck = false;
                    factorClicked = false;
                } else {
                    opr = this.textContent;    
                    a = digitsDisplay;
                    display1.textContent += `${digitsDisplay} ${this.textContent} `;
                }
            }
            digitsDisplay = '';
            if (b) {
                if (factorClicked) {
                    display1.textContent += `${factorial}! ${this.textContent} `;
                    integerFix();
                    operateMethod(num1, num2, opr);
                    a = result;
                    opr = this.textContent;
                    factorCheck = false;
                    factorClicked = false;
                } else {
                    display1.textContent += `${b} ${this.textContent} `;
                    integerFix();
                    operateMethod(num1, num2, opr);
                    a = result;
                    opr = this.textContent;
                }
            }
        }
    })
})

cancelFunc.addEventListener('click', function(e) {
    cancel();
})

const cancel = () => {
    display1.textContent = '';
    display2.textContent = '';
    digitsDisplay = '';
    oprDisplay = '';
    a = undefined;
    b = '';
    opr = '';
    result = 0;
    isEqualRan = false;
    factorClicked = '';
    factorCheck = '';
}

delFunc.addEventListener('click', function(e) {
    if (b) {
        digitsDisplay = digitsDisplay.slice(0, -1);
        display2.textContent = digitsDisplay;
        digitsDisplay = display2.textContent;
        b = digitsDisplay;
    } else {
        digitsDisplay = digitsDisplay.slice(0, -1);
        display2.textContent = digitsDisplay;
    }
})

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
    (Math.round(result * 100) / 100).toFixed(2);
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
    } else if (opr === '*') {
        result = calc.multiply(a,b)
        display2.textContent = result;
    } else if (opr === '/') {
        result = calc.divide(a,b)
        display2.textContent = result;
    }
}


// factorFunc.addEventListener('click', function(e) {
//     if (digitsDisplay == false) {
//         void(0);
//     } else {
//         factorClicked = true;
//         factorCheck = true;
//         if (opr) {
//             factorial = digitsDisplay;
//             display2.textContent = `${factorial}! `
//             num = factorial;
//             integerFix();
//             operateMethod(num);
//             b = result;
//         } else {
//             factorial = digitsDisplay;
//             display2.textContent = `${factorial}! `
//             num = factorial;
//             integerFix();
//             factorMethod(num);
//         }
//     }
// })

// function factorMethod (num) {
//     if (num === 0 || num === 1) return 1;
//         for (var i = num - 1; i >= 1; i--) {
//             num *= i;
//         }
//         result = num;
// }


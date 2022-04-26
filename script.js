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
        if (arrayFunc[i] === arrayFunc[3]) {
            funcBtn.classList.replace('func-btn', 'opr-btn');
        } else if (arrayFunc[i] === arrayFunc[0]) {
            funcBtn.classList.add('cancel-btn');
        } else if (arrayFunc[i] === arrayFunc[1]) {
            funcBtn.classList.add('del-btn');
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
    }
}

const display1 = document.querySelector('.display1');
const display2 = document.querySelector('.display2');
const numButtons = document.querySelectorAll('.num-btn');
const operatorButtons = document.querySelectorAll('.opr-btn');
const equalOperator = document.querySelector('.equal-btn');
const cancelFunc = document.querySelector('.cancel-btn');
const delFunc = document.querySelector('.del-btn');

let digitsDisplay = '';
let oprDisplay = '';

let a = '';
let b = '';
let opr = '';
let result;


numButtons.forEach(numBtn  => {
    numBtn.addEventListener('click', function(e) {
        digitsDisplay += this.textContent;
        display2.textContent = digitsDisplay;
    })
})

equalOperator.addEventListener('click', function(e) {
    b += digitsDisplay;
    num1 = parseInt(a);
    num2 = parseInt(b);
    
    operateMethod(num1, num2, opr);
})

operatorButtons.forEach(oprBtn => {
    oprBtn.addEventListener('click', function(e) {
        opr = this.textContent;
        if (digitsDisplay) {
            a = digitsDisplay;
            display1.textContent += `${digitsDisplay} ${this.textContent} `;
            digitsDisplay = '';
            
            
        } else {
            void(0);
        }
    })
})

cancelFunc.addEventListener('click', function(e) {
    digitsDisplay = '';
    oprDisplay = '';
    a = '';
    b = '';
    opr = '';
    result = '';
    display1.textContent = digitsDisplay;
    display2.textContent = digitsDisplay;
})

delFunc.addEventListener('click', function(e) {
    digitsDisplay = digitsDisplay.slice(0, -1);
    display2.textContent = digitsDisplay;
})

function operateMethod(a, b, opr) {
    if (opr === '+') {
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



//Simple Operation
    //calc takes user input
        //calc takes num1 from user
            //calc stores and display num1
        //calc takes operator from user
            //calc display num1 and operator(+) inputs in another display
        //calc takes num2 from user
            //display num 2
            //IF calc got another operator(+)
                //run the last operator function
                    //produce result
                //display the current operator(+)
            //IF ELSE calc got EQUAL operator
                //run the last operator function
                    //show EQUAL sign 
                    //show result
//


//calc process
    //clicking number button
        //run the NUMBER EVENT1
            //display the each clicked number button on DISPLAY 2
            //concat every number button register to a variable (stores num1)
            //assign the num1 value to function argument ('a')
    //clicking an operator button
        //check for num1 value
            //IF num1 value is present / returns TRUE
                //display (num1) and the clicked operator button on DISPLAY 2
                //run the code below (OPERATE METHOD)
            //ELSE do nothing
        //run OPERATE METHOD
            //check for num2 or 'b' value
                //IF num2 or 'b' value is UNDEFINED
                    //run the OPERATE EVENT
                        //check for the operator function
                        //register the operator and its function
                //ELSE IF num2 or 'b' value returns TRUE
                    //run the OPERATE EVENT
                    //run the OPERATOR FUNCTION
                        //takes num1/num2 as argument (a,b)
                        //run the equivalent OPERATOR FUNCTION checked by the OPERATE EVENT
                        //show result
                            //assign result to num1 or argument 'a'
    //clicking the EQUAL operator
        //check for num1 & num2 value
            //IF num1 && num2 returns FALSE/UNDEFINED
                //do nothing
            //IF num1 && num2 returns TRUE
                //run OPERATE METHOD



                
        







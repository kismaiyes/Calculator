const operandDisplay = document.querySelector('.calculator-screen')

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
}

function inputNum(num) {
  const { displayValue, waitingForSecondOperand } = calculator
  calculator.displayValue = displayValue === '0' ? num : displayValue + num

  if (waitingForSecondOperand === true) {
    calculator.displayValue = num
    calculator.waitingForSecondOperand = false
  } else {
    calculator.displayValue = displayValue === '0' ? num : displayValue + num
  }
  console.log(calculator)
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0'
    calculator.waitingForSecondOperand = false
    return
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue)

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator
    console.log(calculator)
    return
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue
  } else if (operator) {
    const result = calculation(firstOperand, inputValue, operator)

    calculator.displayValue =`${parseFloat(result.toFixed(7))}`
    calculator.firstOperand = result
  }

  calculator.waitingForSecondOperand = true
  calculator.operator = nextOperator

  console.log(calculator)
}

function calculation(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand
  } else if (operator === '-') {
    return firstOperand - secondOperand
  } else if (operator === '*') {
    return firstOperand * secondOperand
  } else if (operator === '÷') {
    return firstOperand / secondOperand
  }

  return secondOperand
}

function deleteNum() {
  if (calculator.displayValue == 0) {
    return
  }

  calculator.displayValue = calculator.displayValue.slice(
    0,
    calculator.displayValue.length - 1
  )
}
  
function clearAll() {
  calculator.displayValue = '0'
  calculator.firstOperand = null
  calculator.waitingForSecondOperand = false
  calculator.operator = null
  console.log(calculator)
}

function updateDisplay() {
  operandDisplay.value = calculator.displayValue
}

updateDisplay()

const keys = document.querySelector('.calculator-keys')
keys.forEach((element) => {
  element.addEventListener('click', (event) => {
    const { target } = event
    const { innerHTML } = target

    switch (innerHTML) {
      case '+':
      case '-':
      case '*':
      case '÷':
      case '=':
        handleOperator(innerHTML)
        break
      case '%':
        percent(innerHTML)
        break
      case '.':
        inputDecimal(innerHTML)
        break
      case 'AC':
        clearAll()
        break
      case 'DEL':
        deleteNum()
      default:
        if (Number.isInteger(parseFloat(innerHTML))) {
          inputNum(innerHTML)
        }
    }

    updateDisplay()
  })
})

// deleteButt.onclick = () => deleteNumbers()

// function deleteNumbers () {
//   operandDisplay.textContent = operandDisplay.textContent.slice(0, -1)
// }

// allClearButt.onclick = () => clearAll()

// function clearAll() {
//   operandDisplay.textContent = ''

// // get all buttons
// const numbButt = document.querySelectorAll('[data-number]')
// const operatorsButt = document.querySelectorAll('[data-type="operator"]')
// const equalButt = document.querySelector('[data-equals]')
// const deleteButt = document.getElementById('del')
// const allClearButt = document.getElementById('all-clear')
// const percentButt = document.querySelector('[percentage]')
// const operandDisplay = document.getElementById('curr-operand')
// // const operandDisplay = document.getElementById('prev-operand')
// const calcBody = document.querySelector('.calculator-body')

// // display textContent
// calcBody.addEventListener('click', e => {
//   if(!e.target.closest('button')) return
//     const key = e.target
//     const keyValue = key.textContent
//     const displayValue = operandDisplay.textContent
//     const { type } = key.dataset
//     const { prevInput } = calcBody.dataset

//     if(type === 'number') {
//       if (displayValue === '.' || displayValue.includes('.')) return
//       if (displayValue === '0' || prevInput === 'operator') {
//         operandDisplay.textContent = keyValue
//       } else {
//         operandDisplay.textContent = displayValue + keyValue
//       }
//       calcBody.dataset.prevInput = 'number'
//     }

//     if(type === 'operator') {
//       operatorsButt.forEach(el => {el.dataset.state = ''})
//       key.dataset.state = 'selected'
//     }

//     if(type === 'equal') {

//     }

// })

// // clear all function
// allClearButt.onclick = () => clearAll()

// function clearAll() {
//   operandDisplay.textContent = ''
//   // prevOperandDisplay.textContent = ''
// }

// // delete numbers in current operand
// deleteButt.onclick = () => deleteNumbers()

// function deleteNumbers () {
//   operandDisplay.textContent = operandDisplay.textContent.slice(0, -1)
// }

// // create functions for operators
// function add(num1, num2) {
//   return num1 + num2
// }

// function subtract(num1, num2) {
//   return num1 - num2
// }

// function multiply(num1, num2) {
//   return num1 * num2
// }

// function divide(num1, num2) {
//   return num1 / num2
// }

// function operate(op, num1, num2) {
//   num1 = Number(num1)
//   num2 = Number(num2)
//   switch (op) {
//     case '+':
//       return add(num1, num2)
//     case '-':
//       return subtract(num1, num2)
//     case '&#215;':
//       return multiply(num1, num2)
//     case '÷':
//       if (num2 === 0) return 'Syntax error'
//       return divide(num1, num2)
//   }
// }

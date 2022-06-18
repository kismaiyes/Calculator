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

function percent(i) {
  const { displayValue } = calculator

  if (displayValue == 0) {
    return
  }
  const result = displayValue / 100
  calculator.displayValue = parseFloat(result.toFixed(64))
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue)

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator
    return
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue
  } else {
    const result = calculate(firstOperand, inputValue, operator)
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`
    calculator.firstOperand = result
  }

  calculator.waitingForSecondOperand = true
  calculator.operator = nextOperator
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand
  } else if (operator === '-') {
    return firstOperand - secondOperand
  } else if (operator === '×') {
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
}

function updateDisplay() {
  operandDisplay.value = calculator.displayValue
}

updateDisplay()

const keys = document.querySelector('.calculator-keys')

keys.addEventListener('click', (event) => {
  const { target } = event
  const { innerHTML } = target

  switch (innerHTML) {
    case '+':
    case '-':
    case '÷':
    case '×':
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
      break
    default:
      if (Number.isInteger(parseFloat(innerHTML))) {
        inputNum(innerHTML)
      }
  }

  updateDisplay()
})

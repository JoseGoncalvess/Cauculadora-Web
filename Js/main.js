//Seletoresr de interface
const numberButtons = document.querySelectorAll('[data-number]')
const operationButons = document.querySelectorAll('[data-operator]')
const igualButton = document.querySelector('[data-igual]')
const allClearbutton = document.querySelector('[data-all-clear]')
const deletButton = document.querySelector('[data-delet]')
const previousOperandtextElemennt = document.querySelector(
  '[data-previuos-operand]'
)
const currentOperandtextElemennt = document.querySelector(
  '[data-previoues-current]'
)

//guardae a informação para calculo
class Calculator {
  constructor(previousOperandtextElemennt, currentOperandtextElemennt) {
    this.previousOperandtextElemennt = previousOperandtextElemennt
    this.currentOperandtextElemennt = currentOperandtextElemennt
    this.clear()
  }
  //formatar o display
  formatDisplayNumber(number) {
    const stringNumber = number.toString()

    const intergerDigits = parseInt(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]

    let integerDisplay

    if (isNaN(intergerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = intergerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  //funcão delelte
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  //função apra caucular o previus com o currente
  calculate() {
    let result
    const _previousOperand = parseFloat(this.previousOperand)
    const _currentOperand = parseFloat(this.currentOperand)

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return

    switch (this.operation) {
      case '+':
        result = _previousOperand + _currentOperand
        break
      case '-':
        result = _previousOperand - _currentOperand
        break
      case '*':
        result = _previousOperand * _currentOperand
        break
      case '÷':
        result = _previousOperand / _currentOperand
        break

      default:
        return
    }

    this.currentOperand = result
    this.operation = undefined
    this.previousOperand = ''
  }

  //colcoando o valor adicionado para cima guardado o valor para efetuar a operation
  chooseOperation(operation) {
    if (this.currentOperand == '') return
    if (this.previousOperand != '') {
      this.calculate()
    }

    this.operation = operation

    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  //receber os numeros discados em tela
  appendNumber(number) {
    if (this.currentOperand.includes('.') && number == '.') return
    this.currentOperand = `${this.currentOperand}${number.toString()}`
  }

  //função para limpar os campos
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
  //atualização do display sempre chamar ao executar uma funça na tela
  updateDisplay() {
    this.previousOperandtextElemennt.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )}${this.operation || ''}`
    this.currentOperandtextElemennt.innerText = this.formatDisplayNumber(
      this.currentOperand
    )
  }
}

//chamado da função
const calculator = new Calculator(
  previousOperandtextElemennt,
  currentOperandtextElemennt
)
//captar o click do button e add o valor no displal
for (const numberButton of numberButtons) {
  numberButton.addEventListener('click', () => {
    calculator.appendNumber(numberButton.innerText)
    calculator.updateDisplay()
  })
}

for (const operationButon of operationButons) {
  operationButon.addEventListener('click', () => {
    calculator.chooseOperation(operationButon.innerText)
    calculator.updateDisplay()
  })
}

//limando ao clicar no butom
allClearbutton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

igualButton.addEventListener('click', () => {
  calculator.calculate()
  calculator.updateDisplay()
})

deletButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

//Seletoresr de interface
const number = document.querySelectorAll('[data-number]')
const operator = document.querySelectorAll('[data-operator]')
const igual = document.querySelector('[data-igual]')
const allClearbutton = document.querySelector('[data-all-clear]')
const delet = document.querySelector('[data-delet]')
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
  }

  apeependNumber() {}

  //função para limpar os campos
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
  //atualização do display
  updateDsplay() {
    this.previousOperandtextElemennt.innerText = this.previousOperand
    this.currentOperandtextElemennt.innerText = this.currentOperand
  }
}

//chamado da função
const calculator = new Calculator(
  previousOperandtextElemennt,
  currentOperandtextElemennt
)
//limando ao clicar no butom
allClearbutton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDsplay()
})

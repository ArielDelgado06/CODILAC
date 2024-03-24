let nome = document.querySelector('#nome')
let LabelNome = document.querySelector('#LabelNome')


let email = document.querySelector('#email')
let LabelEmail = document.querySelector('#LabelEmail')


let telefone = document.querySelector('#telefone')
let LabelTelefone = document.querySelector('#LabelTelefone')


let senha = document.querySelector('#senha')
let LabelSenha = document.querySelector('#LabelSenha')


let confirmação = document.querySelector('#confirmação')
let LabelConfirmação= document.querySelector('#LabelConfirmação')

nome.addEventListener('keyup' , () => {
    if(nome.value.length <= 2){
        labelNome.setAttribute('style' , 'color: red')
        labelNome.innerHTML = 'Nome * insira no mínimo 3 caracteres'
        nome.setAttribute('style' , 'border-color: red')

    } else {
        labelNome.setAttribute('style' , 'color: green')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style' , 'border-color: green')


    }
})




senha.addEventListener('keyup' , () => {
  if(senha.value.length <= 5){
      labelSenha.setAttribute('style' , 'color: red')
      labelSenha.innerHTML = 'Senha * insira no mínimo 6 caracteres'
      senha.setAttribute('style' , 'border-color: red')

  } else {
      labelSenha.setAttribute('style' , 'color: green')
      labelSenha.innerHTML = 'Senha'
      senha.setAttribute('style' , 'border-color: green')


  }
})



confirmação.addEventListener('keyup' , () => {
  if(senha.value != confirmação.value){
      labelConfirmação.setAttribute('style' , 'color: red')
      labelConfirmação.innerHTML = 'Confirmação * As senhas não conferem'
      confirmação.setAttribute('style' , 'border-color: red')

  } else {
      labelConfirmação.setAttribute('style' , 'color: green')
      labelConfirmação.innerHTML = 'Confirmação'
      confirmação.setAttribute('style' , 'border-color: green')


  }
})









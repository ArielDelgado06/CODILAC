const form = document.querySelector('#form')
const inputNome = form.elements['nome']
const inputTelefone = form.elements['telefone']
const inputEmail = form.elements['email']
const inputSenha = form.elements['senha']
const inputConfSenha = form.elements['confSenha']
const inputCargo = form.elements['cargo']
const button = document.querySelector('.bg-waiting button')
const tBodyContainer = document.querySelector('tbody')
const divButton = document.querySelector('.buttonPut')

const handleRecepcionista = async (nome, email, telefeno, senha, cargo, id) => {

  const newRecepcionista = {
    "nome": nome,
    "email": email,
    "telefone": telefeno,
    "cargo": cargo,
    "senha": senha
    
  }

  try {

    if (id != null) {

      const response = await fetch(`http://localhost:3333/actualizar/funcionario/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newRecepcionista),
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      })
      window.alert('recepcionista actulizado com sucesso !')
      return response.json()


    } else {

      const response = await fetch('http://localhost:3333/cadastro/funcionario', {
        method: 'POST',
        body: JSON.stringify(newRecepcionista),
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      })
      window.alert('recepcionista cadastrado com sucesso !')
      return response.json()

    }


  } catch (erro) {
    window.alert('falha ao se conectar com o servidor', erro)
  }


}

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const nome = inputNome.value
  const telefeno = inputTelefone.value
  const email = inputEmail.value
  const cargo = inputCargo.value
  const senha = inputSenha.value
  const confSenha = inputConfSenha.value
  console.log(nome)
  console.log(telefeno)
  console.log(email)
  console.log(cargo)
  console.log(senha)
  const nomevalid = nome.match(/[1-9]/g)
 console.log(nomevalid)
  if(nomevalid != null){
    window.alert('o nome não pode conter números')
    return
  }

  if (nomevalid == '') {
    window.alert('preencha o campo nome')
    return
  }
  if (email == '') {
    window.alert('preencha o campo email')
    return
  }
  if (telefone == '') {
    window.alert('preencha o campo telefeno')
  }
  if (senha == '') {
    window.alert('preencha o campo senha')
    return
  }
  if (confSenha == '') {
    window.alert('preencha o campo confirmar senha')
    return
  }
  if (confSenha != senha) {
    return  window.alert('senhas diferente!')
  }
  const id = window.localStorage.getItem('idRec')
  console.log(id)
  await handleRecepcionista(nome, email, telefeno, senha, cargo, id)
  window.localStorage.removeItem('idRec')
  window.location.reload()
})

const handleRecepcionistaRetorn = async () => {

  try {
    let elements = ''
    const response = await fetch('http://localhost:3333/consulta/recepcionistas/recepcionista', {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })

    const recepcionistas = await response.json()



    recepcionistas.forEach((recepcionista) => {
      elements += `
              <tr class="colunas">
                    <td>${recepcionista.nome}</td>
                    <td>${recepcionista.telefone}</td>
                    <td>${recepcionista.email}</td>
                    <td>
                      <button class="buttons-icon" onclick={handleDeleteRecepcionista(${recepcionista.id})}>
            <ion-icon class="color-blue" name="trash-outline"></ion-icon>
          </button>
          <button class="buttons-icon" onclick={handleRetornOneRecepcionista(${recepcionista.id})}>
            <ion-icon name="create-outline" 
            ></ion-icon>
          </button>
          
                    </td>
                  </tr>
         `
    });

    tBodyContainer.innerHTML = elements


  } catch (erro) {
    console.log('erro ao se conectar', erro)
  }

}




const handleRetornOneRecepcionista = async (id) => {


  const response = await fetch(`http://localhost:3333/consulta/recepcionista/${id}`

  ).then(response => response.json()).then((dados) => {
    inputNome.value = dados.nome
    inputEmail.value = dados.email
    inputTelefone.value = dados.telefone
    window.localStorage.setItem('idRec', dados.id)
    dados.Usuario.map((usuario) => {
      inputSenha.value = usuario.senha
      inputConfSenha.value = usuario.senha
      inputCargo.selected = 'recepcionista'



    })

  })

  return response

}



const handleDeleteRecepcionista = async (id) => {
  try {
    const recepcionista = await fetch(`http://localhost:3333/deletar/funcionario/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    })
    if (recepcionista) {
      window.alert('funcionario deletado com sucesso!')
      window.location.reload()
      return
    }
    if (recepcionista == false) {
      window.alert('Ups! algo de errado ocorreu')
    }
  } catch (err) {
    window.alert('falha ao se conectar com o servidor')
  }
}
console.log(handleRecepcionistaRetorn())

const buttonUpdate = async (id) => {
  let recepcionistaId = await id
  return recepcionistaId
}


handleRecepcionistaRetorn()


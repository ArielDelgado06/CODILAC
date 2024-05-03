// pegando os elementos do html
const form = document.querySelector(".content")
const nomeInput = form.elements["nome"]
const sobreNomeInput = form.elements["sobreNome"]
const dataNascInput = form.elements["dataNasc"]
const teleInput = form.elements["telefone"]
const emailInput = form.elements["email"]
const enderecoInput = form.elements["endereco"]
const nacionalidadeInput = form.elements["nacionalidade"]
const senhaInput = form.elements["senha"]
const confSenhaInput = form.elements["confSenha"]
const sexoInput = form.elements["sexo"]
const buttonSubmit =document.querySelector(".input-button")

let load =true

const isload  = ()=>{
   if(load){
    buttonSubmit.innerHTML =load ? "...":"Cadastrar"
    load = !load
   }
}



async function handleCadastro(nome,sobreNome,data,telefone,email,endereco,sexo,nacionalidade){


try{
    isload()
    const paciente = {'nome':nome,'sobreNome':sobreNome, 'data_nasc':data, 'sexo':sexo,'nacionalidade':nacionalidade,'telefone':telefone, 'email':email, 'endereco':endereco}
    await fetch('http://localhost:3333/cadastro/paciente',{
        method:"POST",
        body:JSON.stringify(paciente),
        headers:{"Content-Type":"application/json;charset=UTF-8"}
    }).then(
        console.log("conectou!")
    )



}catch(error){
    console.log('falho!', error)
}finally{

    isload()

}





}



form.addEventListener('submit',async (e)=>{

    e.preventDefault()

    const nome = nomeInput.value
    const sobreNome = sobreNomeInput.value
    const data =dataNascInput.value
    const telefone = teleInput.value
    const email = emailInput.value
    const endereco = enderecoInput.value
    const nacionalidade = nacionalidadeInput.value
    const  senha = senhaInput.value
    const confSenha = confSenhaInput.value
    const sexo = sexoInput.value

    if(nome == '' || nome == 'undefined' || nome == null){
        alert('preencha o campo nome')
        return
    }
    if(sobreNome == '' || sobreNome == 'undefined' || sobreNome == null){
        alert('preencha o campo sobreNome')
        return
    }

    if(data == '' || data == 'undefined' || data == null){
        alert('preencha o campo data de nascimento')
        return
    }
    if(telefone== '' || telefone == 'undefined' || telefone == null){
        alert('preencha o campo telefone')
        return
    }
    if(email == '' || email == 'undefined' || email == null){
        alert('preencha o campo email')
        return
    }
    if(endereco == '' || endereco == 'undefined' || endereco == null){
        alert('preencha o campo endereço')
        return
    }
    if(nacionalidade == '' || nacionalidade == 'undefined' || nacionalidade == null){
        alert('preencha o campo nacionalidade')
        return
    }
    if(senha == '' || senha == 'undefined' || senha == null){
        alert('preencha o campo senha')
        return
    }
    if(confSenha == '' || confSenha == 'undefined' || confSenha == null){
        alert('preencha o campo de confirmação da senha')
        return
    }
    if(sexo == '' || sexo == 'undefined' || sexo == null){
        alert('preencha o campo sexo')
        return
    }
    if(nome == '' || sobreNome == '' || data == '' || telefone == '' || email == '' || endereco == '' || nacionalidade == '' || senha == '' || confSenha == '' || sexo == ''){
        alert('preencha todos os campos!')
        return
    }

    if(senha.length < 8 ){
        alert('a senha precisa ter no mínimo 8 caracter')
        return
    }
    if(senha != confSenha){
        alert('senhas diferentes')
        return
    }

   if(nome != '' && sobreNome != '' && data != '' &&  telefone != '' && email != '' && endereco !='' && sexo !=''){

        await handleCadastro(nome,sobreNome,data,telefone,email,endereco,sexo,nacionalidade)
   }

    console.log(nome)
    console.log(sobreNome)
    console.log(data)
    console.log(telefone)
    console.log(email)
    console.log(endereco)
    console.log(nacionalidade)
    console.log(senha)
    console.log(confSenha)
    console.log(sexo)
})






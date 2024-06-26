const tbody = document.querySelector('tbody')
const form = document.querySelector('#filter-form')
const select = form.elements['status']
const inputPacient = form.elements['patient']
const inputData = form.elements['date']



const handlePagamento = async (filter)=>{

   try{
    if(filter == 100 || filter == 'all'){
        pagamentos = await fetch(`http://localhost:3333/consulta/pagamentos/100`).then((response)=>{
            return ( response.json())
        })
        let elements = ''

   
    pagamentos.forEach((dados) => {
        elements += `
        <tr class="colunas">
                    <td>${dados.consulta.data_consulta}</td>
                    <td>${dados.consulta.paciente.nome}</td>
                    <td>${dados.consulta.tipo_consulta.tipo_consulta}</td>
                    <td>${dados.valor}</td>
                    <td>${dados.status}</td>
        </tr>
        `
        
    });
   
    tbody.innerHTML = elements

        return
    }

    if(filter == 'pago' || filter == 'não pago'){
        pagamentos = await fetch(`http://localhost:3333/consulta/pagamentos/status/${filter}`).then((response)=>{
            return ( response.json())
        })
        let elements = ''

   
    pagamentos.forEach((dados) => {
        elements += `
        <tr class="colunas">
                    <td>${dados.consulta.data_consulta}</td>
                    <td>${dados.consulta.paciente.nome}</td>
                    <td>${dados.consulta.tipo_consulta.tipo_consulta}</td>
                    <td>${dados.valor}</td>
                    <td>${dados.status}</td>
        </tr>
        `
        
    });
   
    tbody.innerHTML = elements

        return
    }

    
   }catch(error){
     window.alert('falha ao se conecttar com  servidor',error)
   }

}

const handlePagamentoByNome = async(nome)=>{

    let elements = ''

    const pagamento = await fetch(`http://localhost:3333/consulta/pagamento/${nome}`).then((response)=>{
        return response.json()
    })
    console.log(pagamento)
    if(pagamento.length == 0){
        window.alert('não existem pagamento associados a esse paciente')
        return
    }
    
    pagamento.forEach((dados) => {
        elements += `
        <tr class="colunas">
                    <td>${dados.consulta.data_consulta}</td>
                    <td>${dados.consulta.paciente.nome}</td>
                    <td>${dados.consulta.tipo_consulta.tipo_consulta}</td>
                    <td>${dados.valor}</td>
                    <td>${dados.status}</td>
        </tr>
        `
        
    });
   
    tbody.innerHTML = elements

        return

}
const handlePagamentoByData = async(data)=>{

    let elements = ''

    const pagamento = await fetch(`http://localhost:3333/consulta/pagamento/dataConsulta/${data}`).then((response)=>{
        return response.json()
    })

    if(pagamento.length == 0){
        window.alert('não existem pagamento com essa data')
        return
    }  
    pagamento.forEach((dados) => {
        elements += `
        <tr class="colunas">
                    <td>${dados.consulta.data_consulta}</td>
                    <td>${dados.consulta.paciente.nome}</td>
                    <td>${dados.consulta.tipo_consulta.tipo_consulta}</td>
                    <td>${dados.valor}</td>
                    <td>${dados.status}</td>
        </tr>
        `
        
    });
   
    tbody.innerHTML = elements
  

        return

}
let estado = true

form.addEventListener('submit',async(e)=>{
  
    e.preventDefault()
    const filter =select.value
    
    handlePagamento(filter)
    estado = ! estado

    if(inputPacient.value != ''){
        handlePagamentoByNome(inputPacient.value)
        return
    }
    if(inputData.value !=''){
        handlePagamentoByData(inputData.value)
        return
    }

})

const pacienteInput = inputPacient.onfocus()

if(pacienteInput == true){
    console.log('campo selecionado')
}

if(estado){
    handlePagamento(100)
}



   













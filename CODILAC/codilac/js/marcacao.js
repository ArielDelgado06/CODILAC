let dentistaId
let search = ''
let page = 0
let totalConsultas

const cardWrapper = document.querySelector(".cardWrapper");
const tBodyContainer = document.querySelector("tbody")
const searchInput = document.querySelector('#search')
const buttonSubmit = document.querySelector("#cadastrarDentistas");
const buttonNext = document.querySelector("#button-proximo")
const buttonPrevious = document.querySelector("#button-anterior")

async function getPacienteById() {
  const usuarioId = localStorage.getItem('id')

  const response = await fetch(`http://localhost:3333/paciente/${'050328bf-8a92-459c-8d26-73d48ef18645'}`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const paciente = await response.json()
  return paciente.id
}

async function getDentistas() {
  let elements = ''
  const response = await fetch(`http://localhost:3333/consulta/050328bf-8a92-459c-8d26-73d48ef18645/consultas`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const consultas = await response.json()

  console.log(consultas)
  if (response.status !== 200) {
    return
  }

  if (consultas.length === 0) {
    return
  }

  consultas.forEach((consulta) => {
    elements += `
      <div class="cardAgenda">
        <div class="result" id="one">
          <P>${consulta.status}</P>
          <p>${consulta.data_consulta}</p>
        </div>

        <section>
          <h3>Dentista</h3>
          <p>${consulta.dentista.nome}</p>
          <p>${consulta.paciente.nome}</p>
        </section>

        <div class="btnDiv">
          <button>Remarcar</button>
          <button id="btnred">Desmarcar</button>
        </div>
      </div>
    `
  })

  cardWrapper.innerHTML = elements

}

getDentistas()
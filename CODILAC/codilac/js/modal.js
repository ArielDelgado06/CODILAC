const openModal = document.querySelector('#course-request');
const modalDialog = document.querySelector('#course-dialog');

openModal.addEventListener('click', ()=> {
  modalDialog.classList.remove('course-dialog--fadeout');
  modalDialog.showModal();
});

const closeModal = document.querySelector('#close-course');
closeModal.addEventListener('click', ()=> {
  modalDialog.classList.add('course-dialog--fadeout');
  modalDialog.close();
});

const cancelModal = document.querySelector('#close');
cancelModal.addEventListener('click', ()=> {
  modalDialog.classList.add('course-dialog--fadeout');
  modalDialog.close();
});

// Selecionar os campos do form
let email = document.querySelector('email').value;
let selectOpccao = document.querySelector('role').value;

// comando para possivelmente enviar o formulario.
const enviarSolicitacao = (event) => {
  event.preventDefault();
}

// limpar os campos do formulário.
window.onload = function() {
  limparFormulario();
};
function limparFormulario() {
  let formulario = document.getElementById('myForm');

  for (let i = 0; i < formulario.elements.length; i++) {
    let elemento = formulario.elements[i];
    if (elemento.type === 'email' || elemento.type === 'select') {
      elemento.value = '';
    }
  }
}

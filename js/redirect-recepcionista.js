const link = document.getElementById("link-sair");


(async function verificationIfExistsIdInLocalStorage() {
  setInterval(() => {
    const id = localStorage.getItem('id')
    const cargo = localStorage.getItem('cargo')
    if (!id || id === '') {
      window.location.href = "../../site/login.html"
    }

    if (['recepcionista', 'admin'].includes(cargo.toLowerCase())) {
      window.location.href = "../../site/login.html"
    }
  }, 500)
})()


function logout() {
  localStorage.removeItem('id')
  localStorage.removeItem('cargo')
}

link.addEventListener('click', () => {
  logout()
})
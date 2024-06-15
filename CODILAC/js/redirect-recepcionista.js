const link = document.getElementById("link-sair");


(async function verificationIfExistsIdInLocalStorage() {
  setInterval(() => {
    const id = localStorage.getItem('id')
    const cargo = localStorage.getItem('cargo')
    if (!id || id === '') {
      window.location.href = "../../site/index.html"
    }

    if (['recepcionista', 'admin'].includes(cargo.toLowerCase())) {
      window.location.href = "../../site/index.html"
    }
  }, 500)
})()


function logout() {
  localStorage.removeItem('id')
  localStorage.removeItem('cargo')
  window.location.replace('../site/login.html')
}

link.addEventListener('click', () => {
  logout()
})
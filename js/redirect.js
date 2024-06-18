(async function verificationIfExistsIdInLocalStorage() {
  setInterval(() => {
    const id = localStorage.getItem('id')

    if (!id || id === '') {
      window.location.href = "../site/login.html"
    }
  }, 500)
})()


const link = document.getElementById("link-sair");

function logout() {
  const cargo = localStorage.getItem('cargo')
  if (['admin', 'normal', 'recepcionista'].includes(cargo.toString().toLowerCase())) {
    window.location.href = "../site/index.html"
  } else {
    window.location.href = '../site/index.html'
  }
}

link.addEventListener('click', () => {
  logout()
})

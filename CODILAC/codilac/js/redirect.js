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
  localStorage.removeItem('id')
  localStorage.removeItem('cargo')
  window.location.replace('../site/index.html')
}

link.addEventListener('click', () => {
  logout()
})
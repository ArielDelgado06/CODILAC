(async function verificationIfExistsIdInLocalStorage() {
  setInterval(() => {
    const id = localStorage.getItem('id')

    if (!id || id === '') {
      window.location.href = "../site/login.html"
    }
  }, 500)
})()
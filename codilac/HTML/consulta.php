<?php
  // session_start();
  
  // if((isset($_SESSION['nome'] == false)) and (isset($_SESSION['senha'] == false)))
  // {
  //   unset($_SESSION['nome']);
  //   unset($_SESSION['senha']);
  //   header("Location: login.php");
  // }


  //  $logado = $_SESSION['nome'];
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marcação de consultas</title>
  <link rel="stylesheet" href="../CSS/consulta.css">
</head>
<body>
 <div class="form">
  <form class="formulario" action="" method="">
    <div class="form-header">
      <h1>Agendar consulta</h1>
    </div>
    <div class="input-group">
      <div class="box">
        <label for="primeiroNome"></label>
        <input id="primeiroNome" type="text" name="primeiroNome" placeholder="Nome" required>
      </div>

      <div class="box">
        <label for="segundoNome"></label>
        <input id="segundoroNome" type="text" name="segundoroNome" placeholder="Sobre nome" required>
      </div>

      <div class="box">
        <label for="cidade"></label>
        <input id="cidade" type="text" name="cidade" placeholder="Cidade" required>
      </div>

      <div class="box">
        <label for="TipoConsulta"></label>
        <input id="TipoConsulta" type="text" name="TipoConsulta" placeholder="Tipo de consulta" required>
      </div>

      <div class="box">
        <label for="data"></label>
        <input id="data" type="date" name="data" required>
      </div>
    </div>

    <div class="genero-inputs">
      <div class="genero-titulo">
        <h6>Gênero</h6>
      </div>

      <div class="grupo-genero">
        <div class="gender-input">
          <input type="radio" id="fm" name="fm">
          <label for="fm">Femenino</label>
        </div>

        <div class="gender-input">
           <input type="radio" id="msc" name="fm">
          <label for="msc">Masculino</label>
        </div>
      </div>
    </div>

    <div class="butao">
      <button type="submit">agendar consulta</button>
    </div>
  </form>
 </div>
</body>
</html>
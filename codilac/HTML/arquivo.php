<?php
  session_start();
  if(isset($_POST['submit']) && !empty($_POST['nome']) && !empty($_POST['senha'])){
  include_once('conexao.php');

    $nome = $_POST['nome'];
    $senha = $_POST['senha'];

    $sqli = "SELECT * FROM cadastros WHERE nome = '$nome' AND senha = '$senha'";

    $result = $conexao -> query($sqli);
    
    if(mysqli_num_rows($result) < 1){
      unset($_SESSION['nome']);
      unset($_SESSION['senha']);
      header("Location: login.php");
    }

    else{
      $_SESSION['nome'] = $nome;
      $_SESSION['senha'] = $senha;
      header("Location: consulta.php");
    }
}

else {
  header("Location: login.php");
}

?>
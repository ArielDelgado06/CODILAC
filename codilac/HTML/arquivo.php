<?php

if(isset($_POST['submit']) && !empty($_POST['nome']) && !empty($_POST['senha'])){
  include_once('conexao.php');

    $nome = $_POST['nome'];
    $senha = $_POST['senha'];

    $sqli = "SELECT * FROM cadastros WHERE nome = '$nome' AND senha = '$senha'";

    $result = $conexao -> query($sqli);
    
    if(mysqli_num_rows($result) < 1){
      header("Location: login.php");
    }

    else{
      header("Location: consulta.php");
    }
}

else {
  header("Location: login.php");
}

?>
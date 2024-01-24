<?php
  $servidor = "localhost"; //nome do servidor//
  $usuario = "root"; //nome do usuário//
  $senha = ""; //a senhaque é vazia//
  $BD_codilac = "bd_codilac"; //aqui vai nome do banco de dados que criarmos

  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $telefone = $_POST['telefone'];
  $senha = $_POST['senha'];
  $conf_senha = $_POST['conf_senha'];

  echo($nome);
  echo($email);
  echo($telefone);
  echo($senha);
  echo($conf_senha);



 $conexao = mysqli_connect($servidor,$usuario,$senha,$BD_banco);

//  primeiro testa a conexão se esta a funcionar e depois podes tentar mandar dados ao banco de dados

if($conexao){
   
  $sql = "INSERT INTO cadastros (nome,email,telefone,senha,conf_senha)
  Values('{$nome}','{$email}','{$telefone}','{$senha}','{$conf_senha}'";

  $inserir = mysqli_query($conexao,$sql);

  if($inserir){
    echo("cadastro realizado!");
  }
  
}


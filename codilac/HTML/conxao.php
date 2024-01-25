<?php
   $servidor = "localhost"; //nome do servidor//
   $usuario = "root"; //nome do usuário//
   $password = ""; //a senha é vazia//
   $bd_codilac = "codilac"; //aqui vai nome do banco de dados que criamos
 
   // nome dos campos que constam no nosso formulário
   $nome = $_POST['nome'];
   $email = $_POST['email'];
   $telefone = $_POST['telefone'];
   $senha = $_POST['senha'];
   $conf_senha = $_POST['conf_senha'];
 
   // codigo de conexão com o banco de dados
  $conexao = mysqli_connect($servidor,$usuario,$password,$bd_codilac);
  
 
 //  codigo para enviar as informações no banco de dados
 if($conexao){
    
   $sql = "INSERT INTO cadastros(nome,email,telefone,senha,conf_senha)
   Values('{$nome}','{$email}','{$telefone}','{$senha}','{$conf_senha}')";
 
   $inserir = mysqli_query($conexao,$sql);
 
   if($inserir){
     echo("cadastro realizado!");
   }
 }
 
 
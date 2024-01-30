<?php
   $servidor = "localhost"; //nome do servidor//
   $usuario = "root"; //nome do usuário//
   $password = ""; //a senha é vazia//
   $bd_codilac = "codilac"; //aqui vai nome do banco de dados que criamos

   // codigo de conexão com o banco de dados
  $conexao = new mysqli($servidor,$usuario,$password,$bd_codilac);

  ?>
<?php

    $servidor = "localhost";
    $senha = "";
    $usuario = "root";
    $bd_codilac = "bd_codilac";


    $conexao = mysqli_connect($servidor,$senha, $usuario,$bd_codilac);

    if(!$conexao){
        echo"não cadastrou";
    }

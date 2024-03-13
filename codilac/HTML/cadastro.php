<?php
if(isset($_POST['submit'])){
    include_once('conexao.php');

    // nome dos campos que constam no nosso formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $senha = $_POST['senha'];
    $conf_senha = $_POST['conf_senha'];

    $sql = "INSERT INTO cadastros(nome,email,telefone,senha,conf_senha)
      Values('{$nome}','{$email}','{$telefone}','{$senha}','{$conf_senha}')";
   
     $inserir = mysqli_query($conexao,$sql);
  }
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário de cadastro</title>
    <link rel="stylesheet" href="../CSS/cadastro.css">
</head>

<body>

    <div class="box">

        <div class="img-box">
            <img src="../img/logo_cadilac.jpeg" alt="image do codilac" width="450" height="370">
        </div>

        <div class="form-box">
            <h2>Cadastro</h2>
            
            <form action="cadastro.php" method="post">
                <div class="input-group">
                    <label for="nome">Nome completo</label>
                    <input type="text" id="nome" name="nome" placeholder="Digite o seu nome completo" required>

                </div>

                <div class="input-group">
                    <label for="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="Digite o seu email" required>

                </div>
                
                <div class="input-group">
                    <label for="telefone">Telefone</label>
                    <input type="tel" name="telefone" id="telefone" placeholder="Digite o seu numero" required>

                </div>
                
                <div class="input-group w50">
                    <label for="senha">Senha</label>
                    <input type="Password" name="senha" id="senha" placeholder="Digite sua senha" required>

                </div>
                <div class="input-group w50">
                    <label for="confirmar senha">Confirmar senha</label>
                    <input type="Password" name="conf_senha" id=" confirmar senha" placeholder="confirme sua senha" required>

                </div>
                <p>Já é um membro? <a href="login.php">Login</a></p>
                <div class="input-group">
                    <button type="submit" name="submit" id="submit">Cadastrar</button>
                </div>
                
            </form>
        </div>
    </div>

    <script src="../js/main.js"></script>
</body>
</html>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Tema de Login</title>
    <link rel="stylesheet" href="../CSS/login.css">
</head>

<body>
    <div class="box">
        <div class="img-box">
            <img src="../img/logo_cadilac.jpeg" alt=" " width="450" height="370">
        </div>
        <div class="form-box">
            <h2>Login</h2>
            <form action="arquivo.php" method="POST">
                <div class="input-group">
                    <label for="nome">Nome de usuário</label>
                    <input type="text" name="nome" id="nome" placeholder="Digite o seu nome de usuário" required>
                </div>
                <div class="input-group">
                    <label for="senha">Senha</label>
                    <input type="password" id="senha" name="senha" placeholder="Digite a sua senha" required>
                </div>
                <p>Ainda não está cadastrado? <a href="cadastro.php">Cadastre-se</a></p>
                <div class="input-group">
                    <input id="botao" name="submit" type="submit" value="Enviar">
                </div>
            </form>
        </div>
    </div>
</body>
</html>
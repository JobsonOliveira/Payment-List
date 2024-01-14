<?php
//ESTE ARQUIVO É RESPONSÁVEL POR REALIZAR O LOGIN DO USUÁRIO NO SITE

include("conexao.php");

//REPORTAR ERRO DE CONEXÃO
if(!$conn){
    die("Conexão falhou." . mysqli_connect_error());
}

//CAPTURAR OS DADOS DIGITADOS PELO USUÁRIO
if (isset($_POST["entrar"])) {

    $Usuario = $_POST["usuario"];
    $Senha = $_POST["senha"];
}
//CONSULTA PARA O BANCO
$query_sits = "SELECT usuario, senha FROM administrador";
/*REALIZAR A CONEXÃO COM O BANCO, PEGAR OS DADOS EXISTENTES*/
$result = $conn->query($query_sits);

if (($result) and ($result->num_rows != 0) ) {
    while ($row = $result->fetch_assoc()) {
     
        extract($row);
        $dados[] = [
            'usuario' => $usuario,
            'senha' => $senha
        ];
    }

    for ($i = 0; $i < count($dados); $i++) {
        if(($dados[$i]['usuario'] == $Usuario) && ($dados[$i]['senha'] == $Senha)){

            $query_sits = "DELETE FROM log_cliente WHERE `log_cliente`.`logado` <> 'valorqulquer'";
            //REALIZAR A CONEXÃO COM O BANCO ENVIANDO A CONSULTA
            $result = $conn->query($query_sits);

            if ($result) {

                $query_sits2 = "INSERT INTO log_cliente(logado) VALUES('true')";  
                //REALIZAR A CONEXÃO COM O BANCO ENVIANDO A CONSULTA
                $result2 = $conn->query($query_sits2);
                    
                if ($result2) {
                    //REDIRECIONA O USUÁRIO PARA A TELA PRINCIPAL
                    echo '<script> window.open("../HTML/principal.html","_self"); </script>';
                }
            }
        }else{
            echo '<script> alert("Login ou senha incorretos!"); window.open("../index.html","_self");</script>';
        }
    }
}
//-----------------------------------------------------ENCERRAR A CONEXÃO COM O BANCO
$conn->close();
?>
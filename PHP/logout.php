<?php
//
include('conexao.php');

$query_sits = "DELETE FROM log_cliente WHERE `log_cliente`.`logado` = 'true'";  

//REALIZAR A CONEXÃO COM O BANCO ENVIANDO A CONSULTA
$result = $conn->query($query_sits);

if ($result) {

    $query_sits2 = "INSERT INTO log_cliente(logado) VALUES('false')";  
        
    //REALIZAR A CONEXÃO COM O BANCO ENVIANDO A CONSULTA
    $result2 = $conn->query($query_sits2);
                    
    if ($result2) {
        //REDIRECIONA O USUÁRIO PAR A TELA DE LOGIN
        echo '<script> window.open("../index.html","_self"); </script>';
    }
}
//FECHA A CONEXÃO
$conn->close();
?>
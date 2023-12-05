<?php 
//GUIA: ESTE ARQUIVO TEMA  FUNÇÃO DE COLETAR O ID DO PAGAMENTO QUE SERÁ APAGADO NO BANCO E REALIZAR O PROCEDIMENTO

include('conexao.php');

//REPORTAR ERRO DE CONEXÃO
if(!$conn){
    die("Conexão falhou." . mysqli_connect_error());
}

//CAPTURAR OS DADOS DIGITADOS PELO USUÁRIO
if (isset($_POST["apagar"])) {
    $Id = $_POST["idPag"];
}

$query_sits = "DELETE FROM pagamentos WHERE `pagamentos`.`id` = $Id";  
//REALIZAR A CONEXÃO COM O BANCO ENVIANDO A CONSULTA
$result = $conn->query($query_sits);

if ($result) {
    //MOSTRAR NA TELA SE O PAGAMENTO FOI EDITADO
    echo '<script> alert("Pagamento deletado!"); const win = window.open("../HTML/principal.html","_self"); </script>';
                    
}

//FECHA A CONEXÃO
$conn->close();
?>
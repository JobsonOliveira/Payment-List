<?php

//$banco DEVE ESTAR POR ULTIMO
$conn = mysqli_connect('localhost', 'root', '', 'BdPaymentList');

//TRATAMENTO DE ERRO DE CONEXÃO
if(!$conn){
    echo("Conexão falhou." . mysqli_connect_error());
}

?>
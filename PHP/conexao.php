<?php
//GUIA: ESTE ARQUIVO TEM A FUNÇÃO DE REALIZAR A CONEXÃO COM O BANCO APÓS A REQUISIÇÃO DE OUTROS ARQUIVOS PQP

//$banco DEVE ESTAR POR ULTIMO
$conn = mysqli_connect('localhost', 'root', '', 'payment_list');

//TRATAMENTO DE ERRO DE CONEXÃO
if(!$conn){
    echo("Conexão falhou." . mysqli_connect_error());
}

?>
<?php
//ESTE ARQUIVO É RESPONSÁVEL POR CAPTURAR A INFORMAÇÃO NO BANCO SE O USUÁRIO ESTÁ LOGADO OU NÃO E RETORNAR PARA O guarda JAVASCRIPT

include('conexao.php');

//QUERY PARA CONSULTA
$consulta = "SELECT logado FROM log_cliente";

$resultado = $conn->query($consulta);

if(($resultado) and ($resultado->num_rows != 0)){
    while ($row = $resultado->fetch_assoc()){
        extract($row);
            $dados[] = [
                'logado' => $logado
            ];
    }
    $retorno = ['status' => true, 'dados' => $dados];
}

//FORNECE A RESPOSTA PARA O JAVASCRIPT
echo json_encode($retorno);

//FECHA A CONEXÃO
$conn->close();
?>
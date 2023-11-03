<?php 
include('conexao.php');

//QUERY PARA CONSULTA
$consulta = "SELECT cliente, DATE_FORMAT(vencimento, '%d/%m/%Y') AS vencimento_form, vencimento, pagamento, valor, forma, funcionario FROM pagamentos";

$resultado = $conn->query($consulta);

if(($resultado) and ($resultado->num_rows != 0)){
    while ($row = $resultado->fetch_assoc()){
        extract($row);
            $dados[] = [
                'cliente' => $cliente,
                'vencimento' => $vencimento,
                'vencimento_form' => $vencimento_form,
                'pagamento' => $pagamento,
                'valor' => $valor,
                'forma' => $forma,
                'funcionario' => $funcionario
            ];
    }
    $retorno = ['status' => true, 'dados' => $dados];
}

//FORNECE A RESPOSTA PARA O JAVASCRIPT
echo json_encode($retorno);

//FECHA A CONEXÃO
$conn->close();
?>
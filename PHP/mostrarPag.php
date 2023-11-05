<?php 
include('conexao.php');

//QUERY PARA CONSULTA
$consulta = "SELECT id, cliente, DATE_FORMAT(vencimento, '%d/%m/%Y') AS vencimento_form, vencimento, DATE_FORMAT(pagamento, '%d/%m/%Y') AS pagamento_form, pagamento, valor, forma, funcionario FROM pagamentos ORDER BY pagamento DESC";

$resultado = $conn->query($consulta);

if(($resultado) and ($resultado->num_rows != 0)){
    while ($row = $resultado->fetch_assoc()){
        extract($row);
            $dados[] = [
                'id' => $id,
                'cliente' => $cliente,
                'vencimento' => $vencimento,
                'vencimento_form' => $vencimento_form,
                'pagamento' => $pagamento,
                'pagamento_form' => $pagamento_form,
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
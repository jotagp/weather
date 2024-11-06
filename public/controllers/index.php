<?php



function makeCurl(){
    $curl = curl_init();
    $key = "9abdab5d9f1008f4f6435ac263a6730b";
    $param = "chapeco";
    $url = "https://api.weatherstack.com/current?access_key={$key}&query=".urlencode($param);

    curl_setopt($curl, CURLOPT_URL, $url);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // Retorna a resposta como string
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

    // Executa a requisição
    $response = curl_exec($curl);

    // Verifica se houve erro
    if ($response === false) {
        echo "Erro: " . curl_error($curl);
    }
    // else {
    //     echo "Resposta: " . $response;
    // }
    // Fecha a conexão
    curl_close($curl);
}


?>
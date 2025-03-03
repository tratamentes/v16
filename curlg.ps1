$accessToken = "ya29.a0AXeO80SopQdzT4hqIMB42Urb0giNM205d1kMsevRWo9XTqU76uuuHSRuSBgckjYccrhIXe17or67-yP7yafmhLEIZr7FDekmaTNbHWGWGzsOgDNYOAZd2P2hfRt7X64pK2sWWrtHI805O7xLMNgnowvVscNvJ_NgILW9TbKnaCgYKAR4SARASFQHGX2Mi_2m7bMJaAlqiKaeTq2ixyQ0175"
$url = "https://mybusinessaccountmanagement.googleapis.com/v1/accounts"
$headers = @{
    "Authorization" = "Bearer $accessToken"
    "Content-Type" = "application/json"
}

Invoke-RestMethod -Uri $url -Headers $headers -Method Get

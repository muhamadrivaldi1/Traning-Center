<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' http://localhost:5173 https://app.sandbox.midtrans.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173 https://app.sandbox.midtrans.com; connect-src 'self' http://localhost:5173 ws://localhost:5173 https://app.sandbox.midtrans.com; img-src 'self' https://app.sandbox.midtrans.com data:; frame-src https://app.sandbox.midtrans.com;">

    <title>Training Center</title>

    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>
<body>
    <div id="app"></div>

    <script 
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="{{ config('services.midtrans.client_key') }}">
    </script>
</body>
</html>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <meta http-equiv="Content-Security-Policy" 
          content="default-src 'self' http://localhost:5173 http://127.0.0.1:5173 https://app.sandbox.midtrans.com; 
                   script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173 http://127.0.0.1:5173 https://app.sandbox.midtrans.com; 
                   connect-src 'self' http://localhost:5173 http://127.0.0.1:5173 ws://localhost:5173 ws://127.0.0.1:5173 http://localhost:8000 http://127.0.0.1:8000 https://app.sandbox.midtrans.com; 
                   img-src 'self' https://app.sandbox.midtrans.com data:; 
                   frame-src https://app.sandbox.midtrans.com; 
                   style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net http://localhost:5173 http://127.0.0.1:5173;">

    <title>Training Center</title>

    <script 
        src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key="{{ env('MIDTRANS_CLIENT_KEY') }}">
    </script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
</head>
<body>
    <div id="app"></div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
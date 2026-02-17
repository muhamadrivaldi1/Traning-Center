<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Training Center</title>
    
    @vite('resources/js/app.jsx')
</head>
<body>
    <div id="app"></div>

    <!-- MIDTRANS SNAP -->
    <script 
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="{{ config('services.midtrans.client_key') }}">
    </script>
</body>
</html>

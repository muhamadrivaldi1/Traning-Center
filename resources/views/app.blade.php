<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Training Center</title>

    @viteReactRefresh
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

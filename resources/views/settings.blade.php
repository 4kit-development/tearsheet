<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/3.18.0/polaris.min.css"/>
        <title>Tearsheet Settings</title>
    </head>
    <body>
        <div id="settings" data-enabled="{{$enabled}}" data-logo="{{$logo}}" data-contact="{{$contact}}" data-layout="{{$layout}}"></div>
        <script src="{{ mix('js/app.js') }}"></script>
    </body>

</html>

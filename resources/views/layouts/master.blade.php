<!DOCTYPE html>
<html lang="en">
<head>
    @include("layouts.priority")
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield("title", "Home") | {{ settings("site.title", "Webpage") }}</title>
    @include("layouts.css")
    @yield("css","")
</head>
<body>
    @include("layouts.header")

    <div class="page">
        @yield("content")
    </div>
    @include("parts.modal")
    @include("layouts.footer")
    @include("layouts.js")
    @yield("js","")
</body>
</html>
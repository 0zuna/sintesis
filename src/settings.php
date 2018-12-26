<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
	//db
	'db'=>[
		'host'=> "192.168.3.154",
		'user'=> "root",
		'pass'=> "toor",
		'dbname'=> "monitoreoGa",
		'charset'=> "utf8",
		'port'=> "3306"
	]
    ],
];

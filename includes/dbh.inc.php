<?php //open php tag, no need to close it if the entire file is php

$dbServerName = "localhost"; //name of the server you're connecting to
$dbUsername = "caleb"; //username that you set
$dbPassword = "%$#@!Cisco"; //password that you set
$dbName = "technews"; //name of the database you created in the server

//this php function connects to the DB with the prev variables
$conn = mysqli_connect($dbServerName, $dbUsername, $dbPassword, $dbName);
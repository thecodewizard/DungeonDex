<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check the querystring
if(!empty($_GET["fightid"])){
    $id = $_GET["fightid"];
} else die("page expects a fightid");

//Get the votes
$votes = getVotes($id);

//Return the array in json
header('Content-Type: application/json');
if(!empty($votes)) echo json_encode($votes);
die;
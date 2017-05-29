<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check The Body
$id = "";
if(!empty($_POST["weapon"])){
    $weapon = $_POST["weapon"];
    $weapon = json_decode($weapon);
    $weapon = htmlentities($weapon);
} else die("Page expects Weapon.");

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "INSERT INTO recently_searched_weapons VALUES(?,?)";

//Fetch the spells from the database
$sql = $con->prepare($query);
$sql->bind_param('si', $weapon, time());
$sql->execute();

header('Content-Type: application/json');
if($sql->affected_rows == 1) return json_encode("Success");
else return json_encode("Error");
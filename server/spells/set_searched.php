<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check The Querystring
$id = "";
if(!empty($_POST["spell"])){
    $spell = $_POST["spell"];
    $spell = json_decode($spell);
    $spell = htmlentities($spell);
} else die("Page expects Spell.");

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "INSERT INTO recently_searched_spells VALUES(?,?)";

//Fetch the spells from the database
$sql = $con->prepare($query);
$sql->bind_param('si', $spell, time());
$sql->execute();

header('Content-Type: application/json');
if($sql->affected_rows == 1) return json_encode("Success");
else return json_encode("Error");
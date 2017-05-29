<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT WeaponName as 'name'
            FROM recently_searched_weapons
            ORDER BY timestamp DESC
            LIMIT 5";

//Fetch the spells from the database
$sql = $con->query($query);

$weapons = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $weapons[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($weapons)) echo json_encode($weapons);
else http_response_code(418);
die;
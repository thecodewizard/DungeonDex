<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT SpellName as 'name'
            FROM recently_searched_spells
            ORDER BY timestamp DESC
            LIMIT 5";

//Fetch the spells from the database
$sql = $con->query($query);

$spells = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $spells[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($spells)) echo json_encode($spells);
else http_response_code(418);
die;
<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT DISTINCT s.`Level` as 'level',
            (SELECT DISTINCT COUNT(sp.SpellID) FROM spellclass sp WHERE s.`Level` LIKE sp.`Level`) as 'SpellCount'
            FROM spellclass s
            ORDER BY s.`Level`";

//Fetch the spells from the database
$sql = $con->query($query);

$levels = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $levels[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($levels)) echo json_encode($levels);
die;
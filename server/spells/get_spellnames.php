<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT s.SpellID as 'spellID', s.Spell as 'name'
            FROM spells s
            ORDER BY s.Spell";

//Fetch the spells from the database
$sql = $con->query($query);

$spells = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $spells[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($spells)) echo json_encode($spells);
die;
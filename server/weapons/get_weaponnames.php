<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT w.WeaponID as 'id', w.Weapon as 'name'
            FROM weapons w
            ORDER BY w.Weapon";

//Fetch the spells from the database
$sql = $con->query($query);

$weapons = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $weapons[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($weapons)) echo json_encode($weapons);
die;
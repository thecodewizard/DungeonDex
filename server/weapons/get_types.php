<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT w.WeaponTypeID as 'id', w.`Weapon Type` as 'ctype',
            (SELECT COUNT(wp.WeaponID) FROM weapons wp WHERE wp.WeaponTypeID LIKE w.WeaponTypeID) as 'WeaponCount'
            FROM `weapon types` w
            WHERE w.WeaponTypeID NOT LIKE 1
            ORDER BY w.`Weapon Type`";

//Fetch the spells from the database
$sql = $con->query($query);

$types = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $types[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($types)) echo json_encode($types);
die;
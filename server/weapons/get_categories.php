<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT w.WeaponCatID as 'id', w.`Weapon Category` as 'category',
            (SELECT COUNT(wp.WeaponID) FROM weapons wp WHERE wp.WeaponCatID LIKE w.WeaponCatID) as 'WeaponCount'
            FROM `weapon categories` w
            ORDER BY w.`Weapon Category`";

//Fetch the spells from the database
$sql = $con->query($query);

$categories = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $categories[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($categories)) echo json_encode($categories);
die;
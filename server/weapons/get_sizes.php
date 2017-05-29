<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT w.WeaponSizeID as 'id', w.`Weapon Size` as 'csize',
            (SELECT COUNT(wp.WeaponID) FROM weapons wp WHERE wp.WeaponSizeID LIKE w.WeaponSizeID) as 'WeaponCount'
            FROM `weapon sizes` w
            WHERE (SELECT COUNT(wp.WeaponID) FROM weapons wp WHERE wp.WeaponSizeID LIKE w.WeaponSizeID) NOT LIKE 0
            ORDER BY w.`Weapon Size`";

//Fetch the spells from the database
$sql = $con->query($query);

$sizes = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $sizes[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($sizes)) echo json_encode($sizes);
die;
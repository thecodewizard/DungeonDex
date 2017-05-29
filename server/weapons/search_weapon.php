<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check The Querystring
$id = "";
if(!empty($_GET["weapon"])){
    $weaponName = $_GET["weapon"];
    $weaponName = urldecode($weaponName);
    $weaponName = str_replace("'", "\'", $weaponName);
} else $weaponName = "";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT DISTINCT w.WeaponID as 'id', w.Weapon as 'name',
                c.`Weapon Category` as 'category',
                t.`Weapon Type` as 'ctype',
                s.`Weapon Size` as 'csize'
            FROM weapons w
            INNER JOIN `weapon categories` c ON c.WeaponCatID LIKE w.WeaponCatID
            INNER JOIN `weapon types` t ON t.WeaponTypeID LIKE w.WeaponTypeID
            INNER JOIN `weapon sizes` s ON s.WeaponSizeID LIKE w.WeaponSizeID
            WHERE w.Weapon  LIKE '%".$weaponName."%'";

//Fetch the spells from the database
$sql = $con->query($query);

$weapon = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $weapon[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($weapon)) echo json_encode($weapon);
else echo json_encode("No Response");
die;
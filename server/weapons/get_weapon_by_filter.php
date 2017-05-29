<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check if there were any sorting queries
$sort = "";
if(!empty($_GET["category"]) && isset($_GET["size"]) && isset($_GET["type"])){
    $category = $_GET["category"];
    $size = $_GET["size"];
    $type = $_GET["type"];
} else die("Insufficient Parameters");

//Open the database connection
$con = make_mysql_connection();

//Set the sort parameter
$sortquery = "";
if($category != -1 && intval($category) == $category) $sortquery .=  "w.WeaponCatID LIKE '".$category."'";
if($size != -1 && intval($size) == $size){
    if($category != -1 && intval($category) == $category) $sortquery .= " AND ";
    $sortquery .= "w.WeaponSizeID LIKE '".$size."'";
}
if($type != -1 && is_int($type)){
    if(($category != -1 && is_int($category)) || ($size != -1 && is_int($size))) $sortquery .= " AND ";
    $sortquery .= "w.WeaponTypeID LIKE '".$type."'";
}

//Prepare the statement
$query = "SELECT DISTINCT w.WeaponID as 'id', w.Weapon as 'name',
                c.`Weapon Category` as 'category',
                t.`Weapon Type` as 'ctype',
                s.`Weapon Size` as 'csize'
            FROM weapons w
            INNER JOIN `weapon categories` c ON c.WeaponCatID LIKE w.WeaponCatID
            INNER JOIN `weapon types` t ON t.WeaponTypeID LIKE w.WeaponTypeID
            INNER JOIN `weapon sizes` s ON s.WeaponSizeID LIKE w.WeaponSizeID";

if(!empty($sortquery)) $query = $query." WHERE ".$sortquery;
$query = $query." ORDER BY w.Weapon";

//Fetch the spells from the database
$sql = $con->query($query);

$weapons = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $weapons[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($weapons)) echo json_encode($weapons);
else echo json_encode("No Response");
die;
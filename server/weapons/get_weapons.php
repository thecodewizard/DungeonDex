<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check if there were any sorting queries
$sort = "";
if(!empty($_GET["sort"]) && isset($_GET["sortvalue"])){
    $sort = $_GET["sort"];
    $value = $_GET["sortvalue"];
}

//Open the database connection
$con = make_mysql_connection();

//Set the sort parameter
$sortquery = "";
if(!empty($sort) && isset($value)){
    if(intval($value) != $value) die;
    switch($sort){
        case "category":
            $sortquery = "w.WeaponCatID LIKE '".$value."'";
            break;
        case "size":
            $sortquery = "w.WeaponSizeID LIKE '".$value."'";
            break;
        case "type":
            $sortquery = "w.WeaponTypeID LIKE '".$value."'";
            break;
    }
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
else echo json_encode("no response");
die;
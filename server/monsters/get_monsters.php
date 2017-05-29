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
        case "challenge":
            $valueMore = $value + 3;
            $sortquery = "m.`Challenge Rating` BETWEEN '".$value."' AND '".$valueMore."'";
            break;
        case "size":
            $sortquery = "m.SizeID LIKE '".$value."'";
            break;
        case "type":
            $sortquery = "m.MonsterTypeID LIKE '".$value."'";
            break;
    }
}

//Prepare the statement
$query = "SELECT m.MonsterID as 'id', m.Monster as 'name',
                m.`Challenge Rating` as 'challenge',
                s.Size as 'csize',
                t.`Monster Type` as 'ctype'
                FROM monsters m
                INNER JOIN `sizes` s ON s.SizeID LIKE m.SizeID
                INNER JOIN `monster types` t ON t.MonsterTypeID LIKE m.MonsterTypeID";
if(!empty($sortquery)) $query = $query." WHERE ".$sortquery;

$query = $query." ORDER BY m.Monster";

//Fetch the spells from the database
$sql = $con->query($query);

$monsters = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) {
    $row["name"] = base64_encode($row["name"]);
    $monsters[] = $row;
}
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($monsters)) echo json_encode($monsters);
else echo json_encode("no response");
die;
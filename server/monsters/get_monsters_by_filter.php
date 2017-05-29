<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check if there were any sorting queries
$sort = "";
if(!empty($_GET["challenge"]) && isset($_GET["size"]) && isset($_GET["type"])){
    $challenge = $_GET["challenge"];
    $size = $_GET["size"];
    $type = $_GET["type"];

    $challengeMore = $challenge + 3;
} else die("Insufficient Parameters");

//Open the database connection
$con = make_mysql_connection();

//Set the sort parameter
$sortquery = "";
if($challenge != -1 && intval($challenge) == $challenge)
    $sortquery .=  "M.`Challenge Rating` BETWEEN '".$challenge."' AND '".$challengeMore."'";
if($size != -1 && intval($size) == $size){
    if($challenge != -1 && intval($challenge) == $challenge) $sortquery .= " AND ";
    $sortquery .= "m.SizeID LIKE '".$size."'";
}
if($type != -1 && is_int($type)){
    if(($challenge != -1 && intval($challenge) == $challenge)
        || ($size != -1 && is_int($size))) $sortquery .= " AND ";
    $sortquery .= "m.MonsterTypeID LIKE '".$type."'";
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
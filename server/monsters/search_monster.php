<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check The Querystring
$id = "";
if(!empty($_GET["monster"])){
    $monsterName = $_GET["monster"];
    $monsterName = urldecode($monsterName);
    $monsterName = str_replace("'", "\'", $monsterName);
} else $monsterName = "";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT m.MonsterID as 'id', m.Monster as 'name',
                m.`Challenge Rating` as 'challenge',
                s.Size as 'csize',
                t.`Monster Type` as 'ctype'
                FROM monsters m
                INNER JOIN `sizes` s ON s.SizeID LIKE m.SizeID
                INNER JOIN `monster types` t ON t.MonsterTypeID LIKE m.MonsterTypeID
                WHERE m.Monster  LIKE '%".$monsterName."%'";

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
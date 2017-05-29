<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check The Querystring
$id = "";
if(!empty($_GET["r"])){
    $recursion = $_GET["r"];
    $recursion = intval($recursion);
} else $recursion = "";

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
                ORDER BY m.Monster";

//Fetch the spells from the database
$sql = $con->query($query);

$monsters = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) {
    $row["name"] = base64_encode($row["name"]);
    $monsters[] = $row;
}
$con->close();

//Pick random monster
$monster = $monsters[rand(0, count($monsters))];

//Do the recursion
if(!empty($recursion) && is_int($recursion)) {
    for($i=0; $i<$recursion; $i++){
        $newmonster = $monsters[rand(0, count($monsters))];
        if($newmonster["challenge"] >= $monster["challenge"]) $monster = $newmonster;
    }
}

//Return the array in json
header('Content-Type: application/json');
echo json_encode($monster);
die;
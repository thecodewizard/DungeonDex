<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT f.id as 'id', f.race, f.class,
                f.leftyield, f.rightyield, f.strategy,
                m.Monster as 'name',
                m.`Challenge Rating` as 'challenge',
                s.Size as 'csize',
                t.`Monster Type` as 'ctype',
                f.timestamp as 'time'
                FROM fights f
                INNER JOIN monsters m ON m.MonsterID LIKE f.monster
                INNER JOIN `sizes` s ON s.SizeID LIKE m.SizeID
                INNER JOIN `monster types` t ON t.MonsterTypeID LIKE m.MonsterTypeID
                ORDER BY f.timestamp DESC";

//Fetch the spells from the database
$sql = $con->query($query);

$monsters = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) {
    $row["name"] = base64_encode($row["name"]);
    $row["now"] = time();
    $monsters[] = $row;
}
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($monsters)) echo json_encode($monsters);
die;
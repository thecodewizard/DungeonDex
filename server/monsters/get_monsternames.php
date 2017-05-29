<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT m.MonsterID as 'id', m.Monster as 'name'
            FROM monsters m
            ORDER BY m.Monster";

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
die;
<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT MonsterName as 'name'
            FROM recently_searched_monsters
            ORDER BY timestamp DESC
            LIMIT 5";

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
else http_response_code(418);
die;
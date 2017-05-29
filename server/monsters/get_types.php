<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT t.MonsterTypeID as 'id', t.`Monster Type` as 'ctype',
            (SELECT COUNT(m.MonsterID) FROM monsters m WHERE m.MonsterTypeID LIKE t.MonsterTypeID) as 'MonsterCount'
            FROM `monster types` t
            ORDER BY t.`Monster Type`";

//Fetch the spells from the database
$sql = $con->query($query);

$types = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $types[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($types)) echo json_encode($types);
die;
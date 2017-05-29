<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT s.SizeID as 'id', s.Size as 'csize',
            (SELECT COUNT(m.MonsterID) FROM monsters m WHERE m.SizeID LIKE s.SizeID) as 'MonsterCount'
            FROM sizes s
            ORDER BY s.Size";

//Fetch the spells from the database
$sql = $con->query($query);

$sizes = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $sizes[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($sizes)) echo json_encode($sizes);
die;
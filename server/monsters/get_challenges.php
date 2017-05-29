<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT concat(4*floor(`Challenge Rating`/4), '-', 4*floor(`Challenge Rating`/4)+3) as 'id',
                COUNT(*) as 'MonsterCount'
                FROM monsters
                WHERE `Challenge Rating` IS NOT NULL
                GROUP BY 1
                ORDER BY `Challenge Rating`";

//Fetch the spells from the database
$sql = $con->query($query);

$types = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $types[] = $row;
$con->close();

//Return the array in json
header("content-type: application/json");
if(!empty($types)) echo json_encode($types);
die;
<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT s.SchoolID, s.School,
            (SELECT COUNT(sp.SpellId) FROM spells sp WHERE sp.SchoolID LIKE s.SchoolID) as 'SpellCount'
            FROM schools s
            ORDER BY s.School";

//Fetch the spells from the database
$sql = $con->query($query);

$schools = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $schools[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($schools)) echo json_encode($schools);
die;
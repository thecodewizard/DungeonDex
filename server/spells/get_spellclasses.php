<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT s.SpellID as 'spellID', c.`Class or Domain` as 'class', c.ClassDomainID as 'id', s.`Level` as 'level'
            FROM spellclass s
            INNER JOIN `class or domain` c ON s.ClassDomainID LIKE c.ClassDomainID
            ORDER BY s.SpellID";

//Fetch the spells from the database
$sql = $con->query($query);

$classes = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $classes[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($classes)) echo json_encode($classes);

<?php
require_once "./../core/connection.php";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT c.ClassDomainID as 'id', c.`Class or Domain` as 'class', c.`Domain?` as 'Domain',
            (SELECT DISTINCT COUNT(sp.SpellID) FROM spellclass sp WHERE sp.ClassDomainID LIKE c.ClassDomainID) as 'SpellCount'
            FROM `class or domain` c
            ORDER BY c.`Class or Domain`";

//Fetch the spells from the database
$sql = $con->query($query);

$classes = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $classes[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($classes)) echo json_encode($classes);
die;
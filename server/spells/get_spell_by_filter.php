<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check if there were any sorting queries
$sort = "";
if(!empty($_GET["school"]) && isset($_GET["class"]) && isset($_GET["level"])){
    $school = $_GET["school"];
    $class = $_GET["class"];
    $level = $_GET["level"];
} else die("Insufficient Parameters");

//Open the database connection
$con = make_mysql_connection();

//Set the sort parameter
$sortquery = "";
if($school != -1 && isSchool($school, $con)) $sortquery .=  "sh.SchoolID LIKE '".$school."'";
if($class != -1 && isClass($class, $con)){
    if($school != -1 && isSchool($school, $con)) $sortquery .= " AND ";
    $sortquery .= "c.ClassDomainID LIKE '".$class."'";
}
if($level != -1 && (intval($level) == $level)){
    if(($school != -1 && isSchool($school, $con)) || ($class != -1 && isClass($class, $con))) $sortquery .= " AND ";
    $sortquery .= "s.`Level` LIKE '".$level."'";
}

//Prepare the statement
$query = "SELECT DISTINCT sp.SpellID as 'id', sp.Spell as 'name',
                sh.School as 'school', s.`Level` as 'level'
            FROM spellclass s
            INNER JOIN spells sp ON s.SpellID LIKE sp.SpellID
            INNER JOIN schools sh ON sp.SchoolID LIKE sh.SchoolID";
if(!empty($class) && $class != -1) $query = $query." INNER JOIN `Class or Domain` c ON c.ClassDomainID LIKE s.ClassDomainID";
if(!empty($sortquery)) $query = $query." WHERE ".$sortquery;
$query = $query." ORDER BY sp.Spell";

//Fetch the spells from the database
$sql = $con->query($query);

$spells = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $spells[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($spells)) echo json_encode($spells);
else echo json_encode("No Response");
die;
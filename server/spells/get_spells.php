<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check if there were any sorting queries
$sort = "";
if(!empty($_GET["sort"]) && isset($_GET["sortvalue"])){
    $sort = $_GET["sort"];
    $value = $_GET["sortvalue"];
}

//Open the database connection
$con = make_mysql_connection();

//Set the sort parameter
$sortquery = "";
if(!empty($sort) && isset($value)){
    switch($sort){
        case "class":
            $class = true;
            $sortquery = "c.ClassDomainID LIKE '".$value."'";
            if(!isClass($value, $con)) die;
            break;
        case "level":
            $sortquery = "s.`Level` LIKE '".$value."'";
            //if(!isLevel($value, $con)) die;
            break;
        case "school":
            $sortquery = "sh.SchoolID LIKE '".$value."'";
            if(!isSchool($value, $con)) die;
            break;
    }
}

//Prepare the statement
$query = "SELECT DISTINCT sp.SpellID as 'id', sp.Spell as 'name',
                sh.School as 'school', s.`Level` as 'level'
            FROM spellclass s
            INNER JOIN spells sp ON s.SpellID LIKE sp.SpellID
            INNER JOIN schools sh ON sp.SchoolID LIKE sh.SchoolID";
if(!empty($class) && !empty($sortquery)) $query = $query." INNER JOIN `Class or Domain` c ON c.ClassDomainID LIKE s.ClassDomainID";
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
die;
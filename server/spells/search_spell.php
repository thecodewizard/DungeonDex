<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check The Querystring
$id = "";
if(!empty($_GET["spell"])){
    $spellName = $_GET["spell"];
    $spellName = urldecode($spellName);
    $spellName = str_replace("'", "\'", $spellName);
} else $spellName = "";

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "SELECT DISTINCT sp.SpellID as 'id', sp.Spell as 'name',
                 sh.School as 'school',  s.`Level` as 'level'
            FROM spellclass s
            INNER JOIN spells sp ON s.SpellID LIKE sp.SpellID
            INNER JOIN schools sh ON sp.SchoolID LIKE sh.SchoolID
            WHERE sp.Spell LIKE '%".$spellName."%'";

//Fetch the spells from the database
$sql = $con->query($query);

$spell = array();
while($row = $sql->fetch_array(MYSQLI_ASSOC)) $spell[] = $row;
$con->close();

//Return the array in json
header('Content-Type: application/json');
if(!empty($spell)) echo json_encode($spell);
else echo json_encode("No Response");
die;
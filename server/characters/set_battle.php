<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

//Check The Querystring
$id = "";
if(isset($_POST["race"]) && isset($_POST["class"]) && isset($_POST["monster"])){
    $race = intval($_POST["race"]);
    $class = intval($_POST["class"]);
    $monster = intval( $_POST["monster"]);
} else die("Page expects at least a race, class and a monster");

if(!empty($_POST["strategy"])) $strategy = $_POST["strategy"];
else $strategy = "Just Charge it as brutal as possible.";

$left_weapon = $_POST["left_weapon"];
$right_weapon = $_POST["right_weapon"];
$left_spell = $_POST["left_spell"];
$right_spell = $_POST["right_spell"];

if(!empty($left_spell) || !empty($left_weapon)){
    if(!empty($left_weapon)) $left = $left_weapon;
    if(!empty($left_spell)) $left = $left_spell;
} else die("no left equipped");
if(!empty($right_spell) || !empty($right_weapon)){
    if(!empty($right_weapon)) $right = $right_weapon;
    if(!empty($right_spell)) $right = $right_spell;
} else die("no right equipped");

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "INSERT INTO fights VALUES(null, ?,?,?,?,?,?,?)";

//Fetch the spells from the database
$sql = $con->prepare($query);
$sql->bind_param('iiisssi', $race, $class, $monster, $left, $right, $strategy, time());
$sql->execute();

$id = $con->insert_id;

//Insert first 'zero' vote
//Open the database connection


//Prepare the statement
$stmt = "INSERT INTO votes VALUES(null, ".$id.", 0, ".time().")";

//Fetch the spells from the database
$con->query($stmt);

$con->close();

header("location: ./../../arena/index.php?fight=".$id);
die("Fight is saved. You'll be redirected to the arena.
Click <a href='./../../arena/index.php'>here</a> if the system doesn't redirect you.");
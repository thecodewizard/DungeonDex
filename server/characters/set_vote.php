<?php
require_once "./../core/connection.php";
include_once "./../core/functions.php";

if(!empty($_POST["vote"])){
    $vote = $_POST["vote"];
    $id = $_POST["fight"];
} else die("page expects a votecount & fightid");
if(!($vote == 1 || $vote == -1)) die("Vote isn't valid");

//Get the previous postcount
$votes = getVotes($id, true);
if(!empty($votes)) $count = $votes[0]["vote"];
else $count = 0;

if($vote == 1) $count++;
if($vote == -1) $count--;

//Open the database connection
$con = make_mysql_connection();

//Prepare the statement
$query = "INSERT INTO votes VALUES(null, ?,?,?)";

//Fetch the spells from the database
$sql = $con->prepare($query);
$sql->bind_param('iii', $id, $count, time());
$sql->execute();
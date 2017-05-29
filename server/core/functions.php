<?php
require_once "./../core/connection.php";

function isClass($param, $con){
    $query = "SELECT ClassDomainID as 'cd' FROM `class or domain`";

    $sql = $con->query($query);

    $arr = array();
    while($row = $sql->fetch_array(MYSQLI_ASSOC)) $arr[] = $row["cd"];

    if(empty($arr)) return false;
    return in_array($param, $arr);
}

function isLevel($param, $con){
    $query = "SELECT `Level` as 'l' FROM spellclass";

    $sql = $con->query($query);

    $arr = array();
    while($row = $sql->fetch_array(MYSQLI_ASSOC)) $arr[] = $row["l"];

    if(empty($arr)) return false;
    return in_array($param, $arr);
}

function isSchool($param, $con){
    $query = "SELECT SchoolID FROM schools";

    $sql = $con->query($query);

    $arr = array();
    while($row = $sql->fetch_array(MYSQLI_ASSOC)) $arr[] = $row["SchoolID"];

    if(empty($arr)) return false;
    return in_array($param, $arr);
}

function getVotes($id, $reverse = false){
    //Open the database connection
    $con = make_mysql_connection();

    $query = "SELECT id, fightid, vote, timestamp FROM votes
                WHERE fightid LIKE ?";
    if($reverse) $query .= " ORDER BY timestamp DESC ";
    else $query .= " ORDER BY timestamp ASC ";

    //Fetch the spells from the database
    $sql = $con->prepare($query);
    $sql->bind_param("i", $id);
    $sql->execute();

    $votes = array();
    $result = $sql->get_result();
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $votes[] = $row;
    }
    $con->close();

    return $votes;
}
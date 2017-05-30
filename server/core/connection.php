<?php

function make_mysql_connection(){
    $con = new mysqli('localhost', 'root', '####', 'dungeondex', 3306);

    if(!$con){
        return make_backup_mysql_connection();
    } else {
        if(!$con->query("DESCRIBE dungeondex")) {
            return $con;
        } else return make_backup_mysql_connection();
    }
}

function make_backup_mysql_connection(){
    $con = new mysqli('estebandenis.ddns.net', 'root', '####', 'dungeondex', 3306);

    if(!$con){
        return false;
    } else return $con;
}

function return_data($con, $data){
    $con->close();
    return $data;
}

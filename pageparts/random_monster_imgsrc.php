<?php
$monsters = [
    "./../assets/Characters/monster1.png",
    "./../assets/Characters/monster2.png",
    "./../assets/Characters/monster3.png",
    "./../assets/Characters/monster4.png",
    "./../assets/Characters/monster5.png",
    "./../assets/Characters/monster6.png",
    "./../assets/Characters/monster7.png",
    "./../assets/Characters/monster8.png",
    "./../assets/Characters/monster9.png",
    "./../assets/Characters/monster10.png" ];

$rand = rand(0, (count($monsters)-1));
echo $monsters[$rand];
?>
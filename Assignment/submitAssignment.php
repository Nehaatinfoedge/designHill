<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$servername = "localhost:3307";
$username = "root";
$password = "admin";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if(isset($_POST) && !empty($_POST)){ // Fetching variables of the form which travels in URL
    $create = 'CREATE TABLE IF NOT EXISTS resume(
        `rs_id` INT(11) NOT NULL AUTO_INCREMENT,';
    foreach($_POST as $key=>$value){
        $result = preg_replace('/[ ,]+/', '', trim($key));
        $insert_data["`".$result."`"] = "'".$value."'";
        $create .= "`".$result.'` VARCHAR(1000) NULL DEFAULT NULL,';
    }   
    $create .= 'PRIMARY KEY (`rs_id`))'; 
    $conn->query($create);
    $columns = array_keys($insert_data);
    $insert_values = array_values($insert_data);
    $insert = "insert into resume(".implode(',',$columns).") VALUES (".implode(',',$insert_values).")";
    

    //Insert Query of SQL
    if($conn->query($insert) === TRUE){
        echo "Data Inserted successfully...!!";
    }
    else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}


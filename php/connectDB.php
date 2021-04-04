<?php
  define("HOST","127.0.0.1");
  define("USER","root");
  define("PASSWORD","hoanglinhplus");
  define("DB","bookdb");
  function connectMysql(){
    $connect = new mysqli(HOST,USER,PASSWORD,DB) or die("cannot connect to database");
    return $connect;
  }
?>
<?php
  require "connectDB.php";
  $connect = connectMysql();
  $books = array();
  $query = "SELECT books.id_book, books.book_title,books.created_date,images.url_image,images.alt,authors.author_name FROM (books INNER JOIN images ON books.id_image = images.id_image) 
            INNER JOIN authors on books.id_author = authors.id_author";
  if(!$connect->connect_error){
    $result = $connect->query($query);
    if($result->num_rows > 0){
      while($row = $result->fetch_assoc()){
        $book = array("id_book"=>$row["id_book"],"book_title"=>$row["book_title"],
                      "created_date"=>$row["created_date"],"url_image"=>$row["url_image"],
                      "alt_image"=>$row["alt"],"author_name"=>$row["author_name"]);
        array_push($books,$book);
      }
      echo json_encode($books);
    }
  }
  else
   echo json_encode(array("status"=>"error","message"=>"cannot connect to database"));
?>
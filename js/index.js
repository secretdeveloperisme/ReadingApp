$(document).ready(function () {
  //render slideshow
  let $slideshow = $(".container-book-home-ad__slideshow");
  let $slides = $(".container-book-home__slides");
  let lengthOfSlides = $slides.children().length;
  let slideshowWidth = $slideshow.outerWidth();
  let $nextBtn = $(".slideshow-btn--next");
  let $backBtn = $(".slideshow-btn--previous");
  let $slidePagination = $(".slideshow-pagination")
  $nextBtn.click(nextSlide);
  $backBtn.click(backSlide);
  let indexSlide = 1;
  $slidePagination.children().each(function(index){    
    $(this).click(function(){
      $slidePagination.children().eq(indexSlide-1).removeClass("slideshow-pagination__item--active");
      showSlide(index+1);
      $(this).addClass("slideshow-pagination__item--active");
    });
  })
  function nextSlide() {
    $slidePagination.children().eq(indexSlide-1).removeClass("slideshow-pagination__item--active");  
    if(indexSlide > (lengthOfSlides-1)){
      indexSlide = 1;
      $slides.css("transform",`translateX(${slideshowWidth*(indexSlide-1)}px)`);
    }
    else{
      $slides.css("transform",`translateX(-${slideshowWidth*indexSlide}px)`);
      indexSlide++;
    }
    $slidePagination.children().eq(indexSlide-1).addClass("slideshow-pagination__item--active");
  }
  
  function showSlide(i){
    if(i > indexSlide){
      let n = (i-indexSlide);
       for(let j = 0 ; j < n ;j++){
          nextSlide();
       }
       console.log(indexSlide);
    }
    else if(i < indexSlide){
      let n = (indexSlide -i);
      console.log(n);
      for(let j = 0 ; j < n;j++){
          backSlide();
      }
    }

  }
  function backSlide() {  
    $slidePagination.children().eq(indexSlide-1).removeClass("slideshow-pagination__item--active"); 
    if(indexSlide <= 1){
      indexSlide = lengthOfSlides;
      $slides.css("transform",`translateX(-${slideshowWidth*(lengthOfSlides-1)}px)`)
    }
    else{
      $slides.css("transform",`translateX(-${slideshowWidth*(indexSlide)-2*slideshowWidth}px)`);
     indexSlide--;
    }
    $slidePagination.children().eq(indexSlide-1).addClass("slideshow-pagination__item--active");
  }
  setInterval(function(){
    nextSlide();
  },3000);
  //render Book product 
  let $bookProduct = $(".book-product-items");
   async function renderBooks() {
    let books = []; 
    await $.ajax({
      type: "GET",
      url: "/ReadingBook/php/getAllBooks.php",
      data: "",
      dataType: "text",
      success: function (response) {
        books = JSON.parse(response);
      }
    }); 
    $bookProduct.html("");
    console.log(books);
    books.forEach(function(value,index,array){
      let bookItem = document.createElement("a");
      bookItem.href ="";
      bookItem.classList.add("book-product-item__link");
      bookItem.classList.add("grid-col-2-10");
      bookItem.innerHTML = `
      <div class="book-product-item">
        <div class="product-item__img" style="background-image: url(${value.url_image});"></div>
        <span class="product-item__name">${value.book_title}</span>
        <span class="product-item__favorite"><i class="fas fa-check"></i><span>Yêu thích</span></span>
      </div>`;
      $($bookProduct).append(bookItem);
    })
  }
  renderBooks();
});


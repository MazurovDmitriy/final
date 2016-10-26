$( function() {


  var $grid = $('#discover__grid');


  $('.how__item').jcarousel({
    wrap: 'circular'
  });

  $('.how__slider-toleft')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
  });

  $('.how__slider-toright')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
  });

  $('#search__button').on('click', function() {
    getImages($grid);
  });

  $('.search__input').keypress(function(eventObject){
    
    if(eventObject.which == 13) {
      eventObject.preventDefault();
      getImages($grid);
    }
  });        

  $grid.masonry({
          itemSelector: '.discover__item',
          columnWidth: 20,
          gutter: 20
  });

  getImages($grid);

});

function getImages($grid) {
  var word = $('.search__input').val();
  word = word.replace(new RegExp(" ",'g'),"+");
  var params = {
    key: '3613645-e8b2abbb24ddff9ec9e08f873',
    q: word,
    per_page: 7,
    min_height: 310,
    orientation: 'horizontal'
  };

  $.getJSON('https://pixabay.com/api/?callback=?', params, function(data){

    var discoverImages = tmpl('discover_template', data);

    $grid.html(discoverImages);
    
    $grid.imagesLoaded( function() {

      $grid.masonry('destroy');

      $grid.masonry({
          itemSelector: '.discover__item',
          columnWidth: 20,
          gutter: 20
      });
      window.masonryIsActive = true;
    });
    //console.log('$grid', $grid);
  });


 
}
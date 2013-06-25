$(document).ready(function(){
  //Honako kodea smooth scrolling egiten du
  $('a[href^="#"]').on('click',function (e) {
    e.preventDefault();
    var target = this.hash,
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
  });
  
  $(function() {
    var hizkuntza = $.cookie('hizkuntza');

    if (hizkuntza == null){
      hizkuntza = navigator.language;
      $.cookie('hizkuntza', hizkuntza, {expires: 365, path: '/'});
    }
    
    $('li.'+hizkuntza).addClass('active');
    
    if (hizkuntza == 'eu') {
      $.ajax({
          url: 'translations.xml',
          success: function(xml) {
            $(xml).find('translation').each(function(){
              var id = $(this).attr('id');
              var text = $(this).find(hizkuntza).text();
              $("." + id).html(text);
          });
        }
      });
    }
  });
});

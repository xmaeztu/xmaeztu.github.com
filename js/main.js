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
    var cookie = $.cookie('hizkuntza');

    if (cookie == null){
      var hizkuntza = navigator.language;
      cookie = hizkuntza;
      $.cookie('hizkuntza', cookie, {expires: 365, path: '/'});
    }
    
    if (hizkuntza == 'eu') {
      $.ajax({
          url: 'translations.xml',
          success: function(xml) {
            $(xml).find('translation').each(function(){
              var id = $(this).attr('id');
              var text = $(this).find(language).text();
              $("." + id).html(text);
          });
        }
      });
    }
  });
});

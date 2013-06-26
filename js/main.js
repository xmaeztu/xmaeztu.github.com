$(document).ready(function(){
  //Honako kodea smooth scrolling egiten du
  $('a.menu').on('click',function (e) {
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
    if (hizkuntza != 'eu') {
      hizkuntza = 'es';
    }
    $('li.'+hizkuntza).addClass('active');
    
    if (hizkuntza == 'eu') {
      translate(hizkuntza);
    }
    $('a.lang-toggle').on('click', function(e) {
      e.preventDefault();
      var lang = this.hash.substring(1);
      translate(lang);
      $.cookie('hizkuntza', lang, {expires: 365, path: '/'});
    }); 
    
    function translate(hizkuntza) {
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

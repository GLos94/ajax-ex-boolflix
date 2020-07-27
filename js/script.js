// mia API = https://api.themoviedb.org/3/movie/550?api_key=1c0bbb5e84e24add52bb6a4821be5a57


// definisci il bottone
function inputRequest(){
  var btn = $('#push');
  btn.click(searchMovies);

}

// prendi il valore dell'input e cerca film
function searchMovies() {
  var query = $("#search").val();
   console.log(query);

  $('.movie').text('');


  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=' + query + '&language=it',
    method: 'GET',

    success: function (data) {

      var results = data['results'];

// parte di Handlebars
      var template = $('#movie-template').html();
      var compiled = Handlebars.compile(template);
      var target = $('.movie');


      for (var i = 0; i < results.length; i++) {
        var targetHTML = compiled({
          "it-title": results[i].title,
          "original_title": results[i].original_title,
          "original_language": results[i].original_language,
          "vote_average": results[i].vote_average
        })
        target.append(targetHTML);
    }
    },


    error: function (err) {
      console.log('err', err);
    }

  });
};







function init() {
  inputRequest();
}

$(document).ready (init);

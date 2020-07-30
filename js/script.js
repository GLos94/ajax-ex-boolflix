// mia API = https://api.themoviedb.org/3/movie/550?api_key=1c0bbb5e84e24add52bb6a4821be5a57

// MILESTONE 1 - ricerca film
// definisci il bottone
function inputRequest(){
  var btn = $('#push');
  btn.click(function () {
    searchMovies();
    searchSeries();
  });


};

// prendi il valore dell'input e cerca film
function searchMovies() {
  var query = $("#search").val();


  $('.movie').text('');


  $.ajax({

    url : 'https://api.themoviedb.org/3/search/movie',

    data : {
     'api_key': 'e99307154c6dfb0b4750f6603256716d',
     'query': query,
     // 'language': "it-IT"
    },

    method: 'GET',

    success: function (data) {

      var movies = data['results'];

  // parte di Handlebars
      var template = $('#movie-template').html();
      var compiled = Handlebars.compile(template);
      var target = $('.movies-container > .results');
      target.text('');
      // var poster = 'https://image.tmdb.org/t/p/w185';


      for (var i = 0; i < movies.length; i++) {


        var movie = movies[i];

        var vote = movie['vote_average'];
        movie.stars = getStars(vote);

        var lang = movie['original_language'];
        movie.flag = getFlag(lang);


        // movie.poster_path = poster + movie['poster_path'];


        var movieHTML = compiled(movie);
        target.append(movieHTML);
    }
    },


    error: function (err) {
      console.log('err', err);
    }

  });
};




// MILESTONE 2 - allarghiamo la ricerca alle serie tv
function searchSeries() {
  var query = $("#search").val();


  $('.serie').text('');


    $.ajax({

      url : 'https://api.themoviedb.org/3/search/tv',

      data : {
       'api_key': 'e99307154c6dfb0b4750f6603256716d',
       'query': query,
       // 'language': "it-IT"
      },

      method: 'GET',

      success: function (data) {

        var series = data['results'];

  // parte di Handlebars
        var template = $('#serie-template').html();
        var compiled = Handlebars.compile(template);
        var target = $('.series-container > .results');
        target.text('');
        // var poster = 'https://image.tmdb.org/t/p/w185';

        for (var i = 0; i < series.length; i++) {

          var serie = series[i];

          var vote = serie['vote_average'];
          serie.stars = getStars(vote);

          var lang = serie['original_language'];
          serie.flag = getFlag(lang);

          // serie.poster_path = poster + serie['poster_path'];


          var serieHTML = compiled(serie);
          target.append(serieHTML);
      }
      },


    error: function (err) {
      console.log('err', err);
    }

  });
};

// sostituiamo votazione numerica con votazione stelle
function getStars(vote) {

  vote = Math.ceil(vote / 2)

  var voteHTML = "";

  for (var j = 0; j < 5; j++) {
    if (j < vote) {
      voteHTML +=  '<i class="fas fa-star"></i>'
    } else {
      voteHTML +=  '<i class="far fa-star"></i>'
    }

   }

  return voteHTML;
};


// sostituiamo lingua con bandiera
function getFlag(lang) {

  if (lang === 'it' || lang === 'en' ) {

    return `<img class="flag" src="img/${lang}.png">`;

    }

    return lang;

};





// GENERAL FUNCTIONS
function init() {
  inputRequest();

};

$(document).ready (init);

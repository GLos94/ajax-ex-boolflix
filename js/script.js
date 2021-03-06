// mia API = https://api.themoviedb.org/3/movie/550?api_key=1c0bbb5e84e24add52bb6a4821be5a57


// MILESTONE 1 - ricerca film

function inputRequest() {
//avvia ricerca con bottone
  var btn = $('#push');
  var target = $('#search');

    btn.click(function(){

      startSearch();

    });

// avvia ricerca con tasto enter
    target.keyup(function() {

      if ( event.which == 13 ) {

        startSearch();

      }

    });

};


// generalizza funzione ricerca
function startSearch() {
  var target = $('#search');
  var query = target.val();
  target.val('');

  var targetResult = $('.results');
  targetResult.text('');

  searchMovies(query);
  searchSeries(query);


};

// prende il valore dell'input e cerca film
function searchMovies(query) {

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



      for (var i = 0; i < movies.length; i++) {


        var movie = movies[i];

        var vote = movie['vote_average'];
        movie.stars = getStars(vote);

        var lang = movie['original_language'];
        movie.flag = getFlag(lang);


        if (movie.overview.length > 250) {

          movie.overview = movie.overview.substring(0, 250) + '...';

        }

        var movieHTML = compiled(movie);
        target.append(movieHTML);
    }
    },


    error: function (err) {
      console.log('err', err);
    }

  });
};




// MILESTONE 2 - allarga la ricerca alle serie tv
function searchSeries(query) {


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


        for (var i = 0; i < series.length; i++) {

          var serie = series[i];

          var vote = serie['vote_average'];
          serie.stars = getStars(vote);

          var lang = serie['original_language'];
          serie.flag = getFlag(lang);


          if (serie.overview.length > 250) {

            serie.overview = serie.overview.substring(0, 250) + '...';

          }

          var serieHTML = compiled(serie);
          target.append(serieHTML);
      }
      },


    error: function (err) {
      console.log('err', err);
    }

  });
};

// sostituisce votazione numerica con votazione stelle
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


// sostituisce lingua con bandiera nazione
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

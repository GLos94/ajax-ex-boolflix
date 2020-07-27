function searchMovies() {
  var movies = [];
  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/550',
    method: 'GET',
    success: function (data) {
      // var movies = data['response']
      // console.log(movies);
      console.log(data);

      drawMovie(movies);
    },
    error: function (err) {
      console.log('err', err);
    }



  })
}

function drawMovie(movies) {
  var template = $('#movie-template').html();
  var compiled = Handlebars.compile(template);
  var target = $('.movies-container');


  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    movie = compiled(movies[i])

    target.append(movie);
}
}




function init() {
  searchMovies();
}

$(document).ready (init);

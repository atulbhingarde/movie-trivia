const movieInfo = function(movieName) {
  //get data from itunes api
  const queryURL = `https://itunes.apple.com/search?media=movie&entity=movie&term=${movieName}&attribute=featureFilmTerm`;
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    response = JSON.parse(response);
    const movie = response.results[0];
    const trackName = movie.trackName;
    const previewUrl = movie.previewUrl;

    $('#modalTitle').html(`${trackName}`);
    $('.modal-body').html(`<video src="${previewUrl}" type="video/x-m4v" controls="true" />`);
  }); 
}
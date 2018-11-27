const movieInfo = function (movieName,corrector) {
  //get data from itunes api
  const queryURL1 = `https://itunes.apple.com/search?media=movie&entity=movie&term=`+'"'+movieName+'"'+`&attribute=featureFilmTerm`;
  
  // console.log(queryURL1);
  $.ajax({
    url: queryURL1,
    method: 'GET'
  }).then(function (response) {
    response = JSON.parse(response);
    const movie = response.results[0];
    const trackName = movie.trackName;
    const previewUrl = movie.previewUrl;
    
    console.log(trackName);
    // console.log("Preview url is " + movie.previewUrl);
    if ( corrector === true ) 
     { displayString = "You are correct about the title its ";} else 
     { displayString = "You are incorrect about the title its ";}
    $('#movieScreen').html(`<h2>${displayString} : ${trackName}</h2>`);
    // $('.modal-body').html(`<video src="${previewUrl}" type="video/x-m4v" controls="true" autoplay />`);
    $('#movieScreen').append("<html>"+`<video src="${previewUrl}" type="video/x-m4v" controls="true" autoplay />`+"</html>");
    return(previewUrl);
  }); 
}

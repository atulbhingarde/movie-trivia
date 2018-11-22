// Array to store Movie Title and Plot from API query
var quizQuestions = [];
MaxNumInQList = 4 ;
attemptedTitles = [];
attemptedPlots = [] ; 
attemptedYourTitles = [] ; 
attemptedAnswers = [] ; 
var correctCount = 0;
const numQuestions = 10;
const selectedFour = [] ;
ButtonText= "SelectThis";
hasCodeRunBefore = false ; 
/* const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  } */
/*  window.onload = function () {
    if (!ls.exists('has_code_run_before')) {
        getMovieQuestions1();
        ls.set.single('has_code_run_before', true);

        ls.set.single('has_code_run_before', true, function () {
        });
    }
}; */
/* window.onload = function () {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        getMovieQuestions1();
        localStorage.setItem("hasCodeRunBefore", true);
    }
}; */
window.addEventListener('load', function () {
    // do stuff when the page has loaded
    getMovieQuestions1();
}, false);
const getMovieQuestions1 = function() {
    const movieQuiz = [];
    quizQuestions.length = 0 ;
    const SelectrandomOutOfMax = [];
    SelectrandomOutOfMax.length = 0 ; 


    // Select X number of movies from movieList array and add them to the movieQuiz array
        
    // get 10 unique numbers from long list we have
    while ( SelectrandomOutOfMax.length < numQuestions )
     {
         currentStart=0;
         TempSelectrandomOutOf = Math.floor(Math.random() * movieList.length );
         // console.log("this is"+TempSelectrandomOutOf);
         if ( SelectrandomOutOfMax.indexOf(TempSelectrandomOutOf) == -1 ) { SelectrandomOutOfMax.push(TempSelectrandomOutOf) ;  }
         // SelectrandomOutOfMax.push(TempSelectrandomOutOf) ; 
         // console.log("another "+SelectrandomOutOfMax.length);    
     }
    // console.log(" here " + SelectrandomOutOfMax);
    // console.log('new list');
    quizQuestions.length = 0 ; 
    for ( i = 0; ( i < numQuestions ) ; i++) {
        queryURL = `https://www.omdbapi.com/?apikey=8acace67&t=${movieList[SelectrandomOutOfMax[i]]}`;
        // console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            if ( typeof response.Title === 'undefined' || ( quizQuestions.indexOf(response.title) !== -1 )  ) 
             { 
               console.log(" some issue" + response.Title+" |"+response.Plot); 
               getMovieQuestions1() ; 
             } 
            else 
             { 
              // console.log(response.Title+" | "+response.Plot); 
               var objMovie = {
                myTitle: response.Title,
                myPlot: response.Plot,
                };
               quizQuestions.push(objMovie);
               // console.log(objMovie.myTitle);
               if ( quizQuestions.length === i ) { 
                   for(j=0;j<quizQuestions.length;j++) 
                    { /* console.log(" hi there 1 " + j + " "+ quizQuestions[j].myTitle+"|"+objMovie.myTitle) ; */ } 
                   listit(); }    
            }
        });
    }
};

 listit = function(){

    // get a random pair out of shortlist 
    // selectedFour = [] ; 
    selectedFour.length = 0 ; 

    var SelectedHonor = Math.floor(Math.random() * numQuestions);
 
    
    // console.log(" at end " + " | " + SelectedHonor );
    if ( quizQuestions[SelectedHonor]  !== undefined ) {
    // selectedFour.push(quizQuestions[SelectedHonor].myTitle);
    // console.log("correct answer is " + quizQuestions[SelectedHonor].myTitle) ;
    selectedFour.push(SelectedHonor);
    
    // get three more from the list of 10 but not duplicated
    while ( selectedFour.length < MaxNumInQList )
    {
      tempHold= Math.floor(Math.random() * numQuestions);

      if ( selectedFour.indexOf(tempHold) == -1 ) { selectedFour.push(tempHold) ;  }

    }
    // console.log(" here here " + selectedFour);

    $('#movieScreen').html(`<p class="p-3" id="MyPlot">${quizQuestions[SelectedHonor].myPlot}</p>`);
    
    // console.log("here " + quizQuestions[0].Title);    
    for(ButtonsInd=0; ButtonsInd < MaxNumInQList ; ButtonsInd++) {
        var TempButtonId =  ButtonText + ButtonsInd ; 
        // rremove the button if it exists 
        targetElement = document.getElementById(TempButtonId) ; 
        if ( targetElement !== null ) {
            // element does exist lets delete it 
            targetElement.parentNode.removeChild(targetElement);
        }
        
        $('#answers').prepend(`<button class="p-3" onclick="OnSelection(this)" id="`+TempButtonId+`">${quizQuestions[selectedFour[ButtonsInd]].myTitle}</button>`);

        // console.log("here " + quizQuestions[ButtonsInd].myTitle);      

    } }
};
//Prep = function() { getMovieQuestions();  listit();};
const OnSelection = function(link) {
    var tempText = link.innerText ; 
    // alert("hi there "+tempText);
    checkIfItMatches(tempText);
};

const checkIfItMatches = function(thistext) {

    // locate the element with the MyPlot 
    TempId =  'MyPlot' ; 
    // get the inner text and that is the plot 
    var TexttargetElement = document.getElementById(TempId).innerText ; 

    // alert(TexttargetElement);
    // assume to begin with that we do not have the correct answer in hand, obviously 
    // located as non real less than 0 index value

    found = false ; 
    located = -1 ;  

    for(i=0;i<MaxNumInQList;i++) { 
        if ( ( thistext === quizQuestions[selectedFour[i]].myTitle ) && ( TexttargetElement === quizQuestions[selectedFour[i]].myPlot  ) )  
         { found = true ; located = i ; } 
    }
    if ( found ===  true ) 
      { alert(" keep it up ! you are right about title " + thistext + " is indeed " + quizQuestions[located].Plot  );} 
    else 
      { alert(" better luck next time"); } 
    // here the found is correct either true or false
    attemptedTitles.push(thistext);
    attemptedAnswers.push(found);
    attemptedPlots.push(TexttargetElement);

    if ( found == true ) { correctCount = correctCount + 1 ;}

    for(j=0;j<attemptedAnswers.length;j++) 
     { 
       console.log(j+"|"+attemptedTitles[j]+"|"+attemptedAnswers[j]+"|"+attemptedPlots[j]);
     }
     // once selected a button a chance is taken disable all the buttons 
     // only button available is the lets play button
     DisableSelectButtons(); 
     console.log(correctCount+"|"+attemptedAnswers.length);
     var thisButton=document.getElementById("Dice"); 
     // console.log(thisButton);
     // thisButton.onclick("listit()");
     thisButton.setAttribute("onclick","listit()");




};
const DisableSelectButtons = function()
{
 // here list all buttons and disable them for heavens sake !  will ya ?
 
 var thisandthat = $('*[id ^= "SelectThis"]');
 // console.log(thisandthat) ; 
 
 for(i=0;i<thisandthat.length;i++) $(thisandthat[i]).prop('disabled',true);

 

};
//   // $('#movieScreen').html(`<p class="p-3">${quizQuestions[0].Plot}</p>`);
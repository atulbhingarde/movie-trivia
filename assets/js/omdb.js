const movieQuiz = [];
const quizQuestions = [] ;
const endpointUrls = [] ;
const MaxNumInQList = 4 ;
$('#start').on('click', function () {
    movieQuiz.length=0;
    endpointUrls.length=0; 
    quizQuestions.length=0; 
    const getMovies = function () {
        for (i=0; i < 10; i++) {
            movieQuiz.push(movieList[Math.floor(Math.random() * movieList.length)]);
        }
    };
    // METHOD USING ASYNC LIBRARY
    async.series([
        function (callback) {
            // Populate the movieQuiz array with Movie Titles
            console.log('S1:Func-1');
            for (let i = 0; i < 10; i++) {
                movieQuiz.push(movieList[Math.floor(Math.random() * movieList.length)]);
            }
            callback(null, 'S1:Func-1, finished.');
        },
        function (callback) {
            // Generate the Endpoint Urls and store them in an array
            console.log('S1:Func-2');
            for (let i = 0; i < movieQuiz.length; i++) {
                uri = encodeURI(`https://www.omdbapi.com/?apikey=8acace67&t=${movieQuiz[i]}`);
                endpointUrls.push(uri);
            }
            callback(null, 'S1:Func-2, finished.');
        },
        function (callback) {
            // Query the OMDB api and get the details for each movie
            console.log('S1:Func-3');
            let counter = 0;
            const getMovieDetails = function () {
                if (endpointUrls[counter]) {
                    $.ajax({
                        url: endpointUrls[counter],
                        method: 'GET'
                    }).done(function (response) {
                        quizQuestions.push(response);
                        counter++;
                        getMovieDetails();
                    });
                } else {
                    console.table(quizQuestions);
                    // $('#movieScreen').html(`<p class="p-3">${quizQuestions[0].Plot}</p>`);
                }
            };
            getMovieDetails();
            callback(null, 'S1:Func-3, finished.');
        }
    ]);
    
    quizQuestions.length=0; 
    
});


// CALLBACK
$('#next').on('click', function () {
    var RealmovieQuiz = [];
    RealmovieQuiz.length = 0 ; 
    var ReqLen = 4;
    console.log("Here really ! 1" + $(this).data('qid'));
    let val = $(this).data('qid');
    let newVal = parseInt(val) ; // + 1;
    $(this).data('qid', newVal);
    // $('#movieScreen').html(`<p class="p-3">${quizQuestions[newVal].Plot}</p>`);
    MaxLength=quizQuestions.length ; 
    console.log(" maxlength " + MaxLength);

    // select at random one from this 
    // RealmovieQuiz.push(Math.floor(Math.random() * MaxLength));
    
    // select other 3 as dummy 
    while ( RealmovieQuiz.length < ReqLen )
     {
        // set the temporary integer 
        tempInt = Math.floor(Math.random() * MaxLength) ; 
        // check if it is already in the array to ensure no duplicate answers and avoid correct answer as well
        // if it is not in the array add it to the array 
        if ( ( RealmovieQuiz.indexOf(tempInt) === -1 ) && ( typeof(quizQuestions[tempInt]) !==  'undefined' ) ) { RealmovieQuiz.push(tempInt) ; }
     }
     console.log(RealmovieQuiz);
    
    var SelectedHonor = Math.floor(Math.random() * MaxNumInQList);
    var ChooseButton = document.createElement("TEXT");     // Create a buttonelement
    TempButtonId =  'MyText' ;
    var targetElement = document.getElementById(TempButtonId) ;

    if ( targetElement !== null ) {
        // element does exist lets delete it
        targetElement.parentNode.removeChild(targetElement);
    }
    ChooseButton.id = TempButtonId ;
    var t = document.createTextNode(" "+quizQuestions[SelectedHonor].Plot+" ") ;   // Create a text node
    ChooseButton.appendChild(t);                                          // Append the text to <p>
    document.getElementById("movieScreen").appendChild(ChooseButton);           // Append <p> to <div> with id="myDIV"

     // console.log("this should be unique " + RealmovieQuiz);
     for(ButtonsInd=0; ButtonsInd < MaxNumInQList ; ButtonsInd++) {
        TempButtonId =  'SelectThis'+ ButtonsInd ;
        targetElement = document.getElementById(TempButtonId) ;
        if ( targetElement !== null ) {
            // element does exist lets delete it
            targetElement.parentNode.removeChild(targetElement);
        }

        ChooseButton = document.createElement("BUTTON");     // Create a buttonelement
        ChooseButton.setAttribute("onclick","OnSelection(this)");
        ChooseButton.className = "btn btn-primary"; 
        ChooseButton.id = TempButtonId ;
        t = document.createTextNode(" "+quizQuestions[ButtonsInd].Title+" ") ;   // Create a text node
        ChooseButton.appendChild(t);                                          // Append the text to <p>
        document.getElementById("answers").prepend(ChooseButton);           // Append <p> to <div> with id="myDIV"


    }
});
const OnSelection = function(link) {
    var tempText = link.innerText ;
    // alert("hi there |"+tempText+"|");
    checkIfItMatches(tempText);
};

const checkIfItMatches = function(thistext) {
    TempButtonId =  'MyText' ;
    x = document.getElementById(TempButtonId) ; 
    var TexttargetElement = x.innerText ;

    // alert(TexttargetElement);
    found = false ; 
    for(i=0;i<MaxNumInQList;i++) {
        if ( ( thistext === quizQuestions[i].Title ) && ( TexttargetElement === quizQuestions[i].Plot ) )  { found = true ; } 
        // alert("you are right ! keep it up"); } else { alert(" Sorry ! best of luck Next time !")}
    }
    if ( found ) { 
         alert("you are right ! keep it up"); 
        } else { alert(" Sorry ! best of luck Next time !"); } 

};

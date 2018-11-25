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
QuestionsEasy = true ; 
const tuneRadioRight = function(MyId,nMybool,nMyTitle) {
  var tthisandthat = $('*[id ^= MyId]');
  if ( tthisandthat[0] !== null ) {

  
  // $(tthisandthat).prop('disabled',nMybool);
  $(tthisandthat[0]).prop('title',nMyTitle);
  $(tthisandthat[0]).prop('disabled',nMybool);

  } else { console.log("cound not locate"+MyId);}
};
const toggleme = function(MyBool){
  QuestionsEasy = MyBool;
  if ( QuestionsEasy === true ) 
   {

     thisandthat = $('*[id ^= "RadioButtonEasy"]');
     $(thisandthat).prop('title',"disabled");
     $(thisandthat).prop('disabled',true);

     thisandthat = $('*[id ^= "RadioButtonTough"]');
     $(thisandthat).prop('title',"enabled");
     $(thisandthat).prop('disabled',false);
     /* tuneRadioRight("RadioButtonEasy",true,"Disabled");
     tuneRadioRight("RadioButtonTough",false,"Enabaled"); */

     // alert(`its `+QuestionsEasy+` right now will change it to false`) ; 
     QuestionsEasy = true ;

     } 
  else 
   { 
    
    // already selected option is for tough quesitons
    thisandthat = $('*[id ^= "RadioButtonEasy"]');
    $(thisandthat).prop('title',"enabled");
    $(thisandthat).prop('disabled',false); 
    // tuneRadioRight("RadioButtonEasy",false,"Enabled");

    thisandthat = $('*[id ^= "RadioButtonTough"]');
    $(thisandthat).prop('title',"disabled"); 
    $(thisandthat).prop('disabled',true );
    // tuneRadioRight("RadioButtonTough",true,"Disabled");

    // alert(`its `+QuestionsEasy+` right now will change it to true`);
    QuestionsEasy = false;

  } 
  // alert("QuestionsEasy is " + QuestionsEasy ); */
  listit();
};
const DoesItMatch = function(ThisString,WithThatString) {
  matchcount = 0 ;
  totcount = 0 ;
  maxMatching = 0.0 ;
  ThisStringArr =         ThisString.split(/ |,|:|;|{|}|'|\(|\)|-|\\*/);
  WithThatStringArr = WithThatString.split(/ |,|:|;|{|}|'|\(|\)|-|\\*/);
  for(mWords=0;mWords< ThisStringArr.length; mWords++) 
   {
    totcount++;
    if ( WithThatStringArr.indexOf(ThisStringArr[mWords]) !== -1 ) { matchcount++ ; } 
   }
   percentMatch = (matchcount/totcount)*100.0 ;

   // if ( percentMatch > maxMatching ) maxMatching = percentMatch ; 
   
  // console.log("Matching " + percentMatch +"|" +ThisString + "|" + WithThatString );
  return percentMatch;
};
const MyFilter = function(targetString, referenceString){
  filteredString = targetString ;
  refArray = referenceString.split(/ |,|:|;|{|}|'|\(|\)|-/);
  for(mWords=0;mWords<refArray.length;mWords++) 
   {
    if ( refArray[mWords].length > 2 ) {
    regEx = new RegExp(refArray[mWords], "ig");  
    filteredString = filteredString.replace(regEx,"*".repeat(refArray[mWords].length)); }
  // console.log("here title" + referenceString);
  if ( filteredString !==  targetString ) { console.log("did replace");} }
  return filteredString;
}
const removeThisElementById = function(MyId)
 {
   targetElement = document.getElementById(MyId) ; 
   if ( targetElement !== null ) 
    {
      // element does exist lets delete it 
            targetElement.parentNode.removeChild(targetElement);
    }
 };
// do initialze the game
window.addEventListener('load', function () {
    // do stuff when the page has loaded
    getMovieQuestions();
}, false);
const getMovieQuestions = function() {
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
         if ( SelectrandomOutOfMax.indexOf(TempSelectrandomOutOf) == -1 ) { SelectrandomOutOfMax.push(TempSelectrandomOutOf) ;  }
     }
    quizQuestions.length = 0 ; 
    for ( i = 0; ( i < numQuestions ) ; i++) {
        queryURL = `https://www.omdbapi.com/?apikey=8acace67&t=${movieList[SelectrandomOutOfMax[i]]}`;

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            if ( typeof response.Title === 'undefined' || ( quizQuestions.indexOf(response.title) !== -1 )  ) 
             { 
               // simply recurse because some undefined 
               getMovieQuestions() ; 
             } 
            else 
             { 
                // call to exclude the words from plot that are in title 
              
                var objMovie = {
                myTitle: response.Title,
                myPlot: response.Plot,
                myPlotU: response.Plot,
                };
               quizQuestions.push(objMovie);
              
               if ( quizQuestions.length === i ) { 
                   for(j=0;j<quizQuestions.length;j++) 
                    { /* console.log(" hi there 1 " + j + " "+ quizQuestions[j].myTitle+"|"+objMovie.myTitle) ; */ } 
                   listit(); }    
            }
        });
    }
};

 listit = function()
  {

    // get a random pair out of shortlist 
    // set the short list to zero size here 
    selectedFour.length = 0 ; 
    // select one item that is correct title and plot
    var SelectedHonor = Math.floor(Math.random() * numQuestions);
 
    
    
    if ( quizQuestions[SelectedHonor]  !== undefined ) 
     {
      getFiltered = quizQuestions[SelectedHonor].myPlot ; 
      if ( QuestionsEasy === false )
       { 
         console.log("will filter");
         getFiltered = MyFilter(quizQuestions[SelectedHonor].myPlot,quizQuestions[SelectedHonor].myTitle);
         // console.log("here filtered" + getFiltered);
       } else { console.log("will not filter");}

      // after confirming it is not undefined push it to the array of 4 
      selectedFour.push(SelectedHonor);
      // now select other three as summy titles
      // get three more from the list of 10 but not duplicated
      while ( selectedFour.length < MaxNumInQList )
       {
        tempHold= Math.floor(Math.random() * numQuestions);
        // make sure it is not repated in the array 
        if ( selectedFour.indexOf(tempHold) == -1 ) { selectedFour.push(tempHold) ;  }

      }
      for(i=0; ( i<selectedFour.length ) && ( QuestionsEasy === false );i++) 
      { 
        tgetFiltered = MyFilter(quizQuestions[i].myPlot,quizQuestions[i].myTitle);
        quizQuestions[i].myPlot = tgetFiltered ; 

      }
      // get one random number and swap the item so that the honored title is not in the begining always 

      tempHold= Math.floor(Math.random() * MaxNumInQList);
      // swap the last item with the one in hand i.e. tempHold
      kk=selectedFour[tempHold];  selectedFour[tempHold]=selectedFour[0]; selectedFour[0] = kk ; 

      // now display the plot that was selected 
      // $('#movieScreen').html(`<p class="p-3" id="MyPlot">${quizQuestions[SelectedHonor].myPlot}</p>`);
      $('#movieScreen').html(`<p class="p-3" id="MyPlot">`+getFiltered+`</p>`);

    

      // now set all the buttons with the text 

      for(ButtonsInd=0; ButtonsInd < MaxNumInQList ; ButtonsInd++) 
       {
        var TempButtonId =  ButtonText + ButtonsInd ; 
        // remove the button if it exists 
        removeThisElementById(TempButtonId);
        // set the button with answer number appended for all buttons         
        $('#answers').prepend(`<button class="p-3" onclick="OnSelection(this)" id="`+TempButtonId+`">${quizQuestions[selectedFour[ButtonsInd]].myTitle}</button>`);
        

       }
      // check and remove the dice for change set 
      // this button allows you to change the set of 10 
      removeThisElementById("Dice1");
      // now add a dice for getting a new set 
      $('#answers').append(`<button class="p-3" title="select this for getting new set of 10" onclick="getMovieQuestions()" id="Dice1">ChangeSet</button>`);
     }
  };
//Prep = function() { getMovieQuestions();  listit();};
const OnSelection = function(link) 
{
  var tempText = link.innerText ; 
  // check if the answer matches and further update the conters etc.
  checkIfItMatches(tempText);
};

const checkIfItMatches = function(thistext) 
 {

    // locate the element with the MyPlot 
    TempId =  'MyPlot' ; 
    // get the inner text and that is the plot 
    var TexttargetElement = document.getElementById(TempId).innerText ; 

    // assume to begin with that we do not have the correct answer in hand, obviously 
    // located as non real less than 0 index value

    found = false ; 
    located = -1 ;  
    MatchPerc = 0; 
    for(i=0;( i<MaxNumInQList ) && ( found === false );i++) 
     { 
        // if the text from the button matches for the selected title 
        // and 
        // the text we obtained from the inner text of the plot and the one corresponding to that of plot from quizquestions 
        // remember the array we are working is quizquestions which is of size 10 and not short listed 4 items 
        // selected four is holding just the index for the random 4 selected from 10
        // MatchPerc = DoesItMatch(TexttargetElement,quizQuestions[selectedFour[i]].myPlot);
        MatchPerc = DoesItMatch(quizQuestions[selectedFour[i]].myPlot,TexttargetElement);

        if ( ( thistext === quizQuestions[selectedFour[i]].myTitle ) && 
             ( ( TexttargetElement === quizQuestions[selectedFour[i]].myPlot )  || ( MatchPerc > 75.0 ) )   )
         { found = true ; 
           located = i ; 
           // alert(MatchPerc+"|"+TexttargetElement+"|"+quizQuestions[selectedFour[i]].myPlot);
         } 
        // alert(MatchPerc+"|"+TexttargetElement+"|"+quizQuestions[selectedFour[i]].myPlot);

         
         
     }
    if ( found ===  true ) 
      { alert(" keep it up ! you are right about title " + thistext + " is indeed " + quizQuestions[selectedFour[located]].myPlotU  );} 
    else 
      { alert(" better luck next time"); } 
    // here the found is correct either true or false
    attemptedTitles.push(thistext);
    attemptedAnswers.push(found);
    attemptedPlots.push(TexttargetElement);

    if ( found == true ) { correctCount = correctCount + 1 ;}
    lengthArray=attemptedAnswers.length;
    for(j=0;j<lengthArray;j++) 
     { 
       console.log(j+"|"+attemptedTitles[j]+"|"+attemptedAnswers[j]+"|"+attemptedPlots[j]);
     }
     // once selected a button a chance is taken disable all the buttons 
     // only button available is the lets play button
     DisableSelectButtons();
     removeThisElementById("MyCounters");
     
     $('#SideCurtain').prepend('<text id="MyCounters"> Your Score : correct '+correctCount+' out of '+ lengthArray + '</text>');

     console.log(correctCount+"|"+lengthArray);
     var thisButton=document.getElementById("Dice"); 
     
     // now that we have got the items selected for the first time set the on clisk function to reuse the
     // selected 10 
     // user can select another set by using changeset button 

     thisButton.setAttribute("onclick","listit()");
     thisButton.setAttribute("title","select this for continuing on same set") ; 




};
const DisableSelectButtons = function()
{
  // here list all buttons and disable them for heavens sake !  will ya ?
 
  var thisandthat = $('*[id ^= "SelectThis"]');
  // console.log(thisandthat) ; 
 
  for(i=0;i<thisandthat.length;i++) $(thisandthat[i]).prop('disabled',true);
};

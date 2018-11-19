// Reset the Modal Content on Close
const resetModal = function() {
    $('#modalTitle').empty();
    $('.modal-body').empty();
}

// CALLBACK FUNCTIONS //
$('.modal-dialog .close').on('click', resetModal);


//Verify correct answer chosen on question
const verifyName = function () {
    $('.allInfo').empty();
    const nameVal = $('#name').val();
    const track = "";
    for (i = 0; i < movieList.length; i++) {
      if (movieList[i].name.indexOf(nameVal) !== -1) {
        $('.allInfo').append(`<p>CORRECT<br>`)
      }
  
    }
  }
  $('#verify').on('click', verifyName);
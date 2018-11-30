// Reset the Modal Content on Close
const resetModal = function() {
    $('#modalTitle').empty();
    $('.modal-body').empty();
}

// CALLBACK FUNCTIONS //
//$('.modal-dialog .close').on('click', resetModal);

// pause the video when th emodal closes
$('#movieDetails').on('hide.bs.modal', function() {
  $('.modal-body video').get(0).pause();
});

// Play the video when the modal opens
$("#movieDetails").on('show.bs.modal', function() {
  $('.modal-body video').get(0).play();
});

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


// JQuery Plugin for Toggle Switch
$('#ckbGameMode').bootstrapSwitch({
  on: 'On', // default 'On'
  off: 'Off', // default 'Off'
  onLabel: '', //default ''
  offLabel: '', //default ''
  same: false, // default false. same text for on/off and onLabel/offLabel
  size: 'xs', // xs/sm/md/lg, default 'md'
  onClass: 'primary', //success/primary/danger/warning/default, default 'primary'
  offClass: 'secondary', //success/primary/danger/warning/default default 'default'
});
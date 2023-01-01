console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
 setupClickListeners();
  // load existing koalas on page load
  getKoalas();

  // NOT EXIST
  $('#viewKoalas').on('click', '#transfer-btn', readyToTransfer);
  $('#viewKoalas').on('click', '#remove', narcoleeptor );

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),   
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
    clearUserInputs();
    }); 
}

function getKoalas(){
  $('#viewKoalas').empty();
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas',
  }).then (function(response){
    console.log(response);
    for(let i =0; i<response.length; i++) {
   if(response[i].ready_to_transfer == 'N'){
      $('#viewKoalas').prepend(` 
    <tr data-id="${response[i].id}">
      <td>${response[i].name}</td>
      <td>${response[i].age}</td>
      <td>${response[i].gender}</td>
      <td>${response[i].ready_to_transfer}</td>
      <td>${response[i].notes}</td>
      <td>
        <button id="transfer-btn">Ready For Transfer</button>
      </td>
      <td>
        <button id="remove">Remove</button>
      </td>

    </tr>
    `)
   }
   else{
    $('#viewKoalas').prepend(` 
    <tr data-id="${response[i].id}">
      <td>${response[i].name}</td>
      <td>${response[i].age}</td>
      <td>${response[i].gender}</td>
      <td>${response[i].ready_to_transfer}</td>
      <td>${response[i].notes}</td>
      <td>
        
      </td>
      <td>
        <button id="remove">Remove</button>
      </td>
    </tr>
    `)
   }

     }

  });
  
    };// end getKoalas

function saveKoala( koalaToSend ){
  console.log( 'in saveKoala', koalaToSend );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url:'/koalas',
    data: koalaToSend,
  }).then (function(response){
    console.log('saveKoalas respinse', response);
    getKoalas();
  });
 
};

function clearUserInputs() {
      $('#nameIn').val(''),   
      $('#ageIn').val(''),
      $('#genderIn').val(''),
      $('#readyForTransferIn').val(''),
      $('#notesIn').val('')
};


function readyToTransfer () {
  $('#viewKoalas').empty()
  console.log('click!');
  const id = $(this).parent().parent().data('id');
  console.log(id);
  $.ajax({
    type: 'PUT',
    url:`/koalas/${id}`
  }) .then (function(response){
    console.log(response);
    getKoalas();
  });
};

function narcoleeptor() {
  console.log('narcoleeptor bye!');
  const id = $(this).parent().parent().data('id');
  console.log(id);

  if(confirm('Delete?????????????') == true) {
      $.ajax({
    type: 'DELETE',
    url: `/koalas/${id}`
  }).then(function(){
    getKoalas();
  }).catch(function(error){
    console.log(error);
    });
  } else {
    'you hit cancel'
  }
};
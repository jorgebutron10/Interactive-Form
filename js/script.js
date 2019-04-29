// page loading
$(document).ready(function () {
  //your code here
  $("#name").focus();
    $("#new-title").hide()
    $("#colors-js-puns").hide()
  })
// job
  $('#title').change(function(){
      if ($('#title option:selected').val() === "other") {
          $('#new-title').show();
          $('#new-title').focus();
      } else {
          $('#new-title').hide();
      }
  });

// t-shirts
  $('#design option:first').prop("disabled", true);

  $('#design').change(function(){
      if ($('#design option:selected').val() === "js puns") {
          $('#colors-js-puns').show();
          $('#color').html('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>');
      } else if ($('#design option:selected').val() === "heart js") {
          $('#colors-js-puns').show();
          $('#color').html('<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
      } else {
          $('#colors-js-puns').hide();
      }
  });
// registration for activities
  var jsFrameworks = $("input[name='js-frameworks']");
  var express = $("input[name='express']");
  var jsLibraries = $("input[name='js-libs']");
  var node = $("input[name='node']");

  // activities cost
  var totalCost = 0;
  $('.activities').append('<div id="total"></div>');

  // total cost
  var updateCost = function (cost) {
      totalCost += cost;
      document.getElementById("total").innerHTML = "Total: $" + totalCost;
  };

  // total cost of items
  $("input[name='all']").change(function () {
      if ($(this).prop("checked")) {
          updateCost(200);
      } else {
          updateCost(-200);
      }
  });

  jsFrameworks.change(function () {
      if ($(this).prop("checked")) {
          express.prop("disabled", true);
          express.parent().css("color", "gray");
          updateCost(100);
      } else {
          express.prop("disabled", false);
          express.parent().css("color", "black")
          updateCost(-100);
      }
  });

  jsLibraries.change(function () {
      if ($(this).prop("checked")) {
          node.prop("disabled", true);
          node.parent().css("color", "gray");
          updateCost(100);
      } else {
          node.prop("disabled", false);
          node.parent().css("color", "black");
          updateCost(-100);
      }
  });

  express.change(function () {
      if ($(this).prop("checked")) {
          jsFrameworks.prop("disabled", true);
          jsFrameworks.parent().css("color", "gray");
          updateCost(100);
      } else {
          jsFrameworks.prop("disabled", false);
          jsFrameworks.parent().css("color", "black");
          updateCost(-100);
      }
  });

  node.change(function () {
      if ($(this).prop("checked")) {
          jsLibraries.prop("disabled", true);
          jsLibraries.parent().css("color", "gray");
          updateCost(100);
      } else {
          jsLibraries.prop("disabled", false);
          jsLibraries.parent().css("color", "black");
          updateCost(-100);
      }
  });

  $("input[name='build-tools']").change(function () {
      if ($(this).prop("checked")) {
          updateCost(100);
      } else {
          updateCost(-100);
      }
  });

  $("input[name='npm']").change(function () {
      if ($(this).prop("checked")) {
          updateCost(100);
      } else {
          updateCost(-100);
      }
  });



  // credit card
  $('#payment').val('credit card');
  // Hide paypal and bitcoin
  $('#paypal, #bitcoin').hide();
  // disables
  $('option[value="select_method"]').prop("disabled", true);

  $('#payment').change(function(){
  	if ($('#payment option:selected').val() === "paypal") {
          $('#credit-card, #bitcoin').hide();
  		$('#paypal').show();
  	} else if ($('#payment option:selected').val() === "bitcoin") {
          $('#credit-card, #paypal').hide();
          $('#bitcoin').show();
  	} else {
  		$('#credit-card').show();
          $('#paypal, #bitcoin').hide();
  	}
  });

  // V A L I D A T I O N //
  $('button:submit').on('click', function(e){

      $('p.nameAlert').remove();
      $('p.emailAlert').remove();
      $('p.tshirtAlert').remove();
      $('p.activityAlert').remove();
      $('p.ccAlert').remove();
      $('p.zipCodeAlert').remove();
      $('p.cvvAlert').remove();

      // Local variable function
      var name = $('#name');
      var email = $('#mail');
      var cc = $('#cc-num');
      var zip = $('#zip');
      var cvv = $('#cvv');


      isValid = true;


      if (name.val() === "") {
          name.attr('placeholder', 'Please write your name');
          $('.basic').append('<p class="nameAlert">Please write your name</p>');
          name.css('borderColor', 'red');
          isValid = false;
      }

      name.on('change keyup', function(){
          if(name.val().length) {
              name.css('borderColor', '#5e97b0');
              $('.nameAlert').remove();
          }
      })

  // Check email input
      if (email.val() === "") {
          email.attr('placeholder', 'Please write valid email address');
          email.css('borderColor', 'red');
          isValid = false;
      };

      var mailFormat = /^[^@]+@[^@.]+\.[a-z]+$/i;
      if( !mailFormat.test($(email).val()) ) {
              email.css('borderColor', 'red');
              $('.basic').append('<p class="emailAlert">Please write valid email address</p>');
              isValid = false;
          } else {
              $('.emailAlert').remove();
          }

      email.on('change keyup', function(){
          if (email.val().length ) {
              email.css('borderColor', '#5e97b0');
              $('.email_checker').remove();
          } else {
              email.css('borderColor', 'red');
              isValid = false;
          }
  });

      // t-shirt info
      if ( $('#design option:first').is(':selected') ) {
          $('.shirt').append('<p class="tshirtAlert">Please select a design</p>');
          isValid = false;
      }

      $('#design').on('change', function() {
          if( !$('#design option:first').is(':selected') ) {
              $('.tshirtAlert').remove();
          } else {
              $('.shirt').append('<p class="tshirtAlert">Please select design</p>');
              isValid = false;
          }
      });

      // checkbox
      if( $('.activities input:checked').length === 0) {
          $('.activities').append('<p class="activityAlert">At least one must be selected</p>');
          isValid = false;
          } else {
              $('.activityAlert').remove();
          }

      // credit card input
      if( $('option[value="credit card"]').is(':selected') ) {
          var cCChecker = /^(\d{13,16})$/;
          if( !cCChecker.test(cc.val())) {
              $('#credit-card').append('<p class="ccAlert">Please enter 13-16 digits of your credit card</p>');
              cc.css('borderColor', 'red');


              cc.on('change keyup', function(){
                  //length
                  if(cc.val().length ) {
                      cc.css('borderColor', '#5e97b0')
                      $('.ccAlert').remove();
                  } else {
                      cc.css('borderColor', 'red')
                  }
              });
              isValid = false;
          }

          // zip code input
          var zipCodeChecker = /^(\d{5})$/;
          if( !zipCodeChecker.test( $('#zip').val()) ) {
              zip.css('borderColor', 'red');
              $('#credit-card').append('<p class="zipCodeAlert"> Enter 5 digits Zip Code</p>');


              zip.on('change keyup', function(){

                  if( zip.val().length ) {
                      zip.css('borderColor', '#5e97b0');
                      $('.zipCodeAlert').remove();
                  } else {
                      zip.css('borderColor', 'red')
                  }
              });
              isValid = false;
          }


          var cvvChecker = /^(\d{3})$/;
          if( !cvvChecker.test( $('#cvv').val()) ) {
              cvv.css('borderColor', 'red');
              $('#credit-card').append('<p class="cvvAlert">Enter 3 digits of your security code</p>');
              //Check while user is typing
              cvv.on('change keyup', function() {
                  //Check cvv length
                  if( cvv.val().length ) {
                      cvv.css('borderColor', '#5e97b0')
                      $('.cvvAlert').remove();
                  } else {
                      cvv.css('borderColor', 'red')
                  }
              });
              isValid = false;
      }
  }

      //Stop if invalid
      if( !isValid ) {
          e.preventDefault();
      }

      if (isValid) {
          alert("Thank you for your purchase. I hope to see you soon!");
      }
  });

(function($) {

    $( "#birth_date" ).datepicker({
        dateFormat: "mm - dd - yy",
        showOn: "both",
        buttonText : '<i class="zmdi zmdi-calendar-alt"></i>',
    });

    $('.add-info-link ').on('click', function() {
        $('.add_info').toggle( "slow" );
    });

    $('#country').parent().append('<ul class="list-item" id="newcountry" name="country"></ul>');
    $('#country option').each(function(){
        $('#newcountry').append('<li value="' + $(this).val() + '">'+$(this).text()+'</li>');
    });
    $('#country').remove();
    $('#newcountry').attr('id', 'country');
    $('#country li').first().addClass('init');
    $("#country").on("click", ".init", function() {
        $(this).closest("#country").children('li:not(.init)').toggle();
    });

    $('#city').parent().append('<ul class="list-item" id="newcity" name="city"></ul>');
    $('#city option').each(function(){
        $('#newcity').append('<li value="' + $(this).val() + '">'+$(this).text()+'</li>');
    });
    $('#city').remove();
    $('#newcity').attr('id', 'city');
    $('#city li').first().addClass('init');
    $("#city").on("click", ".init", function() {
        $(this).closest("#city").children('li:not(.init)').toggle();
    });

    var allOptions = $("#country").children('li:not(.init)');
    $("#country").on("click", "li:not(.init)", function() {
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#country").children('.init').html($(this).html());
        allOptions.toggle('slow');
    });

    var FoodOptions = $("#city").children('li:not(.init)');
    $("#city").on("click", "li:not(.init)", function() {
        FoodOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#city").children('.init').html($(this).html());
        FoodOptions.toggle('slow');
    });

    $('#signup-form').validate({
        rules : {
            first_name : {
                required: true,
            },
            last_name : {
                required: true,
            },
            phone_number : {
                required: true
            },
            password : {
                required: true
            },
            re_password : {
                required: true,
                equalTo: "#password"
            }
        },
        onfocusout: function(element) {
            $(element).valid();
        },
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });
})(jQuery);


	var password ;
		var re_password;
function regSubmit(event){
 re_password = document.getElementById("re_password").value;
 password = document.getElementById("password").value;
	 event.preventDefault();
var response_error = "";
 var mydata = new FormData(event.target);
 var response="";
mydata = Object.fromEntries(mydata.entries());
if(password.length>0 &&  re_password==password){
	
 $.ajax({
    type: "POST",
    url: "http://localhost:3000/user/students/signup",
    data: mydata,
    dataType: "json",
    success: function (xhr) {
       
       response =   xhr; 
  document.getElementById("errors").style.color="black"
  document.getElementById("errors").scrollIntoView()
  
 if(response.hasOwnProperty("message")){
	   $("#errors").html(response.message)
	 
	 
 }
 

	
    },
    error: function (xhr, status, errorThrown) {
        //Here the status code can be retrieved like;
        xhr.status;
		 response =  JSON.parse(xhr.responseText);
  
       
 if(response.hasOwnProperty("message")){
	response_error =   response.message 
	  
	 
 }
 

 if(response.hasOwnProperty("errors")){
		 if(typeof(response.errors)=="object"){
			 for(var a in response.errors){
				 response_error+=response.errors[a]+" "
			 }
			 
		 }
		 
	 }
	 
	 $("#errors").html(response_error)
	


  document.getElementById("errors").style.color="red"
  document.getElementById("errors").scrollIntoView()
	

    }
	//error
});


}
 
	 else{
		 response_error="Passwords dont match, or empty"
		 
  document.getElementById("errors").innerHTML =  response_error
  document.getElementById("errors").style.color="red"
  document.getElementById("errors").scrollIntoView()
  
	 }
 
}





function loginSubmit(event){
	 event.preventDefault();  
var response_error = "";
 var mydata = new FormData(event.target);
 var response="";
mydata = Object.fromEntries(mydata.entries()); 
	
 $.ajax({
    type: "POST",
    url: "http://localhost:3000/user/students/signin",
    data: mydata,
    dataType: "json",
    success: function (xhr) {
       
       response =   xhr; 
  document.getElementById("errors").style.color="black"
  document.getElementById("errors").scrollIntoView()
  
 if(response.hasOwnProperty("message")){
	   $("#errors").html(response.message)
	 
	 
 }
 

	
    },
    error: function (xhr, status, errorThrown) {
        //Here the status code can be retrieved like;
        xhr.status;
		 response =  JSON.parse(xhr.responseText);
  
       
 if(response.hasOwnProperty("message")){
	response_error =   response.message 
	  
	 
 }
 

 if(response.hasOwnProperty("errors")){
		 if(typeof(response.errors)=="object"){
			 for(var a in response.errors){
				 response_error+=response.errors[a]+" "
			 }
			 
		 }
		 
	 }
	 
	 $("#errors").html(response_error)
	


  document.getElementById("errors").style.color="red"
  document.getElementById("errors").scrollIntoView()
	

    }
	//error
});

 
 
}
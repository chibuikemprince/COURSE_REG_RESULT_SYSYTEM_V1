var baseUrl = "http://localhost:3000/v1";



var regFORM= "<input type='text' name='surname' id='sname' placeholder='Enter Your surname Here'  class='form-control'  required/>"
regFORM +=  "<input type='text' name='firstname' id='fname' placeholder='Enter Your Firstname Here'  class='form-control'  required/><input type='text' name='lname' id='lname' placeholder='Enter Your Lastname Here'  class='form-control'  required/>"
 
 regFORM +=  "<input type='text' name='country' id='country' placeholder='Enter Your country Here'  class='form-control'  required/>"
 regFORM += "<input type='text' name='state' id='state' placeholder='Enter Your state Here'  class='form-control'  required/>"
 regFORM += "<input type='text' name='lga' id='lga' placeholder='Enter Your LGA Here'  class='form-control'  required/>"
 regFORM += "<input type='text' name='dob' id='dob' placeholder='Enter Your Date of Birth Here'  class='form-control'  required/>"
 regFORM += "<input type='text' name='level' id='level' placeholder='Enter Your level Here'  class='form-control'  required/>"
 regFORM += "<input type='text' name='regno' id='regno' placeholder='Enter Your Reg No Here'  class='form-control'  required/>"
 regFORM += "<input type='hidden' name='usertype' value='student' required/>"

var reg_form = "<form id='form_getter' url='registration'> <p id='reg_error'></p> "+regFORM+"<input type='email' name='email' id='email' placeholder='Enter Your Email Here'   class='form-control'  required/><input type='number' name='phone' id='phone' placeholder='Enter Your Phone Number Here'   class='form-control'  required / ><input type='password' name='password' id='password' placeholder='Enter Your Password Here'   class='form-control'  required/><input type='password' name='cpassword' id='cpassword' placeholder='Confirm Your Password '   class='form-control'  required/> <select class='form-control' id='sex' name='sex' required> <option value=''> Select Your Sex</option> <option value='male'> Male</option>  <option value='female'> Female</option> </select>  <input value='Submit' type='submit' onclick='form_submitter(this,event)' id='submit_form_getter' error='reg_error'  class='form-control'  required> </form>";
 var forget_form_parent = "document.getElementById('model_body_div')";                           

var login_form = "<form id='form_getter' url='login'> <p id='login_error'></p><input type='text' name='e' id='email' placeholder='Enter Your RegNo Here'   class='form-control'  required/><input type='password' name='p' id='password' placeholder='Enter Your Password Here'   class='form-control'  required/> <input  value='Submit' type='submit' onclick='login_students(event)' id='submit_form_getter' error='login_error'  class='form-control login_mybtn'  required></form>  <h6 onclick='get_forget_login_form()' align='right' class='forgot_password_link'  id='forgot_details_login_btn_user'>  </h6>";
var lec_login_form = "<form id='form_getter' url='login'> <p id='login_error'></p><input type='email' name='e' id='email' placeholder='Enter Your Email Here'   class='form-control'  required/><input type='password' name='p' id='password' placeholder='Enter Your Password Here'   class='form-control'  required/> <input  value='Submit' type='submit' onclick='login_lecturers(event)' id='submit_form_getter' error='login_error'  class='form-control login_mybtn'  required></form>  <h6 onclick='get_forget_login_form()' align='right' class='forgot_password_link'  id='forgot_details_login_btn_user'>  </h6>";


/* alert("dd") */
var login_form_admin = "<form id='form_getter' url='login_admin'> <p id='login_msg'></p> <p style='color:red;' id='login_error'></p><input type='email' name='e' id='email' placeholder='Enter Your Login Id Here'   class='form-control'  required/><input type='password' name='p' id='password' placeholder='Enter Your Password Here'   class='form-control'  required/> <input  value='Submit' type='submit' onclick='login_admin_submit(event)' id='submit_form_getter' error='login_error'  class='form-control login_mybtn'  required></form>";
var forget_login_form = "<form id='form_getter' url='forget_password'> <p id='login_error'></p><input type='email' name='e' id='email' placeholder='Enter Your Login Email Here'   class='form-control'  required/>    <input value='Submit' type='submit' onclick='form_submitter(this,event)' id='submit_form_getter login_mybtn' error='login_error'  class='form-control'  required></form>";



function get_forget_login_form(){
	//toggle_model();
	document.getElementById('model_body_div').innerHTML =   forget_login_form;
	
	
}


function open_login_admin(div){
	toggle_model();
	div.innerHTML=   login_form_admin ;
	
	
}

function open_login(div){
	toggle_model();
	div.innerHTML=   login_form ;
	$("forgot_details_login_btn_user").css("display","none")

	
}



function open_login_lec(div){
	toggle_model();
	div.innerHTML=   lec_login_form ;
	$("forgot_details_login_btn_user").css("display","none")

	
}




 
 function login_students(evt){
	  
	  if(document.getElementById("password").value=="" || document.getElementById("email").value==""){
			alert("Email and Password is required.");
		 return;
	  }
	  
		 evt.preventDefault();
	 $.ajax({
  type: "POST",
  url:baseUrl+"/students/login",
  data: {
	  regno:document.getElementById("email").value,
	  password:document.getElementById("password").value 
	  
	  },
  dataType: "json",
  success: function (xhr) {
	  //table_row
	 // xhr.status;
	   //xhr =  JSON.parse(xhr.responseText);

 
localStorage.setItem("name",xhr.name);
localStorage.setItem("dept",xhr.dept);
localStorage.setItem("level",xhr.level);
localStorage.setItem("type","student");
localStorage.setItem("regno",document.getElementById("email").value);
localStorage.setItem("studentpassword",document.getElementById("password").value);

	  document.getElementById("login_error").innerHTML="<td style='color:green;'>"+xhr.message+"</td>";
	  setTimeout(function(){
		  
		   location = "../students.html";	 
		  
	  },1000);
	  
  },
 error: function (xhr, status, errorThrown) {
  	  xhr.status;
	   xhr =  JSON.parse(xhr.responseText);
document.getElementById("login_error").innerHTML="<td style='color:red;'>"+xhr.message+"</td>";
	  
 
 
 
 }

	 })  
	 
	   
	 
	 
 }


 function login_lecturers(evt){
	  
	  if(document.getElementById("password").value=="" || document.getElementById("email").value==""){
			alert("Email and Password is required.");
		 return;
	  }
	  
		 evt.preventDefault();
	 $.ajax({
  type: "POST",
  url:baseUrl+"/lecturers/login",
  data: {
	  email:document.getElementById("email").value,
	  password:document.getElementById("password").value 
	  
	  },
  dataType: "json",
  success: function (xhr) {
	  //table_row
	 // xhr.status;
	   //xhr =  JSON.parse(xhr.responseText);

 
localStorage.setItem("type","lecturers");
localStorage.setItem("lectureremail",document.getElementById("email").value);
localStorage.setItem("lecturerpassword",document.getElementById("password").value);

	  document.getElementById("login_error").innerHTML="<td style='color:green;'>"+xhr.message+"</td>";
	  setTimeout(function(){
		  
		   location = "../lecturer.html";	 
		  
	  },1000);
	  
  },
 error: function (xhr, status, errorThrown) {
  	  xhr.status;
	   xhr =  JSON.parse(xhr.responseText);
document.getElementById("login_error").innerHTML="<td style='color:red;'>"+xhr.message+"</td>";
	  
 
 
 
 }

	 })  
	 
	   
	 
	 
 }


function open_reg(div){
	toggle_model();
	div.innerHTML=  reg_form;
	
	
}


function resend_recovery(div,arg,event){
	div.setAttribute("url",'forget_password');

	div.setAttribute("error",'login_error');
	div.setAttribute("success",'login_error');
	
	    
	
	request_sender(div,arg,event);
	
	
	
}


function logout(who){
	
show_elements("spinner","block"); 
			 
			 
	
	if(who=="admin"){
		
		localStorage.setItem("email_admin","");
		localStorage.setItem("pin_admin","");
		setTimeout(function(){ location="admin_login.html"; },1000);
	
	}
	else if(who=="user"){
		
		localStorage.setItem("email","");
		localStorage.setItem("pin","");
		setTimeout(function(){ location="index.html"; },1000);
	
	}
	
}


function login_admin_submit(event){
	event.preventDefault();
	var username = document.getElementById("email").value;
	var userpass = document.getElementById("password").value;
	var reqdata = {
		
		email:username,
		password:userpass
		
	}
	
	var requrl = baseUrl+"/admin/login";
 login(event,"login_msg","login_error", requrl,reqdata,"admin","../admin.html")
 
}




function login(event,div,error, requrl,reqdata,type,redirect="#"){
	event.preventDefault();
	
	  document.getElementById(div).innerHTML="Please wait .....";	 
	  document.getElementById(error).innerHTML="";
$.ajax({
  type: "POST",
  url:requrl,
  data: reqdata,
  dataType: "json",
  success: function (xhr) {
	  
	  var response =   xhr;
	   //console.log(xhr);
	  document.getElementById(error).innerHTML="";	 
	  document.getElementById(div).innerHTML=response.message;	 

localStorage.setItem("type",type);
localStorage.setItem("adminemail",reqdata.email);
localStorage.setItem("adminpassword",reqdata.password);

if(response.hasOwnProperty("redirect") ){
	
	setTimeout(function(){
		
		response.redirect==true?location = redirect:true;
	
	},2000);
	
	
}



  },
  error: function (xhr, status, errorThrown) {
	 
	   xhr.status;
	   response =  JSON.parse(xhr.responseText);

	 
if(response.hasOwnProperty("message")){
  var response_error =   response.message 
document.getElementById(div).innerHTML="";	 
document.getElementById(error).innerHTML=response_error;	 

} 
	  
  }

	 




	 
  });
	
}


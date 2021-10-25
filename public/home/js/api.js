/* alert("d")  */
var Routes ={}
Routes.registration="http://localhost:3000/user/students/signup"



   var  form_to_submit ;
	
	var submitter_url ;
var	length_for_inner ; 
var	counter_form_children ;

var length_for_success ;
var counter_form_success; 
var  form_getter_xHR;
var form_getter_xHR_data; 
var Adminreqdata ={}


function getAllStudents(div,args,event) {

show_elements("spinner","block");   
		   /*  */
Adminreqdata={
email:localStorage.getItem("email_admin"),
password:localStorage.getItem("pin_admin")



} 

	event.preventDefault();
	$("#errors").html("");

  
$.ajax({
  type: "POST",
  url:div.getAttribute("url"),
  data: Adminreqdata,
  dataType: "json",
  success: function (xhr) {

	  hide_elements("spinner");
	 response =   xhr; 
document.getElementById("errors").style.color="black"
document.getElementById("errors").scrollIntoView()

if(response.hasOwnProperty("message")){
	 $("#errors").html(response.message)
   var innerValue = ""
document.getElementById(div.getAttribute("success")).innerHTML =""
					 /* document.getElementById(div.getAttribute("success")).innerHTML = response.message; */
				   response.message.forEach(element=>{
 innerValue  ="<div class='all_students' >"
delete element["__v"]
delete element["password"]
delete element["createdAt"]
delete element["usertype"]
delete element["_id"]

innerValue  +="<p>Name: "+element.surname+" "+element.firstname+" "+element.lastname+"</p>" 
innerValue  +="<p>Email: "+element.email+"</p>" 
innerValue  +="<p>LGA: "+element.lga+"</p>" 

delete element["lga"]
delete element["surname"]
delete element["lastname"]
delete element["firstname"]
delete element["email"]


for(var a in element){
 innerValue  +="<p>"+a+": "+element[a]+"</p>" 

}


if(element.dept==localStorage.getItem("dept_hod") ){
	innerValue+="<button class='btn btn-secondary' onclick=\"addstudentdept('"+element.regno+"','none')\" >Remove from "+localStorage.getItem("dept_hod")+"</button>"
}
else{
	
	innerValue+="<button class='btn btn-secondary' onclick=\"addstudentdept('"+element.regno+"','"+localStorage.getItem('dept_hod')+"')\" >Add to "+localStorage.getItem("dept_hod")+"</button>"

	
}

innerValue +="</div>"
document.getElementById(div.getAttribute("success")).innerHTML += innerValue 
}
)



}

  },
  error: function (xhr, status, errorThrown) {
hide_elements("spinner");
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





 
  
  
  
  }//submit function



function getMyStudents(div,args,event) {

show_elements("spinner","block");   
		   /*  */
Adminreqdata={
email:localStorage.getItem("email_admin"),
password:localStorage.getItem("pin_admin")



} 

	event.preventDefault();
	$("#errors").html("");

  
$.ajax({
  type: "POST",
  url:div.getAttribute("url"),
  data: Adminreqdata,
  dataType: "json",
  success: function (xhr) {

	  hide_elements("spinner");
	 response =   xhr; 
document.getElementById("errors").style.color="black"
document.getElementById("errors").scrollIntoView()

if(response.hasOwnProperty("message")){
	 $("#errors").html(response.message)
   var innerValue = ""
document.getElementById(div.getAttribute("success")).innerHTML =""
					 /* document.getElementById(div.getAttribute("success")).innerHTML = response.message; */
				  


				  response.message.forEach(element=>{
 
 
 
if(element.dept==localStorage.getItem("dept_hod") ){
 innerValue  ="<div class='all_students' >"
delete element["__v"]
delete element["password"]
delete element["createdAt"]
delete element["usertype"]
delete element["_id"]

innerValue  +="<p>Name: "+element.surname+" "+element.firstname+" "+element.lastname+"</p>" 
innerValue  +="<p>Email: "+element.email+"</p>" 
innerValue  +="<p>LGA: "+element.lga+"</p>" 

delete element["lga"]
delete element["surname"]
delete element["lastname"]
delete element["firstname"]
delete element["email"]


for(var a in element){

	 innerValue  +="<p>"+a+": "+element[a]+"</p>" 
 
 
}


if(element.dept==localStorage.getItem("dept_hod") ){
	innerValue+="<button class='btn btn-secondary' onclick=\"addstudentdept('"+element.regno+"','none')\" >Remove from "+localStorage.getItem("dept_hod")+"</button>"
}
 

innerValue +="</div>"
document.getElementById(div.getAttribute("success")).innerHTML += innerValue 
}

}




)
 
}

  },
  error: function (xhr, status, errorThrown) {
hide_elements("spinner");
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





 
  
  
  
  }//submit function



function addstudentdept(regno,dept) {

show_elements("spinner","block");   
		   /*  */
Adminreqdata={
email:localStorage.getItem("email_admin"),
password:localStorage.getItem("pin_admin"),
regno:regno,
dept:dept



}  
  
$.ajax({
  type: "POST",
  url:"http://localhost:3000/admin/hod/addstudentdept",
  data: Adminreqdata,
  dataType: "json",
  success: function (xhr) {

	  hide_elements("spinner");
	 response =   xhr; 
document.getElementById("errors").style.color="black"
document.getElementById("errors").scrollIntoView()

if(response.hasOwnProperty("message")){
	 alert(response.message) 

}

  },
  error: function (xhr, status, errorThrown) {
hide_elements("spinner");
	  //Here the status code can be retrieved like;
	  xhr.status;
	   response =  JSON.parse(xhr.responseText);

	 
if(response.hasOwnProperty("message")){
  alert(response.message) 
	
   







}


if(response.hasOwnProperty("errors")){
	   if(typeof(response.errors)=="object"){
		   for(var a in response.errors){
			   response_error+=response.errors[a]+" "
		   }
		   
	   }
	   
   }
   
  alert(response_error)
  


document.getElementById("errors").style.color="red"
document.getElementById("errors").scrollIntoView()
  

  }
  //error
});





 
  
  
  
  }//submit function



function hide_elements(elem){
  
  if ($('#'+elem).length) {
	$('#'+elem).delay(300).fadeOut('slow', function () {
	  //$(this).remove();
	  document.getElementById(elem).style.display="none";
	  
	});
  }



  
  
};




function show_elements(elem,disp){
  
  // spinner 
  if ($('#'+elem).length) {
	$('#'+elem).delay(100).fadeIn('slow', function () {
	  //$(this).remove();
	  document.getElementById(elem).style.display=disp;
	  
	});
  }
 


  
  
};




function toggle_model(){
   
   document.getElementById("modelshow").click();
   
   
   
}





function get_user_email(){
  return localStorage.getItem("email");
  
}


function get_user_pin(){
  return localStorage.getItem("pin");
  
}




function get_admin_email(){
  return localStorage.getItem("email_admin");
  
}


function get_admin_pin(){
  return localStorage.getItem("pin_admin");
  
}








function recover_onload(){
  if(location.search.match(/recover=recover/)){
	  
	  document.getElementById("login_btn_user").click();
	  
	  setTimeout(function(){
		  document.getElementById("forgot_details_login_btn_user").click();
		  
	  },500);
	  
	  
  }
  
}





function take_text_form_submit(event){
  
  event.preventDefault();
  
  cat_of_edith_ques = document.getElementById("category_ques_edith").value;
  
  location = "exam.php?cat="+cat_of_edith_ques+"&e="+get_user_email+"&t="+get_user_pin;
   
  
}






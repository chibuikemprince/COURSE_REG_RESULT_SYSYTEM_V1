 
function logout(home){
	// var home = localStorage.getItem("type")!="admin"?"home/index.html":"home/admin_login.html";
	 var go = confirm("Do you want to logout of this page ?");
	if(go)
	{
	
	localStorage.setItem("adminemail","") 
	localStorage.setItem("lectureremail","")
	localStorage.setItem("studentemail","")
	location =home ;	
	}
	 
 }
 
 
 
 function delete_lecturer(id){
	 
	 var confirm_delete  = confirm("You are about to delete this lecturer, continue?");
	 
	 if(confirm_delete ){
		document.getElementById("table_row"+id).innerHTML+="<td style='color:red;'>Deleting...</td>";
	 $.ajax({
  type: "POST",
  url:baseUrl+"/admin/lecturers/delete",
  data: {
	  email:localStorage.getItem("adminemail"),
	  password:localStorage.getItem("adminpassword"),
	  id:id
	  
	  },
  dataType: "json",
  success: function (xhr) {
	  //table_row
	  
	  document.getElementById("table_row"+id).innerHTML="<td style='color:red;'>Deleted</td>";
	  setTimeout(function(){
		  
		  document.getElementById("table_row"+id).innerHTML="";
		 
if(document.getElementsByClassName("counter_table")){
	
		  for( var  counter_table_index = 0 ;counter_table_index < document.getElementsByClassName("counter_table").length;counter_table_index++)
		  {
			  document.getElementsByClassName("counter_table")[counter_table_index].innerHTML=counter_table_index+1;
			  
			  
		  }  
		  
		  
}
		 
		  
	  },1000);
	  
  },
 error: function (xhr, status, errorThrown) {
 alert("Delete action failed");
 
 
 
 
 }

	 })  
	 
	  
	 }
	 
	 
	 
 }
 
 function delete_student(id){
	 
	 var confirm_delete  = confirm("You are about to delete this student, continue?");
	 
	 if(confirm_delete ){
		document.getElementById("table_row"+id).innerHTML+="<td style='color:red;'>Deleting...</td>";
	 $.ajax({
  type: "POST",
  url:baseUrl+"/admin/students/delete",
  data: {
	  email:localStorage.getItem("adminemail"),
	  password:localStorage.getItem("adminpassword"),
	  id:id
	  
	  },
  dataType: "json",
  success: function (xhr) {
	  //table_row
	  
	  document.getElementById("table_row"+id).innerHTML="<td style='color:red;'>Deleted</td>";
	  setTimeout(function(){
		  
		  document.getElementById("table_row"+id).innerHTML="";
		  
		  
if(document.getElementsByClassName("counter_table")){
	
		  for( var  counter_table_index = 0 ;counter_table_index < document.getElementsByClassName("counter_table").length;counter_table_index++)
		  {
			  document.getElementsByClassName("counter_table")[counter_table_index].innerHTML=counter_table_index+1;
			  
			  
		  } 
		  
		  }  
		  
		  
		  
	  },1000);
	  
  },
 error: function (xhr, status, errorThrown) {
 alert("Delete action failed");
 
 
 
 
 }

	 })  
	 
	  
	 }
	 
	 
	 
 }
 
 function delete_course(id){
	 
	 var confirm_delete  = confirm("You are about to delete this course, continue?");
	 
	 if(confirm_delete ){
		document.getElementById("table_row"+id).innerHTML+="<td style='color:red;'>Deleting...</td>";
	 $.ajax({
  type: "POST",
  url:baseUrl+"/admin/courses/delete",
  data: {
	  email:localStorage.getItem("adminemail"),
	  password:localStorage.getItem("adminpassword"),
	  id:id
	  
	  },
  dataType: "json",
  success: function (xhr) {
	  //table_row
	  
	  document.getElementById("table_row"+id).innerHTML="<td style='color:red;'>Deleted</td>";
	  setTimeout(function(){
		  
		  document.getElementById("table_row"+id).innerHTML="";
		  
		  
if(document.getElementsByClassName("counter_table")){
		  for( var  counter_table_index = 0 ;counter_table_index < document.getElementsByClassName("counter_table").length;counter_table_index++)
		  {
			  document.getElementsByClassName("counter_table")[counter_table_index].innerHTML=counter_table_index+1;
			  
			  
		  }  
		  
		  }  
		  
		  
		  
	  },1000);
	  
  },
 error: function (xhr, status, errorThrown) {
 alert("Delete action failed");
 
 
 
 
 }

	 })  
	 
	  
	 }
	 
	 
	 
 }
 
 //
 
 function view_courses(){
	 document.getElementById('modelshow').click();
	 document.getElementById('model_body_div').innerHTML="Courses Loading .......";
	
  
	 $.ajax({
  type: "POST",
  url:baseUrl+"/admin/courses/view",
  data: {
	  email:localStorage.getItem("adminemail"),
	  password:localStorage.getItem("adminpassword")
	  
	  
	  },
  dataType: "json",
  success: function (xhr) {
	  
	  var response =   xhr;
 

     document.getElementById("model_body_div").innerHTML =  "<b>"+xhr.message+"</b>";

var tablecount=1;
	// console.log(response);
	 
if(response.hasOwnProperty("data")){
	console.log("data found");
var tableData = response.data;
//console.log(tableData);

var table = ' <table class="table">  <thead>  <tr> <th scope="col">#</th> <th scope="col">Title</th><th scope="col">Code</th> <th scope="col">Session</th> <th scope="col">Lecturer </th> <th scope="col">Department</th> <th scope="col">Level</th>  <th scope="col">Semester</th>  <th scope="col"></th>  </tr> </thead><tbody>';
tableData.forEach(myelement=>{
	
	table += '<tr  id="table_row'+myelement._id+'"> <th scope="row" class="counter_table"  i="'+myelement._id+'"    >'+tablecount+"</th>  <td>"+myelement.coursename+"</td>"+"<td>"+myelement.coursecode+"</td>"+"<td>"+myelement.session+"</td>"+"<td>"+myelement.lectureremail+"</td>"+"<td>"+myelement.dept+"</td>"+"<td>"+myelement.level+"</td>"+"<td>"+myelement.semester+"</td>"+"<td onclick=\"delete_course('"+myelement._id+"')\" style='color:red;'>X</td>";
       +"<td>"+myelement.semester+"</td>";
       
    
    
	
	tablecount = tablecount+1;
	
});

table +="</tbody></table>";

	 setTimeout(function(){document.getElementById("model_body_div").innerHTML = table},500);
}


  },
  error: function (xhr, status, errorThrown) {
	 
	   xhr.status;
	   response =  JSON.parse(xhr.responseText);



	 

if(response.hasOwnProperty("message")){
  var response_error =   response.message 
  document.getElementById("model_body_div").innerHTML =  "<b style='color:red'> "+response_error+"</b>";






} else{
	
	
	
  document.getElementById("model_body_div").innerHTML =  "<b style='color:red'> Error found, please try again. </b>";
  
  
}
	  
  }

	 




	 
  })
	 
	 
	  
	 
 }
 
 
 function view_lecturers(){
	 document.getElementById('modelshow').click();
	 document.getElementById('model_body_div').innerHTML="Lecturers Loading .......";
	
  
	 $.ajax({
  type: "POST",
  url:baseUrl+"/admin/lecturers/view",
  data: {
	  email:localStorage.getItem("adminemail"),
	  password:localStorage.getItem("adminpassword")
	  
	  
	  },
  dataType: "json",
  success: function (xhr) {
	  
	  var response =   xhr;
 

     document.getElementById("model_body_div").innerHTML =  "<b>"+xhr.message+"</b>";

var tablecount=1;
	// console.log(response);
	 
if(response.hasOwnProperty("data")){
	console.log("data found");
var tableData = response.data;
//console.log(tableData);

var table = ' <table class="table">  <thead>  <tr> <th scope="col">#</th> <th scope="col">Title</th><th scope="col">Surname</th> <th scope="col">Firstname</th> <th scope="col">Lastname </th> <th scope="col">Department</th> <th scope="col">Level</th> <th scope="col"></th>  </tr> </thead><tbody>';
tableData.forEach(myelement=>{
	
	table += '<tr  id="table_row'+myelement._id+'" > <th scope="row" class="counter_table" i="'+myelement._id+'"     >'+tablecount+"</th>  <td>"+myelement.title+"</td>"+"<td>"+myelement.surname+"</td>"+"<td>"+myelement.firstname+"</td>"+"<td>"+myelement.lastname+"</td>"+"<td>"+myelement.dept+"</td>"+"<td>"+myelement.level+"</td>"+"<td onclick=\"delete_lecturer('"+myelement._id+"')\" style='color:red;'>X</td>";
       
    
    
	
	tablecount = tablecount+1;
	
});

table +="</tbody></table>";

	 setTimeout(function(){document.getElementById("model_body_div").innerHTML = table},500);
}


  },
  error: function (xhr, status, errorThrown) {
	 
	   xhr.status;
	   response =  JSON.parse(xhr.responseText);

/* 
var rows =  response;
 var html = '<table>';
 html += '<tr>';
 for( var j in rows[0] ) {
  html += '<th>' + j + '</th>';
 }
 html += '</tr>';
 for( var i = 0; i < rows.length; i++) {
  html += '<tr>';
  for( var j in rows[i] ) {
    html += '<td>' + rows[i][j] + '</td>';
  }
  html += '</tr>';
 }
 html += '</table>';

 document.getElementById("model_body_div").innerHTML =  html; */

	 

if(response.hasOwnProperty("message")){
  var response_error =   response.message 
  document.getElementById("model_body_div").innerHTML =  "<b style='color:red'> "+response_error+"</b>";






} else{
	
	
	
  document.getElementById("model_body_div").innerHTML =  "<b style='color:red'> Error found, please try again. </b>";
  
  
}
	  
  }

	 




	 
  })
	 
	 
	  
	 
 }
 
 
 
 function view_students(){
	 document.getElementById('modelshow').click();
	 document.getElementById('model_body_div').innerHTML="Students Loading .......";
	
  
	 $.ajax({
  type: "POST",
  url:baseUrl+"/admin/students/view",
  data: {
	  email:localStorage.getItem("adminemail"),
	  password:localStorage.getItem("adminpassword")
	  
	  
	  },
  dataType: "json",
  success: function (xhr) {
	  
	  var response =   xhr;
 

     document.getElementById("model_body_div").innerHTML =  "<b>"+xhr.message+"</b>";

var tablecount=1;
	// console.log(response);
	 
if(response.hasOwnProperty("data")){
	console.log("data found");
var tableData = response.data;
//console.log(tableData);

var table = ' <table class="table">  <thead>  <tr> <th scope="col">#</th> <th scope="col">Surname</th> <th scope="col">Firstname</th> <th scope="col">Lastname </th> <th scope="col">Reg No</th> <th scope="col">Department</th> <th scope="col">Level</th>  <th scope="col"></th>  </tr> </thead><tbody>';
tableData.forEach(myelement=>{
	
	table += '<tr  id="table_row'+myelement._id+'"> <th scope="row" class="counter_table" i="'+myelement._id+'"   >'+tablecount+"</th>  <td>"+myelement.surname+"</td>"+"<td>"+myelement.firstname+"</td>"+"<td>"+myelement.lastname+"</td>"+"<td>"+myelement.regno+"</td>"+"<td>"+myelement.dept+"</td>"+"<td>"+myelement.level+"</td>"+"<td onclick=\"delete_student('"+myelement._id+"')\" style='color:red;'>X</td>";
       
    
	
	tablecount = tablecount+1;
	
});

table +="</tbody></table>";

	 setTimeout(function(){document.getElementById("model_body_div").innerHTML = table},500);
}


  },
  error: function (xhr, status, errorThrown) {
	 
	   xhr.status;
	   response =  JSON.parse(xhr.responseText);

/* 
var rows =  response;
 var html = '<table>';
 html += '<tr>';
 for( var j in rows[0] ) {
  html += '<th>' + j + '</th>';
 }
 html += '</tr>';
 for( var i = 0; i < rows.length; i++) {
  html += '<tr>';
  for( var j in rows[i] ) {
    html += '<td>' + rows[i][j] + '</td>';
  }
  html += '</tr>';
 }
 html += '</table>';

 document.getElementById("model_body_div").innerHTML =  html; */

	 

if(response.hasOwnProperty("message")){
  var response_error =   response.message 
  document.getElementById("model_body_div").innerHTML =  "<b style='color:red'> "+response_error+"</b>";






} else{
	
	
	
  document.getElementById("model_body_div").innerHTML =  "<b style='color:red'> Error found, please try again. </b>";
  
  
}
	  
  }

	 




	 
  })
	 
	 
	  
	 
 }
 
 
 
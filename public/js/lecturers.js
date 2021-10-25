 get_course()
 
 
 
 
 function get_course(){
	 
	 
		 	 $.ajax({
  type: "POST",
  url:baseUrl+"/lecturers/courses",
  data: {
	  email:localStorage.getItem("lectureremail"),
	  password:localStorage.getItem("lecturerpassword"),
	  
	  
	  },
  dataType: "json",
  success: function (xhr) {
	  localStorage.setItem("upload_type","result")
	  
	  //table_row
	  if(xhr.data){
		  xhr.data.forEach(function(elem){
			  elem.value = JSON.stringify({id:elem._id,code:elem.coursecode});
			 document.getElementById("selectcourses").innerHTML +="<option value='"+elem.value+"'>"+elem.coursecode+"</option>"; 
		  })
	  }
	  
	  if(xhr.name){
		document.getElementById("username_dashboard").innerHTML=xhr.name;  
	  }
	  
	   },
 error: function (xhr, status, errorThrown) {
 alert("Error occurred, please reload page and login");
 
 
 
 
 }

	 })  
	 
	  
	  
	 
	 
 }
  
 
 function view_students_by_course(){
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
	//console.log("data found");
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
 
 
 
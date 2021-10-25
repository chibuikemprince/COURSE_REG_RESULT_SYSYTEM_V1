//alert("good");

var start_year = 2018
var endyear = new Date().getFullYear();
endyear = endyear+1;
var sessionSelect = "";
var start_year_next = 0;

var selectedCourse = [];
var getIndex = 0;

function select_course(myjson,$this){
	/* getIndex = selectedCourse.indexOf(myjson); */
	getIndex =  selectedCourse.findIndex(x => x._id === myjson._id);
	//.indexOf(myjson);
	//console.log(getIndex);
	/* if(!$this.checked){ */
	if(getIndex>=0){
	//remove
selectedCourse.splice(getIndex,1)	
	}
	else{
		selectedCourse.push(myjson)
	}
	
	//console.log(selectedCourse)
	
}




while(start_year<endyear){
 
 start_year_next = start_year+1;
 
 sessionSelect +="<option value='"+start_year+"/"+start_year_next+"' >"+start_year+"/"+start_year_next+"</option>"
start_year++

}

 var getSessionselect = document.getElementsByClassName("sessionselect");

var getSessionselect_len = getSessionselect.length;

for(var a =0;a<getSessionselect_len;a++){
	document.getElementsByClassName("sessionselect")[a].innerHTML=sessionSelect;
	
}

document.getElementById("studentname").innerHTML = localStorage.getItem("name");
document.getElementById("deptname").innerHTML = localStorage.getItem("dept");
document.getElementById("regname").innerHTML = localStorage.getItem("regno");

/* 

Ch150maga2244@:::
Chis2244@ 

*/

/* dbc13fb0c8c0c25bd0ab0d3cffc74685 */

  
  function printElem()
{
    var mywindow = window.open('', 'PRINT', 'height=600,width=1500');

    mywindow.document.write('<html> <style>.table{width:100% !important;}  body, html {   margin: 0; padding: 0; background-image: url("home/images/logo.jpg");background-color: #cccccc;  height: 50px; background-position: center;  background-repeat: no-repeat;   background-size: cover; }' + document.getElementById("certificate_style").innerHTML  + '</style> <head><title></title>');
    mywindow.document.write('</head><body >');
     
    mywindow.document.write(document.querySelector("body > div.body-container-wrapper > div > div > div.file-upload-bar > div > div > ul > li:nth-child(1)").innerHTML+"<br/> <hr/> <br/>"+document.getElementById("jsondata_p").innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
   // mywindow.close();

    return true;
}

 
 function course_reg(){
	  setTimeout(function(){document.getElementById("jsondata_p").innerHTML = ""},500);
	
	 var data = {};
	 data.regno = localStorage.getItem("regno")
	 data.password = localStorage.getItem("studentpassword")
	  data.data = [...selectedCourse]
	 
	  
	 
	 if(selectedCourse.length<3){
		 alert("select a least 3 courses");
		 return;
	 }
		 
	 
	 
	 var go = confirm("You are a about to submit "+selectedCourse.length+" courses");
	 if(go){
		 true
	 }
	 else{
		 return true;
	 }
	 setTimeout(function(){document.getElementById("upload_title").innerHTML += "</br> <sub> submitting request, please wait. </sub>"},500);
	 
	 
		 	 $.ajax(
			 {
  type: "POST",
  url:baseUrl+"/students/coursereg",
  data:  data,
  dataType: "json",
  success: function (xhr) {
	  //localStorage.setItem("upload_type","result")
	var response = xhr;
//console.log(response);	 
	 	 
 selectedCourse = [];
	  setTimeout(function(){document.getElementById("upload_title").innerHTML = selectedCourse.length+" courses registered successfully. "},500);
	 setTimeout(function(){document.getElementById("jsondata_p").innerHTML = ""},500);
	
	  
	  
	  
	    
	   },
 error: function (xhr, status, errorThrown) {
 alert("Error occurred, please reload page and login");
 
 
 setTimeout(function(){document.getElementById("upload_title").innerHTML = "Course Registaration Form"},500);
	  
 
 }

	 })  
	 
	  
	  
	 
	 
 }
  
 
 function get_courses(){
	 setTimeout(function(){document.getElementById("upload_title").innerHTML = "Loading Course Registaration Form"},500);
	  setTimeout(function(){document.getElementById("jsondata_p").innerHTML = ""},500);
	
	 
		 	 $.ajax(
			 {
  type: "POST",
  url:baseUrl+"/students/course",
  data: {
	  regno:localStorage.getItem("regno"),
	  password:localStorage.getItem("studentpassword"),
	  session:document.getElementById("course_session").value,
	  semester:document.getElementById("course_semester").value,
	  carryover:document.getElementById("carryover").checked,
	  level:localStorage.getItem("level"),
	  dept:localStorage.getItem("dept")
	 
	  
	  },
  dataType: "json",
  success: function (xhr) {
	  //localStorage.setItem("upload_type","result")
	var response = xhr;
//console.log(response);	 
	 	 
if(response.hasOwnProperty("data")){
	
	//console.log("data found");
	var tablecount=1;
var tableData = response.data;
//console.log(tableData);

var table = ' <table class="table">  <thead>  <tr> <th scope="col">#</th>   <th scope="col"></th>  <th scope="col"> course name</th> <th scope="col">Code</th> <th scope="col"> session </th> <th scope="col"> semester </th>  <th scope="col"> Unit</th>  </tr> </thead><tbody>';
tableData.forEach(myelement=>{
	
	table += '<tr  id="table_row'+myelement._id+'"> <th scope="row" class="counter_table" i="'+myelement._id+'"   >'+tablecount+"</th>     <td  style='color:red;'> <input type='checkbox' onclick='select_course("+JSON.stringify(myelement)+",this)'/> </td>   <td>"+myelement.coursename+"</td>"+"<td>"+myelement.coursecode+"</td>"+"<td>"+myelement.session+"</td>"+"<td>"+myelement.semester+"</td>"+" "+"<td>"+myelement.unit+"</td>"+"  ";
       
    
	
	tablecount = tablecount+1;
	
});

table +="</tbody></table>";

if(response.data.length>0){
	setTimeout(function(){document.getElementById("upload_title").innerHTML = "Course Registaration Form"},500);
	 setTimeout(function(){document.getElementById("jsondata_p").innerHTML = table},500);
	 setTimeout(function(){document.getElementById("jsondata_p").innerHTML += " <br/> <button style='margin-left:50px;' id='reg_course' onclick='course_reg()'>Submit </button>"},500);
document.getElementById("jsondata_p").style.display="block";


}
else{
	setTimeout(function(){document.getElementById("upload_title").innerHTML = "Courses for this semester has not been uploaded yet. kindly check later"},500);
	 //setTimeout(function(){document.getElementById("jsondata_p").innerHTML = table},500);
}
	 
}
else{


if(response.hasOwnProperty("message")){
setTimeout(function(){document.getElementById("upload_title").innerHTML =  response.message },500);

}	

	
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
  
 
 function get_result(){
	  setTimeout(function(){document.getElementById("jsondata_p").innerHTML = ""},500);
	
	var data =  {
	  regno:localStorage.getItem("regno"),
	  password:localStorage.getItem("studentpassword"),
	  session:document.getElementById("result_session").value,
	  semester:document.getElementById("result_semester").value
	 
	  
	  }
		 	 $.ajax({
  type: "POST",
  url:baseUrl+"/students/result/get",
  data: data,
  dataType: "json",
  success: function (xhr) {
	  //localStorage.setItem("upload_type","result")
	  var totalGPA = 0;
	  var totalUnit = 0;
	  var cgpa = 0;
	 	 var response = xhr;
if(response.hasOwnProperty("data")){
	//console.log("data found");
	var tablecount=1;
var tableData = response.data;
//console.log(tableData);

var table = ' <table class="table">  <thead>  <tr> <th scope="col">#</th> <th scope="col"> Course Code</th> <th scope="col">CA</th> <th scope="col">Assignment</th> <th scope="col">Exam</th>  <th scope="col">Total</th> <th scope="col"> Session </th> <th scope="col"> Semester </th>  <th scope="col"> Unit</th>  <th scope="col">Grade Point </th> <th scope="col">Grade </th> </tr> </thead><tbody>';
tableData.forEach(myelement=>{
	totalGPA = Number(totalGPA)+Number(myelement.gp);
	totalUnit = Number(totalUnit)+Number(myelement.unit);
	table += '<tr  id="table_row'+myelement._id+'"> <th scope="row" class="counter_table" i="'+myelement._id+'"   >'+tablecount+"</th>  <td>"+myelement.coursecode+"</td> <td>"+myelement.ca_score+"</td> <td>"+myelement.assignment_score+"</td> <td>"+myelement.exam_score+"</td>"+"<td>"+myelement.total_score+"</td>"+"<td>"+myelement.session+"</td>"+"<td>"+myelement.semester+"</td>"+" "+"<td>"+myelement.unit+" </td> "+"<td>"+myelement.gp+" </td> "+"<td>"+myelement.grade+" </td> ";
       
    
	
	tablecount = tablecount+1;
	
});

table +="</tbody></table>";


if(response.data.length>0){
	setTimeout(function(){document.getElementById("upload_title").innerHTML = data.semester+" semester "+data.session+" sesssion result"},500);
	 setTimeout(function(){document.getElementById("jsondata_p").innerHTML = table},500);
	  setTimeout(function(){document.getElementById("jsondata_p").innerHTML += " <div style='margin-left:50px' ><br/>   Total GP: "+totalGPA+"</br/> Total Units: "+totalUnit+" <br/> CGPA "+parseFloat(totalGPA/totalUnit)+"</div>"},500);
	//  setTimeout(function(){document.getElementById("jsondata_p").innerHTML += " <div style='margin-left:50px' ><br/>   Total GPA: "+totalGPA+"</br/> Total Units: "+totalUnit+" <br/> CGPA "+parseFloat(totalGPA/totalUnit)+"</div>"},500);
 setTimeout(function(){document.getElementById("jsondata_p").innerHTML += " <br/> <button style='margin-left:50px;' id='result_print' onclick=\"printElem()\">Print </button>"},500);
document.getElementById("jsondata_p").style.display="block";

document.getElementById("jsondata_p").style.display="block";
//;


}
else{
	setTimeout(function(){document.getElementById("upload_title").innerHTML = " results not found for "+data.semester+" semester "+data.session+" session. "},500);
	 //setTimeout(function(){document.getElementById("jsondata_p").innerHTML = table},500);
}

	// setTimeout(function(){document.getElementById("model_body_div").innerHTML = table},500);
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
  
 
 function get_registeredCourses(){
	  setTimeout(function(){document.getElementById("jsondata_p").innerHTML = ""},500);
	
	 var data = {
	  regno:localStorage.getItem("regno"),
	  password:localStorage.getItem("studentpassword"),
	  session:document.getElementById("registeredcourse_session").value,
	  semester:document.getElementById("registeredcourse_semester").value
	 
	  
	  }
	  setTimeout(function(){document.getElementById("upload_title").innerHTML = "Loading Registered Courses"},500);
	
		 	 $.ajax({
  type: "POST",
  url:baseUrl+"/students/coursereg/get",
  data: data,
  dataType: "json",
  success: function (xhr) {
	  //localStorage.setItem("upload_type","result")
	  
	 	 	 var response = xhr;
if(response.hasOwnProperty("data")){
	
	//console.log("data found");
	var tablecount=1;
var tableData = response.data;
//console.log(tableData);

var table = ' <table class="table">  <thead>  <tr> <th scope="col">#</th> <th scope="col"> course name</th> <th scope="col">Code</th> <th scope="col"> session </th> <th scope="col"> semester </th>  <th scope="col"> Unit</th>    </tr> </thead><tbody>';
tableData.forEach(myelement=>{
	
	table += '<tr  id="table_row'+myelement._id+'"> <th scope="row" class="counter_table" i="'+myelement._id+'"   >'+tablecount+"</th>  <td>"+myelement.coursename+"</td>"+"<td>"+myelement.coursecode+"</td>"+"<td>"+myelement.session+"</td>"+"<td>"+myelement.semester+"</td>"+" "+"<td>"+myelement.unit+"</td>"+" ";
       
    
	
	tablecount = tablecount+1;
	
});

table +="</tbody></table>";

if(response.data.length>0){
	setTimeout(function(){document.getElementById("upload_title").innerHTML = "List of Registered Courses"},500);
	 setTimeout(function(){document.getElementById("jsondata_p").innerHTML = table},500);
	// setTimeout(function(){document.getElementById("jsondata_p").innerHTML += " <br/> <button style='margin-left:50px;' id='reg_course' onclick='course_reg()'>Submit </button>"},500);
document.getElementById("jsondata_p").style.display="block";


}
else{
	setTimeout(function(){document.getElementById("upload_title").innerHTML = " Course not found for "+data.semester+" semester "+data.session+" session. "},500);
	 //setTimeout(function(){document.getElementById("jsondata_p").innerHTML = table},500);
}
	 
}
else{


if(response.hasOwnProperty("message")){
setTimeout(function(){document.getElementById("upload_title").innerHTML =  response.message },500);

}	

	
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
  
 






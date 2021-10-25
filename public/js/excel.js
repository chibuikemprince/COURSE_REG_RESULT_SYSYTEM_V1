let selectedFile;
var outcome = "";
var stage = "first";
var baseUrl = "http://localhost:3000/v1";
var output_data={}
//console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
	 stage = "second";
	document.getElementById("selectedName").innerHTML="<b>File Name</b>:&nbsp &nbsp "+selectedFile["name"];
})

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]


//document.getElementById('modelshow').click();



document.getElementById('save').addEventListener("click", () => {
	  document.getElementById("jsondata_p").style.display="none";
	  
	  if(stage !="third"){
		alert("upload & preview before save");
		return;
	}
	  
     document.getElementById("selectedName").innerHTML =  " <br/> </br>Saving, Please wait ..........";
	 var requrl="/admin/students/upload";
	 output_data = {
	  email:localStorage.getItem("adminemail"),
	  password:localStorage.getItem("adminpassword"),
	  data:outcome
	  
	  }
	 
	 
	 switch(localStorage.getItem("upload_type")){
		 case "students":
		 requrl="/admin/students/upload"
		 break;
		  case "lecturers":
		 requrl="/admin/lecturers/upload"
		 break;
		  case "result":
		  
		  output_data = {
	  email:localStorage.getItem("lectureremail"),
	  password:localStorage.getItem("lecturerpassword"),
	  data:outcome,
	  id:JSON.parse( document.getElementById("selectcourses").value).id,
	  code:JSON.parse( document.getElementById("selectcourses").value).code
	  
	  
	  }
		 requrl="/lecturers/result/upload"
		 break;
		  case "courses":
		 requrl="/admin/courses/upload"
		 break;
		 default:
		 alert("error found, please refresh this page. ")
		 
	 }
	 
	  
	 
	 $.ajax({
  type: "POST",
  url:baseUrl+requrl,
  data:  output_data,
  dataType: "json",
  success: function (xhr) {
	  
	  var response =   xhr;
 

     document.getElementById("selectedName").innerHTML =  "<b>"+xhr.message+"</b>";


  },
  error: function (xhr, status, errorThrown) {
	 
	   xhr.status;
	   response =  JSON.parse(xhr.responseText);

	 
if(response.hasOwnProperty("message")){
  var response_error =   response.message 
  document.getElementById("selectedName").innerHTML =  "<b style='color:red'> "+response_error+"</b>";

} else{
	
	
	
  document.getElementById("selectedName").innerHTML =  "<b style='color:red'> Error found, please try again. </b>";
  
  
}
	  
  }

	 




	 
  })
	 
	 
	 
         
});
document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
	
	if(stage =="first"){
		alert("select a file to upload & preview");
		return;
	}
	
    if(selectedFile){
        let fileReader = new FileReader();
		
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
		 
         let workbook = XLSX.read(data,{type:"binary"});
		  
         stage = "third";
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                
			  outcome = JSON.stringify(rowObject);
			   
              document.getElementById("jsondata_p").style.display="block";
             // document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
			 
			 var rows = rowObject;
 var html = '<table>';
 html += '<tr>';
 for( var j in rows[0] ) {
  html += '&nbsp &nbsp<th>' + j + '&nbsp &nbsp</th>';
 }
 html += '</tr>';
 for( var i = 0; i < rows.length; i++) {
  html += '<tr>';
  for( var j in rows[i] ) {
    html += '&nbsp &nbsp<td>' + rows[i][j] + '&nbsp &nbsp</td>';
  }
  html += '</tr>';
 }
 html += '</table>';

document.getElementById("jsondata").innerHTML = html;
			  
			 
			 
			 
         });
        }
    }
});
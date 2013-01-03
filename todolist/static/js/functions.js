function addTask(parentID){
  
  var name = $("#taskinproject"+parentID).val();
  if(name === "")
  {
	alert("Please enter task name");
	return;
  }
  var form="#projectForm"+parentID;
  $.post($(form).attr("action"), $(form).serialize(), function(respond){ 

		parentID = respond['parentID'];
  		taskId = respond['id'];
		taskName = respond['name'];		
		newHtml = 		
		'<div style="background-color:grey; width:500px" class = "nav-header">	\
			<form id="taskFormEdit' + taskId + '" action="edittask/" actionDelete="deletetask/">		\
				<input type="hidden" name="taskID" value=' + taskId + '>	\
				<img src="/static/images/taskicon.png">			\
				<input id="task' + taskId + '" name="taskName" style="width:70%" value="' + taskName + '" disabled>\
				<span class="btn-group"> \
					<button class="btn-mini" id="task' + taskId + 'buttonS" type="button" onclick="editTask(' + taskId + ');" disabled><img src="/static/images/save.png" alt="Save"></button>					\
					<button class="btn-mini" id="task' + taskId + 'buttonE" type="button" onclick="enableEdit(\'task' + taskId + '\');"><img src="/static/images/edit.png" alt="Edit" ></button>\
					<button class="btn-mini" type="button" onclick="deleteTask(\'taskFormEdit' + taskId + '\');"><img src="/static/images/delete.png" alt="Delete"></button>				\
				</span>\
			</form>\
			</div>'
		$('#tasksForProject'+parentID).append(newHtml);


  });
}
  
  
function enableEdit(name){
	 $('#'+name).removeAttr("disabled");
	 $('#'+name + 'buttonS').removeAttr("disabled");
	 $('#'+name + 'buttonE').attr("disabled", true);
	
  }
  
function disableEdit(name){
	$('#'+ name).style.visibility = 'hidden';
  }
  
function editProject(id){
  var form="#projectFormEdit"+id;
  $.post($(form).attr("action"), $(form).serialize(), function(){  });
  $('#project'+id).attr("disabled", true);
  $('#project'+id + 'buttonS').attr("disabled", true);
  $('#project'+id + 'buttonE').removeAttr("disabled");  
}

function editTask(id){
  var form="#taskFormEdit"+id;
  $.post($(form).attr("action"), $(form).serialize(), function(){  });
  $('#task'+id).attr("disabled", true);
  $('#task'+id + 'buttonS').attr("disabled", true);
  $('#task'+id + 'buttonE').removeAttr("disabled");  
}

function addProject(){

  var name = $("#projectName").val();
  if(name === "")
  {
	alert("Please enter project name");
	return;
  }
  var form="#projectFormAdd";
  $.post($(form).attr("action"), $(form).serialize(), function(respond){
		
		projectId = respond['id'];
		projectName = respond['name'];
		
		newHtml = 
		'<span class="span6" id="projectSpan'+ projectId + '" style="margin-bottom:40px"> \
			<div class="nav-header" style="width:500px; background-color:#3a87ad; height:30px">				\
				<form id="projectFormEdit'+ projectId + '" action="editproject/" actionDelete="deleteproject/"> \
				<img src="/static/images/projecticon.png">\
				<input type="hidden" name="projectID" value='+ projectId + '>\
				<input class="input-medium" id="project'+ projectId + '" name="projectName" style="width:70%;  background-color:#3a87ad" value="'+ projectName + '" disabled>\
				<span class="btn-group"> \
					<button class="btn-mini" id="project'+ projectId + 'buttonS" type="button" onclick="editProject('+ projectId +');" disabled><img src="/static/images/save.png" alt="Save"></button>\
					<button class="btn-mini" id="project'+ projectId + 'buttonE" type="button" onclick="enableEdit(\'project' + projectId + '\');"><img src="/static/images/edit.png" alt="Edit" ></button>\
					<button class="btn-mini" type="button" onclick="deleteProject(\'' + projectId + '\');"><img src="/static/images/delete.png" alt="Delete"></button>\
				</span>				\
				</form>\
			</div>		\
			<div style="width:720px">\
				<form id="projectForm'+ projectId + '" action="addtask/">\
					<input type="hidden" name="parentID" value=' + projectId + '>\
					<img src="/static/images/greenplus.png">\
					<input type="text" class="span2" id="taskinproject' +projectId+ '" name="taskName" placeholder="Start typing here to create a task..." style="width:55%">\
					<button class="btn" type="button" onclick="addTask('+ projectId + ');">Add Task</button>\
				</form>\
			</div>\
			<span id="tasksForProject'+ projectId + '">\
			</span>\
			</span>';
		$('#projects').append(newHtml);
		
  });
}

function deleteTask(formName){
	var form="#"+formName;
	$.post($(form).attr("actionDelete"), $(form).serialize(), function(){ 
		$(form).remove();
	});	
}
function deleteProject(projectID){
	var form='#projectFormEdit' + projectID;
	$.post('deleteproject/', $(form).serialize(), function(){ 
		$('#projectSpan' + projectID).remove();
	});	
}
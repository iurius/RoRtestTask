function addTask(parentID){
  
  var name = $("#taskinproject"+parentID).val();
  if(name === "")
  {
	alert("Please enter task name");
	return;
  }
  var form="#projectForm"+parentID;
  $.post($(form).attr("action"), $(form).serialize(), function(respond){ 
		$("#taskinproject"+parentID).val("");
		parentID = respond['parentID'];
  		taskID = respond['id'];
		taskName = respond['name'];		
		newHtml = 		
		'<form id="taskFormEdit' + taskID + '" action="edittask/" actionDelete="deletetask/" style="background-color:white; height:50px; display:table-row">\
				<div style="display: table-cell; padding:10px; border-style: dotted; border-width: thin "><img src="/static/images/taskicon.png"></div>\
				<div id="task' + taskID + '" name="taskName" style="width:580px; display: table-cell; border-style: dotted; border-width: thin; padding:20px; font-weight: bold">' + taskName + '</div>\
				<div class="btn-group" style="display: table-cell; border-style: dotted; border-width: thin; padding:10px"> \
					<button class="btn" id="task' + taskID + 'buttonS" type="submit" onclick="editTask(' + taskID + ');" disabled><img src="/static/images/save.png" alt="Save"></button>	\
					<button class="btn" id="task ' + taskID + 'buttonE" type="button" onclick="enableEdit(\'task' + taskID + '\');"><img src="/static/images/edit.png" alt="Edit" ></button>\
					<button class="btn" type="button" onclick="deleteTask(' + taskID + ');"><img src="/static/images/delete.png" alt="Delete"></button>				\
				</div>\
			</form>'
		
		$('#tasksForProject'+parentID).append(newHtml);

  });
}
  
  
function enableEdit(name){
	 //$('#'+name).removeAttr("disabled");
	 $('#'+name).attr('contenteditable','true');
	 $('#'+name).css('background-color','#88C1FF');
	 $('#'+name + 'buttonS').removeAttr("disabled");
	 $('#'+name + 'buttonE').attr("disabled", true);
	
  }
  
function disableEdit(name){
	$('#'+ name).style.visibility = 'hidden';
  }
  
function editProject(id){
  var form="#projectFormEdit"+id;
  var projectName = $('#project'+id).text();
  $.post($(form).attr("action"), {'projectID':id, 'projectName':projectName}, function(){  });
  //$('#project'+id).attr("disabled", true);
  $('#project'+id).attr('contenteditable','false');
  $('#project'+id).css('background-color','transparent');
  $('#project'+id + 'buttonS').attr("disabled", true);
  $('#project'+id + 'buttonE').removeAttr("disabled");  
}

function editTask(id){
  var form="#taskFormEdit"+id;
  var taskName = $('#task'+id).text();
  $.post($(form).attr("action"),  {'taskID':id, 'taskName':taskName}, function(){  });
  //$('#task'+id).attr("disabled", true);
  $('#task'+id).attr('contenteditable','false');
  $('#task'+id).css('background-color','transparent');
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
		
		$("#projectName").val("");
		projectId = respond['id'];
		projectName = respond['name'];
		
		newHtml = 
		'<div id="projectSpan'+ projectId + '" align=left style="-webkit-border-bottom-right-radius: 20px;-webkit-border-bottom-left-radius: 20px;-moz-border-radius-bottomright: 20px;-moz-border-radius-bottomleft: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;overflow: hidden;margin-bottom:40px; background-color:#05F; width:800px">\
			<form id="projectFormEdit'+ projectId + '" action="editproject/" actionDelete="deleteproject/" style="margin:15px">\
			<div style="display:table-row">\
				<div style="display:table-cell; padding-right:20px"><img src="/static/images/projecticon.png"></div>				\
				<div id="project'+ projectId + '" name="projectName" style="display: table-cell; width:570px; color:white; font-size:16pt; font-weight: bold">'+ projectName + '</div>\
				<span class="btn-group" style="display: table-cell; padding-left:20px">\
					<button class="btn" id="project'+ projectId + 'buttonS" type="submit" onclick="editProject('+ projectId + ');" disabled><img src="/static/images/save.png" alt="Save"></button>\
					<button class="btn" id="project'+ projectId + 'buttonE" type="button" onclick="enableEdit(\'project'+ projectId + '\');"><img src="/static/images/edit.png" alt="Edit" ></button>\
					<button class="btn" type="button" onclick="deleteProject('+ projectId + ');"><img src="/static/images/delete.png" alt="Delete"></button>\
				</span>				\
			</div>\
			</form>\
			<div>\
				<form id="projectForm'+ projectId + '" action="addtask/" style="background-color:#BBB; margin:0">\
					<input type="hidden" name="parentID" value='+ projectId + '>\
					<img src="/static/images/greenplus.png" style="padding:15px">\
					<input type="text" class="span2" id="taskinproject'+ projectId + '" name="taskName" placeholder="Start typing here to create a task..."style="width:75%;margin-bottom: 0px;border-right-width: 0px;padding-right: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border-radius: 0px;"><button class="btn" type="submit" onclick="addTask('+ projectId + '); return false;" style="width:120px;padding-left: 0px;border-left-width: 0px; -webkit-border-top-left-radius: 0px; -moz-border-radius-top-left: 0px; border-top-left-radius: 0px; -webkit-border-bottom-left-radius: 0px; -moz-border-radius-bottom-left: 0px; border-bottom-left-radius: 0px;">Add Task</button>\
				</form>\
			</div>\
			<span id="tasksForProject'+ projectId + '">\
			</span>\
		</div>';		
		
		$('#projects').append(newHtml);
		
  });
}

function deleteTask(id){
	var form="#taskFormEdit"+id;
	$.post($(form).attr("actionDelete"), {'taskID':id}, function(){ 
		$(form).remove();
	});	
}
function deleteProject(projectID){
	var form='#projectFormEdit' + projectID;
	$.post('deleteproject/', {'projectID':projectID}, function(){ 
		$('#projectSpan' + projectID).remove();
	});	
}
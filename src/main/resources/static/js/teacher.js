/**
 * 
 */
function teacherPage() {
	page = 1;
	teacherInputTable();
	getTeacher(page);
	$('#insertButton').click(function() {
		insertTeacher();
	});
	$('#changeButton').click(function() {
		changeTeacher();
	});
}

function teacherInputTable() {

	$("#inputTable").empty();

	var inputTr = $("<tr></tr>");
	var blank = $("<td></td>");
	var name = $("<td></td>").html("name: <input type=\"text\" id=\"name\">");
	var birth = $("<td></td>")
			.html("birth: <input type=\"date\" id=\"birth\">");
	var subjectId = $("<td></td>").html(
			"subject id: <input type=\"text\" id=\"subjectId\">");
	var insertButton = $("<td></td>").html(
			"<button id=\"insertButton\">추가</button>");

	inputTr.append(blank);
	inputTr.append(name);
	inputTr.append(birth);
	inputTr.append(subjectId);
	inputTr.append(insertButton);
	$("#inputTable").append(inputTr);

	var changeTr = $("<tr></tr>");
	var id = $("<td></td>").html("id: <input type=\"text\" id=\"id\">");
	var reName = $("<td></td>").html(
			"name: <input type=\"text\" id=\"reName\">");
	var reBirth = $("<td></td>").html(
			"birth: <input type=\"date\" id=\"reBirth\">");
	var reSubjectId = $("<td></td>").html(
			"subject id: <input type=\"text\" id = \"reSubjectId\">");
	var insertButton = $("<td></td>").html(
			"<button id=\"changeButton\">변경</button>");

	changeTr.append(id);
	changeTr.append(reName);
	changeTr.append(reBirth);
	changeTr.append(reSubjectId);
	changeTr.append(insertButton);

	$("#inputTable").append(changeTr);
	
	$("#searchBox").empty();
}

function insertTeacher() {
	var name = $('#name');
	var birth = $('#birth');
	var subjectId = $('#subjectId');
	if (name.val().trim() == "" || birth.val().trim() == ""
			|| subjectId.val().trim() == "") {
		alert("값을 모두 입력해주세요.");
		return;
	}
	var insertData = JSON.stringify({
		"name" : name.val(),
		"birth" : birth.val(),
		"subjectId" : subjectId.val()
	});
	$.ajax({
		url : "/teacher",
		type : 'post',
		contentType:"application/json;charset=UTF-8",
		data : insertData,
		success : function() {
			name.val('');
			birth.val('');
			subjectId.val('');
			page = 1;
			getTeacher(page);
		},
		error : function() {
			alert("잘못된 접근입니다.");
		}
	});
}

function deleteTeacher(id) {
	$.ajax({
		url : "/teacher/" + id,
		type : 'delete',
		success : function() {
			if (page >= endPage && endPage != 1) {
				getTeacher(page - 1);
			} else {
				getTeacher(page);
			}
		}
	});
}

function changeTeacher() {
	var id = $('#id');
	var name = $('#reName');
	var birth = $('#reBirth');
	var subjectId = $("#reSubjectId");
	if (id.val().trim() == "" || name.val().trim() == ""
			|| birth.val().trim() == "" || subjectId.val().trim() == "") {
		alert("값을 모두 입력해주세요.");
		return;
	}
	console.log(subjectId.val());
	var changeData = JSON.stringify({
		"id" : id.val(),
		"name" : name.val(),
		"birth" : birth.val(),
		"subjectId" : subjectId.val()
	});
	$.ajax({
		url : "/teacher",
		type : 'put',
		contentType:"application/json;charset=UTF-8",
		data : changeData,
		success : function() {
			id.val('');
			name.val('');
			birth.val('');
			getTeacher(page);
		},
		error : function() {
			alert("잘못된 접근입니다.");
		}
	});
}

function getTeacher(nowPage) {
	page = nowPage;
	$.ajax({
		url : "/teacher/" + nowPage + "/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			var table = $('#table');
			table.children().remove();
			table.append(teacherTitle());
			for (i in data) {
				table.append(markUpTeacher(data[i]));
			}
			teacherPaging(nowPage);
		}
	});
}

function teacherTitle() {
	var tr = $("<tr></tr>");
	var thId = $("<th></th>").html("id");
	var thName = $("<th></th>").html("name");
	var thBirth = $("<th></th>").html("birth");
	var thSubjectId = $("<th></th>").html("subject id");
	tr.append(thId);
	tr.append(thName);
	tr.append(thBirth);
	tr.append(thSubjectId);
	return tr;
}

function markUpTeacher(data) {
	var tr = $("<tr></tr>");
	var tdId = $("<td></td>").html(data.id);
	var tdName = $("<td></td>").html(data.name);
	var tdBirth = $("<td></td>").html(data.birth);
	var tdSubjectId = $("<td></td>").html(data.subjectId);
	var tdButton = $("<td></td>");
	var button = $("<button></button>").html("삭제").click(function() {
		deleteTeacher(data.id);
	});
	tdButton.append(button);

	tr.append(tdId);
	tr.append(tdName);
	tr.append(tdBirth);
	tr.append(tdSubjectId);
	tr.append(tdButton);

	return tr;
}

function teacherPaging(nowPage) {
	$.ajax({
		url : "/teacher/endPage/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			makeTeacherPaging(data, nowPage);
		}
	});
}

function makeTeacherPaging(data, nowPage) {
	endPage = data;
	var div = $('#div')
	div.empty();
	for (var i = nowPage - 3; i < nowPage + 3; i++) {
		if (i < 1 || i > endPage) {
			continue;
		}
		var button = $("<button onclick=\"getTeacher(" + i + ")\"></button>")
				.html(i);
		div.append(button);
	}
}
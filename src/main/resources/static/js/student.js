/**
 * 
 */
function studentPage() {
	page = 1;
	studentInputTable();
	getStudent(page);
	$('#insertButton').click(function() {
		insertStudent();
	});
	$('#changeButton').click(function() {
		changeStudent();
	});
}

function studentInputTable() {

	$("#inputTable").empty();

	var inputTr = $("<tr></tr>");
	var blank = $("<td></td>");
	var name = $("<td></td>").html("name: <input type=\"text\" id=\"name\">");
	var birth = $("<td></td>")
			.html("birth: <input type=\"date\" id=\"birth\" pattern='[yyyy-dd-mm]'>");
	var insertButton = $("<td></td>").html(
			"<button id=\"insertButton\">추가</button>");

	inputTr.append(blank);
	inputTr.append(name);
	inputTr.append(birth);
	inputTr.append(insertButton);
	$("#inputTable").append(inputTr);

	var changeTr = $("<tr></tr>");
	var id = $("<td></td>").html("id: <input type=\"text\" id=\"id\">");
	var reName = $("<td></td>").html(
			"name: <input type=\"text\" id=\"reName\">");
	var reBirth = $("<td></td>").html(
			"birth: <input type=\"date\" id=\"reBirth\">");
	var insertButton = $("<td></td>").html(
			"<button id=\"changeButton\">변경</button>");

	changeTr.append(id);
	changeTr.append(reName);
	changeTr.append(reBirth);
	changeTr.append(insertButton);

	$("#inputTable").append(changeTr);
	
	$("#searchBox").empty();
}

function insertStudent() {
	var name = $('#name');
	var birth = $('#birth');
	if (name.val().trim() == "" || birth.val().trim() == "") {
		alert("값을 모두 입력해주세요.");
		return;
	}
	var insertData = JSON.stringify({
		"name" : name.val(),
		"birth" : birth.val()
	});
	$.ajax({
		url : "/student",
		type : 'post',
		contentType:"application/json;charset=UTF-8",
		data : insertData,
		success : function() {
			name.val('');
			birth.val('');
			page = 1;
			getStudent(page);
		},
		error : function() {
			alert("잘못된 접근입니다.");
		}
	});
}

function deleteStudent(id) {
	$.ajax({
		url : "/student/" + id,
		type : 'delete',
		success : function() {
			if (page >= endPage && endPage != 1) {
				getStudent(page - 1);
			} else {
				getStudent(page);
			}
		}
	});
}

function changeStudent() {
	var id = $('#id');
	var name = $('#reName');
	var birth = $('#reBirth');
	if (id.val().trim() == "" || name.val().trim() == "" || birth.val().trim() == "") {
		alert("값을 모두 입력해주세요.");
		return;
	}
	var changeData = JSON.stringify({
		"id" : id.val(),
		"name" : name.val(),
		"birth" : birth.val()
	});
	
	$.ajax({
		url : "/student",
		type : 'put',
		contentType:"application/json;charset=UTF-8",
		data : changeData,
		success : function() {
			id.val('');
			name.val('');
			birth.val('');
			getStudent(page);
		},
		error : function() {
			alert("잘못된 접근입니다.");
		}
	});
}

function getStudent(nowPage) {
	page = nowPage;
	$.ajax({
		url : "/student/" + nowPage + "/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			var table = $('#table');
			table.children().remove();
			table.append(studentTitle());
			for (i in data) {
				table.append(markUpStudent(data[i]));
			}
			studentPaging(nowPage);
		}
	});
}

function studentTitle() {
	var tr = $("<tr></tr>");
	var thId = $("<th></th>").html("id");
	var thName = $("<th></th>").html("name");
	var thBirth = $("<th></th>").html("birth");
	tr.append(thId);
	tr.append(thName);
	tr.append(thBirth);
	return tr;
}

function markUpStudent(data) {
	var tr = $("<tr></tr>");
	var tdId = $("<td></td>").html(data.id);
	var tdName = $("<td></td>").html(data.name);
	var tdBirth = $("<td></td>").html(data.birth);
	var tdButton = $("<td></td>");
	var button = $("<button></button>").html("삭제").click(function() {
		deleteStudent(data.id);
	});
	tdButton.append(button);

	tr.append(tdId);
	tr.append(tdName);
	tr.append(tdBirth);
	tr.append(tdButton);

	return tr;
}

function studentPaging(nowPage) {
	$.ajax({
		url : "/student/endPage/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			makeStudentPaging(data, nowPage);
		}
	});
}

function makeStudentPaging(data, nowPage) {
	endPage = data;
	var div = $('#div')
	div.empty();
	for (var i = nowPage - 3; i < nowPage + 3; i++) {
		if (i < 1 || i > endPage) {
			continue;
		}
		var button = $("<button onclick=\"getStudent(" + i + ")\"></button>")
				.html(i);
		div.append(button);
	}
}

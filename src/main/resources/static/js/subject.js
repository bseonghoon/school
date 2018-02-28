/**
 * 
 */
function subjectPage() {
	page = 1;
	subjectInputTable();
	getSubject(page);
	$('#insertButton').click(function() {
		insertSubject();
	});
	$('#changeButton').click(function() {
		changeSubject();
	});
}

function subjectInputTable() {

	$("#inputTable").empty();

	var inputTr = $("<tr></tr>");
	var blank = $("<td></td>");
	var name = $("<td></td>").html("name: <input type=\"text\" id=\"name\">");
	var insertButton = $("<td></td>").html(
			"<button id=\"insertButton\">추가</button>");

	inputTr.append(blank);
	inputTr.append(name);
	inputTr.append(insertButton);
	$("#inputTable").append(inputTr);

	var changeTr = $("<tr></tr>");
	var id = $("<td></td>").html("id: <input type=\"text\" id=\"id\">");
	var reName = $("<td></td>").html(
			"name: <input type=\"text\" id=\"reName\">");
	var insertButton = $("<td></td>").html(
			"<button id=\"changeButton\">변경</button>");

	changeTr.append(id);
	changeTr.append(reName);
	changeTr.append(insertButton);

	$("#inputTable").append(changeTr);
	
	$("#searchBox").empty();
}

function insertSubject() {
	var name = $('#name');
	if (name.val().trim() == "") {
	}
	var insertData = JSON.stringify({
		"subjectName" : name.val()
	});
	$.ajax({
		url : "/subject",
		type : 'post',
		contentType:"application/json;charset=UTF-8",
		data : insertData,
		success : function() {
			name.val('');
			page = 1;
			getSubject(page);
		},
		error : function() {
			alert("잘못된 접근입니다.");
		}
	});
}

function deleteSubject(subjectId) {
	$.ajax({
		url : "/subject/" + subjectId,
		type : 'delete',
		success : function() {
			if (page >= endPage && endPage != 1) {
				getSubject(page - 1);
			} else {
				getSubject(page);
			}
		}
	});
}

function changeSubject() {
	var id = $('#id');
	var name = $('#reName');
	if (id.val().trim() == "" || name.val().trim() == "") {
		alert("값을 모두 입력해주세요");
		return;
	}
	var changeData = JSON.stringify({
		"subjectId" : id.val(),
		"subjectName" : name.val()
	});
	$.ajax({
		url : "/subject",
		type : 'put',
		contentType:"application/json;charset=UTF-8",
		data : changeData,
		success : function() {
			console.log("abc");
			id.val('');
			name.val('');
			getSubject(page);
		},
		error : function() {
			alert("잘못된 접근입니다.");
		}
	});
}

function getSubject(nowPage) {
	page = nowPage;
	$.ajax({
		url : "/subject/" + nowPage + "/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			var table = $('#table');
			table.children().remove();
			table.append(subjectTitle());
			for (i in data) {
				table.append(markUpSubject(data[i]));
			}
			subjectPaging(nowPage);
		}
	});
}

function subjectTitle() {
	var tr = $("<tr></tr>");
	var thId = $("<th></th>").html("id");
	var thName = $("<th></th>").html("name");
	tr.append(thId);
	tr.append(thName);
	return tr;
}

function markUpSubject(data) {
	var tr = $("<tr></tr>");
	var tdId = $("<td></td>").html(data.subjectId);
	var tdName = $("<td></td>").html(data.subjectName);
	var tdButton = $("<td></td>");
	var button = $("<button></button>").html("삭제").click(function() {
		deleteSubject(data.subjectId);
	});
	tdButton.append(button);

	tr.append(tdId);
	tr.append(tdName);
	tr.append(tdButton);

	return tr;
}

function subjectPaging(nowPage) {
	$.ajax({
		url : "/subject/endPage/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			makeSubjectPaging(data, nowPage);
		}
	});
}

function makeSubjectPaging(data, nowPage) {
	endPage = data;
	var div = $('#div')
	div.empty();
	for (var i = nowPage - 3; i < nowPage + 3; i++) {
		if (i < 1 || i > endPage) {
			continue;
		}
		var button = $("<button onclick=\"getSubject(" + i + ")\"></button>")
				.html(i);
		div.append(button);
	}
}

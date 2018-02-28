/**
 * 
 */
function staffPage() {
	page = 1;
	staffInputTable();
	getStaff(page);
	$('#insertButton').click(function() {
		insertStaff();
	});
	$('#changeButton').click(function() {
		changeStaff();
	});
}

function staffInputTable() {

	$("#inputTable").empty();

	var inputTr = $("<tr></tr>");
	var blank = $("<td></td>");
	var name = $("<td></td>").html("name: <input type=\"text\" id=\"name\">");
	var birth = $("<td></td>")
			.html("birth: <input type=\"date\" id=\"birth\">");
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

function insertStaff() {
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
		url : "/staff",
		type : 'post',
		contentType:"application/json;charset=UTF-8",
		data : insertData,
		success : function() {
			name.val('');
			birth.val('');
			page = 1;
			getStaff(page);
		},
		error : function() {
			alert("잘못된 접근입니다.");
		}
	});
}

function deleteStaff(id) {
	$.ajax({
		url : "/staff/" + id,
		type : 'delete',
		success : function() {
			if (page >= endPage && endPage != 1) {
				getStaff(page - 1);
			} else {
				getStaff(page);
			}
		}
	});
}

function changeStaff() {
	var id = $('#id');
	var name = $('#reName');
	var birth = $('#reBirth');
	if (id.val().trim() == "" || name.val().trim() == "" || birth.val().trim() == "") {
		alert("값을 모두 입력해주세요");
		return;
	}
	var changeData = JSON.stringify({
		"id" : id.val(),
		"name" : name.val(),
		"birth" : birth.val()
	});
	$.ajax({
		url : "/staff",
		type : 'put',
		contentType:"application/json;charset=UTF-8",
		data : changeData,
		success : function() {
			console.log("abc");
			id.val('');
			name.val('');
			birth.val('');
			getStaff(page);
		},
		error : function() {
			alert("잘못된 접근입니다.");
		}
	});
}

function getStaff(nowPage) {
	page = nowPage;
	$.ajax({
		url : "/staff/" + nowPage + "/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			var table = $('#table');
			table.children().remove();
			table.append(staffTitle());
			for (i in data) {
				table.append(markUpStaff(data[i]));
			}
			staffPaging(nowPage);
		}
	});
}

function staffTitle() {
	var tr = $("<tr></tr>");
	var thId = $("<th></th>").html("id");
	var thName = $("<th></th>").html("name");
	var thBirth = $("<th></th>").html("birth");
	tr.append(thId);
	tr.append(thName);
	tr.append(thBirth);
	return tr;
}

function markUpStaff(data) {
	var tr = $("<tr></tr>");
	var tdId = $("<td></td>").html(data.id);
	var tdName = $("<td></td>").html(data.name);
	var tdBirth = $("<td></td>").html(data.birth);
	var tdButton = $("<td></td>");
	var button = $("<button></button>").html("삭제").click(function() {
		deleteStaff(data.id);
	});
	tdButton.append(button);

	tr.append(tdId);
	tr.append(tdName);
	tr.append(tdBirth);
	tr.append(tdButton);

	return tr;
}

function staffPaging(nowPage) {
	$.ajax({
		url : "/staff/endPage/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			makeStaffPaging(data, nowPage);
		}
	});
}

function makeStaffPaging(data, nowPage) {
	endPage = data;
	var div = $('#div')
	div.empty();
	for (var i = nowPage - 3; i < nowPage + 3; i++) {
		if (i < 1 || i > endPage) {
			continue;
		}
		var button = $("<button onclick=\"getStaff(" + i + ")\"></button>")
				.html(i);
		div.append(button);
	}
}

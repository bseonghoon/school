/**
 * 
 */
function scorePage() {
	page = 1;
	scoreInputTable();
	getScore(page);
	$('#insertButton').click(function() {
		insertScore();
	});
	$('#changeButton').click(function() {
		changeScore();
	});
}

/**
 * 기본 폼 생성
 * @returns
 */

function scoreInputTable() {

	$("#inputTable").empty();

	var inputTr = $("<tr></tr>");
	var studentId = $("<td></td>").html("student Id: <input type=\"text\" id=\"studentId\">");
	var subjectId = $("<td></td>").html("subject Id: <input type=\"text\" id=\"subjectId\">");
	var grade = $("<td></td>")
			.html("score: <input type=\"text\" id=\"grade\">");
	var insertButton = $("<td></td>").html(
			"<button id=\"insertButton\">추가</button>");

	inputTr.append(studentId);
	inputTr.append(subjectId);
	inputTr.append(grade);
	inputTr.append(insertButton);
	$("#inputTable").append(inputTr);

	var changeTr = $("<tr></tr>");
	var reStudentId = $("<td></td>").html("student id: <input type=\"text\" id=\"reStudentId\">");
	var reSubjectId = $("<td></td>").html(
			"subject Id: <input type=\"text\" id=\"reSubjectId\">");
	var reScore = $("<td></td>").html(
			"score: <input type=\"text\" id=\"reScore\">");
	var changeButton = $("<td></td>").html(
			"<button id=\"changeButton\">변경</button>");

	changeTr.append(reStudentId);
	changeTr.append(reSubjectId);
	changeTr.append(reScore);
	changeTr.append(changeButton);

	$("#inputTable").append(changeTr);
	
	$("#searchBox").empty();
	$("#searchBox").append(scoreSearchBox());
}

/**
 * 검색박스
 * @returns
 */

function scoreSearchBox(){
	var tr = $("<tr></tr>");
	var student = $("<td></td>").html("student id별 조회 <input type='text' id ='byStudentId'><button onclick='getStudentScore(1)'>조회</button>");
	var subject = $("<td></td>").html("subject Id별 조회 <input type='text' id ='bySubjectId'><button onclick='getSubjectScore(1)'>조회</button>");
	var averageName = $("<td id = 'averageName'></td>");
	var averageValue = $("<td id = 'averageValue'></td>");
	
	tr.append(student);
	tr.append(subject);
	tr.append(averageName);
	tr.append(averageValue);
	
	return tr;
}

/**
 * 성적정보 입력
 * @returns
 */
function insertScore() {
	var studentId = $('#studentId');
	var subjectId = $('#subjectId');
	var grade = $('#grade');
	console.log(grade.val());
	if (studentId.val().trim() == "" || subjectId.val().trim() == "" || grade.val().trim == "") {
		alert("값을 모두 입력해주세요.");
		return;
	}
	var insertData = JSON.stringify({
		"studentId" : studentId.val(),
		"subjectId" : subjectId.val(),
		"score" : grade.val()
	});
	$.ajax({
		url : "/score",
		type : 'post',
		contentType:"application/json;charset=UTF-8",
		data : insertData,
		success : function() {
			studentId.val('');
			subjectId.val('');
			grade.val('');
			page = 1;
			getScore(page);
		},
		error : function() {
			alert("잘못된 접근입니다.");
		}
	});
}

/**
 * 성적정보 삭제
 * @returns
 */
function deleteScore(studentId, subjectId) {
	$.ajax({
		url : "/score/" + studentId +"/" + subjectId,
		type : 'delete',
		success : function() {
			if (page >= endPage && endPage != 1) {
				getScore(page - 1);
			} else {
				getScore(page);
			}
		}
	});
}

/**
 * 성적정보 변경
 * @returns
 */
function changeScore() {
	var reStudentId = $('#reStudentId');
	var reSubjectId = $('#reSubjectId');
	var reScore = $('#reScore');
	if (reStudentId.val().trim() == "" || reSubjectId.val().trim() == "" || reScore.val().trim() == "") {
		alert("값을 모두 입력해주세요");
		return;
	}
	var changeData = JSON.stringify({
		"studentId" : reStudentId.val(),
		"subjectId" : reSubjectId.val(),
		"score" : reScore.val()
	});
	$.ajax({
		url : "/score",
		type : 'put',
		contentType:"application/json;charset=UTF-8",
		data : changeData,
		success : function() {
			reStudentId.val('');
			reSubjectId.val('');
			reScore.val('');
			getScore(page);
		},
		error : function() {
			alert("잘못된 접근입니다.");
		}
	});
}

/**
 * 전체 성적 정보
 * @param nowPage 현재 페이지
 * @returns
 */
function getScore(nowPage) {
	page = nowPage;
	$.ajax({
		url : "/score/" + nowPage + "/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			var table = $('#table');
			table.children().remove();
			table.append(scoreTitle());
			getAllAverage();
			for (i in data) {
				table.append(markUpScore(data[i]));
			}
			scorePaging(nowPage);
		}
	});
}
/**
 * 전체학생 페이징
 * @param nowPage 현재 페이지
 * @returns
 */
function scorePaging(nowPage) {
	$.ajax({
		url : "/score/endPage/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			makeScorePaging(data, nowPage);
		}
	});
}
/**
 * 전체학생 페이징 draw
 * @param data 마지막 페이지
 * @param nowPage 현재 페이지
 * @returns
 */
function makeScorePaging(data, nowPage) {
	endPage = data;
	var div = $('#div')
	div.empty();
	for (var i = nowPage - 3; i < nowPage + 3; i++) {
		if (i < 1 || i > endPage) {
			continue;
		}
		var button = $("<button onclick=\"getScore(" + i + ")\"></button>")
				.html(i);
		div.append(button);
	}
}
/**
 * 전체 학생 평균
 * @returns
 */
function getAllAverage(){
	$.ajax({
		url: "/score/average/all",
		dataType : "json",
		type : "get",
		success : function(data){
			$("#averageName").html();
			$("#averageValue").html("전체평균 :" + data);
		}
	});
}

/**
 * 출력정보 제목
 * @returns
 */
function scoreTitle() {
	var tr = $("<tr></tr>");
	var thStudentId = $("<th></th>").html("student id");
	var thSubjectId = $("<th></th>").html("subject id");
	var thScore = $("<th></th>").html("score");
	tr.append(thStudentId);
	tr.append(thSubjectId);
	tr.append(thScore);
	return tr;
}

/**
 * 학생별 점수정보
 * @param nowPage 현재 페이지
 * @returns
 */
function getStudentScore(nowPage){
	page = nowPage;
	console.log(page);
	var studentId = $("#byStudentId");
	if(studentId.val().trim() == ""){
		alert("학생 ID를 입력하세요");
		return;
	}
	
	$.ajax({
		url : "/score/student/" + studentId.val() + "/" + nowPage + "/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			var table = $('#table');
			table.children().remove();
			table.append(scoreTitle());
			getStudentAverage(studentId.val());
			for (i in data) {
				table.append(markUpScore(data[i]));
			}
			scoreStudentPaging(nowPage, studentId.val());
		}
	});
}

/**
 * 학생별 평균
 * @param studentId 학생 ID
 * @returns
 */
function getStudentAverage(studentId){
	$.ajax({
		url: "/score/average/student/" + studentId,
		dataType : "json",
		type : "get",
		success : function(data){
			$("#averageName").html();
			$("#averageValue").html("학생의 평균 :" + data);
		}
	});
}

/**
 * 학생별 정보 페이징
 * @param nowPage 현재 페이지
 * @param studentId 학생 ID
 * @returns
 */
function scoreStudentPaging(nowPage, studentId){
	$.ajax({
		url : "/score/student/endPage/"+ studentId + "/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			makeStudentScorePaging(data, nowPage);
		}
	});
}

/**
 * 학생별정보 페이징 draw
 * @param data 마지막 페이지 번호
 * @param nowPage 현재 페이지
 * @returns
 */
function makeStudentScorePaging(data, nowPage) {
	endPage = data;
	var div = $('#div')
	div.empty();
	for (var i = nowPage - 3; i < nowPage + 3; i++) {
		if (i < 1 || i > endPage) {
			continue;
		}
		var button = $("<button onclick=\"getStudentScore(" + i + ")\"></button>")
				.html(i);
		div.append(button);
	}
}

/**
 * 과목별 점수
 * @param nowPage 현재 페이지
 * @returns
 */
function getSubjectScore(nowPage){
	page = nowPage;
	var subjectId = $("#bySubjectId");
	if(subjectId.val().trim() == ""){
		alert("과목 ID를 입력하세요");
		return;
	}
	$.ajax({
		url : "/score/subject/" + subjectId.val() + "/" + nowPage + "/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			var table = $('#table');
			table.children().remove();
			table.append(scoreTitle());
			getSubjectAverage(subjectId.val());
			for (i in data) {
				table.append(markUpScore(data[i]));
			}
			scoreSubjectPaging(nowPage, subjectId.val());
		}
	});
}

/**
 * 과목별 평균
 * @param subjectId 과목 id
 * @returns
 */
function getSubjectAverage(subjectId){
	$.ajax({
		url: "/score/average/subject/" + subjectId,
		dataType : "json",
		type : "get",
		success : function(data){
			$("#averageName").html();
			$("#averageValue").html("과목의 평균 :" + data);
		}
	});
}

/**
 * 과목별 정보 페이징
 * @param nowPage 현재 페이지
 * @param subjectId 과목 id
 * @returns
 */
function scoreSubjectPaging(nowPage, subjectId){
	$.ajax({
		url : "/score/subject/endPage/"+ subjectId + "/" + count,
		dataType : "json",
		type : 'get',
		success : function(data) {
			makeSubjectScorePaging(data, nowPage);
		}
	});
}

/**
 * 과목별 페이징 draw
 * @param data 마지막 페이지 번호
 * @param nowPage 현재 페이지
 * @returns
 */
function makeSubjectScorePaging(data, nowPage) {
	endPage = data;
	var div = $('#div')
	div.empty();
	for (var i = nowPage - 3; i < nowPage + 3; i++) {
		if (i < 1 || i > endPage) {
			continue;
		}
		var button = $("<button onclick=\"getSubjectScore(" + i + ")\"></button>")
				.html(i);
		div.append(button);
	}
}

/**
 * 가져온 정보 출력
 * @param data 점수정보
 * @returns
 */
function markUpScore(data) {
	var tr = $("<tr></tr>");
	var tdStudentId = $("<td></td>").html(data.studentId);
	var tdSubjectId = $("<td></td>").html(data.subjectId);
	var tdScore = $("<td></td>").html(data.score);
	var tdButton = $("<td></td>");
	var button = $("<button></button>").html("삭제").click(function() {
		deleteScore(data.studentId, data.subjectId);
	});
	tdButton.append(button);

	tr.append(tdStudentId);
	tr.append(tdSubjectId);
	tr.append(tdScore);
	tr.append(tdButton);

	return tr;
}


<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="/js/student.js"></script>
<script type="text/javascript" src="/js/staff.js"></script>
<script type="text/javascript" src="/js/teacher.js"></script>
<script type="text/javascript" src="/js/subject.js"></script>
<script type="text/javascript" src="/js/score.js"></script>


<title>Insert title here</title>
<style>
.info_table {
	width: 800px;
	text-align: center;
	table-layout:fixed;
}
.info_div{
    height:500px
}
</style>
</head>
<body>
	<!-- 동기 -->
	<div style='text-align: center'>
		<button id="student">학생</button>
		<button id="staff">교직원</button>
		<button id="teacher">선생님</button>
		<button id="subject">과목</button>
		<button id="score">성적</button>
	</div>
	<br />
	<br />
	<div>
		<table id="inputTable" style="margin-left: auto; margin-right: auto;">

		</table>
	</div>
	<div>
	   <table id="searchBox" style="margin-left: auto; margin-right: auto;">
	   
	   </table>
	</div>
	<div class='info_div'>
		<table id="table" class='info_table'
			style="margin-left: auto; margin-right: auto;">
			<tfoot>
				<tr id="tfootTr">
				
				</tr>
			</tfoot>
		</table>
	</div>
	<div id="div" style='text-align: center'>
	
	</div>
	<script>
		var page = 1;
		var endPage = 1;
        var count = 10;
		
		$(document).ready(function() {			
			$('#student').click(function() {
				studentPage();
			});
			$('#staff').click(function() {
				staffPage();
			});
			$('#teacher').click(function() {
				teacherPage();
			});
			$('#subject').click(function() {
				subjectPage();
			});
			$('#score').click(function() {
				scorePage();
			});
		});
	</script>
</body>
</html>
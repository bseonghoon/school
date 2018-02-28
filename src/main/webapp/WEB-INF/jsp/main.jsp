<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<a href="/school">학사 관리페이지로 이동</a><br/>

feature list: <br/>
/student (post) : 학생정보 입력 <br/>
/student (put) : 학생정보 업데이트<br/>
/student/{id} (delete) : 학생정보 삭제<br/>
/student/{page}/{count} (get) : 한페이지당 count개로 나누었을 때 page 번째 페이지의 학생정보<br/>
/student/endPage/{count} (get): 한페이지당 count개로 나누었을 때 학생의 전체 페이지 개수<br/>
<br/>
/staff (post) : 교직원정보 입력<br/>
/staff (put) : 교직원정보 업데이트<br/>
/staff/{id} (delete) : 교직원정보 삭제<br/>
/staff/{page}/{count} (get) : 한페이지당 count개로 나누었을 때 page 번째 페이지의 교직원정보<br/>
/staff/endPage/{count} (get): 한페이지당 count개로 나누었을 때 교직원의 전체 페이지 개수<br/>
<br/>
/teacher (post) : 선생님정보 입력<br/>
/teacher (put) : 선생님정보 업데이트<br/>
/teacher/{id} (delete) : 선생님정보 삭제<br/>
/teacher/{page}/{count} (get) : 한페이지당 count개로 나누었을 때 page 번째 페이지의 선생님정보<br/>
/teacher/endPage/{count} (get): 한페이지당 count개로 나누었을 때 선생님의 전체 페이지 개수<br/>
<br/>
/subject (post) : 과목정보 입력<br/>
/subject (put) : 과목정보 업데이트<br/>
/subject/{id} (delete) : 과목정보 삭제<br/>
/subject/{page}/{count} (get) : 한페이지당 count개로 나누었을 때 page 번째 페이지의 과목정보<br/>
/subject/endPage/{count} (get): 한페이지당 count개로 나누었을 때 과목 전체 페이지 개수<br/>
<br/>
/score (post) : 성적정보 입력<br/>
/score (put) : 성적정보 업데이트<br/>
/score/{studentId}/{subjectId} (delete) : 성적정보 삭제<br/>
/score/{page}/{count} (get) : 한페이지당 count개로 나누었을 때 page 번째 페이지의 성적정보<br/>
/score/endPage/{count} (get): 한페이지당 count개로 나누었을 때 성적 전체 페이지 개수<br/>
/score/average/all (get): 전체 평균 조회<br/>
/score/average/student/{studentId} : studentId의 평균 조회<br/>
/score/average/subject/{subjectId} : subjectId의 평균 조회<br/>
/score/student/{studentId}/{page}/{count} : studentId의 한페이지당 count개로 나누었을 때 page 번째 페이지의 성적정보<br/>
/score/student/endPage/{studentId}/{count} : studentId의 한페이지당 count개로 나누었을 때 성적 전체 페이지 개수<br/>
/score/subject/{subjectId}/{page}/{count} : subjectId의 한페이지당 count개로 나누었을 때 page 번째 페이지의 성적정보<br/>
/score/subject/endPage/{subjectId}/{count} : subjectId의 한페이지당 count개로 나누었을 때 성적 전체 페이지 개수<br/>
<br/><br/><br/><br/>




port number : 9106<br/>
ip number : 10.67.9.29<br/>
git : https://gitlab.com/nhn_tech/2018_1st_intern/tree/spring_배성훈
<br/>
<br/>
모든 요청은 ajax로 이루어져 한페이지에서 모든 것을 처리한다.<br/>
페이징 또한 모든 항목에서 가능하며 성적의 경우 학생별, 과목별 정보에서도 페이징이 가능하다.<br/>
foreign key를 설정 해 놓았기 때문에 다른곳에서 사용하고 있는 정보는 삭제 할 수 없다. (예: 과목번호 2가 있을 때 어떤 학생이 2번과목의 성적이 있는 경우)<br/>
</body>
</html>
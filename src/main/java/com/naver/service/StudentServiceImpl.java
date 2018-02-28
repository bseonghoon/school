package com.naver.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.naver.dao.StudentDao;
import com.naver.vo.Student;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentDao studentDao;

    /**
     * 학생 정보 입력
     */
    @Override
    public void insertStudentInfo(Student student) {
        studentDao.insertStudent(student);
    }

    /**
     * 학생 정보 변경
     */
    @Override
    public void changeStudentInfo(Student student) {
        studentDao.changeStudent(student);
    }

    /**
     * 학생 정보 삭제
     */
    @Override
    public void removeStudentInfo(int id) {
        studentDao.deleteStudent(id);
    }

    /**
     * 학생정보 조회
     */
    @Override
    public List<Student> scanStudentInfo(int page, int count) {
        if (page < 1) {
            page = 1;
        }
        int offset = count * (page - 1);

        Map<String, Integer> pagingMap = new HashMap<>();
        pagingMap.put("offset", offset);
        pagingMap.put("count", count);

        List<Student> studentList = studentDao.getStudent(pagingMap);
        return studentList;
    }

    @Override
    public int scanEndPage(int count) {
        int studentCount = studentDao.getCount();
        int endPage;
        if (studentCount % count == 0) {
            endPage = studentCount / count;
        } else {
            endPage = studentCount / count + 1;
        }
        return endPage;
    }
}

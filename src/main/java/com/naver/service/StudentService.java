package com.naver.service;

import java.util.List;

import com.naver.vo.Student;

public interface StudentService {
    void insertStudentInfo(Student student);

    void changeStudentInfo(Student student);

    void removeStudentInfo(int id);

    List<Student> scanStudentInfo(int page, int count);

    int scanEndPage(int count);
}

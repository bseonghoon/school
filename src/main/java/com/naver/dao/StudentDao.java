package com.naver.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.naver.vo.Student;

@Repository
public interface StudentDao {
    void insertStudent(Student student);

    List<Student> getStudent(Map<String, Integer> pagingMap);

    void deleteStudent(int id);

    void changeStudent(Student student);

    int getCount();
}

package com.naver.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.naver.vo.Teacher;

@Repository
public interface TeacherDao {
    void insertTeacher(Teacher teacher);

    List<Teacher> getTeacher(Map<String, Integer> pagingMap);

    void deleteTeacher(int id);

    void changeTeacher(Map<String,Object> params);

    int getCount();
}

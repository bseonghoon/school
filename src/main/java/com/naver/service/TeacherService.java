package com.naver.service;

import java.util.List;

import com.naver.vo.Teacher;

public interface TeacherService {
    void insertTeacherInfo(Teacher teacher);

    void changeTeacherInfo(Teacher teacher);

    void removeTeacherInfo(int id);

    List<Teacher> scanTeacherInfo(int page, int count);

    int scanEndPage(int count);
}

package com.naver.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.naver.vo.Subject;

@Repository
public interface SubjectDao {
    void insertSubject(Subject subject);

    List<Subject> getSubject(Map<String, Integer> pagingMap);

    void deleteSubject(int subjectId);

    void changeSubject(Subject subject);

    int getCount();
}

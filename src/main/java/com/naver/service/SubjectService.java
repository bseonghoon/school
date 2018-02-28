package com.naver.service;

import java.util.List;

import com.naver.vo.Subject;

public interface SubjectService {
    void insertSubjectInfo(Subject subject);

    void changeSubjectInfo(Subject subject);

    void removeSubjectInfo(int subjectId);

    List<Subject> scanSubjectInfo(int page, int count);

    int scanEndPage(int count);
}

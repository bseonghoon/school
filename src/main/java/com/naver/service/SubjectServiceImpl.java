package com.naver.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.naver.dao.SubjectDao;
import com.naver.vo.Subject;

@Service
public class SubjectServiceImpl implements SubjectService {

    @Autowired
    private SubjectDao subjectDao;

    /**
     * 학생 정보 입력
     */
    @Override
    public void insertSubjectInfo(Subject subject) {
        subjectDao.insertSubject(subject);
    }

    /**
     * 학생 정보 변경
     */
    @Override
    public void changeSubjectInfo(Subject subject) {
        subjectDao.changeSubject(subject);
    }

    /**
     * 학생 정보 삭제
     */
    @Override
    public void removeSubjectInfo(int subjectId) {
        subjectDao.deleteSubject(subjectId);
    }

    /**
     * 학생정보 조회
     */
    @Override
    public List<Subject> scanSubjectInfo(int page, int count) {
        if (page < 1) {
            page = 1;
        }
        int offset = count * (page - 1);

        Map<String, Integer> pagingMap = new HashMap<>();
        pagingMap.put("offset", offset);
        pagingMap.put("count", count);

        List<Subject> subjectList = subjectDao.getSubject(pagingMap);
        return subjectList;
    }

    @Override
    public int scanEndPage(int count) {
        int subjectCount = subjectDao.getCount();
        int endPage;
        if (subjectCount % count == 0) {
            endPage = subjectCount / count;
        } else {
            endPage = subjectCount / count + 1;
        }
        return endPage;
    }
}

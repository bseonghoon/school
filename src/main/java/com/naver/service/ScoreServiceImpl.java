package com.naver.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.naver.dao.ScoreDao;
import com.naver.vo.Score;

@Service
public class ScoreServiceImpl implements ScoreService {

    @Autowired
    private ScoreDao scoreDao;

    /**
     * 학생 정보 입력
     */
    @Override
    public void insertScoreInfo(Score score) {
        scoreDao.insertScore(score);
    }

    /**
     * 학생 정보 변경
     */
    @Override
    public void changeScoreInfo(Score score) {
        scoreDao.changeScore(score);
    }

    /**
     * 학생 정보 삭제
     */
    @Override
    public void removeScoreInfo(int studentId, int subjectId) {
        Map<String, Integer> params = new HashMap<>();
        params.put("studentId", studentId);
        params.put("subjectId", subjectId);

        scoreDao.deleteScore(params);
    }

    /**
     * 학생정보 조회
     */
    @Override
    public List<Score> scanScoreInfo(int page, int count) {
        if (page < 1) {
            page = 1;
        }
        int offset = count * (page - 1);

        Map<String, Integer> pagingMap = new HashMap<>();
        pagingMap.put("offset", offset);
        pagingMap.put("count", count);

        List<Score> scoreList = scoreDao.getScore(pagingMap);
        return scoreList;
    }

    @Override
    public int scanEndPage(int count) {
        int scoreCount = scoreDao.getCount();
        int endPage;
        if (scoreCount % count == 0) {
            endPage = scoreCount / count;
        } else {
            endPage = scoreCount / count + 1;
        }
        return endPage;
    }

    @Override
    public String getAverage() {
        return scoreDao.getAverage();
    }

    @Override
    public String getStudentAverage(int studentId) {
        return scoreDao.getStudentAverage(studentId);
    }

    @Override
    public String getSubjectAverage(int subjectId) {
        return scoreDao.getSubjectAverage(subjectId);
    }

    @Override
    public List<Score> scanStudentScoreInfo(int studentId, int page, int count) {
        if (page < 1) {
            page = 1;
        }
        int offset = count * (page - 1);

        Map<String, Integer> pagingMap = new HashMap<>();
        pagingMap.put("offset", offset);
        pagingMap.put("count", count);
        pagingMap.put("studentId", studentId);

        return scoreDao.scanStudentScoreInfo(pagingMap);
    }

    @Override
    public int getStudentCount(int studentId, int count) {

        int scoreCount = scoreDao.getStudentCount(studentId);
        int endPage;
        if (scoreCount % count == 0) {
            endPage = scoreCount / count;
        } else {
            endPage = scoreCount / count + 1;
        }
        return endPage;
    }

    @Override
    public List<Score> scanSubjectScoreInfo(int subjectId, int page, int count) {
        if (page < 1) {
            page = 1;
        }
        int offset = count * (page - 1);

        Map<String, Integer> pagingMap = new HashMap<>();
        pagingMap.put("offset", offset);
        pagingMap.put("count", count);
        pagingMap.put("subjectId", subjectId);

        return scoreDao.scanSubjectScoreInfo(pagingMap);
    }

    @Override
    public int getSubjectCount(int subjectId, int count) {
        int scoreCount = scoreDao.getSubjectCount(subjectId);
        int endPage;
        if (scoreCount % count == 0) {
            endPage = scoreCount / count;
        } else {
            endPage = scoreCount / count + 1;
        }
        return endPage;
    }
}

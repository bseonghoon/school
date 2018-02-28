package com.naver.service;

import java.util.List;

import com.naver.vo.Score;

public interface ScoreService {
    void insertScoreInfo(Score score);

    void changeScoreInfo(Score score);

    void removeScoreInfo(int studentId, int subjectId);

    List<Score> scanScoreInfo(int page, int count);

    int scanEndPage(int count);

    String getAverage();

    String getStudentAverage(int studentId);

    String getSubjectAverage(int subjectId);

    List<Score> scanStudentScoreInfo(int studentId, int page, int count);

    int getStudentCount(int studentId,int count);

    List<Score> scanSubjectScoreInfo(int subjectId, int page, int count);

    int getSubjectCount(int subjectId, int count);
}

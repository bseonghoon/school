package com.naver.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.naver.vo.Score;

@Repository
public interface ScoreDao {
    void insertScore(Score score);

    List<Score> getScore(Map<String, Integer> pagingMap);

    void deleteScore(Map<String, Integer> params);

    void changeScore(Score score);

    int getCount();

    String getAverage();

    String getStudentAverage(int studentId);

    String getSubjectAverage(int subjectId);

    List<Score> scanStudentScoreInfo(Map<String,Integer> pagingMap);

    int getStudentCount(int studentId);

    List<Score> scanSubjectScoreInfo(Map<String,Integer> pagingMap);

    int getSubjectCount(int subjectId);
}

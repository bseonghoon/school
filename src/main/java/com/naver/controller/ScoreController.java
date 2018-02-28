package com.naver.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.naver.service.ScoreService;
import com.naver.vo.Score;

@RestController
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    /**
     * 교직원정보 입력
     */
    @PostMapping("/score")
    public void input(@RequestBody @Valid Score score, BindingResult result) {
        scoreService.insertScoreInfo(score);
    }

    /**
     * 교직원정보 업데이트
     */
    @PutMapping("/score")
    public void change(@RequestBody @Valid Score score, BindingResult result) {
        scoreService.changeScoreInfo(score);
    }

    /**
     * id를 통한 삭제
     */
    @DeleteMapping("/score/{studentId}/{subjectId}")
    public void delete(Model model, @PathVariable int studentId, @PathVariable int subjectId) {
        scoreService.removeScoreInfo(studentId, subjectId);
    }

    /**
     * 교직원 정보 조회
     * @param page 호출할 페이지
     * @param count 페이지당 row 수
     * @return 학생정보
     */
    @GetMapping("/score/{page}/{count}")
    public List<Score> scan(@PathVariable int page, @PathVariable int count) {
        List<Score> scoreList = scoreService.scanScoreInfo(page, count);
        return scoreList;
    }

    /**
     * 전체 페이지 개수 조회
     * @param count 한페이지당 row 수
     * @return 전체 패이지 개수
     */
    @GetMapping("/score/endPage/{count}")
    @ResponseBody
    public Integer getEndPage(@PathVariable int count) {
        return scoreService.scanEndPage(count);
    }

    /**
     * 전체 평균 조회
     * @return
     */
    @GetMapping("/score/average/all")
    @ResponseBody
    public String getAverage() {
        return scoreService.getAverage();
    }

    /**
     * 학생 id별 평균 조회
     * @param studentId
     * @return
     */
    @GetMapping("/score/average/student/{studentId}")
    @ResponseBody
    public String getStudentAverage(@PathVariable int studentId) {
        return scoreService.getStudentAverage(studentId);
    }

    /**
     * 과목 id별 평균 조회
     * @param subjectId
     * @return
     */
    @GetMapping("/score/average/subject/{subjectId}")
    @ResponseBody
    public String getSubjectAverage(@PathVariable int subjectId) {
        return scoreService.getSubjectAverage(subjectId);
    }

    /**
     * 학생 ID별 점수정보 조회
     * @param studentId
     * @param page
     * @param count
     * @return
     */
    @GetMapping("/score/student/{studentId}/{page}/{count}")
    @ResponseBody
    public List<Score> scanStudentScoreInfo(@PathVariable int studentId, @PathVariable int page,
        @PathVariable int count) {
        return scoreService.scanStudentScoreInfo(studentId, page, count);
    }

    /**
     * 학생 ID별 마지막 페이지 조회
     * @param studentId
     * @param count
     * @return
     */
    @GetMapping("/score/student/endPage/{studentId}/{count}")
    @ResponseBody
    public Integer getStudentEndPage(@PathVariable int studentId, @PathVariable int count) {
        return scoreService.getStudentCount(studentId, count);
    }

    /**
     * 과목 ID별 점수정보 조회
     * @param subjectId
     * @param page
     * @param count
     * @return
     */
    @GetMapping("/score/subject/{subjectId}/{page}/{count}")
    @ResponseBody
    public List<Score> scanSubjectScoreInfo(@PathVariable int subjectId, @PathVariable int page,
        @PathVariable int count) {
        return scoreService.scanSubjectScoreInfo(subjectId, page, count);
    }

    /**
     * 과목 ID별 마지막 페이지 조회
     * @param subjectId
     * @param count
     * @return
     */
    @GetMapping("/score/subject/endPage/{subjectId}/{count}")
    @ResponseBody
    public Integer getSubjectEndPage(@PathVariable int subjectId, @PathVariable int count) {
        return scoreService.getSubjectCount(subjectId, count);
    }

}

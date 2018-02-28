package com.naver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.naver.service.SubjectService;
import com.naver.vo.Subject;

@RestController
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    /**
     * 과목 정보 입력
     */
    @PostMapping("/subject")
    public void input(@RequestBody Subject subject, BindingResult result) {
        subjectService.insertSubjectInfo(subject);
    }

    /**
     * 과목 정보 업데이트
     */
    @PutMapping("/subject")
    public void change(@RequestBody Subject subject, BindingResult result) {
        subjectService.changeSubjectInfo(subject);
    }

    /**
     * id를 통한 삭제
     */
    @DeleteMapping("/subject/{subjectId}")
    public void delete(@PathVariable("subjectId") int subjectId) {
        subjectService.removeSubjectInfo(subjectId);
    }

    /**
     * 과목 정보 조회
     * @param page 호출할 페이지
     * @param count 페이지당 row 수
     * @return 과목정보
     */
    @GetMapping("/subject/{page}/{count}")
    public List<Subject> scan(@PathVariable int page, @PathVariable int count) {
        List<Subject> subjectList = subjectService.scanSubjectInfo(page, count);
        return subjectList;
    }

    /**
     * 전체 페이지 개수 조회
     * @param count 한페이지당 row 수
     * @return 전체 패이지 개수
     */
    @GetMapping("/subject/endPage/{count}")
    @ResponseBody
    public Integer getEndPage(@PathVariable int count) {
        return subjectService.scanEndPage(count);
    }

}

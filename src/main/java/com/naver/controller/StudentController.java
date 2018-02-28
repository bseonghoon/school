package com.naver.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.naver.service.StudentService;
import com.naver.validate.PeopleValidate;
import com.naver.vo.Student;

@RestController
public class StudentController {

    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    private StudentService studentService;
    @Autowired
    private PeopleValidate peopleValidate;

    /**
     * 학생정보 입력
     */
    @PostMapping("/student")
    public void input(@RequestBody @Valid Student student, BindingResult result) {
        if (result.hasErrors()) {
            logger.info(result.toString());
            return;
        }
        studentService.insertStudentInfo(student);
    }

    /**
     * 학생정보 업데이트
     */
    @PutMapping("/student")
    public void change(@RequestBody @Valid Student student, BindingResult result) {
        peopleValidate.validate(student, result);
        if (result.hasErrors()) {
            logger.info(result.toString());
            return;
        }
        studentService.changeStudentInfo(student);
    }

    /**
     * id를 통한 삭제
     */
    @DeleteMapping("/student/{id}")
    public void delete(@PathVariable int id) {
        studentService.removeStudentInfo(id);
    }

    /**
     * 학생 정보 조회
     * @param page 호출할 페이지
     * @param count 페이지당 row 수
     * @return 학생정보
     */
    @GetMapping("/student/{page}/{count}")
    public List<Student> scan(@PathVariable int page, @PathVariable int count) {
        List<Student> studentList = studentService.scanStudentInfo(page, count);
        return studentList;
    }

    /**
     * 전체 페이지 개수 조회
     * @param count 한페이지당 row 수
     * @return 전체 패이지 개수
     */
    @GetMapping("/student/endPage/{count}")
    @ResponseBody
    public Integer getEndPage(@PathVariable int count) {
        return studentService.scanEndPage(count);
    }

}

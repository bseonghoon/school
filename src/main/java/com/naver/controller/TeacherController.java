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

import com.naver.service.TeacherService;
import com.naver.validate.PeopleValidate;
import com.naver.vo.Teacher;

@RestController
public class TeacherController {

    private static final Logger logger = LoggerFactory.getLogger(TeacherController.class);

    @Autowired
    private TeacherService teacherService;
    @Autowired
    private PeopleValidate peopleValidate;

    /**
     * 선생님정보 입력
     */
    @PostMapping("/teacher")
    public void input(@RequestBody @Valid Teacher teacher, BindingResult result) {
        if (result.hasErrors()) {
            logger.info(result.toString());
            return;
        }
        teacherService.insertTeacherInfo(teacher);
    }

    /**
     * 선생님정보 업데이트
     */
    @PutMapping("/teacher")
    public void change(@RequestBody @Valid Teacher teacher, BindingResult result) {
        peopleValidate.validate(teacher, result);
        if (result.hasErrors()) {
            logger.info(result.toString());
            return;
        }
        teacherService.changeTeacherInfo(teacher);
    }

    /**
     * id를 통한 삭제
     */
    @DeleteMapping("/teacher/{id}")
    public void delete(@PathVariable int id) {
        teacherService.removeTeacherInfo(id);
    }

    /**
     * 선생님 정보 조회
     * @param page 호출할 페이지
     * @param count 페이지당 row 수
     * @return 학생정보
     */
    @GetMapping("/teacher/{page}/{count}")
    public List<Teacher> scan(@PathVariable int page, @PathVariable int count) {
        List<Teacher> staffList = teacherService.scanTeacherInfo(page, count);
        return staffList;
    }

    /**
     * 전체 페이지 개수 조회
     * @param count 한페이지당 row 수
     * @return 전체 패이지 개수
     */
    @GetMapping("/teacher/endPage/{count}")
    @ResponseBody
    public Integer getEndPage(@PathVariable int count) {
        return teacherService.scanEndPage(count);
    }

}

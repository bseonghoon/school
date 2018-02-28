package com.naver.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.naver.service.StaffService;
import com.naver.validate.PeopleValidate;
import com.naver.vo.Staff;

@RestController
public class StaffController {

    private static final Logger logger = LoggerFactory.getLogger(StaffController.class);

    @Autowired
    private StaffService staffService;
    @Autowired
    private PeopleValidate peopleValidate;

    /**
     * 교직원정보 입력
     */
    @PostMapping("/staff")
    public void input(@RequestBody @Valid Staff staff, BindingResult result) {
        if(result.hasErrors()) {
            logger.info(result.toString());
            return;
        }
        staffService.insertStaffInfo(staff);
    }

    /**
     * 교직원정보 업데이트
     */
    @PutMapping("/staff")
    public void change(@RequestBody @Valid Staff staff, BindingResult result) {
        peopleValidate.validate(staff, result);
        if(result.hasErrors()) {
            logger.info(result.toString());
            return;
        }
        staffService.changeStaffInfo(staff);
    }

    /**
     * id를 통한 삭제
     */
    @DeleteMapping("/staff/{id}")
    public void delete(Model model, @PathVariable int id) {
        staffService.removeStaffInfo(id);
    }

    /**
     * 교직원 정보 조회
     * @param page 호출할 페이지
     * @param count 페이지당 row 수
     * @return 학생정보
     */
    @GetMapping("/staff/{page}/{count}")
    public List<Staff> scan(@PathVariable int page, @PathVariable int count) {
        List<Staff> staffList = staffService.scanStaffInfo(page, count);
        return staffList;
    }

    /**
     * 전체 페이지 개수 조회
     * @param count 한페이지당 row 수
     * @return 전체 패이지 개수
     */
    @GetMapping("/staff/endPage/{count}")
    @ResponseBody
    public Integer getEndPage(@PathVariable int count) {
        return staffService.scanEndPage(count);
    }

}

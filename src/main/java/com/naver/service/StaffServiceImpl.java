package com.naver.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.naver.dao.StaffDao;
import com.naver.vo.Staff;

@Service
public class StaffServiceImpl implements StaffService{

    @Autowired
    private StaffDao staffDao;

    /**
     * 학생 정보 입력
     */
    @Override
    public void insertStaffInfo(Staff staff) {
        staffDao.insertStaff(staff);
    }

    /**
     * 학생 정보 변경
     */
    @Override
    public void changeStaffInfo(Staff staff) {
        staffDao.changeStaff(staff);
    }

    /**
     * 학생 정보 삭제
     */
    @Override
    public void removeStaffInfo(int id) {
        staffDao.deleteStaff(id);
    }

    /**
     * 학생정보 조회
     */
    @Override
    public List<Staff> scanStaffInfo(int page, int count) {
        if (page < 1) {
            page = 1;
        }
        int offset = count * (page - 1);

        Map<String, Integer> pagingMap = new HashMap<>();
        pagingMap.put("offset", offset);
        pagingMap.put("count", count);

        List<Staff> staffList = staffDao.getStaff(pagingMap);
        return staffList;
    }

    @Override
    public int scanEndPage(int count) {
        int staffCount = staffDao.getCount();
        int endPage;
        if (staffCount % count == 0) {
            endPage = staffCount / count;
        } else {
            endPage = staffCount / count + 1;
        }
        return endPage;
    }
}

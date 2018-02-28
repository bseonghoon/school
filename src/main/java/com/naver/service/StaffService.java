package com.naver.service;

import java.util.List;

import com.naver.vo.Staff;

public interface StaffService {
    void insertStaffInfo(Staff staff);

    void changeStaffInfo(Staff staff);

    void removeStaffInfo(int id);

    List<Staff> scanStaffInfo(int page, int count);

    int scanEndPage(int count);
}

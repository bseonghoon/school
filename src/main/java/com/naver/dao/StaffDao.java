package com.naver.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.naver.vo.Staff;

@Repository
public interface StaffDao {
    void insertStaff(Staff staff);

    List<Staff> getStaff(Map<String, Integer> pagingMap);

    void deleteStaff(int id);

    void changeStaff(Staff staff);

    int getCount();
}

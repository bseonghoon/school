package com.naver.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.naver.dao.TeacherDao;
import com.naver.vo.Teacher;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherDao teacherDao;

    /**
     * 학생 정보 입력
     */
    @Override
    public void insertTeacherInfo(Teacher teacher) {
        teacherDao.insertTeacher(teacher);
    }

    /**
     * 학생 정보 변경
     */
    @Override
    public void changeTeacherInfo(Teacher teacher) {
        Map<String, Object> params = new HashMap<>();
        params.put("id", teacher.getId());
        params.put("name", teacher.getName());
        params.put("birth", teacher.getBirth());
        params.put("subjectId", teacher.getSubjectId());
        teacherDao.changeTeacher(params);
    }

    /**
     * 학생 정보 삭제
     */
    @Override
    public void removeTeacherInfo(int id) {
        teacherDao.deleteTeacher(id);
    }

    /**
     * 학생정보 조회
     */
    @Override
    public List<Teacher> scanTeacherInfo(int page, int count) {
        if (page < 1) {
            page = 1;
        }
        int offset = count * (page - 1);

        Map<String, Integer> pagingMap = new HashMap<>();
        pagingMap.put("offset", offset);
        pagingMap.put("count", count);

        List<Teacher> teacherList = teacherDao.getTeacher(pagingMap);
        return teacherList;
    }

    @Override
    public int scanEndPage(int count) {
        int teacherCount = teacherDao.getCount();
        int endPage;
        if (teacherCount % count == 0) {
            endPage = teacherCount / count;
        } else {
            endPage = teacherCount / count + 1;
        }
        return endPage;
    }
}

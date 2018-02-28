package com.naver.vo;

public class Teacher extends People {

	private int subjectId;

	public Teacher() {
		super();
	}

	public Teacher(int id, String name, String birth, int subjectId) {
		super(id, name, birth);
		this.subjectId = subjectId;
	}

	public int getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(int subjectId) {
		this.subjectId = subjectId;
	}
}

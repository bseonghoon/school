package com.naver.vo;

import org.hibernate.validator.constraints.NotBlank;

/**
 * 과목
 *
 * @author seonghoon.bae
 *
 */
public class Subject {
	private int subjectId;

	@NotBlank
	private String subjectName;

	public Subject() {

	}

	public Subject(int subjectId, String subjectName) {
		super();
		this.subjectId = subjectId;
		this.subjectName = subjectName;
	}

	public int getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(int subjectId) {
		this.subjectId = subjectId;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
}

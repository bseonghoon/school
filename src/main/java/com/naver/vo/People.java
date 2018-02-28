package com.naver.vo;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

public class People {

    private int id;

    @NotBlank
    private String name;
    @NotBlank
    @Pattern(regexp = "[0-9]{4}-[0-9]{2}-[0-9]{2}")
    private String birth;

    public People() {

    }

    public People(int id, String name, String birth) {
        this.id = id;
        this.name = name;
        this.birth = birth;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }
}

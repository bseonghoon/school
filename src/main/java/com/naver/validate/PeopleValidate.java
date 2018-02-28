package com.naver.validate;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.naver.vo.People;

@Component
public class PeopleValidate implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        People people = (People) target;
        if(people.getId() < 1) {
            errors.reject("name", "required");
        }
    }

}

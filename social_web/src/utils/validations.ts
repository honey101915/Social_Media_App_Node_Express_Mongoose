import React, { useState } from 'react';

import parsePhoneNumberFromString, {
    isPossiblePhoneNumber,
    isValidPhoneNumber,
    validatePhoneNumberLength
} from 'libphonenumber-js'
import { notifyError } from './ToastConfig';

export const isValidEmail = (email: any) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (emailRegex.test(email) == false) {
        return false;
    } else {
        return true;
    }
};

// Empty or not
export const checkIsEmpty = (inputValue: any) => {
    if (inputValue == undefined) {
        return true;
    } else if (inputValue === null) {
        return true;
    } else if (typeof inputValue === "string" && inputValue.trim() == '') {
        return true;
    } else {
        return false;
    }
};

// check valid length
export const checkLength = (value: any, expectedLength = 8) => {
    if (!checkIsEmpty(value)) {
        if (value.length >= expectedLength) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

// Phone number validation
export const chekPhoneNumberValidations = (phoneNumber: any, countryCode: any) => {
    const phoneNumberObject = parsePhoneNumberFromString(phoneNumber, countryCode);
    if (checkIsEmpty(phoneNumber)) {
        notifyError('Please enter phone number');
        return false;
    } else if (checkLength(phoneNumber, 6) === false) {
        notifyError('Phone number must be of minimum 6 characters.');
        return false;
    }
    else if (phoneNumberObject?.isValid() === false) {
        return false;
    }
    else {
        return true;
    }
};

// Email , Password validations
export const checkPasswordValidations = (password: any, message = '') => {
    if (checkIsEmpty(password)) {
        notifyError(`Please enter password.`);
        return false;
    } else if (checkLength(password, 6) === false) {
        notifyError(`${message}`);
        return false;
    } else {
        return true;
    }
};

export const isTextArabic = (text: any) => {
    const arabicRegex = /^[\u0600-\u06FF\s]*$/;
    if (arabicRegex.test(text) || text === '') {
        return true;
    } else {
        return false;
    }
}

export const isTextEnglish = (text: any) => {
    const englishRegex = /^[a-zA-Z ]*$/;
    if (englishRegex.test(text) || text === '') {
        return true;
    } else {
        return false;
    }
}

export const ENGLISH_TEXT_REGEX = /[^a-zA-Z\s]/g

export const checkDataEmptyOrNot = (_data: any) => {
    if (_data == undefined) {
        return true;
    } else if (_data == null) {
        return true;
    } else if (Array.isArray(_data) && _data.length === 0) {
        return true
    } else if (typeof _data === "object" && Object.keys(_data).length === 0) {
        return true
    } else if (typeof _data === "string" && _data.trim().length === 0) {
        return true
    } else {
        return false
    }
}


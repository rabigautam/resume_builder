const Validator = require('validator');
const otherHelper = {};
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);
otherHelper.validation = (data, validationArray) => {
    let errors = {};
    validationArray.forEach((validationObj) => {
      let value = data[validationObj.field];
      value = !isEmpty(value) ? value + '' : '';
      const validation = validationObj.validate;
      for (let i = 0; i < validation.length; i++) {
        const val = validation[i];
        switch (val.condition) {
          case 'IsEmpty':
            if (Validator.isEmpty(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsLength':
            if (val.option) {
              if (!Validator.isLength(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsInt':
            if (val.option) {
              if (!Validator.isInt(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsEqual':
            if (val.option) {
              if (!Validator.equals(val.option.one, val.option.two)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsMongoId':
            if (!Validator.isMongoId(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsIn':
            if (val.option) {
              if (!Validator.isIn(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsNumeric':
            if (!Validator.isNumeric(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsDate':
            if (!Validator.isISO8601(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsEmail':
            if (!Validator.isEmail(value)) {
              errors[validationObj.field] = val.msg;
            }
            // else {
            //   const domain = value.split('@')[1];
            //   const d = otherHelper.CheckDisposable(domain);
            //   if (d) {
            //     errors[validationObj.field] = 'Oops!!! Disposable Mail Detected';
            //   }
            // }
            break;
          case 'IsBoolean':
            if (!Validator.isBoolean(value.toString())) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsAfter':
            if (val.option) {
              if (!Validator.isAfter(value, val.option.date)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsURL':
            if (val.option) {
              if (!Validator.isURL(value, val.option.protocols)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          case 'IsUppercase':
            if (!Validator.isUppercase(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsJson':
            if (!Validator.isJSON(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsPhone':
            let pn = new PhoneNumber(value);
            if (pn.isValid()) {
              if (val.option) {
                if (val.option.isMobile) {
                  if (!pn.isMobile()) {
                    errors[validationObj.field] = 'Enter mobile number';
                  }
                } else {
                  if (!pn.isFixedLine()) {
                    errors[validationObj.field] = 'Enter landline number';
                  }
                }
              }
            } else {
              errors[validationObj.field] = val.msg;
            }
            break;
          default:
            break;
        }
        if (errors[validationObj.field]) {
          i = validation.length;
        }
      }
    });
    return errors;
  };
otherHelper.sendResponse = (res, status, success, data, errors, msg, token) => {
    const response = {};
    if (success !== null) response.success = success;
    if (data !== null) response.data = data;
    if (errors !== null) response.errors = errors;
    if (msg !== null) response.msg = msg;
    if (token !== null) response.token = token;
    return res.status(status).json(response);
  };
  

  module.exports=otherHelper
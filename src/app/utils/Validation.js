import { TEXT } from "./Text";

export const validationRules = {
  username: {
    required: TEXT.USER_REQUIRED,
    minLength: {
      value: 3,
      message: TEXT.USER_MIN,
    },
    maxLength: {
      value: 30,
      message: TEXT.USER_MAX,
    },
  },

  password: {
    required: TEXT.PASSWORD_REQUIRED,
    minLength: {
      value: 6,
      message: TEXT.PASSWORD_MIN,
    },
    maxLength: {
      value: 10,
      message: TEXT.PASSWORD_MAX,
    },
  },
};

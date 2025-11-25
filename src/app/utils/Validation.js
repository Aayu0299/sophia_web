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
      value: 15,
      message: TEXT.PASSWORD_MAX,
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
      message: TEXT.PASSWORD_INCLUDE,
    },
  },

  confirmPassword: {
    required: TEXT.CONFIRM_PASSWORD_REQUIRED,
    minLength: {
      value: 6,
      message: TEXT.CONFIRM_PASSWORD_MIN,
    },
    maxLength: {
      value: 15,
      message: TEXT.CONFIRM_PASSWORD_MAX,
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
      message: TEXT.CONFIRM_PASSWORD_INCLUDE,
    },
  },

  email: {
    required: TEXT.PLEASE_ENTER_EMAIL,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: TEXT.ENTER_VALID_EMAIL,
    },
  },

  userType: {
    required: TEXT.USER_TYPE_REQUIRED,
  },

  fullName: {
    required: TEXT.FULL_NAME_REQUIRED,
    minLength: {
      value: 2,
      message: TEXT.FULL_NAME_MIN,
    },
    maxLength: {
      value: 50,
      message: TEXT.FULL_NAME_MAX,
    },
  },

  name: {
    required: TEXT.NAME_REQUIRED,
    minLength: {
      value: 2,
      message: TEXT.NAME_MIN,
    },
    maxLength: {
      value: 50,
      message: TEXT.NAME_MAX,
    },
  },

  mrnNumber: {
    required: TEXT.MRN_REQUIRED,
  },

  phoneNumber: {
    required: TEXT.PHONE_REQUIRED,
  },

  notesAdd: {
    required: TEXT.NOTE_REQUIRED,
    minLength: {
      value: 2,
      message: TEXT.NOTE_MIN,
    },
  },
};

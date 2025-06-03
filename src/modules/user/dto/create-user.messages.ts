export const CreateUserMessages = {
  name: {
    invalidFormat: 'Name must be string',
    lengthField: 'min length is 1, max is 15',
  },
  email: {
    invalidFormat: 'Email must be a valid email address.',
  },
  avatar: {
    invalidFormat: 'Avatar must be a .jpg or .png image.',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
  type: {
    invalid: 'Type must be either "ordinary" or "pro".',
  },
};

export const usernameRules = [
  (v) => !!v || 'Username is required',
  (v) => v.length <= 20 || 'Username must be less than 20 characters',
  (v) => v.length >= 5 || 'Username must be bigger than 5 characters',
  (v) =>
    v.match(/[a-zA-Z0-9]/g)?.length === v?.length ||
    'No special characters or whitespaces allowed',
];

export const emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v
    ) || 'E-mail must be valid',
];

export const passwordRules = [
  (v) => !!v || 'Password is required',
  // (v) => {
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  //   return (
  //     passwordRegex.test(v) ||
  //     'Your password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'
  //   );
  // },
];

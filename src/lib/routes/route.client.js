export const Home_PAGE = '/';

export const AUTH_PAGE = '/authentification';
export const SUGNUP_PAGE = '/inscription';
export const DASHBOARD_PAGE = '/dashboard';
export const FIRST_STEP_FORM_PAGE = '/inforrmations-first-step';
export const SECOND_STEP_FORM_PAGE = '/informations-second-step';
export const THIRD_STEP_FORM_PAFE = '/informations-third-step';
export const ALL_USER_PAGE = '/allusers';

export const getStudentInfo = (id) => {
  return `/students-info/${id}`;
};

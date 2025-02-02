export const Home_PAGE = '/';

export const AUTH_PAGE = '/authentification';
export const SUGNUP_PAGE = '/inscription';
export const DASHBOARD_PAGE = '/dashboard';
export const FIRST_STEP_FORM_PAGE = '/process/informations-personnelles';
export const SECOND_STEP_FORM_PAGE = '/process/cursus-scolaires';
export const THIRD_STEP_FORM_PAFE = '/process/informations-bac';
export const ALL_USER_PAGE = '/allusers';

export const getStudentInfo = (id) => {
  return `/students-info/${id}`;
};

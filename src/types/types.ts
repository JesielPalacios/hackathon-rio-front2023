export type PostProps = { id: number; title: string; body: string };

export type LoginAuthProps = {
  email: string;
  password: string;
};

export type User = {
  birthCity: '';
  birthCountry: '';
  birthDate: '';
  birthDepartment: '';
  cellPhoneNumber: '';
  citizenshipNumberId: '';
  email: '';
  firstName: '';
  firstSurname: '';
  gender: '';
  maritalStatus: '';
  role: '';
  socialStratum: '';
  createdAt: Date;
  updatedAt: Date;
  creationDate: Date;
  editionDate: Date;
  userCreate: '';
  userUpdate: '';
  _id: '';
};

export interface Colors {
  primary: string;
  primary75: string;
  primary50: string;
  primary25: string;
  danger: string;
  dangerLight: string;
  neutral0: string;
  neutral5: string;
  neutral10: string;
  neutral20: string;
  neutral30: string;
  neutral40: string;
  neutral50: string;
  neutral60: string;
  neutral70: string;
  neutral80: string;
  neutral90: string;
}
export interface ThemeSpacing {
  baseUnit: number;
  controlHeight: number;
  menuGutter: number;
}
export interface Theme {
  borderRadius: number;
  colors: Colors;
  spacing: ThemeSpacing;
}

export declare const colors: {
  primary: string;
  primary75: string;
  primary50: string;
  primary25: string;
  danger: string;
  dangerLight: string;
  neutral0: string;
  neutral5: string;
  neutral10: string;
  neutral20: string;
  neutral30: string;
  neutral40: string;
  neutral50: string;
  neutral60: string;
  neutral70: string;
  neutral80: string;
  neutral90: string;
};
export declare const spacing: {
  baseUnit: number;
  controlHeight: number;
  menuGutter: number;
};
export declare const defaultTheme: Theme;
export declare type ThemeConfig = Theme | ((theme: Theme) => Theme);

export const theme: Theme = {
  borderRadius: 7,
  colors: {
    primary: '#fff',
    primary75: 'string',
    primary50: 'string',
    primary25: 'string',
    danger: '#f00',
    dangerLight: '#80808033',
    neutral0: '#bbb',
    neutral5: 'string',
    neutral10: 'string',
    neutral20: 'string',
    neutral30: 'string',
    neutral40: 'string',
    neutral50: 'string',
    neutral60: 'string',
    neutral70: 'string',
    neutral80: 'string',
    neutral90: 'string',
  },
  spacing: {
    baseUnit: 5,
    controlHeight: 5,
    menuGutter: 5,
  },
};

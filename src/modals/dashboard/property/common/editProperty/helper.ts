export interface basicInfoT {
    propertyName: string;
    contactPerson: string;
    primaryContactNumber: string;
    secondaryContactNumber: string;
    addressLine1: string;
    pinCode: string;
    addressLine2: string;
    country: string;
    city: string;
    state: string;
    userName: string;
    newPassword: string;
    confirmNewPassword: string;
    latitude:number,
    longitude:number,
  }

  export const initialBasicInfo: basicInfoT = {
    propertyName: '',
    contactPerson: '',
    primaryContactNumber: '',
    secondaryContactNumber: '',
    addressLine1: '',
    pinCode: '',
    addressLine2: '',
    country: '',
    city: '',
    state: '',
    userName: '',
    newPassword: '',
    confirmNewPassword: '',
    latitude:0,
    longitude:0
  };
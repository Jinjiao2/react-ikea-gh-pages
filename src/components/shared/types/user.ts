export interface User {
  dsid: number
  fullName: string
  email: string
  employeeType: string
}

export interface UserBasic {
  dsid: number
}

export enum EEmployeeType {
  EMPLOYEE = 'Apple Employee',
  VENDOR = 'On-site Vendor',
}

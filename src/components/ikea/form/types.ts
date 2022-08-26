import { DropdownOptionType } from "../../shared/types/common";

export type LakehouseFormData = {
  // basic info
  name: string;
  organization: DropdownOptionType;
  emergencyGroup: string;
  articleNumber: string;
  // catalogs
  catalogs?: string[];
  // compute
  addressType: string;
  cluster: DropdownOptionType;
  namespace: string;
  serviceToken?: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  properties?: string;
  // access control
  admins: string[];
  developers?: string[];
  maintainers?: string[];
  reporters?: string[];
};

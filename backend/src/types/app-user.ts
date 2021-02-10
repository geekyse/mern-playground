export type IBaseAppUserRolesType =
  | 'guest-user'
  | 'workspace-owner'
  | 'logged-in-user'
  | 'finance-user'
  | 'finance-supervisor'
  | 'finance-admin'
  | 'logistics-user'
  | 'logistics-supervisor'
  | 'logistics-admin'
  | 'content-user'
  | 'content-supervisor'
  | 'content-admin'
  | 'support-user'
  | 'support-supervisor'
  | 'support-admin'
  | 'buyer-user'
  | 'buyer-supervisor'
  | 'buyer-admin'
  | 'supplier-user'
  | 'supplier-supervisor'
  | 'supplier-admin';

export interface IBaseAppUser {
  _id: string;
  // todo this is not the mongo
  firstName: string;
  lastName: string;
  email: string;

  phoneNumber?: string;
  phoneNumberCode?: string;
  companyName?: string;
  profileImage?: string;

  metadata?: Record<string, any>;

  isActive: boolean;
  isVerified: boolean;
  isEnabled: boolean;

  isFraud?: boolean;
  qualityScore?: number;

  buyerCompanyId: string;
  buyerCountryId: string;
  buyerCompanyMeta?: Record<string, any>;

  isEnabledBuyerCompany: boolean;
  isActiveBuyerCompany: boolean;
  isVerifiedBuyerCompany: boolean;
  buyerCompanyVerifiedBy: string;
  buyerCompanyVerifiedAt: string;
  buyerCompanyCreatedAt: string;
  buyerCompanyUpdatedAt: string;

  masterBuyerCompanyId?: string;

  buyerCompanyHasActiveSubscription?: boolean;
  buyerCompanySubscriptionStartAt?: string;
  buyerCompanySubscriptionEndAt?: string;
  buyerCompanySubscriptionPlanId?: string;

  supplierCompanyId: string;
  supplierCountryId: string;
  supplierCompanyMeta?: Record<string, any>;

  isEnabledSupplierCompany: boolean;
  isActiveSupplierCompany: boolean;
  isVerifiedSupplierCompany: boolean;
  supplierCompanyVerifiedBy: string;
  supplierCompanyVerifiedAt: string;
  supplierCompanyCreatedAt: string;
  supplierCompanyUpdatedAt: string;

  masterSupplierCompanyId?: string;

  supplierCompanyHasActiveSubscription?: boolean;
  supplierCompanySubscriptionStartAt?: string;
  supplierCompanySubscriptionEndAt?: string;
  supplierCompanySubscriptionPlanId?: string;
  roles: IBaseAppUserRolesType[];

  updatedAt: string;
  createdAt: string;
}

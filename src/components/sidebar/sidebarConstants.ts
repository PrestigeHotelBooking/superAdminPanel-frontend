export type SidebarOptionValue =
  | 'DASHBOARD'
  | 'USER MANAGEMENT'
  | 'PROPERTY MANAGEMENT'
  | 'BOOKING MANAGEMENT'
  | 'PAYMENT MANAGEMENT'
  | 'REPORT AND ANALYSIS'
  | 'NOTIFICATION MANAGEMENT'
  | 'CONTENT MANAGEMENT'
  | 'CONFIGURATION MANAGEMENT';

interface SidebarOptionsT {
  label: string;
  value: SidebarOptionValue;
}

export const sidebarOptions: SidebarOptionsT[] = [
  {
    label: 'Dashboard',
    value: 'DASHBOARD',
  },
  {
    label: 'User Management',
    value: 'USER MANAGEMENT',
  },
  {
    label: 'Property Management',
    value: 'PROPERTY MANAGEMENT',
  },
  {
    label: 'Booking Management',
    value: 'BOOKING MANAGEMENT',
  },
  {
    label: 'Payment Management',
    value: 'PAYMENT MANAGEMENT',
  },
  {
    label: 'Report and Analysis',
    value: 'REPORT AND ANALYSIS',
  },
  {
    label: 'Notification Management',
    value: 'NOTIFICATION MANAGEMENT',
  },
  {
    label: 'Content Management',
    value: 'CONTENT MANAGEMENT',
  },
  {
    label: 'Configuration Settings',
    value: 'CONFIGURATION MANAGEMENT',
  },
];

export const sidebarPaths: Record<SidebarOptionValue, string> = {
  DASHBOARD: '/dashboard',
  'USER MANAGEMENT': '/dashboard/user',
  'PROPERTY MANAGEMENT': '/dashboard/property',
  'BOOKING MANAGEMENT': '/dashboard/booking',
  'PAYMENT MANAGEMENT': '/dashboard/payment',
  'REPORT AND ANALYSIS': '/dashboard/report',
  'NOTIFICATION MANAGEMENT': '/dashboard/notification',
  'CONTENT MANAGEMENT': '/dashboard/content',
  'CONFIGURATION MANAGEMENT': '/dashboard/configure',
};

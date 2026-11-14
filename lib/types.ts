export type LeadStatus = 'new' | 'contacted' | 'closed' | 'completed';

export type Lead = {
  id: string;
  name: string;
  email: string;
  property: string;
  message: string;
  status: LeadStatus;
  createdAt?: number;
};

// Staff accounts are the `Agent` model from src/types/firestore.ts.
export type { Agent as StaffUser, AgentRole as UserRole } from '../src/types/firestore';

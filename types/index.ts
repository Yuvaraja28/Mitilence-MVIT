// Firestore DB
interface User {
  readonly id: string;
  name: string;
  enrollNo: string;
  emailId: string;
  phoneNo: string;
  college: string;
  department: string;
  gender: 'male' | 'female';
  year: number;
  createdTime: string;
}

// Firestore DB
interface EventOrganizer {
  readonly id: string;
  name: string;
  role: string;
  emailId: string;
  phoneNo: string;
  department: string;
  imageUrl?: string;
}

// Firestore DB
interface ManagementMember {
  readonly id: string;
  name: string;
  role: string;
  imageUrl?: string;
}

// Firestore DB
interface TechnicalMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly social?: SocialHandle[];
  readonly imageUrl?: string;
}

// Firestore DB
interface Department {
  readonly id: string;
  name: string;
  fullName: string;
  order: number;
  logoUrl?: string;
  bannerUrl?: string;
}

// Realtime DB
interface Events {
  readonly id: string;
  name: string;
  departmentId: string;
  startTime: string;
  endTime: string;
  teamSize: number;
  place: string;
  totalSeats: number;
  seatsLeft: number;
  entryFee: number;
  bannerUrl?: string;
  eventCategory: string;
  registrationEndTime: string;
  studentOrganizerId: string;
  facultyOrganizerId: string;
  eventType: 'technical' | 'non_technical';
}

// Realtime DB
interface RegisteredEvent extends Events {
  teamMembers: string[];
  registeredTime: string;
  paymentUpdatedBy: string[];
  paymentStatus: 'success' | 'pending' | 'failed' | 'notdone'
}

interface EventCategory {
  readonly id: string;
  readonly name: string;
  readonly order: number;
}

// Sub Types
type SocialHandle = {
  [key: string]: {
    readonly github: string;
    readonly linkedin: string;
  }
}
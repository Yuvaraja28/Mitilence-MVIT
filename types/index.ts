// Firestore DB
interface EventUser {
  readonly id: string;
  name: string;
  enrollNo: string;
  emailId: string;
  phoneNo: string;
  college: string;
  department: string;
  imageUrl?: string;
  gender: 'male' | 'female';
  year: number;
  createdTime: string;
  paymentStatus?: 'success' | 'pending' | 'failed';
}

// Firestore DB
interface EventOrganizer {
  readonly id: string;
  name: string;
  role: string;
  emailId: string;
  phoneNo: string;
  departmentId: string;
  imageUrl?: string;
}

// Firestore DB
interface ManagementMember {
  readonly id: string;
  name: string;
  role: string;
  phone?: string;
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
  logoUrl?: string;
  bannerUrl?: string;
  eventCategory: string;
  eventDescription: string;
  registrationEndTime: string;
  facultyOrganizerId: string;
  studentOrganizerId: string[];
  linkRegistration?: string;
  eventType: 'technical' | 'non_technical';
}

interface EventCategory {
  readonly id: string;
  readonly name: string;
  readonly order: number;
}

// Realtime DB
interface AllRegisteredEvent {
  [key: string]: RegisteredEvent;
}

interface RegisteredEvent {
  eventId: string;
  teamMembers: string[];
  registeredTime: string;
  paymentUpdatedBy?: string;
  paymentStatus?: 'success' | 'pending' | 'failed';
}

// Sub Types
type SocialHandle = {
  [key: string]: {
    readonly github: string;
    readonly linkedin: string;
  }
}
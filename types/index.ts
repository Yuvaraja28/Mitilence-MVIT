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
  gradYear: number;
  createdTime: string;
  updatedTime?: string;
  paymentStatus?: 'verified' | 'pending' | 'failed';
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
interface AdministrationMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly imageUrl: string;
  readonly order: number;
}

// Firestore DB
interface TechnicalMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly imageUrl: string;
  readonly order: number;
  readonly phone?: string;
  readonly social?: SocialHandle[];
}

// Firestore DB
interface Department {
  readonly id: string;
  name: string;
  fullName: string;
  order: number;
  logoUrl?: string;
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
  eventCategory: string;
  eventDescription: string;
  registrationEndTime: string;
  facultyOrganizerId: string;
  studentOrganizerId: string;
  eventType: 'technical' | 'non_technical';
  logoUrl?: string;
  totalSeats?: number;
  seatsLeft?: number;
  entryFee?: number;
  linkRegistration?: string;
}

interface EventCategory {
  readonly id: string;
  readonly name: string;
  readonly order: number;
}

interface FAQ {
  question: string;
  answer: string;
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
  checkedInStatus?: 'checkedin' | 'not_checkedin';
}

// Sub Types
type SocialHandle = {
  [key: string]: {
    readonly github: string;
    readonly linkedin: string;
  }
}
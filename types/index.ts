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
}

// Firestore DB
interface EventOrganizer {
  readonly id: string;
  name: string;
  roles: string[];
  emailId: string;
  departmentId: string;
}

interface EventCoordinator {
  readonly id: string;
  name: string;
  role: string;
  departmentId: string;
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
  order: number;
  staffName: string;
  staffPhone: string;
  logoUrl?: string | null;
}

// Realtime DB
interface Events {
  readonly id: string;
  name: string;
  departmentId: string;
  startTime: string;
  endTime: string;
  teamSize: string; // Eg Data [1 - 2] [1]
  place: string;
  eventCategory: string;
  eventDescription: string;
  registrationEndTime?: string;
  facultyCoordinatorId?: string;
  studentCoordinatorId?: string;
  eventType: 'technical' | 'non_technical';
  logoUrl?: string;
  totalSeats?: number;
  seatsLeft?: number;
  entryFee?: number;
  linkRegistration?: string;
  registrationsClosed?: boolean;
  studentOrganizer?: string;
  facultyOrganizer?: string;
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

interface MitilencePaymentDepartment {
  departmentId: string;
  paymentTime: string;
  paymentStatus: boolean;
  registrationStatus: boolean;
  registeredTime: string;
  paymentVerifiedBy: string;
  paymentVerifiedByName: string;
  participantType: 'Internal' | 'External';
}

interface RegisteredEvent {
  eventId: string;
  departmentId: string;
  checkedInBy: string;
  checkedInByName: string;
  checkedInTime: string;
  checkedInStatus: boolean;
}

interface EventUserPayments {
  readonly id: string;
  mitilence: {
    [departmentId: string]: MitilencePaymentDepartment,
  },
  events: {
    [eventsId: string]: RegisteredEvent
  }
}

interface Feedback {
  comments: string;
  [props: string]: number | string;
}

// Sub Types
type SocialHandle = {
  [key: string]: {
    readonly github: string;
    readonly linkedin: string;
  }
}
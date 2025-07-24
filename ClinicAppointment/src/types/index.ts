export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'doctor' | 'admin';
  phone?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: string;
  medicalHistory?: string[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string[];
  department: string;
  experience: number;
  rating: number;
  reviewCount: number;
  availability: DoctorAvailability[];
  isApproved: boolean;
  licenseNumber: string;
  bio?: string;
}

export interface DoctorAvailability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: 'consultation' | 'follow-up' | 'check-up';
  notes?: string;
  prescriptionId?: string;
  patient?: Patient;
  doctor?: Doctor;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;
  medications: Medication[];
  diagnosis: string;
  notes?: string;
  createdAt: Date;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  appointmentId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  fromUser?: User;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  specializations: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'prescription' | 'review' | 'system';
  isRead: boolean;
  createdAt: Date;
}
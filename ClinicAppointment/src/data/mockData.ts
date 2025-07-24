import { Doctor, Department, Appointment, Prescription, Review } from '../types';

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Cardiology',
    description: 'Heart and cardiovascular system specialists',
    specializations: ['Interventional Cardiology', 'Heart Surgery', 'Electrophysiology']
  },
  {
    id: '2',
    name: 'Neurology',
    description: 'Brain and nervous system specialists',
    specializations: ['Neurosurgery', 'Stroke Care', 'Epilepsy']
  },
  {
    id: '3',
    name: 'Orthopedics',
    description: 'Bone, joint, and muscle specialists',
    specializations: ['Sports Medicine', 'Joint Replacement', 'Trauma Surgery']
  },
  {
    id: '4',
    name: 'Pediatrics',
    description: 'Children\'s health specialists',
    specializations: ['Neonatology', 'Pediatric Surgery', 'Child Development']
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: '2',
    email: 'doctor@demo.com',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    role: 'doctor',
    phone: '+1-555-0124',
    specialization: ['Interventional Cardiology'],
    department: 'Cardiology',
    experience: 12,
    rating: 4.8,
    reviewCount: 156,
    isApproved: true,
    licenseNumber: 'MD-2024-001',
    bio: 'Dr. Johnson is a board-certified cardiologist with over 12 years of experience in interventional cardiology.',
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '09:00', endTime: '15:00', isAvailable: true },
    ],
    createdAt: new Date(),
  },
  {
    id: '4',
    email: 'dr.martinez@demo.com',
    firstName: 'Dr. Michael',
    lastName: 'Martinez',
    role: 'doctor',
    phone: '+1-555-0126',
    specialization: ['Neurosurgery'],
    department: 'Neurology',
    experience: 15,
    rating: 4.9,
    reviewCount: 203,
    isApproved: true,
    licenseNumber: 'MD-2024-002',
    bio: 'Leading neurosurgeon specializing in complex brain and spine surgeries.',
    availability: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '08:00', endTime: '16:00', isAvailable: true },
    ],
    createdAt: new Date(),
  },
  {
    id: '5',
    email: 'dr.chen@demo.com',
    firstName: 'Dr. Lisa',
    lastName: 'Chen',
    role: 'doctor',
    phone: '+1-555-0127',
    specialization: ['Sports Medicine', 'Joint Replacement'],
    department: 'Orthopedics',
    experience: 8,
    rating: 4.7,
    reviewCount: 89,
    isApproved: true,
    licenseNumber: 'MD-2024-003',
    bio: 'Orthopedic surgeon focused on sports injuries and joint replacement procedures.',
    availability: [
      { dayOfWeek: 1, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '10:00', endTime: '18:00', isAvailable: true },
    ],
    createdAt: new Date(),
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '2',
    date: new Date(2024, 11, 20),
    time: '10:00',
    status: 'confirmed',
    type: 'consultation',
    notes: 'Regular check-up for heart condition',
  },
  {
    id: '2',
    patientId: '1',
    doctorId: '4',
    date: new Date(2024, 11, 25),
    time: '14:00',
    status: 'pending',
    type: 'consultation',
    notes: 'Follow-up for headaches',
  },
];

export const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    appointmentId: '1',
    doctorId: '2',
    patientId: '1',
    diagnosis: 'Hypertension management',
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take with food in the morning',
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '30 days',
        instructions: 'Take with meals',
      },
    ],
    notes: 'Monitor blood pressure regularly. Follow up in 4 weeks.',
    createdAt: new Date(),
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    fromUserId: '1',
    toUserId: '2',
    appointmentId: '1',
    rating: 5,
    comment: 'Excellent care and very professional. Dr. Johnson explained everything clearly.',
    createdAt: new Date(),
  },
];
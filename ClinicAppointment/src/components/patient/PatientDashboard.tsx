import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockAppointments, mockPrescriptions, mockDoctors } from '../../data/mockData';
import { Calendar, FileText, Clock, User, Star, Bell } from 'lucide-react';
import { Appointment, Doctor } from '../../types';
import { FindDoctors } from './FindDoctors';
import { BookAppointment } from './BookAppointment';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Mock data for current user
  const userAppointments = mockAppointments.filter(apt => apt.patientId === user?.id);
  const userPrescriptions = mockPrescriptions.filter(rx => rx.patientId === user?.id);
  const upcomingAppointments = userAppointments.filter(apt => 
    apt.status === 'confirmed' && new Date(apt.date) >= new Date()
  );

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setActiveTab('book-appointment');
  };

  const handleBookingComplete = () => {
    setSelectedDoctor(null);
    setActiveTab('appointments');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600">Here's your health overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-sky-100 rounded-lg">
              <Calendar className="h-6 w-6 text-sky-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Upcoming Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Prescriptions</p>
              <p className="text-2xl font-bold text-gray-900">{userPrescriptions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Doctors Visited</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => {
              const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
              return (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-sky-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">
                        {doctor?.firstName} {doctor?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{doctor?.specialization.join(', ')}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {appointment.date.toLocaleDateString()} at {appointment.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No upcoming appointments</p>
            <button
              onClick={() => setActiveTab('find-doctors')}
              className="mt-2 text-sky-600 hover:text-sky-500 font-medium"
            >
              Book your first appointment
            </button>
          </div>
        )}
      </div>

      {/* Recent Prescriptions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Prescriptions</h2>
        {userPrescriptions.length > 0 ? (
          <div className="space-y-4">
            {userPrescriptions.slice(0, 2).map(prescription => {
              const doctor = mockDoctors.find(d => d.id === prescription.doctorId);
              return (
                <div key={prescription.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{prescription.diagnosis}</p>
                    <p className="text-sm text-gray-500">
                      {prescription.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Prescribed by {doctor?.firstName} {doctor?.lastName}
                  </p>
                  <div className="text-sm text-gray-600">
                    {prescription.medications.length} medication(s)
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No prescriptions yet</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <button
            onClick={() => setActiveTab('find-doctors')}
            className="px-4 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors"
          >
            Book New Appointment
          </button>
        </div>

        {userAppointments.length > 0 ? (
          <div className="space-y-4">
            {userAppointments.map(appointment => {
              const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
              return (
                <div key={appointment.id} className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center">
                        <User className="h-8 w-8 text-sky-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          {doctor?.firstName} {doctor?.lastName}
                        </p>
                        <p className="text-gray-600">{doctor?.specialization.join(', ')}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {appointment.date.toLocaleDateString()} at {appointment.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : appointment.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <p className="text-sm text-gray-500 mt-2">{appointment.type}</p>
                    </div>
                  </div>
                  
                  {appointment.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{appointment.notes}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
            <p className="text-gray-600 mb-4">Book your first appointment with our doctors</p>
            <button
              onClick={() => setActiveTab('find-doctors')}
              className="px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors"
            >
              Find Doctors
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (activeTab === 'find-doctors') {
    return <FindDoctors onBookAppointment={handleBookAppointment} />;
  }

  if (activeTab === 'book-appointment' && selectedDoctor) {
    return (
      <BookAppointment
        doctor={selectedDoctor}
        onBack={() => setActiveTab('find-doctors')}
        onBookingComplete={handleBookingComplete}
      />
    );
  }

  if (activeTab === 'appointments') {
    return renderAppointments();
  }

  return renderDashboard();
};
import React, { useState } from 'react';
import { Doctor } from '../../types';
import { Calendar, Clock, ArrowLeft, CheckCircle } from 'lucide-react';

interface BookAppointmentProps {
  doctor: Doctor;
  onBack: () => void;
  onBookingComplete: () => void;
}

export const BookAppointment: React.FC<BookAppointmentProps> = ({ 
  doctor, 
  onBack, 
  onBookingComplete 
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState<'consultation' | 'follow-up' | 'check-up'>('consultation');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  // Generate available dates (next 14 days, excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Check if doctor is available on this day
      const dayOfWeek = date.getDay();
      const isAvailable = doctor.availability.some(avail => 
        avail.dayOfWeek === dayOfWeek && avail.isAvailable
      );
      
      if (isAvailable) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  // Generate available time slots
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];
    
    const selectedDateObj = new Date(selectedDate);
    const dayOfWeek = selectedDateObj.getDay();
    
    const availability = doctor.availability.find(avail => avail.dayOfWeek === dayOfWeek);
    if (!availability) return [];
    
    const slots = [];
    const startHour = parseInt(availability.startTime.split(':')[0]);
    const endHour = parseInt(availability.endTime.split(':')[0]);
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour + 0.5 < endHour) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    
    return slots;
  };

  const handleBookAppointment = () => {
    // In a real app, this would make an API call
    setIsBooked(true);
    setTimeout(() => {
      onBookingComplete();
    }, 2000);
  };

  const availableDates = getAvailableDates();
  const availableTimeSlots = getAvailableTimeSlots();

  if (isBooked) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
        <p className="text-gray-600 mb-4">
          Your appointment with {doctor.firstName} {doctor.lastName} has been scheduled.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-medium">
            {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} at {selectedTime}
          </p>
        </div>
        <p className="text-sm text-gray-500">Redirecting to appointments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
        </div>

        {/* Doctor Info */}
        <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-6">
          <div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center">
            <span className="text-sky-600 font-semibold text-lg">
              {doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}
            </span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {doctor.firstName} {doctor.lastName}
            </h3>
            <p className="text-sm text-gray-600">{doctor.specialization.join(', ')}</p>
            <p className="text-sm text-gray-500">{doctor.department}</p>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Type
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value as any)}
            >
              <option value="consultation">Consultation</option>
              <option value="follow-up">Follow-up</option>
              <option value="check-up">Check-up</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Select Date
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime('');
              }}
            >
              <option value="">Choose a date</option>
              {availableDates.map(date => (
                <option key={date.toISOString()} value={date.toISOString().split('T')[0]}>
                  {date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </option>
              ))}
            </select>
          </div>

          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Select Time
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {availableTimeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      selectedTime === time
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              rows={3}
              placeholder="Describe your symptoms or reason for visit..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleBookAppointment}
              disabled={!selectedDate || !selectedTime}
              className="flex-1 px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
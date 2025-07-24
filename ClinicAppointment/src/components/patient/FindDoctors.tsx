import React, { useState } from 'react';
import { mockDoctors, mockDepartments } from '../../data/mockData';
import { Doctor } from '../../types';
import { Search, Filter, Star, Calendar, MapPin, Clock } from 'lucide-react';

interface FindDoctorsProps {
  onBookAppointment: (doctor: Doctor) => void;
}

export const FindDoctors: React.FC<FindDoctorsProps> = ({ onBookAppointment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = searchTerm === '' || 
      doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = selectedDepartment === '' || doctor.department === selectedDepartment;
    const matchesSpecialization = selectedSpecialization === '' || 
      doctor.specialization.includes(selectedSpecialization);

    return matchesSearch && matchesDepartment && matchesSpecialization;
  });

  const availableSpecializations = selectedDepartment
    ? mockDepartments.find(dept => dept.name === selectedDepartment)?.specializations || []
    : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Find Doctors</h1>
        
        {/* Search and Filter Bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedSpecialization('');
              }}
            >
              <option value="">All Departments</option>
              {mockDepartments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>

            {availableSpecializations.length > 0 && (
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                <option value="">All Specializations</option>
                {availableSpecializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            )}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center">
                <span className="text-sky-600 font-semibold text-lg">
                  {doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {doctor.firstName} {doctor.lastName}
                </h3>
                <p className="text-sm text-gray-600">{doctor.department}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {doctor.specialization.join(', ')}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                {doctor.experience} years experience
              </div>

              <div className="flex items-center">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {doctor.rating}
                  </span>
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({doctor.reviewCount} reviews)
                </span>
              </div>
            </div>

            {doctor.bio && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {doctor.bio}
              </p>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => onBookAppointment(doctor)}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 transition-colors"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};
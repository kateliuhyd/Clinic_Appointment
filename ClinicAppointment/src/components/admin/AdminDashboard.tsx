import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockDoctors, mockAppointments, mockDepartments } from '../../data/mockData';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Building, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const pendingDoctors = mockDoctors.filter(doc => !doc.isApproved);
  const approvedDoctors = mockDoctors.filter(doc => doc.isApproved);
  const totalAppointments = mockAppointments.length;
  const pendingAppointments = mockAppointments.filter(apt => apt.status === 'pending').length;

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">System overview and management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{mockDoctors.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900">{pendingDoctors.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{totalAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">{mockDepartments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Doctor Approvals */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Doctor Approvals</h2>
        {pendingDoctors.length > 0 ? (
          <div className="space-y-4">
            {pendingDoctors.map(doctor => (
              <div key={doctor.id} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-sky-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">
                      {doctor.firstName} {doctor.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{doctor.specialization.join(', ')}</p>
                    <p className="text-sm text-gray-500">License: {doctor.licenseNumber}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </button>
                  <button className="flex items-center px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700">
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <p className="text-gray-600">No pending doctor approvals</p>
          </div>
        )}
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h2>
          <div className="space-y-3">
            {mockDepartments.map(dept => {
              const deptDoctors = mockDoctors.filter(doc => doc.department === dept.name);
              const percentage = (deptDoctors.length / mockDoctors.length) * 100;
              
              return (
                <div key={dept.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                    <span className="text-sm text-gray-500">{deptDoctors.length} doctors</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-sky-600 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Doctor approved</p>
                <p className="text-xs text-gray-600">Dr. Johnson - Cardiology - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">New patient registered</p>
                <p className="text-xs text-gray-600">John Doe - 4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <Building className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Department updated</p>
                <p className="text-xs text-gray-600">Neurology specializations - 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return renderDashboard();
};
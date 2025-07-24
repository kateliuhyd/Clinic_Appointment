import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  Search,
  Shield,
  Building,
  Activity
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  isOpen = true, 
  onClose 
}) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'patient':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Activity },
          { id: 'find-doctors', label: 'Find Doctors', icon: Search },
          { id: 'appointments', label: 'My Appointments', icon: Calendar },
          { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
          { id: 'reviews', label: 'Reviews', icon: MessageSquare },
        ];
      case 'doctor':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Activity },
          { id: 'appointments', label: 'Appointments', icon: Calendar },
          { id: 'patients', label: 'Patients', icon: Users },
          { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
          { id: 'reviews', label: 'Reviews', icon: MessageSquare },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Activity },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'doctors', label: 'Doctors', icon: Shield },
          { id: 'departments', label: 'Departments', icon: Building },
          { id: 'appointments', label: 'Appointments', icon: Calendar },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-20"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 flex flex-col w-64 bg-white border-r border-gray-200 pt-16 transform transition-transform duration-300 ease-in-out z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          <nav className="flex-1 px-4 py-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose?.();
                  }}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                    ${activeTab === item.id 
                      ? 'bg-sky-50 text-sky-700 border-r-2 border-sky-500' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};
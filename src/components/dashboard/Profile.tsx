// src/components/dashboard/Profile.tsx
"use client"
import React from 'react';
import { Camera } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    avatar: null
  });

  const handleUpdate = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <p className="text-gray-600">Manage your profile information</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              {profileData.avatar ? (
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    handleUpdate('avatar', e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">Click to upload new photo</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {[
            { label: 'Name', field: 'name', type: 'text' },
            { label: 'Email', field: 'email', type: 'email' },
            { label: 'Phone', field: 'phone', type: 'tel' }
          ].map(({ label, field, type }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                value={profileData[field as keyof ProfileData]}
                onChange={(e) => handleUpdate(field as keyof ProfileData, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
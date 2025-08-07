import React, { useState } from 'react';

interface StructuredDataInputProps {
  onSubmit: (data: StructuredDataConfig) => void;
  isLoading?: boolean;
}

export interface StructuredDataConfig {
  businessName: string;
  businessType: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  website: string;
  openingHours: {
    [key: string]: string;
  };
  socialProfiles: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  description: string;
  priceRange?: string;
  paymentAccepted?: string[];
  servicesOffered?: string[];
}

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const PAYMENT_METHODS = [
  'Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'PayPal', 'Google Pay', 'PhonePe'
];

export const StructuredDataInput: React.FC<StructuredDataInputProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<StructuredDataConfig>({
    businessName: '',
    businessType: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India'
    },
    phone: '',
    email: '',
    website: '',
    openingHours: {},
    socialProfiles: {},
    description: '',
    priceRange: '',
    paymentAccepted: [],
    servicesOffered: []
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => {
        const parentValue = prev[parent as keyof StructuredDataConfig];
        if (typeof parentValue === 'object' && parentValue !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentValue,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayChange = (field: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">📊 Structured Data Configuration</h3>
        <p className="text-gray-600">
          Configure your business information for rich snippets and better search visibility.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Business Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Business Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Business Type *
            </label>
            <select
              required
              value={formData.businessType}
              onChange={(e) => handleInputChange('businessType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Business Type</option>
              <option value="Restaurant">Restaurant</option>
              <option value="LocalBusiness">Local Business</option>
              <option value="Store">Retail Store</option>
              <option value="ProfessionalService">Professional Service</option>
              <option value="HealthAndBeautyBusiness">Health & Beauty</option>
              <option value="AutoDealer">Auto Dealer</option>
              <option value="RealEstateAgent">Real Estate</option>
              <option value="LegalService">Legal Service</option>
              <option value="MedicalOrganization">Medical</option>
              <option value="EducationalOrganization">Educational</option>
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="contact@yourbusiness.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Website URL *
          </label>
          <input
            type="url"
            required
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://www.yourbusiness.com"
          />
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">📍 Business Address</h4>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              required
              value={formData.address.street}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123 Main Street"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                required
                value={formData.address.city}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mumbai"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                required
                value={formData.address.state}
                onChange={(e) => handleInputChange('address.state', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Maharashtra"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Postal Code *
              </label>
              <input
                type="text"
                required
                value={formData.address.postalCode}
                onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="400001"
              />
            </div>
          </div>
        </div>

        {/* Business Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business Description *
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your business, services, and what makes you unique..."
          />
        </div>

        {/* Advanced Options Toggle */}
        <div className="border-t pt-6">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            {showAdvanced ? '▼' : '▶'} Advanced Options (Optional)
          </button>
        </div>

        {showAdvanced && (
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
            {/* Opening Hours */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">🕒 Opening Hours</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DAYS_OF_WEEK.map(day => (
                  <div key={day}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {day}
                    </label>
                    <input
                      type="text"
                      value={formData.openingHours[day] || ''}
                      onChange={(e) => handleInputChange(`openingHours.${day}`, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="9:00 AM - 6:00 PM or Closed"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Social Profiles */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">🌐 Social Media Profiles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  value={formData.socialProfiles.facebook || ''}
                  onChange={(e) => handleInputChange('socialProfiles.facebook', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Facebook URL"
                />
                <input
                  type="url"
                  value={formData.socialProfiles.instagram || ''}
                  onChange={(e) => handleInputChange('socialProfiles.instagram', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Instagram URL"
                />
                <input
                  type="url"
                  value={formData.socialProfiles.twitter || ''}
                  onChange={(e) => handleInputChange('socialProfiles.twitter', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Twitter URL"
                />
                <input
                  type="url"
                  value={formData.socialProfiles.linkedin || ''}
                  onChange={(e) => handleInputChange('socialProfiles.linkedin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="LinkedIn URL"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={formData.priceRange || ''}
                onChange={(e) => handleInputChange('priceRange', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Price Range</option>
                <option value="$">$ (Budget-friendly)</option>
                <option value="$$">$$ (Moderate)</option>
                <option value="$$$">$$$ (Expensive)</option>
                <option value="$$$$">$$$$ (Very Expensive)</option>
              </select>
            </div>

            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Methods Accepted (comma-separated)
              </label>
              <input
                type="text"
                value={formData.paymentAccepted?.join(', ') || ''}
                onChange={(e) => handleArrayChange('paymentAccepted', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Cash, Credit Card, UPI, Net Banking"
              />
              <p className="text-sm text-gray-500 mt-1">
                Available: {PAYMENT_METHODS.join(', ')}
              </p>
            </div>

            {/* Services Offered */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Services Offered (comma-separated)
              </label>
              <input
                type="text"
                value={formData.servicesOffered?.join(', ') || ''}
                onChange={(e) => handleArrayChange('servicesOffered', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Web Design, SEO, Digital Marketing"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating Structured Data...
              </div>
            ) : (
              '🚀 Generate Structured Data'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
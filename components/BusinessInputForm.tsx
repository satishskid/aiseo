
import React, { useState, useMemo, useEffect } from 'react';
import type { InitialBrandInput, BrandData, SeoAudit } from '../types';
import { 
    INDUSTRY_OPTIONS, 
    SERVICE_MODEL_OPTIONS, 
    LOCATION_SCOPE_OPTIONS, 
    CITY_OPTIONS,
    baseButtonClasses,
    primaryButtonClasses,
    analyticsButtonClasses
} from '../constants';
import { BaselineAuditReport } from './BaselineAuditReport';


interface BusinessInputFormProps {
    isLoadingFoundation: boolean;
    isLoadingStrategy: boolean;
    onGenerateInitialAnalysis: (data: InitialBrandInput) => void;
    onConfirmAndGenerateStrategy: (data: BrandData) => void;
    foundationData: BrandData | null;
    seoAudit: SeoAudit | null;
    onToggleAnalytics: () => void;
    isDemoMode: boolean;
}

const inputClasses = "w-full py-[15px] px-5 border-2 border-gray-200 rounded-xl text-[15px] transition-all duration-300 bg-gray-50 focus:outline-none focus:border-brand-primary-start focus:bg-white focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] focus:-translate-y-px disabled:bg-gray-200 disabled:cursor-not-allowed";
const labelClasses = "block mb-2.5 font-bold text-gray-600 text-[15px]";
const textareaClasses = `${inputClasses} resize-y min-h-[140px]`;

export const BusinessInputForm: React.FC<BusinessInputFormProps> = ({ 
    isLoadingFoundation,
    isLoadingStrategy,
    onGenerateInitialAnalysis,
    onConfirmAndGenerateStrategy,
    foundationData,
    seoAudit,
    onToggleAnalytics,
    isDemoMode,
}) => {
    const [formData, setFormData] = useState<BrandData>({
        name: '', website: '', businessType: '', serviceType: '',
        locationScope: 'pan-india', specificLocations: '', selectedCities: [],
        linkedinHandle: '', twitterHandle: '', facebookHandle: '',
        description: '', targetCustomer: '', keyServices: '',
    });

    const [isFoundationGenerated, setIsFoundationGenerated] = useState(false);

    useEffect(() => {
        if (foundationData) {
            setFormData(foundationData);
            setIsFoundationGenerated(true);
        } else {
            setFormData({
                name: '', website: '', businessType: '', serviceType: '',
                locationScope: 'pan-india', specificLocations: '', selectedCities: [],
                linkedinHandle: '', twitterHandle: '', facebookHandle: '',
                description: '', targetCustomer: '', keyServices: '',
            });
            setIsFoundationGenerated(false);
        }
    }, [foundationData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const newCities = checked 
                ? [...prev.selectedCities, value] 
                : prev.selectedCities.filter(city => city !== value);
            return { ...prev, selectedCities: newCities };
        });
    };

    const handleGenerateClick = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.businessType) {
            alert('Please fill in Brand Name and Industry Focus to generate a foundation.');
            return;
        }
        onGenerateInitialAnalysis(formData);
    };
    
    const handleConfirmClick = (e: React.FormEvent) => {
        e.preventDefault();
         if (!formData.description || !formData.targetCustomer) {
            alert('Please ensure the generated fields are not empty before confirming.');
            return;
        }
        onConfirmAndGenerateStrategy(formData);
    };
    
    const showSpecificLocations = useMemo(() => {
        return formData.locationScope === 'specific-cities' || formData.locationScope === 'specific-states';
    }, [formData.locationScope]);

    const isLoading = isLoadingFoundation || isLoadingStrategy;

    return (
        <form className="space-y-6 relative">
             {isDemoMode && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                    <p className="text-lg font-bold text-brand-primary-start bg-white/80 p-4 rounded-lg shadow-lg">Demo Mode is Active</p>
                </div>
            )}
            {/* --- Stage 1: Initial Inputs --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className={labelClasses}>Brand/Business Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g., Skids Health, Greybrain.ai" required className={inputClasses} disabled={isFoundationGenerated || isDemoMode}/>
                </div>
                <div>
                    <label htmlFor="website" className={labelClasses}>Website URL</label>
                    <input type="url" id="website" name="website" value={formData.website} onChange={handleInputChange} placeholder="https://skids.health" className={inputClasses} disabled={isFoundationGenerated || isDemoMode}/>
                </div>
                 <div>
                    <label htmlFor="businessType" className={labelClasses}>Industry Focus *</label>
                    <select id="businessType" name="businessType" value={formData.businessType} onChange={handleInputChange} required className={inputClasses} disabled={isFoundationGenerated || isDemoMode}>
                        <option value="">Select Industry</option>
                        {INDUSTRY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="serviceType" className={labelClasses}>Service Model *</label>
                    <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleInputChange} required className={inputClasses} disabled={isFoundationGenerated || isDemoMode}>
                        <option value="">Select Service Type</option>
                        {SERVICE_MODEL_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                </div>
                 <div className="md:col-span-2">
                    <label className={labelClasses}>Social Media Handles (Optional)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input type="text" name="linkedinHandle" value={formData.linkedinHandle} onChange={handleInputChange} placeholder="LinkedIn Handle" className={inputClasses} disabled={isFoundationGenerated || isDemoMode} />
                        <input type="text" name="twitterHandle" value={formData.twitterHandle} onChange={handleInputChange} placeholder="X / Twitter Handle" className={inputClasses} disabled={isFoundationGenerated || isDemoMode} />
                        <input type="text" name="facebookHandle" value={formData.facebookHandle} onChange={handleInputChange} placeholder="Facebook Handle" className={inputClasses} disabled={isFoundationGenerated || isDemoMode} />
                    </div>
                </div>
            </div>
             <div>
                <label htmlFor="targetLocations" className={labelClasses}>Target Locations *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select id="locationScope" name="locationScope" value={formData.locationScope} onChange={handleInputChange} className={inputClasses} disabled={isFoundationGenerated || isDemoMode}>
                        {LOCATION_SCOPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    {showSpecificLocations && (
                         <input type="text" id="specificLocations" name="specificLocations" value={formData.specificLocations} onChange={handleInputChange} placeholder="e.g., Maharashtra, Karnataka or Pune, Nashik" className={inputClasses} disabled={isFoundationGenerated || isDemoMode} />
                    )}
                </div>
            </div>
            <div>
                <label className={labelClasses}>Primary Target Cities (Select all applicable)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {CITY_OPTIONS.map(city => (
                        <div key={city} className="flex items-center">
                            <input type="checkbox" id={city.toLowerCase()} value={city} checked={formData.selectedCities.includes(city)} onChange={handleCityChange} className="w-5 h-5 scale-125 text-brand-primary-start bg-gray-100 border-gray-300 rounded focus:ring-brand-primary-start disabled:cursor-not-allowed" disabled={isFoundationGenerated || isDemoMode}/>
                            <label htmlFor={city.toLowerCase()} className="ml-2 text-sm font-medium text-gray-700">{city}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Baseline SEO Audit Report --- */}
            {seoAudit && <BaselineAuditReport audit={seoAudit} />}


            {/* --- Stage 2: AI-Generated Content (Review & Edit) --- */}
            {isFoundationGenerated && (
                <div className="space-y-6 pt-6 border-t-2 border-dashed border-brand-primary-start/50 animate-contentAppear">
                    <div className="text-center bg-brand-primary-start/10 p-4 rounded-lg">
                        <p className="font-bold text-brand-primary-start">🤖 We've generated a business foundation for you. Please review and edit the text below as needed.</p>
                    </div>
                    <div>
                        <label htmlFor="description" className={labelClasses}>About Your Business (AI Generated) *</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required rows={5} className={textareaClasses} disabled={isDemoMode}></textarea>
                    </div>
                    <div>
                        <label htmlFor="targetCustomer" className={labelClasses}>Target Customer Persona (AI Generated) *</label>
                        <textarea id="targetCustomer" name="targetCustomer" value={formData.targetCustomer} onChange={handleInputChange} required rows={4} className={textareaClasses} disabled={isDemoMode}></textarea>
                    </div>
                    <div>
                        <label htmlFor="keyServices" className={labelClasses}>Key Services/Features (AI Generated)</label>
                        <textarea id="keyServices" name="keyServices" value={formData.keyServices} onChange={handleInputChange} rows={4} className={textareaClasses} disabled={isDemoMode}></textarea>
                    </div>
                </div>
            )}
            
            {/* --- Action Buttons --- */}
            <div className="flex flex-wrap gap-4 pt-4">
                {!isFoundationGenerated ? (
                    <button onClick={handleGenerateClick} className={`${baseButtonClasses} ${primaryButtonClasses}`} disabled={isLoadingFoundation || isDemoMode}>
                        {isLoadingFoundation ? 'Analyzing...' : '🤖 Generate Foundation & SEO Audit'}
                    </button>
                ) : (
                    <button onClick={handleConfirmClick} className={`${baseButtonClasses} ${primaryButtonClasses}`} disabled={isLoadingStrategy || isDemoMode}>
                        {isLoadingStrategy ? 'Generating Strategy...' : '✅ Confirm & Generate SEO Strategy'}
                    </button>
                )}
                 <button type="button" className={`${baseButtonClasses} ${analyticsButtonClasses}`} onClick={onToggleAnalytics}>
                    📊 Toggle Analytics
                </button>
            </div>
        </form>
    );
};

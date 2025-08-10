export interface DemoUser {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'demo';
  company?: string;
  industry?: string;
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@aiseo.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    company: 'AI SEO Platform',
    industry: 'Technology'
  },
  {
    id: '2', 
    username: 'healthcare_demo',
    password: 'health123',
    email: 'demo@healthplus.com',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    role: 'demo',
    company: 'HealthPlus Clinic',
    industry: 'Healthcare'
  },
  {
    id: '3',
    username: 'edtech_demo', 
    password: 'edu123',
    email: 'demo@edutech.com',
    firstName: 'Prof. Mike',
    lastName: 'Chen',
    role: 'demo',
    company: 'EduTech Solutions',
    industry: 'Education'
  },
  {
    id: '4',
    username: 'startup_demo',
    password: 'startup123', 
    email: 'demo@startup.com',
    firstName: 'Alex',
    lastName: 'Rodriguez',
    role: 'demo',
    company: 'TechStartup Inc',
    industry: 'Technology'
  },
  {
    id: '5',
    username: 'fitness_demo',
    password: 'fitness123',
    email: 'demo@fitnessstudio.com', 
    firstName: 'Emma',
    lastName: 'Wilson',
    role: 'demo',
    company: 'FitLife Studio',
    industry: 'Fitness'
  },
  {
    id: '6',
    username: 'restaurant_demo',
    password: 'food123',
    email: 'demo@restaurant.com',
    firstName: 'Chef Marco',
    lastName: 'Italian',
    role: 'demo', 
    company: 'Marco\'s Kitchen',
    industry: 'Food & Beverage'
  },
  {
    id: '7',
    username: 'finance_demo',
    password: 'finance123',
    email: 'demo@fintech.com',
    firstName: 'Jennifer',
    lastName: 'Smith',
    role: 'demo',
    company: 'FinTech Solutions',
    industry: 'Finance'
  },
  {
    id: '8', 
    username: 'ecommerce_demo',
    password: 'shop123',
    email: 'demo@ecommerce.com',
    firstName: 'David',
    lastName: 'Kumar',
    role: 'demo',
    company: 'ShopSmart Online',
    industry: 'E-commerce'
  },
  {
    id: '9',
    username: 'consulting_demo', 
    password: 'consult123',
    email: 'demo@consulting.com',
    firstName: 'Lisa',
    lastName: 'Anderson',
    role: 'demo',
    company: 'Business Consulting Pro',
    industry: 'Consulting'
  },
  {
    id: '10',
    username: 'realestate_demo',
    password: 'property123', 
    email: 'demo@realestate.com',
    firstName: 'Robert',
    lastName: 'Brown',
    role: 'demo',
    company: 'Premium Properties',
    industry: 'Real Estate'
  },
  // New requested hardcoded users
  {
    id: '11',
    username: 'drpratichi',
    password: 'pratichi123',
    email: 'drpratichi@healthcare.com',
    firstName: 'Dr. Pratichi',
    lastName: 'Sharma',
    role: 'demo',
    company: 'Advanced Medical Center',
    industry: 'Healthcare'
  },
  {
    id: '12',
    username: 'drsatish',
    password: 'satish123',
    email: 'drsatish@clinic.com',
    firstName: 'Dr. Satish',
    lastName: 'Kumar',
    role: 'demo',
    company: 'Elite Healthcare Clinic',
    industry: 'Healthcare'
  },
  {
    id: '13',
    username: 'raghab',
    password: 'raghab123',
    email: 'raghab@business.com',
    firstName: 'Raghab',
    lastName: 'Singh',
    role: 'demo',
    company: 'Strategic Business Solutions',
    industry: 'Consulting'
  },
  {
    id: '14',
    username: 'CMO1',
    password: 'cmo123',
    email: 'cmo1@marketing.com',
    firstName: 'Marketing',
    lastName: 'Chief',
    role: 'demo',
    company: 'Digital Marketing Agency',
    industry: 'Marketing'
  },
  {
    id: '15',
    username: 'CMO2',
    password: 'cmo123',
    email: 'cmo2@marketing.com',
    firstName: 'Brand',
    lastName: 'Manager',
    role: 'demo',
    company: 'Brand Solutions Co',
    industry: 'Marketing'
  },
  {
    id: '16',
    username: 'CMO3',
    password: 'cmo123',
    email: 'cmo3@marketing.com',
    firstName: 'Growth',
    lastName: 'Strategist',
    role: 'demo',
    company: 'Growth Marketing Hub',
    industry: 'Marketing'
  },
  {
    id: '17',
    username: 'CMO4',
    password: 'cmo123',
    email: 'cmo4@marketing.com',
    firstName: 'Content',
    lastName: 'Director',
    role: 'demo',
    company: 'Content Marketing Pro',
    industry: 'Marketing'
  },
  {
    id: '18',
    username: 'CMO5',
    password: 'cmo123',
    email: 'cmo5@marketing.com',
    firstName: 'Digital',
    lastName: 'Specialist',
    role: 'demo',
    company: 'Digital First Marketing',
    industry: 'Marketing'
  },
  {
    id: '19',
    username: 'CMO6',
    password: 'cmo123',
    email: 'cmo6@marketing.com',
    firstName: 'SEO',
    lastName: 'Expert',
    role: 'demo',
    company: 'SEO Masters Inc',
    industry: 'Marketing'
  },
  {
    id: '20',
    username: 'CMO7',
    password: 'cmo123',
    email: 'cmo7@marketing.com',
    firstName: 'Performance',
    lastName: 'Marketer',
    role: 'demo',
    company: 'Performance Marketing Ltd',
    industry: 'Marketing'
  },
  {
    id: '21',
    username: 'CMO8',
    password: 'cmo123',
    email: 'cmo8@marketing.com',
    firstName: 'Social',
    lastName: 'Manager',
    role: 'demo',
    company: 'Social Media Solutions',
    industry: 'Marketing'
  },
  {
    id: '22',
    username: 'CMO9',
    password: 'cmo123',
    email: 'cmo9@marketing.com',
    firstName: 'Campaign',
    lastName: 'Manager',
    role: 'demo',
    company: 'Campaign Excellence',
    industry: 'Marketing'
  },
  {
    id: '23',
    username: 'CMO10',
    password: 'cmo123',
    email: 'cmo10@marketing.com',
    firstName: 'Analytics',
    lastName: 'Director',
    role: 'demo',
    company: 'Marketing Analytics Pro',
    industry: 'Marketing'
  }
];

export const validateDemoUser = (username: string, password: string): DemoUser | null => {
  const user = DEMO_USERS.find(u => u.username === username && u.password === password);
  return user || null;
};

export const getDemoUserById = (id: string): DemoUser | null => {
  return DEMO_USERS.find(u => u.id === id) || null;
};

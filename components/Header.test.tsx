import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { describe, it, expect, vi } from 'vitest';
import type { Project } from '../types';
import type { DemoUser } from '../demoUsers';

const mockProject: Project | null = { id: '1', name: 'Test Project', businessInput: { name: '', website: '', type: '', cities: '', linkedin: '', twitter: '', facebook: '' }, performanceInput: { kpis: [], baseline: {} }, structuredDataInput: { schemas: [] }, finalActions: { integrations: [], downloads: [] }, seoStrategy: {} };
const mockUser: DemoUser | null = { id: '1', username: 'testuser', firstName: 'Test', lastName: 'User', company: 'Test Inc.', industry: 'Testing' };

describe('Header', () => {
  it('renders the header with the main title and key buttons', () => {
    render(
      <Header
        onManageApiKeys={vi.fn()}
        onManageProjects={vi.fn()}
        onOpenUserManual={vi.fn()}
        onSignOut={vi.fn()}
        currentProject={mockProject}
        currentUser={mockUser}
      />
    );

    // Check for the main title
    expect(screen.getByText('AI Scientific SEO Marketing Platform')).toBeInTheDocument();

    // Check for a few key buttons
    expect(screen.getByTitle('Open User Manual')).toBeInTheDocument();
    expect(screen.getByTitle('Manage API Keys')).toBeInTheDocument();
    expect(screen.getByTitle('Sign Out')).toBeInTheDocument();
  });
});

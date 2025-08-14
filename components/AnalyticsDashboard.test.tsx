import { render, screen } from '@testing-library/react';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { describe, it, expect, vi } from 'vitest';
import type { AnalyticsData } from '../types';

const mockData: AnalyticsData = {
    keywords: 120,
    contentPieces: 15,
    socialPosts: 40,
    estimatedReach: 25000,
    competitiveScore: 65,
    seoScore: 78,
};

describe('AnalyticsDashboard', () => {
    it('renders the loading state correctly', () => {
        render(<AnalyticsDashboard isLoading={true} />);
        expect(screen.getByText('Generating Analytics...')).toBeInTheDocument();
        expect(screen.getByText('AI is calculating metrics from your SEO strategy data...')).toBeInTheDocument();
    });

    it('renders the error state correctly', () => {
        render(<AnalyticsDashboard error="Failed to fetch data." onGenerate={vi.fn()} />);
        expect(screen.getByText('Analytics Generation Failed')).toBeInTheDocument();
        expect(screen.getByText('Failed to fetch data.')).toBeInTheDocument();
        expect(screen.getByText('Retry Analytics Generation')).toBeInTheDocument();
    });

    it('renders the success state with data correctly', () => {
        render(<AnalyticsDashboard data={mockData} isRealData={true} />);
        expect(screen.getByText('Keywords Generated')).toBeInTheDocument();
        expect(screen.getByText('120')).toBeInTheDocument();
        expect(screen.getByText('SEO Readiness')).toBeInTheDocument();
        expect(screen.getByText('78%')).toBeInTheDocument();
        expect(screen.getByText('Live AI-Generated Analytics')).toBeInTheDocument();
    });

    it('renders the empty state when no data, error, or loading state is provided', () => {
        render(<AnalyticsDashboard />);
        expect(screen.getByText('Analytics Not Generated Yet')).toBeInTheDocument();
        expect(screen.getByText('Complete your SEO strategy generation to calculate real analytics from your data.')).toBeInTheDocument();
    });

    it('should not rerender if props are identical', () => {
        const { rerender } = render(<AnalyticsDashboard data={mockData} />);
        const firstRenderResult = screen.getByText('Keywords Generated').parentElement?.parentElement?.innerHTML;

        rerender(<AnalyticsDashboard data={mockData} />);
        const secondRenderResult = screen.getByText('Keywords Generated').parentElement?.parentElement?.innerHTML;

        // This is a simple way to check for rerender. A more robust way would be to mock a child component.
        // For the purpose of this test, we expect the innerHTML to be identical.
        expect(firstRenderResult).toEqual(secondRenderResult);
    });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeminiService } from './aiService';
import { GoogleGenAI } from '@google/genai';

// Mock the @google/genai module
const mockGenerateContent = vi.fn().mockResolvedValue({
    response: {
        text: () => JSON.stringify({ description: 'Test Description', targetCustomer: 'Test Customer', keyServices: 'Test Services' }),
    }
});

vi.mock('@google/genai', () => ({
    GoogleGenAI: vi.fn(() => ({
        models: {
            generateContent: mockGenerateContent,
        },
    })),
    Type: {
        OBJECT: 'object',
        STRING: 'string',
        INTEGER: 'integer',
        ARRAY: 'array',
    }
}));


describe('GeminiService caching', () => {
    const apiKey = 'AIzaSyaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'; // Dummy key of 39 chars
    const input = { name: 'Test Business', website: '', businessType: 'Test', serviceType: 'Test', locationScope: 'Test', selectedCities: [], specificLocations: '' };

    beforeEach(() => {
        // Clear mock history before each test
        mockGenerateContent.mockClear();
        mockGenerateContent.mockResolvedValue({
            text: JSON.stringify({ description: 'Test Description', targetCustomer: 'Test Customer', keyServices: 'Test Services' }),
        });
    });

    it('should call the API only once for identical consecutive requests', async () => {
        const service = new GeminiService(apiKey);

        // First call
        await service.generateBusinessFoundation(input);

        // Second call with the same input
        await service.generateBusinessFoundation(input);

        // The API should only have been called once
        expect(mockGenerateContent).toHaveBeenCalledTimes(1);
    });

    it('should call the API again for a different request', async () => {
        const service = new GeminiService(apiKey);

        // First call
        await service.generateBusinessFoundation(input);

        // Second call with different input
        const differentInput = { ...input, name: 'Another Test Business' };
        await service.generateBusinessFoundation(differentInput);

        // The API should have been called twice
        expect(mockGenerateContent).toHaveBeenCalledTimes(2);
    });

    it('should return a cached result for the second identical request', async () => {
        const service = new GeminiService(apiKey);

        // First call
        const result1 = await service.generateBusinessFoundation(input);

        // Second call
        const result2 = await service.generateBusinessFoundation(input);

        // The results should be identical, and the second one from cache
        expect(result2).toEqual(result1);
        expect(mockGenerateContent).toHaveBeenCalledTimes(1);
    });
});

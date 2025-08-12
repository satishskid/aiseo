import type { ApiKeys, ApiProviderId } from '../types';

export interface AITaskConfig {
  preferredProvider?: ApiProviderId;
  fallbackProviders?: ApiProviderId[];
  taskType: string;
}

export class SmartAIRouter {
  private static providerStrengths: Record<ApiProviderId, string[]> = {
    gemini: ['seo-audit', 'content-strategy', 'keyword-research'],
    groq: ['content-generation', 'social-posts', 'quick-analysis'],
    claude: ['technical-seo', 'conversion-optimization', 'detailed-analysis'],
    openai: ['general-content', 'creative-writing', 'summarization'],
    openrouter: ['specialized-tasks', 'advanced-reasoning', 'complex-analysis']
  };

  static getOptimalProvider(taskType: string, apiKeys: ApiKeys): {
    providerId: ApiProviderId;
    confidence: number;
  } {
    // Find providers that have API keys
    const availableProviders = (Object.entries(apiKeys) as [ApiProviderId, string][])
      .filter(([_, key]) => key && key.trim() !== '')
      .map(([providerId]) => providerId);

    if (availableProviders.length === 0) {
      throw new Error('No API keys configured');
    }

    // Simple provider selection based on task type
    const taskProviderMap: Record<string, ApiProviderId> = {
      'seo-audit': 'gemini',
      'content-strategy': 'gemini', 
      'keyword-research': 'gemini',
      'content-generation': 'groq',
      'social-posts': 'groq',
      'technical-seo': 'claude',
      'conversion-optimization': 'claude'
    };

    const preferredProvider = taskProviderMap[taskType];
    
    if (preferredProvider && availableProviders.includes(preferredProvider)) {
      return { providerId: preferredProvider, confidence: 0.9 };
    }

    // Fallback to first available provider
    return { providerId: availableProviders[0], confidence: 0.5 };
  }

  static getTaskRecommendations(apiKeys: ApiKeys): Array<{
    taskType: string;
    recommendedProvider: ApiProviderId;
    confidence: number;
  }> {
    const tasks = ['seo-audit', 'content-strategy', 'keyword-research', 'content-generation'];
    
    return tasks.map(taskType => {
      const result = this.getOptimalProvider(taskType, apiKeys);
      return {
        taskType,
        recommendedProvider: result.providerId,
        confidence: result.confidence
      };
    });
  }

  static getProviderUtilization(apiKeys: ApiKeys): Record<string, {
    usage: number;
    efficiency: number;
  }> {
    const availableProviders = (Object.entries(apiKeys) as [ApiProviderId, string][])
      .filter(([_, key]) => key && key.trim() !== '')
      .map(([providerId]) => providerId);

    const utilization: Record<string, { usage: number; efficiency: number }> = {};
    
    availableProviders.forEach(providerId => {
      utilization[providerId] = {
        usage: Math.random() * 100, // Mock usage data
        efficiency: Math.random() * 100 // Mock efficiency data
      };
    });

    return utilization;
  }
}
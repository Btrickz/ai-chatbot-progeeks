import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
  LanguageModelV1,
} from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

console.log(
  '🔑 [providers.ts] API Key at runtime:',
  process.env.OPENAI_API_KEY,
);

function openAIModel(modelId: string): LanguageModelV1 {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('❌ OPENAI_API_KEY is missing in environment variables.');
  }

  const factory = createOpenAI({ apiKey });

  return factory(modelId); // ✅ Correct usage
}

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openAIModel('gpt-3.5-turbo'),
        'chat-model-reasoning': openAIModel('gpt-4'),
        'title-model': openAIModel('gpt-3.5-turbo'),
        'artifact-model': openAIModel('gpt-3.5-turbo'),
      },
    });

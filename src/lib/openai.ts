import OpenAI from 'openai';

// Validate environment variables
if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
  throw new Error('VITE_OPENROUTER_API_KEY is not defined in environment variables');
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': import.meta.env.VITE_SITE_URL || 'https://nextskill.app',
    'X-Title': import.meta.env.VITE_SITE_NAME || 'NextSkill',
  },
  dangerouslyAllowBrowser: true // Allow browser usage
});

export interface GeneratedRoadmap {
  id: string;
  name: string;
  description: string;
  items: {
    id: string;
    title: string;
    description: string;
    timeEstimate: string;
    order: number;
    resources: string[];
  }[];
}

interface RoadmapResponse {
  name: string;
  description: string;
  items: Array<{
    title: string;
    description: string;
    timeEstimate: string;
    resources: string[];
  }>;
}

export async function generateRoadmap(skillName: string, additionalPrompt?: string): Promise<GeneratedRoadmap> {
  const prompt = `Create a detailed learning roadmap for ${skillName}.
${additionalPrompt ? `Additional requirements: ${additionalPrompt}` : ''}

Please provide a structured response in the following JSON format:
{
  "name": "Learning ${skillName}",
  "description": "A comprehensive roadmap to master ${skillName}",
  "items": [
    {
      "title": "Step title",
      "description": "Detailed description of what to learn",
      "timeEstimate": "Estimated time (e.g., '2 weeks')",
      "resources": ["Resource 1", "Resource 2"]
    }
  ]
}

Make sure to:
1. Break down the learning path into logical steps
2. Include practical exercises and projects
3. Provide time estimates for each step
4. Suggest relevant learning resources
5. Keep descriptions concise but informative`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct', // Using Mistral model which is more reliable
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI that creates detailed learning roadmaps in JSON format. Always respond with valid JSON that matches the requested format exactly.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    if (!completion.choices || !completion.choices[0]?.message?.content) {
      throw new Error('Invalid response format from AI');
    }

    const response = completion.choices[0].message.content;
    
    try {
      const parsedResponse = JSON.parse(response.trim()) as RoadmapResponse;
      
      // Validate the response structure
      if (!parsedResponse.name || !parsedResponse.description || !Array.isArray(parsedResponse.items)) {
        throw new Error('Invalid response structure from AI');
      }

      // Add IDs and order to items
      const roadmap: GeneratedRoadmap = {
        id: crypto.randomUUID(),
        name: parsedResponse.name.replace(/^Learning\s+/i, ''), // Remove "Learning" from the name
        description: parsedResponse.description,
        items: parsedResponse.items.map((item, index) => ({
          ...item,
          id: crypto.randomUUID(),
          order: index + 1,
        })),
      };

      return roadmap;
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw response:', response);
      throw new Error('Failed to parse AI response. The response was not in the expected format.');
    }
  } catch (error) {
    console.error('Error generating roadmap:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate roadmap: ${error.message}`);
    }
    throw new Error('Failed to generate roadmap. Please try again.');
  }
}
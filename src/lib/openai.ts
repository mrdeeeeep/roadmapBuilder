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
  totalTime: string;
  items: {
    id: string;
    title: string;
    description: string;
    timeEstimate: string;
    order: number;
    resources: string[];
    difficulty?: string;
    prerequisites?: string[];
    expectedOutcome?: string;
    subtasks?: {
      id: string;
      title: string;
      description: string;
      timeEstimate: string;
      difficulty?: string;
      expectedOutcome?: string;
    }[];
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
    difficulty?: string;
    prerequisites?: string[];
    expectedOutcome?: string;
    subtasks?: Array<{
      title: string;
      description: string;
      timeEstimate: string;
      difficulty?: string;
      expectedOutcome?: string;
    }>;
  }>;
}

export async function generateRoadmap(skillName: string, additionalPrompt?: string): Promise<GeneratedRoadmap> {
  const prompt = `Create a highly detailed and comprehensive learning roadmap for ${skillName}.
${additionalPrompt ? `Additional requirements: ${additionalPrompt}` : ''}

Please provide a structured response in the following JSON format:
{
  "name": "Learning ${skillName}",
  "description": "A comprehensive roadmap to master ${skillName}, including practical applications and real-world scenarios.",
  "items": [
    {
      "title": "Step title",
      "description": "Detailed description of what to learn, including specific concepts, techniques, and practical applications.",
      "timeEstimate": "Estimated time (e.g., '2 weeks')",
      "difficulty": "Beginner/Intermediate/Advanced",
      "prerequisites": ["Prerequisite 1", "Prerequisite 2"],
      "expectedOutcome": "What the learner will achieve after completing this step.",
      "subtasks": [
        {
          "title": "Subtask title",
          "description": "Detailed description of the subtask, including specific exercises, projects, or resources to complete.",
          "timeEstimate": "Estimated time (e.g., '2 hours')",
          "difficulty": "Beginner/Intermediate/Advanced",
          "expectedOutcome": "What the learner will achieve after completing this subtask."
        }
      ],
      "resources": ["Resource 1", "Resource 2"]
    }
  ]
}

Make sure to:
1. Break down the learning path into **at least 5-10 steps** and subtasks.
2. Include practical exercises, projects, and real-world applications.
3. Provide time estimates, difficulty levels, prerequisites, and expected outcomes for each step and subtask.
4. Suggest relevant learning resources (e.g., books, articles, videos, or courses).
5. Keep descriptions detailed and informative, focusing on actionable learning outcomes.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct', // Using Mistral model which is more reliable
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI that creates highly detailed learning roadmaps in JSON format. Always respond with valid JSON that matches the requested format exactly.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000, // Increased max tokens to allow for more detailed responses
    });

    if (!completion.choices || !completion.choices[0]?.message?.content) {
      throw new Error('Invalid response format from AI');
    }

    const response = completion.choices[0].message.content;

    // Check if the response is complete
    if (!response.trim().endsWith('}')) {
      console.error('Truncated AI response:', response);
      throw new Error('The AI response was truncated. Please try again.');
    }

    try {
      const parsedResponse = JSON.parse(response.trim()) as RoadmapResponse;

      console.log('Generated roadmap response:', parsedResponse); // Debugging log

      // Validate the response structure
      if (!parsedResponse.name || !parsedResponse.description || !Array.isArray(parsedResponse.items)) {
        throw new Error('Invalid response structure from AI');
      }

      // Helper function to parse time estimates
      const parseTimeEstimate = (timeEstimate: string): number => {
        const hoursMatch = timeEstimate.match(/(\d+)\s*hours?/i);
        const daysMatch = timeEstimate.match(/(\d+)\s*days?/i);
        const weeksMatch = timeEstimate.match(/(\d+)\s*weeks?/i);

        let totalHours = 0;
        if (hoursMatch) totalHours += parseInt(hoursMatch[1], 10);
        if (daysMatch) totalHours += parseInt(daysMatch[1], 10) * 24; // 1 day = 24 hours
        if (weeksMatch) totalHours += parseInt(weeksMatch[1], 10) * 24 * 7; // 1 week = 7 days

        return totalHours;
      };

      // Calculate total time in hours
      const totalTimeInHours = parsedResponse.items.reduce((total, item) => {
        const itemTime = parseTimeEstimate(item.timeEstimate);
        const subtaskTime = item.subtasks?.reduce((subTotal, subtask) => {
          return subTotal + parseTimeEstimate(subtask.timeEstimate);
        }, 0) || 0;
        return total + itemTime + subtaskTime;
      }, 0);

      // Convert total time to a readable format (e.g., "X months Y weeks Z days")
      const totalDays = Math.floor(totalTimeInHours / 24);
      const months = Math.floor(totalDays / 30); // Assume 1 month = 30 days
      const remainingDaysAfterMonths = totalDays % 30;
      const weeks = Math.floor(remainingDaysAfterMonths / 7);
      const remainingDays = remainingDaysAfterMonths % 7;
      const totalTime = `${months} months ${weeks} weeks ${remainingDays} days`;

      // Add IDs and order to items
      const roadmap: GeneratedRoadmap = {
        id: crypto.randomUUID(),
        name: parsedResponse.name.replace(/^Learning\s+/i, ''), // Remove "Learning" from the name
        description: parsedResponse.description,
        totalTime, // Add total time in readable format
        items: parsedResponse.items.map((item, index) => ({
          ...item,
          id: crypto.randomUUID(),
          order: index + 1,
          subtasks: item.subtasks?.map((subtask) => ({
            ...subtask,
            id: crypto.randomUUID(),
          })) || [],
        })),
      };

      console.log('Final roadmap object to save:', roadmap); // Debugging log

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
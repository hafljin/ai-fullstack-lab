import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// We initialize mostly on demand to handle key issues gracefully, 
// but here we follow instructions to init with process.env
const ai = new GoogleGenAI({ apiKey });

export const checkUserCode = async (
  topicTitle: string,
  practicePrompt: string,
  userCode: string
): Promise<{ isCorrect: boolean; feedback: string }> => {
  if (!apiKey) {
     // APIキーがない
    return {
      isCorrect: false,
      feedback: "API Key is missing. I cannot evaluate your code without it."
    };
  }

  const prompt = `
    You are a strict but helpful Kotlin programming tutor.
    Topic: ${topicTitle}
    Task: ${practicePrompt}
    
    User Code:
    \`\`\`kotlin
    ${userCode}
    \`\`\`
    
    Evaluate the user's code. 
    1. Does it compile/run logically without major syntax errors?
    2. Does it solve the specific task?
    
    Return a JSON object with this structure (do not use Markdown, just raw JSON):
    {
      "isCorrect": boolean,
      "feedback": "string (short, concise feedback, max 3 sentences. If incorrect, hint at the solution without giving it away fully)"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const result = JSON.parse(text);
    return result;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      isCorrect: false,
      feedback: "I encountered an error trying to check your code. Please check your internet connection or API key."
    };
  }
};

export const explainConcept = async (query: string, codeContext?: string): Promise<string> => {
  if (!apiKey) return "Please configure your API Key to use the AI Tutor.";

  const prompt = `
    You are a helpful Computer Science teaching assistant.
    User Question: ${query}
    ${codeContext ? `Context Code:\n${codeContext}` : ''}
    
    Provide a brief, clear explanation suitable for a mobile screen (under 150 words). Format with Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I couldn't generate an explanation right now.";
  }
};

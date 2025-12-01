import { GoogleGenAI } from "@google/genai";
import { CodeReadingLanguage, ExperienceLevel, CodeReadingProblem } from '../types';

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

// Code Reading Feature Functions

export const generateCodeReadingProblem = async (
  language: CodeReadingLanguage,
  level: ExperienceLevel,
  problemIndex: number,
  isJapanese: boolean
): Promise<CodeReadingProblem | null> => {
  if (!apiKey) {
    return null;
  }

  const levelDescriptions = {
    beginner: 'simple, 5-15 lines, basic concepts like variables, loops, conditionals',
    intermediate: 'moderate complexity, 15-30 lines, functions, classes, data structures',
    advanced: 'complex, 30-50 lines, advanced patterns, algorithms, error handling'
  };

  const prompt = `
    Generate a code reading comprehension problem for ${language} at ${level} level.
    Level description: ${levelDescriptions[level]}
    
    Create a realistic code snippet that a programmer might encounter in real work.
    The code should be self-contained and demonstrate important concepts.
    
    Return a JSON object with this structure:
    {
      "code": "string (the complete code snippet)",
      "question": "string (in English: ask the user to explain what this code does, what is its purpose, what are the key concepts used)",
      "questionJa": "string (same question in Japanese)",
      "correctExplanation": "string (in English: a comprehensive explanation of what the code does)",
      "correctExplanationJa": "string (same explanation in Japanese)"
    }
    
    Make sure:
    1. The code is syntactically correct for ${language}
    2. The code demonstrates real-world patterns
    3. The question asks for understanding, not just line-by-line description
    4. The explanation covers: purpose, key concepts, flow, and any important patterns used
    
    ${isJapanese ? 'Prioritize clear Japanese explanations.' : ''}
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
    return {
      id: `cr-${language}-${level}-${Date.now()}-${problemIndex}`,
      language,
      level,
      code: result.code,
      question: result.question,
      questionJa: result.questionJa,
      correctExplanation: result.correctExplanation,
      correctExplanationJa: result.correctExplanationJa
    };
  } catch (error) {
    console.error("Gemini Error generating problem:", error);
    return null;
  }
};

export const evaluateCodeReadingAnswer = async (
  problem: CodeReadingProblem,
  userAnswer: string,
  isJapanese: boolean
): Promise<{ score: number; feedback: string }> => {
  if (!apiKey) {
    return {
      score: 0,
      feedback: isJapanese 
        ? "APIキーがありません。回答を評価できません。" 
        : "API Key is missing. Cannot evaluate your answer."
    };
  }

  const prompt = `
    You are a programming education expert evaluating a student's code reading comprehension.
    
    Code:
    \`\`\`${problem.language}
    ${problem.code}
    \`\`\`
    
    Question: ${isJapanese && problem.questionJa ? problem.questionJa : problem.question}
    
    Correct Explanation: ${isJapanese && problem.correctExplanationJa ? problem.correctExplanationJa : problem.correctExplanation}
    
    Student's Answer: ${userAnswer}
    
    Evaluate the student's answer based on:
    1. Understanding of the code's purpose (30%)
    2. Identification of key concepts and patterns (30%)
    3. Explanation of the code flow/logic (25%)
    4. Technical accuracy (15%)
    
    Return a JSON object:
    {
      "score": number (0-100, where 80+ is considered passing),
      "feedback": "string (${isJapanese ? 'in Japanese' : 'in English'}: 2-3 sentences explaining what was good and what could be improved. Be encouraging but honest.)"
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
    return {
      score: Math.min(100, Math.max(0, Number(result.score) || 0)),
      feedback: result.feedback || (isJapanese ? "評価を生成できませんでした。" : "Could not generate feedback.")
    };
  } catch (error) {
    console.error("Gemini Error evaluating answer:", error);
    return {
      score: 0,
      feedback: isJapanese 
        ? "回答の評価中にエラーが発生しました。" 
        : "Error occurred while evaluating your answer."
    };
  }
};

export const getHintForProblem = async (
  problem: CodeReadingProblem,
  isJapanese: boolean
): Promise<string> => {
  if (!apiKey) {
    return isJapanese 
      ? "APIキーがありません。ヒントを生成できません。" 
      : "API Key is missing. Cannot generate hint.";
  }

  const prompt = `
    You are a programming tutor helping a student understand code.
    
    Code:
    \`\`\`${problem.language}
    ${problem.code}
    \`\`\`
    
    Question: ${isJapanese && problem.questionJa ? problem.questionJa : problem.question}
    
    Provide a helpful hint that guides the student toward understanding without giving away the full answer.
    Focus on:
    - Key concepts to look for
    - Important patterns in the code
    - Questions the student should ask themselves
    
    ${isJapanese ? 'Respond in Japanese.' : 'Respond in English.'}
    Keep it under 100 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || (isJapanese ? "ヒントを生成できませんでした。" : "Could not generate hint.");
  } catch (error) {
    console.error("Gemini Error generating hint:", error);
    return isJapanese 
      ? "ヒントの生成中にエラーが発生しました。" 
      : "Error occurred while generating hint.";
  }
};

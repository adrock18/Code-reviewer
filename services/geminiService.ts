
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelName = 'gemini-2.5-flash';

/**
 * Analyzes a given code string using the Gemini API.
 * @param code The source code to be reviewed.
 * @returns A promise that resolves to a string containing the code review report.
 */
export async function reviewCode(code: string): Promise<string> {
  const prompt = `
    You are an expert code reviewer. Analyze the following code for readability, modularity, performance, best practices, and potential bugs. 
    Provide a comprehensive review with clear, actionable suggestions for improvement.
    Structure your response in Markdown format. Use headings for different sections (e.g., ## Readability, ## Best Practices).
    Use code blocks for examples of improved code.

    Here is the code to review:
    ---
    \`\`\`
    ${code}
    \`\`\`
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    
    if (response && response.text) {
      return response.text;
    } else {
      throw new Error("Received an empty or invalid response from the Gemini API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get code review from the AI assistant.");
  }
}

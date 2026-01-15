import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getImpactStory = async (foodItem: string): Promise<string> => {
    const ai = getClient();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `The user has entered a food item that is typically wasted: "${foodItem}".
            
            TASK: Act as a poetic, observational narrator.
            GOAL: Describe the human moment of this food being shared instead of wasted.
            
            STRICT RULES:
            - Do NOT use statistics, numbers, or percentages.
            - Do NOT mention "saving the planet" or "carbon footprint".
            - Focus ONLY on the human sensation: warmth, relief, taste, dignity.
            - Maximum 2 sentences.
            - Tone: Quiet, dignified, hopeful.
            
            Example Input: "Leftover Sandwiches"
            Example Output: "A surprise lunch for three strangers who become neighbors over shared bread. The quiet relief of a full stomach."`,
        });
        
        return response.text || "Shared food is the oldest form of community.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "The impact is greater than the sum of its calories. It is dignity.";
    }
};
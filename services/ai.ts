import { GoogleGenAI } from "@google/genai";

/**
 * Gera uma imagem de alta qualidade para um prato baseada no nome e descrição,
 * utilizando o Google Search para garantir precisão visual.
 */
export const generateDishImage = async (name: string, description: string): Promise<string | null> => {
  try {
    // Inicializa a instância do Gemini dentro da função para usar a API Key mais recente
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Prompt otimizado que solicita explicitamente o uso de referências visuais do Google Search
    const prompt = `Use Google Search to find visual references for the dish "${name}" (${description}). 
    Generate a high-end, photorealistic food photography image of this dish based on the real-world references found.
    Style: Michelin star plating, dramatic lighting, dark background, 8k resolution, elegant presentation.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        tools: [{ googleSearch: {} }], // Habilita o Google Search para grounding
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      }
    });

    // Extrai a imagem em base64 da resposta (o modelo pode retornar texto e imagem, iteramos para achar a imagem)
    if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64String = part.inlineData.data;
                return `data:image/png;base64,${base64String}`;
            }
        }
    }

    return null;
  } catch (error) {
    console.error("Erro ao gerar imagem com IA e Google Search:", error);
    return null;
  }
};
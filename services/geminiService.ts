import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `أنت GameGenie، مساعد ذكي لموقع "GameTop Hub" لشحن الألعاب.
هدفك مساعدة المستخدمين في أسئلتهم حول شحن الألعاب مثل فري فاير، ببجي، فيفا، بيس، وغيرها.
تحدث باللغة العربية فقط.
العملة المستخدمة في الموقع هي الدرهم المغربي (MAD).
جميع العروض في الموقع تتطلب الدخول للحساب (شحن حساب) وليس عن طريق المعرف (ID).
كن ودوداً ومختصراً.
إذا سألك أحد عن الأسعار، اطلب منه التحقق من بطاقة اللعبة في الصفحة الرئيسية.
لا تقدم روابط دفع وهمية. دائماً شجعهم على استخدام زر "إتمام الطلب" في الموقع.
`;

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', text: string}[]) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "خطأ في الاتصال. يرجى المحاولة لاحقاً.";
  }
};
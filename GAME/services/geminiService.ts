import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;
let currentApiKey: string | null = null;

export const initializeGemini = (apiKey: string) => {
  if (!apiKey) return;
  
  // Reset if key changed
  if (currentApiKey !== apiKey) {
    chatSession = null;
    currentApiKey = apiKey;
  }
};

export const sendMessageToGemini = async (message: string, apiKey: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("لطفا ابتدا کلید API را در پنل مدیریت وارد کنید.");
  }

  try {
    if (!chatSession) {
      const ai = new GoogleGenAI({ apiKey });
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: `
            شما یک دستیار هوشمند دینی و اسلامی هستید.
            نام شما "نور" است.
            وظیفه شما پاسخگویی به سوالات کاربران فقط و فقط در حیطه دین اسلام، قرآن، احادیث، احکام شرعی و اخلاق اسلامی است.
            اگر کاربر سوالی خارج از این حیطه پرسید (مثلا ریاضی، برنامه نویسی، سیاست غیر مرتبط، و غیره)، با احترام و ادبیات زیبا بگویید که فقط می‌توانید به سوالات دینی پاسخ دهید.
            پاسخ‌های شما باید کوتاه، دقیق، با استناد به منابع معتبر (در صورت نیاز) و با لحنی مهربان و محترمانه باشد.
            زبان پاسخگویی فارسی است.
          `,
          temperature: 0.7,
        },
      });
    }

    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "پاسخی دریافت نشد.";

  } catch (error: any) {
    console.error("Gemini Error:", error);
    // Reset session on error to allow retry with fresh state if needed
    chatSession = null; 
    throw new Error("خطا در ارتباط با سرور. لطفا اتصال اینترنت یا کلید API را بررسی کنید.");
  }
};

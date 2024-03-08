const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "YOUR_API_KEY";
  
  async function runChat() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "consider my food diet for weight gain from body weight 50  to 60 also daily planned calories to increase weight is 2500 and give a min a line or max 2 line suggestion or opinion about my diet "}],
        },
        {
          role: "model",
          parts: [{ text: "**Suggested Diet:**\n\n* Increase protein intake to 1.6-2.2 grams per kilogram of body weight (120-165 grams per day)\n* Consume nutrient-rich carbohydrates from whole grains, fruits, and vegetables\n* Include healthy fats from sources like olive oil, avocados, and nuts\n\n**Calorie Allocation:**\n\n* Breakfast: 500-600 calories\n* Lunch: 600-700 calories\n* Dinner: 700-800 calories\n* Snacks: 400-500 calories"}],
        },
        {
          role: "user",
          parts: [{ text: "consider my food diet for weight loss from body weight 70  to 60 also daily planned calories to increase weight is 2100 and give a min a line or max 2 line suggestion or opinion about my diet "}],
        },
        {
          role: "model",
          parts: [{ text: "**Suggested Diet:**\n\n* Focus on nutrient-dense, low-calorie foods such as fruits, vegetables, lean protein, and whole grains.\n* Limit processed foods, sugary drinks, and unhealthy fats.\n\n**Calorie Allocation:**\n\n* Breakfast: 350-400 calories\n* Lunch: 450-500 calories\n* Dinner: 600-650 calories\n* Snacks: 300-400 calories\n\n**Additional Recommendations:**\n\n* Aim for a calorie deficit of 500-750 calories per day.\n* Engage in regular physical activity to support weight loss and improve overall health."}],
        },
      ],
    });
  
    const result = await chat.sendMessage("YOUR_USER_INPUT");
    const response = result.response;
    console.log(response.text());
  }
  
  runChat();
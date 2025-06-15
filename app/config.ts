export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  cors: {
    origin: process.env.FRONTEND_URL || 'https://nouvo.dev',
  }
}; 
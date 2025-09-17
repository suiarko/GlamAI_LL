🚀 GlamAI - AI Hairstyle Transformation MVP
An MVP for an AI-powered hairstyle transformation app. Upload your photo, choose a style, and get instant, high-quality results.
🎯 Core Goal
This project aims to validate the core hypothesis: Users are willing to pay for a fast, simple, and high-quality AI hairstyle transformation service.
Key Features
✅ Modern Landing Page: Hero section, features, examples, and pricing.
✅ Simple 3-Step Process: Upload → Choose Style → Get Result.
✅ Freemium Model: 3 free transformations to showcase value before upgrading.
✅ Responsive & Mobile-First: Designed for a seamless experience on any device.
🚀 Quick Start Guide
To get the project running locally, follow these steps:
# 1. Clone the repository
git clone [https://github.com/suiarko/glamai_ll.git](https://github.com/suiarko/glamai_ll.git)

# 2. Navigate to the project directory
cd glamai_ll

# 3. Install dependencies
npm install

# 4. Set up environment variables
# (Copy the example file and fill in your keys)
cp env.example .env.local

# 5. Run the development server
npm run dev


The app will be available at http://localhost:3000.
📁 Project Structure
GlamAI_LL/
├── package.json            # Project dependencies
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS theme configuration
├── tsconfig.json           # TypeScript configuration
└── src/
    ├── app/                # Next.js App Router (pages, layout, etc.)
    │   ├── api/            # API routes (webhooks, etc.)
    │   └── components/     # React components for the app
    ├── lib/                # Utility functions, configs (including Paddle)
    └── styles/             # Global styles (globals.css)


🎨 Design & Tech Stack
Design System (Updated)
Our new design system uses a modern, deep-purple dark theme with a vibrant accent color. Colors are defined as HSL variables in src/app/globals.css for easy theming.
Background (--background): 257 26% 9% (Deep Space Purple)
Primary (--primary): 259 63% 60% (Vibrant Violet)
Accent (--accent): 166 100% 38% (Bright Teal)
Cards (--card): 254 22% 11% (Slightly lighter purple)
Technical Stack
Frontend:
Next.js 14: React framework with App Router.
TypeScript: For type safety and better developer experience.
Tailwind CSS: Utility-first CSS for rapid UI development.
Shadcn UI: Re-usable components built on Tailwind.
Backend & Services:
Supabase: User authentication, database, and storage.
Google Gemini AI: For the core image analysis and transformation logic.
Paddle: Handles all payment processing and subscriptions.
Vercel: Deployment and hosting.
Key Dependencies
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "@supabase/supabase-js": "^2.38.0",
  "@google/generative-ai": "^0.2.0",
  "@paddle/paddle-js": "latest",
  "tailwindcss": "latest",
  "typescript": "latest"
}


🎯 Next Steps for Full MVP
Set up Supabase: Implement database schema, user authentication, and image storage.
Integrate Gemini AI: Connect the AI model for image processing.
Implement Core User Flow: Build the image upload, style selection, and results display.
Integrate Paddle Payments: Add the checkout process for the "Pro" plan.
Implement Webhooks: Set up backend logic to handle successful payments from Paddle.
Deploy to Vercel: Configure for production deployment.
📞 Support
For questions or issues, please open an issue on the GitHub repository.
Built with ❤️ for the future of beauty tech.

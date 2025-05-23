# 💬 Periskope Chat App

A real-time chat application with modern UI and group messaging capabilities.

**Live Demo:** [https://peri-test.vercel.app/](https://peri-test.vercel.app/)

## What it does

- Real-time messaging between users
- Group chat functionality
- User authentication and profiles
- Message status indicators
- Chat organization with tags and search

## How to test

1. **Create two users:**
   - Go to the live demo link
   - Sign up with first email/password
   - Sign out and create second account

2. **Test 1-on-1 messaging:**
   - Click "New Chat" button
   - Add the other user
   - Send messages and see real-time updates

3. **Test group functionality:**
   - Create more users (repeat step 1)
   - Start a new conversation with multiple users
   - Test group messaging and participant management

## Tech Stack

- **Frontend:** Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Real-time, Auth)
- **UI:** shadcn/ui, Radix UI

## How to run locally

1. Clone the repo
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```
4. Run: `npm run dev`
5. Open: `http://localhost:3000`

---
Made with ❤️

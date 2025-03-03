# Personal Website - Vue.js with Vite

This is a personal website project built with Vue.js and Vite, featuruing Supabase integration for backend functionality.

## Technologies Used

- **Frontend**: Vue.js 3
- **Build Tool**: Vite
- **Styling**: Custom CSS with animations and transitions
- **Backend**: Supabase for data storage and retrieval
- **Dependencies**: 
  - @supabase/supabase-js
  - TailwindCSS (configured but not fully implemented)

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone [repository-url]
   cd personal-website-vite
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure Supabase:
   - Create a Supabase account and project at [supabase.com](https://supabase.com)
   - Update the `supabaseUrl` and `supabaseAnonKey` in `src/supabase.js` with your project credentials
   - Create a `suggestions` table in your Supabase project with columns: `id`, `name`, `suggestion`, and `important`

### Development

Run the development server:
```
npm run dev
```

The site will be available at http://localhost:5173 (or another port if 5173 is in use).

### Building for Production

Build the project for production:
```
npm run build
```

Preview the production build:
```
npm run preview
```
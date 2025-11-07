# AuditPro Client

A modern, full-featured audit management web application built with Next.js. This application provides a comprehensive dashboard for managing audits, stores, staff, and responses with an intuitive user interface.

## Features

- **Dashboard Overview** - Get quick insights into audits, stores, and team members
- **Audit Management** - Create and manage audit questions
- **Store Management** - Organize and manage store information
- **Staff Management** - Add and manage team members
- **Response Management** - Track and review audit responses
- **User Profiles** - Manage user profiles and settings
- **Company Management** - Organize data by company
- **Modern UI** - Beautiful, responsive interface with dark mode support

## Tech Stack

- **Framework**: Next.js 15.3.0
- **React**: 19.0.0
- **State Management**: Redux Toolkit, React Redux
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Lucide React, Tabler Icons
- **Table Management**: TanStack React Table
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast, React Toastify
- **Form Handling**: React Select

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm/bun)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd auditmainclient
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (if needed):
   - The project is configured to use a backend API hosted on Render
   - Update `next.config.mjs` if you need to change API endpoints

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
auditmainclient/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── audits/         # Audit management
│   │   │   ├── stores/         # Store management
│   │   │   ├── staff/          # Staff management
│   │   │   ├── responses/      # Response management
│   │   │   ├── company/        # Company management
│   │   │   ├── users/          # User management
│   │   │   ├── profile/        # User profile
│   │   │   └── settings/       # Settings
│   │   ├── management/         # Management page
│   │   ├── request-demo/       # Demo request page
│   │   └── page.js             # Home page
│   ├── components/             # React components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── HomePage/           # Home page components
│   │   ├── Table/              # Table components
│   │   └── ui/                 # UI component library
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── utils/                  # Helper utilities
├── public/                     # Static assets
└── package.json               # Project dependencies
```

## Environment Configuration

The application is configured to connect to a backend API. The API URLs are configured in `next.config.mjs`:

- `MASTER_SERVER_URL` - Master server endpoint
- `USER_SERVER_URL` - User service endpoint
- `COMPANY_SERVER_URL` - Company service endpoint
- `NEXT_PUBLIC_SERVER_URL` - Public API endpoint

## Key Features Overview

### Dashboard
- Real-time statistics for audits, stores, and team members
- Quick action buttons for common tasks
- Getting started guide for new users

### Audit Management
- Create and manage audit questions
- Organize audits by company and store
- View audit responses and analytics

### Store Management
- Add and manage store information
- Filter stores by company
- Store-based audit organization

### Staff Management
- Add team members to companies
- Role-based access control
- Staff assignment to stores

## Development

This project uses:
- **Next.js App Router** for routing and page structure
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **TypeScript/JavaScript** for type safety (via jsconfig.json)

## Deployment

The application can be deployed to platforms like Vercel, Netlify, or any Node.js hosting service:

1. Build the application: `npm run build`
2. Start the production server: `npm start`

For Vercel deployment:
```bash
vercel
```

## License

This project is private and proprietary.

## Support

For issues and questions, please contact the development team.

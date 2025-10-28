# E-MAX Education Website

A modern, animated educational platform built with Next.js 15, featuring course management, instructor applications, and student enrollment.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **bun** package manager
- **Git** for version control

## 🚀 Step-by-Step Installation

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd emax-education
```

### Step 2: Install Dependencies
```bash
npm install
# or if using bun
bun install
```

### Step 3: Set Up Environment Variables
Create a `.env` file in the root directory and add the following:

```env
# Database Configuration (Turso)
DATABASE_URL=your_turso_database_url
DATABASE_AUTH_TOKEN=your_turso_auth_token
```

### Step 4: Run Database Migrations
```bash
npm run db:push
# or
bun run db:push
```

### Step 5: Seed the Database (Optional)
```bash
npm run db:seed
# or
bun run db:seed
```

### Step 6: Start the Development Server
```bash
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:3000`

## 📦 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes
│   │   ├── enrollments/     # Course enrollment endpoints
│   │   └── team-applications/ # Instructor application endpoints
│   ├── courses/             # Course pages
│   ├── enroll/              # Enrollment form page
│   ├── join-team/           # Join team application page
│   └── page.tsx             # Homepage
├── components/
│   ├── sections/            # Homepage sections
│   │   ├── navigation-header.tsx
│   │   ├── hero-section.tsx
│   │   ├── course-categories.tsx
│   │   ├── featured-courses.tsx
│   │   ├── about-emax.tsx
│   │   ├── instructors.tsx
│   │   ├── testimonials.tsx
│   │   └── footer.tsx
│   └── ui/                  # Reusable UI components
├── db/
│   ├── schema.ts            # Database schema
│   ├── index.ts             # Database client
│   └── seeds/               # Seed data
└── lib/                     # Utility functions
```

## 🎨 Features

- **Animated UI** - Smooth 3D animations using Framer Motion
- **Course Catalog** - Browse and enroll in various courses
- **Instructor Applications** - Join the team with automatic WhatsApp notifications
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Database Integration** - Turso (SQLite) with Drizzle ORM
- **Form Handling** - Student enrollment and instructor applications

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push database schema changes |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Drizzle Studio (database GUI) |

## 🔧 Configuration

### Database Setup
This project uses Turso (SQLite) as the database. To set up:

1. Create a Turso account at https://turso.tech
2. Create a new database
3. Copy the database URL and auth token to your `.env` file

### WhatsApp Integration
Instructor applications are automatically sent to WhatsApp number **7418875680**. To change this:
- Edit `src/app/join-team/page.tsx`
- Update the phone number in the WhatsApp message URL

## 🎯 Key Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: Turso (SQLite) + Drizzle ORM
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React

## 📱 Pages Overview

- **Homepage** (`/`) - Full landing page with all sections
- **Course Detail** (`/courses/[slug]`) - Individual course information
- **Enrollment** (`/enroll`) - Course enrollment form
- **Join Team** (`/join-team`) - Instructor application form

## 🐛 Troubleshooting

### Database Connection Issues
- Verify your `.env` file has correct Turso credentials
- Run `npm run db:push` to sync schema

### Port Already in Use
- Change the port: `PORT=3001 npm run dev`

### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📄 License

This project is proprietary software for E-MAX Education.

## 🤝 Contributing

For internal team members only. Please follow the Git workflow:
1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📞 Support

For questions or issues, contact the development team.

---

**Built with ❤️ for E-MAX Education**
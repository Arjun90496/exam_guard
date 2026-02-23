# ExamShieldAI - AI-Powered Proctored Exam Platform

An enterprise-grade exam integrity platform with real-time AI proctoring, face detection, and automated grading capabilities.

## Features

- **Real-time AI Proctoring**: Advanced monitoring during exams
- **Face Detection**: Ensures test taker identity verification
- **Automated Grading**: Quick and accurate assessment
- **Secure Exam Interface**: Tamper-proof exam environment
- **Multi-role Support**: Student, Teacher, and Administrator roles

## Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- PHP 8.5+ (for Laravel backend)
- MySQL 8.0+ (for database)

## Quick Start

### Frontend Setup

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd exam_guard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The build automatically copies assets to `backend/public/` for Laravel to serve.

### Backend Setup

```sh
# Navigate to backend
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Start Laravel server
php artisan serve
```

Access the app at `http://127.0.0.1:8000`

## Project Structure

```
exam_guard/
├── src/                    # React frontend source
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── stores/           # State management
│   └── lib/              # Utilities and schemas
├── backend/              # Laravel API server
│   ├── app/              # Application logic
│   ├── routes/           # API endpoints
│   ├── database/         # Migrations & seeders
│   └── public/           # Built frontend (auto-generated)
└── dist/                 # Production build output
```

## Technologies

### Frontend
- Vite - Lightning-fast build tool
- React - UI framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- shadcn-ui - Component library

### Backend
- Laravel 12 - PHP framework
- MySQL - Database
- Pest - Testing framework
- Sanctum - API authentication

## Development Workflow

1. **Frontend changes**: Edit in `src/` → `npm run dev` for live reload
2. **Build & sync**: `npm run build` → Automatically copies to `backend/public/`
3. **Backend changes**: Edit in `backend/` → Changes apply immediately with Laravel's file watcher
4. **Start server**: `php artisan serve` from `backend/` folder

## API Routes

All API endpoints are prefixed with `/api/v1/`:

- `POST /register` - User registration
- `POST /login` - User login
- `POST /verify-otp` - OTP verification
- `GET /exams` - Fetch exams (requires authentication)
- `POST /exams` - Create exam (teacher only)
- `POST /exams/{id}/start` - Start exam (student)

## Session Management

The app uses **file-based sessions** for development (no database required). To use database sessions:

1. Update `backend/.env`: `SESSION_DRIVER=database`
2. Run migrations: `php artisan migrate`
3. Start MySQL service

## Troubleshooting

### Build fails
```bash
npm install  # Reinstall dependencies
npm run build
```

### Laravel server won't start
```bash
php artisan config:clear
php artisan cache:clear
php artisan serve
```

### Database connection refused
Ensure MySQL is running and credentials in `backend/.env` are correct.

## Contributing

1. Create a feature branch
2. Make changes
3. Test locally
4. Submit pull request

## License

Proprietary - ExamShieldAI

## Support

For issues or questions, contact the development team.

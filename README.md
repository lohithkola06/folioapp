# FolioApp

FolioApp is a modern portfolio application built using **Next.js**, **TypeScript**, and **Firebase Authentication**. It allows users to log in using email/password or OAuth providers such as Google, GitHub, and LinkedIn.

## Features
- User authentication with Firebase (Email/Password & OAuth)
- Secure and scalable backend with Firebase Database
- Modern UI with Next.js and TypeScript
- Optimized performance with PostCSS and ESLint
- Responsive design

## Tech Stack
- **Frontend:** Next.js (TypeScript)
- **Authentication:** Firebase Authentication (Email/Password, Google, GitHub, LinkedIn OAuth)
- **Database:** Firebase Database
- **Styling:** PostCSS
- **Linting & Formatting:** ESLint, Prettier

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js) or yarn/pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/folioapp.git
   cd folioapp
   ```
2. Install dependencies:
   ```bash
   npm install  # or yarn install or pnpm install
   ```

### Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```
Obtain these credentials from the [Firebase Console](https://console.firebase.google.com/).

### Running the Project
To start the development server, run:
```bash
npm run dev  # or yarn dev or pnpm dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication Setup
This project uses Firebase Authentication for user sign-in. OAuth providers (Google, GitHub, LinkedIn) must be enabled in the Firebase Console under the Authentication settings.

## Deployment
To deploy the application:
1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```
Alternatively, you can deploy it on **Vercel**, **Firebase Hosting**, or **Netlify**.

## License
This project is licensed under the MIT License.
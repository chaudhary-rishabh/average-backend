# Express.js Blogging Application


## Features
- **Authentication**: Signup, login, logout, refresh tokens, forgot/reset password, email verification, 2FA via email, OTP login via mobile, Google OAuth.
- **Authorization**: Role-based (user, admin). Admins manage FAQs and pricing.
- **APIs**: Blogs (CRUD, like, comment), FAQs, Pricing, Reviews, User profile updates with image upload.
- **Security**: Helmet, CORS, JWT, bcrypt, Zod validation.
- **Testing**: Jest for unit (services) and integration (API endpoints) tests, with in-memory MongoDB.
- **Other**: Multer for image uploads, Nodemailer for emails, Twilio for OTP.

## Setup
1. Clone the repo.
2. Install dependencies: `npm install`.
3. Copy `.env.example` to `.env` and fill in values.
4. Run dev server: `npm run dev`.
5. Build: `npm run build`.
6. Start: `npm start`.
7. Test: `npm test`.

## Roles
- **User**: Can create/update/delete own blogs, like/comment/review, update profile.
- **Admin**: All user privileges + manage FAQs and pricing.

Note: Ensure MongoDB is running or use the provided in-memory setup for tests.

## Overview
This is a professional, industry-level backend for a blogging application built with Express.js, MongoDB, and TypeScript. It includes full authentication (JWT, refresh tokens, 2FA, OAuth with Google, OTP login), role-based access control (user and admin), and APIs for blogs, likes, comments, FAQs, pricing, reviews, and user profiles with image uploads.

## Folder Structure
# Migrate Mate - Subscription Cancellation Flow Challenge

## Overview

This project implements a subscription cancellation flow for a service, with a seamless user experience while handling business logic, A/B testing for discount offers, and secure data persistence. The application is built using modern web technologies (Next.js, Typescript, Zustand, Supabase, PostgresSQL) and follows best practices for security and maintainability.

## Objective

Implement the given Figma-designed cancellation flow exactly on all responsive devices, persist outcomes securely, and instrument the A/B downsell logic.


## Tech Stack

- **Next.js** with App Router for server-side rendering and API routes.
- **React** with TypeScript for building a robust and type-safe UI.
- **Tailwind CSS** for responsive and modern styling.
- **Supabase** for database management and authentication.
- **Zustand** for state management.

## Features

### 1. Subscription Cancellation Flow

- A multi-step cancellation process tailored for employed and unemployed users.
- Dynamic UI rendering based on user choices and employment status.
- Final completion messages for subscription continuation, cancellation, or further steps.

### 2. A/B Testing

- Implements a 50/50 split A/B testing mechanism using a cryptographically secure random number generator and persisted for future visits by storing in `cancellations` table..
- **Variant A**: No downsell offer.
- **Variant B**: Displays a downsell offer with a discounted price.

### 3. Data Persistence

- Records cancellation details in the database, including:
  - User ID (uuid)
  - Subscription ID (uuid)
  - Employment Status ("active", "pending_cancellation", "cancelled")
  - Downsell Variant ("A" or "B")
  - Downsell Accepted (boolean)
  - Cancellation reason (user input)
  - Job Found (user input)
  - Needs Visa (user input)
- Updates subscription status to `pending_cancellation` or `cancelled` as appropriate.

### 4. Security

- Implements CSRF protection using tokens validated on both client and server.
- Validates all user inputs using Zod schemas.
- Row-Level Security (RLS) policies in Supabase.

## Project Structure

- `src/app`: Contains Next.js pages and API routes including `cancel` route which initiates cancellation flow.
- `src/components`: Reusable React client-components for the cancellation flow, including a component for each step and modular components for each input type.
- `src/lib`: Supabase client setup and definition of types schemas.
- `src/store`: State management using Zustand.
- `src/utils`: Helper functions for making server-side calls and persist data in database.
- `supabase`: Configuration files for the Supabase setup.

## Setup Instructions

### Prerequisites

- Node.js (v20 or higher)
- Supabase CLI
- Docker
- PostgreSQL

### Steps

1. Clone the repository:
   ```bash
   git clone git@github.com:guptamayank9827/mm-cancel-flow-task-mayank.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up local database with seed initial data:
   ```bash
   npm run db:setup
   ```
4. Create a .env file in the project root and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
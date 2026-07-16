# 🏠 House Rental Management System — Intern Build Guide

> **How to read this document:** Do not jump ahead. Each section builds on the previous one. When you see a **"Why?"** box, stop and make sure you actually understand it. Copy-pasting without understanding is how bugs are born.

---

## 📑 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Overall Architecture](#3-overall-architecture)
4. [Folder Structure](#4-folder-structure)
5. [Authentication Flow](#5-authentication-flow)
6. [MongoDB Collections](#6-mongodb-collections)
7. [Project Modules](#7-project-modules)
8. [Frontend Development Roadmap](#8-frontend-development-roadmap)
9. [Backend Development Roadmap](#9-backend-development-roadmap)
10. [MongoDB Development Roadmap](#10-mongodb-development-roadmap)
11. [Image Upload Strategy](#11-image-upload-strategy)
12. [Booking Flow](#12-booking-flow)
13. [Admin Panel](#13-admin-panel)
14. [APIs](#14-apis)
15. [CRUD Flow](#15-crud-flow)
16. [JWT Middleware](#16-jwt-middleware)
17. [Error Handling](#17-error-handling)
18. [Best Practices](#18-best-practices)
19. [Learning Order (6-Week Checklist)](#19-learning-order-6-week-checklist)
20. [Project Requirements Summary](#20-project-requirements-summary)

---

## 1. Project Overview

### In simple words

A **House Rental Management System** is a website where:

- **House owners (landlords)** can list their houses, flats, or PGs for rent.
- **Tenants (renters)** can browse those listings, filter them, save their favourites, and book a house to rent.
- **An admin** watches over the whole platform and keeps it clean and safe.

Think of it as a smaller, learning-sized version of **Magicbricks**, **NoBroker**, or **99acres**.

### The business idea

Finding a house to rent is painful. People walk street to street looking for "TO-LET" boards, or they pay heavy commission to brokers. On the other side, owners struggle to find genuine tenants.

Our platform connects **owners** and **tenants** directly in one place. The value we create:

- Owners get **visibility** for their property.
- Tenants get a **searchable, filterable catalogue** instead of walking around.
- Both sides get a **record** of the booking.

### What problem it solves

| Problem in real life | How our system solves it |
|---|---|
| No single place to see all rentals | A central catalogue of properties |
| No photos / no details before visiting | Each listing has images, rent, location, amenities |
| Hard to remember which houses I liked | A **Wishlist** feature |
| No trust / no reviews | A **Review & rating** system |
| Owner cannot track requests | A **Booking** record per property |

### Final expected outcome

A working full-stack web application where:

- A user can **register and log in**.
- A user can **browse and search** properties.
- A user can **add properties to a wishlist**.
- A user can **book a property** (no online payment — just a confirmed booking).
- A user can **leave a review**.
- An **owner/admin** can **add, edit, and delete** properties.
- An **admin** can manage users, properties, bookings, and reviews from a dashboard.

> 💡 We are deliberately **not** adding a payment gateway. Payments add legal, security, and integration complexity that distracts from learning the core MERN skills. You will learn the *booking* concept fully; real money is a later chapter in your career.

---

## 2. Tech Stack

We use the **MERN** stack: **M**ongoDB, **E**xpress, **R**eact, **N**ode. It lets you write JavaScript everywhere — frontend, backend, and even the database query language feels like JavaScript. One language, less context switching.

### Frontend

| Technology | Why we use it (2–3 lines) |
|---|---|
| **React** | React lets us build the UI as small reusable **components** (a Navbar, a PropertyCard, a Button). It updates only the part of the screen that changed, so the app feels fast. It is the industry-standard frontend library. |
| **React Router** | A website has many pages (Home, Login, Property Details). React Router lets us switch between these pages **without reloading** the browser, giving a smooth single-page-app feel. |
| **Axios** | Axios is the tool our frontend uses to **talk to the backend** over HTTP. It is cleaner than the built-in `fetch`, handles JSON automatically, and lets us attach the auth token to every request in one place. |
| **Context API** | We need to share data (like "who is the logged-in user?") across many components. Context API is React's **built-in** way to do this. We recommend it over Redux for beginners because it needs no extra library and far less boilerplate. |
| **Tailwind CSS** | Tailwind gives us ready-made utility classes (`flex`, `p-4`, `text-center`) so we style directly in the JSX. No switching between CSS files, no naming struggles, and the design stays consistent. |

> **Why Context API and not Redux?** Redux is powerful but heavy. For a project of this size, Context API does the same job (share global state) with a fraction of the code. Learn Context first; reach for Redux only when the app truly outgrows Context. Using the simplest tool that works is a professional habit.

### Backend

| Technology | Why we use it (2–3 lines) |
|---|---|
| **Node.js** | Node lets us run JavaScript on the server (outside the browser). Because our frontend is also JS, the whole team speaks one language. It is fast and great for apps with many small requests. |
| **Express.js** | Express is a thin framework on top of Node that makes it easy to define **routes** (`GET /api/properties`) and **middleware**. Without it we'd write a lot of low-level server code by hand. |
| **JWT (JSON Web Token)** | After a user logs in, we give them a signed token. On every later request they show this token to prove "I am logged in." It lets the server stay **stateless** — it doesn't need to remember sessions. |
| **bcrypt** | bcrypt **hashes** passwords before we store them, and can never turn the hash back into the original. So even if the database leaks, the real passwords stay safe. |
| **multer** | multer handles **file uploads** (property images). It reads the incoming image from the form and saves it to our server's `uploads` folder. |
| **dotenv** | dotenv loads secret values (DB password, JWT secret) from a `.env` file into the app. Secrets stay **out of the source code** and out of Git. |
| **mongoose** | Mongoose is the bridge between Node and MongoDB. It lets us define **schemas** (the shape of our data), gives us validation, and turns database documents into easy JavaScript objects. |

### Database

| Technology | Why we use it (2–3 lines) |
|---|---|
| **MongoDB** | MongoDB stores data as flexible **JSON-like documents**. It fits naturally with JavaScript objects, is easy to start with, and lets our data shape evolve as the project grows. |

---

## 3. Overall Architecture

Every feature in the app follows the same path. Learn this path once and every feature becomes predictable.

```
   ┌─────────────────────────────────────────┐
   │ User  (Browser)                         │
   └────────────────────┬────────────────────┘
                        │  click / submit
                        ▼
   ┌────────────────────┴────────────────────┐
   │ React Components                        │
   └────────────────────┬────────────────────┘
                        │
                        ▼
   ┌────────────────────┴────────────────────┐
   │ Axios  ->  HTTP Request                 │
   └────────────────────┬────────────────────┘
                        │
                        ▼
   ┌────────────────────┴────────────────────┐
   │ Express Server / Routes                 │
   └────────────────────┬────────────────────┘
                        │
                        ▼
   ┌────────────────────┴────────────────────┐
   │ Middleware (auth / validation / multer) │
   └────────────────────┬────────────────────┘
                        │
                        ▼
   ┌────────────────────┴────────────────────┐
   │ Controllers  (request logic)            │
   └────────────────────┬────────────────────┘
                        │
                        ▼
   ┌────────────────────┴────────────────────┐
   │ Services  (business logic, optional)    │
   └────────────────────┬────────────────────┘
                        │
                        ▼
   ┌────────────────────┴────────────────────┐
   │ Mongoose Models                         │
   └────────────────────┬────────────────────┘
                        │
                        ▼
   ┌────────────────────┴────────────────────┐
   │ MongoDB  (database)                     │
   └─────────────────────────────────────────┘

   ^  RESPONSE travels back UP the same chain  ^
   MongoDB -> Models -> Controllers -> Express -> Axios -> React -> user sees result
```

### Request–Response flow explained (step by step)

1. **User acts** — clicks "Book Now" in the React UI.
2. **React** calls a function that uses **Axios** to send an HTTP request (e.g. `POST /api/bookings`).
3. The request travels over the internet to our **Express server**.
4. Express first passes it through **middleware** — for example, "is this user logged in?" (auth) and "is the data valid?" (validation).
5. If middleware approves, Express hands the request to the correct **controller** function.
6. The controller (optionally through a **service** layer) uses a **Mongoose model** to read from or write to **MongoDB**.
7. MongoDB returns the data → model → controller builds a **response** (usually JSON).
8. The response travels back through Express → Axios → React.
9. **React updates the screen** — the user sees "Booking Confirmed ✅".

> **Why layers?** Each layer has one job. Routes decide *where* a request goes. Middleware decides *if* it may proceed. Controllers decide *what* to do. Models decide *how* data is shaped. When something breaks, you know exactly which layer to inspect. This separation is what makes big apps maintainable.
>
> **What is the Services layer and is it optional?** A service holds reusable business logic (e.g. "calculate total rent for these dates"). For small projects you may put this logic directly in the controller. As logic grows, move it into services so controllers stay thin. We mark it *optional* — start without it, add it when a controller gets crowded.

---

## 4. Folder Structure

A clean folder structure is not decoration — it tells the next developer (or future you) exactly where to find and add things.

### Frontend (`/client`)

```
client/
├── public/
├── src/
│   ├── assets/          # images, logos, fonts
│   ├── components/      # small reusable UI pieces (Navbar, PropertyCard, Button)
│   ├── pages/           # full screens (Home, Login, PropertyDetails)
│   ├── layouts/         # shared page shells (e.g. MainLayout with Navbar + Footer)
│   ├── hooks/           # custom reusable logic (useAuth, useFetch)
│   ├── context/         # global state (AuthContext)
│   ├── services/        # Axios API calls (authService, propertyService)
│   ├── utils/           # helper functions (formatDate, formatCurrency)
│   ├── App.jsx          # top-level routes
│   └── main.jsx         # React entry point
└── package.json
```

| Folder | Why it exists |
|---|---|
| **assets** | Keeps static files (images, icons) in one place, separate from code. |
| **components** | Small, reusable building blocks. A `PropertyCard` is used on many pages — write it once, reuse everywhere. |
| **pages** | Each file is one full screen tied to a route. Keeps "screens" separate from "building blocks." |
| **layouts** | The repeating shell (Navbar + Footer) that wraps many pages. Avoids copy-pasting the Navbar into every page. |
| **hooks** | Custom hooks package reusable *logic* (not UI). E.g. `useAuth()` returns the current user anywhere. |
| **context** | Holds app-wide state such as the logged-in user, so any component can read it without "prop drilling." |
| **services** | All Axios calls live here. If an API URL changes, you fix it in one file, not fifty. |
| **utils** | Pure helper functions with no UI. Formatting, calculations, validators. |

### Backend (`/server`)

```
server/
├── config/          # configuration (db connection, constants)
├── controllers/     # request-handling logic
├── middleware/      # auth, error handler, validation, multer setup
├── models/          # Mongoose schemas
├── routes/          # URL endpoints mapped to controllers
├── utils/           # helpers (generateToken, apiResponse)
├── uploads/         # uploaded images stored on disk
├── .env             # secrets (never committed to Git)
├── server.js        # app entry point
└── package.json
```

| Folder | Why it exists |
|---|---|
| **config** | Central place for setup like the DB connection. Change your DB once, everything follows. |
| **controllers** | The actual "what happens" logic for each route. Keeps routes clean. |
| **middleware** | Functions that run *before* controllers — check auth, validate input, catch errors. Reusable across many routes. |
| **models** | Define the shape and rules of each collection. The single source of truth for your data structure. |
| **routes** | Map URLs to controllers. Reading this folder = seeing every endpoint your API offers. |
| **utils** | Small reusable helpers shared across controllers. |
| **uploads** | Where multer saves uploaded property images. |

> **Why separate `client` and `server`?** They are two independent programs that happen to talk to each other. Keeping them apart means you can run, deploy, and debug them separately — exactly how real production teams work.

---

## 5. Authentication Flow

**Authentication** answers one question: *"Are you really who you say you are?"* We do this with passwords (to prove identity) and JWT tokens (to remember you're proven).

### Key concepts in plain English

- **What is JWT?** A **JSON Web Token** is a long signed string the server gives you after login. It's like a wristband at an event: once you show ID at the gate, you get a wristband, and after that the wristband alone proves you're allowed in.
- **Why use JWT?** So the server doesn't have to remember every logged-in user. The token itself carries the proof (and is signed so it can't be faked). This keeps the server **stateless** and easy to scale.
- **Why hash the password?** Hashing scrambles the password one-way. We store the scramble, not the password. If hackers steal the database, they still can't read anyone's password.
- **Why never store a plain password?** If you store `"mypass123"` directly and the DB leaks, every user is instantly exposed — and people reuse passwords across sites. Storing plain passwords is negligence.
- **Why is middleware used?** Middleware is a checkpoint that runs before the controller. The auth middleware checks the token *once*, in one place, and protects any route we attach it to — instead of repeating the check in every controller.
- **How do protected routes work?** A protected route has the auth middleware attached. No valid token → the middleware blocks the request with `401` and the controller never runs.
- **How does the Authorization header work?** The frontend sends the token in a request header: `Authorization: Bearer <token>`. The middleware reads it, verifies the signature, and if valid, attaches the user to the request.

### Register Flow

```
   ┌───────────────────────────┐
   │ React Register Form       │
   └─────────────┬─────────────┘
                 │  POST /api/auth/register
                 ▼
   ┌─────────────┴─────────────┐
   │ Validate the fields       │   ──►  invalid  ->  400 Bad Request
   └─────────────┬─────────────┘
                 │  valid
                 ▼
   ┌─────────────┴─────────────┐
   │ Email already registered? │   ──►  yes  ->  409 Duplicate
   └─────────────┬─────────────┘
                 │  no
                 ▼
   ┌─────────────┴─────────────┐
   │ Hash password (bcrypt)    │
   └─────────────┬─────────────┘
                 │
                 ▼
   ┌─────────────┴─────────────┐
   │ Store user in MongoDB     │
   └─────────────┬─────────────┘
                 │
                 ▼
   ┌─────────────┴─────────────┐
   │ 201 Created  (success)    │
   └───────────────────────────┘
```

### Login Flow

```
   ┌──────────────────────────────┐
   │ React Login Form             │
   └──────────────┬───────────────┘
                  │  POST /api/auth/login
                  ▼
   ┌──────────────┴───────────────┐
   │ Find user by email           │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌──────────────┴───────────────┐
   │ User found?                  │   ──►  no  ->  401 Invalid credentials
   └──────────────┬───────────────┘
                  │  yes
                  ▼
   ┌──────────────┴───────────────┐
   │ bcrypt.compare(password)     │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌──────────────┴───────────────┐
   │ Password matches?            │   ──►  no  ->  401 Invalid credentials
   └──────────────┬───────────────┘
                  │  yes
                  ▼
   ┌──────────────┴───────────────┐
   │ Generate JWT token           │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌──────────────┴───────────────┐
   │ Return token to client       │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌──────────────┴───────────────┐
   │ Store token in localStorage  │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌──────────────┴───────────────┐
   │ Attach token to each request │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌──────────────┴───────────────┐
   │ Access protected routes      │
   └──────────────────────────────┘
```

> **Security note:** Notice that a wrong email and a wrong password both return the same "Invalid credentials" message. This is deliberate — we don't tell attackers *which* part was wrong.

---

## 6. MongoDB Collections

A **collection** is like a table; a **document** is like a row. Below is every collection this project needs. For each field you'll see: type, required?, default, reference, validation, and **why it exists**.

> Reminder: Mongoose adds `createdAt` and `updatedAt` automatically when you pass `{ timestamps: true }`. Always turn this on — you almost always want to know when a record was made or changed.

### 6.1 Users Collection

**Purpose:** Stores every account — tenants, owners, and admins. It is the backbone of authentication and of "who owns / booked / reviewed what."

| Field | Type | Required | Default | Ref | Validation | Why it exists |
|---|---|---|---|---|---|---|
| `name` | String | Yes | — | — | 2–50 chars | To greet and identify the user. |
| `email` | String | Yes | — | — | valid email, **unique**, lowercase | The login identity; must be unique. |
| `password` | String | Yes | — | — | min 6 chars, `select: false` | Stored **hashed**; `select:false` hides it from queries by default. |
| `phone` | String | No | — | — | 10 digits | To contact a user about a booking. |
| `role` | String | Yes | `"user"` | — | enum: `user`, `owner`, `admin` | Controls permissions (who can add properties, who can access admin). |
| `profileImage` | String | No | `"default.png"` | — | — | Path/URL to the avatar image. |
| `isActive` | Boolean | No | `true` | — | — | Lets admin soft-disable an account without deleting it. |
| `createdAt` | Date | auto | now | — | — | When the account was created. |
| `updatedAt` | Date | auto | now | — | — | When it was last changed. |

**Index:** unique index on `email` (fast lookups + prevents duplicate signups).

### 6.2 Categories Collection

**Purpose:** Groups properties by type (Apartment, Villa, PG, Independent House). Lets users filter and keeps property data consistent.

| Field | Type | Required | Default | Ref | Validation | Why it exists |
|---|---|---|---|---|---|---|
| `name` | String | Yes | — | — | unique | The category label shown in filters. |
| `slug` | String | Yes | — | — | unique, lowercase | URL-friendly id (e.g. `pg-hostel`). |
| `description` | String | No | `""` | — | — | Short explanation of the category. |

**Index:** unique on `slug`.

> **Why a separate Categories collection instead of a plain text field?** If categories are typed freely, one owner writes "Apartment," another writes "apartments," a third "Flat." Filters break. A controlled collection guarantees consistency and lets admins manage the list in one place.

### 6.3 Amenities Collection

**Purpose:** Reusable list of features (WiFi, Parking, Lift, Power Backup) that properties can offer.

| Field | Type | Required | Default | Ref | Validation | Why it exists |
|---|---|---|---|---|---|---|
| `name` | String | Yes | — | — | unique | Amenity label. |
| `icon` | String | No | `""` | — | — | Icon name/path to show in the UI. |

> **Why a separate collection?** Amenities are shared across thousands of properties. Storing them once and *referencing* them avoids repetition and lets us render nice icons consistently.

### 6.4 Properties Collection

**Purpose:** The heart of the app — each document is one house/flat listed for rent.

| Field | Type | Required | Default | Ref | Validation | Why it exists |
|---|---|---|---|---|---|---|
| `title` | String | Yes | — | — | 5–100 chars | Headline of the listing. |
| `description` | String | Yes | — | — | min 20 chars | Detailed info for the tenant. |
| `rent` | Number | Yes | — | — | > 0 | Monthly rent amount. |
| `deposit` | Number | No | `0` | — | ≥ 0 | Security deposit. |
| `category` | ObjectId | Yes | — | `Category` | — | Links the property to its type. |
| `amenities` | [ObjectId] | No | `[]` | `Amenity` | — | List of features this property has. |
| `bedrooms` | Number | Yes | — | — | ≥ 0 | Filterable spec. |
| `bathrooms` | Number | Yes | — | — | ≥ 0 | Filterable spec. |
| `area` | Number | No | — | — | > 0 | Size in sq. ft. |
| `address` | String | Yes | — | — | — | Full address text. |
| `city` | String | Yes | — | — | — | Used heavily for search/filter. |
| `state` | String | No | — | — | — | Location grouping. |
| `pincode` | String | No | — | — | 6 digits | Precise location. |
| `owner` | ObjectId | Yes | — | `User` | — | Who listed the property. |
| `coverImage` | String | Yes | — | — | — | Main thumbnail shown in lists. |
| `isAvailable` | Boolean | No | `true` | — | — | Whether it can currently be booked. |
| `isApproved` | Boolean | No | `false` | — | — | Admin approves before it goes public. |
| `createdAt` / `updatedAt` | Date | auto | now | — | — | Timestamps. |

**Indexes:** `city` and `category` (fast filtering), text index on `title`+`description` (search).

> **Why store `owner` as a reference?** So we can always answer "whose property is this?" and enforce that only the owner (or admin) can edit or delete it.

### 6.5 Property Images Collection

**Purpose:** Stores the multiple photos of each property (a listing needs a gallery, not one photo).

| Field | Type | Required | Default | Ref | Validation | Why it exists |
|---|---|---|---|---|---|---|
| `property` | ObjectId | Yes | v— | `Property` | — | Which property this image belongs to. |
| `imageUrl` | String | Yes | — | — | — | Path to the file in `/uploads`. |
| `isCover` | Boolean | No | `false` | — | — | Marks the primary image. |

> **Why a separate collection instead of an array on Property?** A gallery can hold many images; separating them keeps the Property document light and makes it easy to add/delete a single photo without rewriting the whole property. (For very small projects an array is fine — we split them so you learn *referencing*, the more scalable pattern.)

### 6.6 Bookings Collection

**Purpose:** Records that a tenant has booked a property for a period. This is the "transaction" of our app.

| Field | Type | Required | Default | Ref | Validation | Why it exists |
|---|---|---|---|---|---|---|
| `property` | ObjectId | Yes | — | `Property` | — | What was booked. |
| `tenant` | ObjectId | Yes | — | `User` | — | Who booked it. |
| `owner` | ObjectId | Yes | — | `User` | — | Property owner (copied for easy queries). |
| `startDate` | Date | Yes | — | — | today or later | Rental start. |
| `endDate` | Date | No | — | — | after startDate | Rental end (optional for open-ended). |
| `totalRent` | Number | Yes | — | — | ≥ 0 | Snapshot of agreed rent. |
| `status` | String | Yes | `"confirmed"` | — | enum: `pending`,`confirmed`,`cancelled`,`completed` | Booking lifecycle. |
| `createdAt` / `updatedAt` | Date | auto | now | — | — | Timestamps. |

**Indexes:** `tenant`, `owner`, `property` (each user views their own bookings).

> **Why copy `owner` into the booking and snapshot `totalRent`?** Because reports and dashboards query bookings constantly, and rent can change later. Storing a snapshot keeps historical records accurate ("what was the rent *at the time of booking*").

### 6.7 Wishlist Collection

**Purpose:** Lets a user save properties to revisit later ("favourites").

| Field | Type | Required | Default | Ref | Validation | Why it exists |
|---|---|---|---|---|---|---|
| `user` | ObjectId | Yes | — | `User` | — | Whose wishlist. |
| `property` | ObjectId | Yes | — | `Property` | — | The saved property. |

**Index:** compound **unique** index on `{ user, property }` — the same property can't be added twice.

> **Why its own collection?** A wishlist is a many-to-many relationship (a user likes many properties; a property is liked by many users). A dedicated join collection models this cleanly and lets us count "how many wishlisted this?"

### 6.8 Reviews Collection

**Purpose:** Lets tenants rate and comment on a property, building trust for future tenants.

| Field | Type | Required | Default | Ref | Validation | Why it exists |
|---|---|---|---|---|---|---|
| `property` | ObjectId | Yes | — | `Property` | — | What is being reviewed. |
| `user` | ObjectId | Yes | — | `User` | — | Who wrote the review. |
| `rating` | Number | Yes | — | — | 1–5 | The star rating. |
| `comment` | String | No | `""` | — | max 500 chars | Written feedback. |

**Index:** compound **unique** index on `{ property, user }` — one review per user per property.

> **Why enforce one review per user?** To stop a single person from spamming ratings and skewing the average.

---

## 7. Project Modules

A **module** is a self-contained feature. Below, each module lists its **frontend screens**, **backend APIs**, and **which collection** it touches.

| Module | Frontend Screens | Backend APIs | Collection(s) |
|---|---|---|---|
| **Authentication** | Register, Login, Profile | register, login, getProfile, updateProfile | Users |
| **Property** | Property List, Property Details, Add/Edit Property (owner) | CRUD properties, filter/search | Properties, Property Images, Categories, Amenities |
| **Booking** | Booking dialog, My Bookings, Booking history | create booking, my bookings, cancel booking | Bookings |
| **Wishlist** | Wishlist page, heart icon on cards | add/remove/list wishlist | Wishlist |
| **Review** | Review form + list on details page | add/list/delete review | Reviews |
| **Admin Dashboard** | Dashboard, Manage Users/Properties/Bookings/Reviews | admin CRUD + stats | All collections |
| **Reports** | Stats cards, charts | totals, revenue, top cities | Bookings, Properties, Users |
| **Profile** | View/edit profile, upload avatar | getProfile, updateProfile | Users |

> **Why think in modules?** It lets you build and test one complete feature end-to-end before starting the next. It also mirrors how real teams split work: "You take the Booking module, I'll take Reviews."

---

## 8. Frontend Development Roadmap

Build the frontend in this exact order. Each step gives the *next* step something to stand on.

| Step | What to build | **Why in this order** |
|---|---|---|
| **1** | Create React project (Vite) + install Tailwind, Axios, React Router | You need the skeleton before any feature. Vite is fast and modern. |
| **2** | Set up routing (`App.jsx` with routes) | Decide your pages early so navigation exists as you build them. |
| **3** | Build the Navbar + Layout | Every page shares these; building them first prevents copy-paste later. |
| **4** | Build Authentication pages (Register, Login) + AuthContext | Almost everything depends on "who is logged in." Establish it early. |
| **5** | Set up Axios `services/` + attach token interceptor | Centralise API calls now so every later feature just calls a service. |
| **6** | Property List page (read static data first) | The core browsing experience; start with hardcoded/seeded data. |
| **7** | Property Details page | Users need to click a card and see full info. |
| **8** | Wishlist (heart button + wishlist page) | A small, satisfying feature that reuses the PropertyCard. |
| **9** | Booking dialog + My Bookings page | The main action of the app. Needs auth (step 4) done first. |
| **10** | Reviews on the details page | Depends on properties and auth being ready. |
| **11** | Owner: Add/Edit Property form (with image upload) | More complex form; build it once the simpler reads work. |
| **12** | Admin Dashboard | Built last because it manages everything else. |

> **Golden rule:** Get **reading** data working before **writing** data. Seeing properties on screen (even hardcoded) motivates you and proves your rendering works before you fight with forms and uploads.

---

## 9. Backend Development Roadmap

```
   1.  Database Connection
   │
   ▼
   2.  Models
   │
   ▼
   3.  Routes
   │
   ▼
   4.  Controllers
   │
   ▼
   5.  Authentication
   │
   ▼
   6.  CRUD
   │
   ▼
   7.  Middleware
   │
   ▼
   8.  Testing
```

| Step | What to do | **Why** |
|---|---|---|
| **1. Database Connection** | Connect to MongoDB with Mongoose in `config/db.js`. | Nothing works without the DB. Verify the connection log prints before anything else. |
| **2. Models** | Define schemas (User, Property, Booking…). | Models are your data contract. Building them first shapes every controller. |
| **3. Routes** | Create route files that map URLs to (empty) controllers. | Defines your API surface. You can see every endpoint at a glance. |
| **4. Controllers** | Fill in the logic for each route. | This is where requests actually get handled. |
| **5. Authentication** | Add register/login + JWT generation. | Many routes must be protected; auth must exist before you protect them. |
| **6. CRUD** | Implement Create/Read/Update/Delete for properties, bookings, etc. | The bulk of the app's functionality. |
| **7. Middleware** | Add auth guard, validation, multer, error handler. | Cross-cutting concerns that protect and clean up all routes. |
| **8. Testing** | Test every endpoint in Postman/Thunder Client. | Catch bugs on the backend *before* the frontend depends on them. |

> **Why test the backend independently?** If you build frontend and backend together and something breaks, you won't know which side is at fault. A backend proven in Postman removes half the guesswork.

---

## 10. MongoDB Development Roadmap

This is a workflow lesson many beginners get wrong. Follow it exactly.

1. **First, create static data manually.** Open **MongoDB Compass** and insert a few properties, users, and categories by hand.
2. **Do NOT build the Admin Panel first.** It is tempting to build "the tool that adds data" first — resist it.
3. **Make the frontend work against this static data.** Get your Property List and Details pages rendering real documents from MongoDB.
4. **Only then build the Admin Panel** to add/edit that data through the UI.

```
   1.  Insert data by hand in MongoDB Compass
   │
   ▼
   2.  Build the frontend that reads this data
   │
   ▼
   3.  Frontend now works with real DB data
   │
   ▼
   4.  NOW build the Admin Panel to manage data
```

> **Why this approach is better:**
> - You see results **immediately** — motivating and confidence-building.
> - You separate two hard problems: *displaying* data and *creating* data. Solve one at a time.
> - The Admin Panel is complex (forms, uploads, validation). Building it last means you build it on a foundation you already trust.
> - If the frontend can't read simple hand-entered data, no admin panel will save you — you'd just be debugging two broken things at once.

---

## 11. Image Upload Strategy

### The beginner-friendly approach

- **Do NOT use Cloudinary (or S3) at the start.** They add accounts, API keys, and network calls that distract from the core lesson.
- **Store images on your own server.** Use **multer** to save the uploaded file into `backend/uploads/`.
- **MongoDB stores only the path/URL**, never the image bytes.

So a Property Image document holds just:

```json
{
  "property": "665f...",
  "imageUrl": "/uploads/property-1699999999.jpg",
  "isCover": true
}
```

### Why store only the URL/path?

- MongoDB documents have a **16 MB limit** — real images would bloat them fast.
- Databases are for **structured data**, file systems are for **files**. Use each for what it's good at.
- Serving an image from a folder is far faster and cheaper than pulling bytes out of the DB.

### Future improvement

Once you're comfortable, upgrade to **Cloudinary** or **AWS S3**:

- Files live on a dedicated, globally-distributed service (fast for users everywhere).
- You get automatic resizing, optimization, and backups.
- Your own server stays lean.

The migration is easy *because* you stored a URL: you just change the URL from `/uploads/...` to `https://res.cloudinary.com/...`. Your Property schema doesn't change. **This is the payoff of storing a URL instead of the file itself.**

---

## 12. Booking Flow

No payment gateway is involved. A booking is simply a **confirmed record** that a tenant wants a property.

```
   ┌─────────────────────────────┐
   │ User clicks 'Rent Now'      │
   └──────────────┬──────────────┘
                  │
                  ▼
   ┌──────────────┴──────────────┐
   │ Booking Confirmation Dialog │
   └──────────────┬──────────────┘
                  │
                  ▼
   ┌──────────────┴──────────────┐
   │ User confirms?              │   ──►  no  ->  close dialog
   └──────────────┬──────────────┘
                  │  yes
                  ▼
   ┌──────────────┴──────────────┐
   │ POST /api/bookings          │
   └──────────────┬──────────────┘
                  │
                  ▼
   ┌──────────────┴──────────────┐
   │ Backend creates Booking     │
   └──────────────┬──────────────┘
                  │
                  ▼
   ┌──────────────┴──────────────┐
   │ status = 'confirmed'        │
   └──────────────┬──────────────┘
                  │
                  ▼
   ┌──────────────┴──────────────┐
   │ Booking history updated     │
   └──────────────┬──────────────┘
                  │
                  ▼
   ┌──────────────┴──────────────┐
   │ Show success message        │
   └─────────────────────────────┘
```

### Flow explained

1. On the Property Details page the user clicks **Rent Now**.
2. A **confirmation dialog** appears showing property, rent, and dates (so the user reviews before committing).
3. On confirm, the frontend sends `POST /api/bookings` with the property id and dates.
4. The backend creates a **Booking** document with `status: "confirmed"`.
5. The booking now appears in the user's **Booking History / My Bookings** page.
6. The user sees a success message.

> **Why a confirmation dialog?** To prevent accidental bookings and to show the user exactly what they're agreeing to. A moment of "are you sure?" saves a lot of support complaints.
>
> **Why default status to `confirmed`?** Because there's no payment step to wait on. In a real product with payments, the flow would be `pending → paid → confirmed`. We keep the concept but skip the money.

---

## 13. Admin Panel

**Build the Admin Panel AFTER all user-facing functionality works.** The admin panel *manages* features that must already exist.

### What the admin can do

| Capability | Description |
|---|---|
| **Dashboard** | See totals: users, properties, bookings, revenue snapshot. |
| **Manage Users** | List, view, deactivate/activate, delete users. |
| **Manage Properties** | Approve, edit, delete listings; toggle availability. |
| **Manage Bookings** | View all bookings, change status, cancel. |
| **Manage Reviews** | Remove abusive or fake reviews. |
| **Manage Images** | Add/remove property images. |
| **View Reports** | Charts and totals for business insight. |

### CRUD flow (same for every admin resource)

```
                       ┌────────────────┐
                       │  Admin UI Table│
                       └────────┬───────┘
                                │
        ┌───────────────┬───────┴───────┬───────────────┐
        ▼               ▼               ▼               ▼

     CREATE           READ           UPDATE          DELETE
  Form -> POST     GET list ->    Edit form ->     Confirm ->
   -> save ->      render rows     PUT -> save      DELETE ->
  refresh table                    -> refresh      remove row
```

> **Why last?** The admin panel is essentially CRUD on top of collections you've already built. If those collections and APIs work, the admin panel is fast to assemble. Building it first would mean building management tools for features that don't exist yet.
>
> **Why protect it hard?** Every admin route must pass **two** middlewares: "are you logged in?" *and* "are you an admin?" (role check). A normal user must never reach these endpoints.

---

## 14. APIs

Below is the full API list. Format for each: **Method**, **Endpoint**, **Request Body**, **Response**, **Purpose**. `🔒` = requires a valid token. `👑` = admin only.

### Authentication APIs

| Method | Endpoint | Request Body | Response | Purpose |
|---|---|---|---|---|
| POST | `/api/auth/register` | `{ name, email, password, phone }` | `{ message, user }` | Create a new account. |
| POST | `/api/auth/login` | `{ email, password }` | `{ token, user }` | Log in and receive a JWT. |
| GET | `/api/auth/profile` 🔒 | — | `{ user }` | Get the logged-in user's profile. |
| PUT | `/api/auth/profile` 🔒 | `{ name, phone, profileImage }` | `{ user }` | Update profile. |
| POST | `/api/auth/logout` 🔒 | — | `{ message }` | Log out (frontend clears token). |

> **Why is logout mostly frontend?** With JWT, the server is stateless — "logging out" means the client deletes its token. The endpoint exists for symmetry and future token-blacklisting.

### Property APIs

| Method | Endpoint | Request Body | Response | Purpose |
|---|---|---|---|---|
| GET | `/api/properties` | — (query: `?city=&category=&search=`) | `{ properties, total }` | List/filter/search properties. |
| GET | `/api/properties/:id` | — | `{ property }` | Full details of one property. |
| POST | `/api/properties` 🔒 | property fields + images (multipart) | `{ property }` | Owner creates a listing. |
| PUT | `/api/properties/:id` 🔒 | updated fields | `{ property }` | Owner edits their listing. |
| DELETE | `/api/properties/:id` 🔒 | — | `{ message }` | Owner deletes their listing. |

### Booking APIs

| Method | Endpoint | Request Body | Response | Purpose |
|---|---|---|---|---|
| POST | `/api/bookings` 🔒 | `{ propertyId, startDate, endDate }` | `{ booking }` | Create a confirmed booking. |
| GET | `/api/bookings/my` 🔒 | — | `{ bookings }` | The user's own bookings. |
| PUT | `/api/bookings/:id/cancel` 🔒 | — | `{ booking }` | Cancel a booking. |

### Wishlist APIs

| Method | Endpoint | Request Body | Response | Purpose |
|---|---|---|---|---|
| GET | `/api/wishlist` 🔒 | — | `{ items }` | Get the user's saved properties. |
| POST | `/api/wishlist` 🔒 | `{ propertyId }` | `{ item }` | Add a property to wishlist. |
| DELETE | `/api/wishlist/:propertyId` 🔒 | — | `{ message }` | Remove from wishlist. |

### Review APIs

| Method | Endpoint | Request Body | Response | Purpose |
|---|---|---|---|---|
| GET | `/api/properties/:id/reviews` | — | `{ reviews, avgRating }` | List reviews for a property. |
| POST | `/api/properties/:id/reviews` 🔒 | `{ rating, comment }` | `{ review }` | Add a review. |
| DELETE | `/api/reviews/:id` 🔒 | — | `{ message }` | Delete own review (or admin). |

### Admin APIs

| Method | Endpoint | Request Body | Response | Purpose |
|---|---|---|---|---|
| GET | `/api/admin/stats` 🔒👑 | — | `{ totals }` | Dashboard numbers. |
| GET | `/api/admin/users` 🔒👑 | — | `{ users }` | List all users. |
| PUT | `/api/admin/users/:id` 🔒👑 | `{ isActive, role }` | `{ user }` | Update/deactivate a user. |
| DELETE | `/api/admin/users/:id` 🔒👑 | — | `{ message }` | Delete a user. |
| PUT | `/api/admin/properties/:id/approve` 🔒👑 | — | `{ property }` | Approve a listing. |
| GET | `/api/admin/bookings` 🔒👑 | — | `{ bookings }` | View all bookings. |

> **Why does every API exist?** Each one maps to one thing a user or admin needs to *do*. If you can't name the screen/button that calls an endpoint, that endpoint probably shouldn't exist. Build APIs to serve real UI needs, not "just in case."

---

## 15. CRUD Flow

CRUD = **C**reate, **R**ead, **U**pdate, **D**elete. Every feature is some combination of these four. The path is always the same: **Frontend → Axios → Backend → MongoDB → back**.

### Create

```
   1.  Form submit
   │
   ▼
   2.  Axios POST
   │
   ▼
   3.  Controller validates
   │
   ▼
   4.  Model.create()
   │
   ▼
   5.  MongoDB insert
   │
   ▼
   6.  201 + new record
   │
   ▼
   7.  UI shows new item
```

### Read

```
   1.  Page loads
   │
   ▼
   2.  Axios GET
   │
   ▼
   3.  Controller
   │
   ▼
   4.  Model.find()
   │
   ▼
   5.  MongoDB query
   │
   ▼
   6.  200 + data
   │
   ▼
   7.  UI renders list
```

### Update

```
   1.  Edit form submit
   │
   ▼
   2.  Axios PUT
   │
   ▼
   3.  Controller checks ownership
   │
   ▼
   4.  Model.findByIdAndUpdate()
   │
   ▼
   5.  MongoDB update
   │
   ▼
   6.  200 + updated record
   │
   ▼
   7.  UI refreshes item
```

### Delete

```
   1.  Click delete + confirm
   │
   ▼
   2.  Axios DELETE
   │
   ▼
   3.  Controller checks ownership
   │
   ▼
   4.  Model.findByIdAndDelete()
   │
   ▼
   5.  MongoDB remove
   │
   ▼
   6.  200 success
   │
   ▼
   7.  UI removes item
```

> **Notice the repeating shape.** Once you build Create/Read/Update/Delete for *one* collection (say Properties), every other collection follows the exact same pattern. CRUD is a template you'll reuse dozens of times.

---

## 16. JWT Middleware

The auth middleware is the security guard that stands in front of protected routes.

```
   ┌───────────────────────────────┐
   │ Incoming request              │
   └───────────────┬───────────────┘
                   │
                   ▼
   ┌───────────────┴───────────────┐
   │ Authorization header present? │   ──►  no  ->  401 Unauthorized
   └───────────────┬───────────────┘
                   │  yes
                   ▼
   ┌───────────────┴───────────────┐
   │ Extract token after 'Bearer ' │
   └───────────────┬───────────────┘
                   │
                   ▼
   ┌───────────────┴───────────────┐
   │ jwt.verify(token) valid?      │   ──►  no / expired  ->  401
   └───────────────┬───────────────┘
                   │  yes
                   ▼
   ┌───────────────┴───────────────┐
   │ Attach req.user = decoded     │
   └───────────────┬───────────────┘
                   │
                   ▼
   ┌───────────────┴───────────────┐
   │ Route needs admin?            │   ──►  yes & not admin  ->  403 Forbidden
   └───────────────┬───────────────┘
                   │  no / is admin
                   ▼
   ┌───────────────┴───────────────┐
   │ next()  ->  Controller runs   │
   └───────────────────────────────┘
```

### The pieces explained

- **Token Verification** — `jwt.verify(token, SECRET)` checks the token's signature. If it was tampered with or made up, verification fails.
- **Protected Routes** — routes with the middleware attached; the controller only runs if the guard calls `next()`.
- **Authorization Header** — the client sends `Authorization: Bearer <token>`; the middleware reads it from `req.headers.authorization`.
- **`next()`** — the "you may pass" signal. Calling it hands control to the next middleware/controller.
- **`401` Unauthorized** — "I don't know who you are" (no/invalid token). *Authentication* failed.
- **`403` Forbidden** — "I know who you are, but you're not allowed" (e.g. a normal user hitting an admin route). *Authorization* failed.

> **Why separate the auth check (401) from the role check (403)?** They answer different questions. 401 = *not logged in*. 403 = *logged in but lacking permission*. Using the correct code helps the frontend react correctly (redirect to login vs. show "access denied").

```js
// middleware/auth.js — the concept in code
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now every controller knows who the user is
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

module.exports = { protect, adminOnly };
```

---

## 17. Error Handling

Errors are **not** exceptions to avoid — they're expected situations you must handle gracefully. Every error should return a clear status code and message.

| Situation | Status | What to send | Why |
|---|---|---|---|
| **Validation error** (missing/invalid fields) | `400` | `{ message: "Rent is required" }` | Tell the user exactly what to fix. |
| **Not found** (wrong id / deleted) | `404` | `{ message: "Property not found" }` | Distinguish "doesn't exist" from "server broke." |
| **Duplicate email** (register) | `409` | `{ message: "Email already registered" }` | A conflict with existing data, not a server fault. |
| **Unauthorized** (no/invalid token) | `401` | `{ message: "Please log in" }` | Prompt the frontend to redirect to login. |
| **Forbidden** (wrong role) | `403` | `{ message: "Not allowed" }` | User is known but lacks rights. |
| **Token expired** | `401` | `{ message: "Session expired, log in again" }` | Frontend clears token and re-logs in. |
| **Image upload error** (wrong type/too big) | `400` | `{ message: "Only JPG/PNG under 2MB" }` | Guide the user to a valid file. |
| **Server error** (unexpected crash) | `500` | `{ message: "Something went wrong" }` | Never leak stack traces to users. |

### A central error handler

Put one error-handling middleware at the very end of your Express app so a single `try/catch` in controllers can just `next(err)`:

```js
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err); // log the real error for developers
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Server Error" });
};
module.exports = errorHandler;
```

> **Why one central handler?** So you don't repeat error-formatting in every controller. Controllers stay focused on the happy path; the handler formats every failure consistently.

---

## 18. Best Practices

These are the habits that separate a hobbyist from a professional. Follow them from day one — they're harder to add later.

| Practice | Why it matters |
|---|---|
| **Use `async/await`** | Database calls are asynchronous. `async/await` makes the code read top-to-bottom like a story instead of nested callbacks. |
| **Use `try/catch`** | Wrap every `await` so a failed DB call becomes a clean error response, not a server crash. |
| **Separate controllers from routes** | Routes should only *map* URLs; logic lives in controllers. Keeps both readable. |
| **Use environment variables (`.env`)** | Config differs between your laptop and production. Env vars let the same code run anywhere. |
| **Never hardcode secrets** | A DB password in code = a password in Git = a leaked password. Secrets go in `.env` (which is git-ignored). |
| **Validate inputs** | Never trust the client. Check every incoming field before touching the DB. |
| **Hash passwords** | Store bcrypt hashes, never plain text. Non-negotiable. |
| **Don't return the password** | Even hashed, the password field should never leave the server. Use `select: false`. |
| **Use proper HTTP status codes** | `200/201/400/401/403/404/409/500` each mean something specific. Correct codes make your API predictable and debuggable. |
| **Consistent response shape** | Always return `{ message, data }` (or similar). The frontend can then handle every response the same way. |

---

## 19. Learning Order (6-Week Checklist)

A realistic pace for an intern. Tick each box before moving on.

### Week 1 — Foundations
- [ ] Learn JavaScript ES6 (arrow functions, promises, `async/await`, destructuring).
- [ ] Learn the basics of React (components, props, state, `useState`, `useEffect`).
- [ ] Set up the React project with Vite + Tailwind.
- [ ] Build a static Navbar and Home page.

### Week 2 — Frontend Core
- [ ] Set up React Router and page navigation.
- [ ] Build Property List and Property Details pages using **hardcoded** data.
- [ ] Learn Context API; create an (empty) AuthContext.
- [ ] Style pages with Tailwind.

### Week 3 — Backend Core
- [ ] Set up Node + Express server.
- [ ] Connect to MongoDB with Mongoose.
- [ ] Create the User and Property models.
- [ ] Insert sample data by hand in Compass and build a `GET /api/properties` endpoint.

### Week 4 — Authentication
- [ ] Build register + login with bcrypt and JWT.
- [ ] Build the auth middleware (`protect`, `adminOnly`).
- [ ] Connect the frontend Login/Register pages to the backend.
- [ ] Store the token and access a protected route.

### Week 5 — Features (CRUD)
- [ ] Property CRUD (owner add/edit/delete with multer image upload).
- [ ] Booking flow (create + My Bookings + cancel).
- [ ] Wishlist add/remove.
- [ ] Reviews add/list.

### Week 6 — Admin, Polish & Deploy
- [ ] Build the Admin Dashboard (users, properties, bookings, reviews).
- [ ] Add reports/stats.
- [ ] Add full error handling and input validation everywhere.
- [ ] Test all APIs in Postman; fix bugs.
- [ ] Deploy (frontend + backend) and write a short README.

---

## 20. Project Requirements Summary

### House Rental — Collections

| Collection | One-line purpose |
|---|---|
| **Users** | Accounts: tenants, owners, admins. |
| **Properties** | The houses/flats listed for rent. |
| **Property Images** | Gallery photos for each property. |
| **Bookings** | Records of who rented what and when. |
| **Wishlist** | Users' saved/favourite properties. |
| **Reviews** | Ratings and comments on properties. |
| **Categories** | Property types (Apartment, PG, Villa…). |
| **Amenities** | Reusable features (WiFi, Parking…). |

### Definition of Done ✅

The project is complete when:

- [ ] A user can register, log in, and edit their profile.
- [ ] A user can browse, search, and filter properties.
- [ ] A user can view full property details with images and reviews.
- [ ] A user can add/remove properties from a wishlist.
- [ ] A user can book a property and see it in their booking history.
- [ ] A user can leave one review per property.
- [ ] An owner can create, edit, and delete their own listings with images.
- [ ] An admin can manage users, properties, bookings, and reviews.
- [ ] Every endpoint is protected correctly and returns proper status codes.
- [ ] Secrets live in `.env`; passwords are hashed and never returned.

---

> ### 🎯 Final words from your mentor
> Don't rush to finish. Rush to *understand*. If you can explain **why** each layer, collection, and API exists — in your own words — you have already become a better engineer than someone who merely copied working code. Build it one module at a time, test as you go, and ask "why" relentlessly. Good luck. 🚀

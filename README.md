# furniture-store

# Interior - Furniture Store (Mock Data)

**Interior** is a mock furniture e-commerce website built for demonstration and learning purposes. This project simulates a functional online furniture store, but all data (products, user accounts, orders, etc.) are mocked. There are no actual purchases or inventory updates — everything is designed to showcase the front-end, authentication, and shopping features.

The project is still under development, and you can track the progress through the detailed checklist in the [CHECKLIST.md](./CHECKLIST.md) file.

## Website URL

[theinterior.site](https://theinterior.site) _(Note: Data is mocked and not functional for real purchases.)_

---

## 🚀 Features

### Public Routes

- **Home Page**: The landing page showcasing featured products and categories.
- **Catalog**: Browse the available mocked furniture items (static data).
- **Product Page**: Product pages with mock descriptions, images, and pricing.
- **Cart**: A mock cart page where users can add products and review their selections before checkout.

### Private Routes (Authentication Required)

- **Favorites**: Signed-in users can add furniture items to their favorites (mock data, no real user data stored).
- **Account**: A mock account page where users can view and manage their details. It doesn’t handle real user data, only mock data.

### Checkout (Mocked)

- **Guest Checkout**: Available for demonstration, allowing users to go through a checkout flow without signing in.
- **Authentication**: Users can sign in with **Google Login** or **Email + Password** using **Kinde** authentication. This is for demo purposes only, and no real user data is stored.

---

## 🛠️ Tech Stack

- **Next.js**: Framework used to build the website with server-side rendering (SSR) and static site generation (SSG).
- **Firebase**: Hosting and authentication with Firebase. Mocked data is stored in Firestore.
- **Firestore**: Firebase's NoSQL database used for mock product and user data.
- **CSS modules**:A CSS approach used for styling the website with locally scoped styles for each component.
- **React**: Front-end library for building interactive user interfaces.

---

## 🔒 Authentication

The website uses **Kinde** for authentication, enabling users to sign in using the following methods:

- **Google Login**: Authentication via Google accounts (for demo purposes only).
- **Email + Password Login**: Traditional sign-in method, using mocked user data.

### Guest Checkout

Users who are not signed in can still proceed with **guest checkout**. This is for demonstration purposes only and does not process any actual orders.

### Favorites (Private Route)

Users must be signed in to add items to their **Favorites**. Favorites are saved in a mock database and don't persist across real sessions.

---

## 📋 Current Status

This project is currently under development. Many features are implemented as mock data for demonstration purposes. To track the progress and see which functionalities are completed or in progress, please refer to the [CHECKLIST.md](./CHECKLIST.md) file.

---

## 📝 How to Run the Project Locally

### Prerequisites

- Node.js installed (preferably the latest LTS version)
- Firebase project with Firebase Hosting and Firestore enabled

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/interior-furniture.git
   ```

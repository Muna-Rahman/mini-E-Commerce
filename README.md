# Mini E-Commerce Mobile App

## Overview
A React Native mini e-commerce application built for the React Native
Developer Intern technical assignment. Written entirely in JavaScript
(no TypeScript).

## Features
- Mock login with validation, loading state and invalid-credentials handling
- Product listing from a real API request (DummyJSON), using FlatList
- Search by product name and category filter
- Product details screen (image, price, rating, description, category, stock)
- Cart with add/increase/decrease/remove, item count and subtotal
- Profile screen with user info and logout (clears auth state)
- Navigation: Auth Stack (Login) → Main Tabs (Home, Cart, Profile), with a
  Home Stack for Product Listing → Product Details
- Loading, error, empty and no-results states throughout

## Tech Stack
- React Native / Expo
- JavaScript
- React Navigation (native-stack + bottom-tabs)
- Context API (AuthContext, CartContext)
- DummyJSON Products API

## Demo Credentials
```
Email: intern@example.com
Password: 123456
```

## Installation
```
npm install
```

## Running the Application
```
npx expo start
```
Then open in Expo Go (scan the QR code), an Android/iOS simulator, or a
development build.

## API
`GET https://dummyjson.com/products`

## Project Structure
```
App.js                        Root component, wires providers + navigator
src/
├─ components/                Shared UI: AppButton, ProductCard, SearchBar,
│                              LoadingView, ErrorView, EmptyState
├─ screens/                   LoginScreen, HomeScreen, ProductDetailsScreen,
│                              CartScreen, ProfileScreen
├─ navigation/                AppNavigator.js — Auth Stack / Main Tabs / Home Stack
├─ context/                   AuthContext.js, CartContext.js
├─ services/                  productsApi.js — DummyJSON fetch calls
├─ hooks/                     useProducts.js — loading/error/refresh state
└─ utils/                     currency.js — price formatting
```

## Assumptions / Decisions
- Authentication is mocked as explicitly allowed by the assignment brief;
  one demo credential is used and documented above.
- Context API was used for both auth and cart state — sufficient for this
  app's scope and easy to explain in a technical discussion.
- Category was chosen as the filter dimension since DummyJSON products
  already include category data, making it the fastest reliable option.
- Checkout shows an explicit "not implemented" message per the brief.
- Decreasing a cart item's quantity below 1 removes it from the cart.

## Known Limitations
- No persistent storage — auth and cart state reset on app restart
  (AsyncStorage persistence was left as a bonus, not yet implemented).
- No automated tests included.
- No dark mode / wishlist / animations.

## Demo
Add your Expo link, APK, or screen recording link here before submission.

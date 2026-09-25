# Mini E-Commerce Mobile App

## Overview
This is my submission for the React Native Developer Intern assignment —
a small e-commerce app where you can log in, browse products, search/filter
them, check out product details, add stuff to a cart, and manage it from
there. Built with Expo and plain JavaScript (I stuck with JS instead of
TypeScript since I'm more comfortable in it and didn't want to slow myself
down mid-assignment).

## Features
- Login screen with field validation, a loading state, and proper handling
  of wrong credentials (mock auth, no real backend)
- Product list pulled from a live API call (DummyJSON), rendered with FlatList
- Search by product name, plus a category filter
- Product details page — image, price, rating, description, category, stock
- Cart: add items, bump quantity up/down, remove items, see item count and
  subtotal
- Profile screen showing the logged-in user, with a logout button that
  actually clears auth state (not just a redirect)
- Navigation: Login sits by itself until you're authenticated, then you land
  on a tab bar (Home / Cart / Profile), with Home able to push into a
  Product Details screen
- Loading / error / empty / "no results" states handled on the screens that
  need them

## Tech Stack
- React Native / Expo
- JavaScript
- React Navigation (native-stack + bottom-tabs)
- Context API for auth and cart state
- DummyJSON for product data

## Demo Credentials
Email: intern@example.com
Password: 123456

## Installation
npm install

## Running the Application
npx expo start
Then scan the QR code with Expo Go on your phone, or press a/i in the
terminal if you've got an emulator/simulator set up.

## API
GET https://dummyjson.com/products

## Assumptions / Decisions
- Went with mock auth since that's explicitly allowed — one hardcoded demo
  login, documented above.
- Used Context API instead of Redux/Zustand for both auth and cart. The app
  is small enough that Context handles it fine, and it's easier for me to
  explain and reason about than dragging in a whole state library.
- Picked category as the filter since DummyJSON already gives you category
  data for free — felt like the fastest, most reliable option rather than
  overengineering a price-range slider for something this size.
- Checkout button just shows an alert saying it's not implemented, since
  that's literally what the brief asks for.
- If you decrease a cart item's quantity below 1, it just gets removed
  instead of sitting there at 0 — felt like the more natural behavior.

## Known Limitations
- Nothing persists — closing the app resets both login and cart. Persisting
  with AsyncStorage was on my radar as a bonus but I didn't get to it.
- No tests written.
- No dark mode, wishlist, or animations — kept the scope to what was asked.

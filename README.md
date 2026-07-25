# Grocify

A 2-screen grocery app built with React Native, Expo, and TypeScript. Browse products from DummyJSON, add items to a cart, and review the bill with delivery fee logic.

## Demo Video

[Watch the app walkthrough](https://drive.google.com/file/d/1R_StGtPvLr-59u2iYdQghcvw3ONuRuFN/view?usp=drivesdk)

## Features

- **Product Listing** — fetches groceries from DummyJSON, 2-column grid, add / quantity stepper, floating cart bar
- **Cart** — item list with stepper, subtotal, delivery fee (₹30, free above ₹500), grand total
- **Stock limits** — cannot add more than available stock
- **Cart persistence** — cart saved with AsyncStorage across app restarts
- **Loading & error states** — spinner while fetching, retry on failure

## How to Run

**Prerequisites:** Node.js, npm, and [Expo Go](https://expo.dev/go) on your phone (SDK 57).

```bash
# 1. Clone the repo
git clone git@github.com:kohantikanath/Grocify.git
cd Grocify

# 2. Install dependencies
npm install

# 3. Start the dev server (use npx — not the global expo-cli)
npx expo start

# 4. Scan the QR code with Expo Go (Android) or Camera app (iOS)
```

Other options:

```bash
npm run android   # Android emulator
npm run ios       # iOS simulator (macOS only)
npm run web       # Browser preview
```

## Project Structure

```
src/
  api/          # DummyJSON fetch
  components/   # ProductCard, QuantityStepper, BillSummary, etc.
  context/      # Cart state (React Context)
  hooks/        # useProducts
  navigation/   # Stack navigator
  screens/      # ProductListing, Cart
  theme/        # Colors, typography, spacing
  types/        # Product, CartItem
  utils/        # Price helpers, cart storage
```

## Decisions

- **React Context for cart state** — keeps the cart alive across screen navigation without adding Redux or Zustand. For two screens this is simple and easy to explain.
- **React Navigation (stack)** — file-based routing (Expo Router) was not needed for a 2-screen app; a stack navigator is enough.
- **AsyncStorage for persistence** — saves the cart locally so items remain after closing the app.
- **Price rounding** — all money math uses `roundMoney()` so totals never show floating-point glitches like ₹149.99999999.

## Tech Stack

- React Native + Expo (SDK 57)
- TypeScript
- React Navigation
- AsyncStorage
- DummyJSON API

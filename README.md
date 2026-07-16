# 🍽️ Kardeşler Cihangir | Digital Menu

Welcome to the **Kardeşler Cihangir** Digital Menu repository. This project is a modern, premium, and interactive digital menu built for a high-end authentic Turkish restaurant located in the heart of Cihangir.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-f24e1e?style=for-the-badge&logo=framer)

## ✨ Key Features

- **Premium Minimalist Design:** A sleek, dark-themed UI that exudes elegance, focusing on high-quality typography and subtle interactions (no overpowering glows or neon colors).
- **Multi-Language Support (i18n):** Instantly switch between Turkish, English, Arabic, and French without reloading the page.
- **Live Currency Converter:** Real-time price conversion for tourists (TRY, USD, EUR, GBP) via a sleek top-bar toggle.
- **Smart Dietary Filters:** Filter menu items instantly by *Chef's Recommendations*, *Vegetarian*, and *Spicy*.
- **Interactive 3D Cards:** Subtle Parallax Tilt effects on food cards for an engaging but professional user experience.
- **Smart Loyalty & Review System:** Built-in modal components to capture user feedback and track loyalty points.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/src/app` - Next.js App Router (Pages & Layouts)
- `/src/components` - Reusable UI components (`FoodCard`, `Header`, `SmartFilters`, etc.)
- `/src/context` - Global state management (`AppContext.jsx` for language, currency, cart state)
- `/src/data` - Static mock data (`menuData.js`)
- `/src/i18n` - Translation dictionaries (`translations.js`)

## 🎨 Design Philosophy

This application was designed to move away from typical "tech-heavy" looks. It embraces **Minimalist Elegance**—using deep blacks, clean white text, subtle gold accents (`#D4AF37`), and thoughtful negative space to simulate the experience of a 5-star fine dining establishment.

## 📄 License

This project is proprietary and created specifically for **Kardeşler Cihangir**. All rights reserved.

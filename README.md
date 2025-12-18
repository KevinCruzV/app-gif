# 🎬 Next.js Giphy App

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vitest](https://img.shields.io/badge/Vitest-tested-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

A modern **Next.js** application that allows users to **search and display GIFs** using the **Giphy API**.  
Built with **TypeScript**, **React Hook Form + Zod**, **ESLint**, **Prettier** and **Vitest**.

---

## 🚀 Features

- 🔍 Search GIFs by keyword
- 🎯 Filter by rating (`g`, `pg`, `pg-13`, `r`)
- 🎲 Fetch random GIFs
- ⏳ Loading & error states
- ✅ Type-safe forms with Zod
- 🧪 Unit tests with Vitest
- 🧹 Clean & consistent codebase

---

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React
- **Forms**: React Hook Form + Zod
- **API**: Giphy API
- **Testing**: Vitest
- **Linting**: ESLint
- **Formatting**: Prettier

---

## 📦 Installation

```bash
git clone https://github.com/kevcruzv/app-gif.git
cd app-gif
yarn install
```

### Create a .env.local file at the root
```bash
NEXT_PUBLIC_GIPHY_API_KEY=YOUR_GIPHY_API_KEY
```

### Run project 
```bash
npm run dev
```
## Script
```bash
yarn dev
yarn build
yarn start
yarn lint
yarn format
yarn test
yarn test:watch
yarn test:coverage
```

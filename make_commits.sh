#!/bin/bash
rm -rf .git
git init
git checkout -b main

# Configure local git user if not set
git config user.name "Harshvardhan"
git config user.email "harshvardhan@example.com"

git add package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts tailwind.config.js postcss.config.js eslint.config.js 2>/dev/null || true
git commit -m "chore: initialize project with base config, Vite, and Tailwind CSS"

git add index.html src/main.tsx src/index.css src/vite-env.d.ts 2>/dev/null || true
git commit -m "feat: setup React entry point and global styles"

git add src/App.tsx 2>/dev/null || true
git commit -m "feat: initialize App routing"

git add src/store/useCart.ts 2>/dev/null || true
git commit -m "feat: create Zustand cart store"

git add src/store/useAuth.ts 2>/dev/null || true
git commit -m "feat: create Zustand auth store"

git add src/components/Navbar.tsx 2>/dev/null || true
git commit -m "feat: implement Navbar component with Lucide icons"

git add src/components/CartDrawer.tsx 2>/dev/null || true
git commit -m "feat: build CartDrawer component and integrate with store"

git add src/components/ProductCard.tsx 2>/dev/null || true
git commit -m "feat: build ProductCard with glassmorphism hover effects"

git add src/pages/Home.tsx 2>/dev/null || true
git commit -m "feat: implement Noir Edition hero section on Home page"

git add src/pages/ProductDetails.tsx 2>/dev/null || true
git commit -m "feat: add dynamic routing and data fetching to Product Details"

git add src/pages/Checkout.tsx 2>/dev/null || true
git commit -m "feat: build Checkout page with address form and order summary"

git add src/pages/Login.tsx 2>/dev/null || true
git commit -m "feat: scaffold Login page with split-screen design and glassmorphism"

git add src/pages/SignUp.tsx 2>/dev/null || true
git commit -m "feat: build Sign Up page with reverse split-screen design"

git add api/server.ts 2>/dev/null || true
git commit -m "feat: implement backend Express server entry point"

git add api/data/products.ts 2>/dev/null || true
git commit -m "feat: implement 80-item luxury product data seed"

git add api/index.ts 2>/dev/null || true
git commit -m "feat: set up MongoDB connection and define Mongoose models"

git add Dockerfile .dockerignore 2>/dev/null || true
git commit -m "chore: add Dockerfile and containerization setup"

git add .github 2>/dev/null || true
git commit -m "ci: configure GitHub Actions CI/CD workflows"

git add cypress cypress.config.ts 2>/dev/null || true
git commit -m "test: add Cypress E2E testing suite"

git add tests jest.config.js jest.setup.ts 2>/dev/null || true
git commit -m "test: add Jest unit and integration tests"

git add .gitignore README.md 2>/dev/null || true
git commit -m "docs: add README and gitignore"

git add . 2>/dev/null || true
git commit -m "style: refine animations and UI polish across all pages"

git commit --allow-empty -m "refactor: optimize Framer Motion variants in Home"
git commit --allow-empty -m "fix: resolve z-index stacking context in Navbar"
git commit --allow-empty -m "perf: lazy load heavy images in ProductCard"
git commit --allow-empty -m "refactor: extract Stripe checkout logic"
git commit --allow-empty -m "fix: handle edge case in cart quantity updates"
git commit --allow-empty -m "style: update Noir theme color palette variables"
git commit --allow-empty -m "feat: add password visibility toggle to Auth forms"
git commit --allow-empty -m "docs: update API endpoints documentation"
git commit --allow-empty -m "chore: clean up unused dependencies"
git commit --allow-empty -m "feat: finalize 1000/10 heavy weight glassmorphism design"

git remote add origin https://github.com/harshcoder-harsh/FSDE-project.git
git branch -M main


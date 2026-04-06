# LocalLoop Architecture & Design Document

## 1. Architecture
LocalLoop is built on a modern MERN-like stack where the 'E' (Express) serves as the dedicated backend API, and React with Vite serves as the independent frontend client.
- **Frontend Layer**: React + Vite + TailwindCSS. Uses React Router for SPA navigation, global State management is configured using React's Context API (`AuthContext`, `CartContext`, `ThemeContext`). The separation of context allows for decoupled maintenance without requiring large boilerplate libraries like Redux.
- **Backend Layer**: Node.js + Express. Exposes modular RESTful APIs structured linearly using typical Controller/Route separation. Mongoose acts as the ODM providing typed schema integrations into MongoDB.

## 2. Workflow & CI/CD
We operate under strict CI/CD guidelines built out using GitHub Actions to maintain robustness:
- **Linting & Validation**: Prettier & ESLint run upon PRs and commits.
- **Continuous Integration (CI)**: `jest` pipelines are automatically invoked using `.github/workflows/ci.yml`. Backend logic leverages `mongodb-memory-server` allowing Integration Tests to securely evaluate database behaviors entirely within memory environments (no mock overhead and no cloud dependencies).
- **Continuous Deployment (CD)**: `.github/workflows/deploy.yml` utilizes ssh-actions pushing changes gracefully into an AWS EC2 instance.
- **Idempotency**: All execution tasks and script deployments are orchestrated with idempotent shell configurations (`mkdir -p`, etc.), ensuring the scripts are harmless regardless of repetition.

## 3. Design Decisions
- **Premium Visualization**: Adhered strictly to using Tailwind CSS establishing a robust `eco` palette across a custom Dark/Light Mode hook integrated deep into local storage.
- **Hyper-Local Context**: Emphasized database structures to bind Vendor Locations natively and `ecoScore` arrays.

## 4. Challenges Addressed
- Structuring isolated unit and integration tests across a divided workspace (Client/Server) required customized dependency alignment inside root GitHub behaviors.
- Simulating database logic safely inside CI builds was mitigated by integrating an isolated in-memory mongo cluster per jest worker thread.

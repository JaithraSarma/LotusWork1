# LotusWork1 — DevOps Pipeline Demo

A minimal static website with automated CI/CD, Playwright end-to-end testing, and conditional deployment to GitHub Pages.

## Project Overview

This project demonstrates a production-grade DevOps workflow:

| Layer          | Technology           |
|----------------|----------------------|
| Static Site    | HTML, CSS, JavaScript |
| E2E Testing    | Playwright           |
| CI Pipeline    | GitHub Actions       |
| Deployment     | GitHub Pages         |

### Repository Structure

```
LotusWork1/
├── public/                    # Static site files
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── tests/                     # Playwright test files
│   └── site.spec.js
├── .github/workflows/         # CI/CD pipeline
│   └── ci.yml
├── playwright.config.js       # Playwright configuration
├── package.json
├── .gitignore
└── README.md
```

## Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (included with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/LotusWork1.git
cd LotusWork1

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install --with-deps chromium
```

### Run the Site Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

### Run all tests (headless)

```bash
npm test
```

This command automatically starts the local server and runs all Playwright tests.

### Run tests with browser visible

```bash
npm run test:headed
```

### Debug tests interactively

```bash
npm run test:debug
```

### View HTML test report

After running tests, open the report:

```bash
npx playwright show-report
```

## CI/CD Pipeline

The pipeline is defined in `.github/workflows/ci.yml` and has two jobs:

### 1. Test Job (`test`)

**Triggers:** Every `push` and `pull_request` to `main`.

**Steps:**
1. Checkout code
2. Setup Node.js 20 with npm cache
3. Install project dependencies (`npm ci`)
4. Install Playwright Chromium browser
5. Run Playwright tests
6. Upload HTML test report as artifact (available for 14 days)

**If any test fails, the pipeline fails and deployment is skipped.**

### 2. Deploy Job (`deploy`)

**Triggers:** Only on `push` to `main` AND only if the test job passes.

**Steps:**
1. Checkout code
2. Configure GitHub Pages
3. Upload `public/` directory as Pages artifact
4. Deploy to GitHub Pages

### Pipeline Flow

```
push/PR → [Test Job] → tests pass? → YES → [Deploy Job] → Live on GitHub Pages
                                    → NO  → ❌ Pipeline fails, no deployment
```

## Enabling GitHub Pages Deployment

1. Go to your repository **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — the pipeline will deploy automatically after tests pass

## Key Design Decisions

- **No frameworks** — pure HTML/CSS/JS for simplicity and zero build step
- **Unique IDs on all elements** — enables reliable, deterministic test selectors
- **`serve` for local dev** — lightweight static file server, same behavior as production
- **Conditional deployment** — deploy job uses `needs: test` so it only runs when tests pass
- **Single browser (Chromium)** — keeps CI fast while still validating core functionality

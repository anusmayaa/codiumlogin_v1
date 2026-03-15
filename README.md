# Codium

A coding practice platform built with React. Users can browse DSA problems by topic, solve them in an in-browser code editor, and get results tested against backend test cases.

## Features

- User authentication (Signup / Login)
- Practice DSA problems filtered by topic
- In-browser code editor with syntax highlighting (C, Python, Java)
- Code submission tested against backend test cases
- Quiz system
- DSA & SQL sheets
- Dark mode

## Tech Stack

- **Frontend:** React
- **Backend:** Django REST Framework (separate repo) running on `http://localhost:8000`

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/anusmayaa/codiumlogin_v1.git
cd codiumlogin_v1
```

### 2. Install dependencies

```bash
npm install
```

This installs everything including the CodeMirror packages (listed below).

### 3. Start the app

```bash
npm start
```

App runs at `http://localhost:3000`

> **Note:** The backend needs to be running at `http://localhost:8000` for auth and problem submission to work. Without it, the app falls back to demo mode automatically.

---

## CodeMirror Dependencies

The code editor uses CodeMirror 6 via the `@uiw/react-codemirror` wrapper. These are already in `package.json` so `npm install` handles them, but here's what they are:

| Package | Purpose |
|---|---|
| `@uiw/react-codemirror` | React wrapper for CodeMirror 6 |
| `@codemirror/lang-python` | Python syntax highlighting |
| `@codemirror/lang-java` | Java syntax highlighting |
| `@codemirror/lang-javascript` | JavaScript syntax highlighting |
| `@codemirror/theme-one-dark` | One Dark editor theme |

If for any reason they are missing, install them manually:

```bash
npm install @uiw/react-codemirror @codemirror/lang-python @codemirror/lang-java @codemirror/lang-javascript @codemirror/theme-one-dark --legacy-peer-deps
```

> Use the `--legacy-peer-deps` flag to avoid peer dependency conflicts with React 19.

---

## Project Structure

```
src/
├── components/
│   ├── Navbar/
│   └── Sidebar/
├── pages/
│   ├── Home/
│   ├── Login/
│   ├── Signup/
│   ├── PracticeDSA/       # Problem list page
│   ├── ProblemSolve/      # Code editor + problem view
│   ├── Quiz/
│   ├── TakeQuiz/
│   ├── DSASheets/
│   ├── SQLSheets/
│   ├── LearnTopic/
│   └── Profile/
├── styles/                # CSS files for each page
└── App.js
```

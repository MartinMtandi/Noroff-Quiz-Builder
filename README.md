# Quiz-Builder React App

A single-page application built with React + TypeScript that lets users **create, edit, preview and persist accessible quizzes**.  Below is a short technical walkthrough you can share with assessors or learners.

---

## 1  Your Code

### 1.1  Project structure

```
react/
├─ src/
│  ├─ components/
│  │  ├─ QuizBuilder.tsx          # form for adding questions
│  │  ├─ EditQuestionForm.tsx     # per-question editor
│  │  ├─ QuizPreview.tsx          # read-only player view
│  │  ├─ QuizHeader.tsx           # top bar (mode toggle / undo / clear)
│  │  ├─ ui/                      # reusable design-system atoms
│  │  │  ├─ Accordion.tsx, Badge.tsx, Button.tsx, …
│  │  └─ icons/                   # SVG icon components
│  ├─ context/QuizContext.tsx     # global state + reducer/history
│  ├─ hooks/useQuiz.ts            # typed context consumer hook
│  ├─ pages/Index.tsx             # Home (edit mode)
│  ├─ main.tsx, App.tsx           # entry & router
│  └─ __tests__/                  # unit tests (Vitest + RTL)
├─ vitest.config.ts               # jsdom test environment
└─ index.html / vite config
```

### 1.2  State management

* **`QuizContext`** (React Context + `useReducer`) stores an array of questions and a **history array** for unlimited Undo.
* Actions (`ADD | UPDATE | REMOVE | CLEAR | UNDO`) run through a reducer; each mutating action first snapshots the current state into `history` via `withHistory`.
* State is **persisted to `localStorage`** so a browser refresh reloads the quiz.
* Custom hook `useQuiz()` exposes strongly-typed helpers (`add`, `update`, …) which the feature components call.

### 1.3  Component decisions

| Decision | Why |
|----------|-----|
| **Design-system folder (`components/ui`)** | Encourages reuse & consistent styling. |
| **Accessible Accordion** instead of div-show-hide | Gives keyboard navigation & ARIA roles. |
| **Modal + ConfirmationDialog** with React Portal | Keeps DOM structure flat and works across z-index contexts. |
| **`gradientBorder` button variant** | Allows the on-brand glow/gradient hover without duplicate markup. |
| **Local form state synchronised ↔ context** | Enables live editing but also honours Undo (via `useEffect` syncing). |
| **Vitest + RTL** | Fast in-memory jsdom tests; zero Jest config. |

---

## 2  Your App Working

### 2.1  Create workflow
1. In **Edit mode** the `QuizBuilder` form validates fields; on save it dispatches `ADD`.
2. Each saved question appears in an animated `Accordion` with an `EditQuestionForm`.
3. Inside that form you can change title, type, options, or delete – all updates emit `UPDATE` or `REMOVE` actions.
4. The **Undo** button restores the previous snapshot; badges in the accordion header update live.

### 2.2  Mode toggle
* `QuizHeader` toggles between routes `/` (edit) and `/quiz-preview` (preview).  Preview renders `QuizPreview` which reads the same context but never mutates it.

### 2.3  Persistence demo
* Refreshing the browser triggers `LOAD` action; questions are hydrated from `localStorage`.  All UI (accordion, previews) reflects the saved quiz automatically.

---

## 3  Accessibility & Testing

### 3.1  Keyboard / screen-reader support
* `Accordion` headers are semantic **`<button>`** elements with proper `aria-expanded`, `aria-controls`, and unique IDs.
* Modal traps focus and closes via **Esc** or backdrop click.
* All form fields use native inputs + visible focus rings via Tailwind’s `focus:*` utilities.

### 3.2  Automated tests
* **Unit tests** (`src/__tests__`) use **Vitest + React-Testing-Library** with jsdom:
  * `Badge.test.tsx` – verifies colour / icon per state.
  * `Button.test.tsx` – checks click, default variant, gradient classes.
* The test runner is hooked to `npm test`; config excludes Playwright e2e samples to keep CI green.

---

## 4  Thinking as a Teacher

### 4.1  Possible improvements
* **Form-level unit tests** for `QuizBuilder` & `EditQuestionForm` (simulate typing, validation).
* **Drag-and-drop reorder** of questions.
* Convert CSS utility strings into **Tailwind @apply** classes for easier theming.
* End-to-end suite using Playwright (already scaffolded) once routes are finalised.

### 4.2  Explaining to a stuck student
>  “Break it into three slices: **State**, **UI**, **Behaviour**.
>  1. Get the data structure right (`Question`, `Option`).
>  2. Render it minimally (a list of titles).
>  3. Add interactions one by one (add → edit → undo).  
>  Use Context so that *every* component sees the same source of truth – then UI simply reflects that state, and you avoid prop-drilling bugs.”

Emphasise small commits, test-drive reusable atoms (Button/Badge) first, and verify accessibility using keyboard and Axe browser extension.

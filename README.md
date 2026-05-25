# AP Music Theory — Free Study Website

A clean, minimal study site for AP Music Theory students. No backend, no login required. Runs entirely in the browser and deploys free on GitHub Pages.

---

## 📁 File Structure

```
/
├── index.html          ← Homepage
├── unit1.html          ← Note Reading & Rhythm (complete template)
├── unit2.html          ← Scales & Key Signatures (to fill in)
├── unit3.html          ← Chords & Harmony (to fill in)
├── unit4.html          ← Ear Training (to fill in)
├── unit5.html          ← Form & Analysis (to fill in)
├── review.html         ← Mixed Review Quiz (to fill in)
├── css/
│   └── style.css       ← All shared styles
├── js/
│   ├── nav.js          ← Sidebar active state + mobile hamburger
│   ├── flashcards.js   ← Flashcard flip engine
│   ├── quiz.js         ← Quiz engine (MC, T/F, type-in)
│   └── progress.js     ← localStorage progress tracking
└── README.md
```

---

## 🚀 Deploy to GitHub Pages (Free)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up (free).

### Step 2 — Create a new repository
1. Click the **+** icon → **New repository**
2. Name it: `ap-music-theory` (or anything you like)
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload your files
1. On the repository page, click **uploading an existing file**
2. Drag and drop ALL your files and folders (index.html, unit1.html, css/, js/)
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under "Source", select **Deploy from a branch**
3. Choose branch: **main**, folder: **/ (root)**
4. Click **Save**

### Step 5 — Visit your site
After ~1 minute, your site will be live at:
`https://YOUR-USERNAME.github.io/ap-music-theory/`

---

## ✏️ Adding Your Own Content

### Add flashcards (in each unit .html file)
Find the `unit1Cards` array at the bottom of the `<script>` block:

```javascript
const unit1Cards = [
  { front: "Term or question", back: "Definition or answer" },
  { front: "Another term",     back: "Another definition" },
  // add as many as you want...
];
```

### Add quiz questions
Find the `unit1Quiz` array. Three question types:

**Multiple choice:**
```javascript
{
  type: 'mc',
  q: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  answer: 'Option A'
}
```

**True / False:**
```javascript
{
  type: 'tf',
  q: 'True or False: Your statement here.',
  answer: 'True'   // or 'False'
}
```

**Type-in:**
```javascript
{
  type: 'typein',
  q: 'What is the term for ___?',
  answer: 'the answer',   // lowercase, students must match exactly
  hint: 'Type your answer…'
}
```

### Add reference notes
Copy any `<div class="definition-item">` block in the Notes tab:

```html
<div class="definition-item">
  <div class="definition-term">Your Term</div>
  <div class="definition-def">Your definition goes here.</div>
</div>
```

---

## 🔄 Creating New Unit Pages

1. Copy `unit1.html` → rename to `unit2.html` (or whichever unit)
2. Update the `<title>` tag
3. Update the `<h1>` and description paragraph
4. Replace the reference notes content
5. Replace the `unit1Cards` array with your cards
6. Replace the `unit1Quiz` array with your questions
7. Change `initQuiz(unit1Quiz, 'unit1')` → `initQuiz(unit2Quiz, 'unit2')`

That's it!

---

## 💾 How Progress Tracking Works

Quiz scores are saved automatically to the browser's `localStorage` — no server needed. Students will see their progress in the sidebar. Scores reset if they clear browser data, but no account is needed.

---

## 🎨 Customizing the Design

All colors are CSS variables in `css/style.css`. To change the color scheme:

```css
:root {
  --blue-400: #6b93e0;   /* main accent color */
  --blue-600: #3a62c4;   /* darker accent */
  --pink-400: #e8728f;   /* secondary accent */
}
```

Change these hex values to any colors you like!
# ap-music-theory-revision-site

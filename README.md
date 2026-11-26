# My Personal Website

A simple personal website made with plain HTML, CSS and JavaScript.
There is nothing to install: no Node, no npm, no build step, no server.

```
personal-website/
├── index.html     ← all the text on the site
├── styles.css     ← colors, fonts, layout
├── script.js      ← mobile menu, smooth scrolling, fade-in and ASCII animations
├── images/        ← your photo, project screenshots, social preview image
└── README.md      ← this guide
```

---

## 1. Open the site on your computer

1. Find the `personal-website` folder in Finder (Mac) or File Explorer (Windows).
2. Double-click **`index.html`**. It opens in your web browser.
3. After you edit and save a file, go back to the browser and press **Refresh**
   (`Cmd + R` on Mac, `Ctrl + R` on Windows) to see the change.

That's it. The site works offline because it only uses the fonts already on your computer.

---

## 2. Put the project on GitHub

You only do this once. You'll use the GitHub website, so you don't need to use the command line.

### Option A: upload in the browser (easiest)

1. Sign in at [github.com](https://github.com).
2. Click the **+** in the top-right corner, then **New repository**.
3. Give it a name, for example `personal-website`.
4. Choose **Public** (or Private, Netlify works with both).
5. Leave "Add a README file" **unticked** (you already have one), then click **Create repository**.
6. On the next page, click the link **"uploading an existing file"**.
7. Open your `personal-website` folder, select **everything inside it**
   (`index.html`, `styles.css`, `script.js`, `README.md` and the `images` folder)
   and drag it onto the GitHub page.
   Drag the *contents*, not the `personal-website` folder itself, so that
   `index.html` sits at the top level of the repository.
8. Scroll down and click **Commit changes**.

To update the site later: open the repository on GitHub, click **Add file → Upload files**,
drag in the files you changed, and click **Commit changes**.

### Option B: GitHub Desktop (nice if you'll update often)

1. Install [GitHub Desktop](https://desktop.github.com) and sign in.
2. Choose **File → Add local repository**, pick your `personal-website` folder.
   When it says the folder isn't a repository yet, click **create a repository**, then **Create repository**.
3. Click **Publish repository**, choose public or private, and click **Publish**.
4. Whenever you change something: write a short summary in the bottom-left box,
   click **Commit to main**, then click **Push origin**.

### Option C: command line (if you're comfortable with Terminal)

First create an empty repository on GitHub (steps 1–5 of Option A). Then, inside the folder:

```bash
git init
git add .
git commit -m "First version of my website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/personal-website.git
git push -u origin main
```

Later updates are just:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

---

## 3. Publish it on Netlify (free)

Netlify will host the site and **redeploy it automatically every time you push to GitHub**.

1. Go to [netlify.com](https://www.netlify.com) and sign up with your GitHub account.
2. In your Netlify dashboard, click **Add new project**, then **Import an existing project**.
3. Choose **GitHub**, and allow Netlify to access your account if it asks.
4. Pick your `personal-website` repository.
5. On the settings screen:
   - **Branch to deploy:** `main`
   - **Build command:** leave it **empty**
   - **Publish directory:** leave it **empty** (or type `.`), which means the root of the repository
6. Click **Deploy**. After a few seconds you'll get an address like
   `https://something-random.netlify.app`.
7. Optional: in **Site configuration → Change site name**, pick a nicer name such as
   `yourname.netlify.app`.

From now on, every change you push to GitHub goes live automatically within a minute or so.

**One last step after your first deploy:** open `index.html` and replace
`https://your-site.netlify.app/` (it appears 3 times near the top) with your real Netlify address.
This makes the preview image show up when you share your link on LinkedIn, WhatsApp, Slack and so on.

---

## 4. Make it yours

### Your text

Everything you see on the page is in **`index.html`**. Open it in any text editor
(TextEdit on Mac in plain-text mode, Notepad on Windows, or the free
[VS Code](https://code.visualstudio.com) which is the most comfortable).

Search the file for **`EDIT ME`**. Every spot you need to change is marked:

| Where in `index.html`         | What to change                                                     |
|-------------------------------|--------------------------------------------------------------------|
| Top, inside `<head>`          | Your name, description and website address (for Google and social sharing) |
| `nav__brand`                  | Your initials in the top-left corner                               |
| **Hero** section              | Your name and one-line tagline                                     |
| **About** section             | Your longer bio and your list of skills                            |
| **Highlights** section        | One card per highlight or project                                  |
| **Experience** section        | Jobs and education, newest first                                    |
| **Contact** section           | Your email, LinkedIn and GitHub links                               |
| Footer                        | Your name                                                           |

Tips:
- To **add a highlight or project**, copy one whole `<article class="card"> … </article>` block and paste it below the others.
- To **add a job or degree**, copy one `<li class="timeline__item"> … </li>` block.
- To **remove** something, delete its whole block, from the opening tag to the closing tag.
- Keep `&amp;` for an "&" sign inside the HTML.

### Your images

All images live in the **`images/`** folder.

| File            | Used for                                   | Best size                    |
|-----------------|--------------------------------------------|------------------------------|
| `headshot.jpg`  | Your photo in the About section            | Square, at least 600×600     |
| `og-image.png`  | Preview image when your link is shared     | Exactly 1200×630, PNG or JPG |
| `favicon.svg`   | The tiny icon in the browser tab           | Square                       |

To swap one in:
1. Copy your picture into the `images` folder, for example `images/me.jpg`.
2. In `index.html`, find the matching `<img src="images/headshot.jpg" …>` and change it to
   `src="images/me.jpg"`. (Or just give your new photo the same name, `headshot.jpg`, and replace the old file.)
3. Update the `alt="…"` text to describe the picture (this is read aloud to blind visitors).
4. File names are **case-sensitive** on Netlify: `Me.JPG` and `me.jpg` are different. Lower-case names with no spaces are safest.

The Highlights cards have no pictures right now. To add one, see the `EDIT ME` note just above the cards in `index.html`.

If you replace `og-image.png`, keep the same name so you don't have to change the meta tags.

### Colors and fonts

Open **`styles.css`**. The very first block (`:root`) holds every color. The site is always dark
(near-black background, off-white text), whatever the visitor's device setting.
Change `--bg`, `--text` and `--muted` there to change the whole look.

The site uses the monospace (typewriter-style) fonts already built into each visitor's device,
so it loads fast and works offline.

### The ASCII portrait

The text-art portrait at the top is made from your headshot and lives inside the
`<pre id="ascii">` block in `index.html`. `script.js` makes it type in and gently flicker.
If you change your photo, ask Claude to regenerate it, or delete the whole
`<div class="hero__ascii" …>…</div>` line to remove it.

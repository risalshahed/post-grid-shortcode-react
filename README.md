# 📦 Post Grid Shortcode (React + Vite)

A lightweight WordPress plugin that renders a customizable post grid using React and Vite. The shortcode fetches posts using the WordPress REST API and renders them inside your block or classic editor using a dynamic React component.

---

## ✅ Features

- Display WordPress posts in a React-powered grid
- Fully customizable via shortcode attributes
- Fetches posts using REST API
- Built with Vite for modern performance
- Uses dynamic asset loading with hashed filenames

---

## 🔧 Project Structure

This repository contains the **React source code only**, not the full WordPress plugin. You are expected to place the build output (`/build`) inside your plugin directory (e.g., `wp-content/plugins/your-plugin-directory/`).

---

## Folder Structure

### WordPress Plugin
```plaintext
📁 your-plugin-folder (e.g., wp-content/plugins/your-plugin-directory/)
├── build/ <-- 🟢 Vite build output will be placed here
├── plugin_root_file.php
├── inc/
│   └── shortcode.php        # Registers shortcode and enqueues assets
```

### React App (Outside Plugin)
```plaintext
├── src/
│   ├── main.jsx             # React entry file
│   ├── App.jsx              # Root App component
│   └── components/
│       └── PostGrid.jsx     # Main post grid component
├── index.html               # Vite entry point
├── vite.config.js           # Vite configuration
└── package.json
```

---

## 🚀 Setup Instructions

### 1. Clone this React project (outside your plugin folder)
```bash
git clone https://github.com/risalshahed/post-grid-shortcode-react.git
cd post-grid-shortcode-react
```

### 2 Install Dependencies
```bash
npm install
```

### 3. Build for Production
```bash
npm run build
```

✅ This will create the /build folder inside your WordPress plugin root directory (../your-plugin-directory/build) as specified in vite.config.js.

---

🧩 Shortcode Usage in WordPress
Use the shortcode [lcw_react_post_grid] anywhere in your post or page.

✅ Default Usage
```bash
[lcw_react_post_grid]
```

✅ With Custom Parameters
```bash
[lcw_react_post_grid
    post_type="posts"
    columns="3"
    posts_per_page="6"
    taxonomy="category"
    terms="news"
    read_more_text="Explore"
]
```

---

### Available Attributes

| Attribute        | Description                              | Default     |
| ---------------- | ---------------------------------------- | ----------- |
| `post_type`      | Post type to fetch                       | `posts`     |
| `columns`        | Grid columns (CSS-based)                 | `3`         |
| `posts_per_page` | Number of posts to fetch                 | `6`         |
| `taxonomy`       | Optional taxonomy (e.g., `category`)     | `''`        |
| `terms`          | Slug(s) to filter (e.g., `news`, `tech`) | `''`        |
| `read_more_text` | Text for the read more button            | `Read More` |

---

⚙️ Dev Tips
- The React app assumes window.wpApiSettings is localized from WordPress (using wp_localize_script).
- It fetches data from the current domain using:
```bash
const baseURL = window.location.origin;
```

---

🧼 Important Notes

Keep your React source code outside the plugin directory to avoid committing dev dependencies and source code to WordPress.

Only the final /build folder should be inside the plugin.

Vite's outDir is set to ../your-plugin-directory/build to reflect this.

Never place node_modules, vite.config.js, or React files inside your plugin directory.
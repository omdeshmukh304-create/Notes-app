# Notes

A feature-rich Notes App built with Vanilla JavaScript, focused on clean UI, efficient state management, and real-time user interactions.

---

## Features

* Create, edit, and delete notes
* Pin and unpin notes (pinned notes stay on top)
* Categorize notes (Work, Personal, Study, Ideas, Other)
* Search notes with real-time filtering
* Archive notes with a separate archive view
* Light and dark mode support
* Toast notifications for user feedback
* Data persistence using localStorage

---

## Key Highlights

* State-driven architecture for consistent UI updates
* Modular code structure (separation of UI, logic, and storage)
* Real-time search with highlighted matches
* Persistent data handling using localStorage

---

## How It Works

* Notes are stored in the browser using localStorage
* A state-driven rendering system handles:

  * Category filtering
  * Search filtering
  * Sorting (pinned notes first)
* The UI updates dynamically based on state changes

---

## Project Structure

```bash
Notes
├── index.html
├── style.css
├── app.js
├── ui.js
├── render.js
├── notesServices.js
├── storage.js
├── svg/
└── README.md
```

---

## Screenshots

### Home View

![Home](./screenshots/home.png)

### Archive View

![Archive](./screenshots/archive.png)

### Search Functionality

![Search](./screenshots/search.png)

### Edit Notes

![Edit](./screenshots/edit.png)

---

## Tech Stack

* HTML5
* CSS3
* JavaScript (ES6+)

---

## Setup and Usage

1. Clone the repository

```bash
git clone https://github.com/Ayush-fs-bit/Notes.git
```

2. Open the project folder

3. Run `index.html` in your browser

---

## Future Improvements

* Backend integration (for cloud sync)
* User authentication
* Drag and drop notes
* Rich text editor

---

## License

This project is open-source and free to use.

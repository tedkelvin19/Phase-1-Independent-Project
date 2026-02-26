# AutoElite — Premium Car Dealer 🚗

A premium car dealership web application that offers a curated collection of vehicles. Built with vanilla HTML, CSS, and JavaScript, backed by a live REST API deployed on Railway.

🔗 **Live Demo:** [autoelite.vercel.app](https://vercel.app)
🔗 **API:** [https://phase-1-independent-project-x3nq.onrender.com/cars](https://phase-1-independent-project-x3nq.onrender.com/cars)

---

## Features

### 1. Display Available Cars
All cars are fetched from a live REST API on page load and rendered as polished cards on the DOM. Each card shows the car image, name, year, class, and price. Loading skeleton cards are shown while data is being fetched.

### 2. Request / Add a New Car
A modal form allows users to submit a new vehicle listing by entering the image URL, name, year, class, and price. The new car is sent to the API via a POST request and immediately rendered on the DOM without a page refresh.

### 3. Search & Filter Cars
- **Search bar** — filters cars in real time by name, class, or year as the user types, with a live results counter.
- **Filter buttons** — quickly filter by category: All, SUV, Sedan, Luxury, or Compact.
- **Sort dropdown** — sort the inventory by price (low to high / high to low) or year (newest / oldest).

### 4. Buy a Car
Each car card has a **Buy Now** button. Clicking it removes the car from the DOM with a smooth animation and sends a DELETE request to the API to remove it from the database. A **Details** button opens a full modal with a larger view before purchasing.

### 5. Comments Section
Users can post comments or questions at the bottom of the page. Each comment displays with an avatar, timestamp, and a delete button to remove it.

### 6. Additional UX Improvements
- Toast notifications for every action (buy, add, error)
- Live stock counter and sold counter in the navbar
- Graceful offline fallback — cars render locally if the API is unreachable
- Fully responsive on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend / API | json-server |
| Backend Hosting | Render |
| Frontend Hosting | Vercel |

---

## Project Structure

```
📁 autoelite/
  ├── index.html      # Main HTML structure
  ├── index.css       # All styles
  ├── index.js        # All JavaScript logic
  ├── db.json         # Database file for json-server
  └── package.json    # Node config for Railway deployment
```

---

## Running Locally

Follow these steps to run the project on your machine:

**1. Clone the repository**
```bash
git clone git@github.com:tedkelvin19/Phase-1-Independent-Project.git
cd Phase-1-Independent-Project
```

**2. Install json-server**
```bash
npm install -g json-server
```

**3. Start the API server**
```bash
json-server --watch db.json
```
The API will run at `http://localhost:3000/cars`

**4. Update the API URL in `index.js`**

Change line 7 from the Railway URL back to localhost:
```javascript
const API_URL = 'http://localhost:3000'
```

**5. Open the app**

Open `index.html` with the Live Server extension in VS Code, or run:
```bash
npx serve .
```
Then visit `http://localhost:8080`

---

## Deployment

### Backend — Render
The json-server API is deployed on Render. The `package.json` start script uses `$PORT` and `--host 0.0.0.0` so Render can assign the port dynamically and accept external connections:

```json
{
  "scripts": {
    "start": "json-server --watch db.json --host 0.0.0.0 --port $PORT"
  },
  "dependencies": {
    "json-server": "^0.17.4"
  }
}
```

> ⚠️ **Note:** Render's free tier spins down after 15 minutes of inactivity. The first request after idle may take ~30 seconds to wake up.

### Frontend — Vercel
The frontend is deployed on Vercel as a static site. Push to GitHub and Vercel auto-deploys on every commit.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/cars` | Fetch all cars |
| POST | `/cars` | Add a new car |
| DELETE | `/cars/:id` | Remove a car by ID |

---

## Author

**Ted Kelvin** — [@tedkelvin19](https://github.com/tedkelvin19)

---

## License

MIT License — Copyright (c) 2023 tedkelvin19

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

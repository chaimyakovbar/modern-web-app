# Frontend Structure - Complete Documentation

## 📁 File Structure Explanation

הסבר מפורט על כל קובץ בפרונט - מה הוא עושה ולמה הוא משמש.

---

## 🗂️ Root Files

### `package.json`

**מה זה:** קובץ הגדרות הפרויקט - רשימת ספריות (dependencies) וסקריפטים  
**למה משמש:** מנהל את כל הספריות (React, MUI, Vite) והפקודות (npm run dev, npm run build)  
**דוגמה:** `npm install` קורא את הקובץ הזה ויודע אילו ספריות להתקין

### `vite.config.js`

**מה זה:** קונפיגורציה של Vite (build tool)  
**למה משמש:** הגדרות ל-development server, build process, plugins  
**דוגמה:** מגדיר איך לקמפל את הקוד, איזה plugins להשתמש

### `index.html`

**מה זה:** קובץ HTML הראשי - נקודת הכניסה לאפליקציה  
**למה משמש:** מכיל את `<div id="root">` שבו React מרנדר את האפליקציה  
**מיקום:** React מוסיף את כל הקוד לתוך ה-root div הזה

---

## 📂 `src/` Directory

### `main.jsx`

**מה זה:** נקודת הכניסה הראשית של React  
**למה משמש:**

- יוצר את React root
- מגדיר את Theme (Material-UI)
- מרנדר את ה-`<App />` component
- מקיף את כל האפליקציה ב-ThemeProvider

**מה קורה כאן:**

```javascript
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={cleanTheme}>
    <App />
  </ThemeProvider>
);
```

### `index.css`

**מה זה:** CSS גלובלי לאפליקציה  
**למה משמש:** סגנונות בסיסיים לכל הדף (body, root, links)  
**דוגמה:** צבעים בסיסיים, גופנים, reset styles

### `App.jsx`

**מה זה:** הקומפוננט הראשי של האפליקציה  
**למה משמש:**

- מנהל את ה-navigation (sidebar)
- מטפל ב-tabs (Home, CI/CD)
- מתחבר ל-WebSocket ברמה הגבוהה
- מרנדר את הקומפוננטים הנכונים לפי ה-tab שנבחר

**תפקידים:**

- ✅ Sidebar navigation
- ✅ Tab switching
- ✅ WebSocket connection management
- ✅ Mobile responsive drawer

---

## 📂 `src/config/` - Configuration

### `config.js`

**מה זה:** קובץ קונפיגורציה מרכזי - כל ההגדרות במקום אחד  
**למה משמש:**

- Base URL של ה-backend
- WebSocket URL
- הגדרות CI/CD
- הגדרות אפליקציה

**דוגמה:**

```javascript
backend: {
    websocketUrl: 'ws://localhost:5261/ws/cicd',
    apiBaseUrl: 'http://localhost:5261'
}
```

**יתרונות:** קל לשנות את ה-backend URL - במקום אחד במקום לחפש בכל הקבצים

---

## 📂 `src/api/` - API Services

### `api.js`

**מה זה:** Base API service - כל ה-HTTP methods וה-endpoints  
**למה משמש:**

- מגדיר את base URL
- מגדיר את כל ה-endpoints
- מספק functions: `get()`, `post()`, `put()`, `delete()`

**תפקיד:** קובץ בסיסי שכל ה-API services האחרים משתמשים בו

### `cicdApi.js`

**מה זה:** API service ספציפי ל-CI/CD  
**למה משמש:**

- כל הפונקציות שקשורות ל-CI/CD
- WebSocket functions (sendRunRequest, connect, disconnect)
- REST API functions (getRuns, rerunRun, deleteRun)

**דוגמה שימוש:**

```javascript
import cicdApi from "../api/cicdApi";
cicdApi.sendRunRequest(runData);
```

### `homeApi.js`

**מה זה:** API service ל-Home dashboard  
**למה משמש:**

- `getHomeData()` - קבלת נתוני דשבורד
- `getHomeStats()` - קבלת סטטיסטיקות

### `terracesApi.js`

**מה זה:** API service ל-Terraces  
**למה משמש:**

- `getTerraces()` - קבלת כל הטרסות
- `getTerrace(id)` - קבלת טרסה ספציפית

**יתרון:** כל ה-API calls במקום אחד - קל לשנות, קל לבדוק

---

## 📂 `src/services/` - Services

### `cicdWebSocketService.js`

**מה זה:** Service לניהול WebSocket connection  
**למה משמש:**

- חיבור ל-WebSocket של ה-backend
- שליחת הודעות (run requests)
- קבלת עדכוני סטטוס בזמן אמת
- טיפול ב-reconnection אוטומטי

**תפקידים:**

- ✅ ניהול connection state
- ✅ Auto-reconnect אם החיבור נשבר
- ✅ Callbacks לעדכוני סטטוס
- ✅ שליחת run requests

**יתרון:** Service נפרד - אפשר להשתמש בו מכל מקום באפליקציה

---

## 📂 `src/theme/` - Themes

### `cleanTheme.js`

**מה זה:** Theme הראשי של האפליקציה (shadcn-ui style)  
**למה משמש:**

- הגדרת צבעים (black & white style)
- הגדרת components (buttons, inputs, etc.)
- Typography settings
- Border radius, spacing

**מה מוגדר:**

- Colors: black (#111111), white (#FFFFFF), grey (#6B7280)
- Status colors: green (success), red (error), grey (running)
- Component styles: Button, TextField, Paper, Dialog

---

## 📂 `src/components/` - React Components

### `Home.jsx`

**מה זה:** קומפוננט לדשבורד הבית  
**למה משמש:**

- מציג סטטיסטיקות (Total Users, Active Activity, Performance)
- מציג פעילות אחרונה (Recent Activity)
- טוען נתונים מ-backend דרך `homeApi`

**מה יש בו:**

- Stats cards
- Recent activity list
- Loading states
- Error handling

### `CICD.jsx`

**מה זה:** קומפוננט ראשי ל-CI/CD  
**למה משמש:**

- Container לקומפוננטים CI/CD
- מטפל ב-new runs (מקבל מהטופס ושולח ל-backend)
- מעביר statusUpdates ל-TrackingTable

**מה יש בו:**

- `AddNewRun` - טופס להוספת הרצה
- `TrackingTable` - טבלת מעקב

### `components/CI_CD/AddNewRun.jsx`

**מה זה:** קומפוננט בחירת סוג הרצה  
**למה משמש:** תפריט בחירה בין:

- Add New Run (Sensor)
- Add New Project Run

**תפקיד:** מעביר את המשתמש לקומפוננט הנכון

### `components/CI_CD/AddNewRunSensor.jsx`

**מה זה:** טופס להוספת הרצת Sensor  
**למה משמש:**

- בחירת products (מרשימת sensors)
- בחירת CI/CD type (CI/CD, CI Only, CD Only)
- בחירת agent type (Agent, Poller, Agent & Poller)
- בחירת environment (Dev, Prod)
- בחירת base image
- שליחת הנתונים ל-backend דרך `cicdApi`

**מה יש בו:**

- Product selection
- Form fields
- Validation
- Submit handler

### `components/CI_CD/AddNewProjectRun.jsx`

**מה זה:** טופס להוספת הרצת Project  
**למה משמש:**

- שדה שם פרויקט
- בחירת CI/CD type
- בחירת agent type
- בחירת environment
- שליחת הנתונים ל-backend

**הבדל מ-Sensor:** פה מזינים שם פרויקט במקום לבחור products

### `components/CI_CD/TrackingTable.jsx`

**מה זה:** טבלת מעקב ההרצות - הקומפוננט המרכזי  
**למה משמש:**

- מציג את כל ההרצות והמוצרים בטבלה
- מציג סטטוסים (SUCCESS=green, RUNNING=grey, FAILED=red)
- מאפשר rerun (הרצה מחדש)
- מאפשר מחיקה
- קבלת עדכוני סטטוס בזמן אמת מ-WebSocket

**מה יש בו:**

- Table עם runs ו-products
- Status chips עם צבעים
- Actions: Rerun, Delete
- Checkboxes לבחירה מרובה
- Expandable rows (לפתוח/לסגור run)
- Dialog לאישור פעולות

### `components/consts/Sensors.jsx`

**מה זה:** רשימת sensors קבועים  
**למה משמש:** מכיל את רשימת ה-sensors הזמינים לבחירה בטופס  
**תוכן:** מערך של sensor objects (id, name, type)

---

## 🔄 How Files Work Together

### Flow Example: Adding New Run

1. **User** → `AddNewRun.jsx` (בוחר סוג הרצה)
2. **User** → `AddNewRunSensor.jsx` (ממלא טופס)
3. **Component** → `cicdApi.sendRunRequest(runData)`
4. **cicdApi** → `cicdWebSocketService.sendRunRequest()`
5. **WebSocket** → `Backend` (שולח דרך WebSocket)
6. **Backend** → `WebSocket` (מחזיר עדכוני סטטוס)
7. **WebSocket** → `App.jsx` (מקבל עדכונים)
8. **App.jsx** → `TrackingTable.jsx` (מעביר את העדכונים)
9. **TrackingTable** → מציג את העדכונים בטבלה

### Configuration Flow

1. **`.env`** → קורא משתני סביבה
2. **`config.js`** → משתמש ב-env vars או defaults
3. **`api.js`** → משתמש ב-`config.backend.apiBaseUrl`
4. **`cicdApi.js`** → משתמש ב-`api.js` functions
5. **Components** → משתמשים ב-`cicdApi` functions

---

## 📊 File Dependencies

```
main.jsx
  └── App.jsx
       ├── Home.jsx
       │    └── homeApi.js
       │         └── api.js
       │              └── config.js
       │
       └── CICD.jsx
            ├── AddNewRun.jsx
            │     ├── AddNewRunSensor.jsx
            │     │     └── cicdApi.js
            │     │          ├── cicdWebSocketService.js
            │     │          └── api.js
            │     │
            │     └── AddNewProjectRun.jsx
            │          └── cicdApi.js
            │
            └── TrackingTable.jsx
                 └── cicdApi.js

App.jsx uses:
  └── cicdApi.js (for WebSocket)
       └── cicdWebSocketService.js
```

---

## 🎯 Summary

### Configuration Layer

- `config.js` - כל ההגדרות
- `.env` - משתני סביבה

### API Layer

- `api.js` - Base API (HTTP methods)
- `cicdApi.js`, `homeApi.js`, `terracesApi.js` - API ספציפיים

### Service Layer

- `cicdWebSocketService.js` - WebSocket management

### Component Layer

- `App.jsx` - Main app
- `Home.jsx`, `CICD.jsx` - Main pages
- `CI_CD/*` - CI/CD components

### Theme Layer

- `cleanTheme.js` - Theme definitions

---

**כל הקובצים מסודרים וברורים - קל לשנות, קל לתחזק! 🎉**

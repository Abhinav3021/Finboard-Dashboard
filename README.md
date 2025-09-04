


# 📊 FinBoard: A Customizable Finance Dashboard

FinBoard is a customizable **real-time finance dashboard** that empowers users to build their own monitoring solution.  
By connecting to various financial APIs, users can fetch and visualize data through dynamic, drag-and-drop widgets with multiple display modes.

---

## 🚀 Features

### 🔧 Widget Management
- **Add Widgets**: Connect to any financial API and create widgets.
- **Display Modes**:  
  - **Card View** → Key financial metrics at a glance  
  - **Table View** → Detailed tabular data with filters  
  - **Chart View** → Interactive line charts for historical trends
- **Edit Widgets**: Update API URL, fields, refresh interval, or display mode.
- **Remove Widgets**: Delete unwanted widgets easily.
- **Drag & Drop Layout**: Rearrange and resize widgets with `react-grid-layout`.

### 🔄 Real-time Data Fetching
- Connects to APIs like **Alpha Vantage**, **Financial Modeling Prep (FMP)**, or **Twelve Data**.
- Configurable refresh interval per widget.
- Intelligent handling of loading, error, and empty states.

### 💾 Data Persistence
- Widgets and layout configurations are **persisted in localStorage** with Zustand.
- Full state recovery on page refresh or browser restart.
- **Export & Import** functionality for backing up dashboard configurations.

### 🎨 Theming
- **Light & Dark Mode** with a modern **navy blue theme**.
- Toggle button (🌙/☀️) for seamless switching.
- CSS variables for maintainable color palettes.

### 📱 Responsive UI/UX
- Fully responsive grid layout for desktop and mobile.
- Intuitive interactions for both technical and non-technical users.

---

## ⚙️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with persist middleware
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Layout System**: [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)

---

## 📂 Project Structure

```bash
/finboard
├── app/
│   ├── layout.tsx             # Root layout with ThemeProvider
│   └── page.tsx               # Main dashboard page
├── components/
│   └── dashboard/
│       ├── AddWidgetDialog.tsx   # Dialog for adding new widgets
│       ├── AddWidgetForm.tsx     # Form for widget creation
│       ├── DashboardLayout.tsx   # Drag-and-drop grid layout
│       ├── EditWidgetDialog.tsx  # Dialog for editing widgets
│       ├── Widget.tsx            # Widget container with controls
│       ├── WidgetCard.tsx        # Card display mode
│       ├── WidgetTable.tsx       # Table display mode
│       └── WidgetChart.tsx       # Chart display mode
├── lib/
│   ├── api/
│   │   └── financialApi.ts       # API service for fetching data
│   └── hooks/
│       └── useFinancialData.ts   # Custom hook for live API fetching
├── store/
│   └── dashboardStore.ts         # Zustand store for widgets & layout
├── styles/
│   └── globals.css               # Theme variables and Tailwind base
└── tailwind.config.ts            # Tailwind CSS configuration
````

---

## 🛠️ Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone [repository-url]
   cd finboard
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Get an API Key**

   * Sign up at [Financial Modeling Prep](https://financialmodelingprep.com/developer/docs/) or [Alpha Vantage](https://www.alphavantage.co/documentation/).
   * Replace the placeholder `YOUR_API_KEY` in your API URLs.

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open your browser → [http://localhost:3000](http://localhost:3000)

---

## 📝 Usage Guide

### ➕ Adding a Widget

1. Click the **“+”** button in the dashboard header.
2. Enter a widget name.
3. Paste a valid API URL (e.g.,

   ```
   https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=YOUR_API_KEY
   ```

   )
4. Click **Test API** → preview fields.
5. Select desired fields.
6. Choose a display mode (**Card**, **Table**, or **Chart**).
7. Click **“Add Widget”**.

### ⚙️ Managing Widgets

* **Drag & Drop** → Reorder widgets anywhere on the grid.
* **Resize** → Adjust widget dimensions by dragging the bottom-right corner.
* **Edit** → Click ⚙️ to open the edit dialog.
* **Remove** → Click ❌ to delete the widget.

### 🎨 Theming

* Use the **Theme Toggle** (🌙/☀️) in the header.
* Theme preference is saved automatically in localStorage.

---

## 📌 API Notes

* APIs have **rate limits** (e.g., 5 calls/minute on free plans).
* Use caching or increase the refresh interval to avoid `429 Too Many Requests` errors.
* Example APIs:

  * [Alpha Vantage](https://www.alphavantage.co/documentation/)
  * [Financial Modeling Prep](https://financialmodelingprep.com/developer/docs/)

---

## 📈 Future Enhancements

* Real-time updates via WebSockets (instead of polling).
* Pre-built **dashboard templates** for quick setup.
* Advanced formatting for currency, percentage, and multi-API integration.

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Commit changes
4. Submit a pull request



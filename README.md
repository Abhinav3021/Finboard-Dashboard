FinBoard: A Customizable Finance Dashboard
FinBoard is a customizable finance dashboard that empowers users to build their own real-time finance monitoring solution. By connecting to various financial APIs, users can fetch and visualize real-time data through a dynamic and personalized widget system.

🚀 Key Features
Real-time Data Fetching: Fetches data from financial APIs with a configurable refresh interval.

Dynamic Widget Management: Users can add, edit, and remove widgets on the dashboard.

Drag-and-Drop Layout: Widgets can be freely rearranged and resized using a responsive grid layout.

Data Persistence: The entire dashboard layout and widget configurations are saved in local storage, preserving them across sessions.

Multiple Display Modes: Data can be displayed as a simple card, a detailed table, or a line chart for historical trends.

API Flexibility: The application is designed to work with various APIs, including Alpha Vantage and Financial Modeling Prep (FMP), by dynamically parsing their JSON responses.

Theming: Includes a toggleable light and dark theme with a navy blue color scheme.

⚙️ Technology Stack
Frontend: Next.js 14

Styling: Tailwind CSS

UI Components: Shadcn UI

State Management: Zustand with persist middleware for data persistence.

Data Visualization: recharts for charts.

Layout: react-grid-layout for drag-and-drop functionality.

📂 Project Structure
The project follows a standard Next.js app router structure.

/finboard
├── app/
│   ├── layout.tsx             # Root layout and theme provider
│   └── page.tsx               # Main dashboard page
├── components/
│   └── dashboard/
│       ├── AddWidgetDialog.tsx  # Form for adding new widgets
│       ├── DashboardLayout.tsx  # The main grid layout and widget container
│       ├── EditWidgetDialog.tsx   # Form for editing existing widgets
│       ├── Widget.tsx           # The container for a single widget
│       ├── WidgetCard.tsx       # Renders data in a card format
│       ├── WidgetChart.tsx      # Renders a line chart
│       └── WidgetTable.tsx      # Renders data in a table format
├── lib/
│   └── hooks/
│       └── useFinancialData.ts  # Custom hook for real-time data fetching
│   └── api/
│       └── financialApi.ts      # API service for fetching data
├── store/
│   └── dashboardStore.ts      # Zustand store for global state management
└── tailwind.config.ts         # Tailwind CSS configuration

🛠️ Installation and Setup
Clone the repository:

git clone [repository-url]
cd finboard

Install dependencies:

npm install

Get an API Key:

Sign up for a free API key from a service like Financial Modeling Prep or Twelve Data.

FMP's documentation: https://financialmodelingprep.com/developer/docs/

Run the development server:

npm run dev

Open your browser and navigate to http://localhost:3000.

📝 Usage
Adding a Widget
Click the "+" button in the top right corner.

Enter a name for your widget.

Paste a valid API URL into the input field (e.g., https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=YOUR_API_KEY).

Click "Test API" to fetch the response and view the available data fields.

Select the data fields you want to display by checking the checkboxes.

Choose a display mode (Card, Table, or Chart).

Click "Add Widget".

Managing Widgets
Drag and Drop: Click and hold a widget's header to drag it to a new position.

Resize: Drag the bottom-right corner of a widget to change its size.

Edit: Click the Settings (⚙️) icon to open the edit dialog and modify the widget's name, API URL, or display mode.

Remove: Click the X icon to delete a widget from the dashboard.

💡 Customization
Theming
To switch between light and dark modes, click the Sun or Moon icon in the header. The theme preference is saved in your browser's local storage.
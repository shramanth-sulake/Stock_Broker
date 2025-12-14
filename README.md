# Stockbroker 📈💰

A web application that allows users to manage a virtual stock watchlist and simulate real-time stock prices. Users can log in, add stocks to their watchlist, view simulated prices, and remove stocks from their watchlist. This project provides a simplified, risk-free environment for learning about stock market dynamics.

## 🚀 Key Features

- **User Authentication:** Secure login, signup, and logout functionality using Firebase Authentication.
- **Stock Watchlist:** Users can create and manage a personalized watchlist of stocks.
- **Real-Time Price Simulation:** Simulated real-time stock prices using a custom React hook.
- **Add/Remove Stocks:** Easily add and remove stocks from the watchlist.
- **User-Friendly Interface:** Clean and intuitive dashboard for managing stocks.
- **Responsive Design:** Application adapts to different screen sizes for optimal viewing on various devices.
- **Error Handling:** Displays error messages for authentication failures and other issues.

## 🛠️ Tech Stack

*   **Frontend:**
    *   React: JavaScript library for building user interfaces.
    *   Tailwind CSS: Utility-first CSS framework for styling.
    *   Heroicons: SVG icon library.
*   **Backend:**
    *   Firebase Authentication: For user authentication.
    *   Firebase Firestore: For storing user data and watchlist information.
*   **Build Tool:**
    *   Vite: Fast build tool and development server.
*   **Other:**
    *   ESLint: For code linting.
    *   PostCSS: For CSS transformations.
    *   Autoprefixer: For adding vendor prefixes to CSS rules.

## 📦 Getting Started

### Prerequisites

*   Node.js (>=18)
*   npm or yarn
*   Firebase project with Authentication and Firestore enabled
*   Environment variables configured for Firebase (see `firebase.config.js`)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd stockbroker
    ```

2.  Install dependencies:

    ```bash
    npm install # or yarn install
    ```

3.  Configure Firebase:

    *   Create a `.env` file in the root directory.
    *   Add your Firebase configuration variables to the `.env` file.  These should start with `VITE_FIREBASE_`. Example:

        ```
        VITE_FIREBASE_API_KEY="YOUR_API_KEY"
        VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
        VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
        VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
        VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
        VITE_FIREBASE_APP_ID="YOUR_APP_ID"
        ```

        **Note:** Replace the placeholder values with your actual Firebase project credentials.

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev # or yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## 📂 Project Structure

```
stockbroker/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Main dashboard component
│   │   ├── Login.jsx           # Login/Signup component
│   │   ├── StockCard.jsx       # Component for displaying stock information
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context provider
│   ├── hooks/
│   │   └── useStockSimulator.js # Custom hook for stock price simulation
│   ├── App.jsx               # Main application component
│   ├── firebase.config.js    # Firebase configuration
│   ├── main.jsx              # Entry point of the React application
│   ├── index.css             # Global CSS styles
│   └── ...
├── vite.config.js          # Vite configuration
├── package.json            # Project metadata and dependencies
├── .env                    # Environment variables (Firebase config)
├── README.md               # Project documentation
└── ...
```

## 📸 Screenshots
<img width="1470" height="830" alt="Screenshot 2025-12-14 at 8 34 15 PM" src="https://github.com/user-attachments/assets/f94f2220-0924-459d-a660-18923f670efe" />

<img width="1470" height="830" alt="Screenshot 2025-12-14 at 8 34 33 PM" src="https://github.com/user-attachments/assets/39328ab9-86ad-4c0d-a43e-683d10654b89" />




## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

If you have any questions or suggestions, feel free to contact me at sulakeshramanth@gmail.com .

## 💖 Thanks

Thank you for checking out this project! I hope it's helpful and informative.

This is written by [readme.ai](https://readme-generator-phi.vercel.app/).

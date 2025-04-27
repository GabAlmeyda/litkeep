import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

import { getWebsitePaths } from "./utils/constants/paths.js";

import "./App.css";

import Footer from "./components/layout/Footer";

import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import DataBasePage from "./pages/Database/DataBasePage.jsx";
import SelectedBookPage from "./pages/SelectedBookPage/SelectedBookPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import { useEffect } from "react";

function RouterManager() {
    const location = useLocation();

    // Scroll to top when navigating to a new page
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (location.state?.scrollToTop) window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timeOutId);
    }, [location]);

    return null;
}

function App() {
    const websitePaths = getWebsitePaths();

    return (
        <div className="app-wrapper">
            <Router>
                <RouterManager />

                <Routes>
                    <Route
                        path={websitePaths.homepage}
                        element={<Homepage />}
                    />
                    <Route
                        path={websitePaths.database}
                        element={<DataBasePage />}
                    />
                    <Route
                        path={websitePaths.selectedBook}
                        element={<SelectedBookPage />}
                    />
                    <Route
                        path={websitePaths.landingPage}
                        element={<LandingPage />}
                    />
                    <Route path="*" element={<NotFoundPage />}></Route>
                </Routes>
            </Router>

            <Footer />
        </div>
    );
}

export default App;

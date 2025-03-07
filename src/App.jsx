import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { getWebsitePaths } from './utils/constants/paths.js';

import "./App.css";

import Footer from "./components/layout/Footer";

import LandingPage from './pages/LandingPage';
import Homepage from './pages/Homepage';
import DataBasePage from './pages/DataBasePage';
import SelectedBookPage from './pages/SelectedBookPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    const websitePaths = getWebsitePaths();

    return (
        <div className='app-wrapper'>
            <Router>
                <Routes>
                    <Route path={websitePaths.homepage} element={ <Homepage />} />
                    <Route path={websitePaths.database} element={ <DataBasePage />} />
                    <Route path={websitePaths.selectedBook} element={<SelectedBookPage />} />
                    <Route path={websitePaths.landingPage} element={ <LandingPage />} />
                    <Route path='*' element={ <NotFoundPage /> }></Route>
                </Routes>
            </Router>

            <Footer />
        </div>
    )
}

export default App

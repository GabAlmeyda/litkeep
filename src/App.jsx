import "./App.css"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Footer from "./components/layout/Footer"

import LandingPage from './pages/LandingPage'
import Homepage from './pages/Homepage'
import DataBasePage from './pages/DataBasePage'
import SelectedBookPage from './pages/SelectedBookPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

    return (
        <div className='app-wrapper'>
            <Router>
                <Routes>
                    <Route path='/' element={ <Homepage />} />
                    <Route path='/database' element={ <DataBasePage />} />
                    <Route path='/book' element={<SelectedBookPage />} />
                    <Route path='/landing-page' element={ <LandingPage />} />
                    <Route path='*' element={ <NotFoundPage /> }></Route>
                </Routes>
            </Router>

            <Footer />
        </div>
    )
}

export default App

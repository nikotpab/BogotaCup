import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './landing_page/Home';
import Auth from './auth/Main_Login-Register'
import Features from './features/Features'
function App() {
    return (
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/authenticate" element={<Auth />} />
                        <Route path="/features" element={<Features />} />
                    </Routes>
                </Router>

    );
}

export default App;
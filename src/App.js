import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './landing_page/Home';
import Auth from './auth/Main_Login-Register'
import Features from './features/Features'
import Dashboard from './admin/Dashboard'
import Tournament from './admin/Tournament'
import Team from './admin/Team'

function App() {
    return (
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/authenticate" element={<Auth />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/tournament" element={<Tournament />} />
                        <Route path="/dashboard/team" element={<Team />} />
                    </Routes>
                </Router>

    );
}

export default App;
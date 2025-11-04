import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './landing_page/Home';
import Auth from './auth/Main_Login-Register'
import Features from './features/Features'
import Dashboard from './admin/Dashboard'
import Tournament from './admin/Tournament'
import Team from './admin/Team'
import Game from './admin/Game'
import Referee from './admin/Referee'
import Court from './admin/Court'
import Player from './admin/Player'
import User from './admin/User'
import HomeUsuer from './user/UserHome'
import ProfileUser from './user/UserProfile'
import TeamUser from './user/UserTeam'

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
                        <Route path="/dashboard/game" element={<Game />} />
                        <Route path="/dashboard/referee" element={<Referee />} />
                        <Route path="/dashboard/court" element={<Court />} />
                        <Route path="/dashboard/player" element={<Player />} />
                        <Route path="/dashboard/user" element={<User />} />
                        <Route path="/home" element={<HomeUsuer />} />
                        <Route path="/profile" element={<ProfileUser />} />
                        <Route path="/userteam" element={<TeamUser />} />
                    </Routes>
                </Router>
    );
}

export default App;
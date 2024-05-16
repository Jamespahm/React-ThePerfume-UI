import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRouter from './UserRouter';
import AdminRouter from './AdminRouter';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="*" element={<UserRouter />} />
                    <Route path="/admin/*" element={<AdminRouter />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

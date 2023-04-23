import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './pages/global/Sidebar';
import Appbar from './pages/global/Appbar';
import Dashboard from './pages/dashboard/Dashboard';
import Line from './pages/line/Line';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';

type Line = {
  id: string;
  title: string;
};

export default function App(): JSX.Element {
  const [lines, setLines] = useState<Line[]>([]);

  const handleLines = (lineArr: Array<Line>) => {
    setLines(lineArr);
  };

  return (
    <div className="app">
      <Sidebar lineArr={lines} />
      <main className="content">
        <Appbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lines/:lineId" element={<Line />} />
          <Route
            path="/settings"
            element={<Settings onSetLines={handleLines} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

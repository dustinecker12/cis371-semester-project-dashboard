import { Routes, Route } from 'react-router-dom';
import Sidebar from './pages/global/Sidebar';
import Appbar from './pages/global/Appbar';
import Dashboard from './pages/dashboard/Dashboard';
import Reports from './pages/reports/Reports';
import Line from './pages/line/Line';
import Settings from './pages/settings/Settings';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Appbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lines/:lineId" element={<Line />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

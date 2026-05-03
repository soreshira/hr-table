import { Routes, Route } from "react-router-dom";
import { AppHeader } from "./components/layout/AppHeader";
import { PeopleTableContainer } from "./components/table";
import { TimezoneSettingsPage } from "./pages/TimezoneSettingsPage";
import { DateDemoPage } from "./pages/DateDemoPage";
import { DateDemo } from "./components/date/DateDemo";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <div className="bg-white rounded-xl shadow-md p-6">
                <PeopleTableContainer />
              </div>
            }
          />
          <Route path="/settings" element={<TimezoneSettingsPage />} />
          <Route path="/date-demo" element={<DateDemoPage />} />
          <Route path="/datedemo" element={<DateDemo />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

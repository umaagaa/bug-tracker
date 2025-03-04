import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ViewBugs from "./components/ViewBugs";
import BugModal from "./components/BugModal";

function App() {
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) setUser(savedUser);

        const storedBugs = JSON.parse(localStorage.getItem("bugs")) || [];
        setBugs(storedBugs);
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const saveBug = (newBug) => {
        const updatedBugs = [...bugs, newBug];
        localStorage.setItem("bugs", JSON.stringify(updatedBugs));
        setBugs(updatedBugs);
        setIsModalOpen(false);
    };

    if (!user) {
        return <Login setUser={setUser} />;
    }

    return (
        <Router>
            <div className="flex">
                <aside className="w-1/4 bg-gray-200 p-4 min-h-screen">
                    <h2 className="text-xl font-bold mb-4">Bug Tracker</h2>
                    <ul>
                        <li className="mb-2"><a href="/dashboard">Dashboard</a></li>
                        <li className="mb-2"><a href="/view-bugs">View Bugs</a></li>
                        {user.role === "admin" && (
                            <li>
                                <button onClick={openModal} className="w-full text-left">Create Bug</button>
                            </li>
                        )}
                    </ul>
                    <button 
                        onClick={() => {
                            localStorage.removeItem("user");
                            window.location.reload();
                        }} 
                        className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-700 w-full"
                    >
                        Logout
                    </button>
                </aside>

                <main className="w-3/4 p-6">
                <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/view-bugs" element={<ViewBugs bugs={bugs} />} />
    <Route path="*" element={<Navigate to="/dashboard" />} />
</Routes>

                </main>
            </div>

            {isModalOpen && <BugModal closeModal={closeModal} saveBug={saveBug} setBugs={setBugs} />}
        </Router>
    );
}

export default App;

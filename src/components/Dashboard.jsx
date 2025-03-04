import { useState, useEffect } from "react";

function Dashboard() {
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        const updateBugs = () => {
            const storedBugs = JSON.parse(localStorage.getItem("bugs")) || [];
            setBugs(storedBugs);
        };

        updateBugs(); // Prvo učitavanje podataka

        // Osluškuje promjene u localStorage-u
        window.addEventListener("storage", updateBugs);

        return () => {
            window.removeEventListener("storage", updateBugs);
        };
    }, []);

    const countBugsByPriority = (priority) => {
        return bugs.filter(bug => bug.priority === priority).length;
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="flex gap-4">
                <div className="bg-green-500 text-white p-6 rounded shadow-lg w-1/3">
                    <h3 className="text-xl">Total Low</h3>
                    <p className="text-2xl font-bold">{countBugsByPriority("Low")}</p>
                </div>
                <div className="bg-yellow-500 text-white p-6 rounded shadow-lg w-1/3">
                    <h3 className="text-xl">Total Medium</h3>
                    <p className="text-2xl font-bold">{countBugsByPriority("Medium")}</p>
                </div>
                <div className="bg-red-500 text-white p-6 rounded shadow-lg w-1/3">
                    <h3 className="text-xl">Total High</h3>
                    <p className="text-2xl font-bold">{countBugsByPriority("High")}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

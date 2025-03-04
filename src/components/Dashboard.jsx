import { useState, useEffect } from "react";

function Dashboard() {
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        const savedBugs = JSON.parse(localStorage.getItem("bugs")) || [];
        setBugs(savedBugs);
    }, []);

    const countBugsByPriority = (priority) => {
        return bugs.filter(bug => bug.priority === priority).length;
    };

    return (
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
    );
}

export default Dashboard;

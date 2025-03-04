import { useState, useEffect } from "react";
import BugModal from "./BugModal";

function ViewBugs() {
    const [bugs, setBugs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBug, setCurrentBug] = useState(null);

    // Učitava bugove iz localStorage-a svaki put kada se promijene
    useEffect(() => {
        const loadBugs = () => {
            const storedBugs = JSON.parse(localStorage.getItem("bugs")) || [];
            setBugs(storedBugs);
        };

        loadBugs();

        window.addEventListener("storage", loadBugs);
        return () => window.removeEventListener("storage", loadBugs);
    }, []);

    const deleteBug = (id) => {
        const updatedBugs = bugs.filter(bug => bug.id !== id);
        setBugs(updatedBugs);
        localStorage.setItem("bugs", JSON.stringify(updatedBugs));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">View Bugs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bugs.map(bug => (
                    <div key={bug.id} className={`p-4 rounded shadow-lg ${
                        bug.priority === "Low" ? "bg-green-500" :
                        bug.priority === "Medium" ? "bg-yellow-500" : "bg-red-500"
                    }`}>
                        <h3 className="text-lg font-bold">{bug.name}</h3>
                        <p>Priority: <span className="font-bold">{bug.priority}</span></p>
                        <p>Version: {bug.version}</p>
                        <div className="flex justify-between mt-4">
                            <button onClick={() => { setCurrentBug(bug); setIsModalOpen(true); }} className="text-blue-500">✎ Edit</button>
                            <button onClick={() => deleteBug(bug.id)} className="text-red-200">✖ Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && <BugModal closeModal={() => setIsModalOpen(false)} bug={currentBug} setBugs={setBugs} />}
        </div>
    );
}

export default ViewBugs;

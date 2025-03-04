import { useState, useEffect } from "react";
import BugModal from "./BugModal";

function ViewBugs() {
    const [bugs, setBugs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBug, setCurrentBug] = useState(null);

    useEffect(() => {
        const savedBugs = JSON.parse(localStorage.getItem("bugs")) || [];
        setBugs(savedBugs);
    }, []);

    const deleteBug = (id) => {
        const updatedBugs = bugs.filter(bug => bug.id !== id);
        setBugs(updatedBugs);
        localStorage.setItem("bugs", JSON.stringify(updatedBugs));
    };

    const openModal = (bug) => {
        setCurrentBug(bug);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentBug(null);
    };

    const saveBug = (updatedBug) => {
        const updatedBugs = bugs.map(bug => (bug.id === updatedBug.id ? updatedBug : bug));
        setBugs(updatedBugs);
        localStorage.setItem("bugs", JSON.stringify(updatedBugs));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Bug List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bugs.map(bug => (
                    <div key={bug.id} className={`p-4 rounded shadow-lg ${
                        bug.priority === "Low" ? "bg-green-500" :
                        bug.priority === "Medium" ? "bg-yellow-500" : "bg-red-500"
                    }`}>
                        <h3 className="text-xl font-bold">{bug.name}</h3>
                        <p><strong>Priority:</strong> {bug.priority}</p>
                        <p><strong>Version:</strong> {bug.version}</p>
                        <div className="flex justify-between mt-4">
                            <button onClick={() => openModal(bug)} className="text-blue-500">✎ Edit</button>
                            <button onClick={() => deleteBug(bug.id)} className="text-red-300">✖ Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && <BugModal closeModal={closeModal} bug={currentBug} saveBug={saveBug} />}
        </div>
    );
}

export default ViewBugs;

import { useState, useEffect } from "react";

function BugModal({ closeModal, bug, setBugs }) {
    const [name, setName] = useState(bug?.name || "");
    const [priority, setPriority] = useState(bug?.priority || "Low");
    const [version, setVersion] = useState(bug?.version || "");

    useEffect(() => {
        if (bug) {
            setName(bug.name || "");
            setPriority(bug.priority || "Low");
            setVersion(bug.version || "");
        }
    }, [bug]);

    const handleSave = () => {
        if (!name.trim()) {
            alert("Bug name is required!");
            return;
        }

        const storedBugs = JSON.parse(localStorage.getItem("bugs")) || [];
        let updatedBugs;

        if (bug) {
            // Edit existing bug
            updatedBugs = storedBugs.map(b => (b.id === bug.id ? { ...b, name, priority, version } : b));
        } else {
            // Create new bug
            const newBug = { id: Date.now(), name, priority, version };
            updatedBugs = [...storedBugs, newBug];
        }

        setBugs(updatedBugs);
        localStorage.setItem("bugs", JSON.stringify(updatedBugs));
        
        // Emit event da obavijesti ViewBugs da su podaci promijenjeni
        window.dispatchEvent(new Event("storage"));

        closeModal();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">{bug ? "Edit Bug" : "Create Bug"}</h2>
                
                <label className="block font-medium">Name</label>
                <input className="border p-2 mb-3 w-full" value={name} onChange={(e) => setName(e.target.value)} />

                <label className="block font-medium">Priority</label>
                <select className="border p-2 mb-3 w-full" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <label className="block font-medium">Version</label>
                <input className="border p-2 mb-3 w-full" value={version} onChange={(e) => setVersion(e.target.value)} />

                <div className="flex justify-between mt-4">
                    <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                    <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default BugModal;

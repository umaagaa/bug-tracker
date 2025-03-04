import { useState, useEffect } from "react";

function BugModal({ closeModal, bug, saveBug }) {
    const [name, setName] = useState("");
    const [priority, setPriority] = useState("Low");
    const [version, setVersion] = useState("");

    useEffect(() => {
        if (bug) {
            setName(bug.name);
            setPriority(bug.priority);
            setVersion(bug.version);
        }
    }, [bug]);

    const handleSave = () => {
        if (!name.trim()) return;

        const newBug = { 
            id: bug?.id || Date.now(), 
            name, 
            priority, 
            version 
        };

        saveBug(newBug);
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{bug ? "Edit Bug" : "Create Bug"}</h2>
                <input className="border p-2 mb-3 w-full" placeholder="Bug Name" value={name} onChange={(e) => setName(e.target.value)} />
                <select className="border p-2 mb-3 w-full" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input className="border p-2 mb-3 w-full" placeholder="Version" value={version} onChange={(e) => setVersion(e.target.value)} />
                <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">Save</button>
                <button onClick={closeModal} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
            </div>
        </div>
    );
}

export default BugModal;

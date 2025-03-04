import { Link } from "react-router-dom";

function HomePage({ user }) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-1/4 bg-gray-200 p-4">
                <h2 className="text-xl font-bold mb-4">Bug Tracker</h2>
                <ul>
                    <li className="mb-2">
                        <Link to="/dashboard" className="block p-2 hover:bg-gray-300 rounded">Dashboard</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/view-bugs" className="block p-2 hover:bg-gray-300 rounded">View Bugs</Link>
                    </li>
                    {user.role === "admin" && (
                        <li className="mb-2">
                            <Link to="/create-bug" className="block p-2 hover:bg-gray-300 rounded">Create Bug</Link>
                        </li>
                    )}
                </ul>
                <button 
                    onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload();
                    }} 
                    className="mt-4 bg-red-500 text-white p-2 rounded w-full"
                >
                    Logout
                </button>
            </aside>
            <main className="w-3/4 p-6">
                <h2 className="text-3xl font-bold">Welcome, {user.username}!</h2>
                <p className="mt-4 text-lg">Choose an option from the sidebar.</p>
            </main>
        </div>
    );
}

export default HomePage;

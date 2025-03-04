import { useState } from "react";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const handleLogin = () => {
        if (username.trim() && password.trim()) {
            const userData = { username, password, role };
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 mb-3 border rounded" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border rounded" />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-3 border rounded">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </div>
        </div>
    );
}

export default Login;

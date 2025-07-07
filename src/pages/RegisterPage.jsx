import { useState } from "react";
import { register } from "../services/authservice";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export function RegisterPage() {
    const [form, setForm] = useState({ 
        username: "", 
        password: "",
        confirmPassword: "",
        role: "user" // Default role
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/dashboard");
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validasi form
        if (!form.username || !form.password || !form.confirmPassword) {
            Swal.fire("Error", "Semua field harus diisi", "error");
            return;
        }
        
        // Validasi password match
        if (form.password !== form.confirmPassword) {
            Swal.fire("Error", "Password dan konfirmasi password tidak sama", "error");
            return;
        }

        try {
            await register(form.username, form.password, form.role);
            Swal.fire("Berhasil", "Registrasi berhasil! Silahkan login.", "success");
            navigate("/login"); // redirect ke halaman login
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Terjadi kesalahan saat registrasi";
            Swal.fire("Gagal", errorMessage, "error");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Konfirmasi Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Konfirmasi Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                            Role
                        </label>
                        <select
                            name="role"
                            id="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p>
                        Sudah punya akun?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

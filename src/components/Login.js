import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "./firebaseConfig";

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email*</label>
                <input type="email" name="email" placeholder="Enter Email" onChange={handleChanges} required value={values.email} />

                <label htmlFor="password">Password*</label>
                <input type="password" name="password" placeholder="Enter Password" onChange={handleChanges} required value={values.password} />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

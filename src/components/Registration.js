import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, collection, addDoc, createUserWithEmailAndPassword } from "./firebaseConfig"; // Firebase imports
import "./Registration.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
    const navigate = useNavigate();
    
    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        dob: "",
        graduationYear: "",
        contact: "",
        course: "",
        password: "",
        confirmPassword: "",
    };

    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [passwordChecklist, setPasswordChecklist] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });

        if (name === "password") {
            validatePassword(value);
        }

        if (name === "confirmPassword" || name === "password") {
            if (name === "confirmPassword" && value !== values.password) {
                setError("Passwords do not match!");
            } else {
                setError("");
            }
        }
    };

    const validatePassword = (password) => {
        setPasswordChecklist({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*]/.test(password),
        });
    };

    const isPasswordValid = () => Object.values(passwordChecklist).every(Boolean);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid()) {
            alert("Please meet all password requirements before submitting.");
            return;
        }

        if (values.password !== values.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            // Register user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            // Add user data to Firestore
            await addDoc(collection(db, "users"), {
                uid: user.uid, // Store UID for reference
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                gender: values.gender,
                dob: values.dob,
                graduationYear: values.graduationYear,
                contact: values.contact,
                course: values.course,
            });

            alert("Registration successful!");
            setIsRegistered(true);
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Failed to register. Try again.");
        }
    };

    useEffect(() => {
        if (isRegistered) navigate("/login");
    }, [isRegistered, navigate]);

    return (
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name*</label>
                <input type="text" name="firstname" placeholder="Enter First Name" onChange={handleChanges} required value={values.firstname} />

                <label htmlFor="lastname">Last Name*</label>
                <input type="text" name="lastname" placeholder="Enter Last Name" onChange={handleChanges} required value={values.lastname} />

                <label htmlFor="email">Email*</label>
                <input type="email" name="email" placeholder="Enter Email" onChange={handleChanges} required value={values.email} />

                <label htmlFor="contact">Contact*</label>
                <input type="text" name="contact" placeholder="Enter Phone No." onChange={handleChanges} maxLength="10" minLength="10" required value={values.contact} />

                <label htmlFor="gender">Gender*</label>
                <input type="radio" name="gender" value="Male" checked={values.gender === "Male"} onChange={handleChanges} /> Male
                <input type="radio" name="gender" value="Female" checked={values.gender === "Female"} onChange={handleChanges} /> Female
                <input type="radio" name="gender" value="Other" checked={values.gender === "Other"} onChange={handleChanges} /> Other

                <label htmlFor="dob">Date of Birth*</label>
                <input type="date" name="dob" onChange={handleChanges} required value={values.dob} />

                <label htmlFor="graduationYear">Graduation Passout Year*</label>
                <select name="graduationYear" id="graduationYear" onChange={handleChanges} required value={values.graduationYear}>
                    <option value="">Select Year</option>
                    {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return <option key={year} value={year}>{year}</option>;
                    })}
                </select>

                <label htmlFor="course">Course</label>
                <select name="course" id="course" onChange={handleChanges} required value={values.course}>
                    <option value="" disabled>Select Course</option>
                    <option value="java">Java</option>
                    <option value="mern">MERN</option>
                    <option value="android">Android</option>
                </select>

                <label htmlFor="password">Create Password*</label>
                <div className="password-container">
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" onChange={handleChanges} required value={values.password} />
                    <span onClick={togglePasswordVisibility} className="eye-icon">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* Password Checklist */}
                <ul className="password-checklist">
                    <li style={{ color: passwordChecklist.length ? "green" : "red" }}>✔ At least 8 characters</li>
                    <li style={{ color: passwordChecklist.uppercase ? "green" : "red" }}>✔ One uppercase letter</li>
                    <li style={{ color: passwordChecklist.lowercase ? "green" : "red" }}>✔ One lowercase letter</li>
                    <li style={{ color: passwordChecklist.number ? "green" : "red" }}>✔ One number</li>
                    <li style={{ color: passwordChecklist.specialChar ? "green" : "red" }}>✔ One special character (@, #, $, etc.)</li>
                </ul>

                <label htmlFor="confirmPassword">Re-enter Password*</label>
                <input type="text" name="confirmPassword" placeholder="Re-enter Password" onChange={handleChanges} required value={values.confirmPassword} />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;

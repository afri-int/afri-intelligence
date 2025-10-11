import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../../axiosConfig";
import { UserContext } from "../../context/userContext";
import styles from "../styles/form.module.css";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { selectedRole } = useContext(UserContext)!;
  const [data, setData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Password validation helpers
  const passwordRules = {
    length: data.password.length >= 8,
    uppercase: /[A-Z]/.test(data.password),
    lowercase: /[a-z]/.test(data.password),
    number: /[0-9]/.test(data.password),
    specialChar: /[@$!%*?&]/.test(data.password),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!selectedRole) {
    toast.error("Please select a role first on the Home page.");
    return;
  }

  const { name, email, password } = data;

  if (!name || !email || !password) {
    toast.error("Please fill all fields.");
    return;
  }

  if (!isPasswordValid) {
    toast.error(
      "Password does not meet the required criteria. Check the rules below."
    );
    return;
  }

  try {
    const response = await axios.post("/auth/register", {
      name,
      email,
      password,
      role: selectedRole,
    });

    // If backend sends error message in response.data.error
    if (response.data.error) {
      toast.error(response.data.error);
    } else {
      toast.success("Registered successfully!");
      setData({ name: "", email: "", password: "" });
      navigate("/login");
    }
  } catch (err: any) {
    console.error(err);

    // Check if error response from backend exists
    if (err.response && err.response.data) {
      const message = err.response.data.error || err.response.data.message;
      if (message) {
        toast.error(message);
        return;
      }
    }

    // Fallback for unknown errors
    toast.error("Registration failed. Please try again.");
  }
};


  return (
    <div className={styles.login_box}>
      <div className={styles.child_element_left}>
        <div className={styles.overlay}>
          <h1>Create Account</h1>
          <small>Already have an account?</small>
          <br />
          <small>
            <Link to="/login">Login here</Link>
          </small>
        </div>

        <form className={styles.inputs} onSubmit={registerUser}>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={data.name}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
          {/* Live password validation */}
          <ul className={styles.password_rules}>
            <li style={{ color: passwordRules.length ? "green" : "red" }}>
              Minimum 8 characters
            </li>
            <li style={{ color: passwordRules.uppercase ? "green" : "red" }}>
              At least one uppercase letter
            </li>
            <li style={{ color: passwordRules.lowercase ? "green" : "red" }}>
              At least one lowercase letter
            </li>
            <li style={{ color: passwordRules.number ? "green" : "red" }}>
              At least one number
            </li>
            <li style={{ color: passwordRules.specialChar ? "green" : "red" }}>
              At least one special character (@$!%*?&)
            </li>
          </ul>
          <br />
          <div className={styles.role}>
            <p>
              Role: <strong>{selectedRole || "Not selected"}</strong>
            </p>
          </div>
          <br />
          <button type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

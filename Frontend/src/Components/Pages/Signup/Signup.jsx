import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../Api/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const [loading, setLoading] = useState(false);

  // input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // signup submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (
      !formData.name ||
      !formData.dob ||
      !formData.email ||
      !formData.password
    ) {
      alert("All fields are required");
      return;
    }

    // age validation (18+)
    const dob = new Date(formData.dob);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 18) {
      alert("You must be 18 years old to signup");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/signup", formData);

      alert(res.data.message || "Signup successful! Please verify your email.");
      navigate("/"); // login page
    } catch (error) {
      alert(
        error.response?.data?.message || "Signup failed, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="viewer">Viewer</option>
          <option value="creator">Creator</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;

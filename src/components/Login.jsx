import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";

const Login = () => {
  const { showAlert } = useContext(AlertContext);
  const [credentials, setCredential] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //  Convert note data to JSON before sending
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      localStorage.setItem("token", data.token);

      showAlert("Login successful", "success");
      navigate("/");
    } else {
      showAlert("Invalid username or password.", "danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="position-absolute login">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            minLength={5}
            required
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            minLength={5}
            required
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            credentials.email.length < 5 || credentials.password.length < 5
          }
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

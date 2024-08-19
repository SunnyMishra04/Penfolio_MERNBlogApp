import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      alert(result.message);
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
    <main className="page-background">
      <div className="container shadow mt-5 mb-4 p-4" style={{ maxWidth: '500px', backgroundColor: '#ffffff',fontWeight:'500'}}>
        <h2 className="text-center mb-4">Login Here</h2>
        <div className="d-flex justify-content-center">
          <div className="w-100">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  value={input.email}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={input.password}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#535bf2', color: '#ffffff'}}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default Login;

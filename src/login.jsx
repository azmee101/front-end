import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [typingText, setTypingText] = useState("");
  const fullText = "Welcome\nto the\nNagad DMS\nSolution!";
  useEffect(() => {
    // Clear localStorage if any previous user already log in.
    localStorage.removeItem("currentUser");
    setFormData({ email: "", password: "" }); // setting the form empty

    const loadUsers = async () => {
      try {
        const response = await fetch("/src/mocker/db/user.json");
        const data = await response.json();
        const userArray = Object.values(data.users);
        setUsers(userArray);
      } catch (err) {
        console.error("Error loading users:", err);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypingText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 35);

    return () => clearInterval(typingInterval);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const user = users.find(
      (u) => u.user_name === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          email: user.user_name,
          username: user.full_Name,
          password: user.password,
          user_id: user.user_id,
          role: user.role,
        })
      );
      setUser({
        email: user.user_name,
        username: user.full_Name,
        user_id: user.user_id,
        role: user.role,
      });
      navigate("/welcome", { replace: true });
    } else {
      setError("Invalid credentials");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081320]">
      <div className="flex w-[1000px] shadow-2xl h-[500px]">
        <div className="w-2/5 bg-gray-200 flex flex-col items-center justify-center px-6 rounded-l-md py-6">
          <img src="/nagad.png" alt="Nagad Logo" className="w-24 mb-8" />

          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            {" "}
            <div className="mb-6">
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Username"
                  autoComplete="off"
                  className="w-full px-3 py-3 border-2 border-red-500 rounded focus:outline-none focus:border-red-600 placeholder-gray-400"
                  required
                />
                <div className="text-red-500 text-xs mt-1 ml-1">
                  Check your username/email
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  autoComplete="off"
                  className="w-full px-3 py-3 border-2 border-red-500 rounded focus:outline-none focus:border-red-600 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>{" "}
                {error ? (
                  <div className="text-red-500 text-xs mt-1 ml-1">{error}</div>
                ) : (
                  <div className="text-red-500 text-xs mt-1 ml-1">
                    Check your password
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="flex justify-end mb-6">
              <a href="#" className="text-[#00A4E9] text-sm hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded font-medium bg-gray-300 transition-colors"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right side with welcome text */}
        <div className="w-3/5 bg-[#0B1829] flex flex-col items-center justify-center text-white rounded-r-md">
          <div className="text-center">
            {" "}
            <h1 className="text-4xl font-bold whitespace-pre-line leading-tight">
              {typingText}
            </h1>
            <p className="text-sm mt-12">
              © Nagad | {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

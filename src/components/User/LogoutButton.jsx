import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router";
import { userLogout } from "../../lib/api/UserApi.js";
import { alertConfirm, alertError } from "../../lib/alert.js";

export default function LogoutButton({ className }) {
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  async function handleLogout() {
    if (!await alertConfirm("Are you sure you want to logout?")) {
      return;
    }

    const response = await userLogout(token);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setToken("");
      navigate("/login");
    } else {
      await alertError(responseBody.errors);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className={className}
    >
      <i className="fas fa-sign-out-alt mr-2"></i>
      <span>Logout</span>
    </button>
  );
}

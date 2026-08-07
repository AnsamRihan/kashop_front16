import useAuthStore from "@/store/useAuthStore";
import DesktopUserMenu from "./DesktopUserMenu"
import MobileUserMenu from "./MobileUserMenu"
import { useNavigate } from "react-router-dom";

export default function UserMenu({ mobile = false }) {

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  return mobile
    ? <MobileUserMenu onLogout={handleLogout} />
    : <DesktopUserMenu onLogout={handleLogout} />
}
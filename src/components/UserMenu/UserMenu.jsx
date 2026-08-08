import useAuthStore from "@/store/useAuthStore";
import DesktopUserMenu from "./DesktopUserMenu"
import MobileUserMenu from "./MobileUserMenu"
import { useNavigate } from "react-router-dom";
import useProfile from "@/hooks/useProfile";

export default function UserMenu({ mobile = false }) {
  const{ isLoading, isError, error} = useProfile();

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  return mobile
    ? <MobileUserMenu onLogout={handleLogout} isLoading={isLoading} isError={isError} error={error} />
    : <DesktopUserMenu onLogout={handleLogout} isLoading={isLoading} isError={isError} error={error} />
}
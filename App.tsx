import "./src/styles/global.css";
import NavigationRoutes from "@/routes";
import { AuthContextProvider } from "@/Context/auth.context";
import { SnackBarContexProvider } from "@/Context/snackbar.context";
import { SnackBar } from "@/components/SnackBar";

export default function App() {
  return (
    <SnackBarContexProvider>
      <AuthContextProvider>
        <NavigationRoutes />
        <SnackBar />
      </AuthContextProvider>
    </SnackBarContexProvider>
  );
}

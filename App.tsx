import "./src/styles/global.css";
import NavigationRoutes from "@/routes";
import { AuthContextProvider } from "@/Context/auth.context";
import { SnackBarContexProvider } from "@/Context/snackbar.context";
import { SnackBar } from "@/components/SnackBar";
import { BottomSheetProvider } from "@/Context/bottomsheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TransactionContextProvider } from "@/Context/transaction.context";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackBarContexProvider>
        <AuthContextProvider>
          <TransactionContextProvider>
            <BottomSheetProvider>
              <NavigationRoutes />
              <SnackBar />
            </BottomSheetProvider>
          </TransactionContextProvider>
        </AuthContextProvider>
      </SnackBarContexProvider>
    </GestureHandlerRootView>
  );
}

import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { DeleteModal } from "./DeleteModal";
import { FC, useState } from "react";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import {
  SnackBarContexProvider,
  useSnackBarContext,
} from "@/Context/snackbar.context";

interface Params {
  transactionId: number;
}

export const RightAction: FC<Params> = ({ transactionId }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleError } = useErrorHandler();
  const { notify } = useSnackBarContext();

  const showModal = () => {
    setModalIsVisible(true);
  };

  const hideModal = () => {
    setModalIsVisible(false);
  };

  const handleDeleteTransaction = async () => {
    try {
      setLoading(true);
      await transactionService.deleteTransaction(transactionId);
      notify({
        message: "Transação deletada com sucesso",
        messageType: "SUCCESS",
      });
      hideModal();
    } catch (error) {
      handleError(error, "Falha ao deletar a transação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={showModal}
        activeOpacity={0.8}
        className="h-[140] w-[80] rounded-r-[6] bg-accent-red-background-primary justify-center items-center"
      >
        <MaterialIcons name="delete-outline" color={colors.white} size={30} />
      </TouchableOpacity>
      <DeleteModal
        visible={modalIsVisible}
        hideModal={hideModal}
        handleDeleteTransaction={handleDeleteTransaction}
        loading={loading}
      />
    </>
  );
};

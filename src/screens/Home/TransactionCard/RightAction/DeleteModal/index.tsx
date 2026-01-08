import { FC } from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";

interface Params {
  visible: boolean;
  hideModal: () => void;
  handleDeleteTransaction: () => void;
  loading: boolean;
}

export const DeleteModal: FC<Params> = ({
  visible,
  hideModal,
  handleDeleteTransaction,
  loading,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={hideModal}
    >
      <TouchableWithoutFeedback onPress={hideModal}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View className="bg-background-secondary m-5 p-8 rounded-[16] items-center shadow-lg w-[90%] h-[322] z-9">
              <View className="w-full flex-row justify-between items-center border-b border-gray-300 pb-6">
                <View className="flex-row items-center gap-6">
                  <MaterialIcons
                    name="error-outline"
                    className="mr-4"
                    color={colors.gray[400]}
                    size={25}
                  />

                  <Text className="text-white text-xl">Apagar Transação</Text>
                </View>
                <TouchableOpacity onPress={hideModal}>
                  <MaterialIcons
                    name="close"
                    color={colors.gray[800]}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              <View className="p-3 flex-1 border-b border-gray-300 items-center justify-center">
                <Text className="text-lg text-gray-500 leading-8">
                  Tem certeza de que deseja apagar esta transação? Esta ação não
                  pode ser desfeita.
                </Text>
              </View>

              <View className="flex-row justify-end w-full p-6 pb-0 pr-0 gap-4">
                <TouchableOpacity
                  onPress={hideModal}
                  className="bg-none border-accent-brand border-2 p-3 items-center w-[100] rounded-[6]"
                >
                  <Text className="text-accent-brand">Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeleteTransaction}
                  className="bg-accent-red-background-primary p-3 items-center w-[100] rounded-[6]"
                >
                  <Text className="text-white">
                    {loading ? <ActivityIndicator /> : "Apagar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

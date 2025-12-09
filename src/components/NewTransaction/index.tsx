import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CreateTransactionInterface } from "@/shared/interfaces/http/create-transaction.interface";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/Context/bottomsheet.context";
import CurrencyInput from "react-native-currency-input";
import { TransactionTypeSelector } from "../SelectType";
import { SelectCategoryModal } from "../SelectCategoryModal";
import { transactionSchema } from "./schema";
import * as Yup from "yup";
import { AppButton } from "../AppButton";
import { ErrorMessage } from "../ErrorMessage";
import { useTransactionContext } from "@/Context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

type ValidationErrorsType = Record<keyof CreateTransactionInterface, string>;

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext();
  const { createTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();
  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    categoryId: 0,
    description: "",
    typeId: 0,
    value: 0,
  });
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsType>();
  const [loading, setLoading] = useState(false);

  const setTransactionData = (
    key: keyof CreateTransactionInterface,
    value: string | number
  ) => {
    setTransaction((previousData) => ({ ...previousData, [key]: value }));
  };

  const handleCreateTransaction = async () => {
    try {
      setLoading(true);
      await transactionSchema.validate(transaction, { abortEarly: false });
      await createTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidationErrorsType;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof CreateTransactionInterface] = err.message;
          }
        });

        setValidationErrors(errors);
      } else {
        handleError(error, "Falha ao criar transação");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        onPress={closeBottomSheet}
        className="w-full flex-row items-center justify-between"
      >
        <Text className="font-bold text-white text-xl">Nova Transação</Text>
        <MaterialIcons name="close" size={16} color={colors.gray[700]} />
      </TouchableOpacity>
      <View className="flex-1 mt-8">
        <TextInput
          onChangeText={(text) => setTransactionData("description", text)}
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          className="text-white text-lg h-[50px] my-2 bg-background-primary rounded-[6] pl-4"
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}
        <CurrencyInput
          value={transaction.value}
          precision={2}
          separator=","
          delimiter="."
          minValue={0}
          prefix="R$ "
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
          className="text-white text-lg h-[50px] my-2 bg-background-primary rounded-[6] pl-4"
        />
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}
      </View>
      <SelectCategoryModal
        onSelect={(categoryId) => setTransactionData("categoryId", categoryId)}
        selectedCategory={transaction.categoryId}
      />
      {validationErrors?.categoryId && (
        <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
      )}
      <TransactionTypeSelector
        typeId={transaction.typeId}
        setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
      />
      {validationErrors?.typeId && (
        <ErrorMessage>{validationErrors?.typeId}</ErrorMessage>
      )}

      <View className="my-4">
        <AppButton onPress={handleCreateTransaction}>
          <Text>
            {loading ? <ActivityIndicator color={colors.white} /> : "Registrar"}
          </Text>
        </AppButton>
      </View>
    </View>
  );
};

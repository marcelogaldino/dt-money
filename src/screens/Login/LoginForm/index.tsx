import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>();
  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        placeholder="mail@exemplo.br"
        leftIconName="email"
      />

      <AppInput
        control={control}
        name="password"
        label="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton iconName="arrow-forward" mode="fill">
          Login
        </AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Ainda não tem uma conta?
          </Text>
          <AppButton iconName="arrow-forward" mode="outline">
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  );
};

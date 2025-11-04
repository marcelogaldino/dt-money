import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { schema } from "./schema";
import { AxiosError } from "axios";
import { useAuthContext } from "@/Context/auth.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { colors } from "@/shared/colors";

export interface RegisterFormParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormParams>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const { handleRegister } = useAuthContext();
  const { handleError } = useErrorHandler();

  const onSubmit = async (userData: RegisterFormParams) => {
    try {
      await handleRegister(userData);
    } catch (error) {
      handleError(error, "Erro ao Registrar usuário");
    }
  };

  return (
    <>
      <AppInput
        control={control}
        name="name"
        label="NOME"
        placeholder="Seu nome"
        leftIconName="person"
      />

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

      <AppInput
        control={control}
        name="confirmPassword"
        label="SENHA"
        placeholder="Confirme sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton
          onPress={handleSubmit(onSubmit)}
          iconName="arrow-forward"
          mode="fill"
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            "Cadastrar"
          )}
        </AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Já possui uma conta?
          </Text>
          <AppButton
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.navigate("Login")}
          >
            Acessar
          </AppButton>
        </View>
      </View>
    </>
  );
};

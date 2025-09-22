import { AppInput } from "@/components/AppInput";
import { useForm } from "react-hook-form"

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { 
    control, 
    handleSubmit, 
    formState: {isSubmitting}
  } = useForm<FormLoginParams>()
  return (<>
    <AppInput control={control} name="email" label="e-mail" placeholder="mail@example.com"/>
  </>)
}
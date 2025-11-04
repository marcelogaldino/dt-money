import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type SnackBarMessageType = "SUCCESS" | "ERROR";

export interface NotifyMessageParams {
  message: string;
  messageType: SnackBarMessageType;
}

export type SnackBarContextType = {
  message: string | null;
  type: SnackBarMessageType | null;
  notify: (params: NotifyMessageParams) => void;
};

const SnackBarContex = createContext<SnackBarContextType>(
  {} as SnackBarContextType
);

export const SnackBarContexProvider: FC<PropsWithChildren> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<SnackBarMessageType | null>(null);

  const notify = ({ message, messageType }: NotifyMessageParams) => {
    setMessage(message);
    setType(messageType);

    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
  };

  return (
    <SnackBarContex.Provider value={{ message, type, notify }}>
      {children}
    </SnackBarContex.Provider>
  );
};

export const useSnackBarContext = () => {
  const context = useContext(SnackBarContex);
  return context;
};

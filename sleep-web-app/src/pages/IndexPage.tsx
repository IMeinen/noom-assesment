import { Box, useToast } from "@chakra-ui/react";
import { useLogin } from "api/authApi";
import SleepInfoCard from "components/sleepInfoCard";
import { useEffect } from "react";

export function IndexPage() {
  const toast = useToast();

  const { mutate: login } = useLogin();

  useEffect(() => {
    login(
      {
        username: "johndoe",
        password: "test123"
      },
      {
        onSuccess: (responseData: { token: string }) => {
          localStorage.setItem("token", JSON.stringify(responseData.token));
        },
        onError: (error: any) => {
          toast({
            title: "Error logging in.Please refresh the page.",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true
          });
        }
      }
    );
  }, [login, toast]);

  return (
    <Box>
      <SleepInfoCard test-id="sleep-info-card" />
    </Box>
  );
}

import { AuthProvider } from "@/context/authContext.js";
import { CurrencyProvider } from "@/context/currencyContext.js";
import { InternetProvider } from "@/context/internetContext.js";
import { MoneyPodTransactionProvider } from "@/context/moneyPodTransactionContext.js";
import { TransactionProvider } from "@/context/transactionContext.js";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    flapstick: require("../assets/fonts/flapstick.otf"),
    doodle: require("../assets/fonts/doodle.otf"),
  });

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <InternetProvider>
          <CurrencyProvider>
            <TransactionProvider>
              <MoneyPodTransactionProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="(modals)/EditProfile"
                    options={{ presentation: "modal" }}
                  />
                  <Stack.Screen
                    name="(modals)/AddTransaction"
                    options={{ presentation: "modal" }}
                  />
                  <Stack.Screen
                    name="(modals)/RegularTransaction"
                    options={{ presentation: "modal" }}
                  />
                  <Stack.Screen
                    name="(modals)/LendMoney"
                    options={{ presentation: "modal" }}
                  />
                  <Stack.Screen
                    name="(modals)/DebtMoney"
                    options={{ presentation: "modal" }}
                  />
                  <Stack.Screen
                    name="(modals)/AddMoneyPod"
                    options={{ presentation: "modal" }}
                  />
                </Stack>
              </MoneyPodTransactionProvider>
            </TransactionProvider>
          </CurrencyProvider>
        </InternetProvider>
      </AuthProvider>
      <Toast />
    </SafeAreaProvider>
  );
}

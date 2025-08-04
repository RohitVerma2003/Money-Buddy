import { AlertProvider } from "@/context/alertContext.js";
import { AuthProvider } from "@/context/authContext.js";
import { ConfirmProvider } from "@/context/confirmContext.js";
import { CurrencyProvider } from "@/context/currencyContext.js";
import { InternetProvider } from "@/context/internetContext.js";
import { MoneyPodTransactionProvider } from "@/context/moneyPodTransactionContext.js";
import { ThemeProvider } from "@/context/themeContext.js";
import { TransactionProvider } from "@/context/transactionContext.js";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    flapstick: require("../assets/fonts/flapstick.otf"),
    doodle: require("../assets/fonts/doodle.otf"),
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider className="relative">
      <ThemeProvider>
        <AuthProvider>
          <InternetProvider>
            <CurrencyProvider>
              <TransactionProvider>
                <MoneyPodTransactionProvider>
                  <ConfirmProvider>
                    <AlertProvider>
                      <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="index" />
                        <Stack.Screen name="(tabs)" />
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
                        <Stack.Screen
                          name="(modals)/TransactionDetails"
                          options={{ presentation: "modal" }}
                        />
                      </Stack>
                    </AlertProvider>
                  </ConfirmProvider>
                </MoneyPodTransactionProvider>
              </TransactionProvider>
            </CurrencyProvider>
          </InternetProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

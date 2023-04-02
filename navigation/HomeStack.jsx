import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeComponent from "../components/home/HomeComponent";
import QRScanner from "../components/home/qr/QRScanner";
import SuccessComponent from "../components/success/SuccessComponent";

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Tesda Guard App" component={HomeComponent} />
    <Stack.Screen name="QRScanner" component={QRScanner} />
    <Stack.Screen
      name="Success"
      component={SuccessComponent}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default HomeStack;

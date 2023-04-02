import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "./HomeStack";

const Stack = createNativeStackNavigator();

const HomeRoot = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeStack"
      component={HomeStack}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default HomeRoot;

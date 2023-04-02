import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeRoot from "./navigation/HomeRoot";

export default function App() {
  return (
    <NavigationContainer>
      <HomeRoot />
    </NavigationContainer>
  );
}

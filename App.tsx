import {NavigationContainer} from "@react-navigation/native";
import RootStack from "./src/ui/navigation/tab/root.stack";

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}


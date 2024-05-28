import { createStackNavigator } from "@react-navigation/stack";
import { UserPage } from "../component/user/UserProfile";
import { ChangeDetail } from "../component/user/changeDetail";
import { User } from "./User";

export const UserProfile = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserHomePage"
        component={User}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeDetail"
        component={ChangeDetail}
        options={{ title: "Change User Profile", headerShown: true }}
      />
    </Stack.Navigator>
  );
};

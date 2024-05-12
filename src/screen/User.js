import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { UserProfile } from "../component/UserProfile";
import { OrderRecord } from "../component/Order";
import { Button } from "react-native";
import { ImageButton } from "../component/imageButton";
const Tabs = createBottomTabNavigator();
export const User = ({ navigation }) => {
  const menu = () => {
    navigation.openDrawer();
  };
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-outline" color={color} size={40} />
          ),
          headerLeft: () => <ImageButton icon="menu-outline" fun={menu} />,
        }}
      />
      <Tabs.Screen
        name="Orders"
        component={OrderRecord}
        options={{
          title: "Order Records",
          headerShown: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="time-outline" color={color} size={40} />
          ),
          tabBarBadge: "3" || undefined,
        }}
      />
    </Tabs.Navigator>
  );
};

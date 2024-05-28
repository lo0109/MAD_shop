import { createStackNavigator } from "@react-navigation/stack";
import { Checkout } from "../component/checkout/Checkout";
import { ShoppingCart } from "../component/cart/ShoppingCart";
import { View } from "react-native";
import { ImageButton } from "../component/imageButton";

const Stack = createStackNavigator();
const cartNavigation = () => {
  console.log("cartNavigation");
};

// export const Cart = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="ShoppingCart"
//         component={ShoppingCart}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="Checkout"
//         component={Checkout}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

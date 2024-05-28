import { Text, View } from "react-native";
import { ImageButton } from "../imageButton";
export const Checkout = ({ navigation }) => {
  return (
    <View>
      <Text>Checkout</Text>
      <View>
        <ImageButton
          label="Cancel"
          icon="arrow-undo-outline"
          fun={() => navigation.goBack()}
          color={"red"}
        />
      </View>
    </View>
  );
};

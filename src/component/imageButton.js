import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ImageButton = ({ icon, label, fun, color }) => {
  return (
    <Pressable
      style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
      onPress={fun}
    >
      <View style={styles.container}>
        <Ionicons name={icon} size={40} color={color} />
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

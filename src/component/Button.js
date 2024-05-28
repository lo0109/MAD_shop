import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "./colors";
export default function Button({ title, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.primary500,
    elevation: 2,
    shadowColor: colors.primary800,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
    color: colors.primary50,
    fontSize: 20,
    fontWeight: "bold",
  },
});

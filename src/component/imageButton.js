import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Badge, withBadge } from "@rneui/base";
export const ImageButton = ({ icon, label, fun, color, badge, status }) => {
  // const BadgedIcon = withBadge(2)(Ionicons);
  return (
    <Pressable
      style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
      onPress={fun}
    >
      <View style={styles.container}>
        <Ionicons name={icon} size={40} color={color} />
        {badge > 0 && (
          <Badge
            status={status}
            value={badge}
            containerStyle={{ position: "absolute", top: 5, left: 25 }}
          />
        )}
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

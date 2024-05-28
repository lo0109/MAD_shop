import { StyleSheet, View, Text, TextInput } from "react-native";
import { colors } from "./colors";
export const Input = ({ label, style, config, invalid }) => {
  let inputStyle = [styles.input];
  if (config && config.multiline) {
    inputStyle.push(styles.multiline);
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={(styles.label, invalid && styles.invalid)}>{label}</Text>
      <TextInput
        style={[inputStyle, invalid && styles.invalidBackground]}
        {...config}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: colors.primary100,
    margainBottom: 5,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: colors.primary100,
    color: colors.primary700,
  },
  container: {
    margainHorizontal: 5,
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    color: colors.primary100,
    margainBottom: 5,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalid: {
    color: colors.error500,
  },
  invalidBackground: {
    backgroundColor: colors.error50,
  },
});

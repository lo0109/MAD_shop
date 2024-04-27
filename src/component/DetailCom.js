import { View, Text, StyleSheet, Button } from "react-native";
export const ProdDetailCom = ({ navigation, route }) => {
  const { id, name, price } = route.params.prod;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product Details</Text>
      <Text style={styles.text}>Product ID: {id}</Text>
      <Text style={styles.text}>Product Name: {name} </Text>
      <Text style={styles.text}>Product Price: ${price} </Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
  },
});

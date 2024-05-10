import { View, Text, StyleSheet, Button, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
export const ProdDetailCom = ({ navigation, route }) => {
  const { id, image, title, price, description } = route.params.prod;
  console.log("route", route);
  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <View>
          <Image source={{ uri: image }} style={styles.image} />
        </View>

        <View>
          <Text style={styles.title}>{title} </Text>
        </View>
      </View>
      <Text
        style={{
          alignSelf: "flex-start",
          fontSize: 20,
          padding: 10,
          fontWeight: "bold",
        }}
      >
        Description:
      </Text>
      <ScrollView style={styles.descriptionBox}>
        <View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
      <Text style={styles.price}>Price: ${price}</Text>
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
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  descriptionBox: {
    padding: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    // backgroundColor: "yellow",
    flexDirection: "column",
    padding: 10,
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
    textAlign: "right",
  },
  detail: {
    flexDirection: "column",
    alignItems: "center",
  },
  description: {
    fontSize: 20,
  },
});

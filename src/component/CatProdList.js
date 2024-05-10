import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { prodCom } from "./productCom";
export const CatProdList = ({ route }) => {
  const navigation = useNavigation();
  const category = route.params.category;
  const { loading, products: prod } = prodCom();
  const products = prod.filter((p) => p.category === category);
  const selectProd = (id) => {
    const prod = products.find((p) => p.id === id);
    console.log("rating", prod.rating, prod.rating.rate, prod.rating.count);
    navigation.navigate("CatDetail", { prod });
  };
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={selectProd.bind(null, item.id)}
                style={styles.item}
              >
                <View style={styles.detail}>
                  <View>
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </View>

                  <View style={styles.description}>
                    <View>
                      <Text style={styles.title}>{item.title} </Text>
                    </View>
                    <View>
                      <Text style={styles.price}>Price: ${item.price}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
          />
        )}
      </View>
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
  heading: {},
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  list: {
    padding: 10,
    width: "100%",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    // backgroundColor: "red",
  },
  title: {
    width: 230,
    fontSize: 20,
    fontWeight: "bold",
    // backgroundColor: "yellow",
    flexDirection: "column",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    textAlign: "right",
  },
});

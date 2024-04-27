import { useNavigation } from "@react-navigation/native";
import { Button, Text, View, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

export const ProdList = ({ prod }) => {
  const navigation = useNavigation();
  const selectProd = (id) => {
    const prod = products.find((p) => p.id === id);
    navigation.navigate("Detail", { prod });
  };

  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await fetch(Caturl);
        const data = await res.json();
        setCategories(data);
      } catch (e) {
        console.error("error in fetchCat");
      }
    };
    fetchCat();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(prod) => prod.id}
        renderItem={({ item }) => (
          <View>
            {/* <Image source={{ uri: item.imgurl }} /> */}
            <Text>
              Product: {item.name} Price:{item.price}
              {""}
            </Text>
            <Button
              title="View Item"
              onPress={selectProd.bind(null, item.id)}
            />
          </View>
        )}
      />
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
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

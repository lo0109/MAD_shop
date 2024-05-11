import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Animated,
  Easing,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const ProdDetailCom = ({ navigation, route }) => {
  const { id, image, title, price, description, category } = route.params.prod;
  // const [animatedValue] = useState(new Animated.Value(0));
  // const [textWidth, setTextWidth] = useState(0);
  // const [containerWidth, setContainerWidth] = useState(310);

  // useEffect(() => {
  //   generateHorizontalScrollAnimation();
  // }, [containerWidth, textWidth]);
  // const generateHorizontalScrollAnimation = () => {
  //   const scrollDistance = textWidth - containerWidth;
  //   if (scrollDistance > 0) {
  //     Animated.loop(
  //       Animated.timing(animatedValue, {
  //         toValue: -scrollDistance,
  //         duration: 5000,
  //         useNativeDriver: true,
  //         easing: Easing.linear,
  //       })
  //     ).start();
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View style={styles.navigateTextBox}>
          <Button title="Home" onPress={() => navigation.navigate("Product")} />
          <Text>/</Text>
          <Button
            title={category}
            onPress={() => navigation.navigate("CatProduct", { category })}
          />
        </View>

        <View style={styles.navigateTextBox}>
          <Text>/ </Text>
          <Text style={styles.navigateText} numberOfLines={1}>
            {title}
          </Text>
          {/* <Animated.Text
            style={[
              styles.navigateText,
              {
                transform: [
                  {
                    translateX: animatedValue,
                  },
                ],
              },
            ]}
            onLayout={(event) => {
              setTextWidth(300);
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Animated.Text> */}
        </View>
      </View>
      <View style={styles.detail}>
        <View>
          <Image source={{ uri: image }} style={styles.image} />
        </View>

        <View>
          <Text style={styles.title}>{title} </Text>
          <Text style={styles.price}>Price: ${price}</Text>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    justifyContent: "center",
  },
  description: {
    fontSize: 20,
  },
  navigation: {
    flexDirection: "row",
  },
  navigateTextBox: {
    justifyContent: "felx-start",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  navigateText: {
    fontSize: 15,
  },
  home: {},
});

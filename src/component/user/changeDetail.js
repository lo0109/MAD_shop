import { Text, View, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authToken, update, userName } from "../../redux/loginSlice";
import { useState } from "react";
import { updateUserProfile } from "../../service/authService";
import { Input } from "../Input";
import Button from "../Button";

export const ChangeDetail = ({ navigation }) => {
  const dispatch = useDispatch();
  const name = useSelector(userName);
  const token = useSelector(authToken);
  const [input, setInput] = useState({ name: name, password: "" });
  // const initialInput = {
  //   name: name,
  //   password: "",
  // };
  const inputHandler = (inputIdentifier, inputValue) => {
    setInput((curState) => {
      return { ...curState, [inputIdentifier]: inputValue };
    });
  };

  const submitHandler = () => {
    const { name, password } = input;
    Alert.alert("Profile Update", "Are you sure to update the profile? ", [
      { text: "Cancel" },
      {
        text: "Confirm",
        onPress: () => {
          updateUserProfile({ token, name, password });
          dispatch(update({ userName: name }));
          navigation.goBack();
        },
      }, // Remove the item from the state by its ID
    ]);
  };

  return (
    <View>
      <View style={styles.list}>
        <View style={styles.item}>
          <Text style={styles.text}>Name:</Text>
          <Input
            style={styles.user}
            config={{
              placeholder: "Name",
              value: input.name,
              onChangeText: inputHandler.bind(null, "name"),
            }}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>New Password:</Text>
          <Input
            style={styles.user}
            config={{
              placeholder: "New Password",
              value: input.password,
              onChangeText: inputHandler.bind(null, "password"),
              secureTextEntry: true,
            }}
          />
        </View>
        <View style={styles.item}>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
          <Button title="Update" onPress={submitHandler} />
        </View>
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
  list: {
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: { fontSize: 20, width: 100, textAlign: "center" },
  user: {
    fontSize: 20,
    fontWeight: "bold",
    width: 250,
  },
});

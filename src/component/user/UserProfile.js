import { StyleSheet, Text, View } from "react-native";
import { LoginForm } from "../login/loginForm";
import { useDispatch, useSelector } from "react-redux";
import { logout, userEmail, userID, userName } from "../../redux/loginSlice";
import Button from "../Button";
import { clearCart } from "../../redux/cartSlice";

export const UserPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const uID = useSelector(userID);
  const name = useSelector(userName);
  const email = useSelector(userEmail);
  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
  };
  return (
    <View>
      {!uID && <LoginForm />}
      {uID && (
        <View>
          <View style={styles.list}>
            <View style={styles.item}>
              <Text style={styles.text}>User ID:</Text>
              <Text style={styles.user}>{uID}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>Name:</Text>
              <Text style={styles.user}>{name}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>Email:</Text>
              <Text style={styles.user}>{email}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button
              title="Update Profile"
              onPress={() => navigation.navigate("ChangeDetail")}
            />
            <Button title="Logout" onPress={logoutHandler} />
          </View>
        </View>
      )}
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: { fontSize: 15, width: 80, textAlign: "center" },
  user: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

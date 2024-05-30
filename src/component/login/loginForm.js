import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../Input";
import { signinUser, signupUser } from "../../service/authService";
import { fillCart, fillCartFromFetch } from "../../redux/cartSlice";
import { login } from "../../redux/loginSlice";
import Button from "../Button";
import { fetchOrder } from "../../service/orderService";
import { fillOrderFromFetch } from "../../redux/orderSlice";
import { fetchCart } from "../../service/cartService";

const signInText = {
  title: "Sign in with email and password",
  button: "Sign in",
  switch: "Switch to Sign up",
};
const signUpText = {
  title: "Sign up with email and password",
  button: "Sign up",
  switch: "Switch to Sign in",
};
const initialInput = {
  name: "",
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [input, setInput] = useState(initialInput);
  const [form, setForm] = useState(signInText);
  const dispatch = useDispatch();
  const restoreOrder = async ({ token }) => {
    // const data = await fetchOrder({ token });
    // if (data.status === "OK") {
    //   dispatch(fillOrder({ orders: data.orders }));
    // } else {
    //   Alert.alert("Fail to restoreOrder", data.message);
    // }
    dispatch(fillOrderFromFetch(token));
  };
  const restoreCart = async ({ token }) => {
    // const data = await fetchCart({ token });
    // if (data.status === "OK") {
    //   dispatch(fillCart({ items: data.items }));
    // } else {
    //   Alert.alert("Fail to restoreCart", data.message);
    // }
    dispatch(fillCartFromFetch(token));
  };
  const inputHandler = (inputIdentifier, inputValue) => {
    setInput((curState) => {
      return { ...curState, [inputIdentifier]: inputValue };
    });
  };
  const clearHandler = () => {
    setInput(initialInput);
  };

  const switchHandler = () => {
    setIsSignIn(!isSignIn);
    setForm(!isSignIn ? signInText : signUpText);
  };

  const submitHandler = async () => {
    const { name, email, password } = input;
    const data = isSignIn
      ? await signinUser({ email, password })
      : await signupUser({ name, email, password });
    if (data.status === "OK") {
      dispatch(
        login({
          userID: data.id,
          userName: data.name,
          email: data.email,
          token: data.token,
        })
      );
      restoreOrder({ token: data.token });
      restoreCart({ token: data.token });
      console.log(data.token);
    } else {
      Alert.alert("Fail to submit", data.message);
    }
  };

  return (
    <View style={styles.form}>
      <View>
        <Text style={styles.title}>{form.title}</Text>
        {!isSignIn && (
          <View>
            <Input
              label="User Name"
              config={{
                placeholder: "Name",
                value: input.name,
                onChangeText: inputHandler.bind(null, "name"),
              }}
            />
            <Input
              label="Email"
              config={{
                placeholder: "Email (xxx@xxx.com",
                value: input.email,
                onChangeText: inputHandler.bind(null, "email"),
              }}
            />
            <Input
              label="Password"
              config={{
                placeholder: "Password",
                value: input.password,
                onChangeText: inputHandler.bind(null, "password"),
                secureTextEntry: true,
              }}
            />
          </View>
        )}
        {isSignIn && (
          <View>
            <Input
              label="Email"
              config={{
                placeholder: "Email",
                value: input.email,
                onChangeText: inputHandler.bind(null, "email"),
              }}
            />
            <Input
              label="Password"
              config={{
                placeholder: "Password",
                value: input.password,
                onChangeText: inputHandler.bind(null, "password"),
                secureTextEntry: true,
              }}
            />
          </View>
        )}
        <Button title={form.button} onPress={submitHandler} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text} onPress={switchHandler}>
            {form.switch}
          </Text>
          <Text style={styles.text} onPress={clearHandler}>
            Clear
          </Text>
        </View>
      </View>
    </View>
  );
};

// export const LoginForm = ({ type }) => {
//   const [input, setInput] = useState(initialInput);
//   const [error, setError] = useState("");
//   const { signIn, signUp } = useContext(AuthContext);
//   const { title, button, switch } = type === "signIn" ? signInText : signUpText;
//   const handleInput = (name, value) => {
//     setInput({ ...input, [name]: value });
//   };
//   const handleSubmit = () => {
//     if (type === "signIn") {
//       signIn(input.email, input.password);
//     } else {
//       signUp(input.email, input.password);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{title}</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={input.name}
//         onChangeText={(value) => handleInput("name", value)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={input.email}
//         onChangeText={(value) => handleInput("email", value)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={input.password}
//         onChangeText={(value) => handleInput("password", value)}
//         secureTextEntry
//       />
//       <Text style={styles.error}>{error}</Text>
//       <Button title={button} onPress={handleSubmit} />
//       <Text style={styles.switch} onPress={() => setError("")}>
//         {switch}
//       </Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});

import { Platform } from "react-native";

export const server = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
export const port = 3000;

export const fetchCat = async () => {
  try {
    const url = `http://${server}:${port}/products/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Can't fetch category list.");
  }
};

export const fetchProduct = async () => {
  try {
    const url = `http://${server}:${port}/products`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Can't fetch products.");
  }
};

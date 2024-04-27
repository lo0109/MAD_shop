import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductUrl = "https://fakestoreapi.com/products";
const CategoryUrl = "/categories";

export const loadDataAndUpdate = async () => {
  try {
    // Fetch products from the API
    const productResponse = await fetch(ProductUrl);
    const productData = await productResponse.json();

    // Fetch categories from the API
    const categoryResponse = await fetch(ProductUrl + CategoryUrl);
    const categoryData = await categoryResponse.json();

    // Retrieve stored products and categories from AsyncStorage
    const storedProductsString = await AsyncStorage.getItem("products");
    const storedProducts = storedProductsString
      ? JSON.parse(storedProductsString)
      : [];
    const storedCategoriesString = await AsyncStorage.getItem("categories");
    const storedCategories = storedCategoriesString
      ? JSON.parse(storedCategoriesString)
      : [];

    // Compare fetched products with stored products
    if (JSON.stringify(productData) !== JSON.stringify(storedProducts)) {
      // If products are different, update AsyncStorage with fetched products
      await AsyncStorage.setItem("products", JSON.stringify(productData));
      console.log("Products updated in AsyncStorage");
    } else {
      console.log("Products in AsyncStorage are up to date");
    }

    // Compare fetched categories with stored categories
    if (JSON.stringify(categoryData) !== JSON.stringify(storedCategories)) {
      // If categories are different, update AsyncStorage with fetched categories
      await AsyncStorage.setItem("categories", JSON.stringify(categoryData));
      console.log("Categories updated in AsyncStorage");
    } else {
      console.log("Categories in AsyncStorage are up to date");
    }

    // Return the fetched products and categories
    return { products: productData, categories: categoryData };
  } catch (error) {
    console.error("Error fetching or updating data:", error);
    throw error;
  }
};

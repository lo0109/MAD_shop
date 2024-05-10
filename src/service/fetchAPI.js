const baseUrl = "https://fakestoreapi.com/";

export const fetchCat = async () => {
  try {
    const url = baseUrl + "products/categories";
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Can't fetch category list.");
  }
};

export const fetchProduct = async () => {
  try {
    const url = baseUrl + "products";
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Can't fetch products.");
  }
};

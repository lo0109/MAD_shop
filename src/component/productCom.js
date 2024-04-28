import { useState, useEffect } from "react";
import { loadCatDataAndUpdate, loadProdDataAndUpdate } from "../datamodel/data";
import { useIsFocused } from "@react-navigation/native";

export const prodCom = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load and update data
        const data = await loadProdDataAndUpdate();

        // Update state with fetched products and categories
        setProducts(data.products);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);
  return products;
};
export const catCom = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load and update data
        const data = await loadCatDataAndUpdate();

        // Update state with fetched products and categories
        setCategories(data.categories);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);
  return categories;
};

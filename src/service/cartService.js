import { port, server } from "./fetchAPI";

export const fetchCart = async ({ token }) => {
  const url = `http://${server}:${port}/cart`;
  try {
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (e) {
    throw new Error("Can't fetch cart:" + e.message);
  }
};

export const updateCart = async ({ token, items }) => {
  const url = `http://${server}:${port}/cart`;
  try {
    const res = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });
    return await res.json();
  } catch (e) {
    throw new Error("Can't update cart:" + e.message);
  }
};

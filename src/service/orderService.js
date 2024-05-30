import { port, server } from "./fetchAPI";

export const fetchOrder = async ({ token }) => {
  const url = `http://${server}:${port}/orders/all`;
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
    throw new Error("Can't fetch order:" + e.message);
  }
};

export const updateOrder = async ({ token, orders }) => {
  const url = `http://${server}:${port}/orders/updateorder`;
  try {
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orders }),
    });
    return await res.json();
  } catch (e) {
    throw new Error("Can't update order:" + e.message);
  }
};

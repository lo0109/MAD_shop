import { port, server } from "./fetchAPI";

export const checkOut = async ({ token, items }) => {
  const url = `http://${server}:${port}/orders/neworder`;
  try {
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });
    return await res.json();
  } catch (e) {
    throw new Error("Can't checkout:" + e.message);
  }
};

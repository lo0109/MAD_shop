import { port, server } from "./fetchAPI";

export const signupUser = async ({ name, email, password }) => {
  const url = `http://${server}:${port}/users/signup`;
  const user = { name, email, password };
  try {
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (e) {
    throw new Error("Can't signup user:" + e.message);
  }
};

export const signinUser = async ({ email, password }) => {
  const url = `http://${server}:${port}/users/signin`;
  const user = { email, password };
  try {
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (e) {
    throw new Error("Can't signin user:" + e.message);
  }
};

export const updateUserProfile = async ({ token, name, password }) => {
  const url = `http://${server}:${port}/users/update`;
  const user = { name, password };
  try {
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (e) {
    throw new Error("Can't update user:" + e.message);
  }
};

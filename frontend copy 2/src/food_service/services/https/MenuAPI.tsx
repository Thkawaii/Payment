import { MenuInterface } from "../../interfaces/IMenu";

const apiUrl = "http://localhost:8000";

export async function GetMenus() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${apiUrl}/menus`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

export async function CreateMenu(data: MenuInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/menus`, requestOptions)
    .then((res) => res.status === 201 ? res.json() : false);

  return res;
  
}

export async function UpdateMenu(data: MenuInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/menus/${data.ID}`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

export async function DeleteMenuByID(id: number) {
  const requestOptions = {
    method: "DELETE",
  };

  const res = await fetch(`${apiUrl}/menus/${id}`, requestOptions)
    .then((res) => res.status === 200 ? true : false);

  return res;
}

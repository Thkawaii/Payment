import { OrderInterface } from "../../interfaces/IOrder";

const apiUrl = "http://localhost:8000";

export async function GetOrders() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${apiUrl}/orders`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

export async function GetOrdersById(id: number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  const res = await fetch(`${apiUrl}/orders/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
};


export async function CreateOrder(data: OrderInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/orders`, requestOptions)
    .then((res) => res.status === 201 ? res.json() : false);

  return res;
}

export async function UpdateOrder(data: OrderInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/orders/${data.ID}`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

export async function DeleteOrderByID(id: number) {
  const requestOptions = {
    method: "DELETE",
  };

  const res = await fetch(`${apiUrl}/orders/${id}`, requestOptions)
    .then((res) => res.status === 200 ? true : false);

  return res;
}

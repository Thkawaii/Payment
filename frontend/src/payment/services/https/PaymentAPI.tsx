import { PaymentInterface } from "../../interface/IPayment";

const apiUrl = "http://localhost:8000";

export async function GetPayments() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${apiUrl}/bookings`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

export async function CreatePayments(data: PaymentInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/bookings`, requestOptions)
    .then((res) => res.status === 201 ? res.json() : false);

  return res;
}

export async function UpdatePayments(data: PaymentInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/bookings/${data.ID}`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

export async function DeletePaymentsByID(id: number) {
  const requestOptions = {
    method: "DELETE",
  };

  const res = await fetch(`${apiUrl}/bookings/${id}`, requestOptions)
    .then((res) => res.status === 200 ? true : false);

  return res;
}

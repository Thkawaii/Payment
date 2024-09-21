import { MealInterface } from "../../interfaces/IMeal";

const apiUrl = "http://localhost:8000";

export async function GetMeals() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${apiUrl}/meals`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

export async function CreateMeal(data: MealInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/meals`, requestOptions)
    .then((res) => res.status === 201 ? res.json() : false);

  return res;
}

export async function UpdateMeal(data: MealInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/meals/${data.ID}`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

export async function DeleteMealByID(id: number) {
  const requestOptions = {
    method: "DELETE",
  };

  const res = await fetch(`${apiUrl}/meals/${id}`, requestOptions)
    .then((res) => res.status === 200 ? true : false);

  return res;
}

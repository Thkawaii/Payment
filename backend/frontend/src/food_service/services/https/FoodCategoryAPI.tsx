import { FoodCategoryInterface } from "../../interfaces/IFoodCategory";

const apiUrl = "http://localhost:8000";

export async function GetFoodCategories() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${apiUrl}/food-categories`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

export async function CreateFoodCategory(data: FoodCategoryInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/food-categories`, requestOptions)
    .then((res) => res.status === 201 ? res.json() : false);

  return res;
}

export async function UpdateFoodCategory(data: FoodCategoryInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/food-categories/${data.ID}`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

export async function DeleteFoodCategoryByID(id: number) {
  const requestOptions = {
    method: "DELETE",
  };

  const res = await fetch(`${apiUrl}/food-categories/${id}`, requestOptions)
    .then((res) => res.status === 200 ? true : false);

  return res;
}

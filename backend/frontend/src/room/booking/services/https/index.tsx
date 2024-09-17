// import { UsersInterface } from "../../interfaces/IUser";
import { CustomersInterface } from "../../interfaces/ICustomer";
import { BookingInterface } from "../../interfaces/IBooking";
import { RoomInterface } from "../../interfaces/IRoom";
const apiUrl = "http://localhost:8000";


async function GetCustomers() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${apiUrl}/customers`, requestOptions)  // Ensure /customers exists in your backend
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function GetTypeRooms() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${apiUrl}/roomtypes`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

export async function GetRoomsById(id: number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  const res = await fetch(`${apiUrl}/rooms/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
};

async function GetRooms() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${apiUrl}/rooms`, requestOptions)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function CreateCustomer(data: CustomersInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/customers`, requestOptions)
    .then((res) => {
      if (res.status == 201) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}


export async function UpdateRoom(data: RoomInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/rooms/${data.ID}`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

// async function UpdateRoom(data: RoomInterface) {
//   const requestOptions = {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   const res = await fetch(`${apiUrl}/rooms/${id}`, requestOptions)
//   .then((res) => {
//     if (res.status == 200) {
//       return res.json();
//     } else {
//       return false;
//     }
//   });
  
//   return res;
// }

export async function GetBookingsById(id: number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  const res = await fetch(`${apiUrl}/bookings/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
};


export async function GetBookings() {
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

export async function CreateBooking(data: BookingInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/bookings`, requestOptions)
    .then((res) => res.status === 201 ? res.json() : false);

  return res;
}

export async function UpdateBooking(data: BookingInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${apiUrl}/bookings/${data.ID}`, requestOptions)
    .then((res) => res.status === 200 ? res.json() : false);

  return res;
}

export async function DeleteBookingByID(id: number) {
  const requestOptions = {
    method: "DELETE",
  };

  const res = await fetch(`${apiUrl}/bookings/${id}`, requestOptions)
    .then((res) => res.status === 200 ? true : false);

  return res;
}

export {

  GetTypeRooms,
  GetRooms,
  CreateCustomer,
  GetCustomers,
};

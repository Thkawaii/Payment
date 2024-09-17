import { SignInInterface } from "../../interface/SignIn";

const apiUrl = "http://localhost:8000";

export async function SignIn(data: SignInInterface) {
  try {
    const response = await fetch(`${apiUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return { status: response.status, data: result };
    } else {
      // ถ้า response ไม่ OK ให้แสดงข้อความผิดพลาดจาก server
      return { status: response.status, data: { error: result.error || "Unknown error occurred" } };
    }
  } catch {
    // จัดการข้อผิดพลาดที่เกิดจากการเรียก fetch
    return { status: 500, data: { error: "Unknown error occurred" } };
  }
}

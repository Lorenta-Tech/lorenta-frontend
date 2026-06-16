// src/mock/mockLogin.ts

export const mockDepartmentLogin = async (
  username: string,
  password: string
) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 800)
  );

  if (username === "cse" && password === "12345678") {
    return {
      access_token: "jwt-token",
      department_id: "cse-uuid",
      expires_in: 3600
    };
  }

  const error = {
    status: 401,
    code: "INVALID_CREDENTIALS",
    message:
      "Invalid username or password",
  };

  throw error;
};
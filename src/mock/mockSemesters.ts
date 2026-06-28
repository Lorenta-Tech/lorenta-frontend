export interface Semester {
  id: string;
  semester_number: number;
}

export const mockGetSemesters = async (
  departmentId: string
) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  if (departmentId === "11111111-1111-1111-1111-111111111111") {
    return {
      data: [
        {
          id: "sem-uuid-1",
          semester_number: 1,
        },
        {
          id: "sem-uuid-2",
          semester_number: 2,
        },
        {
          id: "sem-uuid-3",
          semester_number: 3,
        },
        {
          id: "sem-uuid-4",
          semester_number: 4,
        },
        {
          id: "sem-uuid-5",
          semester_number: 5,
        },
        {
          id: "sem-uuid-6",
          semester_number: 6,
        },
        {
          id: "sem-uuid-7",
          semester_number: 7,
        },
        {
          id: "sem-uuid-8",
          semester_number: 8,
        },
      ],
    };
  }

  throw {
    status: 401,
    code: "INVALID_DEPARTMENT",
    message:
      "Invalid Department ID",
  };
};
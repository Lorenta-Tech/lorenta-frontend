export const mockGetSemesters = async (
  departmentId: string
) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  if (departmentId === "cse-uuid") {
    return {
      semesters: [
        {
          id: "sem-1-uuid",
          semester_number: 1,
        },
        {
          id: "sem-2-uuid",
          semester_number: 2,
        },
        {
          id: "sem-3-uuid",
          semester_number: 3,
        },
        {
          id: "sem-4-uuid",
          semester_number: 4,
        },
        {
          id: "sem-5-uuid",
          semester_number: 5,
        },
        {
          id: "sem-6-uuid",
          semester_number: 6,
        },
        {
          id: "sem-7-uuid",
          semester_number: 7,
        },
        {
          id: "sem-8-uuid",
          semester_number: 8,
        },
      ],
    };
  }

  const error = {
    status: 401,
    code: "INVALID_DEPARTMENT",
    message:
      "Invalid DEPARTMENT ID",
  };

  throw error;
};
export interface Subject {
  id: string;
  name: string;
  code: string;
}

export const mockGetSubjects = async (
  departmentId: string,
  semesterId: string
) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  return {
    subjects: [
      {
        id: "dbms-uuid",
        name:
          "Database Management System",
        code: "21CS53",
      },
      {
        id: "cn-uuid",
        name: "Computer Networks",
        code: "21CS54",
      },
      {
        id: "os-uuid",
        name: "Operating Systems",
        code: "21CS55",
      },
      {
        id: "se-uuid",
        name: "Software Engineering",
        code: "21CS56",
      },
    ],
  };
};
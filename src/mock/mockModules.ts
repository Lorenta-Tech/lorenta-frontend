export interface ModuleFile {
  id: string;
  title: string;
  file_type: string;
  uploaded_at: string;
}

export interface Module {
  id: string;
  module_number: number;
  files: ModuleFile[];
}

export const mockGetModules = async (
  subjectId: string
) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  return {
    modules: [
      {
        id: "module-1-uuid",
        module_number: 1,
        files: [
          {
            id: "file-1",
            title: "DBMS Module 1 Notes",
            file_type: "NOTES",
            uploaded_at:
              "2026-06-01T10:00:00Z",
          },
          {
            id: "file-2",
            title: "DBMS Module 1 PPT",
            file_type: "PPT",
            uploaded_at:
              "2026-06-01T10:00:00Z",
          },
        ],
      },
      {
        id: "module-2-uuid",
        module_number: 2,
        files: [],
      },
      {
        id: "module-3-uuid",
        module_number: 3,
        files: [],
      },
      {
        id: "module-4-uuid",
        module_number: 4,
        files: [],
      },
      {
        id: "module-5-uuid",
        module_number: 5,
        files: [],
      },
    ],
  };
};
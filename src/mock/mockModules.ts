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
  _subjectId: string
) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  return { 
	"data": [
		{ "id": "08681f60-e5b2-473d-bfe7-132944cc4bf7", "module_number": 1, "title": "Module 1" },
		{ "id": "mod-uuid-2", "module_number": 2, "title": "Module 2" },
		{ "id": "mod-uuid-3", "module_number": 3, "title": "Module 3" },
		{ "id": "mod-uuid-4", "module_number": 4, "title": "Module 4" },
		{ "id": "mod-uuid-5", "module_number": 5, "title": "Module 5" },
		{ "id": "mod-uuid-6", "module_number": 6, "title": "Additional Resources" }
	]
};
};

export const mockGetModuleFiles =
  async (
    _moduleId: string
  ) => {
    await new Promise((r) =>
      setTimeout(r, 300)
    );

    return {
      data: [
        {
          id: "note-uuid-1",
          title: "Unit 1 Notes",
          description:
            "Introduction to operating systems",
          file_type: "pdf",
          original_filename:
            "unit1_os.pdf",
          file_size_bytes: 204800,
          created_at:
            "2024-01-15T10:00:00Z",
        },
        {
          id: "note-uuid-2",
          title: "Unit 1 Slides",
          description:
            "Lecture slides for module 1",
          file_type: "ppt",
          original_filename:
            "unit1_slides.pptx",
          file_size_bytes: 512000,
          created_at:
            "2024-01-16T10:00:00Z",
        },
      ],
    };
  };
export interface Subject {
  id: string;
  name: string;
  code: string;
}

export const mockGetSubjects = async (
  _departmentId: string,
  _semesterId: string
) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  return {
	  "data": [
      { "id": "subj-uuid-1", "name": "Operating Systems", "subject_code": "CS301"
  },
      { "id": "subj-uuid-2", "name": "Data Structures", "subject_code": "CS302"
  },
      { "id": "subj-uuid-3", "name": "Computer Networks", "subject_code": "CS303" }
    ]
  };
};
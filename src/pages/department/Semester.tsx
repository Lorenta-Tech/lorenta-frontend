import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDepartmentAuth } from "../../contexts/DeptAuthContext";
import { Semester, mockGetSemesters } from "../../mock/mockSemesters";
// import apiFetch from "../../api/api";

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export default function SemesterPage() {
  const navigate = useNavigate();

  const { departmentId } =
    useDepartmentAuth();

  const [loading, setLoading] =
    useState(true);

  const [semesters, setSemesters] =
    useState<Semester[]>([]);

  useEffect(() => {
    if (!departmentId) {
      setLoading(false);
      return;
    }

    const fetchSemesters =
      async () => {
        try {
          // REAL API
          // const response = await apiFetch(
          //   `/notes/branches/${departmentId}/semesters`,
          //   {
          //     method: "GET",
          //   }
          // );

          // MOCK API
          const response =
            await mockGetSemesters(
              departmentId
            );

          setSemesters(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchSemesters();
  }, [departmentId]);

  const openSemester = (
    semesterId: string
  ) => {
    navigate(
      `/department/semester/${semesterId}/subjects`
    );
  };

  if (loading) {
    return (
      <div className="text-white">
        Loading semesters...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-4xl font-extrabold text-white">
          Semesters
        </h1>

        <p className="text-white/70">
          Select a semester to manage
          subjects and modules
        </p>
      </div>

      {semesters.length === 0 ? (
        <div className="rounded-xl border border-white/10 p-6 text-white/60">
          No semesters found.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {semesters.map(
            (semester) => (
              <button
                key={semester.id}
                onClick={() =>
                  openSemester(
                    semester.id
                  )
                }
                className="group rounded-2xl border border-white/15 bg-white/5 p-6 text-left backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
              >
                <div className="text-sm font-medium text-white/50">
                  Semester
                </div>

                <div className="mt-2 text-3xl font-bold text-white">
                  {
                    semester.semester_number
                  }
                </div>

                <div className="mt-4 text-sm text-white/60 transition group-hover:text-white/90">
                  View Subjects →
                </div>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
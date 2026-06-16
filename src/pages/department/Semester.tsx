import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDepartmentAuth } from "../../contexts/DeptAuthContext";
import { mockGetSemesters } from "../../mock/mockSemesters";
// import apiFetch from "../../api/api";

interface Semester {
  id: string;
  semester_number: number;
}

export default function SemesterPage() {
  const navigate = useNavigate();

  const { departmentUser } = useDepartmentAuth();

  const [loading, setLoading] =
    useState(true);

  const [semesters, setSemesters] =
    useState<Semester[]>([]);

  useEffect(() => {
    const fetchSemesters =
      async () => {
        try {
          if (!departmentUser) {
            return;
          }

          // const response = await apiFetch<{semesters: Semester[]}>(
          //   `/notes/departments/${departmentUser}/semesters`,
          //   {
          //     method: "GET",
          //   }
          // );

          const response =
            await mockGetSemesters(
              departmentUser
            );

          setSemesters(
            response.semesters
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchSemesters();
  }, [departmentUser]);

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
    </div>
  );
}
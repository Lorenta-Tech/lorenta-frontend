import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useDepartmentAuth } from "../../contexts/DeptAuthContext";

import {
  mockGetSubjects,
  Subject,
} from "../../mock/mockSubjects";

// import apiFetch from "../../api/api";

export default function SubjectPage() {
  const navigate = useNavigate();

  const { semesterId } =
    useParams();

  const { departmentId } =
    useDepartmentAuth();

  const [loading, setLoading] =
    useState(true);

  const [subjects, setSubjects] =
    useState<any[]>([]);

  const [subjectName, setSubjectName] =
    useState("");

  const [subjectCode, setSubjectCode] =
    useState("");

  useEffect(() => {
    const fetchSubjects =
      async () => {
        try {
          if (
            !departmentId ||
            !semesterId
          ) {
            return;
          }

          // const response =
          //   await apiFetch(
          //     "/notes/subjects",
          //     {
          //       method: "POST",
          //       body: JSON.stringify({
          //         department_id:
          //           departmentId,
          //         semester_id:
          //           semesterId,
          //       }),
          //     }
          //   );

          const response =
            await mockGetSubjects(
              departmentId,
              semesterId
            );

          setSubjects(
            response.data
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchSubjects();
  }, [
    departmentId,
    semesterId,
  ]);

  const addSubject = async () => {
    if (
      !subjectName.trim() ||
      !subjectCode.trim()
    ) {
      return;
    }

    /*
    await apiFetch(
      "/notes/subjects",
      {
        method: "POST",
        body: JSON.stringify({
          semester_id:
            semesterId,
          name: subjectName,
          code: subjectCode,
        }),
      }
    );
    */

    const newSubject: Subject = {
      id: crypto.randomUUID(),
      name: subjectName,
      code: subjectCode,
    };

    setSubjects((prev) => [
      ...prev,
      newSubject,
    ]);

    setSubjectName("");
    setSubjectCode("");
  };

  if (loading) {
    return (
      <div className="text-white">
        Loading subjects...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-4xl font-extrabold text-white">
          Subjects
        </h1>

        <p className="text-white/70">
          Manage subjects for this
          semester
        </p>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <input
            value={subjectName}
            onChange={(e) =>
              setSubjectName(
                e.target.value
              )
            }
            placeholder="Subject Name"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
          />

          <input
            value={subjectCode}
            onChange={(e) =>
              setSubjectCode(
                e.target.value
              )
            }
            placeholder="Subject Code (e.g. 21CS53)"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
          />

          <button
            onClick={addSubject}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/90"
          >
            Add Subject
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {subjects.map(
          (subject) => (
            <button
              key={subject.id}
              onClick={() =>
                navigate(
                  `/department/subject/${subject.id}/modules`
                )
              }
              className="group rounded-2xl border border-white/15 bg-white/5 p-5 text-left backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/40">
                    {subject.code}
                  </div>

                  <div className="mt-1 text-lg font-semibold text-white">
                    {subject.name}
                  </div>
                </div>

                <div className="text-white/40 transition group-hover:text-white/80">
                  →
                </div>
              </div>
            </button>
          )
        )}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockGetModules, mockGetModuleFiles } from "../../mock/mockModules";
import { uploadFiles } from "../../api/departmentUpload";
import { deleteNote } from "../../api/deptFileOps";
// import { getModules } from "../../api/modules";
// import { getModuleFiles } from "../../api/modules";

type LocalFile = {
  id: string;
  title: string;
  description?: string;
  file_type: string;
  uploaded_at: string;
  original_filename: string;
  file_size_bytes: number;
  isNew?: boolean;
  localFile?: File;
};

type LocalModule = {
  id: string;
  module_number: number;
  title?: string;
  files: LocalFile[];
};

export default function ModulePage() {
  const { subjectId } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [modules, setModules] =
    useState<LocalModule[]>([]);

  const [
    editingModuleId,
    setEditingModuleId,
  ] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (!subjectId) {
          setLoading(false);
          return;
        }

        // MOCK
        const response =
          await mockGetModules(
            subjectId
          );

        // const response =
        //   await getModules(subjectId);

        const formattedModules: LocalModule[] =
          response.data.map(
            (module: any) => ({
              ...module,
              files: [],
            })
          );

        setModules(
          formattedModules
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [subjectId]);

  const addModule = () => {
    setModules((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        module_number:
          prev.length + 1,
        title: `Module ${
          prev.length + 1
        }`,
        files: [],
      },
    ]);
  };

  const deleteModule = (
    moduleId: string
  ) => {
    setModules((prev) =>
      prev.filter(
        (m) => m.id !== moduleId
      )
    );

    if (
      editingModuleId === moduleId
    ) {
      setEditingModuleId(null);
    }
  };

  const editModule = async (
    moduleId: string
  ) => {
    try {
      setEditingModuleId(moduleId);

      const module =
        modules.find(
          (m) =>
            m.id === moduleId
        );

      if (!module) return;

      if (
        module.files.length > 0
      ) {
        return;
      }

      // MOCK
      const response =
        await mockGetModuleFiles(
          moduleId
        );

      // const response =
      //   await getModuleFiles(moduleId);

      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId
            ? {
                ...m,
                files:
                  response.data.map(
                    (
                      file: any
                    ) => ({
                      id: file.id,
                      title:
                        file.title,
                      description:
                        file.description,
                      file_type:
                        file.file_type,
                      uploaded_at:
                        file.created_at,
                      original_filename:
                        file.original_filename,
                      file_size_bytes:
                        file.file_size_bytes,
                      isNew: false,
                    })
                  ),
              }
            : m
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = (
    moduleId: string,
    file: File
  ) => {
    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() ??
      "";

    const newFile: LocalFile =
      {
        id: crypto.randomUUID(),
        title: file.name,
        file_type:
          extension,
        uploaded_at:
          new Date().toISOString(),
        original_filename:
          file.name,
        file_size_bytes:
          file.size,
        localFile: file,
        isNew: true,
      };

    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              files: [
                ...module.files,
                newFile,
              ],
            }
          : module
      )
    );
  };

  const deleteFile = async (
    moduleId: string,
    file: LocalFile
  ) => {
    try {
      if (!file.isNew) {
        await deleteNote(
          file.id
        );
      }

      setModules((prev) =>
        prev.map((module) =>
          module.id === moduleId
            ? {
                ...module,
                files:
                  module.files.filter(
                    (f) =>
                      f.id !==
                      file.id
                  ),
              }
            : module
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const saveModule = async (
    moduleId: string
  ) => {
    const module =
      modules.find(
        (m) =>
          m.id === moduleId
      );

    if (!module) return;

    const newFiles =
      module.files.filter(
        (file) =>
          file.isNew
      );

    try {
      if (
        newFiles.length > 0
      ) {
        await uploadFiles(
          moduleId,
          newFiles
        );
      }

      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId
            ? {
                ...m,
                files:
                  m.files.map(
                    (f) => ({
                      ...f,
                      isNew: false,
                    })
                  ),
              }
            : m
        )
      );

      setEditingModuleId(
        null
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-white">
        Loading modules...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Modules
          </h1>

          <p className="text-white/70">
            Manage module
            resources
          </p>
        </div>

        <button
          onClick={addModule}
          className="rounded-xl bg-white px-5 py-3 font-semibold text-black"
        >
          Add Module
        </button>
      </div>

      {modules.map(
        (module) => {
          const editing =
            editingModuleId ===
            module.id;

          return (
            <div
              key={module.id}
              className="rounded-2xl border border-white/15 bg-white/5 p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {module.title ??
                    `Module ${module.module_number}`}
                </h2>

                <div className="flex gap-2">
                  {editing ? (
                    <>
                      <button
                        onClick={() =>
                          saveModule(
                            module.id
                          )
                        }
                        className="rounded-lg bg-green-600 px-4 py-2 text-white"
                      >
                        Done
                      </button>

                      <button
                        onClick={() =>
                          deleteModule(
                            module.id
                          )
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-white"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        editModule(
                          module.id
                        )
                      }
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              {editing && (
                <label className="mb-6 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-white/20 p-6">
                  <span className="text-white">
                    Upload Resource
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    onChange={(
                      e
                    ) => {
                      const file =
                        e
                          .target
                          .files?.[0];

                      if (file) {
                        uploadFile(
                          module.id,
                          file
                        );
                      }
                    }}
                  />
                </label>
              )}

              <div className="space-y-3">
                {module.files
                  .length === 0 ? (
                  <div className="rounded-xl border border-white/10 p-4 text-white/60">
                    No files
                    uploaded.
                  </div>
                ) : (
                  module.files.map(
                    (
                      file
                    ) => (
                      <div
                        key={
                          file.id
                        }
                        className="flex items-center justify-between rounded-xl border border-white/10 p-4"
                      >
                        <div>
                          <p className="font-medium text-white">
                            {
                              file.title
                            }
                          </p>

                          <p className="text-xs text-white/50">
                            {
                              file.file_type
                            }
                            {" • "}
                            {(
                              file.file_size_bytes /
                              1024
                            ).toFixed(
                              1
                            )}{" "}
                            KB
                          </p>

                          {file.description && (
                            <p className="mt-1 text-xs text-white/60">
                              {
                                file.description
                              }
                            </p>
                          )}
                        </div>

                        {editing && (
                          <button
                            onClick={() =>
                              deleteFile(
                                module.id,
                                file
                              )
                            }
                            className="rounded-lg bg-red-600 px-4 py-2 text-white"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
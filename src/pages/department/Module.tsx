import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  mockGetModules,
  Module,
} from "../../mock/mockModules";
// import apiFetch from "../../api/api";

type LocalFile = {
  id: string;
  title: string;
  file_type: string;
  uploaded_at: string;
  original_filename: string;
  file_size_bytes: number;
  isNew?: boolean;
  localFile?: File;
};

type LocalModule = Omit<Module, "files"> & {
  files: LocalFile[];
};

export default function ModulePage() {
  const { subjectId } = useParams();

  const [loading, setLoading] = useState(true);

  const [modules, setModules] = useState<LocalModule[]>([]);

  const [originalModules, setOriginalModules] = useState<
    LocalModule[]
  >([]);

  const [editingModuleId, setEditingModuleId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (!subjectId) return;

        const response = await mockGetModules(subjectId);

        const formattedModules: LocalModule[] =
          response.modules.map((module: any) => ({
            ...module,
            files: module.files.map((file: any) => ({
              ...file,
              original_filename:
                file.original_filename ??
                file.title,
              file_size_bytes:
                file.file_size_bytes ?? 0,
              isNew: false,
            })),
          }));

        setModules(formattedModules);
        setOriginalModules(
          structuredClone(formattedModules)
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
        module_number: prev.length + 1,
        files: [],
      },
    ]);
  };

  const deleteModule = (moduleId: string) => {
    setModules((prev) =>
      prev.filter((m) => m.id !== moduleId)
    );

    if (editingModuleId === moduleId) {
      setEditingModuleId(null);
    }
  };

  const uploadFile = (
    moduleId: string,
    file: File
  ) => {
    const extension =
      file.name.split(".").pop()?.toLowerCase() ??
      "";

    const newFile: LocalFile = {
      id: crypto.randomUUID(),
      title: file.name,
      file_type: extension,
      uploaded_at: new Date().toISOString(),
      original_filename: file.name,
      file_size_bytes: file.size,
      localFile: file,
      isNew: true,
    };

    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              files: [...module.files, newFile],
            }
          : module
      )
    );
  };

  const deleteFile = (
    moduleId: string,
    fileId: string
  ) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              files: module.files.filter(
                (f) => f.id !== fileId
              ),
            }
          : module
      )
    );
  };

  const saveModule = async (
    moduleId: string
  ) => {
    const original = originalModules.find(
      (m) => m.id === moduleId
    );

    const current = modules.find(
      (m) => m.id === moduleId
    );

    if (!current) return;

    const newFiles = current.files.filter(
      (file) =>
        file.isNew &&
        !original?.files.some(
          (f) => f.id === file.id
        )
    );

    try {
      for (const file of newFiles) {
        const payload = {
          module_id: moduleId,
          title: file.title,
          // description: "",
          file_type: file.file_type,
          original_filename:
            file.original_filename,
          file_size_bytes:
            file.file_size_bytes,
        };

        console.log(payload);

        /*
        await apiFetch("/notes/files", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        */
      }

      setOriginalModules(
        structuredClone(modules)
      );
      setEditingModuleId(null);
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
            Manage module resources
          </p>
        </div>

        <button
          onClick={addModule}
          className="rounded-xl bg-white px-5 py-3 font-semibold text-black"
        >
          Add Module
        </button>
      </div>

      {modules.map((module) => {
        const editing =
          editingModuleId === module.id;

        return (
          <div
            key={module.id}
            className="rounded-2xl border border-white/15 bg-white/5 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Module {module.module_number}
              </h2>

              <div className="flex gap-2">
                {editing ? (
                  <>
                    <button
                      onClick={() =>
                        saveModule(module.id)
                      }
                      className="rounded-lg bg-green-600 px-4 py-2 text-white"
                    >
                      Done
                    </button>

                    <button
                      onClick={() =>
                        deleteModule(module.id)
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 text-white"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      setEditingModuleId(
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
                  onChange={(e) => {
                    const file =
                      e.target.files?.[0];

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
              {module.files.length === 0 ? (
                <div className="rounded-xl border border-white/10 p-4 text-white/60">
                  No files uploaded.
                </div>
              ) : (
                module.files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 p-4"
                  >
                    <div>
                      <p className="font-medium text-white">
                        {file.title}
                      </p>

                      <p className="text-xs text-white/50">
                        {file.file_type}
                      </p>
                    </div>

                    {editing && (
                      <button
                        onClick={() =>
                          deleteFile(
                            module.id,
                            file.id
                          )
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-white"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
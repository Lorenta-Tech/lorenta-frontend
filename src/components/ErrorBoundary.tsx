import { useRouteError, isRouteErrorResponse } from "react-router-dom";
function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <pre className="mt-2 text-sm text-cta">
        {(error as Error)?.message}
      </pre>
    </div>
  );
}


export default ErrorBoundary;
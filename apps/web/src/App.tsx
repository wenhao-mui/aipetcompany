import { useEffect, useState } from "react";
import { APP_NAME, hello } from "@aipetcompany/shared";

type HelloResponse = {
  message: string;
  office: string;
};

export function App() {
  const [backend, setBackend] = useState<HelloResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Backend responded with ${response.status}`);
        }
        return response.json() as Promise<HelloResponse>;
      })
      .then(setBackend)
      .catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : "Could not reach the backend");
      });
  }, []);

  return (
    <main>
      <p className="eyebrow">{APP_NAME}</p>
      <h1>{hello("world")}</h1>
      {backend ? (
        <p className="status">{backend.office}</p>
      ) : error ? (
        <p className="status">{error}</p>
      ) : (
        <p className="status">Connecting to the office…</p>
      )}
    </main>
  );
}

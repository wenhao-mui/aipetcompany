import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { APP_NAME } from "@aipetcompany/shared";
import { OfficeScene } from "../office/OfficeScene";
import { clearFounder, readFounder } from "../session";

export function OfficePage() {
  const navigate = useNavigate();
  const founder = readFounder();

  useEffect(() => {
    document.title = `Office · ${APP_NAME}`;
  }, []);

  if (!founder) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="office-page">
      <header className="office-bar">
        <div>
          <p className="eyebrow">{APP_NAME}</p>
          <h1>The office</h1>
        </div>
        <div className="founder">
          <p>{founder.name}</p>
          <button
            type="button"
            className="ghost"
            onClick={() => {
              clearFounder();
              navigate("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </header>
      <div className="room-wrap">
        <OfficeScene />
      </div>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { AuthScreen } from "../auth/AuthScreen";
import { nameFromEmail, saveFounder } from "../session";

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <AuthScreen
      title="Welcome back"
      lede="The office is open."
      submitLabel="Enter the office"
      alternate={
        <>
          New founder? <Link to="/signup">Create a company</Link>
        </>
      }
      onSubmit={({ email }) => {
        saveFounder({ name: nameFromEmail(email), email });
        navigate("/office");
      }}
    />
  );
}

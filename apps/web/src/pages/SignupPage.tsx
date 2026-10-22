import { Link, useNavigate } from "react-router-dom";
import { AuthScreen } from "../auth/AuthScreen";
import { saveFounder } from "../session";

export function SignupPage() {
  const navigate = useNavigate();

  return (
    <AuthScreen
      title="Start your company"
      lede="A CEO, CFO, CTO, and COO will take their seats."
      submitLabel="Open the office"
      includeName
      alternate={
        <>
          Already have a company? <Link to="/login">Sign in</Link>
        </>
      }
      onSubmit={({ name, email }) => {
        saveFounder({ name, email });
        navigate("/office");
      }}
    />
  );
}

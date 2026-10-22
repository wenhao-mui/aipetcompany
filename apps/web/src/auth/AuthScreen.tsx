import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { APP_NAME } from "@aipetcompany/shared";
import { FrontCat } from "../office/cats";
import { team } from "../office/team";
import { readFounder } from "../session";

type AuthValues = {
  name: string;
  email: string;
  password: string;
};

type AuthScreenProps = {
  title: string;
  lede: string;
  submitLabel: string;
  includeName?: boolean;
  alternate: ReactNode;
  onSubmit: (values: AuthValues) => void;
};

export function AuthScreen({
  title,
  lede,
  submitLabel,
  includeName = false,
  alternate,
  onSubmit,
}: AuthScreenProps) {
  const [values, setValues] = useState<AuthValues>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof AuthValues, string>>>({});

  useEffect(() => {
    document.title = `${title} · ${APP_NAME}`;
  }, [title]);

  if (readFounder()) {
    return <Navigate to="/office" replace />;
  }

  function update(field: keyof AuthValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<Record<keyof AuthValues, string>> = {};

    if (includeName && values.name.trim().length < 2) {
      next.name = "Enter your name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Enter a valid email.";
    }
    if (values.password.length < 4) {
      next.password = "Use at least 4 characters.";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    });
  }

  return (
    <main className="auth-shell">
      <section className="auth-aside">
        <p className="eyebrow">{APP_NAME}</p>
        <h1>Your team is already at the table.</h1>
        <ul className="roster">
          {team.map((member) => (
            <li key={member.role}>
              <div className="roster-face">
                <FrontCat member={member} />
              </div>
              <span>{member.role}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="auth-panel">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <h2>{title}</h2>
          <p className="lede">{lede}</p>
          {includeName && (
            <label>
              Name
              <input
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </label>
          )}
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete={includeName ? "new-password" : "current-password"}
              value={values.password}
              onChange={(event) => update("password", event.target.value)}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>
          <button type="submit">{submitLabel}</button>
          <p className="alternate">{alternate}</p>
        </form>
      </section>
    </main>
  );
}

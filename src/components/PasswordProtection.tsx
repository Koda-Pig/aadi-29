import { useState } from "react";
import Cookies from "js-cookie";

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

const COOKIE_NAME = "aadi-29_auth";
const COOKIE_EXPIRY = 1 / 48; // 30 minutes in days

export function PasswordProtection({
  onAuthenticated
}: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === import.meta.env.VITE_APP_PASSWORD) {
      // Set cookie to expire in 30 minutes
      Cookies.set(COOKIE_NAME, password, {
        expires: COOKIE_EXPIRY,
        sameSite: "Strict",
        secure: import.meta.env.NODE_ENV === "production"
      });
      onAuthenticated();
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h1>Celium Prototype</h1>
          <p>Please enter the password to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
            />
            {error && <div>Incorrect password</div>}
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

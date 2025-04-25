import { useState, useEffect } from "react";
import styles from "../styles/password-protection.module.scss";
import Cookies from "js-cookie";

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

const COOKIE_NAME = "aadi_auth";
const COOKIE_EXPIRY = 1 / 48; // 30 minutes in days

export function PasswordProtection({
  onAuthenticated
}: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check for existing auth cookie
    const authCookie = Cookies.get(COOKIE_NAME);
    if (authCookie) {
      onAuthenticated();
    }
  }, [onAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === import.meta.env.VITE_APP_PASSWORD) {
      // Set cookie to expire in 30 minutes
      Cookies.set(COOKIE_NAME, password, {
        expires: COOKIE_EXPIRY,
        sameSite: "Strict",
        secure: import.meta.env.PROD
      });
      onAuthenticated();
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.password_protection}>
      <div>
        <h1>shhhhh, it's a secret</h1>
        <p>enter the password to continue</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Enter password"
          />
          {error && <div className={styles.error}>Incorrect password</div>}
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

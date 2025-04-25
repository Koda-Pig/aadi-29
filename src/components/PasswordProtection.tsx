import { useState } from "react";
import styles from "../styles/password-protection.module.scss";

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

export function PasswordProtection({
  onAuthenticated
}: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === import.meta.env.VITE_APP_PASSWORD) {
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
  );
}

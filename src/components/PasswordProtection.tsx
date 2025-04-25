import { useState } from "react";
import { createHash } from "crypto";
import Cookies from "js-cookie";

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

const COOKIE_NAME = "celium_auth";
const COOKIE_EXPIRY = 1 / 48; // 30 minutes in days

export function PasswordProtection({
  onAuthenticated
}: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hash = createHash("md5").update(password).digest("hex");
    if (hash === process.env.NEXT_PUBLIC_PASS) {
      // Set cookie to expire in 30 minutes
      Cookies.set(COOKIE_NAME, hash, {
        expires: COOKIE_EXPIRY,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production"
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
              type="password"
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

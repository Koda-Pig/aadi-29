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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create a TextEncoder to convert the password to bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Use Web Crypto API to create a hash
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (hashHex === process.env.NEXT_PUBLIC_PASS) {
      // Set cookie to expire in 30 minutes
      Cookies.set(COOKIE_NAME, hashHex, {
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

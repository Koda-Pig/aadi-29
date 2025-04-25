import { SHA256 } from "crypto-js";

const password = "goodbye twenties";
const hash = SHA256(password).toString();
console.log("Password:", password);
console.log("SHA-256 Hash:", hash);

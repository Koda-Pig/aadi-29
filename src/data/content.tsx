// import styles from "yet-another-react-lightbox/styles.css";
import { Message } from "../types";
import { Link } from "react-router-dom";
import styles from "../styles/app.module.scss";

export const messages: Message[] = [
  {
    text: "You're cute AF",
    scrollThreshold: 1000
  },
  {
    text: "Drop-dead gorgeous in ways that take my breath away",
    scrollThreshold: 2000
  },
  {
    text: "Your captivating blend of mystery and openness that keeps me hooked",
    scrollThreshold: 3000
  },
  {
    text: "Fucking hilarious",
    scrollThreshold: 4000
  },
  {
    text: "Fascinatingly intelligent",
    scrollThreshold: 5000
  },
  {
    text: "Your endless curiosity about the world and everything in it",
    scrollThreshold: 6000
  },
  {
    text: "Perfect curves in all the right places",
    scrollThreshold: 7000
  },
  {
    text: "You inspire and encourage me to become the best version of myself",
    scrollThreshold: 8000
  },
  {
    text: "Your unwavering principles and courage to defend what matters",
    scrollThreshold: 9000
  },
  {
    text: "Always down for adventures and new experiences",
    scrollThreshold: 10000
  },
  {
    text: "Mother to our nefarious children",
    scrollThreshold: 11000
  },
  {
    text: "Absolutely stunning from every angle, inside and out",
    scrollThreshold: 12000
  },
  {
    text: "Give outstanding head",
    scrollThreshold: 13000
  },
  {
    text: "Your unique perspective on the world",
    scrollThreshold: 14000
  },
  {
    text: "The way you care deeply about the people you love",
    scrollThreshold: 15000
  },
  {
    text: "Your honesty, even when it's hard to hear",
    scrollThreshold: 16000
  },
  {
    text: "Exceptionally good ass",
    scrollThreshold: 17000
  },
  {
    text: "Your brilliant mind and how you see connections others miss",
    scrollThreshold: 18000
  },
  {
    text: "How you transform any space into our sanctuary",
    scrollThreshold: 19000
  },
  {
    text: "Your mesmerizing eyes - deep pools of rich amber brown",
    scrollThreshold: 20000
  },
  {
    scrollThreshold: 21000,
    text: (
      <>
        <div className={styles.galleryLink}>
          <Link to="/gallery">
            <p>view gallery</p>
          </Link>
        </div>

        <div className={styles.footer}>
          <p>made with ❤️ by your 'ua</p>
        </div>
      </>
    )
  }
];

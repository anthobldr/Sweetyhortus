import Link from "next/link";
import styles from "./layouts.module.css";

export default function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 h-100">
      <ul className={`nav nav-pills d-flex flex-column mb-auto my-5 ms-3 list-unstyled ${styles.users_nav}`}>
        
        <li className="mb-3">
          <Link href="/profil" className={`nav-link ${styles.activeLink}`}>
            <i className="bi bi-person-fill-gear pe-2"></i>
            Générale
          </Link>
        </li>

        <li className="mb-3">
          <Link href="./security.php" className="nav-link">
            <i className="bi bi-fingerprint pe-2"></i>
            Sécurité
          </Link>
        </li>

        <li className="mb-3">
          <Link href="#" className="nav-link">
            <i className="bi bi-credit-card-fill pe-2"></i>
            Commandes
          </Link>
        </li>

        <li className="mb-3">
          <Link href="./support/support.php" className="nav-link">
            <i className="bi bi-ticket-detailed pe-2"></i>
            Support
          </Link>
        </li>

      </ul>
    </div>
  );
}
import style from "./layouts.module.css"

export default function Sidebar(){
    return (
        <div className="d-flex flex-column flex-shrink-0 bg-dark-green h-100" style={{width: "280px"}}>
            <ul id={style.users_nav} className="nav nav-pills flex-column mb-auto my-5 ms-3">
                <li className="nav-item mb-2">
                    <a href="./profil.php" className={`nav-link active ${style["bg-dark-green"]}`} aria-current="page">
                    <i className="fa-light fa-user pe-2"></i>
                    Générale
                    </a>
                </li>
                <li className="nav-item">
                    <a href="./security.php" className="nav-link">
                    <i className="fa-sharp fa-light fa-fingerprint pe-2"></i>
                    Sécurité
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                    <i className="fa-thin fa-credit-card-front pe-2"></i>
                    Commandes
                    </a>
                </li>
                <li className="nav-item">
                    <a href="./support/support.php" className="nav-link">
                    <i className="fa-light fa-ticket-simple pe-2"></i>
                    Support
                    </a>
                </li>
            </ul>
        </div>
    )
}
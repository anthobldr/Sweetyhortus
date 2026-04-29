'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './layouts.module.css';

const getUser = await fetch("/api/me")
const user = await getUser.json();

export default function Navbar(){
    const pathname = usePathname();
    return <header className="shadow">
    <div className="container-fluid bg-green">
        <div className="row p-1">
            <div className="col logo pt-2">
                <Link className="nav-link text-black" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Image className="pe-2" src="/logo_sweety.png" alt="Logo" width={75} height={60} />
                    Sweety Hortus
                </Link>          
            </div>
            <div className="col search pt-3">
                <form className="d-flex" role="search">
                    <input className={`${styles.searchInput} form-control me-2`} type="search" placeholder="Rechercher un produit" aria-label="Search" />
                    <button className={`form-control me-2 btn btn-outline-success ${styles.searchSubmit}`} type="submit">Rechercher</button>
                </form> 
            </div>
            <div className="col text-end {styles.account} p-4">
                {user?  
                <div className="dropdown">
                    <a className="dropdown-toggle text-decoration-none text-black pe-3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-user pe-2"></i>{user.email}
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" href="/profil">Profil</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" href="/api/logout">Déconnexion</Link></li>
                    </ul>
                </div> 
                :
                <div className="dropdown">
                    <a className="dropdown-toggle text-decoration-none text-black pe-3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-user pe-2"></i>Mon compte
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" href="/login">Connexion</Link></li>
                        <li><Link className="dropdown-item" href="/register">Inscription</Link></li>
                    </ul>
                </div> 
                }  
            </div>
        </div>
    </div>
    <nav className={`${styles.navbar} navbar navbar-expand-lg bg-dark-green`}>
        <div className="container-fluid header">
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#NavbarHamburger" aria-controls="NavbarHamburger" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>          
            <div className="collapse navbar-collapse justify-content-center text-center" id="NavbarHamburger">
                <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">Accueil</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Conseils & Idées
                        </a>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">Action</a></li>
                          <li><a className="dropdown-item" href="#">Another action</a></li>
                          <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>              
                    <li className="nav-item">
                      <Link className={`nav-link ${pathname === '/realisations' ? 'active' : ''}`} href="/realisations">Nos réalisations</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${pathname === '/shop' ? 'active' : ''}`} href="/shop">Boutique</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${pathname === '/services' ? 'active' : ''}`} href="/services">Services</Link>
                      </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${pathname === '/contact' ? 'active' : ''}`} href="/contact">Contact</Link>
                    </li>
                </ul>                     
            </div>
        </div>
    </nav>
</header>
}
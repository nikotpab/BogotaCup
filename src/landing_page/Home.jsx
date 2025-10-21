import React, { useState } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router";


export default function LandingPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="lp-landing">
            <nav className={`lp-navbar ${mobileOpen ? "is-open" : ""}`}>
                <div className="lp-nav-container">
                    <a href="#inicio" className="lp-brand">Bogotá<span className="lp-grad-txt"> Cup</span></a>

                    <button
                        className="lp-menu-toggle"
                        aria-label="Abrir menú"
                        aria-expanded={mobileOpen}

                    >
                        ☰
                    </button>

                    <div className="lp-menu">
                        <a className="lp-link" onClick={() => navigate('/features')}>Características</a>
                        <a className="lp-link" href="#showcase">Explorar</a>
                    </div>

                    <div className="lp-actions">
                        <button className="lp-btn lp-btn-secondary" onClick={() => navigate('/authenticate')} >
                            Iniciar sesión
                        </button>
                        <button className="lp-btn lp-btn-primary" onClick={() => navigate('/authenticate')}>
                            Registrarme
                        </button>
                    </div>
                </div>

                <div className={`lp-mobile ${mobileOpen ? "active" : ""}`}>
                    <a className="lp-mobile-link" href="#features" onClick={()=>setMobileOpen(false)}>Funciones</a>
                    <a className="lp-mobile-link" href="#showcase" onClick={()=>setMobileOpen(false)}>Explorar</a>
                    <a className="lp-mobile-link" href="#cta" onClick={()=>setMobileOpen(false)}>Precios</a>
                    <div className="lp-mobile-actions">
                        <button className="lp-btn lp-btn-secondary" onClick={() => navigate('/authenticate')}>Iniciar sesión</button>
                        <button className="lp-btn lp-btn-primary" onClick={() => navigate('/authenticate')}>Registrarme</button>
                    </div>
                </div>
            </nav>

            <header id="inicio" className="lp-hero" role="banner">
                <div className="lp-hero-container">
                    <div className="lp-hero-copy">
                        <h1>
                            <span className="lp-grad-txt">Vive</span> el fútbol de barrio
                        </h1>
                        <p>
                            Únete a equipos locales, organiza partidos y sigue resultados en
                            tiempo real. Todo en una sola plataforma hecha para la comunidad.
                        </p>

                        <div className="lp-hero-actions">
                            <button className="lp-btn lp-btn-primary">
                                Empezar gratis
                            </button>
                            <a href="#showcase" className="lp-btn lp-btn-ghost">Ver canchas</a>
                        </div>
                    </div>

                    <div className="lp-hero-visual">
                        <div className="lp-visual-card">
                            <div className="lp-badge">Nuevo</div>
                            <h3>Partidos cerca de ti</h3>
                            <p>Encuentra una cancha libre y únete hoy mismo.</p>

                            <div className="lp-stats">
                                <div className="lp-stat">
                                    <span className="lp-stat-value">24</span>
                                    <span className="lp-stat-label">partidos hoy</span>
                                </div>
                                <div className="lp-stat">
                                    <span className="lp-stat-value">12</span>
                                    <span className="lp-stat-label">canchas</span>
                                </div>
                                <div className="lp-stat">
                                    <span className="lp-stat-value">8</span>
                                    <span className="lp-stat-label">ligas activas</span>
                                </div>
                            </div>

                            <button className="lp-btn lp-btn-block">
                                Crear mi cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <section id="features" className="lp-section lp-features" aria-labelledby="t-features">
                <div className="lp-section-container">
                    <h2 id="t-features">Todo lo que necesitas</h2>
                    <p className="lp-subtitle">
                        Organización fácil, resultados al instante y una comunidad siempre activa.
                    </p>

                    <div className="lp-grid-3">
                        <article className="lp-card">
                            <div className="lp-icon" aria-hidden>🗓️</div>
                            <h3>Calendario inteligente</h3>
                            <p>Programa partidos y evita choques de horarios automáticamente.</p>
                        </article>

                        <article className="lp-card">
                            <div className="lp-icon" aria-hidden>📍</div>
                            <h3>Canchas cercanas</h3>
                            <p>Ubica escenarios y obtén rutas rápidas para llegar a tiempo.</p>
                        </article>

                        <article className="lp-card">
                            <div className="lp-icon" aria-hidden>📊</div>
                            <h3>Estadísticas</h3>
                            <p>Rendimiento por jugador y tabla de posiciones en vivo.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section id="showcase" className="lp-section lp-showcase" aria-labelledby="t-showcase">
                <div className="lp-section-container">
                    <h2 id="t-showcase">Explora la comunidad</h2>
                    <p className="lp-subtitle">Canchas, ligas y equipos listos para jugar.</p>

                    <div className="lp-mosaic">
                        <div className="lp-mosaic-item">Cancha 7 • Suba</div>
                        <div className="lp-mosaic-item">Liga Nocturna • Engativá</div>
                        <div className="lp-mosaic-item">Cancha Sintética • Chapinero</div>
                        <div className="lp-mosaic-item">Amistoso • Teusaquillo</div>
                        <div className="lp-mosaic-item">Copa Mixta • Usaquén</div>
                        <div className="lp-mosaic-item">Final • Kennedy</div>
                    </div>
                </div>
            </section>

            <section id="cta" className="lp-section lp-cta" aria-labelledby="t-cta">
                <div className="lp-cta-container">
                    <div className="lp-cta-copy">
                        <h2 id="t-cta">
                            Únete <span className="lp-grad-txt">gratis</span> hoy
                        </h2>
                        <p>Regístrate y empieza a jugar en menos de 1 minuto.</p>
                        <div className="lp-cta-actions">
                            <button className="lp-btn lp-btn-primary" onClick={() => navigate('/authenticate')}>Registrarme</button>
                            <button className="lp-btn lp-btn-secondary" onClick={() => navigate('/authenticate')}>Ya tengo cuenta</button>
                        </div>
                    </div>

                    <div className="lp-price">
                        <div className="lp-price-head">Tendrás acceso a:</div>
                        <div className="lp-price-body">
                            <div className="lp-price-line"><span>✔</span> Crear/Unirse a partidos</div>
                            <div className="lp-price-line"><span>✔</span> Resultados en vivo</div>
                            <div className="lp-price-line"><span>✔</span> Perfiles y estadísticas</div>
                        </div>
                        <div className="lp-price-foot">TOTALMENTE GRATIS</div>
                    </div>
                </div>
            </section>


        </div>
    );
}
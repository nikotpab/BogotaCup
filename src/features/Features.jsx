import React, { useState } from "react";
import "../styles/Features.css";
import { useNavigate } from "react-router";

export default function Features() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="ft-features">
            <nav className={`ft-navbar ${mobileOpen ? "is-open" : ""}`}>
                <div className="ft-nav-container">
                    <a className="ft-brand"href="/">Bogotá<span className="ft-grad-txt"> Cup</span></a>

                    <button
                        className="ft-menu-toggle"
                        aria-label="Abrir menú"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        ☰
                    </button>

                    <div className="ft-menu">
                        <a className="ft-link" href="#features">Funciones</a>
                        <a className="ft-link" href="#showcase">Explorar</a>
                    </div>

                    <div className="ft-actions">
                        <button className="ft-btn ft-btn-secondary" onClick={() => navigate('/authenticate')}>
                            Iniciar sesión
                        </button>
                        <button className="ft-btn ft-btn-primary" onClick={() => navigate('/authenticate')}>
                            Registrarme
                        </button>
                    </div>
                </div>

                <div className={`ft-mobile ${mobileOpen ? "active" : ""}`}>
                    <a className="ft-mobile-link" href="#features" onClick={() => setMobileOpen(false)}>Funciones</a>
                    <a className="ft-mobile-link" href="#showcase" onClick={() => setMobileOpen(false)}>Explorar</a>
                    <div className="ft-mobile-actions">
                        <button className="ft-btn ft-btn-secondary" onClick={() => navigate('/authenticate')}>Iniciar sesión</button>
                        <button className="ft-btn ft-btn-primary" onClick={() => navigate('/authenticate')}>Registrarme</button>
                    </div>
                </div>
            </nav>

            <section className="ft-section ft-hero" aria-labelledby="ft-hero-title">
                <div className="ft-hero-container">
                    <h1 id="ft-hero-title">
                        Organiza tu <span className="ft-grad-txt">torneo</span> como un profesional
                    </h1>
                    <p className="ft-hero-subtitle">
                        Todas las herramientas que necesitas para crear, gestionar y disfrutar torneos de fútbol amateur sin complicaciones.
                    </p>
                </div>
            </section>

            <section id="features" className="ft-section ft-main-features" aria-labelledby="ft-main-title">
                <div className="ft-container">
                    <h2 id="ft-main-title">¿Qué puedes hacer?</h2>
                    <p className="ft-subtitle">
                        Todas las funciones que necesitas para llevar tus torneos al siguiente nivel
                    </p>

                    <div className="ft-grid-4">
                        <article className="ft-card">
                            <div className="ft-icon">🏆</div>
                            <h3>Crea Torneos</h3>
                            <p>Configura torneos completos en minutos. Define categorías, fechas de inicio y fin, y tipo de competición.</p>
                        </article>

                        <article className="ft-card">
                            <div className="ft-icon">⚽</div>
                            <h3>Inscribe Equipos</h3>
                            <p>Registra equipos con todos sus datos: jugadores, director técnico, colores y escudo.</p>
                        </article>

                        <article className="ft-card">
                            <div className="ft-icon">📅</div>
                            <h3>Programa Partidos</h3>
                            <p>Asigna fechas, horarios y canchas. El sistema evita conflictos automáticamente.</p>
                        </article>

                        <article className="ft-card">
                            <div className="ft-icon">🎯</div>
                            <h3>Registra Resultados</h3>
                            <p>Captura goles, tarjetas amarillas y rojas de cada partido de forma rápida y sencilla.</p>
                        </article>

                        <article className="ft-card">
                            <div className="ft-icon">📊</div>
                            <h3>Ve la Tabla en Vivo</h3>
                            <p>Consulta posiciones actualizadas automáticamente con puntos, goles y diferencia de gol.</p>
                        </article>

                        <article className="ft-card">
                            <div className="ft-icon">👨‍⚖️</div>
                            <h3>Asigna Árbitros</h3>
                            <p>Gestiona quién arbitra cada partido sin duplicar horarios ni canchas.</p>
                        </article>

                        <article className="ft-card">
                            <div className="ft-icon">🏟️</div>
                            <h3>Administra Canchas</h3>
                            <p>Registra las canchas disponibles con ubicación, capacidad y horarios de uso.</p>
                        </article>

                        <article className="ft-card">
                            <div className="ft-icon">📈</div>
                            <h3>Consulta Estadísticas</h3>
                            <p>Revisa goleadores, tarjetas, rendimiento de equipos y jugadores en tiempo real.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="ft-section ft-workflow" aria-labelledby="ft-workflow-title">
                <div className="ft-container">
                    <h2 id="ft-workflow-title">Así de fácil es organizar tu torneo</h2>

                    <div className="ft-timeline">
                        <div className="ft-timeline-item">
                            <div className="ft-timeline-marker">1</div>
                            <div className="ft-timeline-content">
                                <h3>Crea tu torneo</h3>
                                <p>Dale nombre, categoría y fechas. Listo para empezar.</p>
                            </div>
                        </div>

                        <div className="ft-timeline-item">
                            <div className="ft-timeline-marker">2</div>
                            <div className="ft-timeline-content">
                                <h3>Inscribe los equipos</h3>
                                <p>Agrega todos los equipos participantes con sus plantillas completas.</p>
                            </div>
                        </div>

                        <div className="ft-timeline-item">
                            <div className="ft-timeline-marker">3</div>
                            <div className="ft-timeline-content">
                                <h3>Programa los partidos</h3>
                                <p>Define cuándo y dónde se juega cada encuentro.</p>
                            </div>
                        </div>

                        <div className="ft-timeline-item">
                            <div className="ft-timeline-marker">4</div>
                            <div className="ft-timeline-content">
                                <h3>Registra resultados</h3>
                                <p>Actualiza marcadores después de cada partido.</p>
                            </div>
                        </div>

                        <div className="ft-timeline-item">
                            <div className="ft-timeline-marker">5</div>
                            <div className="ft-timeline-content">
                                <h3>Sigue las estadísticas</h3>
                                <p>Tabla de posiciones, goleadores y todo actualizado en vivo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ft-section ft-benefits" aria-labelledby="ft-benefits-title">
                <div className="ft-container">
                    <h2 id="ft-benefits-title">Beneficios para ti y tu comunidad</h2>

                    <div className="ft-benefit-grid">
                        <div className="ft-benefit-card">
                            <div className="ft-benefit-icon">✅</div>
                            <h3>Todo en un lugar</h3>
                            <p>Olvídate de hojas de cálculo y grupos de WhatsApp. Aquí está todo organizado.</p>
                        </div>

                        <div className="ft-benefit-card">
                            <div className="ft-benefit-icon">⚡</div>
                            <h3>Ahorra tiempo</h3>
                            <p>La tabla se actualiza sola. No más cálculos manuales de puntos y goles.</p>
                        </div>

                        <div className="ft-benefit-card">
                            <div className="ft-benefit-icon">🎯</div>
                            <h3>Sin errores</h3>
                            <p>El sistema valida todo y evita duplicados o conflictos de horarios.</p>
                        </div>

                        <div className="ft-benefit-card">
                            <div className="ft-benefit-icon">📱</div>
                            <h3>Acceso desde cualquier lado</h3>
                            <p>Consulta desde tu celular, tablet o computador cuando quieras.</p>
                        </div>

                        <div className="ft-benefit-card">
                            <div className="ft-benefit-icon">🔍</div>
                            <h3>Transparencia total</h3>
                            <p>Todos pueden ver resultados, tablas y estadísticas en tiempo real.</p>
                        </div>

                        <div className="ft-benefit-card">
                            <div className="ft-benefit-icon">📝</div>
                            <h3>Historial completo</h3>
                            <p>Guarda todos los torneos pasados para consultar cuando quieras.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="showcase" className="ft-section ft-roles" aria-labelledby="ft-roles-title">
                <div className="ft-container">
                    <h2 id="ft-roles-title">Para cada rol del torneo</h2>
                    <p className="ft-subtitle">
                        Funciones pensadas para organizadores, entrenadores y jugadores
                    </p>

                    <div className="ft-role-grid">
                        <article className="ft-role-card">
                            <div className="ft-role-icon">👔</div>
                            <h3>Organizadores</h3>
                            <p>Control total del torneo. Crea competiciones, asigna partidos, registra resultados y genera reportes.</p>
                        </article>

                        <article className="ft-role-card">
                            <div className="ft-role-icon">🧑‍💼</div>
                            <h3>Entrenadores</h3>
                            <p>Consulta el calendario de tu equipo, resultados pasados y estadísticas de tus jugadores.</p>
                        </article>

                        <article className="ft-role-card">
                            <div className="ft-role-icon">⚽</div>
                            <h3>Jugadores</h3>
                            <p>Revisa tus partidos, goles marcados, tarjetas y tu posición en la tabla de goleadores.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="ft-section ft-cta" aria-labelledby="ft-cta-title">
                <div className="ft-cta-container">
                    <div className="ft-cta-copy">
                        <h2 id="ft-cta-title">
                            Empieza tu torneo <span className="ft-grad-txt">hoy</span>
                        </h2>
                        <p>Únete a la comunidad y organiza torneos amateur sin complicaciones.</p>
                        <div className="ft-cta-actions">
                            <button className="ft-btn ft-btn-primary" onClick={() => navigate('/authenticate')}>Crear mi cuenta</button>
                            <button className="ft-btn ft-btn-secondary" onClick={() => navigate('/authenticate')}>Ya tengo cuenta</button>
                        </div>
                    </div>

                    <div className="ft-price">
                        <div className="ft-price-head">Incluye</div>
                        <div className="ft-price-body">
                            <div className="ft-price-line"><span>✔</span> Torneos ilimitados</div>
                            <div className="ft-price-line"><span>✔</span> Equipos y jugadores sin límite</div>
                            <div className="ft-price-line"><span>✔</span> Estadísticas en tiempo real</div>
                            <div className="ft-price-line"><span>✔</span> Acceso desde cualquier dispositivo</div>
                        </div>
                        <div className="ft-price-foot">100% GRATIS</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
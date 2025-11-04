# ⚽ BogotáCup – Sistema de Gestión de Torneos de Fútbol Amateur

**BogotáCup** es un sistema web diseñado para gestionar torneos de fútbol amateur organizados en Bogotá. Permite administrar equipos, jugadores, árbitros y partidos, así como registrar resultados y generar tablas de posiciones de forma automática.

Este proyecto forma parte de un desarrollo académico universitario, centrado en la **implementación de una base de datos relacional normalizada** y una **aplicación web funcional** conectada a ella.

---

## 📋 Descripción del Proyecto

En las ligas de fútbol amateur, la gestión de torneos suele realizarse de forma manual o con hojas de cálculo dispersas, lo que causa pérdida de información, errores en la programación de partidos y dificultad para consultar datos históricos.

**BogotáCup** propone una solución tecnológica que centraliza la administración de torneos, asegurando **integridad, consistencia y disponibilidad** de los datos a través de un sistema accesible vía navegador web.

---

## 🎯 Objetivos

### Objetivo General

Diseñar e implementar una **base de datos relacional normalizada** y una **aplicación web** que permita administrar torneos de fútbol amateur.

### Objetivos Específicos

* Modelar la estructura de datos mediante **diagramas E-R (Peter Chen y Crow’s Foot)**.
* Aplicar reglas de normalización hasta **3FN**.
* Implementar la base de datos en **MariaDB o PostgreSQL** sobre un entorno **Linux virtualizado**.
* Diseñar una aplicación web para registrar resultados y consultar estadísticas.
* Elaborar un **diccionario de datos** y un conjunto de **consultas en álgebra relacional** (mínimo 10).
* Documentar todo el proceso y mantener control de versiones mediante **GitHub**.

---

## 🔧 Alcance y Funcionalidades

El proyecto cubre los siguientes módulos principales:

* **Gestión de Torneos:** creación, modificación y cierre de torneos.
* **Gestión de Equipos y Jugadores:** registro de plantillas, colores y directores técnicos.
* **Programación de Partidos:** asignación de fecha, hora, cancha y árbitro.
* **Registro de Resultados:** ingreso de goles, tarjetas y estado del partido.
* **Tablas de Posiciones:** generación automática según los resultados.
* **Gestión de Usuarios:** acceso diferenciado para administradores, entrenadores y jugadores.

📉 *No incluye en esta versión:*

* Estadísticas avanzadas.
* Históricos completos.
* Reportes gráficos.

---

## 🗄️ Entidades Principales

1. Torneo
2. Equipo
3. Jugador
4. Partido
5. Árbitro
6. Cancha
7. Resultado
8. Usuario
9. EstadísticaPartido
10. Categoría

---

## 💡 Supuestos del Proyecto

### Supuestos Generales

* El sistema será utilizado **solo para torneos de fútbol amateur** organizados por la **Alcaldía de Bogotá**.
* La infraestructura tecnológica (servidores, internet, acceso) será proporcionada por la Alcaldía.
* Los usuarios tienen conocimientos básicos de informática.
* El desarrollo sigue un **calendario académico universitario**.

### Supuestos Funcionales

* Un jugador solo puede pertenecer a un equipo por torneo.
* Un partido se juega en una única cancha en fecha y hora definidas.
* Un árbitro puede dirigir múltiples partidos, pero no más de uno por franja horaria.
* Los equipos pueden participar en varios torneos, pero solo una vez por torneo.
* La base de datos soporta **torneos simultáneos** sin mezcla de datos.
* Uso interno: administradores, entrenadores y jugadores (sin acceso público).

### Supuestos Técnicos

* Base de datos en **MariaDB o PostgreSQL** bajo entorno **Linux virtualizado**.
* Cumplimiento de **3FN** e integridad referencial.
* Arquitectura **cliente-servidor simple** accesible por navegador.
* No incluye integración con sistemas externos (pagos, redes sociales, etc.).

---

## 🧩 Tecnologías Utilizadas

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js / Express (o framework web definido en el curso)
* **Base de Datos:** MariaDB / PostgreSQL
* **Entorno:** Linux virtualizado
* **Control de versiones:** Git y GitHub

---

## 🧠 Resultados Esperados

* Base de datos relacional completa y documentada.
* Aplicación web funcional conectada a la base de datos.
* Documentación técnica y diccionario de datos.
* Video demostrativo del sistema.
* Repositorio GitHub con participación de todos los integrantes.

---

## 🚀 Instalación y Ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/nikotpab/BogotaCup.git
   cd BogotaCup
   ```

2. Configurar la base de datos en **MariaDB o PostgreSQL** según el script SQL incluido.

3. Instalar dependencias (si aplica):

   ```bash
   npm install
   ```

4. Iniciar el servidor:

   ```bash
   npm start
   ```

5. Acceder desde el navegador:

   ```
   http://localhost:3000
   ```

---

## 👥 Autores

Proyecto desarrollado por Nicolas Barbosa, Laura Tao, Camyla Poveda, como parte de la asignatura de **Bases de Datos / Ingeniería de Sistemas**.

---

## 📜 Licencia

Este proyecto se distribuye con fines **académicos** y **no comerciales**, bajo una licencia abierta para consulta y aprendizaje.

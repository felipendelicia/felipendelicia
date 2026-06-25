---
empresa: "NUMEN"
rol: "Desarrollador y Sysadmin"
orden: 2
inicio: 2026-03-01
fin: null
tags: ["TypeScript", "NestJS", "Next.js", "Python", "Flask", "Docker", "Proxmox", "Microservicios"]
subproyectos:
  - nombre: "PuppetHub (orquestador)"
    descripcion: "Meta-repo que orquesta el ecosistema de microservicios: versiona la arquitectura, los contratos entre servicios y los punteros (submódulos git) a cada servicio. No contiene código de servicios, sino la documentación e integración del conjunto."
    stack: ["TypeScript", "Git submodules", "Docker"]
  - nombre: "SocialHub"
    descripcion: "Sistema para coordinar equipos de operarios que gestionan múltiples identidades digitales bajo cuentas maestras: mide productividad en tiempo real, asegura el cumplimiento de cuotas de actividad por campaña y audita el impacto en la comunidad."
    stack: ["TypeScript", "NestJS", "Docker"]
  - nombre: "ConsoleHub"
    descripcion: "UI de administración del ecosistema: dashboard de métricas, grilla de módems con estado de salud, leases activos, configuración de rotación y logs. Multi-servicio desde el inicio mediante un switcher de servicios."
    stack: ["TypeScript", "Next.js", "React"]
  - nombre: "ScrapperHub"
    descripcion: "Servicio de web scraping headless: automatiza la navegación y la extracción de datos con Playwright, persistiendo los resultados en base de datos."
    stack: ["TypeScript", "Express", "Playwright", "Prisma"]
  - nombre: "BrowserHub"
    descripcion: "API de gestión de perfiles antidetect con Chrome/Camoufox; backend headless (sin panel web) para crear y orquestar sesiones de navegador aisladas."
    stack: ["TypeScript", "Express", "Camoufox"]
  - nombre: "ProxyHub"
    descripcion: "Gestión de módems Alcatel MX2 (LinkHub) con rotación automática de IP vía 3proxy; expone métricas y control en tiempo real por WebSocket."
    stack: ["Python", "Flask", "Flask-SocketIO", "3proxy"]
---

En NUMEN mi trabajo está enfocado en el desarrollo, complementado con administración de sistemas. El eje es **PuppetHub**, un ecosistema de microservicios para automatización de redes sociales, web scraping y gestión de proxies.

- **Desarrollo:** servicios backend en TypeScript (NestJS, Express) y Python (Flask), con una UI de administración en Next.js — orquestados como un meta-repo con submódulos y contratos entre servicios.
- **Servidores Linux:** instalación y operación de los sistemas en servidores virtualizados con Proxmox, empaquetados con Docker.
- **Redes:** intervención acotada.

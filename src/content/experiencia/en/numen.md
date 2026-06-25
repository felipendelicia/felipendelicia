---
empresa: "NUMEN"
rol: "Developer & Sysadmin"
orden: 2
tags: ["TypeScript", "NestJS", "Next.js", "Python", "Flask", "Docker", "Proxmox", "Microservices"]
subproyectos:
  - nombre: "PuppetHub (orchestrator)"
    descripcion: "Meta-repo that orchestrates the microservices ecosystem: it versions the architecture, the inter-service contracts and the pointers (git submodules) to each service. It holds no service code, only the documentation and integration of the whole."
    stack: ["TypeScript", "Git submodules", "Docker"]
  - nombre: "SocialHub"
    descripcion: "A system to coordinate teams of operators managing multiple digital identities under master accounts: it measures productivity in real time, enforces per-campaign activity quotas and audits community impact."
    stack: ["TypeScript", "NestJS", "Docker"]
  - nombre: "ConsoleHub"
    descripcion: "The ecosystem's admin UI: metrics dashboard, modem grid with health status, active leases, rotation settings and logs. Multi-service from the start through a service switcher."
    stack: ["TypeScript", "Next.js", "React"]
  - nombre: "ScrapperHub"
    descripcion: "Headless web scraping service: it automates browsing and data extraction with Playwright, persisting results to a database."
    stack: ["TypeScript", "Express", "Playwright", "Prisma"]
  - nombre: "BrowserHub"
    descripcion: "Antidetect browser-profile management API with Chrome/Camoufox; a headless backend (no web panel) to create and orchestrate isolated browser sessions."
    stack: ["TypeScript", "Express", "Camoufox"]
  - nombre: "ProxyHub"
    descripcion: "Management of Alcatel MX2 (LinkHub) modems with automatic IP rotation via 3proxy; it exposes real-time metrics and control over WebSocket."
    stack: ["Python", "Flask", "Flask-SocketIO", "3proxy"]
---

At NUMEN my work is focused on development, complemented by systems administration. The core is **PuppetHub**, a microservices ecosystem for social-media automation, web scraping and proxy management.

- **Development:** backend services in TypeScript (NestJS, Express) and Python (Flask), with a Next.js admin UI — orchestrated as a meta-repo with submodules and inter-service contracts.
- **Linux servers:** installing and operating the systems on Proxmox-virtualized servers, packaged with Docker.
- **Networking:** limited involvement.

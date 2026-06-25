---
empresa: "Reboot"
rol: "IT Support, Infrastructure & Development"
orden: 1
inicio: 2022-01-01
fin: 2026-03-01
tags: ["Linux", "Proxmox", "Networking", "VPN", "Active Directory", "Docker", "TypeScript"]
subproyectos:
  - nombre: "Manufacturing MES system"
    descripcion: "Monorepo for a manufacturing execution system at an industrial company: an orchestrating backend and three frontends (access, shop-floor operator and supervision), deployed on Proxmox."
    stack: ["TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "React", "Docker"]
  - nombre: "AFIP e-invoicing"
    descripcion: "A service that integrates Argentina's AFIP web services (WSAA authentication and WSFE issuance) to generate electronic invoices, handling digital certificates."
    stack: ["TypeScript", "Node.js", "AFIP WS (SOAP)"]
  - nombre: "Workshop management"
    descripcion: "Web client to manage private repair workshops, consuming an internal API; packaged with Docker."
    stack: ["TypeScript", "React", "Vite", "Docker"]
  - nombre: "Company website"
    descripcion: "The MSP's corporate site: client-side routing, SVG animations, contact form and direct WhatsApp links, SEO-optimized."
    stack: ["React", "TypeScript", "Vite"]
---

Reboot is an IT services provider (MSP) that supports and deploys technology across different client companies. My work combined infrastructure, support and custom development.

- **Networking:** switches, routers and firewalls; VLANs, VPNs, WiFi and structured cabling at client sites.
- **Linux servers:** virtualization with Proxmox and administration of Debian, Ubuntu and Gentoo — web, databases, mail and DNS, on-premise and in the cloud, with Docker containers.
- **User support:** ticket-based support, on-site and remote.
- **Deployments:** ERP, monitoring, backups, Active Directory and camera systems.

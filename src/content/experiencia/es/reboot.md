---
empresa: "Reboot"
rol: "Soporte IT, Infraestructura y Desarrollo"
orden: 1
tags: ["Linux", "Proxmox", "Networking", "VPN", "Active Directory", "Docker", "TypeScript"]
subproyectos:
  - nombre: "Sistema MES de manufactura"
    descripcion: "Monorepo de un sistema de ejecución de manufactura para una empresa industrial: backend orquestador y tres frontends (acceso, operario de planta y supervisión), desplegado en Proxmox."
    stack: ["TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "React", "Docker"]
  - nombre: "Facturación electrónica AFIP"
    descripcion: "Servicio que integra los web services de la AFIP (autenticación WSAA y emisión WSFE) para generar facturas electrónicas, con manejo de certificados digitales."
    stack: ["TypeScript", "Node.js", "AFIP WS (SOAP)"]
  - nombre: "Gestión de talleres"
    descripcion: "Cliente web para administrar talleres de atención particular, consumiendo una API interna; empaquetado con Docker."
    stack: ["TypeScript", "React", "Vite", "Docker"]
  - nombre: "Sitio institucional"
    descripcion: "Web corporativa del MSP: ruteo del lado del cliente, animaciones SVG, formulario de contacto y enlaces directos por WhatsApp, optimizada para SEO."
    stack: ["React", "TypeScript", "Vite"]
---

Reboot es un proveedor de servicios IT (MSP) que da soporte e implementa tecnología en distintas empresas cliente. Mi trabajo combinaba infraestructura, soporte y desarrollo a medida.

- **Redes:** switches, routers y firewalls; VLANs, VPNs, WiFi y cableado estructurado en sitios de clientes.
- **Servidores Linux:** virtualización con Proxmox y administración de Debian, Ubuntu y Gentoo — web, bases de datos, correo y DNS, on-premise y en la nube, con contenedores Docker.
- **Soporte a usuarios:** atención por tickets, presencial y remota.
- **Implementaciones:** ERP, monitoreo, backups, Active Directory y sistemas de cámaras.

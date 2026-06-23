---
titulo: "julssh — Conexiones en la terminal"
resumen: "TUI en Go para administrar y abrir conexiones SSH (y RDP/VNC) desde la terminal, con sync por Google Drive y self-update."
stack:
  - "Go"
  - "Bubble Tea"
  - "Lip Gloss"
  - "SSH"
  - "RDP / VNC"
  - "Google Drive API"
  - "GoReleaser"
repo: "https://github.com/felipendelicia/julssh"
destacado: true
orden: 3
fecha: 2026-05-13
terminal: true
---

**julssh** es un administrador de conexiones para la terminal: guardás tus hosts y te conectás por **SSH, RDP o VNC** sin recordar comandos. Es un **TUI** (interfaz de texto) que se navega con flechas o teclas estilo vim. *Dedicado a mi hermana Julieta.*

### Qué hace

- **Gestión de conexiones:** nombre, host, usuario, puerto, clave privada, descripción y tags. CRUD completo con confirmación al borrar.
- **Navegación rápida:** `↑/↓` o `j/k`, abrir con `Enter`, **filtro en vivo** por cualquier campo con `/`.
- **Conexión transparente:** al conectar (`c`), el TUI se suspende, **SSH/RDP/VNC toma la terminal**, y al salir volvés a julssh.
- **Sync por Google Drive:** respaldás y sincronizás tus conexiones entre máquinas.
- **Self-update:** se actualiza solo desde los GitHub Releases.

### Cómo está hecho

- **Go** con **[Bubble Tea](https://github.com/charmbracelet/bubbletea)** (arquitectura Elm) y **[Lip Gloss](https://github.com/charmbracelet/lipgloss)** para el estilado del TUI.
- **Distribución cuidada:** binario único, script de instalación, paquete **`.deb`** y releases automatizados con **GoReleaser**.
- Conexiones guardadas en `~/.config/julssh/connections.json`. Tests con el toolchain de Go.

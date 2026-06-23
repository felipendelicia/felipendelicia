---
titulo: "julssh — Connections in the terminal"
resumen: "A Go TUI to manage and open SSH (plus RDP/VNC) connections from the terminal, with Google Drive sync and self-update."
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

**julssh** is a terminal connection manager: save your hosts and connect over **SSH, RDP or VNC** without memorizing commands. It's a **TUI** (text interface) navigable with arrow keys or vim-style keys. *Dedicated to my sister Julieta.*

### What it does

- **Connection management:** name, host, user, port, private key, description and tags. Full CRUD with delete confirmation.
- **Fast navigation:** `↑/↓` or `j/k`, open with `Enter`, **live filtering** across any field with `/`.
- **Seamless connecting:** on connect (`c`), the TUI suspends, **SSH/RDP/VNC takes over the terminal**, and you return to julssh on exit.
- **Google Drive sync:** back up and sync your connections across machines.
- **Self-update:** updates itself from GitHub Releases.

### How it's built

- **Go** with **[Bubble Tea](https://github.com/charmbracelet/bubbletea)** (Elm architecture) and **[Lip Gloss](https://github.com/charmbracelet/lipgloss)** for TUI styling.
- **Careful distribution:** single binary, install script, **`.deb`** package and automated releases with **GoReleaser**.
- Connections stored in `~/.config/julssh/connections.json`. Tested with the Go toolchain.

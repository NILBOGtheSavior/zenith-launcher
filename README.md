# Zenith Launcher

A custom launcher for the Zenith Home Server. Built to run on Raspberry Pi 5 with [Zenith configuration]().

## Application overview

### Frontend (Svelte)

A reactive single-page interface built with Svelte

### Backend (ExpressJS)

ExpressJS API handling system interactions, Docker management, and bookmark persistence.

### Database (BetterSQLite3)

The database is SQLite for a quick lightweight storage and persistence.

## Components

- [ ] Search bar
    - Searches the web using search engine of choice
    - Runs commands to control docker services, led matrix, and the homepage itself
- [ ] Docker service manager
    - Displays the currently running services as well as their status
    - Allows for addition and removal of different services, as well as start, stop, restart
- [X] Bookmarks
    - Bookmark frequently visited sites
- [ ] Reading list
    - Add articles and blogs to reading list

## Command system

Type commands directly in the search bar:
- `/restart <service name>` - Restarts a docker container
- `/matrix <mode>` - Switches the LED matrix to specific mode


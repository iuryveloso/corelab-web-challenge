# CoreNote APP

## Features

- **Note Management**, with the ability to:
    - View notes grouped by favorites and others.
    - Add notes.
    - Edit notes, including changing - their color using a color picker and marking them as favorites.
    - Search notes by title or description.
    - Filter notes by color, which can be combined with the search feature.
    - Delete notes.
    - Restore notes immediately after deletion.

- **Dynamic notifications** after each user action, showing api validations response.

- **Page responsiveness**, adapting to desktop, tablet, and mobile screens.

## Deliverables

- The application was built with **Next.js 15**, designed to be used with an API developed in **AdonisJS 6** and **MySQL 8**.

- Code was written using **ESLint** and **Prettier** for formatting and best practices, as well as **TypeScript** to streamline development.

- **Snapshot tests** were performed with **Jest**.

- **Docker containers** were utilized with **Docker Compose**, simplifying deployment to production.

## Installation: 

1. [Docker](https://www.docker.com/) must be installed on your system.

2. Clone the [APP](https://github.com/iuryveloso/corelab-web-challenge) repository.

3. Create a copy of the ```.env.example``` file in the app's root folder. Rename it to ```.env``` and change the necessary information.

4. Open the terminal and run the command ```docker compose up -d```.

5. Finally, open your browser and go to http://localhost:3000. Enjoy!

# PokeAPI

**Description:** A basic API for the [Tek Discord bot](https://github.com/Decaded/Tek--The-god-of-Technology-)'s Pokémon addon.

## Features

- **Local Data Storage:** Pokémon data are stored locally for faster access and independence from origin.
  - Data is sourced from [pokeapi.co](https://pokeapi.co).
- **Authentication:** Token-based authentication to access the API.
- **Rate Limiting:** Prevents abuse by limiting requests per IP.
- **Flexible Querying:** Fetch data by either `ID` or `name` from five collections: `abilities`, `berries`, `items`, `moves`, and `pokedex`.

| ⚠   | Data in this API is not ID-compliant with the [pokeapi.co](https://pokeapi.co) and was curated to fit our needs.                                                                                                |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚠   | If you wish to use API hosted by us, you can visit the [Kronos Writing Emporium Discord server](https://discord.gg/TeV3KB8Ueh) and ask [Decaded](https://discord.com/users/279023947058511873) for the API key. |

## Endpoints

- **GET /PokeAPI/**  
  Displays the welcome message and instructions for using the API.

- **GET `/PokeAPI/{collection}/{query}`**  
  Fetches data from a specified `collection`, filtered by either `ID` or `name`.
  - Example: `/PokeAPI/abilities/stench` or `/PokeAPI/abilities/1`
  - The valid `collections` are:
    - `abilities`
    - `berries`
    - `items`
    - `moves`
    - `pokedex`

## Authentication

This API requires an API key for access. Pass your API key as an `Authorization` header in your requests.

Example:

```bash
Authorization: SuperSecureToken
```

## Rate Limiting

To prevent abuse, the API is rate-limited to 100 requests per IP every 15 minutes. If the limit is exceeded, you will receive the following error:

```json
{
 "error": "Too many requests, please try again later."
}
```

## Environment Variables

- **PORT:** The port number for the API to listen on.
- **API_KEY:** The API key required for authentication.

## Dependencies

- [express](https://expressjs.com/): Web framework for Node.js.
- [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit): Rate limiting middleware for Express.
- [dotenv](https://github.com/motdotla/dotenv): Loads environment variables from a `.env` file.
- [@decaded/nyadb](https://github.com/Decaded/NyaDB): A simple JSON 'database' for Node.js.

## Installation

1. Clone the repository and navigate to the project directory.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file in the root directory and set the environment variables. See [.env.example](.env.example) for reference.
4. Run `npm start` to start the API.

The API will be accessible at `http://localhost:{PORT}/PokeAPI`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Funding

If you find this project helpful, consider supporting my work by buying me a coffee.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/decaded)

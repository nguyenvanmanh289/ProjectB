# BACKEND SoundEffect

a server backend created by nodejs express with resful Api

## Requirements

-   node ~ v18.19.0
-   npm ~ v10.2.3

## Usage

1. Clone project open folder with vscode or other code editor different
2. Create `.env` file in root folder, copy content from `.env.example` file  to `.env` file and config in `.env`:

#config env file
-   Config Runtime Environment

```bash
# development or production in .env file
HOST=localhost
PORT=4000
```

-   Config Project

```bash
# server domain name
PORT=4000
HOST=localhost
# primary client domain name
APP_URL_CLIENT=http://localhost:3000

# primary secret key
SECRET_KEY_ADMIN = MANH@
SECRET_KEY_USER = MANH@1

# TOKEN time limit Eg: 60, 10h, 7d
TOKEN_EXP = "7d"
# maximum number of requests per minute
LIMITREQUEST = 100
```

-   Config MongoDb Database

```bash
# typing your string connected to MongoDB driver
MONGODB_URI = "mongodb+srv://vm28dev:<password>@database.d6k7iot.mongodb.net/?retryWrites=true&w=majority&appName=DATABASE"

#typing your database password 
MONGODB_PASS = "password"
```

- Config Email folow me
   or typing your email
```bash 
    MAIL_SERVICE = "vm28.dev@gmail.com"  
    MAIL_PASSWORD = 
```

3. Install package & setup typing in command line in root folder:
 
    `npm install`


4. Initialize data (Required for new database)


> Note: By default we will use [this account](#default-account) as the **Super Admin**.
> If you want to change it, please set two environment variables **SUPER_ADMIN_EMAIL** and **SUPER_ADMIN_PASSWORD**.
>
> -   in .env file setup
>     ```bash
>     MAIL_SERVICE = "vm28.dev@gmail.com"
>     ADMIN_USERNAME = "admin28"
>     ADMIN_PASSWORD = "admin28"
>    -
typing in command line in root folder
`npm run seed` 


5. Runs the app in command line in root folder

      `npm run start`


##### Default account

```yaml
Email: ""
Password: ""
```

## Credits

[ManhTY]().

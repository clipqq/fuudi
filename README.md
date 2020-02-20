# Fuudi Server

-   [LIVE:] https://fuudi-app.clipqq.now.sh/

# What is Fuudi?

Buvie is a platform where users can create menus of their favorite foods and let other users rate them!

## Technology Stack

### Backend

-   **Express** for handling API requests
-   **Node** for interacting with the file system
-   **Knex.js** for interfacing with the **PostgreSQL** database
-   **Postgrator** for database migration
-   **Mocha**, **Chai**, **Supertest** for endpoints testing
-   **JSON Web Token**, **bcryptjs** for user authentication / authorization

## Setting Up

-   Install dependencies: `npm install`
-   Create development and test databases: `createdb fuudi`, `createdb fuudi-test`
-   Create database user: `createuser fuudi`
-   Grant privileges to new user in `psql`:
    -   `GRANT ALL PRIVILEGES ON DATABASE "fuudi" TO "fuudi";`
    -   `GRANT ALL PRIVILEGES ON DATABASE "fuudi_test" TO "fuudi";`
-   Prepare environment file: `cp example.env .env`
-   Replace values in `.env` with your custom values.
-   Bootstrap development database: `npm run migrate`
-   Bootstrap test database: `npm run migrate:test`

### Configuring Postgres

For tests involving time to run properly, your Postgres database must be configured to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
    - OS X, Homebrew: `/usr/local/var/postgres/postgresql.conf`
2. Uncomment the `timezone` line and set it to `UTC` as follows:

```
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Sample Data

-   To seed the database for development: `psql -U fuudi -d fuudi -a -f seeds/seed.fuudi_tables.sql`
-   To clear seed data: `psql -U fuudi -d fuudi -a -f seeds/trunc.fuudi_tables.sql`
-   To seed Heroku with data (replace postgres URL with your Heroku URI): `psql -U fuudi -d postgres://iqpzikvfsrsnfr:c1c8fefb99f01d28085e5d1fe24f9392c48052cce73e518489931cfccecfc118@ec2-174-129-33-97.compute-1.amazonaws.com:5432/d4k8437n9fg1ah -a -f seeds/seed.fuudi_tables.sql`

## Scripts

-   Start application for development: `npm run dev`
-   Run tests: `npm test`

## Open Endpoints

Open endpoints require no Authentication.

-   `GET /menu`
-   `GET /menu`
-   `POST /create-meal`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view.

-   `POST /create-meal`
-   `GET /menu/:menu_item_id`
-   `GET /menu/:menu_item_id/reviews/`
-   `GET /menu/:id`

### User

**URL** : `/register`
**Method** : `POST`
**Auth required** : NO

#### Success Response

**Code** : `201 CREATED`

**URL** : `/login`
**Method** : `POST`
**Auth required** : YES

#### Success Response

**Code** : `304 NOT MODIFIED`

**URL** : `/logout`
**Method** : `GET`
**Auth required** : NO

#### Success Response

**Code** : `304 NOT MODIFIED`

### Menu

**URL** : `/menu`
**Method** : `GET`
**Auth required** : YES

#### Success Response

**Code** : `200 OK`
**Content examples**

````json
{
        "id": 3,
        "title": "Indian Tandoori Chicken",
        "description": "Straight from my mom's kitchen. Free naan with every order.",
        "date_created": "2019-12-02T18:36:02.707Z",
        "image": "https://twosleevers.com/wp-content/uploads/2017/12/Tandoori-Chicken-Wide-500x500.jpg",
        "user": {
            "id": 3,
            "user_name": "c.bloggs",
            "full_name": "Charlie Bloggs",
            "nickname": "Charlie",
            "date_created": "2020-01-30T21:14:17.788Z"
        },
        "number_of_reviews": 0,
        "average_review_rating": 0
    },
````

**URL** : `/menu/:id`
**Method** : `GET`
**Auth required** : YES

#### Success Response

**Code** : `200 OK`

## Features In-Progress

1. DONE -- Require Auth on `/create-meal` endpoint
2. Redirect user to Reviews page upon successful creation of new meal
3. Make `Order Meal` button on Menu Reviews page
4. Hook up button to server-side function that inserts `menu_item_id` to user's order in `fuudi_orders`
5. Make Cart page that displays Menu Items for the user that is logged in
6. Make Delete button on user's order page
7. Hook up Delete button to server-side function that deletes by `menu_item_id` in `fuudi_orders`

## Known Bugs

- FIXED -- ID was hardcoded in seed instead of auto serialized -- New meal creation broken, error on ID not being unique
- Reviews not sorted oldest to newest
- Client-side error doesn't clear on page reload: `There was an error! Oh no!`
````

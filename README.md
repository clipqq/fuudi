# Fuudi Server

## Setting Up

- Install dependencies: `npm install`
- Create development and test databases: `createdb fuudi`, `createdb fuudi-test`
- Create database user: `createuser fuudi`
- Grant privileges to new user in `psql`:
  - `GRANT ALL PRIVILEGES ON DATABASE "fuudi" TO "fuudi";`
  - `GRANT ALL PRIVILEGES ON DATABASE "fuudi_test" TO "fuudi";`
- Prepare environment file: `cp example.env .env`
- Replace values in `.env` with your custom values.
- Bootstrap development database: `npm run migrate`
- Bootstrap test database: `npm run migrate:test`

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

- To seed the database for development: `psql -U fuudi -d fuudi -a -f seeds/seed.fuudi_tables.sql`
- To clear seed data: `psql -U fuudi -d fuudi -a -f seeds/trunc.fuudi_tables.sql`
- To seed Heroku with data (replace postgres URL with your Heroku URI): `psql -U fuudi -d postgres://iqpzikvfsrsnfr:c1c8fefb99f01d28085e5d1fe24f9392c48052cce73e518489931cfccecfc118@ec2-174-129-33-97.compute-1.amazonaws.com:5432/d4k8437n9fg1ah -a -f seeds/seed.fuudi_tables.sql`

## Scripts

- Start application for development: `npm run dev`
- Run tests: `npm test`

## Features In-Progress

1. DONE -- Require Auth on `/create-meal` endpoint
2. Redirect user to Reviews page upon successful creation of new meal
3. Make `Order Meal` button on Menu Reviews page
4. Hook up button to server-side function that inserts `menu_item_id` to user's order in `fuudi_orders`
5. Make Cart page that displays Menu Items for the user that is logged in
6. Make Delete button on user's order page
7. Hook up Delete button to server-side function that deletes by `menu_item_id` in `fuudi_orders`
8. 

## Known Bugs

- FIXED -- ID was hardcoded in seed instead of auto serialized -- New meal creation broken, error on ID not being unique
- Reviews not sorted oldest to newest
- Client-side error doesn't clear on page reload: `There was an error! Oh no!`

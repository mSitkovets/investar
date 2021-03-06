CREATE DATABASE investar;

CREATE TABLE users
(
   user_id SERIAL PRIMARY KEY,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   email VARCHAR(100) NOT NULL,
   password VARCHAR(100) NOT NULL,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE stocks
(
   stock_id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   numShares INT,
   boughtValue DOUBLE PRECISION,
   user_id INT REFERENCES users ON DELETE CASCADE,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE wallets
(
   wallet_id SERIAL PRIMARY KEY,
   balance DOUBLE PRECISION,
   user_id INT REFERENCES users ON DELETE CASCADE,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE portfolios
(
   portfolio_id SERIAL PRIMARY KEY,
   totalValue DOUBLE PRECISION,
   user_id INT REFERENCES users ON DELETE CASCADE,
   date DATE NOT NULL
);

-- demo user who starts with $1000 in their wallet
insert into users
   (first_name, last_name, email, password)
values
   ('demo', 'user', 'demo@gmail.com', 'password');
insert into wallets
   (balance, user_id)
values(1000, 1);
insert into portfolios
   (totalvalue, user_id, date)
values(1000, 1, '2021-01-09');
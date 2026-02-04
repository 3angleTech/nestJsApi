DROP DATABASE IF EXISTS threeangle_test;
CREATE DATABASE threeangle_test;

DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'threeangle') THEN
        CREATE ROLE threeangle WITH LOGIN PASSWORD 'threeangle';
    END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE threeangle_test TO postgres;
-- Database: routing_database

-- DROP DATABASE IF EXISTS routing_database;

CREATE DATABASE routing_database
    WITH
    OWNER = caca
    ENCODING = 'UTF8'
    LC_COLLATE = 'pt_BR.UTF-8'
    LC_CTYPE = 'pt_BR.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE routing_database TO caca;

GRANT TEMPORARY, CONNECT ON DATABASE routing_database TO PUBLIC;

-- Table: public.truck

-- DROP TABLE IF EXISTS public.truck;

CREATE TABLE IF NOT EXISTS public.truck
(
    license_plate character varying(20) COLLATE pg_catalog."default" NOT NULL,
    capacity_in_tonne integer NOT NULL,
    truck_type character varying(50) COLLATE pg_catalog."default" NOT NULL,
    fuel_consumption_L_by_KM real NOT NULL,
    CONSTRAINT truck_pkey PRIMARY KEY (license_plate)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.truck
    OWNER to caca;

-- Table: public.place

-- DROP TABLE IF EXISTS public.place;

CREATE TABLE IF NOT EXISTS public.place
(
    place_id SERIAL NOT NULL,
    city character varying(100) COLLATE pg_catalog."default" NOT NULL,
    state character varying(2) COLLATE pg_catalog."default" NOT NULL,
    latitude real,
    longitude real,
    CONSTRAINT place_pkey PRIMARY KEY (place_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.place
    OWNER to caca;

-- Table: public.delivery

-- DROP TABLE IF EXISTS public.delivery;

CREATE TABLE IF NOT EXISTS public.delivery
(
    delivery_id SERIAL NOT NULL,
    origin_id integer NOT NULL,
    destiny_id integer NOT NULL,
    load_type character varying(30) COLLATE pg_catalog."default" NOT NULL,
    weight_in_tonne integer NOT NULL,
    insertion_date DATE DEFAULT NOW(),
    CONSTRAINT delivery_pkey PRIMARY KEY (delivery_id),
    CONSTRAINT delivery_origin_id_fkey FOREIGN KEY (origin_id)
        REFERENCES public.place (place_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.delivery
    OWNER to caca;
CREATE TABLE IF NOT EXISTS public.dataset
(
    id serial NOT NULL ,
    station character varying ,
    dd character varying ,
    hh double precision,
    mm double precision,
    ts timestamp without time zone,
    de double precision,
    dn double precision,
    dh double precision,
    status integer,
    remark character varying ,
    CONSTRAINT dataset_pkey PRIMARY KEY (id)
);

CREATE TABLE user_tb (
	gid serial not null,
    userid text,
	username text,
	email text,
	dt timestamp without time zone,
    CONSTRAINT user_tb_pkey PRIMARY KEY (gid)
)
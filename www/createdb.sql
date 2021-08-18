CREATE TABLE IF NOT EXISTS public.dataset
(
    id serial NOT NULL ,
    stat_code character varying ,
    stat_name character varying ,
    x_coor double precision,
    y_coor double precision,
    elev double precision,
    ts timestamp without time zone,
    diff double precision,
    status integer,
    com_status character varying ,
    CONSTRAINT dataset_pkey PRIMARY KEY (id)
)
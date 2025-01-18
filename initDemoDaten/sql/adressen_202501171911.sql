CREATE TABLE IF NOT EXISTS public.adressen (
  id SERIAL PRIMARY KEY,
    strasse VARCHAR(100) NOT NULL,
    ort VARCHAR(100) NOT NULL,
    plz VARCHAR(10) NOT NULL
);
INSERT INTO public.adressen (strasse,ort,plz) VALUES
	 ('bebelstr 22','Worms',67549),
	 ('kirchgasse 18','kandel',76870),
	 ('kirchgasse 18','kandel',76870);


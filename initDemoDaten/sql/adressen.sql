CREATE TABLE IF NOT EXISTS public.adressen (
  id SERIAL PRIMARY KEY,
    strasse VARCHAR(100),
    ort VARCHAR(100) ,
    plz VARCHAR(10) 
);
INSERT INTO public.adressen (strasse,ort,plz) VALUES
	  ('Beben 33','Worms','57443');

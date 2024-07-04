CREATE TABLE "barrio" (
	"id" SERIAL PRIMARY KEY,
	"nombre" VARCHAR NOT NULL
);

CREATE TABLE "vecino" (
	"documento" VARCHAR NOT NULL PRIMARY KEY,
	"nombre" VARCHAR NOT NULL,
	"apellido" VARCHAR NOT NULL,
	"direccion" VARCHAR NOT NULL,
	"barrioId" INTEGER,
	CONSTRAINT "FK__barrio" FOREIGN KEY ("barrioId") 
			REFERENCES "barrio" ("id") ON DELETE SET NULL
);

CREATE TABLE "sitio" (
	"id" SERIAL PRIMARY KEY,
	"latitud" NUMERIC,
	"longitud" NUMERIC,
	"calle" VARCHAR,
	"numero" INTEGER,
	"entreCalleA" VARCHAR,
	"entreCalleB" VARCHAR,
	"descripcion" VARCHAR NOT NULL,
	"aCargoDe" VARCHAR NOT NULL,
	"apertura" TIME NOT NULL,
	"cierre" TIME NOT NULL,
	"comentarios" TEXT
);

CREATE TABLE "rubro" (
	"id" SERIAL PRIMARY KEY,
	"descripcion" VARCHAR NOT NULL
);

CREATE TABLE "desperfecto" (
	"id" SERIAL PRIMARY KEY,
	"descripcion" VARCHAR NOT NULL,
	"rubroId" INTEGER NOT NULL,
	CONSTRAINT "FK__rubro" FOREIGN KEY ("rubroId") 
			REFERENCES "rubro" ("id") ON DELETE SET NULL
);

CREATE TABLE "reclamo" (
	"id" SERIAL PRIMARY KEY,
	"documento" VARCHAR NOT NULL,
	"sitioId" INTEGER NOT NULL,
	"desperfectoId" INTEGER NOT NULL,
	"descripcion" VARCHAR,
	"estado" VARCHAR,
	"reclamoUnificadoId" INTEGER,
	CONSTRAINT "FK__vecino" FOREIGN KEY ("documento") 
			REFERENCES "vecino" ("documento") ON DELETE CASCADE,
	CONSTRAINT "FK__sitio" FOREIGN KEY ("sitioId") 
			REFERENCES "sitio" ("id") ON DELETE CASCADE,
	CONSTRAINT "FK__desperfecto" FOREIGN KEY ("desperfectoId") 
			REFERENCES "desperfecto" ("id") ON DELETE CASCADE,
	CONSTRAINT "FK__reclamo" FOREIGN KEY ("reclamoUnificadoId") 
			REFERENCES "reclamo" ("id") ON DELETE SET NULL
);

CREATE TABLE "movimientoReclamo" (
	"id" SERIAL PRIMARY KEY,
	"reclamoId" INTEGER NOT NULL,
	"responsable" VARCHAR NOT NULL,
	"causa" VARCHAR NOT NULL,
	"fecha" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
	CONSTRAINT "FK__reclamo" FOREIGN KEY ("reclamoId") 
			REFERENCES "reclamo" ("id") ON DELETE CASCADE
);

CREATE TABLE "denuncia" (
	"id" SERIAL PRIMARY KEY,
	"documento" VARCHAR NOT NULL,
	"sitioId" INTEGER,
	"descripcion" VARCHAR,
	"estado" VARCHAR,
	"aceptaResponsabilidad" BOOLEAN NOT NULL DEFAULT TRUE,
	CONSTRAINT "FK__vecino" FOREIGN KEY ("documento") 
			REFERENCES "vecino" ("documento") ON DELETE CASCADE,
	CONSTRAINT "FK__sitio" FOREIGN KEY ("sitioId") 
			REFERENCES "sitio" ("id") ON DELETE SET NULL
);

CREATE TABLE "movimientoDenuncia" (
	"id" SERIAL PRIMARY KEY,
	"denunciaId" INTEGER NOT NULL,
	"responsable" VARCHAR NOT NULL,
	"causa" VARCHAR NOT NULL,
	"fecha" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
	CONSTRAINT "FK__denuncia" FOREIGN KEY ("denunciaId") 
			REFERENCES "denuncia" ("id") ON DELETE CASCADE
);

CREATE TABLE "personal" (
	"id" SERIAL PRIMARY KEY,
	"nombre" VARCHAR NOT NULL,
	"apellido" VARCHAR NOT NULL,
	"documento" VARCHAR NOT NULL UNIQUE,
	"password" VARCHAR NOT NULL,
	"rubroId" INTEGER NOT NULL,
	"categoria" INTEGER,
	"fechaIngreso" DATE,
	CONSTRAINT "FK__rubro" FOREIGN KEY ("rubroId") 
			REFERENCES "rubro" ("id") ON DELETE CASCADE
);

CREATE TABLE "categoria" (
	"id" SERIAL PRIMARY KEY,
	"nombre" VARCHAR NOT NULL,
	"imagen" VARCHAR
);

CREATE TABLE "comercio" (
	"id" SERIAL PRIMARY KEY,
	"documento" VARCHAR NOT NULL,
	"nombre" VARCHAR NOT NULL,
	"telefono" VARCHAR,
	"imagenes" TEXT[],
	"fechaIngreso" TIME NULL,
	"verificado" BOOLEAN NOT NULL DEFAULT FALSE,
	"categoriaId" INTEGER,
	"rubroId" INTEGER NOT NULL,
	"sitioId" INTEGER NOT NULL,
	CONSTRAINT "FK__categoria" FOREIGN KEY ("categoriaId") 
			REFERENCES "categoria" ("id") ON DELETE RESTRICT,
	CONSTRAINT "FK__rubro" FOREIGN KEY ("rubroId") 
			REFERENCES "rubro" ("id") ON DELETE CASCADE,
	CONSTRAINT "FK_comercio_sitio" FOREIGN KEY ("sitioId") 
			REFERENCES "sitio" ("id") ON DELETE CASCADE,
	CONSTRAINT "FK_comercio_vecino" FOREIGN KEY ("documento") 
			REFERENCES "vecino" ("documento") ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE "oferta" (
	"id" SERIAL PRIMARY KEY,
	"comercioId" INTEGER NOT NULL,
	"titulo" VARCHAR NOT NULL,
	"descripcion" VARCHAR,
	"verificado" BOOLEAN NOT NULL DEFAULT FALSE,
	CONSTRAINT "FK_comercio" FOREIGN KEY ("comercioId") 
			REFERENCES "comercio" ("id") ON DELETE CASCADE
);

ALTER TABLE "comercio" DROP COLUMN "fechaIngreso";
ALTER TABLE "comercio" ADD COLUMN "fechaIngreso" TIMESTAMP NULL;
ALTER TABLE "vecino" ADD "verificado" BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE "vecino" ADD "password" VARCHAR NULL;

-- * INSERTS

INSERT INTO barrio (nombre) VALUES ('Agronomía'), ('Almagro'), ('Balvanera'), ('Barracas'), ('Belgrano'), ('Boedo'), 
('Caballito'), ('Chacarita'), ('Coghlan'), ('Colegiales'), ('Constitución'), ('Flores'), ('Floresta'), ('La Boca'), 
('La Paternal'), ('Liniers'), ('Mataderos'), ('Monserrat'), ('Monte Castro'), ('Nueva Pompeya'), ('Núñez'), ('Palermo'),
('Parque Avellaneda'), ('Parque Chacabuco'), ('Parque Chas'), ('Parque Patricios'), ('Puerto Madero'), ('Recoleta'), 
('Retiro'), ('Saavedra'), ('San Cristóbal'), ('San Nicolás'), ('San Telmo'), ('Vélez Sársfield'), ('Versalles'), 
('Villa Crespo'), ('Villa del Parque'), ('Villa Devoto'), ('Villa Gral. Mitre'), ('Villa Lugano'), ('Villa Luro'), 
('Villa Ortúzar'), ('Villa Pueyrredón'), ('Villa Real'), ('Villa Riachuelo'), ('Villa Santa Rita'), ('Villa Soldati'), 
('Villa Urquiza');

INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI29103985', 'Vega', 'Cesar  Omar', '24 Anthes Trail', 3);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI29104008', 'Zarate', 'Cristian  German', '702 Drewry Court', 6);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI29127715', 'Ibañez', 'Dario  Esteban', '60 Birchwood Avenue', 2);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28000046', 'Lagos', 'Andres  Leopoldo', '1 Roth Terrace', 4);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28000075', 'Rodriguez', 'Oscar  Alberto', '37409 Lillian Place', 5);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28000185', 'Ibañez', 'Raul  Alberto', '1523 Del Mar Park', 3);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28000388', 'Ruiz diaz', 'Roberto  Carlos', '8399 Charing Cross Junction', 2);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28000429', 'Ramirez', 'Julio  Oscar', '6443 Badeau Plaza', 6);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28000793', 'Moreyra', 'Leandro  Omar', '1704 Ludington Lane', 7);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28001270', 'Sanchez', 'Daniel  Esteban', '285 Spohn Street', 7);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28001275', 'Gimenez', 'Dario  Osvaldo', '34364 Artisan Road', 9);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28001586', 'Barraza', 'Milton  Silvestre', '53 Ilene Place', 5);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28002032', 'Gaitan', 'Adrian  Maximiliano', '71 Mockingbird Hill', 8);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28002509', 'Alegre', 'Gustavo  Fabian', '7 Dapin Junction', 7);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28002514', 'Visconti', 'Omar  Federico', '0266 Orin Parkway', 5);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28002569', 'Alderete', 'Emilio  Alberto', '3035 Calypso Place', 3);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28003227', 'Carcamo', 'Anibal  David', '6 Glendale Junction', 7);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28003899', 'Baigorria', 'Carlos  David', '5 Norway Maple Point', 3);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28003939', 'Perez', 'Pablo  Abel', '77082 Bayside Alley', 6);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28004289', 'Ponce', 'Carlos  Rodrigo', '3 Hoepker Trail', 6);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28004647', 'Sandoval', 'Carlos  Reinaldo', '40 Hoffman Circle', 4);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28005063', 'Vargas', 'Eduardo  Daniel', '644 Kim Circle', 4);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28005358', 'Guajardo', 'Raul  Eduardo', '0887 Village Green Parkway', 4);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28005394', 'Tinto gimenez', 'Fernando', '7 Fisk Plaza', 4);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28005556', 'Mercado', 'Marcelo  Alberto', '8874 Meadow Ridge Trail', 3);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28005826', 'Paez', 'Rodolfo  Javier', '5771 Rutledge Junction', 3);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28006119', 'Gonzalez', 'Jorge  Fernando', '18158 Del Sol Pass', 4);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28006364', 'Romero', 'Alberto  Orlando', '38 Schmedeman Way', 2);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28006406', 'Cardozo', 'Hugo  Oscar', '879 Village Green Circle', 4);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28006433', 'Guzman', 'Sergio  Ariel', '530 Myrtle Center', 6);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28006802', 'Ortiz', 'Alberto  Ramon', '596 Delladonna Pass', 4);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28007461', 'Robledo', 'Cesar  Gustavo', '2 Bartillon Point', 4);
INSERT INTO vecino ("documento", "nombre", "apellido", "direccion", "barrioId") VALUES ('DNI28008019', 'Aap', 'Marcos  Daniel', '3 Sunnyside Place', 5);

INSERT INTO categoria (nombre, imagen) VALUES
	('Supermercado', NULL),
	('Panadería', NULL),
	('Carnicería', NULL),
	('Verdulería', NULL),
	('Librería', NULL),
	('Ropa', NULL),
	('Juguetería', NULL),
	('Electrodomésticos', NULL),
	('Farmacia', NULL),
	('Bazar', NULL),
	('Peluquería', NULL),
	('Ferretería', NULL),
	('Zapatería', NULL),
	('Joyería', NULL),
	('Perfumería', NULL),
	('Papelería', NULL),
	('Tienda de mascotas', NULL),
	('Café', NULL),
	('Restaurante', NULL),
	('Librería de segunda mano', NULL),
	('Limpieza', NULL),
	('Carpintería', NULL),
	('Mecánica', NULL),
	('Plomería', NULL),
	('Electricidad', NULL),
	('Jardinería', NULL),
	('Albañilería', NULL),
	('Servicios legales', NULL),
	('Contabilidad', NULL),
	('Consultoría', NULL),
	('Reparación de electrodomésticos', NULL),
	('Diseño gráfico', NULL),
	('Fotografía', NULL),
	('Asesoría de empresas', NULL),
	('Mudanzas', NULL),
	('Clínica dental', NULL),
	('Servicios de traducción', NULL),
	('Mantenimiento de computadoras', NULL),
	('Clases particulares', NULL),
	('Entrenamiento personal', NULL),
	('Servicios de catering', NULL);

INSERT INTO rubro (descripcion) VALUES
	('Alimentos y Bebidas'),         -- Supermercado
	('Panadería'),                   -- Panadería
	('Carnes'),                      -- Carnicería
	('Verduras y Frutas'),          -- Verdulería
	('Libros y Papelería'),         -- Librería
	('Ropa y Accesorios'),          -- Ropa
	('Juguetes'),                    -- Juguetería
	('Electrodomésticos y Tecnología'), -- Electrodomésticos
	('Medicamentos y Salud'),       -- Farmacia
	('Artículos para el Hogar'),    -- Bazar
	('Cortes de Cabello y Estética'), -- Peluquería
	('Herramientas y Ferretería'),  -- Ferretería
	('Calzado'),                    -- Zapatería
	('Joyas y Relojes'),            -- Joyería
	('Perfumes y Cosméticos'),     -- Perfumería
	('Material de Oficina'),       -- Papelería
	('Productos para Mascotas'),   -- Tienda de mascotas
	('Bebidas y Comida Rápida'),    -- Café
	('Comida Gourmet y Restaurante'), -- Restaurante
	('Libros de Segunda Mano'),    -- Librería de segunda mano
	('Servicios de Limpieza'),     -- Limpieza
	('Servicios de Carpintería'),  -- Carpintería
	('Servicios de Mecánica'),     -- Mecánica
	('Servicios de Plomería'),     -- Plomería
	('Servicios Eléctricos'),      -- Electricidad
	('Jardinería y Paisajismo'),   -- Jardinería
	('Construcción y Reparaciones'), -- Albañilería
	('Asesoría Legal'),            -- Servicios legales
	('Contabilidad y Finanzas'),  -- Contabilidad
	('Consultoría Empresarial'),  -- Consultoría
	('Reparaciones del Hogar'),   -- Reparación de electrodomésticos
	('Diseño y Publicidad'),      -- Diseño gráfico
	('Fotografía Profesional'),   -- Fotografía
	('Asesoría Empresarial'),     -- Asesoría de empresas
	('Servicios de Mudanza'),     -- Mudanzas
	('Cuidado Dental'),          -- Clínica dental
	('Traducción de Documentos'), -- Servicios de traducción
	('Soporte Técnico de Computadoras'), -- Mantenimiento de computadoras
	('Educación y Tutores'),      -- Clases particulares
	('Entrenamiento Físico'),     -- Entrenamiento personal
	('Eventos y Catering'),      -- Servicios de catering
	('Servicios de Eventos'),    -- Servicios de catering (general)
	('Salud y Bienestar'),       -- Generalizado para rubros de servicios de salud
	('Terapias y Bienestar'),    -- Generalizado para rubros de servicios de salud
	('Turismo y Viajes');        -- Generalizado para rubros de turismo

INSERT INTO sitio (latitud, longitud, calle, numero, "entreCalleA", "entreCalleB", descripcion, "aCargoDe", apertura, cierre, comentarios) VALUES
(40.712776, -74.005974, 'Broadway', 123, 'Spring St', 'Prince St', 'Tienda de Electrodomésticos', 'ElectroTech', '09:00:00', '18:00:00', 'Venta de electrodomésticos y tecnología.'),
(34.052235, -118.243683, 'Main St', 456, '5th St', '6th St', 'Librería y Papelería', 'LibroPlus', '10:00:00', '19:00:00', 'Venta de libros, papelería y artículos de oficina.'),
(37.774929, -122.419418, 'Market St', 789, '4th St', '5th St', 'Panadería Gourmet', 'Panadería Bella', '07:00:00', '20:00:00', 'Panadería con productos artesanales.'),
(41.878113, -87.629799, 'State St', 321, 'Wacker Dr', 'Adams St', 'Carnicería Premium', 'Carnes de Chicago', '08:00:00', '17:00:00', 'Carnes de alta calidad.'),
(29.760427, -95.369804, 'Houston St', 654, 'Main St', 'Walker St', 'Verdulería Fresca', 'Frutas y Verduras Houston', '08:00:00', '16:00:00', 'Venta de frutas y verduras frescas.'),
(39.099727, -94.578568, 'Kansas Ave', 987, '12th St', '13th St', 'Juguetería Divertida', 'Juguetes Kids', '10:00:00', '18:00:00', 'Tienda de juguetes para todas las edades.'),
(36.162664, -86.781602, 'Nashville Ave', 1234, 'Broadway', '2nd Ave', 'Zapatería de Moda', 'Zapatos Nashville', '09:00:00', '18:00:00', 'Calzado de moda para todas las edades.'),
(32.776665, -96.796989, 'Dallas Rd', 567, 'Elm St', 'Main St', 'Farmacia Saludable', 'Farmacia Dallas', '08:00:00', '20:00:00', 'Medicamentos y productos de salud.'),
(47.606209, -122.332069, 'Seattle St', 234, '4th Ave', '5th Ave', 'Bazar del Hogar', 'Todo en Casa', '10:00:00', '19:00:00', 'Artículos para el hogar y más.'),
(40.730610, -73.935242, '2nd Ave', 456, 'E 14th St', 'E 15th St', 'Peluquería Estilo', 'Estilo NYC', '10:00:00', '19:00:00', 'Servicios de corte y estilización de cabello.'),
(34.052235, -118.243683, 'Sunset Blvd', 789, 'La Brea Ave', 'Melrose Ave', 'Ferretería El Riel', 'Ferretería Sunset', '09:00:00', '17:00:00', 'Herramientas y productos de ferretería.'),
(38.895111, -77.036367, 'Pennsylvania Ave', 135, '7th St', '8th St', 'Joyería Exclusiva', 'Joyas DC', '11:00:00', '19:00:00', 'Joyería fina y relojes de lujo.'),
(39.099727, -94.578568, 'Grand Blvd', 246, '14th St', '15th St', 'Perfumería y Cosméticos', 'Perfumes & Más', '10:00:00', '19:00:00', 'Perfumes y productos cosméticos.'),
(35.689487, 139.691711, 'Tokyo St', 345, 'Shibuya', 'Shinjuku', 'Papelería Mundial', 'Paper World', '09:00:00', '18:00:00', 'Papelería y artículos de oficina.'),
(51.507351, -0.127758, 'Oxford St', 678, 'Regent St', 'Bond St', 'Tienda de Mascotas', 'Pet London', '09:00:00', '19:00:00', 'Productos y accesorios para mascotas.'),
(48.856613, 2.352222, 'Champs-Elysées', 910, 'Avenue Montaigne', 'Rue de Rivoli', 'Café Gourmet', 'Café Parisien', '08:00:00', '22:00:00', 'Café con comida gourmet y bebidas.'),
(40.730610, -73.935242, 'Broadway', 112, 'E 16th St', 'E 17th St', 'Restaurante Italiano', 'La Dolce Vita', '12:00:00', '23:00:00', 'Restaurante italiano con menú gourmet.'),
(34.052235, -118.243683, 'Hollywood Blvd', 1234, 'Vine St', 'Highland Ave', 'Librería de Segunda Mano', 'Libros Vintage', '11:00:00', '18:00:00', 'Libros de segunda mano y coleccionables.'),
(37.774929, -122.419418, 'Union Square', 567, 'Geary St', 'Post St', 'Servicios de Limpieza', 'Limpieza SF', '08:00:00', '17:00:00', 'Servicios de limpieza profesional.'),
(41.878113, -87.629799, 'Michigan Ave', 890, 'Harrison St', 'Roosevelt Rd', 'Servicios de Carpintería', 'Carpintería Chicago', '09:00:00', '18:00:00', 'Servicios de carpintería y reparación.'),
(29.760427, -95.369804, 'Galleria', 123, 'Westheimer Rd', 'Richmond Ave', 'Servicios de Mecánica', 'Mecánica Houston', '08:00:00', '17:00:00', 'Servicios de reparación de vehículos.'),
(39.099727, -94.578568, 'Country Club Plaza', 234, 'Ward Pkwy', 'Rosedale', 'Servicios de Plomería', 'Plomería KC', '09:00:00', '18:00:00', 'Servicios de plomería profesional.'),
(36.162664, -86.781602, 'Music Row', 345, 'Demonbreun St', 'Wedgewood Ave', 'Servicios Eléctricos', 'Electricidad Nashville', '09:00:00', '17:00:00', 'Servicios de instalación y reparación eléctrica.');

INSERT INTO comercio (documento, nombre, telefono, imagenes, "fechaIngreso", verificado, "categoriaId", "rubroId", "sitioId") VALUES
('DNI29103985', 'ElectroTech', '555-1234', NULL, '2018-08-19', TRUE, 8, 1, 1),
('DNI29104008', 'LibroPlus', '555-5678', NULL, '2016-08-19', TRUE, 2, 17, 2),
('DNI29127715', 'Panadería Bella', '555-8765', NULL, '2015-02-19', TRUE, 1, 3, 3),
('DNI28000046', 'Carnes de Chicago', '555-4321', NULL, '2020-07-19', TRUE, 1, 4, 4),
('DNI28000075', 'Frutas y Verduras Houston', '555-6789', NULL, '2019-07-19', TRUE, 4, 5, 5),
('DNI28000185', 'Juguetes Kids', '555-9876', NULL, '2020-12-19', TRUE, 7, 6, 6),
('DNI28000388', 'Zapatos Nashville', '555-5432', NULL, '2019-05-19', TRUE, 5, 7, 7),
('DNI28000429', 'Farmacia Dallas', '555-2109', NULL, '2019-11-19', TRUE, 9, 8, 8),
('DNI28000793', 'Todo en Casa', '555-1235', NULL, '2020-05-19', TRUE, 6, 9, 9),
('DNI28001270', 'Estilo NYC', '555-5433', NULL, '2017-10-19', TRUE, 6, 10, 10),
('DNI28001275', 'Ferretería Sunset', '555-9877', NULL, '2018-11-19', TRUE, 8, 11, 11),
('DNI28001586', 'Joyas DC', '555-6780', NULL, '2016-09-19', TRUE, 7, 12, 12),
('DNI28002032', 'Perfumes & Más', '555-8761', NULL, '2017-12-19', TRUE, 4, 13, 13),
('DNI28002509', 'Paper World', '555-4322', NULL, '2018-09-19', TRUE, 2, 14, 14),
('DNI28002514', 'Pet London', '555-9878', NULL, '2015-11-19', TRUE, 9, 15, 15),
('DNI28002569', 'Café Parisien', '555-1236', NULL, '2017-03-19', TRUE, 10, 16, 16),
('DNI28003227', 'La Dolce Vita', '555-5434', NULL, '2019-04-19', TRUE, 10, 17, 17),
('DNI28003899', 'Libros Vintage', '555-6781', NULL, '2014-11-19', TRUE, 2, 18, 18),
('DNI28003939', 'Limpieza SF', '555-9879', NULL, '2021-06-19', TRUE, 6, 19, 19),
('DNI28004289', 'Carpintería Chicago', '555-5435', NULL, '2014-11-19', TRUE, 7, 20, 20),
('DNI28004647', 'Mecánica Houston', '555-8762', NULL, '2015-02-19', TRUE, 8, 21, 21),
('DNI28005063', 'Plomería KC', '555-4323', NULL, '2015-05-19', TRUE, 9, 22, 22),
('DNI28005358', 'Jardinería Urbana', '555-6782', NULL, '2020-07-19', TRUE, 4, 24, 23),
('DNI28005394', 'Construcción y Reparaciones', '555-8763', NULL, '2019-07-19', TRUE, 4, 25, 23),
('DNI28005556', 'Asesoría Legal', '555-1237', NULL, '2020-05-19', TRUE, 2, 26, 23),
('DNI28005826', 'Contabilidad y Finanzas', '555-5436', NULL, '2017-10-19', TRUE, 8, 27, 23),
('DNI28006119', 'Consultoría Empresarial', '555-8764', NULL, '2019-04-19', TRUE, 7, 28, 23),
('DNI28006364', 'Reparaciones del Hogar', '555-4324', NULL, '2018-11-19', TRUE, 9, 29, 23),
('DNI28006406', 'Diseño y Publicidad', '555-9872', NULL, '2016-09-19', TRUE, 6, 30, 23),
('DNI28006433', 'Fotografía Profesional', '555-6783', NULL, '2017-12-19', TRUE, 7, 31, 23),
('DNI28006802', 'Asesoría Empresarial', '555-8765', NULL, '2018-09-19', TRUE, 8, 32, 23),
('DNI28007461', 'Servicios de Mudanza', '555-4325', NULL, '2015-11-19', TRUE, 4, 33, 23),
('DNI28008019', 'Cuidado Dental', '555-9873', NULL, '2017-03-19', TRUE, 2, 34, 23);

INSERT INTO personal (nombre, apellido, documento, "password", "rubroId", categoria, "fechaIngreso") VALUES
	('RAMIRO', 'RODRIGUEZ', 'DNI30012288', 'password', 1, 3, '2018-08-19'),
	('JAVIER', 'ESPINOZA', 'DNI30616697', 'password', 2, 2, '2016-08-19'),
	('JOSE', 'OLIVERA', 'DNI30667193', 'password', 3, 7, '2015-02-19'),
	('MARCELO', 'DIAZ', 'DNI30669003', 'password', 4, 8, '2020-07-19'),
	('PABLO', 'BLANCO', 'DNI30702760', 'password', 5, 6, '2019-07-19'),
	('PABLO', 'CRUZ', 'DNI30724804', 'password', 6, 4, '2020-12-19'),
	('CRISTIAN', 'MEDINA', 'DNI30732736', 'password', 7, 6, '2019-05-19'),
	('JORGE GUSTAVO', 'OLAS', 'DNI30745281', 'password', 8, 4, '2019-11-19'),
	('ADRIAN', 'BEGUET', 'DNI30780521', 'password', 9, 7, '2020-05-19'),
	('MAURICIO', 'ROMERO', 'DNI30800519', 'password', 10, 5, '2017-10-19'),
	('PABLO', 'BARRIL', 'DNI30816148', 'password', 11, 9, '2018-11-19'),
	('SERGIO', 'BAIGORRIA', 'DNI30819573', 'password', 12, 6, '2016-09-19'),
	('FACUNDO', 'GUTIERREZ', 'DNI30866787', 'password', 13, 1, '2017-12-19'),
	('MATIAS', 'GARCIA', 'DNI30868883', 'password', 14, 9, '2018-09-19'),
	('DANIEL', 'HERRERA', 'DNI30885642', 'password', 16, 9, '2015-11-19'),
	('JESUS', 'DIAZ', 'DNI30888538', 'password', 17, 8, '2017-03-19'),
	('GABRIEL', 'PETAGNA', 'DNI30912099', 'password', 18, 2, '2019-04-19'),
	('MARTIN', 'PURCHEL', 'DNI30944156', 'password', 19, 7, '2014-11-19'),
	('ALFREDO', 'RODRIGUEZ', 'DNI30952992', 'password', 15, 4, '2021-06-19'),
	('ARTURO', 'MUÑOZ', 'DNI30980277', 'password', 20, 2, '2014-11-19'),
	('SEBASTIAN', 'FERNANDEZ', 'DNI31032143', 'password', 21, 4, '2015-02-19'),
	('LEONARDO', 'GONZALEZ', 'DNI31070616', 'password', 22, 6, '2015-05-19'),
	('MAXIMILIANO', 'ALBORNOZ', 'DNI31079668', 'password', 23, 1, '2021-10-19'),
	('MARIO', 'CASTRO', 'DNI31079744', 'password', 24, 9, '2020-08-19'),
	('MARIANO', 'MOGARTE', 'DNI31156237', 'password', 25, 7, '2019-04-19'),
	('RUBEN', 'IMASAKA', 'DNI31177539', 'password', 26, 5, '2018-09-19'),
	('DIEGO', 'BARRIOS', 'DNI31189490', 'password', 27, 5, '2015-07-19'),
	('JUAN', 'CANALES', 'DNI31239205', 'password', 28, 1, '2019-09-19'),
	('VICTOR', 'ZARATE', 'DNI31244038', 'password', 29, 9, '2021-09-19'),
	('LEANDRO', 'SANCHEZ', 'DNI31253023', 'password', 30, 5, '2014-08-19'),
	('NICOLAS', 'GEREZ', 'DNI31262291', 'password', 3, 8, '2014-06-19'),
	('MATIAS', 'DI BELLO', 'DNI31282335', 'password', 31, 9, '2014-07-19'),
	('NESTOR', 'SUELDO', 'DNI31283679', 'password', 32, 2, '2018-11-19'),
	('PABLO', 'GIGLIO', 'DNI31293173', 'password', 32, 7, '2017-08-19'),
	('ALDO', 'ALVARADO', 'DNI31302674', 'password', 32, 1, '2015-09-19'),
	('PATRICIO', 'SILVA', 'DNI31306173', 'password', 1, 3, '2016-12-19'),
	('LEONARDO', 'MARTINEZ', 'DNI31310581', 'password', 2, 7, '2021-05-19'),
	('VIRGINIA', 'LOPEZ', 'DNI31311932', 'password', 3, 8, '2017-04-19'),
	('LUCIANO', 'REYNOSO', 'DNI31322682', 'password', 4, 6, '2020-09-19'),
	('JUAN MANUEL', 'GUERRERO', 'DNI31325726', 'password', 5, 4, '2020-11-19');
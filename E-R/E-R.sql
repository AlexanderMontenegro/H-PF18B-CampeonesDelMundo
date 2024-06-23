CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(10) CHECK (rol IN ('user', 'admin')) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    imagen_url VARCHAR(255),
    categoria_id INTEGER REFERENCES categoria(id),
    stock INTEGER,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE pedido (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuario(id),
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50),
    total DECIMAL(10, 2)
);

CREATE TABLE detallePedido (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedido(id),
    producto_id INTEGER REFERENCES producto(id),
    cantidad INTEGER,
    precio DECIMAL(10, 2)
);

CREATE TABLE resena (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuario(id),
    producto_id INTEGER REFERENCES producto(id),
    puntuacion INTEGER CHECK (puntuacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notificacion (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuario(id),
    mensaje TEXT,
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

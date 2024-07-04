## .env

```
PORT=5000
API_DB_HOST=localhost
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=desarrollo2
DATABASE_NAME=tpo
```

---

#### globalApi.js

```js
import axios from 'axios';

let token = null;
export const baseURL = 'http://localhost:5000';

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error),
);

export const getBarrios = () => axiosInstance.get('/vecino/barrios');

export const getRubros = () => axiosInstance.get('/comercio/rubros');

export const getReclamos = () => axiosInstance.get('/reclamo');

export const getComercios = () => axiosInstance.get('/comercio');

export const postLoginVecino = async (dni, password) => {
  const response = await axiosInstance.post('/vecino/login', {
    dni,
    pw: password,
  });
  token = response.data;
  return response;
};

export const getMeVecino = () => axiosInstance.get('/vecino/me');

export const patchUpdateVecino = (password) =>
  axiosInstance.patch(`/vecino/${password}`);

export const postLoginPersonal = async (legajo, password) => {
  const response = await axiosInstance.post('/personal/login', {
    legajo,
    pw: password,
  });
  token = response.data;
  return response;
};

export const getMePersonal = () => axiosInstance.get('/personal/me');

export const postDenuncia = (obj) => axiosInstance.post('/denuncia', obj);

export const postMovimientoDenuncia = (denunciaId, obj) =>
  axiosInstance.post(`/denuncia/${denunciaId}`, obj);

export const postReclamo = (obj) => axiosInstance.post('/reclamo', obj);

export const postMovimientoReclamo = (reclamoId, obj) =>
  axiosInstance.post(`/denuncia/${reclamoId}`, obj);

export const postComercio = (obj) => axiosInstance.post('/comercio', obj);

export const deleteComercio = (id) => axiosInstance.delete(`/comercio/${id}`);

export const postOferta = (comercioId, obj) =>
  axiosInstance.post(`/comercio/${comercioId}`, obj);

export const deleteOferta = (ofertaId) =>
  axiosInstance.delete(`/comercio/oferta/${ofertaId}`);
```

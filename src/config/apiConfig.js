// src/config/apiConfig.ts
export const BASE_URL = 'https://back-navarro-pos.duckdns.org';  // Base Url
//export const BASE_URL ='http://192.168.1.31:3007'
//export const BASE_URL ='http://localhost:3007'
export const API_URLS = {
  auth: '/auth/signin',          // Ruta de autenticación
  products: '/products',         // Ruta de productos
  inventory: '/products/entries', // Ruta para inventario
  searchProduct: '/products/search', //Ruta buscar producto para agregar al ticket de compra, o insertar producto a la orden de servicios
  repairCellphones : '/repair-cellphones', // ruta para ordenes de servicios
  repairCellphonesSpareParts: '/repair-cellphones/update-with-spare-parts',
  entriesProducts: '/products/entries', //Entrada de productis al inventario
  orderSolds: '/orders/solds', //Lista de las ventas
  users: '/users',
  categories: '/categories',
  incomeNames: '/incomes/name',
  incomes: '/incomes',
  expensesNames : '/expenses/name',
  expenses : '/expenses',
  reports : '/reports',
  register: '/auth/signup',
  entriesByProductName: '/products/entries-by-name',
  addInventory: '/products/addInventory', // PATCH con barcode dinámico
};

// Función para construir la URL completa
export const buildUrl = (endpoint) => `${BASE_URL}${endpoint}`;

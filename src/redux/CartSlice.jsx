import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Lista de productos en el carrito
  },
  reducers: {
    // Agrega un producto al carrito
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      // Validación básica: asegurar que los campos requeridos estén presentes
      if (!name || !image || !cost) {
        console.warn("addItem: Missing required fields (name, image, cost)");
        return; // Ignorar la acción si faltan campos
      }

      // Verifica si el producto ya existe en el carrito
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++; // Si existe, aumenta la cantidad
      } else {
        state.items.push({ name, image, cost, quantity: 1 }); // Si no existe, agregar con cantidad 1
      }
    },

    // Elimina un producto del carrito
    removeItem: (state, action) => {
      // Aquí action.payload es directamente el nombre del producto
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // Actualiza la cantidad de un producto en el carrito
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        // Validación: asegurar que quantity sea un número positivo
        itemToUpdate.quantity = Math.max(1, parseInt(quantity, 10) || 1);
      }
    },
  },
});

// Exporta las acciones para usar en los componentes
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Exporta el reducer para configurar el store
export default CartSlice.reducer;

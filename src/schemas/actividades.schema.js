import { z } from "zod";

export const createProductSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es requerido",
  }),
  precioA: z.number({
    required_error: "El precio es requerido",
  }).min(0, {
    message: "No puedes ingresar un precio negativo",
  }),
  productos: z.unknown({
    required_error:'Se requiere el producto'
}),

});

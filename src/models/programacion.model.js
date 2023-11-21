import mongoose from "mongoose";

const programacionSchema = new mongoose.Schema({

    empleado: [
        {
          empleado: [{ type: mongoose.Types.ObjectId, ref: "Empleado", required: true }],
        }
      ],
      actividades: [{
        actividadesPorProducto: [String]
      }],
    pedido: { type: mongoose.Schema.Types.ObjectId, ref: "pedidos", required: true },
    // estado: {Boolean, required: true, default: false},

})

export const programacionModel = mongoose.model('Programacion', programacionSchema, "programaciones");


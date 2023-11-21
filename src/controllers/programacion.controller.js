import { programacionModel } from "../models/programacion.model.js";
import { ObjectId } from "mongodb";
import { pedidosModel} from "../models/pedidos.model.js"

export async function getProgramacion(req, res) {
  try {
    const programacion = await programacionModel
      .find()
      .populate('empleado.empleado', "username")
      .populate("pedido");
      console.log(programacion)

    res.json(programacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getIdProgramacion = async (req, res) => {
  try {
    const programacion = await programacionModel.findById(req.params.id);
    if (!programacion)
      return res.status(404).json({ message: "Programación no encontrada" });
    return res.json(programacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};





export async function createProgramacion(req, res) {
  try {
    const { empleado, pedido } = req.body;

    // Obtener las actividades del pedido para cada producto
    const pedidoData = await pedidosModel.findById(pedido);
    const actividadesPorProducto = pedidoData.productos.map(producto => ({
      actividadesPorProducto: producto.actividades,
    }));

    // Crear el nuevo documento de programación
    const nuevoProgramacion = new programacionModel({
      empleado: empleado.map(e => ({
        empleado: e.empleado,
      })),
      actividades: actividadesPorProducto,
      pedido,
    });

    // Guardar el nuevo documento
    const respuesta = await nuevoProgramacion.save();

    console.log(respuesta + ' Se creó correctamente');
    res.status(201).json(respuesta); // 201 significa "Creado con éxito"
  } catch (error) {
    console.log('El error es: \n' + error);
    res.status(500).json({ message: error.message });
  }
}









export const updateProgramacion = async (req, res) => {
  try {
    const {empleado, pedido} = req.body;

    const updatedProgramacion = await programacionModel.findOneAndUpdate(
      { _id: req.params.id },
      { empleado, pedido},
      { new: true } // req.body trae los nuevos datos
    );
    return res.json(updatedProgramacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteProgramacion = async (req, res) => {
  try {
    const deletedProgramacion = await programacionModel.findByIdAndDelete(req.params.id);
    if (!deletedProgramacion)
      return res.status(404).json({ message: "Programacion no encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

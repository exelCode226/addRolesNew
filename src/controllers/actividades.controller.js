import { actividadesModel } from '../models/actividades.model.js'
import {ProductModel} from '../models/products.model.js'
export const getActividades = async (req, res) => {
  try {
    const actividades = await actividadesModel.find()
    res.json(actividades);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getActividad = async (req, res) => {
  try {
    const actividades = await actividadesModel.findById(req.params.id)
    if (!actividades) return res.status(404).json({ message: "Actividad no encontrada" });
    return res.json(actividades);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const createActividad = async (req, res) => {
  try {
    const { nombre,precioA } = req.body;
    const newActividad = new actividadesModel({
      nombre,
      precioA
    });
    await newActividad.save();
    res.json(newActividad);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteActividad = async (req, res) => {
  try {
    // Buscar productos que hagan referencia a la actividad que intentas eliminar
    const asociados = await ProductModel.findOne({ 'actividades.actividad': req.params.id })
      .populate('actividades.actividad');

    // Si hay productos asociados, no permitir la eliminación
    if (asociados) {
      return res.status(400).json({ message: 'No puedes eliminar esta actividad, está vinculada a un producto.' });
    }

    // Si no hay productos asociados, proceder con la eliminación de la actividad
    const deleteActividad = await actividadesModel.findByIdAndDelete(req.params.id);

    // Verificar si la actividad fue encontrada y eliminada
    if (!deleteActividad)
      return res.status(404).json({ message: "Actividad no encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateActividad = async (req, res) => {
  try {
    const { nombre,precioA } = req.body;
    const actividadUpdated = await actividadesModel.findOneAndUpdate(
      { _id: req.params.id },
      { nombre, precioA},
      { new: true }
    );
    return res.json(actividadUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};






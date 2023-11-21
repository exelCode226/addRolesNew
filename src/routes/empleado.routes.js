import { Router } from "express";
import { authRequired, isPropietario } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createEmpleSchema } from "../schemas/emple.schema.js";
import { createEmpleado, deleteEmpleado, getEmpleados,cambiarEstadoEmpleado, updateEmpleado, getEmpleado } from "../controllers/empleado.controller.js";

const router = Router();

router.get("/empleados", getEmpleados);

router.post("/empleados",  validateSchema(createEmpleSchema), createEmpleado);

router.get("/empleados/:id", getEmpleado);

router.put("/empleados/:id", updateEmpleado);

router.delete("/empleados/:id",  deleteEmpleado);

router.put("/empleados/:empleadoId/estado", cambiarEstadoEmpleado);

export default router;

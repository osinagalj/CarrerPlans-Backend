const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");

// api/Plans
router.post("/", planController.createPlan);
router.get("/", planController.getPlans);
router.put("/:id", planController.updatePlan);
router.get("/:id", planController.getPlan);
router.delete("/:id", planController.deletePlan);
router.put("/add-quarter/:id", planController.addQuarter);
router.delete("/remove-quarter/:id/:year", planController.deleteYear);
router.put("/add-subject/:id", planController.addSubject);
router.put("/remove-subject/:id/:idSubject", planController.removeSubject);
module.exports = router;

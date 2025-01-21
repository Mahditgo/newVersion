const { Router } = require('express');
const salesController = require('./../controllers/salesController')
const upload = require('../middleswares/upload')



const router = Router();

router.post("/upload/saleDetails",upload.single("file"), salesController.uploadSales);
router.get("/upload/saleDetails", salesController.getAllSales);
router.delete("/upload/saleDetails/:id", salesController.deleteSales)

module.exports = router;
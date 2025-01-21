const { Router } = require('express');
const upload = require('../middleswares/upload');
const propertyController = require('./../controllers/propertyDetailsController');
const router = Router();

router.post('/', upload.single('file'), propertyController.uplaodPropertyDetails);
router.get('/:reportId', propertyController.getPropertyDetails);
router.delete('/:id' , propertyController.deletePropertyDetails)



module.exports = router;
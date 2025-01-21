const { Router } = require('express');
const upload = require('../middleswares/upload');
const otherGoodsController = require('./../controllers/otherGoodsController');
const router = Router();

router.post('/', upload.single('file'), otherGoodsController.uplaodOtherGoods);
router.get('/:reportId', otherGoodsController.getOtherGoods);
router.delete('/:id' , otherGoodsController.deleteOtherGood)



module.exports = router;
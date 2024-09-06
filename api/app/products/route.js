const router = require("express").Router();
const upload = require("../../config/multerConfig");
const productController = require('./controller')

router.get("/product", productController.product);
router.get("/product/:id", productController.productId);
router.post('/product',upload.single('image_url'),productController.productAdd)
router.put('/product/:id', upload.single('image_url'),productController.productUpdate)
router.delete('/product/:id',productController.productDelete)

module.exports = router;

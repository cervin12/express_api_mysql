const router = require("express").Router();
const Product = require("./model");
const upload = require("../../config/multerConfig");

router.post("/product", upload.single("image_url"), async (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;
  try {
    await Product.sync();
    let result = await Product.create({
      user_id,
      name,
      price,
      stock,
      status,
      image_url: `${req.baseUrl}/${image.path}`
    });
    res.send({
      result: result,
      image: image,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    })
  }
});

router.get("/product", async (req, res) => {
  try {
    const product = await Product.findAll();
    res.send({
      status: "Success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    })
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const result = await Product.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (result.length < 1) {
      throw new Error('product not found');
    } else {
      res.send({
        status: "Success",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    })
  }
});

router.put('/product/:id', upload.single('image_url'), async (req,res)=>{
  const {name, price, stock, status, user_id} = req.body
  const image = req.file
  let result = {}
  try {
    if(!image){
      result = await Product.update({
        name,
        price,
        stock,
        status,
        user_id
      }, {
        where: {
          id: req.params.id
        }
      })
    } else {
      result = await Product.update({
        name,
        price,
        stock,
        status,
        user_id,
        image_url: `${req.baseUrl}/${image.path}`
      }, {
        where: {
          id: req.params.id
        }
      })
    }
    
    const updatedProduct = await Product.findOne({where: {id:req.params.id}})
  
    res.send({
      status: "Success",
      data: updatedProduct
    })
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: error.message
    })
  }
})

router.delete('/product/:id', async (req,res)=>{
  try {
    const getProduct = await Product.findOne({where:{id:req.params.id}}) 
    const product = await Product.destroy({where:{id:req.params.id}})
    res.send({status: 'Success', message: `product ${getProduct.name} has been deleted`,product})
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: error.message
    })
  }
})

module.exports = router;

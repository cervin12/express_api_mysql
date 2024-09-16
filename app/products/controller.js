const connection = require("../../config/mysql");
const path = require('path')

const product = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM product",
    },
    _response(res)
  );
};

const productId = (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM product WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const productAdd = (req,res)=>{
  
  const {name, user_id, price, stock, status} = req.body
  const image = req.file;

  if (!name || !user_id || !price || !image || !stock) {
    return res.status(400).json({ error: 'All fields are required' });
  }
    connection.query({
        sql: "INSERT INTO product (name, user_id, price, stock, status,image_url) VALUES(?,?,?,?,?,?)",
        values: [name,user_id, price,stock,status, `localhost:3001/${image.path}`]
    }
    ,_response(res))
}

const productUpdate = (req,res)=>{
  
  const {name, user_id, price, stock, status} = req.body
  const image = req.file;
  var sql=''
  var values = []

  if (!name || !user_id || !price || !stock) {
    return res.status(400).json({ error: 'All not image fields are required' });
  }

  if(image){
    sql = "UPDATE product SET name = ?, user_id = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?"
    values = [name,user_id, price,stock,status, `localhost:3001/${image.path}`, req.params.id]
  } else{
    sql = "UPDATE product SET name = ?, user_id = ?, price = ?, stock = ?, status = ? WHERE id = ?"
    values = [name,user_id, price,stock,status, req.params.id]
  }
    connection.query({
        sql,
        values
    }
    ,_response(res))
}

const productDelete = (req,res)=>{
  connection.query({
    sql: "DELETE FROM product WHERE id = ?",
    values: [req.params.id],
  },_response(res))
}

const _response = (res) => {
  return (error, result) => {
    if (error) {
      res.send({
        status: "failed",
        message: error
      });
    }else if (result.length < 1) {
      res.send({
        status: "failed",
        message: 'data not found',
      });
    } else {
      res.send({
        status: "success",
        data: result,
      });
      console.log(result);
    }
  };
};

module.exports = {
  product,
  productId,
  productAdd,
  productUpdate,
  productDelete
};

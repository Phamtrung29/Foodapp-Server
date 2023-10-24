const Product = require('../models/Products')


module.exports = {
    createProduct: async(req, res) => {
        const newProduct = new Product({
            ...req.body
            }
        )
            try {
            console.log(newProduct);
            res.status(200).json('create product success')
        } catch (error) {
            res.status(500).json('create product fail')
        }
    },
    getAllProduct: async(req, res) => {
        try {
            const allProducts = await Product.find({})
            res.status(200).json(allProducts)
        } catch (error) {
            res.status(500).json('get product fail')
        }
    },
    searchProduct: async(req, res) => {
        try {
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "products",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(result)
        } catch (error) {
            res.status(200).json('error search')
        }
    }
}
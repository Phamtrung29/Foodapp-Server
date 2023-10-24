const Cart = require("../models/Cart");
const Product = require("../models/Products");

module.exports = {
  addToCart: async (req, res) => {
    const { userId, cartItem, qty } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      if (cart) {
        const existProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );

        if (existProduct) {
          existProduct.qty += 1;
        } else {
          cart.products.push({ cartItem, qty });
        }
        await cart.save();
        res.status(200).json("product added to cart");
      } else {
        const newCart = new Cart({
          userId,
          products: [{ cartItem, qty: qty }],
        });
        await newCart.save();
        res.status(200).json({msg: 'add to cart success'});
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getCart: async (req, res) => {
    const userId = req.params.id
    try {
      const cart = await Cart.findOne({userId})
        .populate('products.cartItem', '_id title price imageUrl')
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json("error from get cart ")
    }
  },

  decrementCartItem: async (req, res) => {
    const {userId, cartItem} = req.body
    try {
      const cart = await Cart.findOne({userId})
      if (!cart) {
        res.status(404).json('Decrement cartItem: Cart not found')
      }

      const existProduct = cart.products.find((product) => product.cartItem.toString() === cartItem)

      if (!existProduct) {
        res.status(404).json('Decrement cartItem: Product not found')
      }

      if(existProduct.qty === 1) {
        cart.products = cart.products.filter((product) => product.cartItem.toString() !== cartItem)
      } else {
        existProduct.qty -= 1
      }
      await cart.save()

      if (existProduct.qty === 0) {
        await Cart.updateOne(
          {userId},
          {$pull: {prodcuts: {cartItem}}}
        )
      }

      res.status(200).json('Product updated')
    } catch (error) {
      res.status(500).json('Decrement cartItem: ', error)
    }
  }, deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItemId
    try {
      const updateCart = await Cart.findOneAndUpdate(
        {"products._id": cartItemId},
        {$pull: {products: {_id: cartItemId}}},
        {new: true}
      )

      if(!updateCart){
        res.status(404).json('Delete cart item: cart item not found')
      }

      res.status(200).json(updateCart)
    } catch (error) {
      res.status(500).json('Delete cart item: ', error)
    }
  }
};

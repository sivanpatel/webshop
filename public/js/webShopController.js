webShop.controller('WebShopController', ['productFactory', '$http', function(productFactory) {

  var self = this

  var products = function() {
    productFactory.then(function(response) {
      self.products = response.data
    })
  }

  products()

  self.cart = []
  self.discount = 0
  self.footwear = false
  self.voucherCode = ""
  self.voucherValid = ""

  self.addToCart = function(product) {
    if(self.outOfStock(product)) { throw "Out of stock" }
    var inCart = self.cart.some(function(item) {
      return item.name === product.name
    })
    if(!inCart){
      product.quantityInCart = 1
      self.cart.push(product)
    } else {
      for(var i in self.cart) {
        if(self.cart[i].name == product.name) {
          self.cart[i].quantityInCart ++
        }
      }
    }
  }

  self.removeFromCart = function(product) {
    product.quantityInCart = 0
    var index = self.cart.indexOf(product)
    self.cart.splice(index, 1)
    product.quantity = product.quantity + product.quantityInCart
    self.discount = 0
  }

  self.totalPrice = function() {
    var total = 0
    self.cart.forEach(function(item) {
      total += item.price * item.quantityInCart
    })
    return total - self.discount;
  }

  self.applyVoucher = function(code) {
    self.checkVoucher(code)
    self.voucherCode = code
    self.checkFootwear()
    self.applyDiscount(code)
  }

  self.checkVoucher = function(code) {
    var isValid = ['five', 'ten', 'fifteen'].indexOf(code)
    if(isValid == -1) {
      self.voucherValid = "Invalid code"
      throw "Invalid code"
    } else {
      self.voucherValid=""
    }
  }

  self.checkFootwear = function() {
    for(var i = 0; i < self.cart.length; i ++) {
      if (self.cart[i].category == "Men's Footwear" || self.cart[i].category == "Women's Footwear") {
       self.footwear = true
      } else {
       self.footwear = false
      }
    }
  }

  self.outOfStock = function(product) {
    if(product.quantity == product.quantityInCart || product.quantity == 0) {
        return true
        }
  }

  self.applyDiscount = function(code) {
    if(code=='five' && self.totalPrice() > 5) {
      self.discount = 5.00
    } else if(code=='ten' && self.totalPrice() > 50) {
      self.discount = 10.00
    } else if(code=='fifteen' && self.totalPrice() > 75 && self.footwear == true) {
      self.discount = 15.00
    }
  }

}])

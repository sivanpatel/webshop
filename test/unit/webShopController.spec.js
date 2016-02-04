describe('WebShopController', function() {
  beforeEach(module('WebShop'))

  var ctrl

  beforeEach(inject(function($controller) {
    ctrl = $controller('WebShopController')
  }))

  it('starts with an empty cart', function() {
    expect(ctrl.cart).toEqual([])
  })

  it('can add an item to the cart', function() {
    ctrl.addToCart({name: 'name', category: 'category', price: 0, quantity: 1})
    expect(ctrl.cart).toEqual([{name: 'name', category: 'category', price: 0, quantity: 1, quantityInCart:1}])
  })

  it('can remove and item from the cart', function() {
    ctrl.addToCart({name: 'name', category: 'category', price: 0, quantity: 1})
    var item = ctrl.cart[0]
    ctrl.removeFromCart(item)
    expect(ctrl.cart).toEqual([])
  })

  it('calculates the total price of the cart', function() {
    ctrl.addToCart({name: 'name', category: 'category', price:100, quantity: 1})
    ctrl.addToCart({name: 'name2', category: 'category2', price:100, quantity:1})
    expect(ctrl.totalPrice()).toEqual(200)
  })

  it('knows when an invalid code has been entered', function() {
    expect(function() { ctrl.applyVoucher('test') }).toThrow("Invalid code")
  })

  it('allows the five pound voucher code to be used', function() {
    ctrl.addToCart({name: 'name', category: 'category', price:100, quantity: 1})
    ctrl.applyVoucher('five')
    expect(ctrl.totalPrice()).toEqual(95)
  })

  it('allows the ten pound voucher to be used for an order over £50', function() {
    ctrl.addToCart({name: 'name', category: 'category', price:100, quantity: 1})
    ctrl.applyVoucher('ten')
    expect(ctrl.totalPrice()).toEqual(90)
  })

  it('does not allow the ten pound voucher to be used for an order under £50', function() {
    ctrl.addToCart({name: 'name', category: 'category', price: 30, quantity: 1 })
    ctrl.applyVoucher('ten')
    expect(ctrl.totalPrice()).toEqual(30)
  })

  it('allows the fifteen pound voucher to be used when the order is over £75 and mens footwear has been bought', function() {
    ctrl.addToCart({name: 'name', category: "Men's Footwear", price:100, quantity: 1})
    ctrl.applyVoucher('fifteen')
    expect(ctrl.totalPrice()).toEqual(85)
  })

  it('allows the fifteen pound voucher to be used when the order is over £75 and womens footwear has been bought', function() {
    ctrl.addToCart({name: 'name', category: "Women's Footwear", price:100, quantity: 1})
    ctrl.applyVoucher('fifteen')
    expect(ctrl.totalPrice()).toEqual(85)
  })

  it('does not allow the fifteen pound voucher to be used then the order is less than £75', function() {
    ctrl.addToCart({name:'name', category:"Men's Footwear", price:50, quantity: 1})
    ctrl.applyVoucher('fifteen')
    expect(ctrl.totalPrice()).toEqual(50)
  })

  it('checks if there is footwear in the cart', function() {
    ctrl.addToCart({name:'name', category:"Men's Footwear", price:50, quantity: 1})
    ctrl.checkFootwear()
    expect(ctrl.footwear).toEqual(true)
  })

  it('does not allow the fifteen pound voucher to be used if there is no footwear in the cart', function() {
    ctrl.addToCart({name:'name', category:'category', price:100, quantity: 1})
    ctrl.applyVoucher('fifteen')
    expect(ctrl.totalPrice()).toEqual(100)
  })

  it('does not allow an out of stock item to be added', function() {
    var outOfStockItem = {name:'name', category:'category', price:1, quantity: 0}
    expect(function(){ ctrl.addToCart(outOfStockItem) }).toThrow("Out of stock")
  })

  it('does not allow the user to add more of an item than is available', function() {
    var item = {name:'name', category:'category', price:1, quantity:1}
    ctrl.addToCart(item)
    expect(function() { ctrl.addToCart(item) }).toThrow('Out of stock')
  })

})

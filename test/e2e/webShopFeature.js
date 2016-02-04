describe('Simple Web Shop', function() {

  var products = element(by.className('product-list'))
  var addToCart = element(by.buttonText('Add to cart'))
  var cart =  element(by.className('cart'))
  var cartShow = element(by.buttonText('Cart'))
  var removeFromCart = element(by.buttonText('Remove from cart'))
  var totalPrice = element(by.className('total-price'))
  var voucherBox = element(by.className('voucher-box'))
  var voucherApply = element(by.buttonText('Apply'))
  var voucherForm = element(by.className('voucher-alert'))

  beforeEach(function() {
    browser.get('http://localhost:8080')
  })

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('WebShop')
  })

  it('loads the list of products', function() {
    expect(products.getText()).toContain('Almond Toe Court Shoes')
  })

  it('can add products to the cart', function() {
    addToCart.click()
    cartShow.click()
    expect(cart.getText()).toContain('Almond Toe Court Shoes')
  })

  it('alerts when the product is out of stock', function() {
    addToCart.click()
    addToCart.click()
    addToCart.click()
    addToCart.click()
    addToCart.click()
    expect(products.getText()).toContain('Out of stock')
  })

  it('can remove products from the cart', function() {
    addToCart.click()
    cartShow.click()
    removeFromCart.click()
    expect(cart.isPresent()).toEqual(false)
  })

  it('shows the total price', function() {
    addToCart.click()
    cartShow.click()
    expect(totalPrice.getText()).toContain('£99')
  })

  it('can apply a five pound off voucher', function() {
    addToCart.click()
    cartShow.click()
    voucherBox.sendKeys('five')
    voucherApply.click()
    expect(totalPrice.getText()).toContain('£94')
  })

  it('alerts when an invalid voucher code has been entered', function() {
    addToCart.click()
    cartShow.click()
    voucherBox.sendKeys('invalid')
    voucherApply.click()
    expect(voucherForm.getText()).toContain('Invalid code')
  })

})

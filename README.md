# Front End Web Shop

For use:

````
$ git clone https://github.com/sivanpatel/webshop
$ cd webshop
$ npm install
$ bower install
$ http-server
````
Visit: http://localhost:8080

To run the tests:

1.For Karma (unit) tests:
````
$ karma start test/unit/karma.conf.js
````

2.For Protractor (feature) tests:
In separate terminal windows
````
$ webdriver-manager start
$ http-server
$ protractor test/e2e/conf.js
````
If the protractor tests fail without running, you may need to update your version of node to the latest version, found here: http://nodejs.org

#### My approach
* I created a simple JSON file to store the product information in, and used a factory to incorporate that data in my app
* I decided to use AngularJS for the development of this
* The development was test driven using Karma for the unit tests and Protractor for the feature tests

#### Things to do

* Stop the voucher codes from failing silently: currently if the conditions for the code aren't met it will not throw an error which I would like it to
* More CSS styling; the more important thing (for me) in this case was the coding
* I would like to take more logic out of the controller, so, for example, I could have a service dealing with all of the voucher validation and applications

##### Discout Codes
* five - £5 off
* ten - £10 off
* fifteen - £15 off
````
.
├── README.md
├── bower.json
├── package.json
├── products.json
├── index.html
├── js
│   ├── app.js
│   ├── productFactory.js
│   └── webShopController.js
└── test
    ├── e2e
    │   ├── conf.js
    │   └── webShopFeature.js
    └── unit
        ├── karma.conf.js
        └── webShopController.spec.js
````

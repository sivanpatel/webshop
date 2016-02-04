For use:

````
$ git clone https://github.com/sivanpatel/jellyfish-challenge
$ cd jellyfish-challenge
$ ruby lib/remote_control.rb
````

To run the tests:

````
$ bundle
$ rspec --format documentation
````

The sample orders have been placed into the jellyfish_orders.txt file (in the root directory). You can add extras as you wish. Each command must be separated by a new line.

I would have liked to have also done some input validation, so that the commands that were passed were as expected, but I have not got to that yet.

My approach was to initially create a simple Tank class with just dimensions of 11. Then to create a Jellyfish class which would track its position, and direction. Then to create a class which handled the orders given to the Jellyfish. I felt that this would make it easier for the classes to be reused afterwards, and for extra rules to be added with regards to instructions.

Once these classes had been created, I started to increase the complexity of the problem:
* I allowed for the initial coordinates of the tank and jellyfish to be of varying lengths
* I created a way to track the coordinates and direction at which a jellyfish was lost
* I prevented the jellyfish from moving forward when it was about to move out of the grid

## Things to do

* Refactor nasty if/else statement in Coordinate_Parser module, could not get this working
* Add validation of all inputs
* Refactor Instruct class. I wanted to use a hash to call methods based on the letter provided (instead of the case statements) but could not get it working. I feel like this would make it much easier to introduce new rules (for example if the jellyfish started pointing NE instead of N)

# Obligatory

**WARNING** This library does not work. It was a spike. If you can make it
work, please do so and sent us a pull request. ¡Muchas gracias!

Just a super basic example.

## Samples

Works just like the BDD matcher except for the below

    /* replaces describe */
    feature("Thing to be tested", function() {

      beforeEach(function() {
        // do stuff
      });

      /* replaces it */
      scenario("does a thing", function() {
        // test it does a thing
      });

      /* also replaces it */
      scenario("does another thing", function() {
        // test it does another thing
      });

    });

That's all for now!

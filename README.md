# Obligatory

Just a super basic example. More to come if this actually works.

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

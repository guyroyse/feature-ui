let Mocha = require('mocha');
let Suite = require('mocha/lib/suite');
let Test = require('mocha/lib/test');

module.exports = Mocha.interfaces['feature-ui'] = function(suite) {
  var suites = [suite];

  suite.on('pre-require', function(context, file, mocha) {
    var common = require('mocha/lib/interfaces/common')(suites, context);

    /**
     * Use all existing hook logic common to UIs. Common logic can be found in
     * https://github.com/mochajs/mocha/blob/master/lib/interfaces/common.js
     */
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;
    context.before = common.before;
    context.after = common.after;
    context.run = mocha.options.delay && common.runWithSuite(suite);

    /**
     * Describe a "suite" with the given `title`
     * and callback `fn` containing nested suites
     * and/or tests.
     */

    context.feature = context.context = function (title, fn) {
      return common.suite.create({
        title: title,
        file: file,
        fn: fn
      });
    };

    /**
     * Pending describe.
     */

    context.feature.skip = context.context.skip = function (title, fn) {
      return common.suite.skip({
        title: title,
        file: file,
        fn: fn
      });
    };

    /**
     * Exclusive suite.
     */

    context.feature.only = context.context.only = function (title, fn) {
      return common.suite.only({
        title: title,
        file: file,
        fn: fn
      });
    };

    /**
     * Describe a specification or test-case
     * with the given `title` and callback `fn`
     * acting as a thunk.
     */

    context.scenario = function (title, fn) {
      var suite = suites[0];
      if (suite.isPending()) {
        fn = null;
      }
      var test = new Test(title, fn);
      test.file = file;
      suite.addTest(test);
      return test;
    };

    /**
     * Exclusive test-case.
     */

    context.scenario.only = function (title, fn) {
      return common.test.only(mocha, context.scenario(title, fn));
    };

    /**
     * Pending test case.
     */

    context.scenario.skip = function (title) {
      context.scenario(title);
    };

    /**
     * Number of attempts to retry.
     */
    context.scenario.retries = function (n) {
      context.retries(n);
    };
};

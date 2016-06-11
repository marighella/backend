'use strict';

exports.fails = function(done){
  return (err, res) => {
    if (err) {
      done.fail(err);
    } else {
      done();
    }
  };
};

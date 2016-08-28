var enviroment = process.env.ENV || 'local';

require('./lib/db').start(enviroment);
require('./lib/server').start();

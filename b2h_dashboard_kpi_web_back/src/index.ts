import config from './config';
import { server } from './app';
import mongoInitPromise from './providers/db';
import fixtures from './shared/fixture/index';

mongoInitPromise
  .then(async () => {
    console.clear();
    await fixtures();

    const PORT = Number(process.env.PORT) || config.port;

    server.listen(PORT, async () => {
      console.log('****************************************\n');
      console.log(' ====> Connected to MongoDB');
      console.log(` ====> App running on port ${PORT}\n`);
      console.log('****************************************');
    });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });



// import config from '@config';
// import { server } from './app';
// import mongoInitPromise from '@providers/db';
// import fixtures from '@fixture/index';
// mongoInitPromise
//        .then(async () => {
//               console.clear();
//               await fixtures();
//               server.listen(config.port, async () => {
//                      console.log('****************************************\n');
//                      console.log(' ====> Connected to MongoDB');
//                      console.log(` ====> App running on port ${config.port}\n`);
//                      console.log('****************************************');
//               });
//        })
//        .catch(error => {
//               console.error('MongoDB connection error:', error);
//        });

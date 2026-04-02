export const asyncMap = (array, handler, callback?): Promise<[void]> =>
       new Promise(async (resolve, reject) => {
              const results: any = [];
              try {
                     for (const item of array) {
                            const result = await handler(item);
                            results.push(result);
                     }

                     if (callback) await callback(results);
                     return resolve(results);
              } catch (error) {
                     console.log('async map error catch');
                     return reject(error);
              }
       });

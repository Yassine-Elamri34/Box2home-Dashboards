import mongoose, { Schema } from 'mongoose';

const clientSchema: Schema = new Schema({
       clientName: {
              type: String,
              required: true
       },

       contacts: {
              phoneNumber: {
                     type: String,
                     required: true
              },
              email: {
                     type: String,
                     required: true
              }
       },

       zones: [
              {
                     zoneLabel: {
                            type: String,
                            required: true
                     },

                     zipCodes: {
                            type: String
                     }
              }
       ],
       configurations: [{}]
});

const ClientModel = mongoose.model<any>('Clients', clientSchema);
export default ClientModel;

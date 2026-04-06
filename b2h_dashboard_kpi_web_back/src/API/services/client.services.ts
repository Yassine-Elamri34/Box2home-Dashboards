import ClientModel from '../../shared/models/Clients';

const clientService = {
       async createClient(clientData) {
              try {

                     const existingUser = await ClientModel.findOne({ "contacts.email":clientData.contacts.email });

                     console.log(clientData.email)
                     if (existingUser) {
                            throw 'Email est deja utilisé par un autre client';
                     }
                     const newClient = await ClientModel.create(clientData);
                     return newClient;
              } catch (error) {
                     console.log(error);
                     throw error
              }
       },

       async getAllClients() {
              try {
                     const clients = await ClientModel.find();
                     return clients;
              } catch (error) {
                     throw new Error('Could not fetch clients');
              }
       },

       async getClientById(clientId) {
              try {
                     const client = await ClientModel.findById(clientId);
                     return client;
              } catch (error) {
                     throw new Error('Could not fetch client');
              }
       },

       async updateClient(clientId, newData) {
              try {
                     const updatedClient = await ClientModel.findByIdAndUpdate(clientId, newData, { new: true });
                     return updatedClient;
              } catch (error) {
                     throw new Error('Could not update client');
              }
       },

       async deleteClient(clientId) {
              try {
                     await ClientModel.findByIdAndDelete(clientId);
              } catch (error) {
                     throw new Error('Could not delete client');
              }
       }
};

export default clientService;

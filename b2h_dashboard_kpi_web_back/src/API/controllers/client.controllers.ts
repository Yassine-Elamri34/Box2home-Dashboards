import { Request, Response } from 'express';
import clientService from '../services/client.services';

const createClient = async (req: Request, res: Response) => {
       try {
              const clientData = req.body;
              const newClient = await clientService.createClient(clientData);
              return res.status(201).json({
                     data: newClient,
                     status: 201,
                     message: 'Client created successfully.'
              });
       } catch (error) {
              return res.status(500).json({
                     error:error ,
                     message: 'Server error...',
                     status: 500
              });
       }
};

const getAllClients = async (_: Request, res: Response) => {
       try {
              const clients = await clientService.getAllClients();
              return res.status(200).json({
                     data: clients,
                     status: 200,
                     message: 'Clients fetched successfully.'
              });
       } catch (error) {
              return res.status(500).json({
                     error: error.message,
                     message: 'Server error...',
                     status: 500
              });
       }
};

const getClientById = async (req: Request, res: Response) => {
       try {
              const { clientId } = req.params;
              const client = await clientService.getClientById(clientId);
              if (!client) {
                     return res.status(404).json({
                            message: 'Client not found.',
                            status: 404
                     });
              }
              return res.status(200).json({
                     data: client,
                     status: 200,
                     message: 'Client fetched successfully.'
              });
       } catch (error) {
              return res.status(500).json({
                     error: error.message,
                     message: 'Server error...',
                     status: 500
              });
       }
};

const updateClient = async (req: Request, res: Response) => {
       try {
              const { clientId } = req.params;
              const newData = req.body;
              const updatedClient = await clientService.updateClient(clientId, newData);
              if (!updatedClient) {
                     return res.status(404).json({
                            message: 'Client not found.',
                            status: 404
                     });
              }
              return res.status(200).json({
                     data: updatedClient,
                     status: 200,
                     message: 'Client updated successfully.'
              });
       } catch (error) {
              return res.status(500).json({
                     error: error.message,
                     message: 'Server error...',
                     status: 500
              });
       }
};

const deleteClient = async (req: Request, res: Response) => {
       try {
              const { clientId } = req.params;
              await clientService.deleteClient(clientId);
              return res.status(204).send(); // No content to send
       } catch (error) {
              return res.status(500).json({
                     error: error.message,
                     message: 'Server error...',
                     status: 500
              });
       }
};

const clientController = {
       createClient,
       getAllClients,
       getClientById,
       updateClient,
       deleteClient
};

export default clientController;

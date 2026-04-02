import { Request, Response } from 'express';
import statesServices from '../services/states.services';

const getGlobalKPI = async (_: Request, res: Response) => {
       try {
              const data: any = {};

              // Fetch orders by status
              const ordersByStatus = await statesServices.fetchOrdersByStatus();
              if (ordersByStatus) {
                     const { finished_successfully, LIVRAISON_IMPOSSIBLE, in_progress, Total_orders }: any = ordersByStatus;
                     const percentageFinished = (finished_successfully / Total_orders) * 100;
                     const percentageInProgress = (in_progress / Total_orders) * 100;
                     const percentageImpossibleDelivery = (LIVRAISON_IMPOSSIBLE / Total_orders) * 100;
                     data.ordersByStatus = ordersByStatus;
                     data.percentageOrderStatus = { finished_successfully: percentageFinished, LIVRAISON_IMPOSSIBLE: percentageImpossibleDelivery, in_progress: percentageInProgress };
              }

              // Fetch average weight or volume per order
              const averageWeightOrVolumePerOrder = await statesServices.averageWeightOrVolumePerOrder();
              if (averageWeightOrVolumePerOrder) {
                     data.averageWeightOrVolumePerOrder = averageWeightOrVolumePerOrder;
              }

              // Fetch orders by technical issues
              const fetchOrdersByTechnicalIssues = await statesServices.fetchOrdersByTechnicalIssues();
              if (fetchOrdersByTechnicalIssues) {
                     data.fetchOrdersByTechnicalIssues = fetchOrdersByTechnicalIssues;
              }

              // Fetch package status distribution, sources, and top orders external codes
              const [packageStatusDistribution, packageSources, topOrdersExternalCodes] = await Promise.all([
                     statesServices.packageStatusDistribution(),
                     statesServices.packageSources(),
                     statesServices.topOrdersExternalCodes()
              ]);

              if (packageStatusDistribution) {
                     data.packageStatusDistribution = packageStatusDistribution;
              }

              if (packageSources) {
                     data.packageSources = packageSources;
              }

              if (topOrdersExternalCodes) {
                     data.topOrdersExternalCodes = topOrdersExternalCodes;
              }

              return res.status(200).json({
                     data,
                     status: 200,
                     message: 'Operation done successfully.'
              });
       } catch (error) {
              return res.status(500).json({
                     message: 'Server error',
                     error: error.message // Send the error message for debugging
              });
       }
};
const getKPIByChannelLabel = async (_req: Request, res: Response) => {
       try {
              const data: any = {};

              // Fetch orders by status
              // const ordersByStatus = await statesServices.fetchOrdersByStatusByCanal(req.params.channelLabel);
              const ordersByStatus = await statesServices.fetchOrdersByStatusByCanal();
              if (ordersByStatus) {
                     const { finished_successfully, LIVRAISON_IMPOSSIBLE, in_progress, Total_orders }: any = ordersByStatus;
                     const percentageFinished = (finished_successfully / Total_orders) * 100;
                     const percentageInProgress = (in_progress / Total_orders) * 100;
                     const percentageImpossibleDelivery = (LIVRAISON_IMPOSSIBLE / Total_orders) * 100;
                     data.ordersByStatus = ordersByStatus;
                     data.percentageOrderStatus = { finished_successfully: percentageFinished, LIVRAISON_IMPOSSIBLE: percentageImpossibleDelivery, in_progress: percentageInProgress };
              }

              // Fetch average weight or volume per order
              // const averageWeightOrVolumePerOrder = await statesServices.averageWeightOrVolumePerOrderByCanal(req.params.channelLabel);
              const averageWeightOrVolumePerOrder = await statesServices.averageWeightOrVolumePerOrderByCanal();
              if (averageWeightOrVolumePerOrder) {
                     data.averageWeightOrVolumePerOrder = averageWeightOrVolumePerOrder;
              }

              /*    // Fetch orders by technical issues
              const fetchOrdersByTechnicalIssues = await statesServices.fetchOrdersByTechnicalIssues(req.params.channelLabel);
              if (fetchOrdersByTechnicalIssues) {
                     data.fetchOrdersByTechnicalIssues = fetchOrdersByTechnicalIssues;
              }

              // Fetch package status distribution, sources, and top orders external codes
              const [packageStatusDistribution, packageSources, topOrdersExternalCodes] = await Promise.all([
                     statesServices.packageStatusDistribution(req.params.channelLabel),
                     statesServices.packageSources(req.params.channelLabel),
                     statesServices.topOrdersExternalCodes(req.params.channelLabel)
              ]);

              if (packageStatusDistribution) {
                     data.packageStatusDistribution = packageStatusDistribution;
              }

              if (packageSources) {
                     data.packageSources = packageSources;
              }

              if (topOrdersExternalCodes) {
                     data.topOrdersExternalCodes = topOrdersExternalCodes;
              } */

              return res.status(200).json({
                     data,
                     status: 200,
                     message: 'Operation done successfully.'
              });
       } catch (error) {
              return res.status(500).json({
                     message: 'Server error',
                     error: error.message // Send the error message for debugging
              });
       }
};

const authController = {
       getGlobalKPI,
       getKPIByChannelLabel
};

export default authController;

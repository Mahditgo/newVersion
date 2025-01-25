const ProductCountingDetails = require('./../models/productCountingModel');
const ProductionsDetails = require('./../models/productionsDetailsModel');
  
  const getProductDiscrepancies = async (req, res) => {
    try {

      const { reportId } = req.params;
  
      if (!reportId) {
        return res.status(400).json({
          success: false,
          message: "Report ID is required",
        });
      }

      const productCountings = await ProductCountingDetails.find({reportId}).lean();
     
      const productions = await ProductionsDetails.find({reportId}).lean();
  
    
      const productionMap = {};
      productions.forEach((doc) => {
        doc.items.forEach((item) => {
          productionMap[item.productCode] = {
            productName: item.productName,
            productionQuantity: item.productionQuantity,
          };
        });
      });
  
      
      const discrepancies = [];
      productCountings.forEach((doc) => {
        doc.items.forEach((item) => {
          const matchingProduction = productionMap[item.productCode];
          if (matchingProduction) {
            discrepancies.push({
              productCode: item.productCode,
              productName: matchingProduction.productName,
              productCounting: item.counting,
              productionQuantity: matchingProduction.productionQuantity,
              discrepancy: matchingProduction.productionQuantity - item.counting,
            });
          }
        });
      });
  
 
      res.status(200).json({
        success: true,
        reportId,
        data: discrepancies,
      });
    } catch (err) {
      console.error("Error finding discrepancies:", err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  
  module.exports = { getProductDiscrepancies };
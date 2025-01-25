const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

const salesRouter = require('./routes/salesRouter');
const warehouseRouter = require('./routes/warehouseRouter');
const materialdetailsRouts = require('./routes/materialdetailRoutes');
const propertyDetailsRoutes = require('./routes/propertyDetailsRouter');
const otherGoodsRoutes = require('./routes/otherGoodsRouter');
const productionDetailsRoutes = require('./routes/productionDetailsRouter');
const productCountingDetailsRoutes = require('./routes/productCountingDetailRouter');
const discrepancyRoutesRouter = require('./routes/discrepancyRoutesRouter')

const insurancecoverageRoutes = require('./routes/insurancecoverageRouter')
dotenv.config();


const app = express();
app.use(cors({
  origin :"http://localhost:5173" ,
  credentials : true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = process.env.MONGO_URI;


const connectDB = async () => {
  try {
   
    await mongoose.connect(MONGO_URI);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1); 
  }
};

app.use('/api/sales',             salesRouter);
app.use('/api/warehouse',         warehouseRouter);
app.use('/api/materialdetails',   materialdetailsRouts);
app.use('/api/propertyDetails',   propertyDetailsRoutes);
app.use('/api/otherGoods',        otherGoodsRoutes);
app.use('/api/productionsDetails',     productionDetailsRoutes);
app.use('/api/productCountingDetails', productCountingDetailsRoutes);
app.use('/api/productDiscrepancy', discrepancyRoutesRouter);


//invaluation Imports
app.use('/api/insurancecoverage', insurancecoverageRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB(); 
});

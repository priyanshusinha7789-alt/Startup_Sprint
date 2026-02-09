const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PRODUCT_FILE = "./data/products.json";
const SALES_FILE = "./data/sales.json";

/* Utility Functions */
function readFile(path){
  return JSON.parse(fs.readFileSync(path));
}

function writeFile(path,data){
  fs.writeFileSync(path, JSON.stringify(data,null,2));
}

/* GET PRODUCTS */
app.get("/products",(req,res)=>{
  const products = readFile(PRODUCT_FILE);
  res.json(products);
});

/* GENERATE BILL */
app.post("/bill",(req,res)=>{
  const {customer, item, qty} = req.body;

  let products = readFile(PRODUCT_FILE);
  let sales = readFile(SALES_FILE);

  let product = products.find(p=>p.name===item);

  if(!product){
    return res.json({success:false,message:"Item not found"});
  }

  if(product.stock < qty){
    return res.json({success:false,message:"Out of stock"});
  }

  let total = product.price * qty;
  product.stock -= qty;

  let bill = {
    customer,
    item,
    qty,
    price: product.price,
    total,
    date: new Date().toLocaleString()
  };

  sales.push(bill);

  writeFile(PRODUCT_FILE,products);
  writeFile(SALES_FILE,sales);

  res.json({success:true,bill});
});

/* DASHBOARD */
app.get("/dashboard",(req,res)=>{
  const sales = readFile(SALES_FILE);

  let revenue = 0;
  let customers = new Set();
  let items = {};

  sales.forEach(s=>{
    revenue += s.total;
    customers.add(s.customer);
    items[s.item] = (items[s.item]||0)+s.qty;
  });

  let topItem = Object.keys(items).reduce((a,b)=>
      items[a]>items[b]?a:b , "None");

  res.json({
    revenue,
    customers: customers.size,
    topItem,
    sales
  });
});

app.listen(3000,()=>{
  console.log("Backend running on http://localhost:3000");
});

const express=require('express');
const app=express();
const PORT=3000;
const path = require("path");

//added this for image parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
//
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const cors=require('cors');
app.use(cors());

const db=require('./db');
const itemRoutes=require('./routes/items');
app.use("/items",itemRoutes);


app.get("/",(req,res)=>{
    res.send('backend is running');

});

app.listen(PORT,()=>{
    console.log('Server is running');
});

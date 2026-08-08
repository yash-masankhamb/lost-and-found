const express=require('express');
const router=express.Router();
const db=require('../db');

// router.get("/",(req,res)=>{
//     db.query("SELECT * FROM items",(err,results)=>{
//         if (err) {
//             return res.status(500).json({ message: "Database error" });
//         }

//         res.json(results);
//     });

// });
router.get("/", (req, res) => {
    db.query("SELECT * FROM items", (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        const formattedItems = results.map(item => ({
            id: item.id.toString(),
            name: item.item_name,
            type: item.type.toLowerCase(),
            date: item.date,
            time: item.time,
            location: item.location,
            description: item.description,
            status: item.status,
            image: item.image_url,
            contact: {
                name: item.contact_name,
                email: item.email,
                phone: item.phone
            }
        }));

        res.json(formattedItems);
    });
});
router.post("/",(req,res)=>{
    const {
        item_name,
        type,
        location,
        date,
        time,
        description,
        status,
        image_url,
        contact_name,
        email,
        phone
    }=req.body;
    const sql = `
    INSERT INTO items
    (item_name, type, location, date, time, description, status, image_url, contact_name, email, phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    db.query(sql,[item_name, type, location, date, time, description, status, image_url, contact_name, email, phone],(err,result)=>{
        if (err) {
            console.error("MYSQL ERROR:", err);
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }
        res.status(201).json({
            message: "Item added successfully",
            id: result.insertId
        });
    });

});
// router.get("/:id",(req,res)=>{
//     const id=req.params.id;
//     const sql='SELECT * FROM items WHERE id=?';

//     db.query(sql,[id],(err,results)=>{

//         if(err)
//             {
//                 return res.status(500).json({
//                     message:'Database Error'
//                 });
//             }
//         if(results.length==0)
//             {
//                 return res.status(404).json({
//                     message: "Item not found"
//                 });
//             }
//             res.status(200).json(results[0]);   
//     });

// });
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM items WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        const item = results[0];

        const formattedItem = {
            id: item.id.toString(),
            name: item.item_name,
            type: item.type.toLowerCase(),
            date: item.date,
            time: item.time,
            location: item.location,
            description: item.description,
            status: item.status,
            image: item.image_url,
            contact: {
                name: item.contact_name,
                email: item.email,
                phone: item.phone
            }
        };

        res.json(formattedItem);
    });
});
router.put('/:id',(req,res)=>{
    const id=req.params.id;
    const sql="UPDATE items SET status='Resolved' WHERE id=?";
    db.query(sql,[id],(err,results)=>{
        if(err)
            {
                return res.status(500).json({
                    message:'Database error'
                });
            }
        if(results.affectedRows === 0)
            {
                return res.status(404).json({
                    message:'Record not found'
                });
            }
        res.status(200).json({
            message:'successfully resolved'
        });
    })


});
router.delete('/:id',(req,res)=>{
    const id=req.params.id;
    const sql="DELETE FROM items WHERE id=?";
    db.query(sql,[id],(err,results)=>{
        if(err)
            {
                return res.status(500).json({
                    message: "Database Error"
                });
            }
        if(results.affectedRows === 0)
            {
                return res.status(404).json({
                    message:'item not found'
                });
            }   
            res.status(200).json({
                message: "Item deleted successfully"
            });
    });
});


module.exports = router;


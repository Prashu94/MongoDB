// Exercises
// Find Operation Basic
// 1. Write a query to fetch all the products in shoppers.com inventory
use('exercise_db');
db.products.find({});

// 2. Write a query to fetch all the details of products under the category Mobiles
use('exercise_db');
db.products.find({
    "productCategory.sub": "mobiles"
});

// 3. Write a query to display all the details of product with productId P1001
use('exercise_db');
db.products.find({
    "productId": "P1001"
}, 
{"_id": 0, "productName": 1});

// 4. Write a query to display the name of all the laptops
use('exercise_db');
db.products.find({
    "productCategory.sub": "laptop"
},
{"_id": 0, "productName": 1});

// 5. Write a query to fetch all Home and Furnitures products.
use('exercise_db');
db.products.find({
    "productCategory.main": "Home and Furnitures"
});

// 6. Write a query to fetch all products sold by Voltas
use('exercise_db');
db.products.find({
    "productBrand": "Voltas"
});

// 7. Write a query to display battery details of HP Pavilion Gaming Laptop
use('exercise_db');
db.products.find({
  "productName": "HP Pavilion Gaming Laptop"  
},{"_id": 0, "battery": 1});


// 8. Write a query to display the laptops with 3 battery cells
use('exercise_db');
db.products.find({
    "productCategory.sub": "laptop",
    "battery.cells": 3
});

// 9. Write a query to fetch the price and availability of 3 ton fixed speed Voltas AC
use('exercise_db');
db.products.find(
    {"productBrand": "Voltas"},
    {"_id": 0, "productPrice.fixedspeed.3ton": 1}
);

// 10. Write a query to display the mobiles with battery capacity under 5000
use('exercise_db');
db.products.find({"productCategory.sub":"mobiles",battery: {$lt: 5000}},{productCategory:1,battery:1});

// Find Operations with Comparison and logical operators
// 1. Write a query to display all the products sold by two sellers.
use('exercise_db');
db.products.find(
    {"productSellers": {$size: 2}}
);

// 2. Write a query to display all the mobiles to the users with battery capacity as 4000mAh or more.
use('exercise_db');
db.products.find({"productCategory.sub": "mobiles",
"battery": {$gte: 4000}});

// 3. Write a query to display the name of all the products sold by a seller.
use('exercise_db');
db.products.find(
    {"productSellers": {$size: 1}},
    {"_id": 0, "productName": 1}
);

// 4. Write a query to display only the name of all the mobiles sold by SuperComNet
use('exercise_db');
db.products.find(
    {
        "productCategory.sub": "mobiles",
        "productSellers": "SuperComNet"
    }
);

// 5. Write a query to fetch price of iphone 11 pro with specifications:-  any variant of green color and 128GB hard disk.
use('exercise_db');
db.products.find({
    "productName": "iPhone 11 pro",
    "productPrice": {
        "$elemMatch": {
            "color": {$regex: /.*green.*/, "$options": "i"}
        }
    }
}, {"productPrice.priceArray.128GB.price.$":1,"_id": 0});

// 6.  Write a query to display all the mobiles available with 32 GB Hard Disk in any color
use('exercise_db');
db.products.find({
    "productCategory.sub": "mobiles",
    "productPrice.priceArray.32GB": {$exists: true}
});

// 7. Write a query to fetch all the products under mobiles category . Perform case insensitive search.
use('exercise_db');
db.products.find({
    "productCategory.sub": {$regex: /.*mobiles.*/, $options: "i"}
});
// 8. Write a query to fetch all the products under mobiles and Air Conditioners category. perform case insensitive search.
use('exercise_db');
db.products.find({
    "productCategory.sub": {
            $in : [/.*mobiles.*/i, /.*air.*/i]    }});
//9 . Write a query to fetch the price and availability of 6 seater wooden RoyalOak Rover Dining Set 
use('exercise_db');
db.products.find({
    "productName": "RoyalOak Rover Dining Set",
    "productPrice.wood.6seater": {$exists: true} }, {_id: 0, "productName": 1, "productPrice.wood.6seater.$":1});

//10.  Write a query to identify all the products sold by the seller SMHOMEGALLERY
use('exercise_db');
db.products.find({
    "productSellers": "SMHOMEGALLERY"});

// Update Exercises
// 1. Write a query to update the battery capacity of iPhone 11 pro to 4000.
use('exercise_db');
db.products.find(
    {"productName": "iPhone 11 pro"}
);

use('exercise_db');
db.products.updateOne(
    {"productName": "iPhone 11 pro"},
    {"$set": {"battery": 4000}});

// 2. Write a query to increase the battery capacity of all mobile phones by 10%

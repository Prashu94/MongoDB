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
    { "_id": 0, "productName": 1 });

// 4. Write a query to display the name of all the laptops
use('exercise_db');
db.products.find({
    "productCategory.sub": "laptop"
},
    { "_id": 0, "productName": 1 });

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
}, { "_id": 0, "battery": 1 });


// 8. Write a query to display the laptops with 3 battery cells
use('exercise_db');
db.products.find({
    "productCategory.sub": "laptop",
    "battery.cells": 3
});

// 9. Write a query to fetch the price and availability of 3 ton fixed speed Voltas AC
use('exercise_db');
db.products.find(
    { "productBrand": "Voltas" },
    { "_id": 0, "productPrice.fixedspeed.3ton": 1 }
);

// 10. Write a query to display the mobiles with battery capacity under 5000
use('exercise_db');
db.products.find({ "productCategory.sub": "mobiles", battery: { $lt: 5000 } }, { productCategory: 1, battery: 1 });

// Find Operations with Comparison and logical operators
// 1. Write a query to display all the products sold by two sellers.
use('exercise_db');
db.products.find(
    { "productSellers": { $size: 2 } }
);

// 2. Write a query to display all the mobiles to the users with battery capacity as 4000mAh or more.
use('exercise_db');
db.products.find({
    "productCategory.sub": "mobiles",
    "battery": { $gte: 4000 }
});

// 3. Write a query to display the name of all the products sold by a seller.
use('exercise_db');
db.products.find(
    { "productSellers": { $size: 1 } },
    { "_id": 0, "productName": 1 }
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
            "color": { $regex: /.*green.*/, "$options": "i" }
        }
    }
}, { "productPrice.priceArray.128GB.price.$": 1, "_id": 0 });

// 6.  Write a query to display all the mobiles available with 32 GB Hard Disk in any color
use('exercise_db');
db.products.find({
    "productCategory.sub": "mobiles",
    "productPrice.priceArray.32GB": { $exists: true }
});

// 7. Write a query to fetch all the products under mobiles category . Perform case insensitive search.
use('exercise_db');
db.products.find({
    "productCategory.sub": { $regex: /.*mobiles.*/, $options: "i" }
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
use('exercise_db');
db.products.updateMany(
    {"productCategory.sub": "mobiles"},
    {"$mul": {"battery": 1.1}});

use('exercise_db');
db.products.find({"productCategory.sub": "mobiles"});

// 3. Write a query to add a new seller "All In One Retail Store" to all the air conditioners.
use('exercise_db');
db.products.find({"productCategory.sub": "Air Conditioners"});

use('exercise_db');
db.products.updateMany(
    {"productCategory.sub": "Air Conditioners"},
    {
        "$push": {
            "productSellers": "All In One Retail Store"        }    });

// 4. Write a query to add the seller "SuperComNet" to all the products only if it already does not exist as a seller for that product
use('exercise_db');
db.products.find(
    {
        "productSellers": "SuperComNet"    });

use('exercise_db');
db.products.updateMany(
    {},
    {
        "$addToSet": {
            "productSellers": "SuperComNet"        }    });

// 5. Write a query to add seller "All In One Retail Store" at first index of product sellers array.
use('exercise_db');
db.products.updateMany({},{"$push": {"productSellers": {"$each": ["All In One Retail Store"],"$position":0}}});

use('exercise_db');
db.products.updateMany({}, {"$pull": {"productSellers": "All In One Retail Store"}});

// 9. Write a query to update the OSName of all the laptops to Windows 8 Home
use('exercise_db');
db.products.updateMany({"productCategory.sub":"laptop"},{$set:{"operatingSystem.OSName": "Windows 8 Home"}});
use('exercise_db');
// 10. Write a query to increase the battery by 1000 for all the mobiles sold by "Appario Retail"
db.products.updateMany({$and:[{"productCategory.sub":"mobiles"},{"productSellers":{$in:["Appario Retail"]}}]},{$inc:{"battery" : 1000}});

// Delete Exercise
// 1. Write a query to delete all the products under category Sofa
use('exercise_db');
db.products.find({"productCategory.sub": "Sofa"});

use('exercise_db');
db.products.deleteOne({"productCategory.sub": "Sofa"});

// 2. Write a query to delete all the mobiles with battery capacity less than 5000.
use('exercise_db');
db.products.find({$and:[{"productCategory.sub":"mobiles"},{battery:{$lt:5000}}]});

use('exercise_db');
db.products.deleteMany({$and:[{"productCategory.sub":"mobiles"},{battery:{$lt:5000}}]});

// 3. Write a query to delete all products sold by Voltas
use('exercise_db');
db.products.find({productSellers: {$in:["Voltas"]}});

use('exercise_db');
db.products.deleteMany({productSellers: {$in:["Voltas"]}});

// 4. Write a query to delete the laptops with 3 battery cells
use('exercise_db');
db.products.find({"productCategory.sub": "laptop", "battery.cells": 3});

use('exercise_db');
db.products.deleteMany({"$and": [{"productCategory.sub": "laptop"}, {"battery.cells": 3}]});

// 5. Write a query to delete all the products sold by two sellers.
use('exercise_db');
db.products.find({productSellers: {$in:["two sellers"]}});

use('exercise_db');
db.products.deleteMany({productSellers: {$in:["two sellers"]}});

// 6. Write a query to delete the mobiles sold by SuperComNet
use('exercise_db');
db.products.find({"$and": [{"productCategory.sub": "mobiles"}, {"productSellers": {"$in": ["SuperComNet"]}}]});

use('exercise_db');
db.products.deleteMany({"$and": [{"productCategory.sub": "mobiles"}, {"productSellers": {"$in": ["SuperComNet"]}}]});

// 7. Write a query to delete all the products under sofa and Air Conditioners category.
use('exercise_db');
db.products.find({$or:[{"productCategory.sub":"Sofa"},{"productCategory.sub":"Air Conditioners"}]});

use('exercise_db');
db.products.deleteMany({$or:[{"productCategory.sub":"Sofa"},{"productCategory.sub":"Air Conditioners"}]});

// 8. Write a query to delete all laptops with productProcessor Core i5
use('exercise_db');
db.products.find({$and:[{"productCategory.sub":"laptop"},{"productProcessor.name":"Core i5"}]});

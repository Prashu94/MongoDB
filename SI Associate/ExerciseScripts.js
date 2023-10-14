use('sample_supplies');
// Select All documents from the sales collection
db.sales.find({});
// Find the count of data in the sales collection
db.sales.countDocuments(); // 5000
// Get all the year of saleDate present in the collection.
db.sales.aggregate([{
    $project: {
        year: {$year: "$saleDate"}    }},
{
    $group: {
        "_id": "$year"    }}]);

// Find all the sales that took place in 2017
db.sales.aggregate([
    {
        $project: {
            year: {
                $year: "$saleDate"            }        }    },
    {
        $group: {
            "_id": "$year",
            "no_of_sales": {$sum: 1}        }    },
    {
        $match: {
            "_id": 2017        }    }]);

// Find the count of sales for each sale year
db.sales.aggregate([
    {
        $project: {
            year: {
                $year: "$saleDate"
            }
        }
    },
    {
        $group: {
            "_id": "$year",
            "no_of_sales": {$sum: 1}
        }
    }
]);

// Find all sales that were made by customers who used a coupon and had a customer satisfaction score of 5.
db.sales.find({
    "couponUsed": true,
    "customer.satisfaction": 5});

// Find all sales that included the purchase of a laptop and a printer
db.sales.find({
    "items": {
        $elemMatch: {"name": {$in : ["laptop", "printer"]} }    }});

// Find all sales that were made by customers who had their email address end in ".com".
db.sales.find({
    "customer.email": /.com$/i});

// Find all sales that took place in a store location that had the word "Denver" in the name.
db.sales.find({
    "storeLocation": /denver/i});

// Group by storeLocation
db.sales.aggregate([{
    $project: {
        "storeLocation": 1    }},
{
    $group: {
        "_id": "$storeLocation"    }}]);

// Find all sales that were made by customers who had the tag "stationary" in their purchase history.
db.sales.find({
    "items": {
        $elemMatch: {"tags": "stationary"}    }});

// Find all sales that were made by customers who had the tag "electronics" and the tag "office" in their purchase history.
db.sales.find({
    "items": {
        $elemMatch: {"tags": {$in: ["electronics", "office"]}}
    }
});
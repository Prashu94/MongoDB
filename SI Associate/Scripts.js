db.accounts.find({account_id: 674364})
use('blog');
db.posts.insertMany([
{
    "name": "Prashant Bhat",
    "age": 29}]);
use('library');
db.magazines.insertMany([
{
    "name":"Autosport",
    "published_date": new Date('2023-08-31')}]);
use('students');
// Insert a single documents
db.grades.insertOne({
    student_id: 654321,
    products: [
        {
            type: "exam",
            score: 90        },
        {
            type: "homework",
            score: 59        },
        {
            type: "quiz",
            score: 75        },
        {
            type: "homework",
            score: 78        }    ],
    class_id: 550});

// Insert Many Documents
db.grades.insertMany([
    {
        student_id: 546789,
        products: [
            {
                type: "quiz",
                score: 50            },
            {
                type: "homework",
                score: 70            },
            {
                type: "quiz",
                score: 66            },
            {
                type: "exam",
                score: 70            }        ],
        class_id: 551    },
    {
        student_id: 777777,
        products: [
            {
                type: "exam",
                score: 83            },
            {
                type: "quiz",
                score: 59            },
            {
                type: "quiz",
                score: 72            },
            {
                type: "quiz",
                score: 67            }        ],
        class_id: 550    },
    {
        student_id: 223344,
        products: [
            {
                type: "exam",
                score: 45            },
            {
                type: "homework",
                score: 39            },
            {
                type: "quiz",
                score: 40            },
            {
                type: "homework",
                score: 88            }        ],
        class_id: 551    }]);

// Finding Documents in a MongoDB Collection
// 1. Find a document with Equality
use('sample_training');
db.zips.find({_id: ObjectId("5c8eccc1caa187d17ca6ed16")});

// 2. Find a document by using $in Operator
db.zips.find({city: {$in: ["PHOENIX", "CHICAGO"]}});

// Find Documents by using Comparison Operators
// Review the following comparison operators: $gt, $lt, $lte, $gte
// $gt - use the $gt operator to match documents with a field greater than the given value. 
use('sample_supplies');
// items.price > 50
db.sales.find({"items.price": {$gt: 50}});
// $lt - use the $lt operator match documents with a field less than the given value. For Example
// items.price < 50
db.sales.find({"items.price": {$lt: 50}});
// $lte - use the $lte operator match documents with a field less than equal than the given value. For Example
// customer.age <= 65
db.sales.find({ "customer.age": { $lte: 65}})
// $gte: use the $gte operator to match documents with a field greater than or equal to the given value. For Example:
// customer.age >= 65
db.sales.find({ "customer.age": { $lte: 65}});

// Querying an Array Elements in MongoDB
// Find Documents with an Array That Contains a Specified Value
use('sample_analytics');
// In the following example, "InvestmentFund" is not enclosed in square brackets, so MongoDB returns all documents within the products array
// that contain the specified value.
db.accounts.find({products: "InvestmentFund"});
// Find Document by using the $elemMatch Operator
// Use the $elemMatch operator to find all documents that contain the specified subdocument. For example:
use('sample_supplies');
db.sales.find({
    items: {
        $elemMatch: {name: "laptop", price: {$gt: 800}, quantity: {$gte: 1}}    }});
// Finding Documents by using Logical Operators - $and $or
// 1. Find a Document by using implicit $and: select documents that match multiple expressions.
use('sample_training');
db.routes.find({"airline.name": "Southwest Airlines", stops: {$gte: 1}});
// 2. Find a document by using $or Operator: select documents that match at least one of the included expressions.
use('sample_training');
db.routes.find({
    $or: [{dst_airport: "SEA"}, {src_airport: "SEA"}]});
// 3. Find a document using $and operator
db.routes.find({
    $and: [
        {$or: [{dst_airport: "SEA"}, {src_airport: "SEA"}]},
        {$or: [{"airline.name": "American Airlines"}, {"airplane": 320}]}    ]});


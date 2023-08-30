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
// Replacing a Document in MongoDB
/*
To replace documents in MongoDB, we use the replaceOne() method. The replaceOne() method takes the following parameters:
filter: A query that matches the document to replace.
replacement: The new document to replace the old one with.
options: An object that specifies options for the update.
*/
use('library');
// Find all the data
db.books.find({});

// Find the object_id: 706 in the books collection
db.books.find({_id: 706});

db.books.replaceOne(
    {_id: 706},
    {
        title: "Data Science Fundamentals for Python and MongoDB",
        ISBN: "148235697",
        publishedDate: new Date("2018-5-10"),
        thumbnailURL: "https://m.media-amazon.com/images/I/71opmUBc2wL._AC_UY218_.jpg",
        authors: ["David Paper"],
        categories: ["Data Science"]    });

/*
Exercises replace the bird data where the common_name is Northern Cardinal
*/
use('bird_data');
db.birds.find({"common_name": "Northern Cardinal"});

db.birds.replaceOne(
{_id: ObjectId("6286809e2f3fa87b7d86dccd")},   
{
  "common_name": "Morning Dove",
  "scientific_name": "Zenaida macroura",
  "wingspan_cm": 37.23,
  "habitat": ["urban areas", "farms", "grassland"],
  "diet": ["seeds"],
});



/*
Updating MongoDB documents by using updateOne() 
- The updateOne() method accepts a filter document, and update document, and an optional options object. MongoDB provides update operators
and options to help update documents.
$set - replaces the value of a field with the specified value
*/
// $set
use('library');
db.podcasts.insertMany([
    {
        title: 'The MongoDB Podcast',
        platforms: ['Apple Podcasts', 'Spotify'],
        year: 2022,
        hosts: [''],
        premium_subs: 4152,
        downloads: 2,
        podcast_type: 'audio'
    }
]);

db.podcasts.updateOne(
    {
        _id: ObjectId("64ee14a057af6d96b2e3a4b1")    },
    {
        $set: {
            subscribers: 98562        }    });

db.podcasts.find({title: 'The MongoDB Podcast'});

// $upsert - creates a new document if no document matches the filtered criteria
db.podcasts.updateOne(
    {title: 'The Developer Hub'},
    {$set: {topics: ['databases', 'MongoDB']}});

// $push - creates a new document if no documents match the filtered criteria
db.podcasts.updateOne(
    {_id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8")},
     { $push: { hosts: "Nic Raboy" } });

// Exercise: Update a new field titled tags and set it to an array containing the following strings: geese, herbivore and migration
use('bird_data');
db.birds.findOne({
    "common_name": "Canada Goose"});

db.birds.updateOne({
    _id: ObjectId("6268413c613e55b82d7065d2")},
{
    $set: {tags: ["geese", "herbivore", "migration"]}}
);


// Exercise: Adding Values to an Array
use('bird_data');
db.birds.insertOne({"_id":ObjectId("6268471e613e55b82d7065d7"), "common_name":"Great Horned Owl","scientific_name":"Bubo virginianus","wingspan_cm":{"$numberDouble":"111.76"},"habitat":["grasslands","farmland","tall forest"],"diet":["mice","small mammals","rabbits","shrews"],"last_seen":{"$date":{"$numberLong":"1652991644083"}}});
db.birds.updateOne(
{_id: ObjectId("6268471e613e55b82d7065d7") },
{
    $push: {
        diet: {
            $each: ["newts", "opossum", "skunks", "squirrels"]        }    }});


// Exercise: Return, Update and Add a Document
use('bird_data');
db.birds.find({common_name: "Robin Redbreast"});

db.birds.updateOne({
    common_name: "Robin Redbreast"},
{
    $inc: {
        sightings: 1    },
    $set: {
        last_updated: new Date()    }},
{
    upsert: true}
);
// Importing and exporting
/*
mongodump --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"

mongodump --uri "mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/sample_supplies"
mongorestore --uri “mongodb://localhost:27017/sample_supplies” —drop dump
mongorestore --drop dump/

mongodump --uri "mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/sample_airbnb"
mongorestore --uri “mongodb://localhost:27017/sample_airbnb” —drop dump
mongorestore --drop dump/

mongodump --uri "mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/sample_analytics"
mongorestore --uri “mongodb://localhost:27017/sample_analytics” —drop dump
mongorestore --drop dump/

mongodump --uri "mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/sample_geospatial"
mongorestore --uri “mongodb://localhost:27017/sample_geospatial” —drop dump
mongorestore --drop dump/

mongodump --uri "mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/sample_guides"
mongorestore --uri “mongodb://localhost:27017/sample_guides” —drop dump
mongorestore --drop dump/

mongodump --uri "mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/sample_mflix"
mongorestore --uri “mongodb://localhost:27017/sample_mflix” —drop dump
mongorestore --drop dump/

mongodump --uri "mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/sample_restaurants"
mongorestore --uri “mongodb://localhost:27017/sample_restraunts” —drop dump
mongorestore --drop dump/

mongodump --uri "mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/sample_supplies"
mongorestore --uri “mongodb://localhost:27017/sample_supplies” —drop dump
mongorestore --drop dump/

mongodump --uri "mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/sample_training"
mongorestore --uri “mongodb://localhost:27017/sample_training” —drop dump
mongorestore --drop dump/

mongodump --uri "mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/sample_weatherdata"
mongorestore --uri “mongodb://localhost:27017/sample_weatherdata” —drop dump
mongorestore --drop dump/

mongoexport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --collection=sales --out=sales.json

mongorestore --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"  --drop dump

mongoimport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --drop sales.json*/

/** Documentations to refer
Inserting Documents
MongoDB Docs: insertOne()
MongoDB Docs: insertMany()
Finding Documents
MongoDB Docs: find()
MongoDB Docs: $in
Finding Documents using comparison operator
MongoDB Docs: Comparison Operators
Querying an Array Elements
MongoDB Docs: $elemMatch
MongoDB Docs: Querying Arrays
Finding Documents Using Logical Operators
MongoDB Docs: Logical Operators
*/
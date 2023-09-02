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

/*
Updating MongoDB Documents by Using findAndModify()
- used to find and replace a single document in MongoDB. It accepts a filter document, a replacement document, and an optional options object.
*/
use('library');
db.podcasts.findAndModify({
    query: {_id: ObjectId("6261a92dfee1ff300dc80bf1")},
    update: {$in: {subscribers: 1}},
    new: true});

// Exercise
use('bird_data');
db.birds.find({common_name: "Blue Jay"});
db.birds.findAndModify(
    {
        query: {common_name: "Blue Jay"},
        update: {$inc: {sightings_count: 1}},
        new:true    });

// Update the documents using updateMany()
// To update multiple documents use the updateMany() method. This method accepts a filter document, an update document, and an optional options object
use('library');
db.books.updateMany(    {publishedDate: {$lt: new Date("2019-01-02")}},
    {$set: {status: "LEGACY"}}
);

// Exercise - Updating Multiple Documents
use('bird_data');
db.birds.updateMany(
    {common_name: {$in: ["Blue Jay", "Grackle"]} },
    {$set: {last_seen: new Date("2022-01-01")}});
db.birds.find({common_name: {$in: ["Blue Jay", "Grackle"]}});


/*
Sorting and Limiting Query Results in MongoDB
Syntax:
db.collection.find(<query>).sort(<sort>)
*/
// Example:
// Return data on all music companies, sorted alphabetically from A to Z.
use('sample_training');
db.companies.find({category_code: "music"}).sort({name: 1});
// To ensure documents are returned in a consistent order we should sort by _id field also
db.companies.find({category_code: "music"}).sort({name: 1, _id:1});

// Exercises - Return Query Results in Ascending order
use('sample_supplies');
// Return the data on all sales, ordered by date from oldest to newest
db.sales.findOne(
    {});
db.sales.find({}).sort({sale_date: -1});

db.sales.find({}).sort({sale_date: 1});

db.sales.find({ purchaseMethod: "Online", couponUsed: true}).sort({ saleDate: -1 });

use('sample_training');

db.inspections.find({result: "Pass"}).sort({certificate_number: 1});

use('sample_training');
// Trips taken by subscribers
db.trips.find({usertype: "Subscriber"}).sort({tripDuration: -1}).limit(5);

/*
Returning Specific Data from a Query in MongoDB
1. Add a Projection Document
- To specify fields to include or exclude in the result set, add a projection document as a second parameter in the call to
db.collection.find()
Syntax:
db.collection.find(<query>, <projection>)

Include a field - To include a field, set its value to 1 in the projection document
Syntax:
db.collection.find(<query>, {<field>:1})

Exclude a field - To exclude a field, set its value to 0 in the projection document
Syntax:
db.collection.find(query, {<field>:0, <field>:0})

*/
// Example: Return all restraunt inspections - business name, result, and _id fields only
use('sample_training');
db.inspections.find(
    {sector: "Restaurant - 818"},
    {business_name: 1, result: 1});

// Example: Return all inspections with result of "Pass" or "Warning" - exclude date and zip code
db.inspections.find(
    {result: {$in: ["Pass", "Warning"]}},
    {date: 0, "address.zip": 0});

// Exercises: Return Selected fields, Including the _id field.
use('sample_supplies');
// Query all sales at Denver store. Return only the sale date, store location, purchase_method and _id fields.
db.sales.find({storeLocation: "Denver"}, {_id: 1, purchaseMethod: 1, storeLocation: 1, saleDate: 1});
// Exercises: Return Selected Fields, Excluding the _id field
// Query to find the data on sales to customers less than 30 years old in which the customer statisfication rating was
// greater than 3 . Return only the customer's age and satisfaction rating, the sale date and store location. Do not include
// the _id field.
db.sales.find({
    "customer.age": {$lt: 30},
    "customer.satisfaction": {$gt: 3}}, { "customer.satisfaction": 1, "customer.age": 1, "storeLocation": 1, "saleDate": 1, "_id": 0, });
// Exercises: Return All Fields Except Those Explicitly Excluded
// Find data on sales from the Seatlle and New York stores. Return all data except the purchase method, 
// customer information and whether a coupon was used.
db.sales.find({storeLocation: {$in: ["New York", "Seattle"]}}, {saleDate: 0});

/*
Counting Documents in a MongoDB Collection
1. Count Documents
- Use db.collection.countDocuments() to count the number of the documents that match a query. countDocuments() takes 2 parameters: 
a query document and an options document.
Syntax: 
db.collection.countDocuments(<query>, <options>)
The query selects the documents to be counted.

// Examples:
1. Count number of documents in the trip collection
2. Count the number of trips over 120 minutes by subscribers
*/
use('sample_training');
db.trips.countDocuments();
db.trips.countDocuments({ tripduration: { $gt: 120 }, usertype: "Subscriber" });

// Exercise: Count all the documents in the collection
/*
    Find the total number of documents in the sales collction.
*/
use('sample_supplies');
db.sales.countDocuments();
/*
    Find the number of sales made using a coupon at the Denver location.
*/
db.sales.countDocuments({storeLocation: "Denver"});
/*
    Find the number of sales that included a laptop that cost less than $600
*/
db.sales.countDocuments({ items: { $elemMatch: { name: "laptop", price: { $lt: 600 } } } } );




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

mongoexport --uri="mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/bird_data" --collection=birds --out=sales.json

mongorestore --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"  --drop dump

mongoimport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --drop sales.json

mongoimport --uri="mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/bird_data" --collection=birds --drop bird_data.birds.json
mongoimport --uri="mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/bird_data" --collection=sightings --drop bird_data.sightings.json
mongoimport --uri="mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/library" --collection=books --drop library.books.json
mongoimport --uri="mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/bank" --collection=accounts --drop bank.accounts.json
mongoimport --uri="mongodb+srv://prashant94:Mt3e4GCEx6F4rwgT@cluster0.u2huctx.mongodb.net/bank" --collection=transfers --drop bank.transfers.json
*/

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
MongoDB Docs: replaceOne()
MongoDB Docs: Update Operators
MongoDB Docs: $set
MongoDB Docs: $push
MongoDB Docs: upsert
MongoDB Docs: findAndModify()
MongoDB Docs: updateMany()
MongoDB Docs: deleteOne()
MongoDB Docs: deleteMany()
MongoDB Docs: cursor.sort()
MongoDB Docs: cursor.limit()
MongoDB Docs: Project Fields to Return from Query
MongoDB Docs: Projection Restrictions
MongoDB Docs: db.collection.countDocuments()
*/
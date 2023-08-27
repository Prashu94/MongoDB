/**
CRUD Operations*/
/*
1. Insert:
==================================
i. Insert a single document
- Inserts a single document into a collection
ii. Insert multiple documents
- Inserts multiple documents into a collection. Pass an array of documents to the method 
Note: If the documents do not specify an _id field, MongoDB adds the _id field with an ObjectId value to each document.
- Insert Behaviour:
=========================
i. If the collection does not currently exist, insert operations will create.
ii. _id field acts a primary key.
Additional methods for inserts:
=========================================
i. db.collection.updateOne(): when used with the upsert: true option
ii. db.collection.updateMany(): when used with the upsert: true option
iii. db.collection.findAndModify(): when used with upsert: true option
iv. db.collection.findOneAndUpdate(): when used with upsert: true option.
v. db.collection.findOneAndReplace(): when used with upsert: true option.
vi. db.collection.bulkWrite()
*/
// Insert a Single Document
db.inventory.insertOne(
    { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
);
// Insert multiple documents
db.inventory.insertMany([
    { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
    { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
    { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
]);

/**
2. Update Operations
=============================
i.  Update Documents in a collection
- To update documents in the collection, MongoDB provides update operators as below:
Fields
-----------------------------------------------------------
-> $currentDate: Sets the value of a field to current date, either as a Date or a Timestamp.
-> $inc: increments the value of the field by the specified amount.
-> $min: Only updates the field if the specified value is less than the existing field value.
-> $max: Only updates the field if the specified value is more than the exisiting field value.
-> $mul: Multiplies the value of the field by the specified amount.
-> $rename: Renames a field
-> $set: Sets the value of a field in a document.
-> $setOnInsert: Sets the value of a field if an update results in an insert of a document. Has no affect on update operations that modify existing documents.
-> $unset: Removes the specified field from a document.

Array
----------------------------------------------------------
-> $ - Acts as a placeholder to update the first element that matches the query documents.
-> $[] - Acts as a placeholder to update all elements in an array for the document that match the query condition.
-> $[<identifier>] - Acts as a placeholder to update all elements that match the arrayFilters condition for the documents that match the query condition.
-> $addToSet - Adds elements to an array only if they do no already exist in the set.
-> $pop - Removes the first or last item of an array.
-> $pull - Removes all array elements that match a specified query.
-> $pullAll - Removes all matching values from an array.

Modifiers
----------------------------------------------------------
-> $each - Modifies the $push and $addToSet operators to append multiple items for array updates.
-> $position - Modifies the $push operator to specify the position in the array to add elements.
-> $slice - Modifies the $push operator to limit size of updated arrays.
-> $sort - Modifies the $push operator to reorder documents stored in an array.
*/

// Lecture Examples:
// 1. Find all documents in the zips collection where the zip code is equal to "12434"
db.zips.find({ "zip": "35014" });

// 2. Find all the documents in the zip collection where the city field is equal to "HUDSON"
db.zips.find({ "city": "HUDSON" });

// 3. Find how many documents in the zips collection have the city field as HUDSON
db.zips.find({ "city": "HUDSON" }).count();

// 4. Update all documents in the zips collection where the city field is equal to "HUDSON" by adding 10 to the current value of the "pop" field
db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": 10 } });

// 5. Update a single document in the zips collection where the zip field is equal to "12534" by setting the value of "pop" to 17630
db.zips.find({ zip: "12534" });
db.zips.updateMany({ "zip": "12534" }, { "$set": { "pop": 17630 } });

// 6. Update a single document in the zips collection where the zip field is equal to "12534" by setting the value of the "population" field to 17630.
db.zips.updateOne({ "zip": "12534" }, { "$set": { "population": 17650 } });

// 7. Find all documents in the grades collection where the student_id field is 151 and the class field is 339.
db.grades.find({ "student_id": 151, "class_id": 339 });

// 8. Find all documents in the grades collection where the student_id field is 250 and the class field is 339.
db.grades.find({ "student_id": 250, "class_id": 339 });

// 9. Update one document in the grades collection where the student_id is 250 and the class field is 339, by adding a document element to the "scores" array
db.grades.updateOne({ "student_id": 250, "class_id": 339 },
    {
        "$addToSet": {
            "scores": {
                "type": "extra credit",
                "score": 100
            }
        }
    });


/**
$currentDate: sets the value of a field to the current date.
{$currentDate: {<field1>: <typeSpecification>, ....}} 
<typeSpecification> can be:
- a boolean true to set the field value to the current date as Date or, 
- a document {$type: "timestamp"} or {$type: "date"} which explicitly specifies the type.*/
// Example: Create a sample collection customers with the following document:
db.customers.insertOne(
    { _id: 1, status: 'a', lastModified: ISODate("2013-10-02T01:11:18.965Z") }
);
// Example: Update the customer document by updating the lastModifiedDate field to the current date, 
// the "cancellation.date" field to the current timestamp as well as updating the status field to 
//"D" and the "cancellation.reason" to "user request"
db.customers.updateOne(
    { _id: 1 },
    {
        $currentDate: {
            lastModified: true,
            "cancellation.date": { $type: "timestamp" }
        },
        $set: {
            "cancellation.reason": "user request",
            status: "D"
        }
    }
);

db.customers.find({});


/**
$inc: increments a field by a specified value and has the following form:
{$inc: {<field1>: <amount1>, <field2>: <amount2>}}
- $inc accepts both positive and negative values.
- If the field does not exist, $inc creates the field and sets the field to the specified value.
- use of the $inc operator with a null value will lead to error.
- $inc operation is an atomic operation within a single document.
 */

// EXample:
/**
. increase the "metrics.orders" by 1
. increase the quantity field by -2 */
//db.products.drop();
db.products.insertOne({
    "_id": 1,
    "sku": "abc123",
    "quantity": 10,
    "metrics": {
        "orders": 2,
        "ratings": 3.5
    }
});

db.products.updateOne(
    { "sku": "abc123" },
    { "$inc": { "quantity": -2, "metrics.orders": 1 } }
);

db.products.find({});

/**
$min: updates the values of the field to a specified value if the specified value is less than the current value of the field. 
The $min operator can compare values of different types, using the BSON comparison order 
{$min: {<field1>: <value1>, ...}}
- If the field does not exist, the $min operator sets the value to the specified value
- For comparisons between values of different types, such as a number and a null, $min uses BSON comparison order.
*/
// Examples:
/**
1. The lowScore for the document currently has the value 200. The following operation uses $min to compare 200 to a 
specified value 150 and updates the value of lowScore 200 to 150 since 150 is less than 200.
2. The next operation has no effect since the current value of the field lowScore i.e 150 is less than 250
 */
db.scores.insertOne({ _id: 1, highScore: 800, lowScore: 200 });

db.scores.updateOne(
    { "_id": 1 },
    { $min: { "lowScore": 150 } }
);

db.scores.updateOne(
    { "_id": 1 },
    { $min: { "lowScore": 250 } }
);

db.scores.find({});

/**
Use $min to compare dates
- The following operation compares the current value of the dateEntered field with the specified date to determine whether to update the field.
 */
db.tags.insertOne(
    {
        _id: 1,
        desc: "crafts",
        dateEntered: ISODate("2013-10-01T05:00:00Z"),
        dateExpired: ISODate("2013-10-01T16:38:16Z")
    }
);

db.tags.updateOne(
    { "_id": 1 },
    { $min: { "dateEntered": ISODate("2013-09-25") } }
);

db.tags.find({});


/**
$max: updates the value of the field to a specified value if the specified value is a greater than the current value of the field. 
The $max operator can compare the values of different types, using the BSON comparison order.
{$max: {<field1>:<value1>, ....}} 
- If the field does not exists, the $max operator sets the value to the specified value.
Examples:
- The highscore for the document currently has the value 800. The following operation:
i. Compares the highscore, 800, to the specified value, 950.
ii. Updates the highscore to 950 since 950 is greater than 800.
*/
db.scores.updateOne({ "_id": 1 }, { $max: { highScore: 950 } });

db.scores.find({});

db.tags.updateOne(
    { _id: 1 },
    { $max: { dateExpired: ISODate("2013-09-30") } }
);

/**
$mul: multiply the value of a field by a number.
{$mul: {<field1>: <number1>}} 
- The field to update must contain a numeric value.
- To specify a <field> in an embedded document or in an array, use dot notation
- If the field does not exist in a docuement, $mul create the field and sets the value to zero of the same numeric type as the multiplier
- Examples:
i. Multiply the Value of a field
- The operation below will add the price :0 and multiply the quantity by 2*/
db.products.updateOne({
    "_id": 1
}, {
    $mul: {
        price: 1.25,
        quantity: 2
    }
    });

db.products.find({});

/**
$rename - updates the name of a field and has the following form:
{$rename: {<field1>: <newName1>, ...}} 
- The new field name must differ from the existing field name.To specify a <field> in an embedded document, use a dot notation.
- The $rename operator logically performs an $unset of both the old name and the new name, and then perform $unset operation with the new name. 
As such the operation may no preserve the order of the fields in the document; i.e. the renamed field may move within the document.
- If the document already has the field with the <newName>, the $rename operator removes that field and renames the specified <field> to <newName>
- If the field to rename does not exist in a document, $rename does nothing.
- For fields in embedded documents, the $rename operator can rename these fields as well as move the fields in an out of embedded documents.
*/
db.students.insertMany(
    [
        {
            "_id": 1,
            "alias": ["The American Cincinnatus", "The American Fabius"],
            "mobile": "555-555-5555",
            "nmae": { "first": "george", "last": "washington" }
        },
        {
            "_id": 2,
            "alias": ["My dearest friend"],
            "mobile": "222-222-2222",
            "nmae": { "first": "abigail", "last": "adams" }
        },
        {
            "_id": 3,
            "alias": ["Amazing grace"],
            "mobile": "111-111-1111",
            "nmae": { "first": "grace", "last": "hopper" }
        }
    ]
);

// Rename a field
db.students.updateMany({}, { "$rename": { "nmae": "name" } });

db.students.find({});

// Rename a field in an embedded document
db.students.updateOne({ _id: 1 }, { $rename: { "name.first": "name.fname" } });

db.students.find({});

// Rename a field that does not exist
db.students.updateOne({ _id: 1 }, { $rename: { 'wife': 'spouse' } });

db.students.find({});

/**
$set: operator replaces the value of a field with a specified value.
{$set: {<field1>: <value1>}}
- If the field does not exist, $set will add a new field with a specified value, provided that the new field does not violate a type constraint. If you specify a dotted path for a non-existent field, $set will create the embedded documents as needed to fulfill the dotted path to the field.
- If you specify multiple-field value pairs, $set will update or create each field. */

db.products.drop();

db.products.insertOne(
    {
        _id: 100,
        quantity: 250,
        instock: true,
        reorder: false,
        details: { model: "14QQ", make: "Clothes Corp" },
        tags: ["apparel", "clothing"],
        ratings: [{ by: "Customer007", rating: 4 }]
    }
);

// Set Top-Level Fields
/**
For the document matching the criteria _id equal to 100, 
the following operation uses the $set operator to update the value of the quantity field, details field and tags field. */
db.products.updateOne(
    { _id: 100 },
    {
        $set: {
            quantity: 500,
            details: { model: "2600", make: "Fashionaries" },
            tags: ["coats", "outerwear", "clothing"]
        }
    }
);

db.products.find({});

// Set Fields in Embedded-Documents
/**
- TO specify a field in an embedded document or an array, use dot.notation
- For the document mathcing the criteria _id equal to 100, the following operation updates the make field in the details document. */
db.products.updateOne(
    {
        _id: 100
    },
    {
        $set: { "details.make": "Kustom Kidz" }
    }
);

db.products.find({});


// Set Elements in Array
/**
- For the document matching the criteria _id equal to 100, 
the following operation updates the second element of the array in the tags field and the rating field in the first element of the ratings array */

db.products.updateOne({
    _id: 100
}, {
        $set: {
            "tags.1": "rain gear",
            "ratings.0.rating": 2
        }
    });

db.products.find({});

/**
$setOnInsert - If an update operation with upsert: true results in an insert of a document, 
then $setOnInsert assigns the specified values to the fields in the document. If the update operation does not 
result in an insert then it does nothing.
*/
/**
Example: Insert a new document using db.collections.updateOne() with the upsert:true parameter
*/
db.products.updateOne(
    { _id: 1 },
    {
        $set: {item: "apple"},
        $setOnInsert: {defaultQty: 100}    },
    {
        upsert: true    });

db.products.find({});

/**
$unset - operator deletes a particular field from the collection.
- If the field does not exist, then $unset does nothing.
- When used with $ to match an array element, $unset replaces the mathcing element with null rather than removing the matching element from the array.
*/

/**
Example: Update the first doucment in the products collection where the value of sku is unknown.
*/

//db.products.drop();

db.products.insertMany( [
   { "item": "chisel", "sku": "C001", "quantity": 4, "instock": true },
   { "item": "hammer", "sku": "unknown", "quantity": 3, "instock": true },
   { "item": "nails", "sku": "unknown", "quantity": 100, "instock": true }
] );


db.products.updateOne(
    {sku: "unknown"},
    {$unset: {quantity: "", "instock": ""}});

db.products.find({});



//Array Operators
/**
$ - The positional $ operator identifies an element in an array to update without explicilty specifying the position of the element 
in the array.
{"<array>.$": value}
- When used with update operations:
i. The positional $ operator acts as a placeholder for the first element that matches the query.
ii. The array field must appear as part of the query document.
For instance:
db.collection.updateOne(
    {<array>:value...},
    {<update operator> : {"<array>.$": value}}
)
- Do not use $ with upsert:true operator as inserts will use $ as a field name in the inserted document.
- Nested Arrays: The $ operator cannot be used for queries that traverse more than one array, such as the queries that traverse arrays 
within the nested within arrays, because the replacement for $ placeholder is a single value.
- Unsets: when used with the $unset operator, the $ operator does not remove the mathcing element from the array but rather sets it as null.
- Negations: If the query matches the array using negation operator, then you cannot use the $ operator to update the vaules from this array.
- Multiple Array Matches: The positional $ operator behaves differently when used with multiple array fields.
*/

db.students.drop();

// Examples:
// 1. Update Values in an Array - Update the first element whose value is 80 to 82 in the grades array.
db.students.insertMany([
    {"_id": 1, "grades": [85, 80, 80]},
    {"_id": 2, "grades": [88, 90, 92]},
    {"_id": 3, "grades": [85, 100, 90]}]);

db.students.find({});

db.students.updateOne(
    {_id: 1, grades: 80},
    {"$set": {"grades.$": 82}});

// The positional $ operator acts as a placeholder for the first_match of the update query document.

// 2. Update Documents in an array:
/*
The positional $ operator facilitates updates to arrays that contain emebedded documents. Use the $ 
positional operator to access the fields in the embedded documents with the dot notation on the $ operator.
*/
// Update the std field of the first array element that matches the grade equal to 85 condition.
// Insert document with _id : 4
db.students.insertOne(
{
  _id: 4,
  grades: [
     { grade: 80, mean: 75, std: 8 },
     { grade: 85, mean: 90, std: 5 },
     { grade: 85, mean: 85, std: 8 }
  ]
});

db.students.find({});

db.students.updateOne(
    {_id: 4, "grades.grade": 85},
    {$set: {"grades.$.std": 6}});

/*
3. Update Embedded Documents Using Multiple Field Matches
- The $ operator can update the first array element that matches multiple query criteria specified with the $elemMatch operator.

*/
db.students.insertOne({
    _id: 5,
  grades: [
     { grade: 80, mean: 75, std: 8 },
     { grade: 85, mean: 90, std: 5 },
     { grade: 90, mean: 85, std: 3 }
  ]});

db.students.find({});

// Example: The $operator updates the value of the std field in the first embedded document that has grade field
// with a value <= 90 and a mean field with a value >= 80
db.students.updateOne(
    {
        _id: 5,
        grades: {$elemMatch: {grade: {$lte: 90}, mean: {$gt: 80}}}    },
    {
        $set: {"grades.$.std": 6}    });

/*
4. Update With Multiple Array Matches
- The positional $ update operator behaves ambigously when the query has multiple array fields to filter the documents in the collection.
*/
db.students_deans_list.drop();

db.students_deans_list.insertMany(
    [
        {
            _id: 8,
            activity_ids: [1, 2],
            grades: [90, 95],
            deans_list: [2021, 2020]        }    ]);

db.students_deans_list.find({});
/*
Example: 
The user attempts to modify the deans_list field, filtering documents using the activity_ids, deans_list,
and grades fields, and updating the 2021 value in the deans_list field to 2022
*/
db.students_deans_list.updateOne(
    {activity_ids: 1, grades: 95, deans_list: 2021},
    {
        $set: {
            "deans_list.$[element]": 2022        }    },
    {
        arrayFilters:[{"element":{$eq: 2020}}]    });

/*
When the server executes the updateOne method above, it filters the available documents using values in the supplied array fields.
Although the deans_list field is used in the filter, it is not the field used by the positional $ update operator 
to determine which position in the array to update.
The updateOne method matched the deans_list field on 2021, but the positional 
$ update operator instead changed the 2020 value to 2022.
To avoid unexpected results when matching on multiple arrays, 
instead use the filtered positional operator $[<identifier>]
*/
/*
$[<identifier>]: The filtered positional operator $[<identifier>] identifies the array elements that match the
arrayFilters conditions for an update operation e.g: db.collection.updateMany() and db.collection.findAndModify()
Used in conjuction with the arrayFitlers option, the $[<identifier>] operator has the following form:

{ <update operator>: { "<array>.$[<identifier>]" : value } },
{ arrayFilters: [ { <identifier>: <condition> } ] }

db.collection.updateMany(
   { <query conditions> },
   { <update operator>: { "<array>.$[<identifier>]" : value } },
   { arrayFilters: [ { <identifier>: <condition> } ] }
)
*/
// Examples: 
/*
1. Update All Array Elements That Match arrayFilters
*/
db.students1.insertMany(
    [
        { "_id" : 1, "grades" : [ 95, 92, 90 ]},
        { "_id" : 2, "grades" : [ 98, 100, 102 ]},
        { "_id" : 3, "grades" : [ 95, 110, 100 ]}    ]);
// Update all the elements that are >= 100 in the grades array using $[<identifier>] with the arrayFitlers
db.students1.updateMany(
    {},
    {
        $set: {"grades.$[element]": 100}    },
    {arrayFilters: [{element: {$gte: 100}}]});

db.students1.find({});

/*
2. Update All the elements That Match arrayFilters in an Array
$[<identifier>] operator facilitates updates to arrays that contain embedded documents.
db.collection.updateMany(
   { <query selector> },
   { <update operator>: { "array.$[<identifier>].field" : value } },
   { arrayFilters: [ { <identifier>: <condition> } } ] }
)
*/
db.students2.insertMany([
   {
      "_id" : 1,
      "grades" : [
         { "grade" : 80, "mean" : 75, "std" : 6 },
         { "grade" : 85, "mean" : 90, "std" : 4 },
         { "grade" : 85, "mean" : 85, "std" : 6 }
      ]
   },
   {
      "_id" : 2,
      "grades" : [
         { "grade" : 90, "mean" : 75, "std" : 6 },
         { "grade" : 87, "mean" : 90, "std" : 3 },
         { "grade" : 85, "mean" : 85, "std" : 4 }
      ]
   }
]);

db.students2.updateMany(
    {},
    {$set: {"grades.$[elem].mean": 100}},
    {arrayFilters: [{"elem.grade": {$gte: 85}}]});

db.students2.find({});

/*
3. Update all array elements that match mutiple conditions
*/
db.students3.insertMany(
    [
   {
      "_id" : 1,
      "grades" : [
         { "grade" : 80, "mean" : 75, "std" : 6 },
         { "grade" : 85, "mean" : 100, "std" : 4 },
         { "grade" : 85, "mean" : 100, "std" : 6 }
      ]
   },
   {
      "_id" : 2,
      "grades" : [
         { "grade" : 90, "mean" : 100, "std" : 6 },
         { "grade" : 87, "mean" : 100, "std" : 3 },
         { "grade" : 85, "mean" : 100, "std" : 4 }
      ]
   }
]);

db.students3.find({});

db.students3.updateMany(
    {},
    {$inc: {"grades.$[elem].std": -1}},
    {arrayFilters: [{"elem.grade": {$gte: 80}, "elem.std": {$gt: 5}}]});

/*
4. Update Nested Arrays in Conjuction with $[]
- The $[<identifier>] filtered positional operator, in conjuction with the $[] all positional operator, canbe used to update nested arrays.
*/
db.students4.insertOne(
    {"_id": 1,
      "grades": [
      { type: "quiz", questions: [ 10, 8, 5 ] },
        { type: "quiz", questions: [ 8, 9, 6 ] },
        { type: "hw", questions: [ 5, 4, 3 ] },
        { type: "exam", questions: [ 25, 10, 23, 0 ] },      ]});

db.students4.find({});

db.students4.updateMany(
   {},
   { $inc: { "grades.$[t].questions.$[score]": 2 } },
   { arrayFilters: [ { "t.type": "quiz" }, { "score": { $gte: 8 } } ] }
);

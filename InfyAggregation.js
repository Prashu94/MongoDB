/** Aggregation 
- stages
- expression
- accumulators
-> $match -> $group -> $sort -> $limit

Aggregation Operators
- Stage operator syntax:
{$<stageName>: expression} 
Examples:
{$match: {empId: 101}}
{$group: {_id: "$department"}} - grouping the data as per department field(Aggregation Expressions)
{$match: {_id: "$department", "count": {$sum: 1}}} - $sum (accumulators)
*/
// Single purpose Aggregate function- countDocuments()
// Single purpose Aggregate function- countDocuments()
/**
- Counts the number of documents based on matching condition
- Examples: 
1. Fetch the total number of documents in the employees collection.
2. Fetch the total number of documents in the ETA 
department
3. Exclude the first document while counting and maximum 2 documents should be counted.(options: skip/limit with countDocuments method)
 */
db.employees.countDocuments({});

db.employees.countDocuments({"department": "ETA"});
// Skips the first document and limits the result set to 2 documents
db.employees.countDocuments({}, {skip: 1, limit: 2});

// Single purpose Aggregate Function - distinct()
/**
- Fetch the unique values for a given field in the collection 
- Example: 
1. Fetch all the unique departments from the employees collection
2. Fetch all the unique roles in which the employees work*/
db.employees.distinct("department");

db.employees.distinct("experience.role");

/**
Stage Operators:
1. $match:
- Aggregate method allows us to filter documents by using $match operator.
- Examples:
i. Fetch all the employees who belong to any department.
2. $project:
- Aggregate method allows us to select specific field to be displayed from the collection.
*/
db.employees.aggregate([
    {
        "$match": {
            "department": {"$exists": true}
        }
    }
]);

db.employees.find({"department": {"$exists": true}});

db.employees.find({"department": {"$exists": true}}, 
{"empName": 1, _id: 0});

db.employees.aggregate([
// match the required condition
{$match: {"department": {"$exists": true}}},
// filter out the departments - $project
{$project: {"empName": 1, "_id":0}}]);




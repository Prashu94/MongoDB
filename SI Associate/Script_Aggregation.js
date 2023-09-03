/*
Introduction to MongoDB Aggregation
Aggregation: Collection and summary of data
Stage: One of the built-in methods that can be completed on the data, but does not permanently alter it
Aggergation Pipeline: A series of stages completed on the data in order
*/
// Structure of an Aggregation Pipeline
db.collection.aggregate([
    {
        $stage1: {
            {expression1},
            {expression2}        },
        $stage2: {
            {expression1},
            {expression2}        }    }]);
/*
Using $match and $group Stages in a MongoDB Aggregation Pipeline
$match: filters documents that match specified conditions.
{
    $match: {
        "field_name": "value"
    }
}

$group: stage groups documents by a group key.
{
    $group: 
        {
            _id: <expression>, // Group Key
            <field>: {<accumulator> : <expression>}
        }
}
*/
// Example: Find the documents with a field named "state" that matches a value "CA" and then groups these documents
// by the group key "$city" and shows the total number of zip codes in the state of California
use('sample_training');
db.zips.aggregate([
    {
        $match: {
            state: "CA"        }    },
    {
        $group: {
            _id: "$city",
            totalZips: {$count: {}}        }    }
]);

/*
Exercises: Using the database bird_data with a collection of sightings.
Find out where we should go to see our favourite bird, Eastern Bluebirds. 
We'll use the location co-ordinates (latitude and longitude) and the number of sightings in each location 
to identify the best places to view the Eastern Bluebird
*/
use('bird_data');

db.sightings.aggregate([
  {
    $match: {
        species_common: 'Eastern Bluebird'
    }
  }, {
    $group: {
        _id: '$location.coordinates',
        number_of_sightings: { $count: {} }
    }
  }
]);

/*
Using $sort and $limit Stages in a MongoDB Aggregation Pipeline
1. $sort: this stage sorts all input documents and returns them to the pipeline in stored order. 
We use 1 to represent ascending order, and -1 to represent descending order
{
    
    $sort:{
        "field_name": 1
    }
}
2. $limit: stage returns only a specified number of records
{
    $limit: 5
}
*/
// Example: Sort the zips collection in descending order of pop and limit the result to 5
use('sample_training');
db.zips.aggregate([
    {
        $sort: {
            pop: -1        }    },
    {
        $limit: 5    }
]);

// Exercise: Find the birds that are sighted furthest North
use('bird_data');
db.sightings.aggregate([
  {
    $sort: {
        'location.coordinates.1': -1
    }
  }, {
    $limit: 4
  }
]);

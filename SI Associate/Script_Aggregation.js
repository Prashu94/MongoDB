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

/*
Using $project $count and $set Stages in a MongoDB Aggregation Pipeline
1. $project: stage specifies the fields of the output documents. 1 means that the field should be included, and 0 means
that the field should be supressed. The field can also be assigned a new value
{
    $project: {
        state: 1,
        zip: 1, 
        population: "$pop",
        _id: 0
    }
}

2. $set: stage creates new fields or changes the value of existing fields, and then outputs the documents with the new fields.
{
    $set: {
        place: {
            $concat: ["$city", ",", "$state"]
        },
        pop: 1000
    }
}

$count: stage creates a new document, with the number of documents at that stage in the aggregation pipeline assigned 
to the specified name.
{
    $count: "total_zips"
}
*/
// Exercise: In the database bird_data with a collection of sightings return only the time of sighting and common name of the bird 
// that was sighted
use('bird_data');
db.sightings.aggregate([
{$match: {}},
{$project: {
    "date":1,
    "species_common": 1,
    _id: 0}}
]);

// Exercise: In the database bird_data with collection bird, add a class field and set that field to bird in all of the existing 
// documents in the collection
use('bird_data');
db.birds.aggregate([
    {
        $set: {
            'class': 'bird'        }    }]);

// Exercise: We have a database called bird_data with a collection sightings. We want to see the total number 
// of sightings of Eastern Bluebirds in 2022
use('bird_data');
db.sightings.aggregate([
{
  $match: {
    date: {
      $gt: ISODate('2022-01-01T00:00:00.000Z'),
      $lt: ISODate('2023-01-01T00:00:00.000Z')
    },
    species_common: 'Eastern Bluebird'
  }
}, {
  $count: 'bluebird_sightings_2022'
}
]);

/*
$out: stage to output the value to other collection
*/
use('bird_data');
db.sightings.aggregate([
    {
        $match: {
            date: {
                $gte: ISODate('2022-01-01T00:00:00.0Z'),
                $lt: ISODate('2023-01-01T00:00:00.0Z')            }                }    },
    {
        $out: 'sightings_2022'    }
]);

db.sightings_2022.findOne();

/*
MongoDB Aggregation
In this unit, you learned how to use aggregation in MongoDB and create an aggregation pipeline. You also learned how to use several of the most common aggregation stages, including:

$match

$group

$sort

$limit

$project

$count

$set

$out

Resources
Use the following resources to learn more about inserting and finding documents in MongoDB:

Lesson 01: Introduction to MongoDB Aggregation
MongoDB Docs: Aggregation Operations

MongoDB Docs: Aggregation Pipelines

Lesson 02: Using $match and $group Stages in a MongoDB Aggregation Pipeline
MongoDB Docs: $match

MongoDB Docs: $group

Lesson 03: Using $sort and $limit Stages in a MongoDB Aggregation Pipeline
MongoDB Docs: $sort

MongoDB Docs: $limit

Lesson 04: Using $project, $count, and $set Stages in a MongoDB Aggregation Pipeline
MongoDB Docs: $project

MongoDB Docs: $count

MongoDB Docs: $set

Lesson 05: Using $out Stage in a MongoDB Aggregation Pipeline
MongoDB Docs: $out
*/
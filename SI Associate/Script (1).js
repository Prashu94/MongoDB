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
            {expression2}        }    }])
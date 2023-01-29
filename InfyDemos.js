use('sample_training');
db.employees.insertMany([
    {
        "empId": 1,
        "empName": "John",
        "salary": 40000,
        "department": "ETA",
        "machineId": 1001,
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.7
            },
            {
                "role": "Senior Systems Engineer",
                "roleExperience": 1.8
            },
            {
                "role": "Technology Analyst",
                "roleExperience": 1.3
            }
        ]
    },
    {
        "empId": 2,
        "empName": "Maria",
        "salary": 45000,
        "department": "IVS",
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.7
            },
            {
                "role": "Senior Systems Engineer",
                "roleExperience": 1.6
            },
            {
                "role": "Technology Analyst",
                "roleExperience": 1.1
            }
        ]
    },
    
    {
        "empId": 3,
        "empName": "jack",
        "salary": 43000,
        "department": "ECSADM",
        "machineId": 1002,
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.7
            },
            {
                "role": "Senior Systems Engineer",
                "roleExperience": 1.3
            },
            {
                "role": "Technology Analyst",
                "roleExperience": 0.6
            }
        ]
    }
    
    
    
    ,
    {
        "empId": 4,
        "empName": "Emily",
        "salary": 31000,
        "department": "DX",
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.7
            },
            {
                "role": "Senior Systems Engineer",
                "roleExperience": 0.3
            }
        ]
    },
    {
        "empId": 5,
        "empName": "Steve",
        "salary": 51000,
        "department": "SGTSES",
        "machineId": 1003,
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.7
            },
            {
                "role": "Senior Systems Engineer",
                "roleExperience": 1.3
            },
            {
                "role": "Technology Analyst",
                "roleExperience": 2.6
            },
            {
                "role": "Technology Lead",
                "roleExperience": 0.4
            }
        ]
    },
    {
        "empId": 6,
        "empName": "Stephen",
        "salary": 25000,
        "department": "DXEMP",
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.0
            }
        ]
    },
    {
        "empId": 7,
        "empName": "Kieron",
        "salary": 35000,
        "department": "IND",
        "machineId": 1004,
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.7
            },
            {
                "role": "Senior Systems Engineer",
                "roleExperience": 0.8
            }
        ]
    },
    {
        "empId": 8,
        "empName": "Kyle",
        "salary": 29000,
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.3
            }
        ]
    },
    {
        "empId": 9,
        "empName": "Charles",
        "salary": 49000,
        "machineId": 1005,
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.7
            },
            {
                "role": "Senior Systems Engineer",
                "roleExperience": 1.6
            },
            {
                "role": "Technology Analyst",
                "roleExperience": 1.3
            }
        ]
    },
    {
        "empId": 10,
        "empName": "Robin",
        "salary": 37000,
        "department": "DXEMP",
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.7
            },
            {
                "role": "Senior Systems Engineer",
                "roleExperience": 1.2
            }
        ]
    },
    {
        "empId": 11,
        "empName": "Tom",
        "salary": 54000,
        "department": "IND",
        "machineId": 1006,
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.7
            },
            {
                "role": "Senior Systems Engineer",
                "roleExperience": 1.6
            },
            {
                "role": "Technology Analyst",
                "roleExperience": 1.7
            },
            {
                "role": "Technology Lead",
                "roleExperience": 1.5
            }
        ]
    },
    {
        "empId": 12,
        "empName": "Mark",
        "salary": 28000,
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.2
            }
        ]
    },
    {
        "empId": 13,
        "empName": "Mike",
        "salary": 39000,
        "machineId": 1007,
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 1.7
            },
            {
                "role": "Senior Systems Engineer",
                "roleExperience": 1.8
            },
            {
                "role": "Technology Analyst",
                "roleExperience": 0.3
            }
        ]
    },
    {
        "empId": 14,
        "empName": "Chris",
        "salary": 23000,
        "department": "ETA",
        "machineId": 1008,
        "experience": [
            {
                "role": "Systems Engineer",
                "roleExperience": 0.5
            }
        ]
    }
]
);

// Update queries
use('sample_training');
db.employees.find({});

// UpdateOne
// Update the salary of empId 6 to 42000
use('sample_training');
db.employees.updateOne(
    {"empId": 6},
    {$set: {"salary": 42000}});

use('sample_training');
db.employees.find({"empId": 6});

// UpdateMany
// Update the salary of department ETA to 41000
use('sample_training');
db.employees.find({"department": "ETA"});

use('sample_training');
db.employees.updateMany(
    {"department": "ETA"},
    {"$set": {"salary": 41000}});

// Update
// Update salary of empId 6 to 42000 (using update as updateOne)
use('sample_training');
db.employees.find({"empId": 6});

use('sample_training');
db.employees.update(
    {"empId": 6},
    {"$set": {"salary": 42000}});

// Update the salary of all employees from ETA Department to 41000(using update as updateMany)
use('sample_training');
db.employee.update({“department”:"ETA"}, {$set: {salary:40000}},{$multi:true});

/*
Field Update Operator:
$set, $inc, $mul, $max, $min, $unset
$set - Sets the value of a field document
$inc - Increments the value of the field by a specified amount
$mul - Multiplies the value of the field by the specified amount
$max - Only updates the field if the specified value is less than the existing field value.
$min - Only updates the field if the specified value is greater than the existing field value.
$unset - Removes the specified field of a document.
*/
// Example 1: To increase the salary of all employees from ETA department by 2000
use('sample_training');
db.employees.updateMany(
    {"department": "ETA"},
    {"$inc": {"salary": 2000}});

// Find the updated records
use('sample_training');
db.employees.find({
    "department": "ETA"});


// Example 2: To decrease the salary of all employees from ETA department by 2000
use('sample_training');
db.employees.updateMany(
    {"department": "ETA"},
    {"$inc": {"salary": -2000}});

// Find the updated records
use('sample_training');
db.employees.find({"department": "ETA"});

// Example 3: To increase the salary of all employees from ETA department by 10%
use('sample_training');
db.employees.updateMany(
    {"department": "ETA"},
    {"$mul": {"salary": 1.1}});

// Find all the updated records
use('sample_training');
db.employees.find({"department":"ETA"});

// Example 4: To decrease the salary of all employees from ETA department by 10%
use('sample_training');
db.employees.updateMany(
    {"department": "ETA"},
    {"$mul": {"salary": 0.9}});

// Find all the updated records
use('sample_training');
db.employees.find({"department": "ETA"});

// Example 5: To set the salary as 30000 if the current salary is less than 30000
// Find all the employees less than 30000
use('sample_training');
db.employees.find(
    {"salary": {"$lte": 30000}});
// 2 records updated
use('sample_training');
db.employees.updateMany(
    {},
    {"$max": {"salary": 30000}});

// Example 6: To set the salary as 50000 if the current salary of the employee is greater than 50000
// Find all the employees greater than 50000
use('sample_training');
db.employees.find(
    {"salary": {"$gte": 50000}});
// 2 records updated
use('sample_training');
db.employees.updateMany(
    {},
    {"$min": {"salary": 50000}});

// Example 7: To remove selected fields from a document i.e. Remove department and machineId fields for empId 1
use('sample_training');
db.employees.updateOne(
    {"empId": 1},
    {"$unset": {
        "department": "",
        "machineId": ""    }});

/*
upsert: true
Adds a new field if there is no existing fields in the collection    
*/
// Example: Update the salary of all the employees in department A to 40000. If no employee found for update, add a new record.
use('sample_training');
db.employees.updateMany({"department": "A"}, {$set: {"salary":40000}},{upsert: true});
// Earlier -No Records, After update records addedd
use('sample_training');
db.employees.find({"department": "A"});


/*
Array Update Operators
$push - It is used to add new values inside an array. It does not check whether the value is already present inside 
the array and adds duplicate values also
$addToSet - It is used to add new values inside an array but unlike $push it does not add duplicate values into the array
$each - Operator is used along with $push and $addToSet operators to add multiple values to an array field. When used with $addToSet, it will not
add duplicate values.
$position - Using $push, $addToSet and $each we can add the values only at the last index of existing array. $position operator helps 
us to add the values at our desired index in the array.
$pull - used to remove a single value from an array field.
$pullAll - used to remove multiple values from an array field.
$pop - used to remove one element at a time from the array field either from first and last position(-1|1)
*/
// Example 1 - Add Role Senior Systems Engineer and roleExperience 0.1 into an experience array for empId: 14
use('sample_training');
db.employees.find({"empId": 13});

use('sample_training');
db.employees.updateOne(
    {"empId": 14},
    {
        "$push": {
            "experience": {
                "role": "Senior Systems Engineer",
                "roleExperience": 0.1            }        }    });

// Example 2: Add role Senior Systems Engineer and roleExperience 0.1 into an experience array for empId 14 only if it is 
// already not added.
// Here below query does not add anything.
use('sample_training');
db.employees.updateOne(
    {"empId": 14},
    {
        "$addToSet": {
            "experience": {
                "role": "Senior Systems Engineer",
                "roleExperience": 0.1            }        }    });

// Example 3: Add 2 roles Technology Analyst (1.2 years) and Technology Lead(1.0 year) for empId 14
use('sample_training');
db.employees.updateOne(
    {"empId": 14},
    {
        "$push": {
            "experience": {
                "$each": [
                    {
                        "role": "Technology Analyst",
                        "roleExperience": 1.2                    },
                    {
                        "role": "Technology Lead",
                        "roleExperience": 1.0                    }                ]            }        }    });

// Example 4: Add the role Systems Engineer Trainee with roleExperience 0.4 years at index 0 for empId 14
use('sample_training');
db.employees.update(
    {"empId": 14},
    {"$push": {
        "experience": {
            "$each": [
                {
                    "role": "Systems Engineer Trainee",
                    "roleExperience": 0.4                }            ],
            "$position": 0        }    }});

// Example 5: Remove the role Systems Engineer Trainee with roleExperience 0.4 years for empId 14
use('sample_training');
db.employees.updateOne(
    {"empId": 14},
    {"$pull": {
        "experience": {
            "role": "Systems Engineer Trainee",
            "roleExperience": 0.4        }    }});

// Example 6: Remove the roles System Engineer (1.7 years) and Senior Systems Engineer(1.8 years) for empId 13
use('sample_training');
db.employees.updateOne(
    {"empId": 13},
    {
        "$pullAll": {
            "experience": [
                {
                    "role": "Systems Engineer",
                    "roleExperience": 1.7                },
                {
                    "role": "Senior Systems Engineer",
                    "roleExperience": 1.8                }            ]        }    });

//Example: Remove System Engineers Role of empId 1
use('sample_training');
db.employees.updateOne({empId: 1}, {$pop: {$experience: -1}});
use('sample_training');
db.employees.updateOne( {empId:1}, {$pop:{experience: 1}} );

// Delete Operators
/*
- deleteOne() - deletes only one document
- deleteMany() - deletes multiple documents
*/
// Example: Delete the details of employee with employee id = 4
use('sample_training');
db.employees.deleteOne({empId: 4});
// Example: Delete the details of the employee where department is ETA
use('sample_training');
db.employees.deleteMany({"department": "ETA"});

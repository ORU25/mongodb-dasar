db.createCollection('customers');
db.createCollection('products');
db.createCollection('orders');
db.getCollectionNames();
db.customers.find();

// insert customer
db.customers.insertOne({
    _id: "haykal",
    name: "M Haykal Makhmud"
});

// insert products
db.products.insertMany([
    {
        _id: 1,
        name: "Indomie Goreng",
        price: new NumberLong("2000")
    },
    {
        _id: 2,
        name: "Mie Sedap Soto",
        price: new NumberLong("2000")
    },
]);

// insert order
db.orders.insertOne({
    _id: new ObjectId(),
    total: new NumberLong("8000"),
    items: [
        {
            product_id: 1,
            price: new NumberLong("2000"),
            quantity: new NumberInt("2")
        },
        {
            product_id: 2,
            price: new NumberLong("2000"),
            quantity: new NumberInt("2")
        }
    ]
});


// query document
db.customers.find({
    _id : "haykal"
})
db.customers.find({
    name:   "M Haykal Makhmud"
})
db.products.find({
    price: 2000
})
db.orders.find({
    "items.product_id": 1
})


// comparison operator
db.products.insertMany([
    {
        _id:3,
        name: "Pop Mie Bakso",
        price: new NumberLong("2500"),
        category: "food"
    },
    {
        _id:4,
        name: "Pop Mie Soto",
        price: new NumberLong("2500"),
        category: "food"
    },
    {
        _id: 5,
        name: "Samsung Galaxy S22",
        price: new NumberLong("10000000"),
        category: "Handphone"
    },
    {
        _id: 6,
        name: "Acer Predator XXI",
        price: new NumberLong("25000000"),
        category: "Laptop"
    },
]);

db.customers.find({
    name: {
        $eq: "M Haykal Makhmud"
    }
})

db.products.find({
    price: {
        $gt: 2000
    }
})

db.products.find({
    category: {
        $in : ["Handphone", "Laptop"]
    },
    price : {
        $gt: 10000000
    }
})


// Logical Query Operator
db.products.find({
    $and: [
        {
            category: {
                $in : ["Handphone", "Laptop"]
            },
        },
        {
            price : {
                $gt: 10000000
            }
        }
    ]
})

db.products.find({
    category: {
        $not : {
            $in : ["Handphone", "Laptop"]
        }
    }
})


// element query operator
db.products.find({
    category: {
        $exists: false
    }
})

db.products.find({
    category: {
        $type: "string"
    }
})

db.products.find({
    price: {
        $type: ["int", "long"]
    }
})


// evaluation query operator
db.customers.insertOne({
    _id: "joko",
    name: "joko",
})

db.customers.find({
    $expr: {
        $eq: ["$_id", "$name"]
    }
})

db.products.find({
    $jsonSchema:{
        required: ["name","category"]
    }
})

db.products.find({
    price: {
        $mod: [1000000,0]
    }
})

db.products.find({
    name: {
        $regex: /mie/,
        $options: "i"
    }
})

db.products.find({
    name: {
        $regex: /mie/,
    }
})

db.customers.find({
    $where: function(){
        return this._id == this.name
    }
})


// Array Query Operator
db.products.insertMany([
    {
        _id: 7,
        name: "Logitech Wireless Mouser",
        price: new NumberLong("175000"),
        category: "laptop",
        tags: ["logitech", "mouse", "accessories"]
    },
    {
        _id: 8,
        name: "Coolerpad Gaming",
        price: new NumberLong("200000"),
        category: "laptop",
        tags: ["laptop", "fan", "accessories", "cooler"]
    },
    {
        _id: 9,
        name: "Samsung Curve Monitor",
        price: new NumberLong("1750000"),
        category: "laptop",
        tags: ["samsung", "monitor", "computer"]
    },
])

db.products.find({
    tags: {
        $all: ["samsung","monitor"]
    }
})

db.products.find({
    tags:{
        $elemMatch: {
            $in: ["samsung","logitech"]
        }
    }
})

db.products.find({
    tegs:{
        $size:3
    }
})


// Projection
db.products.find({},{
    name: 1,
    category: 1
})

db.products.find({},{
    tags:0,
    price:0
})

// Projection Operator
db.products.find({},{
    name:1,
    tags: {
        $elemMatch: {
            $in: ["samsung","logitech","accessories"]
        }
    }
})

db.products.find({
    tags: {
        $exists: true
    }
},{
    name:1,
    "tags.$":1
})

db.products.find({
    tags: {
        $exists: true
    }
},{
    name:1,
    tags: {
        $slice: 2
    }
})


// Query Modifier
db.products.find({}).count();
db.products.find({}).limit(4);
db.products.find({}).limit(4).skip(2);

db.products.find({}).sort({
    category: 1,
    name:-1
})
db.products.find({}).sort({
    category: 1,
    name:-1
}).limit(4)


// Update Document
db.products.updateOne({
    _id: 1
},{
    $set: {
        category: "food"
    }
})

db.products.updateOne({
    _id: 2
},{
    $set: {
        category: "food"
    }
})

db.products.updateMany({
    $and: [
        {
            category: {
                $eq: "food"
            }
        },
        {
            tags: {
                $exists: false
            }
        }
    ]
},{
    $set:{
        tags: ["food"]
    }
})

db.products.insertOne({
    _id: 10,
    name: "ups salah",
    wrong: "salah lagi"
})

db.products.replaceOne({
    _id: 10
},{
    name: "Adidas Sepatu Lari Pria",
    price: new NumberLong("1100000"),
    category: "shoes",
    tags: ["adidas", "shoes","running"]
})


// Field Update Operator
db.products.updateMany({},{
    $set: {
        stock: 0
    }
})

db.products.updateMany({},{
    $inc:{
        stock:10
    }
})

db.customers.updateMany({},{
    $rename: {
        name: "full_name"
    }
})

db.customers.updateMany({},{
    $set: {
        wrong: "salah"
    }
})
db.customers.updateMany({},{
    $unset: {
        wrong: ""
    }
})

db.products.updateMany({},{
    $currentDate: {
        lastModifiedDate: {
            $type: "date"
        }
    }
})


// Array Update Operator
db.products.updateMany({},{
    $set:{
        ratings: [90,80,70]
    }
})

db.products.updateMany({
    ratings: 90
},{
    $set: {
        "ratings.$": 100
    }
})

db.products.updateMany({},{
    $set: {
        "ratings.$[]": 100
    }
})

db.products.updateMany({},{
    $set:{
        'ratings.$[element]':100
    }
},{
    arrayFilters: [
        {
            element: {
                $gte: 80
            }
        }
    ]
})

db.products.updateMany({},{
    $set: {
        "ratings.0": 50,
        "ratings.1": 60
    }
})

db.products.updateOne({
    _id: 1
},{
    $addToSet: {
        tags: "popular"
    }
})

db.products.updateOne({
    _id: 1
},{
    $pop: {
        ratings: -1
    }
})

db.products.updateOne({
    _id: 2
},{
    $pop: {
        ratings: 1
    }
})

db.products.updateMany({},{
    $pull: {
        ratings: {
            $gte: 80
        }
    }
})

db.products.updateMany({},{
    $push: {
        ratings: 100
    }
})

db.products.updateMany({},{
    $pullall: {
        ratings: [100]
    }
})

db.products.updateMany({},{
    $push:{
        ratings: {
            $each: [100,200,300]
        }
    }
})

db.products.updateMany({},{
    $addToSet: {
        tags: {
            $each: ["trending","popular"]
        }
    }
})

db.products.updateMany({},{
    $push: {
        tags: {
            $each: ["hot"],
            $position: 1
        }
    }
})

db.products.updateMany({},{
    $push: {
        ratings: {
            $each: [100,200,300,400,500],
            $sort: -1
        }
    }
})


db.products.updateMany({},{
    $push: {
        ratings: {
            $each: [100,200,300,400,500],
            $slice: 10,
            $sort: -1
        }
    }
})


// Delete Document
db.customers.insertOne({
    _id: "spammer",
    full_name: "spammer",
})

db.customers.deleteOne({
    _id: "spammer"
})

db.customers.insertMany([
    {
        _id: "spammer1",
        full_name: "spammer1",
    },
    {
        _id: "spammer2",
        full_name: "spammer2",
    },
    {
        _id: "spammer3",
        full_name: "spammer3",
    },
])

db.customers.deleteMany({
    _id: {
        $regex: 'spammer'
    }
})


// Bulk Write Operation
db.customers.bulkWrite([
    {
        insertOne: {
            document: {
                _id: "joni",
                full_name: "joni"
            }
        }
    },{
        insertOne: {
            document: {
                _id: "makhmud",
                full_name: "makhmud"
            }
        }
    },{
        updateMany: {
            filter: {
                _id: {
                    $in: ["joni","makhmud","joko"]
                }
            },
            update: {
                $set: {
                    full_name: "joko kurniawan"
                }
            }
        }
    }
])


// Indexes

// single index
db.products.createIndex({
    category: 1
})

db.products.dropIndex("category_1")

db.products.find({
    category: "food"
})

db.products.find({
    category: "food"
}).sort({
    category: 1
}).explain()

db.products.find({
    tags: "samsung"
}).explain()

// compound index
db.products.createIndex({
    stock:1,
    tags:1
})

db.products.find({
    stock: 10,
    tags: 'popular'
})

db.products.find({
    stock: 10,
    tags: 'popular'
}).explain()


// Text Indexes
db.products.createIndex({
    name: "text",
    category: "text",
    tags: "text",
},{
    weight:{
        name: 10,
        category: 5,
        tags: 1
    }
})

db.products.find({
    $text: {
        $search: "mie"
    }
})
db.products.find({
    $text: {
        $search: "mie laptop"
    }
})
db.products.find({
    $text: {
        $search: '"mie sedap"'
    }
})
db.products.find({
    $text: {
        $search: "mie -sedap"
    }
})

db.products.find({
    $text: {
        $search: 'mie laptop'
    }
},{
    searchScore:{
        $meta: "textScore"
    }
})


// Wildcard Indexes
db.customers.createIndex({
    "customFields.$**":1
})

db.customers.insertMany([
    {
        _id: "budi",
        full_name: "budi",
        customFields: {
            hobby: "Gaming",
            university: "Universitas Belum Ada"
        }
    },
    {
        _id: "rudi",
        full_name: "rudi",
        customFields: {
            ipk:3.2,
            university: "Universitas Belum Ada"
        }
    },
    {
        _id: "rudeus",
        full_name: "rudeus",
        customFields: {
            motherName: "Tini",
            passion: "Enterpreneur"
        }
    },
])

db.customers.find({
    "customFields.passion" : 'Enterpreneur'
})
db.customers.find({
    "customFields.hobby" : 'Gaming'
})
db.customers.find({
    "customFields.ipk" : 3.2
})


// Index Propertioes
db.createCollection('sessions')

db.sessions.createIndex({
    createdAt: 1,
},{
    expireAfterSeconds: 10
})

db.sessions.insertOne({
    _id: 1,
    session: 'Session 1',
    createdAt: new Date()
})

db.customers.createIndex({
    email: 1
},{
    unique: true,
    sparse: true
})

db.customers.updateOne({
    _id: "joko"
},{
    $set: {
        email: "joko@example.com"
    }
})

db.customers.createIndex({
    full_name: 1,
},{
    collation:{
        locale: "en",
        strength: 2
    }
})

db.customers.find({
    full_name: "m haykal Makhmud"
}).collation({
        locale: "en",
        strength: 2
})

db.products.createIndex({
    price: 1
},{
    partialFilterExpression: {
        stock:{
            $gt: 0
        }
    }
})

db.products.find({
    price: 2500,
    stock: {
        $gt: 0
    }
})


// security
"use admin"

db.createUser({
    user:'mongo',
    pwd:'mongo',
    roles: [
        'userAdminAnyDatabase',
        'readWriteAnyDatabase'
    ]
})

'./bin/mongosh "mongodb://mongo:mongo@localhost:27017/belajar?authsource=admin"'


// User Management

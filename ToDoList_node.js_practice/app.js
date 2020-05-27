const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/todolistDB', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemsSchema);

// const item1 = new Item({
//     name: "Wash car"
// });

// const item2 = new Item({
//     name: "Eat"
// });

// const item3 = new Item({
//     name: "Stydy"
// });

// const defaultItems = [item1, item2, item3];

// app.get('/', function(req, res){
    
//     Item.find({}, function(err, result){
//         if (result.length === 0) {
//             Item.insertMany(defaultItems, function(err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log("Successefully added to the todolistDB");
//                 }
//             });
//             res.redirect('/');
//         } else {
//             res.render('list', {
//                 listTitle: "Today",
//                 newListItems: result
//             });
//         }
//         });
// });

const listSchema = new mongoose.Schema({
    name: String,
    items: [{name: String}]
});

const List = mongoose.model("List", listSchema);


app.get('/', function(req, res){
    Item.find({}, function(err, foundItems){
        if (!err) {
            res.render('list', {listTitle: "Today", newListItems: foundItems});
        }
    });
});

app.get('/:customListName', function(req, res){
    const customListName = _.capitalize(req.params.customListName);
    List.findOne({name: customListName}, function(err, foundList){
        if (!err) {
            if (!foundList) {
                // create a new list
                const list = new List({
                    name: customListName,
                    items: []
                });
                list.save();
                res.redirect('/' + customListName);
            }  else {
               // show an existing list
               res.render('list', {listTitle: foundList.name, newListItems: foundList.items});
            }
        }         
    });
});

app.post('/', function(req, res){
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect('/');
    } else {
        List.findOne({name: listName}, function(err, foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect('/' + listName);
        });
    }
});

app.post('/delete', function(req, res){
    const checkedItemID = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemID, function(err){
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted from todolistDB");
            }
        res.redirect('/');
        });
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemID}}}, function(err, foundList){
            if (!err) {
                res.redirect('/' + listName);
            }
        });
    }
    
});

app.get('/about', function(req ,res){
    res.render('about');
});



app.listen(3000, function(req, res){
    console.log('Server is running on port 3000.');
    
});
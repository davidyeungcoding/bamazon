// ===============
// || VARIABLES ||
// ===============

var mysql = require('mysql');
var inquirer = require ('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'bamazon'
});

// ===============
// || FUNCTIONS ||
// ===============

function landingScreen() {
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id} || Product Name: ${res[i].product_name} || Department: ${res[i].department_name} || Price: ${res[i].price} || Stock: ${res[i].stock_quantity}`);
        }
        purchase();
    })
};

function purchase() {
    inquirer.prompt([
        {
            name: 'item',
            type: 'input',
            message: 'Please input the Item ID for the item you would like to purchase.',
            validate: function(value) {
                if (isNaN(value) === false && value > 0) { // might look into setting a limit of the length of our item list
                    return true;
                }
                return false;
            }
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'How many would you like to order?',
            validate: function(value) {
                if (isNaN(value) === false && value > 0) { // might look into setting a limit of the length of our item list
                    return true;
                }
                return false;
            }
        }
    ]).then(function(itemSelect) {
        connection.query('SELECT * FROM products', function(err, res) {
            if (err) throw err;
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(itemSelect.item)) {
                    chosenItem = res[i];
                }
            }
            if (chosenItem.stock_quantity > 0) {
                connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + itemSelect.quantity + ' WHERE ?', {item_id: itemSelect.item}), function(err, update) {
                    if (err) throw err;
                }
                console.log(`${itemSelect.quantity} order(s) of ${chosenItem.product_name}.`);
                console.log(`Your total comes to : $${chosenItem.price * parseInt(itemSelect.quantity)}`);
            }
            else {
                console.log('Insufficient quantitiy!');
            }
            connection.end();
        })
    });
};

// ================
// || APLICATION ||
// ================

connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connection established with user ID: ${connection.threadId}`);
    landingScreen();
});
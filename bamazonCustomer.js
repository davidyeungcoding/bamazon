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
    connection.query(`SELECT * FROM products`, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id} || Product Name: ${res[i].product_name} || Department: ${res[i].department_name} || Price: ${res[i].price} || Stock: ${res[i].stock_quantity}`);
        }
        purchase();
    })
};

function purchase() {
    inquirer.prompt(
        {
            name: 'item',
            type: 'input',
            message: 'Please input the Item ID for the item you would like to purchase.',
            validate: function(value) {
                if (isNaN(value) === false && value > 0) { // might look into setting a limit of the length of our item list
                    return true;
                }
                if (value === 0) { // migt not work because of the return in previous condition
                    console.log('Cancelling order.')
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
                if (value === 0) { // migt not work because of the return in previous condition
                    console.log('Cancelling order.')
                }
                return false;
            }
        }
    ).then(function(itemSelect) {
        // function for updating the DB with the new stock after purchase
        if (itemSelect.item.stock_quantity > 0) {
            connection.query('UPDATE bamazon SET stock_quantity = stock_quantity - 1 WHERE ?', {item_id: itemSelect.item}), function(err, res) {
                if (err) throw err;
            }
        }
        else {
            console.log('Insufficient quantity!');
        }
        total();
        // connection.query('SELECT * FROM bamazon WHERE ?', {item_id: itemSelect.item}, function(err,res) {
        //     if (err) throw err;
            
        // })
    });
};

function total() {

};

// ================
// || APLICATION ||
// ================

connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connection established with user ID: ${connection.threadId}`);
    landingScreen();
});
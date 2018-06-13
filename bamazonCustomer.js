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
    inquire.prompt(
        {
            name: 'item',
            type: 'input',
            message: 'Please input the Item ID for the item you would like to purchase.'
            // add validation for valid ID entered
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'How many would you like to order?'
            // add validation for number and qunatity under current stock
        }
    ).then(function() {

    })
};

// ================
// || APLICATION ||
// ================

connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connection established with user ID: ${connection.threadId}`);
    landingScreen();
});
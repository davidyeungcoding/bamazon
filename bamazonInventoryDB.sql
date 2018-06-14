DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('System 76 Gazelle', 'Computers', 899.99, 10), 
('TCL 55-inch TV', 'Electronics', 599.99, 5), ('Identity Crisis', 'Books', 19.99, 7), 
('Batman: White Knight', 'Books', 15.99, 0), ('Aldo Mens Hermond', 'Shoes', 42.99, 5), 
('Skin & Earth', 'Music', 9.49, 10), ('Firefly Season 1', 'Movies & TV', 15.99, 15), 
('The Rocketeer', 'Movies & TV', 15.99, 15), ('Toshiba Microwave', 'Home & Kitchen', 89.99, 2), 
('Eyourlife Military Folding Shovel', 'Outdoor', 9.99, 4)
# bamazon
## Initial File Setup:
* Update **variables section** of the **bamazonCustomer.js** file to fit your mySQL server setup.
  * This includes **port** and **password** information.
## Use
* Open the bamazonInventoryDB.sql file in mySQL and initialize the table.
* Open up the bamazonCustomer.js file in a Bash terminal.
* Run the app using the **node bamazonCustomer.js** command.
* This should display the inventory as specified in the bamazonInventoryDB.sql file.
* Follow the prompts as displayed.
  * Entering any invalid characters will not allow you to proceed.
  * Entering a quantity that is greater than what is in stock will prompt an error message and terminate the app.
  * At the end you will be informed of what you've selected, the quantity chosen, and the grand total.
  
  ![App Demo](/images/working_customer_app.jpg)

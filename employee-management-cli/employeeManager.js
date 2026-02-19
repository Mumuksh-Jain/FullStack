const fs = require('fs');
const readline = require('readline');

// File to store employee data
const DATA_FILE = 'employees.json';

// Employee array (in-memory storage)
let employees = [];

// Load employees from file on startup
function loadEmployees() 
{
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            employees = JSON.parse(data);
            console.log(`Loaded ${employees.length} employees from storage.`);
        }
    } catch (error) {
        console.error('Error loading employees:', error.message);
        employees = [];
    }
}

// Save employees to file
function saveEmployees() {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(employees, null, 2));
        console.log('Data saved successfully!');
    } catch (error) {
        console.error('Error saving employees:', error.message);
    }
}

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utility function to ask questions
function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// Validate employee ID (must be positive integer)
function validateId(id) {
    const numId = parseInt(id);
    return !isNaN(numId) && numId > 0;
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate salary (must be positive number)
function validateSalary(salary) {
    const numSalary = parseFloat(salary);
    return !isNaN(numSalary) && numSalary > 0;
}

// CRUD Operations

// CREATE - Add new employee
async function addEmployee() {
    console.log('\n--- Add New Employee ---');
    
    const id = await question('Enter Employee ID: ');
    if (!validateId(id)) {
        console.log('❌ Invalid ID! Must be a positive number.');
        return;
    }
    
    // Check if ID already exists
    if (employees.find(emp => emp.id === parseInt(id))) {
        console.log('❌ Employee with this ID already exists!');
        return;
    }
    
    const name = await question('Enter Employee Name: ');
    if (!name.trim()) {
        console.log('❌ Name cannot be empty!');
        return;
    }
    
    const email = await question('Enter Employee Email: ');
    if (!validateEmail(email)) {
        console.log('❌ Invalid email format!');
        return;
    }
    
    const department = await question('Enter Department: ');
    if (!department.trim()) {
        console.log('❌ Department cannot be empty!');
        return;
    }
    
    const salary = await question('Enter Salary: ');
    if (!validateSalary(salary)) {
        console.log('❌ Invalid salary! Must be a positive number.');
        return;
    }
    
    const employee = {
        id: parseInt(id),
        name: name.trim(),
        email: email.trim(),
        department: department.trim(),
        salary: parseFloat(salary),
        createdAt: new Date().toISOString()
    };
    
    employees.push(employee);
    saveEmployees();
    console.log('✅ Employee added successfully!');
}

// READ - View all employees
function viewAllEmployees() {
    console.log('\n--- All Employees ---');
    
    if (employees.length === 0) {
        console.log('No employees found.');
        return;
    }
    
    console.log('\nID\tName\t\t\tEmail\t\t\tDepartment\tSalary');
    console.log('─'.repeat(100));
    
    employees.forEach(emp => {
        console.log(`${emp.id}\t${emp.name.padEnd(20)}\t${emp.email.padEnd(25)}\t${emp.department.padEnd(15)}\t$${emp.salary}`);
    });
    
    console.log(`\nTotal Employees: ${employees.length}`);
}

// READ - Search employee by ID
async function searchEmployee() {
    console.log('\n--- Search Employee ---');
    
    const id = await question('Enter Employee ID to search: ');
    if (!validateId(id)) {
        console.log('❌ Invalid ID!');
        return;
    }
    
    const employee = employees.find(emp => emp.id === parseInt(id));
    
    if (employee) {
        console.log('\n✅ Employee Found:');
        console.log(`ID: ${employee.id}`);
        console.log(`Name: ${employee.name}`);
        console.log(`Email: ${employee.email}`);
        console.log(`Department: ${employee.department}`);
        console.log(`Salary: $${employee.salary}`);
        console.log(`Created: ${new Date(employee.createdAt).toLocaleString()}`);
    } else {
        console.log('❌ Employee not found!');
    }
}

// UPDATE - Update employee details
async function updateEmployee() {
    console.log('\n--- Update Employee ---');
    
    const id = await question('Enter Employee ID to update: ');
    if (!validateId(id)) {
        console.log('❌ Invalid ID!');
        return;
    }
    
    const index = employees.findIndex(emp => emp.id === parseInt(id));
    
    if (index === -1) {
        console.log('❌ Employee not found!');
        return;
    }
    
    console.log('\nCurrent Details:');
    console.log(employees[index]);
    
    console.log('\nEnter new details (press Enter to keep current value):');
    
    const name = await question(`Name [${employees[index].name}]: `);
    const email = await question(`Email [${employees[index].email}]: `);
    const department = await question(`Department [${employees[index].department}]: `);
    const salary = await question(`Salary [${employees[index].salary}]: `);
    
    // Validate and update only if new value provided
    if (name.trim()) employees[index].name = name.trim();
    
    if (email.trim()) {
        if (validateEmail(email)) {
            employees[index].email = email.trim();
        } else {
            console.log('❌ Invalid email format! Keeping old email.');
        }
    }
    
    if (department.trim()) employees[index].department = department.trim();
    
    if (salary.trim()) {
        if (validateSalary(salary)) {
            employees[index].salary = parseFloat(salary);
        } else {
            console.log('❌ Invalid salary! Keeping old salary.');
        }
    }
    
    employees[index].updatedAt = new Date().toISOString();
    
    saveEmployees();
    console.log('✅ Employee updated successfully!');
}

// DELETE - Remove employee
async function deleteEmployee() {
    console.log('\n--- Delete Employee ---');
    
    const id = await question('Enter Employee ID to delete: ');
    if (!validateId(id)) {
        console.log('❌ Invalid ID!');
        return;
    }
    
    const index = employees.findIndex(emp => emp.id === parseInt(id));
    
    if (index === -1) {
        console.log('❌ Employee not found!');
        return;
    }
    
    console.log('\nEmployee to delete:');
    console.log(employees[index]);
    
    const confirm = await question('\nAre you sure? (yes/no): ');
    
    if (confirm.toLowerCase() === 'yes') {
        employees.splice(index, 1);
        saveEmployees();
        console.log('✅ Employee deleted successfully!');
    } else {
        console.log('❌ Deletion cancelled.');
    }
}

// Display menu
function displayMenu() {
    console.log('\n╔════════════════════════════════════╗');
    console.log('║  Employee Management System       ║');
    console.log('╚════════════════════════════════════╝');
    console.log('1. Add Employee');
    console.log('2. View All Employees');
    console.log('3. Search Employee');
    console.log('4. Update Employee');
    console.log('5. Delete Employee');
    console.log('6. Exit');
    console.log('─'.repeat(38));
}

// Main application loop
async function main() {
    loadEmployees();
    
    let running = true;
    
    while (running) {
        displayMenu();
        const choice = await question('Enter your choice (1-6): ');
        
        switch (choice) {
            case '1':
                await addEmployee();
                break;
            case '2':
                viewAllEmployees();
                break;
            case '3':
                await searchEmployee();
                break;
            case '4':
                await updateEmployee();
                break;
            case '5':
                await deleteEmployee();
                break;
            case '6':
                console.log('\n👋 Thank you for using Employee Management System!');
                running = false;
                rl.close();
                break;
            default:
                console.log('❌ Invalid choice! Please enter 1-6.');
        }
        
        if (running) {
            await question('\nPress Enter to continue...');
        }
    }
}

// Start the application
main();
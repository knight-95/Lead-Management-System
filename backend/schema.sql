-- Lead Table : restaurant's basic details and track its current status

CREATE TABLE Leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurantName VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(15),
    email VARCHAR(255),
    leadStatus ENUM('New', 'Contacted', 'Converted') DEFAULT 'New',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact Table : individual points of contact (POCs) for each restaurant

CREATE TABLE Contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Lead Contacts (Many-to-Many) : lead can have multiple contacts and vice-versa

CREATE TABLE LeadContacts (
    leadId INT,
    contactId INT,
    PRIMARY KEY (leadId, contactId),
    FOREIGN KEY (leadId) REFERENCES Leads(id) ON DELETE CASCADE,
    FOREIGN KEY (contactId) REFERENCES Contacts(id) ON DELETE CASCADE
);

-- Interaction Table : "Tracks all interactions (calls, orders, emails) with the leads. Each interaction will be linked to a specific lead.

CREATE TABLE interactions (
    interaction_id SERIAL PRIMARY KEY,
    lead_id INT NOT NULL,
    interaction_type VARCHAR(50) NOT NULL,  -- E.g., 'Call', 'Order', 'Email'
    interaction_date TIMESTAMP NOT NULL,
    details TEXT, -- Detailed information
    FOREIGN KEY (lead_id) REFERENCES leads(id)
);

-- Call Schedule Table : Tracks the call frequency and schedule for each lead, helps ensure that calls are made based on the defined frequency & monitors the last call made.

CREATE TABLE call_schedules (
    id SERIAL PRIMARY KEY,
    lead_id INT NOT NULL,                   -- Foreign key to 'leads' table
    call_frequency INT NOT NULL,            -- Frequency of calls in days
    last_call_date TIMESTAMP,               -- Date of the last call made
    next_call_date TIMESTAMP,               -- Date of the next scheduled call
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
);


-- Performance Table : Tracks the performance of leads (restaurants) by monitoring order patterns and identifying if an account is underperforming or doing well.

CREATE TABLE performances (
    id SERIAL PRIMARY KEY,
    lead_id INT NOT NULL, -- Foreign key to 'leads' table
    order_frequency INT NOT NULL, -- Orders per week
    last_order_date TIMESTAMP, -- Date of the most recent order
    performance_status VARCHAR(50) NOT NULL, -- E.g., 'Good', 'Underperforming'
    FOREIGN KEY (lead_id) REFERENCES leads(id)
);

-- status (VARCHAR, e.g., "new", "contacted", "follow-up", "closed")

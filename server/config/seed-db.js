/* Initialize the data in the DB */
import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews CASCADE;
            DROP TABLE IF EXISTS restaurants CASCADE;
        `;
        await pool.query(dropTablesQuery);
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try {
        const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name TEXT NOT NULL,
                adress TEXT NULL,
                phone TEXT NOT NULL,
                photo TEXT
            );
    
            CREATE TABLE IF NOT EXISTS reviews (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                rating INT,
                content TEXT NOT NULL,
                restaurant_id INT,
                FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
            );
`;
            
        await pool.query(createTablesQuery);
    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
    try {
        // Insert restaurants
        const insertRestaurantsQuery = `
            INSERT INTO restaurants (name, adress, phone, photo) 
            VALUES 
                ('Wipeout Bar & Grill', 'Pier 39, San Francisco, CA 94133', '+1 415-964-4700', '/images/rest1.jpg'),
                ('DJ Sushi', '450 Broadway, San Francisco, CA 94133-4515', '+1 415-445-2585', '/images/rest2.jpg'),
                ('Fog Harbor Fish House', '39 Pier, San Francisco, CA 94133-1006', '+1 415-969-2010', '/images/rest3.jpg'),
                ('Mersea Restaurant & Bar', '699 Avenue of the Palms Treasure Island, San Francisco, CA 94130', '+1 415-999-9836', '/images/rest4.jpg'),
                ('Waterbar', '399 The Embarcadero, San Francisco, CA 94105-1265', '+1 415-284-9922', '/images/rest5.jpg'),
                ('Fogo de Chão', '201 S. 3rd St Suite 100, San Francisco, CA 94103', '+1 415-427-0004', '/images/rest6.jpg');

            INSERT INTO reviews(rating, content, restaurant_id)
            VALUES 
                (5, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s...', 1),
                (4, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s...', 1),
                (3, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s...', 2),
                (4, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s...', 2)
        `;
        await pool.query(insertRestaurantsQuery);
    } catch (error) {
        console.log(error);
    }
}


const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();
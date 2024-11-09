import { pool } from '../config/database.js';

// Get a list of restaurants
const getRestaurants = async () => {
    const results = await pool.query('SELECT * FROM restaurants');
    return results.rows;
};


// Get a restaurant by id
const getRestaurant = async (id) => {
  const results = await pool.query('SELECT * FROM restaurants WHERE id=$1', [id]);
  return results.rows[0];
};

// Get a review of restaurant by id
const getReviewsForRestaurant = async (id) => {
  const results = await pool.query('SELECT * FROM reviews WHERE restaurant_id=$1', [id]);
  return results.rows;
}

// Create a new restaurant entry
const createRestaurant = async (restaurant) => {
    const { name, adress, phone, photo} = restaurant;
    const results = await pool.query(
      'INSERT INTO restaurants ( name, adress, phone, photo) VALUES ($1, $2, $3, $4) RETURNING *', [name, adress, phone, photo]);
    return results.rows[0];  

};

// Delete a restaurant by id
const deleteRestaurant = async (id) => {
    const results = await pool.query('DELETE FROM restaurants WHERE id = $1' , [id]);
    return results.rows;
    
};

// Update Restaurant data
const updateRestaurant = async (id, updatedData) => {
  const { name, adress, phone, photo } = updatedData;

  const results = await pool.query(
      `UPDATE restaurants
       SET name = $1, adress = $2, phone = $3, photo = $4
       WHERE id = $5
       RETURNING *`,
      [name, adress, phone, photo, id]
  );

  return results.rows[0]; // Return the updated restaurant
};



export { getRestaurants, getRestaurant, getReviewsForRestaurant, createRestaurant, deleteRestaurant, updateRestaurant };

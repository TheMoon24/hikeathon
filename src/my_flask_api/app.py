from flask import Flask, request, jsonify
# from flask import CORS
# import CORS
import sqlite3

import os

# run: (python app.py) to start the server 


app = Flask(__name__)


#-------------------------------------------------------------------------------------

def connection(db_name='../database.db'):
    conn = sqlite3.connect(db_name)
    return conn


# Need to convert the images into binary data before storing it in the database
def convertToBinaryData(filepath):
    with open(filepath, "rb") as file:
        blobData = file.read()
    return blobData

# Revert image back into regular form 
def convertToImage(conn, image_id): 
    cursor = conn.cursor()
    cursor.execute("""
SELECT image_data FROM image WHERE image_id = (?)
""", (image_id))
    conn.commit()
        


def insert_zone(conn, zone_name, zone_radius, zone_latitude, zone_longitude):
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO zone(zone_name, zone_radius, zone_latitude, zone_longitude)
        VALUES (?, ?, ?, ?)
    """, (zone_name, zone_radius, zone_latitude, zone_longitude))
    
    conn.commit()
    zone_id = cursor.lastrowid
    print(f"Inserted zone '{zone_name}' with ID: {zone_id}")
    return zone_id

def insert_landmark(conn, landmark_name, landmark_desc, landmark_longitude, landmark_latitude, zone_id):
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO landmark (landmark_name, landmark_desc, landmark_longitude, landmark_latitude, zone_id)
        VALUES (?, ?, ?, ?, ?)
    """, (landmark_name, landmark_desc, landmark_longitude, landmark_latitude, zone_id))
    
    conn.commit()
    landmark_id = cursor.lastrowid
    print(f"Inserted landmark '{landmark_name}' with ID: {landmark_id}")
    return landmark_id

def insert_image(conn, landmark_id, image_path):
    image_data = convertToBinaryData(image_path)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO image(landmark_id, image_data)
        VALUES (?, ?)
    """, (landmark_id, image_data))
    
    conn.commit()
    image_id = cursor.lastrowid
    print(f"Inserted image for landmark ID {landmark_id} with image ID: {image_id}")





#--------------------------------------------------------#
# conn = connection()
# insert_image(conn, 1, "image1.png")

# Add new landmark 
# @app.route('/insert_landmark', methods=['POST'])
# def add_landmark():
#     data = request.get_json()  # Parse the JSON data from the request body
#     conn = get_db_connection()  # Get a database connection
#     landmark_id = insert_landmark(conn, data['landmark_name'], data['landmark_desc'], data['landmark_latitude'], data['landmark_longitude'], data['zone_id'])  # Call the insert function
#     conn.close()  # Close the database connection
#     return jsonify({"landmark_id": landmark_id}), 201  # Return the ID of the new landmark


# Function to insert a landmark
# def insert_landmark(conn, landmark_name, landmark_desc, landmark_longitude, landmark_latitude, zone_id):
#     cursor = conn.cursor()
#     cursor.execute("""
#         INSERT INTO landmark (landmark_name, landmark_desc, landmark_longitude, landmark_latitude, zone_id)
#         VALUES (?, ?, ?, ?, ?)
#     """, (landmark_name, landmark_desc, landmark_longitude, landmark_latitude, zone_id))
    
#     conn.commit()
#     landmark_id = cursor.lastrowid
#     print(f"Inserted landmark '{landmark_name}' with ID: {landmark_id}")
#     return landmark_id


# Create database connection 
def get_db_connection():
    conn = sqlite3.connect('../database.db')  # Replace with your SQLite .db file path
    conn.row_factory = sqlite3.Row  # This allows us to get results as dictionaries
    return conn


# Get all zones as a list containing json dictionaries
@app.route('/zones', methods=['GET'])
def get_all_zones():
    conn = get_db_connection()
    zones = conn.execute('SELECT * FROM zone').fetchall()
    conn.close()
    
    # Convert rows to list of dictionaries
    zones_dict = [dict(zone) for zone in zones]
    
    return jsonify(zones_dict)


# Route to get all items (READ)
@app.route('/landmarks', methods=['GET'])
def get_landmarks():
    conn = get_db_connection()
    landmarks = conn.execute('SELECT * FROM landmark').fetchall()
    conn.close()
    return jsonify([dict(item) for item in landmarks])

# Get single zone using id
#good
@app.route('/zones/<int:zoneid>', methods=['GET'])
def get_zones(zoneid):
    conn = get_db_connection()
    zone = conn.execute('SELECT * FROM zone WHERE zone_id = ?', (zoneid,)).fetchone()
    conn.close()
    if zone:
        return jsonify(dict(zone))
    return jsonify({"error": "Item not found"}), 404


# def landmarks_in_zone(conn, zone_id, zone_radius):
#     cursor = conn.cursor()
#     (zone_longitude, zone_latitude) = cursor.execute('SELECT zone_longitude, zone_latitude FROM zone WHERE zone_id = ?', (zone_id))

#     all_landmarks = get_landmarks()
#     for x in all_landmarks:
#         print(x)




#--------------------- Somewhat irrelivant functions for now 

# Route to add a new item (CREATE)
@app.route('/items', methods=['POST'])
def add_item():
    data = request.get_json()
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO items (name, description) VALUES (?, ?)',
        (data['name'], data['description'])
    )
    conn.commit()
    new_item_id = conn.execute('SELECT last_insert_rowid()').fetchone()[0]
    new_item = conn.execute('SELECT * FROM items WHERE id = ?', (new_item_id,)).fetchone()
    conn.close()
    return jsonify(dict(new_item)), 201

# Route to update an existing item by ID (UPDATE)
@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.execute(
        'UPDATE items SET name = ?, description = ? WHERE id = ?',
        (data['name'], data['description'], item_id)
    )
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        return jsonify({"error": "Item not found"}), 404
    return jsonify({"message": "Item updated"})

# Route to delete an item by ID (DELETE)
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    conn = get_db_connection()
    cursor = conn.execute('DELETE FROM items WHERE id = ?', (item_id,))
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        return jsonify({"error": "Item not found"}), 404
    return jsonify({"message": "Item deleted"}), 204

#------------------------------------------ 

# Example of using the functions to insert data
    # Connect to the database
#     # Insert a zone
# zone_id = insert_zone(conn, 'Central Zone', 5.0, 40.7128, -74.0060)
# landmark_id = insert_landmark(conn, 'Statue of Liberty', 'A famous landmark in New York', -74.0445, 40.6892, zone_id)
# insert_image(conn, landmark_id, 'path_to_your_image.jpg')


# conn = connection()
# landmarks_in_zone(conn, 1, 50)

# Run the app
if __name__ == '__main__':

    app.run(debug=True)
    

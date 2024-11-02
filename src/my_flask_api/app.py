from flask import Flask, request, jsonify
import sqlite3
import os

app = Flask(__name__)

# Sample data (in-memory storage)
# items = [
#     {"id": 1, "name": "Item 1", "description": "This is the first item"},
#     {"id": 2, "name": "Item 2", "description": "This is the second item"}
# ]

# Helper function to find an item by ID
def find_item(item_id):
    return next((item for item in items if item["id"] == item_id), None)

# Route to get all items (READ)
@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(items)

# Route to get a single item by ID (READ)
@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = find_item(item_id)
    if item:
        return jsonify(item)
    return jsonify({"error": "Item not found"}), 404

# Route to add a new item (CREATE)
@app.route('/items', methods=['POST'])
def add_item():
    data = request.get_json()
    new_item = {
        "id": len(items) + 1,  # Incremental ID
        "name": data.get("name"),
        "description": data.get("description")
    }
    items.append(new_item)
    return jsonify(new_item), 201

# Route to update an existing item by ID (UPDATE)
@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = find_item(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    data = request.get_json()
    item["name"] = data.get("name", item["name"])
    item["description"] = data.get("description", item["description"])
    return jsonify(item)

# Route to delete an item by ID (DELETE)
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = find_item(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    items.remove(item)
    return jsonify({"message": "Item deleted"}), 204

#-------------------------------------------------------------------------------------

# All inserting functions 

def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, "r") as file:
        blobData = file.read()
    return blobData

def convertToImage(blob_data, filename):
    with open(filename, "r"):
        pass

# Function to connect to the database
#Good 
def connection(db_name='src/database.db'):
    conn = sqlite3.connect(db_name)
    return conn

# Function to insert a zone
#Good 
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



# Function to insert a landmark

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

# Function to insert an image
def insert_image(conn, landmark_id, image_path):
    cursor = conn.cursor()
    with open(image_path, 'rb') as file:
        image_data = file.read()
    cursor.execute("""
        INSERT INTO images (landmark_id, image_data)
        VALUES (?, ?)
    """, (landmark_id, image_data))
    
    conn.commit()
    image_id = cursor.lastrowid
    print(f"Inserted image for landmark ID {landmark_id} with image ID: {image_id}")
    return image_id

# Getter functions 

from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Helper function to get a database connection
def get_db_connection():
    conn = sqlite3.connect('../database.db')  # Replace with your SQLite .db file path
    conn.row_factory = sqlite3.Row  # This allows us to get results as dictionaries
    return conn


@app.route('/zones', methods=['GET'])
def get_all_zones():
    conn = get_db_connection()
    zones = conn.execute('SELECT * FROM zone').fetchall()
    conn.close()
    
    # Convert rows to list of dictionaries
    zones_dict = [dict(zone) for zone in zones]
    
    return jsonify(zones_dict)


# Route to get all items (READ)
@app.route('/items', methods=['GET'])
def get_items():
    conn = get_db_connection()
    items = conn.execute('SELECT * FROM items').fetchall()
    conn.close()
    return jsonify([dict(item) for item in items])

# Route to get a single item by ID (READ)
@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    conn = get_db_connection()
    item = conn.execute('SELECT * FROM items WHERE id = ?', (item_id,)).fetchone()
    conn.close()
    if item:
        return jsonify(dict(item))
    return jsonify({"error": "Item not found"}), 404

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

if __name__ == '__main__':
    app.run(debug=True)












# Example of using the functions to insert data
    # Connect to the database
#     # Insert a zone
# zone_id = insert_zone(conn, 'Central Zone', 5.0, 40.7128, -74.0060)
# landmark_id = insert_landmark(conn, 'Statue of Liberty', 'A famous landmark in New York', -74.0445, 40.6892, zone_id)
# insert_image(conn, landmark_id, 'path_to_your_image.jpg')


conn = connection()
conn.close()
print("Database connection closed.")












# Run the app
if __name__ == '__main__':
    app.run(debug=True)

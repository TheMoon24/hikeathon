import sqlite3


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


# Example of using the functions to insert data
    # Connect to the database
#     # Insert a zone
# zone_id = insert_zone(conn, 'Central Zone', 5.0, 40.7128, -74.0060)
# landmark_id = insert_landmark(conn, 'Statue of Liberty', 'A famous landmark in New York', -74.0445, 40.6892, zone_id)
# insert_image(conn, landmark_id, 'path_to_your_image.jpg')


conn = connection()
conn.close()
print("Database connection closed.")
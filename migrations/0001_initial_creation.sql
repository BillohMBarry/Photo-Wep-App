-- Migration number: 0001 	 2026-01-05T16:02:27.830Z
CREATE TABLE image_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    display_name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO image_categories (slug, display_name) VALUES
('nature', 'Nature'),
('technology', 'Technology'),
('architecture', 'Architecture');
CREATE TABLE images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    title TEXT NOT NULL,
    format  TEXT NOT NULL,
    resolution TEXT NOT NULL,
    file_size_bytes INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES image_categories(id)
);
CREATE INDEX IF NOT EXISTS idx_images_created_at ON images(created_at);
INSERT INTO images
(category_id, user_id, image_url, title, format, resolution, file_size_bytes) VALUES
(1, 1, 'https://example.com/images/nature1.jpg', 'Sunset in the Mountains', 'jpg', '600x400', 1024),
(2, 2, 'https://example.com/images/tech1.png', 'Futuristic Cityscape', 'png', '6000x400', 1024),
(3, 3, 'https://example.com/images/arch1.jpg', 'Modern Skyscraper', 'jpg', '600x400', 1024);

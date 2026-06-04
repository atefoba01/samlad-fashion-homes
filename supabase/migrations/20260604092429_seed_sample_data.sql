/*
  # Seed Samlad Fashion Homes Database with Sample Data

  1. Insert 12 trending palettes
  2. Insert 9 gallery posts
  3. Insert 5 reviews
  
  Sample data is based on the palettes.ts data file already in the frontend
*/

-- Insert trending palettes
INSERT INTO palettes (name, description, colors, category, likes_count, is_trending, tags) VALUES
(
  'Royal Elegance',
  'A rich and timeless combination for a royal celebration.',
  '[
    {"hex":"#4B1D4D","rgb":{"r":75,"g":29,"b":77},"name":"Deep Plum"},
    {"hex":"#D4AF37","rgb":{"r":212,"g":175,"b":55},"name":"Antique Gold"},
    {"hex":"#F2C9A7","rgb":{"r":242,"g":201,"b":167},"name":"Peach Blush"},
    {"hex":"#E8E3D6","rgb":{"r":232,"g":227,"b":214},"name":"Champagne"},
    {"hex":"#1F4621","rgb":{"r":31,"g":70,"b":33},"name":"Forest Green"}
  ]'::jsonb,
  'wedding',
  1247,
  true,
  ARRAY['Wedding','Regal','Classic']
),
(
  'Sage & Gold',
  'Earthy tones blended with warm gold for a timeless look.',
  '[
    {"hex":"#2D4A27","rgb":{"r":45,"g":74,"b":39},"name":"Olive Sage"},
    {"hex":"#8A7340","rgb":{"r":138,"g":115,"b":64},"name":"Muted Gold"},
    {"hex":"#C9A84C","rgb":{"r":201,"g":168,"b":76},"name":"Gold"},
    {"hex":"#DDD0B3","rgb":{"r":221,"g":208,"b":179},"name":"Sand"},
    {"hex":"#1A1A1A","rgb":{"r":26,"g":26,"b":26},"name":"Charcoal"}
  ]'::jsonb,
  'traditional',
  982,
  true,
  ARRAY['Traditional','Earthy','Elegant']
),
(
  'Burgundy Luxe',
  'Deep wine tones with champagne highlights — unforgettable.',
  '[
    {"hex":"#6B0F1A","rgb":{"r":107,"g":15,"b":26},"name":"Burgundy"},
    {"hex":"#A22041","rgb":{"r":162,"g":32,"b":65},"name":"Crimson Rose"},
    {"hex":"#D4626A","rgb":{"r":212,"g":98,"b":106},"name":"Dusty Rose"},
    {"hex":"#F5C5A3","rgb":{"r":245,"g":197,"b":163},"name":"Peach"},
    {"hex":"#F5E6D3","rgb":{"r":245,"g":230,"b":211},"name":"Ivory"}
  ]'::jsonb,
  'wedding',
  1540,
  true,
  ARRAY['Wedding','Luxury','Romance']
),
(
  'Navy & Silver',
  'Sophisticated navy with metallic silver accents.',
  '[
    {"hex":"#0A1931","rgb":{"r":10,"g":25,"b":49},"name":"Midnight Navy"},
    {"hex":"#1B3A6B","rgb":{"r":27,"g":58,"b":107},"name":"Royal Blue"},
    {"hex":"#4A6FA5","rgb":{"r":74,"g":111,"b":165},"name":"Steel Blue"},
    {"hex":"#A8A9AD","rgb":{"r":168,"g":169,"b":173},"name":"Silver"},
    {"hex":"#E8E8E8","rgb":{"r":232,"g":232,"b":232},"name":"Pearl"}
  ]'::jsonb,
  'corporate',
  932,
  false,
  ARRAY['Corporate','Formal','Modern']
),
(
  'Terracotta Vibes',
  'Warm African earth tones — vibrant and culturally rich.',
  '[
    {"hex":"#C65D2A","rgb":{"r":198,"g":93,"b":42},"name":"Terracotta"},
    {"hex":"#E8844A","rgb":{"r":232,"g":132,"b":74},"name":"Burnt Orange"},
    {"hex":"#F5A966","rgb":{"r":245,"g":169,"b":102},"name":"Warm Amber"},
    {"hex":"#4D3320","rgb":{"r":77,"g":51,"b":32},"name":"Deep Brown"},
    {"hex":"#F5E6D3","rgb":{"r":245,"g":230,"b":211},"name":"Cream"}
  ]'::jsonb,
  'traditional',
  879,
  false,
  ARRAY['African','Traditional','Warm']
),
(
  'Emerald Royalty',
  'Lush emerald greens with gold — perfect for Aso Ebi.',
  '[
    {"hex":"#064E3B","rgb":{"r":6,"g":78,"b":59},"name":"Forest Emerald"},
    {"hex":"#047857","rgb":{"r":4,"g":120,"b":87},"name":"Deep Emerald"},
    {"hex":"#C9A84C","rgb":{"r":201,"g":168,"b":76},"name":"Gold"},
    {"hex":"#F5E09A","rgb":{"r":245,"g":224,"b":154},"name":"Light Gold"},
    {"hex":"#FFFEF8","rgb":{"r":255,"g":254,"b":248},"name":"Cream White"}
  ]'::jsonb,
  'traditional',
  1103,
  true,
  ARRAY['Aso Ebi','Traditional','Rich']
),
(
  'Coral Sunrise',
  'Bright and joyful — ideal for birthday and baby naming celebrations.',
  '[
    {"hex":"#FF6B6B","rgb":{"r":255,"g":107,"b":107},"name":"Coral Red"},
    {"hex":"#FF8E53","rgb":{"r":255,"g":142,"b":83},"name":"Peach Orange"},
    {"hex":"#FFD166","rgb":{"r":255,"g":209,"b":102},"name":"Sunny Yellow"},
    {"hex":"#06D6A0","rgb":{"r":6,"g":214,"b":160},"name":"Mint Green"},
    {"hex":"#FFFFFF","rgb":{"r":255,"g":255,"b":255},"name":"White"}
  ]'::jsonb,
  'birthday',
  756,
  false,
  ARRAY['Birthday','Celebration','Joyful']
),
(
  'African Sunset',
  'Vibrant African-inspired palette capturing the beauty of West Africa.',
  '[
    {"hex":"#8B1A1A","rgb":{"r":139,"g":26,"b":26},"name":"Deep Red"},
    {"hex":"#C9502B","rgb":{"r":201,"g":80,"b":43},"name":"Brick Orange"},
    {"hex":"#E8A030","rgb":{"r":232,"g":160,"b":48},"name":"Amber Gold"},
    {"hex":"#2D5A1B","rgb":{"r":45,"g":90,"b":27},"name":"Jungle Green"},
    {"hex":"#1A0A05","rgb":{"r":26,"g":10,"b":5},"name":"Ebony"}
  ]'::jsonb,
  'party',
  668,
  false,
  ARRAY['African','Party','Bold']
),
(
  'White & Gold Glam',
  'Classic white with gold accents — the epitome of elegance.',
  '[
    {"hex":"#FFFFFF","rgb":{"r":255,"g":255,"b":255},"name":"Pure White"},
    {"hex":"#F5E6C8","rgb":{"r":245,"g":230,"b":200},"name":"Ivory"},
    {"hex":"#C9A84C","rgb":{"r":201,"g":168,"b":76},"name":"Gold"},
    {"hex":"#D4AF37","rgb":{"r":212,"g":175,"b":55},"name":"Antique Gold"},
    {"hex":"#8B7355","rgb":{"r":139,"g":115,"b":85},"name":"Bronze"}
  ]'::jsonb,
  'wedding',
  1892,
  true,
  ARRAY['Wedding','Glam','Classic']
),
(
  'Midnight Glam',
  'Deep and mysterious — perfect for evening galas and corporate events.',
  '[
    {"hex":"#0D0D0D","rgb":{"r":13,"g":13,"b":13},"name":"Midnight Black"},
    {"hex":"#2D2D2D","rgb":{"r":45,"g":45,"b":45},"name":"Charcoal"},
    {"hex":"#C9A84C","rgb":{"r":201,"g":168,"b":76},"name":"Gold"},
    {"hex":"#B0B0B0","rgb":{"r":176,"g":176,"b":176},"name":"Silver Grey"},
    {"hex":"#F5F5F5","rgb":{"r":245,"g":245,"b":245},"name":"Off White"}
  ]'::jsonb,
  'corporate',
  543,
  false,
  ARRAY['Corporate','Evening','Glam']
),
(
  'Blush Romance',
  'Soft pinks and champagne for dreamy, romantic occasions.',
  '[
    {"hex":"#E8A0BF","rgb":{"r":232,"g":160,"b":191},"name":"Blush Pink"},
    {"hex":"#C9748C","rgb":{"r":201,"g":116,"b":140},"name":"Rose"},
    {"hex":"#F5C6D0","rgb":{"r":245,"g":198,"b":208},"name":"Petal Pink"},
    {"hex":"#F5E6C8","rgb":{"r":245,"g":230,"b":200},"name":"Champagne"},
    {"hex":"#8B4557","rgb":{"r":139,"g":69,"b":87},"name":"Deep Rose"}
  ]'::jsonb,
  'wedding',
  1355,
  true,
  ARRAY['Wedding','Romance','Soft']
),
(
  'Ankara Festival',
  'Bold and vivid — inspired by the vibrant Ankara fabric tradition.',
  '[
    {"hex":"#D62828","rgb":{"r":214,"g":40,"b":40},"name":"Vibrant Red"},
    {"hex":"#F77F00","rgb":{"r":247,"g":127,"b":0},"name":"Bright Orange"},
    {"hex":"#003049","rgb":{"r":0,"g":48,"b":73},"name":"Deep Teal"},
    {"hex":"#FCBF49","rgb":{"r":252,"g":191,"b":73},"name":"Saffron"},
    {"hex":"#EAE2B7","rgb":{"r":234,"g":226,"b":183},"name":"Warm Beige"}
  ]'::jsonb,
  'traditional',
  2105,
  true,
  ARRAY['Ankara','Nigerian','Festival']
);

-- Insert gallery posts
INSERT INTO gallery_posts (title, description, image_url, category, tags) VALUES
('Royal Bridal Collection', 'Exquisite hand-sewn bridal gown with intricate gold embroidery on deep emerald fabric.', 'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=800', 'Wedding', ARRAY['Bridal','Emerald','Gold Embroidery']),
('Yoruba Traditional Attire', 'Stunning agbada set in burgundy and gold for traditional ceremonies.', 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800', 'Traditional', ARRAY['Agbada','Yoruba','Traditional']),
('Ankara Glamour Set', 'Custom Ankara two-piece with matching headgear and accessories.', 'https://images.pexels.com/photos/3943878/pexels-photo-3943878.jpeg?auto=compress&cs=tinysrgb&w=800', 'Casual', ARRAY['Ankara','Casual','Modern']),
('Emerald Aso Ebi', 'Coordinated Aso Ebi set for a wedding party — 20 guests served.', 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=800', 'Aso Ebi', ARRAY['Aso Ebi','Wedding','Emerald']),
('Corporate Chic', 'Tailored power suit in navy and gold for the modern professional.', 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800', 'Corporate', ARRAY['Corporate','Suit','Professional']),
('Birthday Ball Gown', 'Floor-length coral birthday gown with stunning beadwork.', 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800', 'Birthday', ARRAY['Birthday','Gown','Coral']),
('Igbo Bride Look', 'Traditional Igbo bridal ensemble with george fabric and coral beads.', 'https://images.pexels.com/photos/3014853/pexels-photo-3014853.jpeg?auto=compress&cs=tinysrgb&w=800', 'Traditional', ARRAY['Igbo','Bride','George']),
('Evening Dinner Look', 'Glamorous midnight black gown with gold accessories for black-tie events.', 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=800', 'Evening', ARRAY['Evening','Gown','Black Tie']),
('Blush Bridesmaid Collection', 'Coordinated bridesmaid dresses in blush pink and champagne.', 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800', 'Wedding', ARRAY['Bridesmaid','Blush','Wedding']);

-- Insert reviews
INSERT INTO reviews (client_name, review_text, rating, media_url, media_type, event_type) VALUES
('Adaeze Okonkwo', 'Samlad created the most breathtaking wedding outfit I could have imagined. Every detail was perfect, and the color combination was exactly what I envisioned. Highly recommend!', 5, 'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=600', 'photo', 'Wedding'),
('Tunde Adesanya', 'The Aso Ebi coordination for our wedding was flawless. All 30 guests loved their outfits, and the color palette was stunning. Thank you Samlad Fashion!', 5, 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=600', 'photo', 'Wedding'),
('Chidinma Eze', 'My birthday look from Samlad was beyond amazing! The coral gown fit perfectly and I received compliments all night. The attention to detail is unmatched.', 5, 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=600', 'photo', 'Birthday'),
('Funmilayo Bello', 'I used the AI color recommendation for my traditional engagement and the emerald & gold combination was perfect. Got so many compliments. Samlad Fashion is the best!', 5, 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600', 'photo', 'Traditional'),
('Emeka Okafor', 'The corporate suit tailored for me by Samlad exceeded my expectations. The navy blue and gold combination was professional yet stylish. I''ll definitely be back!', 5, 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600', 'photo', 'Corporate');

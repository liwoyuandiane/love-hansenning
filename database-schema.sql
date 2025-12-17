-- 用户表 (Supabase Auth 自动管理)
-- users (id, email, created_at, updated_at)

-- 网站配置表
CREATE TABLE website_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    couple_name_1 VARCHAR(100) DEFAULT '吕XX',
    couple_name_2 VARCHAR(100) DEFAULT '韩XX',
    anniversary_date DATE DEFAULT '2020-01-01',
    music_url VARCHAR(500) DEFAULT 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    background_style JSONB DEFAULT '{"gradient": ["#1a1a2e", "#16213e", "#0f3460"]}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 纪念日表
CREATE TABLE anniversaries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 愿望清单表
CREATE TABLE wishlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 探索地点表
CREATE TABLE explore_locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location_coords JSONB,
    visit_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 照片墙表
CREATE TABLE photo_gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    image_type VARCHAR(20) DEFAULT 'url', -- 'url' or 'upload'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入默认配置
INSERT INTO website_config (couple_name_1, couple_name_2, anniversary_date) 
VALUES ('吕XX', '韩XX', '2020-01-01');

-- 插入默认数据
INSERT INTO anniversaries (title, event_date) VALUES 
('第一次约会', '2020-01-01'),
('第一次旅行', '2020-07-15');

INSERT INTO wishlist (title, description) VALUES 
('一起去马尔代夫', '享受阳光海滩'),
('一起看极光', '在冰岛看极光');

INSERT INTO explore_locations (title, description) VALUES 
('日本京都', '感受古都韵味'),
('巴黎埃菲尔铁塔', '浪漫之都');

INSERT INTO photo_gallery (title, image_url) VALUES 
('我们的开始', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff7e5f"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'),
('第一次旅行', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233498db"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>');

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_website_config_updated_at BEFORE UPDATE ON website_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_anniversaries_updated_at BEFORE UPDATE ON anniversaries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wishlist_updated_at BEFORE UPDATE ON wishlist FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_explore_locations_updated_at BEFORE UPDATE ON explore_locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_photo_gallery_updated_at BEFORE UPDATE ON photo_gallery FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
// init.js

print("🌟 Starting MongoDB Initialization...");

// Connect to the database
db = connect("mongodb://mongodbNonosql:27017/local");

// Initialize "ladensprofiles" collection
try {
    print("📁 Initializing 'ladensprofiles' collection...");
    db.ladensprofiles.drop(); // Drop the collection if it already exists (optional)
    const ladensprofilesData = JSON.parse(cat('/docker-entrypoint-initdb.d/ladensprofiles.json')); // Load JSON data
    db.ladensprofiles.insertMany(ladensprofilesData);
    print("✅ 'ladensprofiles' collection initialized successfully.");
} catch (e) {
    print("❌ Error initializing 'ladensprofiles':", e.message);
}

// Initialize "userprofiles" collection
try {
    print("📁 Initializing 'userprofiles' collection...");
    db.userprofiles.drop(); // Drop the collection if it already exists (optional)
    const userprofilesData = JSON.parse(cat('/docker-entrypoint-initdb.d/userprofiles.json')); 
    db.userprofiles.insertMany(userprofilesData);
    print("✅ 'userprofiles' collection initialized successfully.");
} catch (e) {
    print("❌ Error initializing 'userprofiles':", e.message);
}

print("🎉 MongoDB Initialization Complete!");

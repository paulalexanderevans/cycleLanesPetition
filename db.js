// THIS MODULE HOLDS ALL THE QUERIES WE'LL BE USING TO TALK TO OUR DATABASE

var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/petition"
);

module.exports.getId = () => {
    const q = `SELECT * FROM signatures`;
    return db.query(q);
};

module.exports.getSigners = () => {
    const q = `SELECT first, last, age, city, url FROM users 
    RIGHT JOIN signatures
    ON users.id = signatures.user_id
    JOIN user_profiles
ON users.id = user_profiles.user_id
`;
    return db.query(q);
};

module.exports.getNameAndSignature = (user_id) => {
    const q = `SELECT first, last, signature FROM users
    LEFT JOIN signatures
    ON users.id = signatures.user_id
    WHERE user_id = ($1)`;
    const params = [user_id];
    return db.query(q, params);
};

module.exports.getSignersByCity = (city) => {
    const q = `SELECT first, last, age, city, url FROM users 
    RIGHT JOIN signatures
    ON users.id = signatures.user_id
    JOIN user_profiles
ON users.id = user_profiles.user_id
WHERE city = ($1)
`;
    const params = [city];
    return db.query(q, params);
};

module.exports.getNumberOfSigners = () => {
    const q = `SELECT count (*) FROM signatures`;
    return db.query(q);
};

module.exports.addSignature = (user_id, signature) => {
    const q = `
INSERT into signatures (user_id, signature) 
VALUES ($1, $2) RETURNING id`;
    const params = [user_id, signature];

    return db.query(q, params);
};

module.exports.register = (first, last, email, password) => {
    const q = `
INSERT into users (first, last, email, password) 
VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [first, last, email, password];

    return db.query(q, params);
};

module.exports.updateInfoAndPW = (user_id, first, last, email, password) => {
    const q = `
UPDATE users
SET first = ($2),
last = ($3),
email = ($4),
password = ($5)
WHERE id = ($1)
`;
    const params = [user_id, first, last, email, password];

    return db.query(q, params);
};

module.exports.updateInfoNoPW = (user_id, first, last, email) => {
    const q = `
UPDATE users
SET first = ($2),
last = ($3),
email = ($4)
WHERE id = ($1)
`;
    const params = [user_id, first, last, email];

    return db.query(q, params);
};

module.exports.upsertProfiles = (age, city, url, user_id) => {
    const q = `
INSERT into user_profiles (age, city, url, user_id) 
VALUES ($1, $2, $3, $4)
ON CONFLICT (user_id)
DO UPDATE SET
age = ($1),
city = ($2),
url = ($3)
`;
    const params = [age, city, url, user_id];

    return db.query(q, params);
};

module.exports.addDetails = (age, city, url, user_id) => {
    const q = `
INSERT into user_profiles (age, city, url, user_id) 
VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [age, city, url, user_id];

    return db.query(q, params);
};

module.exports.getUserInfo = (user_id) => {
    const q = `SELECT first, last, email, age, city, url FROM users 
    JOIN user_profiles
ON users.id = user_profiles.user_id
WHERE users.id = ($1)
`;
    const params = [user_id];
    return db.query(q, params);
};

module.exports.getHashedPW = (usersEmail) => {
    // const q = `SELECT * FROM users`;
    const q = `SELECT * FROM users WHERE email = ($1)`;
    const params = [usersEmail];
    return db.query(q, params);
};

module.exports.deleteSignature = (user_id) => {
    const q = `
    DELETE FROM signatures
    WHERE user_id = ($1)`;
    const params = [user_id];
    return db.query(q, params);
};

// INSERT into signatures (first, last, signature)
// VALUES ('Paul', 'Evans', '');

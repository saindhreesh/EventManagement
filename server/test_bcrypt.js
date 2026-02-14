const bcrypt = require('bcryptjs');

async function test() {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log('Salt:', salt);
        const hash = await bcrypt.hash('password123', salt);
        console.log('Hash:', hash);
    } catch (err) {
        console.error('Bcrypt error:', err);
    }
}

test();

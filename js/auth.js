function hashPin(pin) {
    return CryptoJS.MD5(pin).toString();
}

function validatePin(pin) {
    console.log("Attempting to validate PIN...");
    console.log("PIN Length:", pin.length);
    
    const hashedPin = hashPin(pin);
    console.log("Hashed PIN:", hashedPin);
    console.log("Available PINs:", Object.keys(PINS));
    
    if (PINS.hasOwnProperty(hashedPin)) {
        console.log("PIN match found!");
        console.log("Access Levels:", PINS[hashedPin]);
        sessionStorage.setItem('accessLevels', JSON.stringify(PINS[hashedPin]));
        sessionStorage.setItem('authenticated', 'true');
        return true;
    }
    
    console.log("No matching PIN found");
    return false;
}

function checkAuthentication() {
    if (!sessionStorage.getItem('authenticated')) {
        window.location.href = '/index.html';
    }
}

function logout() {
    sessionStorage.clear();
    window.location.href = '/index.html';
}

function hasAccess(level) {
    const accessLevels = JSON.parse(sessionStorage.getItem('accessLevels') || '[]');
    return accessLevels.includes(level);
}

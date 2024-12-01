// Additive Cipher (Caesar Cipher)
function encryptAdditive() {
  var message = document.getElementById("additive-message").value.toLowerCase();
  var key = parseInt(document.getElementById("additive-key").value);
  var encrypted = "";
  for (var i = 0; i < message.length; i++) {
    var char = message[i];
    if (char >= 'a' && char <= 'z') {
      var code = char.charCodeAt(0);
      var encryptedCode = (code - 'a'.charCodeAt(0) + key) % 26 + 'a'.charCodeAt(0);
      encrypted += String.fromCharCode(encryptedCode);
    } else {
      encrypted += char;
    }
  }
  document.getElementById("additive-result").value = encrypted;
}

function decryptAdditive() {
  var message = document.getElementById("additive-message").value.toLowerCase();
  var key = parseInt(document.getElementById("additive-key").value);
  var decrypted = "";
  for (var i = 0; i < message.length; i++) {
    var char = message[i];
    if (char >= 'a' && char <= 'z') {
      var code = char.charCodeAt(0);
      var decryptedCode = (code - 'a'.charCodeAt(0) - key + 26) % 26 + 'a'.charCodeAt(0);
      decrypted += String.fromCharCode(decryptedCode);
    } else {
      decrypted += char;
    }
  }
  document.getElementById("additive-result").value = decrypted;
}

// Multiplicative Cipher

function findMultiplicativeInverse(key) {
  for (var i = 1; i < 26; i++) {
    if ((key * i) % 26 === 1) {
      return i;
    }
  }
  return -1; // No inverse exists
}

function encryptMultiplicative() {
  var message = document.getElementById("multiplicative-message").value.toLowerCase();
  var key = parseInt(document.getElementById("multiplicative-key").value);
  var encrypted = "";
  
  if (findMultiplicativeInverse(key) === -1) {
    document.getElementById("multiplicative-result").value = "Invalid key: No multiplicative inverse exits of your key!";
    return;
  }
  
  for (var i = 0; i < message.length; i++) {
    var char = message[i];
    if (char >= 'a' && char <= 'z') {
      var code = char.charCodeAt(0) - 'a'.charCodeAt(0);
      var encryptedCode = ((code * key) % 26) + 'a'.charCodeAt(0);
      encrypted += String.fromCharCode(encryptedCode);
    } else {
      encrypted += char;
    }
  }
  document.getElementById("multiplicative-result").value = encrypted;
}

function decryptMultiplicative() {
  var message = document.getElementById("multiplicative-message").value.toLowerCase();
  var key = parseInt(document.getElementById("multiplicative-key").value);
  var decrypted = "";
  
  var modInverse = findMultiplicativeInverse(key);
  if (modInverse === -1) {
    document.getElementById("multiplicative-result").value = "Invalid key: No multiplicative inverse exits of your key!";
    return;
  }
  
  for (var i = 0; i < message.length; i++) {
    var char = message[i];
    if (char >= 'a' && char <= 'z') {
      var code = char.charCodeAt(0) - 'a'.charCodeAt(0);
      var decryptedCode = ((code * modInverse) % 26) + 'a'.charCodeAt(0);
      decrypted += String.fromCharCode(decryptedCode);
    } else {
      decrypted += char;
    }
  }
  document.getElementById("multiplicative-result").value = decrypted;
}


// Affine Cipher
function encryptAffine() {
  var message = document.getElementById("affine-message").value.toLowerCase();
  var keyA = parseInt(document.getElementById("affine-key-a").value);
  var keyB = parseInt(document.getElementById("affine-key-b").value);
  var encrypted = "";
  for (var i = 0; i < message.length; i++) {
    var char = message[i];
    if (char >= 'a' && char <= 'z') {
      var code = char.charCodeAt(0);
      var encryptedCode = (keyA * (code - 'a'.charCodeAt(0)) + keyB) % 26 + 'a'.charCodeAt(0);
      encrypted += String.fromCharCode(encryptedCode);
    } else {
      encrypted += char;
    }
  }
  document.getElementById("affine-result").value = encrypted;
}

function decryptAffine() {
  var message = document.getElementById("affine-message").value.toLowerCase();
  var keyA = parseInt(document.getElementById("affine-key-a").value);
  var keyB = parseInt(document.getElementById("affine-key-b").value);
  var modInverse = 0;
  for (var i = 0; i < 26; i++) {
    if ((keyA * i) % 26 === 1) {
      modInverse = i;
      break;
    }
  }
  var decrypted = "";
  for (var i = 0; i < message.length; i++) {
    var char = message[i];
    if (char >= 'a' && char <= 'z') {
      var code = char.charCodeAt(0);
      var decryptedCode = modInverse * (code - 'a'.charCodeAt(0) - keyB + 26) % 26 + 'a'.charCodeAt(0);
      decrypted += String.fromCharCode(decryptedCode);
    } else {
      decrypted += char;
    }
  }
  document.getElementById("affine-result").value = decrypted;
}

// Monoalphabetic Substitution Cipher
function encryptMono() {
  var message = document.getElementById("mono-message").value.toLowerCase();
  var key = document.getElementById("mono-key").value.toLowerCase();
  var encrypted = "";
  for (var i = 0; i < message.length; i++) {
    var char = message[i];
    if (char >= 'a' && char <= 'z') {
      var index = char.charCodeAt(0) - 'a'.charCodeAt(0);
      encrypted += key[index];
    } else {
      encrypted += char;
    }
  }
  document.getElementById("mono-result").value = encrypted;
}

function decryptMono() {
  var message = document.getElementById("mono-message").value.toLowerCase();
  var key = document.getElementById("mono-key").value.toLowerCase();
  var decrypted = "";
  for (var i = 0; i < message.length; i++) {
    var char = message[i];
    var index = key.indexOf(char);
    if (index !== -1) {
      decrypted += String.fromCharCode(index + 'a'.charCodeAt(0));
    } else {
      decrypted += char;
    }
  }
  document.getElementById("mono-result").value = decrypted;
}

// Vigenère Cipher (Polyalphabetic Substitution Cipher)
function encryptVigenere() {
  var message = document.getElementById("vigenere-message").value.toLowerCase();
  var key = document.getElementById("vigenere-key").value.toLowerCase();
  var keyIndex = 0;
  var encrypted = "";
  for (var i = 0; i < message.length; i++) {
    var char = message[i];
    if (char >= 'a' && char <= 'z') {
      var shift = key[keyIndex].charCodeAt(0) - 'a'.charCodeAt(0);
      var code = (char.charCodeAt(0) + shift - 'a'.charCodeAt(0)) % 26 + 'a'.charCodeAt(0);
      encrypted += String.fromCharCode(code);
      keyIndex = (keyIndex + 1) % key.length;
    } else {
      encrypted += char;
    }
  }
  document.getElementById("vigenere-result").value = encrypted;
}

function decryptVigenere() {
  var message = document.getElementById("vigenere-message").value.toLowerCase();
  var key = document.getElementById("vigenere-key").value.toLowerCase();
  var keyIndex = 0;
  var decrypted = "";
  for (var i = 0; i < message.length; i++) {
    var char = message[i];
    if (char >= 'a' && char <= 'z') {
      var shift = key[keyIndex].charCodeAt(0) - 'a'.charCodeAt(0);
      var code = (char.charCodeAt(0) - shift - 'a'.charCodeAt(0) + 26) % 26 + 'a'.charCodeAt(0);
      decrypted += String.fromCharCode(code);
      keyIndex = (keyIndex + 1) % key.length;
    } else {
      decrypted += char;
    }
  }
  document.getElementById("vigenere-result").value = decrypted;
}

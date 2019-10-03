const crypto = require("crypto");

const createSlug = ({ baseName, stringToBeHashed }) => {
  const strippedTitle = baseName.replace(/[^a-zA-Z 0-9 -]+/g, "");
  const sha256 = crypto.createHash("sha256");

  try {
    // Hash the original version obj as a JSON string
    // Convert the hash to base64 ([a-z], [A-Z], [0-9], +, /)
    const hash = sha256.update(stringToBeHashed).digest("base64");

    // This is the  base64 key that corresponds to the given JSON string
    const base64Key = hash.slice(0, 8);

    // Convert base64 to hex string
    const docHash = Buffer.from(base64Key, "base64").toString("hex");

    const docSlug = `${strippedTitle
      .toLowerCase()
      .split(" ")
      .join("-")}-${docHash}`;

    return baseName ? docSlug : docHash;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createSlug
};

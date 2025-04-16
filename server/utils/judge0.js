const axios = require("axios");

const JUDGE0_API = "https://judge0-ce.p.rapidapi.com/submissions";

const headers = {
  "Content-Type": "application/json",
  "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
};

async function runCode({ source_code, language_id, stdin }) {
  const response = await axios.post(
    JUDGE0_API + "?base64_encoded=false&wait=true",
    {
      source_code,
      language_id,
      stdin
    },
    { headers }
  );

  return response.data;
}

module.exports = runCode;

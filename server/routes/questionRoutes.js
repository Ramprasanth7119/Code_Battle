const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.json({
    title: "Total Bill",
    scenario: "You're developing a billing system for a canteen.",
    input_format: "An array of integers",
    output_format: "An integer",
    constraints: "1 ≤ array.length ≤ 1000",
    sample_test_cases: [
      {
        input: "[10, 20, 30]",
        expected_output: "60"
      },
      {
        input: "[5, 8, 45]",
        expected_output: "58"
      }
    ]
  });
});


module.exports = router;

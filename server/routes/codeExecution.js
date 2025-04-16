const express = require("express");
const runCode = require("../utils/judge0");
const router = express.Router();

router.post("/", async (req, res) => {
  const { code, language_id, test_cases } = req.body;

  let passed = 0;
  const results = [];

  for (const test of test_cases) {
    try {
      const result = await runCode({
        source_code: code,
        language_id,
        stdin: test.input
      });

      const output = result.stdout?.trim();
      const expected = test.expected_output.trim();

      results.push({
        input: test.input,
        output,
        expected,
        passed: output === expected
      });

      if (output === expected) passed++;
    } catch (error) {
      results.push({
        input: test.input,
        output: null,
        expected: test.expected_output,
        passed: false,
        error: error.message
      });
    }
  }

  res.json({
    total: test_cases.length,
    passed,
    results
  });
});

module.exports = router;

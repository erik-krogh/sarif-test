import * as Sarif from "sarif";
import * as fs from "fs";

async function main(outFile: string) {
  // makes a fake Sarif log that reports error on the below line. (Line 6, column 3 to column 8)
  const log: Sarif.Log = { // <- written using Copilot
    version: "2.1.0",
    runs: [
      {
        tool: {
          driver: {
            name: "My tool",
            informationUri: "https://www.example.com",
            rules: [
              {
                id: "MyRule",
                name: "My rule",
                helpUri: "https://www.example.com",
                defaultConfiguration: {
                  level: "error",
                },
              },
            ],
          },
        },
        results: [
          {
            ruleId: "MyRule",
            level: "error",
            message: {
              text: "My message",
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uri: "index.ts",
                  },
                  region: {
                    startLine: 6,
                    startColumn: 3,
                    endColumn: 8,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  };

  // writes the log to the output file
  fs.writeFileSync(outFile, JSON.stringify(log, null, 2));
}

// the first argv is the output file path
main(process.argv[2]);
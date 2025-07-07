import dotenv from 'dotenv';
dotenv.config();

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

import {platformPrompts, cleanGeneratedText} from '../promptConfig/platformPrompt.js';


const token = process.env.API_TOKEN;
const endpoint = process.env.API_ENDPOINT;
const model = "openai/gpt-4.1";


export const openaiRoute = async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  const results = {};

  try {
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token)
    );

    for (const [platform, promptPrefix] of Object.entries(platformPrompts)) {
      const response = await client.path("/chat/completions").post({
        body: {
          messages: [
            { role: "system", content: "" },
            { role: "user", content: `${promptPrefix}\n\n${content}` }
          ],
          temperature: 0.9,
          top_p: 1,
          model: model
        }
      });

      if (isUnexpected(response)) {
        throw response.body.error;
      }

      const generated = response.body.choices?.[0]?.message?.content || "No response";
      const mainOutput = generated.replace(promptPrefix, "").trim();
      const rawOutput = mainOutput.replace(content, "").trim();
      const cleanOutput = cleanGeneratedText(rawOutput);
      results[platform] = cleanOutput;
    }

    res.json(results);
    console.log(results);
  } catch (err) {
    console.error("Caption generation failed:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Something went wrong while generating captions." });
    }
  }
}
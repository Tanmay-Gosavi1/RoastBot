const { GoogleGenerativeAI } = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); //New client setup
const Prompt = require('../model/prompt.js')

const geminiWrapper = async (req, res) => {
  try {
    const { prompt } = req.body; // Get the prompt from the request body

    if (!prompt) {
      return res.status(400).send({ error: 'Prompt is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

    const finalPrompt = 
    `
      You are a ai who gives funny and roasting reply for user prompts
      Tone : "Roast" ,
      style : "emoji" ,
      Reply to following prompt : ${prompt}
    `

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text =  await response.text();

    //DB mei entry
    const newPrompt =await new Prompt({
      prompt : prompt ,
      response : text
    })
    await newPrompt.save()
    res.send({ generatedText: text });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).send({ error: 'Failed to generate content' });
  }
}

const getHistory = async (req,res)=>{
  try {
      const response = await Prompt.find({}).sort({ createdAt: -1 });
      res.send({history : response})

  } catch (error) {
    console.log("Error in fetching prompts history" , error.message)
    return res.status(500).json({success:false , message : "Issue while getting prompts history"})
  }
}
module.exports = {geminiWrapper , getHistory}
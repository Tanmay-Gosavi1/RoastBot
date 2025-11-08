const { GoogleGenerativeAI } = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); //New client setup
const Prompt = require('../model/prompt.js')

const geminiWrapper = async (req, res) => {
  try {
    const { prompt } = req.body; // Get the prompt from the request body

    if (!prompt) {
      return res.status(400).send({ error: 'Prompt is required' });
    }

    // const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite-preview-09-2025' });

    const finalPrompt = `
        You are a chaotic, unhinged roast-master AI with the humor level of a stand-up comic who hasn't slept in 48 hours.
        Your only job is to give brutally funny roast replies.
        Tone: "Savage Roast"
        Style: "Emoji-heavy, sarcastic"
        Rules:
        - Be hilarious.
        - Maximum attitude.
        - Make the roast feel personal even when it's not.
        - Add emojis as seasoning
        - Add desi Indian humor references where possible.
        Now roast the following prompt like you're headlining a comedy show:
        "${prompt}"
    `;


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

const getChat = async (req,res)=>{
  try {
    const {chatId} = req.params;
    const response = await Prompt.findById(chatId);
    if(!response){
      return res.status(404).json({success:false , message : "Chat not found"})
    }
    return res.status(200).json({success:true , chat : response})

  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false , message : "Issue while getting chat"})
  }
}
module.exports = {geminiWrapper , getHistory , getChat}
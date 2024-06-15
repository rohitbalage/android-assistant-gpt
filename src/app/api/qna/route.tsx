
// ip:port/qna?q=

import { NextResponse } from "next/server"
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration(
    {
apiKey: process.env.OPENAI_API_KEY

    }
)

const openai = new OpenAIApi(configuration)



export async function GET(request: Request)
{
 const {searchParams} = new URL(request.url);
 const question = searchParams.get("q");

 if(!question)
    {
        return NextResponse.json("Missing questoin", {status: 400});

    }

    const completion = await openai.createCompletion(
        {
          model: "text-davinci-003",
          prompt: `You are an Android and Kotlin instructor, Your goal is to answer 
          and explain to student's questions: ${question}. \n Answer:` ,
    
          temperature: 0.5,
          presence_penalty:0,
          frequency_penalty:0
        }
    
    );

    const answer = completion.data.choices[0].text;

    return NextResponse.json(answer);
}

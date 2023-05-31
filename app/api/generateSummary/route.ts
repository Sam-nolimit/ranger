import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    // todo in the body of the post resquest

    const {todos} = await request.json();
    // console.log(todos)

    //communicate with openAI
    const response = await openai.createChatCompletion({
        model:'gpt-3.5-turbo',
        temperature: 0.8,
        n:1,
        stream:false,
        messages:[
            {
                role:'system',
                content:`when responding, wecome the user always as
                 Mr. Sam and say Welcome to the ATWS ranger App! 
                 Limit the response to 200 characters `,
            },
            {
                role:'user',
                content:`Hi there provide a summary of the follwoing todos,
                Count how many todos are in each categories such as Todo, 
                Inprogess and Done, then tell he user to have a productive day! Here is the data: ${JSON.stringify(
                    todos
                )}`
            }
        ]
    });
    const {data} = response;
    // console.log("DATA is:",data);
    // console.log(data.choices[0].message);
    
    return NextResponse.json(data.choices[0].message);
}
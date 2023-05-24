// export async function fetchOpenAiCompletion(prompt, model, dispatch, router) {
//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: model,
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//       stream: true,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`API request failed: ${response.statusText}`);
//   }

//   // Redirect to the read-article page
//   router.push("/read-article");

//   const reader = response.body.getReader();
//   let partialText = "";

//   while (true) {
//     const { value, done } = await reader.read();
//     if (done) {
//       break;
//     }

//     partialText += new TextDecoder().decode(value);
//     console.log(partialText);

//     const partialData = JSON.parse(partialText);
//     console.log("partialData" + partialData);
// dispatch({ type: 'SET_BLOG_DATA', payload: partialData.choices[0].delta?.content || '' });
//     partialText = "";
//   }
// }

export async function fetchOpenAiCompletion(prompt, model, dispatch) {
  dispatch({ type: "CLEAR_STATE" });
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const reader = response.body.getReader();
  let partialText = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    partialText += new TextDecoder().decode(value);

    // New: Split the text on newline characters
    const lines = partialText.split("\n");

    // Parse each JSON line individually
    for (const line of lines) {
      if (line.trim() !== "") {
        // Remove the 'data: ' prefix
        const validJson = line.replace("data: ", "");
        if(validJson == "[DONE]"){
            break;
        }

        try {
          const parsed = JSON.parse(validJson);
          dispatch({
            type: "SET_BLOG_DATA",
            payload: parsed.choices[0].delta?.content || "",
          });
          console.log(parsed);
        } catch (error) {
          console.error("Error parsing line:", validJson, error);
        }
      }
    }

    // Clear the partial text
    partialText = "";
  }

  
}

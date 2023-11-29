## Run the project

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to use the app ?

- You can choose a min/max version of Symfony or none if you don't want restict questions versions
- You can choose a specific subject, or `All` if you want to get questions on multiple subjects (if you choose a subject without question in `.json` corresponding file, the subject `All` is automatically set)
- If a question has multiple good answers, this is indicated at the end of the question
- You can pass a question with red button
- Check answer(s) do you think good and click on green button to show good answers


## Add new questions

Fill `.json` files in `/questions` folder with JSON object look like :
```javascript
{
    "question": "Your question",
    "answers": [
      {
        "answer": "First answer",
        "valid": true
      },
      {
        "answer": "Second answer",
        "valid": false
      },
      // ...
    ],
    "explanations": [
        "Explanations about the answer showed when the answer is validated by the user",
        // ...
    ],
    "images": [
        "path/to/image.png",
        // ...
    ],
    "versionMin": 6.0, // version minimal of Symfony or null
    "versionMax": null // version maximal of Symfony or null
}
```
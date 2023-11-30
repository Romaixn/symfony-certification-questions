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

Fill `.yaml` files in `/questions` folder with object as following :
``` yaml
symfony-subject:
    name: Controllers
    questions:
        -
          question: Your question
          answers:
              - {answer: "First anwser", valid: true}
              - {answer: "Second anwser", valid: false}
              - {answer: "Third anwser", valid: true}
          explanation: ~
          images: ~
          versionMin: 6.1 
          versionMax: ~
        -
          question: |
              Your other question with **Markdown** syntax
              ``` php
              function foo()
              {
                  print_r('bar');
              }
              ```
          answers:
              - {answer: "First anwser", valid: true}
              - {answer: "Second anwser", valid: false}
              - {answer: "Third anwser", valid: true}
          explanation: |
              Explanations can contain Markdown too.
              - item 1
              - item 2
          images: ~
          versionMin: ~
          versionMax: ~
```

If you're the first one to add questions for a subject, don't forget to uncomment the filename in `questions.ts`.
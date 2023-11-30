import React, {useEffect, useState} from "react";
import rehypeHighlight from 'rehype-highlight'
import Markdown from "react-markdown";
import { fetchQuestions } from "@/questions/questions";

export async function getStaticProps() {
  return {
    props: { symfonySubjects: fetchQuestions() }
  }
}

export default function Home(props: any) {
  const [minVersion, setMinVersion] = useState<number>(0);
  const [maxVersion, setMaxVersion] = useState<number>(99);
  const [requestedSubject, setRequestedSubject] = useState<string>('All');
  const [currentSubject, setCurrentSubject] = useState<string>('');
  const [question, setQuestion] = useState<QuestionInterface|null>(null);
  const [checkedAnswers, setCheckedAnswers] = useState<AnswerInterface[]>([]);
  const [isShowResult, setIsShowResult] = useState<boolean>(false);

  useEffect(() => {
    getNewQuestion();
  }, [minVersion, maxVersion, requestedSubject]);

  const symfonySubjects: Array<{subject: string, questions: QuestionInterface[]}> = props.symfonySubjects;

  const getNewQuestion = () => {
    setIsShowResult(false);
    setCheckedAnswers([]);

    let questions: QuestionInterface[] = [];
    let requestedSubjectIndex = symfonySubjects.findIndex((value) => value.subject === requestedSubject);
    const min = maxVersion > minVersion ? minVersion : maxVersion;
    const max = maxVersion > minVersion ? maxVersion : minVersion;
    const filter = (question: QuestionInterface) => {
      return (question.versionMin && question.versionMin >= min && question.versionMin <= max) ||
        (question.versionMax && question.versionMax >= min && question.versionMax <= max) ||
        (min === 0 && question.versionMin === null) ||
        (max === 99 && question.versionMax === null) ||
        (null === question.versionMin && null == question.versionMax);
    }

    if (-1 !== requestedSubjectIndex) {
      if (symfonySubjects[requestedSubjectIndex].questions.length <= 0) {
        requestedSubjectIndex = -1;
        setRequestedSubject('All');
      } else {
        questions = symfonySubjects[requestedSubjectIndex].questions.filter(filter);
        setCurrentSubject(symfonySubjects[requestedSubjectIndex].subject);
      }
    }

    if (-1 === requestedSubjectIndex) {
      const symfonySubjectIndex = Math.floor(Math.random() * symfonySubjects.length);
      questions = symfonySubjects[symfonySubjectIndex].questions.filter(filter);
      if (0 === questions.length) {
        getNewQuestion();
        return;
      }
      setCurrentSubject(symfonySubjects[symfonySubjectIndex].subject);
    }
    let question = questions[Math.floor(Math.random() * questions.length)];
    question.answers = question.answers.sort(() => Math.random() - 0.5);
    setQuestion(question)
  }

  const toggleAnswer = (answer: AnswerInterface) => {
    const isAlreadyChecked = typeof checkedAnswers.find((checkedAnswer) => checkedAnswer.answer === answer.answer) !== 'undefined';
    if (isAlreadyChecked) {
      setCheckedAnswers(checkedAnswers.filter(checkedAnswer => checkedAnswer.answer !== answer.answer));
    } else {
      setCheckedAnswers([...(checkedAnswers), answer]);
    }
  }

  const isChecked = (answer: AnswerInterface) => {
    return -1 !== checkedAnswers.findIndex((checkedAnswer) => checkedAnswer.answer === answer.answer);
  }

  const hasMultipleAnswers = () => {
    return 2 <= (question?.answers.filter(answer => answer.valid).length || 0);
  }

  return (
    <div className="mx-32 my-4">
      <div className="mb-4 flex flex-row gap-8">
        <div>
          <label htmlFor="versionMin" className="mr-2">Version min</label>
          <select name="versionMin" onChange={(e) => setMinVersion(parseFloat(e.target.value))}>
            <option value={0} selected={0 === minVersion}>None</option>
            <option value={6.0} selected={6.0 === minVersion}>6.0</option>
            <option value={6.1} selected={6.1 === minVersion}>6.1</option>
            <option value={6.2} selected={6.2 === minVersion}>6.2</option>
            <option value={6.3} selected={6.3 === minVersion}>6.3</option>
            <option value={6.4} selected={6.4 === minVersion}>6.4</option>
          </select>
        </div>
        <div>
          <label htmlFor="versionMax" className="mr-2">Version max</label>
          <select name="versionMax" onChange={(e) => setMaxVersion(parseFloat(e.target.value))}>
            <option value={99} selected={99 === maxVersion}>None</option>
            <option value={6.0} selected={6.0 === maxVersion}>6.0</option>
            <option value={6.1} selected={6.1 === maxVersion}>6.1</option>
            <option value={6.2} selected={6.2 === maxVersion}>6.2</option>
            <option value={6.3} selected={6.3 === maxVersion}>6.3</option>
            <option value={6.4} selected={6.4 === maxVersion}>6.4</option>
          </select>
        </div>

        <div>
          <label htmlFor="versionMax" className="mr-2">Subject</label>
          <select name="versionMax" onChange={(e) => setRequestedSubject(e.target.value)}>
            <option key="All" value="All" selected={requestedSubject === 'All'}>All</option>
            {Object.values(symfonySubjects).map((subject) => <option key={subject.subject} value={subject.subject} selected={requestedSubject === subject.subject}>{subject.subject}</option>)}
          </select>
        </div>
      </div>

      <article>
        <div className="mb-4">
          <h1 className="text-2xl mb-2">{currentSubject}</h1>
          <Markdown rehypePlugins={[rehypeHighlight]} className={'question'}>{question?.question}</Markdown>
          <span>{hasMultipleAnswers() && '(multiple answers)'}</span>

          {question?.images?.length && question?.images.length > 0 ? (
              <div className="flex flex-row gap-2 items-start mb-4">
                {question?.images.map(image => {
                  return <img key={image} src={`/images/${image}`}  alt={'image pour la question'}/>
                })}
              </div>
            ) : <></>
          }
        </div>

        {question?.answers && question?.answers.length && (
          <div className="mb-4">
            {question?.answers.map((answer => {
                return <div key={answer.answer} className="flex flex-row items-start">
                  <input onChange={() => toggleAnswer(answer)} className="mr-2 mt-1" type="checkbox" key={answer.answer} name={answer.answer} id={answer.answer} value={answer.answer} checked={isChecked(answer)}/>
                  <label htmlFor={answer.answer}><Markdown rehypePlugins={[rehypeHighlight]} className="answer mb-1">{answer.answer}</Markdown></label>
                  <br />
                </div>
              }
            ))}
          </div>
        )}

        <div className="flex flex-row gap-4">
          {!isShowResult && (
            <>
              <button className="px-4 py-2 bg-red-400 rounded mb-4" onClick={getNewQuestion}>Skip question</button>
              <button onClick={() => setIsShowResult(true)} className="px-4 py-2 bg-green-400 rounded mb-4">Show answers</button>
            </>
          )}
          {isShowResult && <button onClick={getNewQuestion} className="px-4 py-2 bg-green-400 rounded mb-4">Next question</button>}
        </div>
      </article>

      {isShowResult && (
        <div className="border border-black rounded p-8">
          <div className={'flex flex-row mb-8 gap-4 border border-black p-2 w-max'}>
            <div>
              <input type={"checkbox"} checked={true} className={'mb-1 px-2 mr-2 accent-green-500'} />
              <label>Good answer</label>
            </div>
            <div>
              <input type={"checkbox"} checked={false} className={'mb-1 px-2 mr-2'} />
              <label className={'line-through'}>Bad answer</label>
            </div>
            <div>
              <input type={"checkbox"} checked={true} className={'mb-1 px-2 mr-2 accent-red-500'} />
              <label>Missing answer</label>
            </div>
          </div>
          <Markdown rehypePlugins={[rehypeHighlight]} className="explanation mb-1">{question?.explanation}</Markdown>
          {question?.answers.map(answer => {
            const isChecked = checkedAnswers.find(checkedAnswers => checkedAnswers.answer === answer.answer) !== undefined;
            const isGoodAnswer = answer.valid;

            return <>
              <input key={answer.answer} type="checkbox" checked={(isChecked && isGoodAnswer) || (!isChecked && isGoodAnswer)} className={
                `mb-1 px-2 mr-2 
                ${!isChecked && isGoodAnswer ? `accent-red-500 border-2 border-red-500 rounded` :
                  isChecked && !isGoodAnswer ? `text-red-400` :
                    isChecked && isGoodAnswer ? `accent-green-500` : ''}`
              } />
              <label className={`${isChecked && !isGoodAnswer && 'line-through'}`}>{answer.answer}</label>
              <br />
            </>
          })}
        </div>
      )}
    </div>

  )
}

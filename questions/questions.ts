import YAML from 'yaml';
import fs from 'fs';

export const fetchQuestions = () => {
  const questions: Array<{subject: string, questions: QuestionInterface[]}> = [];

  const filenames = [
      // 'automated-tests.yaml',
      'console.yaml',
      'controllers.yaml',
      'data-validation.yaml',
      'dependency-injection.yaml',
      'forms.yaml',
      'http.yaml',
      // 'http-caching.yaml',
      // 'miscellaneous.yaml',
      'php.yaml',
      'routing.yaml',
      'security.yaml',
      'symfony-architecture.yaml',
      'templating-with-twig.yaml',
  ];

  filenames.map((filename) => {
    const file = fs.readFileSync('questions/' + filename, 'utf8');
    const dataTheme = YAML.parse(file.toString())['symfony-subject'];

    questions.push({
      subject: dataTheme.name,
      questions: dataTheme.questions,
    })
  });

  return questions;
};

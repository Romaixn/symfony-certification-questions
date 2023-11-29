import phpQuestions from '../questions/php.json';
import httpQuestions from '../questions/http.json';
import symfonyArchitectureQuestions from '../questions/symfony-architecture.json';
import controllersQuestions from '../questions/controllers.json';
import routingQuestions from '../questions/routing.json';
import templatingWithTwigQuestions from '../questions/templating-with-twig.json';
import formsQuestions from '../questions/forms.json';
import dataValidationQuestions from '../questions/data-validation.json';
import dependencyInjectionQuestions from '../questions/dependency-injection.json';
import securityQuestions from '../questions/security.json';
import httpCachingQuestions from '../questions/http-caching.json';
import consoleQuestions from '../questions/console.json';
import automatedTestsQuestions from '../questions/automated-tests.json';
import miscellaneousQuestions from '../questions/miscellaneous.json';

export const symfonySubjects = [
  {
    subject : 'PHP',
    questions: phpQuestions,
  },
  {
    subject : 'HTTP',
    questions: httpQuestions,
  },
  {
    subject : 'Symfony Architecture',
    questions: symfonyArchitectureQuestions,
  },
  {
    subject : 'Controllers',
    questions: controllersQuestions,
  },
  {
    subject : 'Routing',
    questions: routingQuestions,
  },
  {
    subject : 'Templating with Twig',
    questions: templatingWithTwigQuestions,
  },
  {
    subject : 'Forms',
    questions: formsQuestions,
  },
  {
    subject : 'Data Validation',
    questions: dataValidationQuestions,
  },
  {
    subject : 'Dependency Injection',
    questions: dependencyInjectionQuestions,
  },
  {
    subject : 'Security',
    questions: securityQuestions,
  },
  {
    subject : 'HTTP Caching',
    questions: httpCachingQuestions,
  },
  {
    subject : 'Console',
    questions: consoleQuestions,
  },
  {
    subject : 'Automated Tests',
    questions: automatedTestsQuestions,
  },
  {
    subject : 'Miscellaneous',
    questions: miscellaneousQuestions,
  },
];
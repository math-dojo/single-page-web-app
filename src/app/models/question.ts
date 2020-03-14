import { QuestionDto } from './question-dto';
import { convertKebabToSentenceCase } from '../utilities/content-title-formatter';

export class Question extends QuestionDto {
  public readonly formattedTitle: string;
  public readonly formattedSuccessRate: string;
  public readonly formattedDifficulty: string;
  public readonly formattedParentTopicTitle: string;
  public readonly parentTopic: string;

  public constructor({
    title,
    body,
    sampleAnswer,
    hints,
    solved,
    successRate,
    difficulty,
    questionAnswerOptions,
    parentTopicTitle
  }: {
    title: string,
    body: string,
    sampleAnswer: string,
    hints: string[],
    solved: boolean,
    successRate: number,
    difficulty: string,
    questionAnswerOptions,
    parentTopicTitle
  }) {
    super({
      title,
      body,
      sampleAnswer,
      hints,
      solved,
      successRate,
      difficulty,
      questionAnswerOptions,
      parentTopicTitle
    });

    this.formattedTitle = convertKebabToSentenceCase(this.title);

    this.formattedSuccessRate = (this.successRate * 100).toFixed();
    this.formattedDifficulty = (this.difficulty.replace(/^\w/, (match) => match.toUpperCase()));
    this.parentTopic = 'random-topic';
    this.formattedParentTopicTitle = convertKebabToSentenceCase(this.parentTopic);
  }
}

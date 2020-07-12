import { QuestionDto } from './question-dto';
import { convertKebabToSentenceCase } from '../utilities/content-title-formatter';
import { Difficulty } from './question_difficulty';

export class Question extends QuestionDto {
  public readonly formattedTitle: string;
  public readonly formattedSuccessRate: string;
  public readonly formattedDifficulty: string;
  public readonly formattedParentTopicTitle: string;

  public constructor({
    title,
    questionBody,
    sampleAnswer,
    hints,
    answer,
    successRate,
    difficulty,
    questionAnswerOptions,
    parentTopicTitle,
    solved
  }: {
    title: string,
    questionBody: string,
    sampleAnswer: string,
    hints: string[],
    answer: string,
    successRate: number,
    difficulty: Difficulty,
    questionAnswerOptions,
    parentTopicTitle,
    solved: boolean
  }) {
    super({
      title,
      questionBody,
      sampleAnswer,
      hints,
      answer,
      successRate,
      difficulty,
      questionAnswerOptions,
      parentTopicTitle,
      solved
    });

    this.formattedTitle = convertKebabToSentenceCase(this.title);

    this.formattedSuccessRate = (this.successRate * 100).toFixed();
    this.formattedDifficulty = (this.difficulty.replace(/^\w/, (match) => match.toUpperCase()));
    this.formattedParentTopicTitle = convertKebabToSentenceCase(this.parentTopicTitle);
  }

  static fromQuestionDto(questionDto: QuestionDto) {
    return new Question({ ...questionDto });
  }
}

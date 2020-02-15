import { QuestionDto } from './question-dto';

export class Question extends QuestionDto {
  public readonly formattedTitle: string;
  public readonly formattedSuccessRate: string;
  public readonly formattedDifficulty: string;
  public readonly parentTopic: string;

  public constructor({
    title,
    body,
    sampleAnswer,
    hints,
    solved,
    successRate,
    difficulty
  }: {
    title: string,
    body: string,
    sampleAnswer: string,
    hints: string[],
    solved: boolean,
    successRate: number,
    difficulty: string
  }) {
    super({
      title,
      body,
      sampleAnswer,
      hints,
      solved,
      successRate,
      difficulty
    });

    this.formattedTitle = this.title
      .replace((/(^|-)(\w)/g), (match, p1, p2, offset, string) => {
        if (offset > 0) {
          return (' ' + p2.toUpperCase());
        }
        return p2.toUpperCase();
    });

    this.formattedSuccessRate = (this.successRate * 100).toFixed();
    this.formattedDifficulty = (this.difficulty.replace(/^\w/, (match) => match.toUpperCase()));
    this.parentTopic = 'random-topic';
  }
}

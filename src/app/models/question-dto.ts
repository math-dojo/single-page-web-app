export class QuestionDto {
    public readonly title: string;
    public readonly body: string;
    public readonly sampleAnswer: string;
    public readonly hints: string[];
    public readonly successRate: number;
    public readonly difficulty: string;
    public readonly parentTopicTitle: string;
    public readonly questionAnswerOptions: string[];
    public solved: boolean;

    public constructor({
        title,
        body,
        sampleAnswer,
        hints,
        solved,
        successRate,
        difficulty,
        parentTopicTitle,
        questionAnswerOptions
    }: {
        title: string,
        body: string,
        sampleAnswer: string,
        hints: string[],
        solved: boolean,
        successRate: number,
        difficulty: string,
        parentTopicTitle: string,
        questionAnswerOptions: string[]
    }) {
        this.title = title;
        this.body = body;
        this.sampleAnswer = sampleAnswer;
        this.hints = hints;
        this.solved = solved;
        this.successRate = successRate;
        this.difficulty = difficulty;
        this.questionAnswerOptions = questionAnswerOptions;
        this.parentTopicTitle = parentTopicTitle;
    }

    static createDtoWithNonEmptyFields({
        title = '',
        body = '',
        sampleAnswer = '',
        hints = [''],
        solved = false,
        successRate = 0,
        difficulty = '',
        parentTopicTitle = '',
        questionAnswerOptions = ['']
    } = {}): QuestionDto {
        return new QuestionDto({
            title,
            body,
            sampleAnswer,
            hints,
            solved,
            successRate,
            difficulty,
            parentTopicTitle,
            questionAnswerOptions
        });
    }

}

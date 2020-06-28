export class QuestionDto {
    public readonly title: string;
    public readonly questionBody: string;
    public readonly sampleAnswer: string;
    public readonly hints: string[];
    public readonly successRate: number;
    public readonly difficulty: string;
    public readonly parentTopicTitle: string;
    public readonly questionAnswerOptions: string[];
    public readonly answer: string;
    public readonly solved: boolean;

    public constructor({
        title,
        questionBody,
        sampleAnswer,
        hints,
        answer,
        successRate,
        difficulty,
        parentTopicTitle,
        questionAnswerOptions,
        solved
    }: {
        title: string,
        questionBody: string,
        sampleAnswer: string,
        hints: string[],
        answer: string,
        successRate: number,
        difficulty: string,
        parentTopicTitle: string,
        questionAnswerOptions: string[],
        solved: boolean
    }) {
        this.title = title;
        this.questionBody = questionBody;
        this.sampleAnswer = sampleAnswer;
        this.hints = hints;
        this.answer = answer;
        this.successRate = successRate;
        this.difficulty = difficulty;
        this.questionAnswerOptions = questionAnswerOptions;
        this.parentTopicTitle = parentTopicTitle;
        this.solved = solved;
    }

    static createDtoWithNonEmptyFields({
        title = '',
        questionBody = '',
        sampleAnswer = '',
        hints = [''],
        answer = '',
        successRate = 0,
        difficulty = '',
        parentTopicTitle = '',
        questionAnswerOptions = [''],
        solved = false
    } = {}): QuestionDto {
        return new QuestionDto({
            title,
            questionBody,
            sampleAnswer,
            hints,
            answer,
            successRate,
            difficulty,
            parentTopicTitle,
            questionAnswerOptions,
            solved
        });
    }

}

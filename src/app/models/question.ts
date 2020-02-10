export class Question {
    public readonly title: string;
    public readonly body: string;
    public readonly sampleAnswer: string;
    public readonly hints: string[];
    public readonly successRate: number;
    public readonly difficulty: string;
    public solved: boolean;

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
        this.title = title;
        this.body = body;
        this.sampleAnswer = sampleAnswer;
        this.hints = hints;
        this.solved = solved;
        this.successRate = successRate;
        this.difficulty = difficulty;
    }

}

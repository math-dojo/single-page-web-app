export class TopicDto {
    public readonly title: string;
    public readonly body: string;
    public readonly userProgress: number;

    public constructor({
        title,
        body,
        userProgress
    }: {
        title: string,
        body: string,
        userProgress: number
    }) {
        this.title = title;
        this.body = body;
        this.userProgress = userProgress;
    }

    static createDtoWithNonEmptyFields({
        title = '',
        body = '',
        userProgress = 0
    } = {}): TopicDto {
        return new TopicDto({
            title,
            body,
            userProgress
        });
    }

}

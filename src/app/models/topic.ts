import { TopicDto } from './topic-dto';
import { convertKebabToSentenceCase } from '../utilities/content-title-formatter';

export class Topic extends TopicDto {
    public readonly formattedTitle: string;

    public constructor({
        title,
        body,
        userProgress
    }: {
        title: string,
        body: string,
        userProgress: number
    }) {
        super({
            title,
            body,
            userProgress
        });

        this.formattedTitle = convertKebabToSentenceCase(this.title);
    }

    static fromTopicDto(topicDto: TopicDto) {
        return new Topic({...topicDto})
    }

}

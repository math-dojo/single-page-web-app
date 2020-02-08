export class Topic {
    public readonly name: string;
    public readonly topicDescription: string;
    public readonly userProgress: number;
    public readonly linkToTopicSection: string;

    public constructor({
        name,
        topicDescription,
        userProgress
    }) {
        this.name = name;
        this.topicDescription = topicDescription;
        this.userProgress = userProgress;
        this.linkToTopicSection = `/topics/${name.toLowerCase()}`;
    }

}

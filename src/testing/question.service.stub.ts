import { of } from 'rxjs';
import { TopicDto } from '../app/models/topic-dto';
import { QuestionDto } from '../app/models/question-dto';
import { QuestionService } from '../app/services/question.service';

export const QuestionServiceStub: Partial<QuestionService> = {
    getQuestionsForTopic: jasmine.createSpy('getQuestionsForTopic')
            .and.returnValue(of([QuestionDto.createDtoWithNonEmptyFields()])),

    getTopics: jasmine.createSpy('getQuestionsForTopic')
        .and.returnValue(of([TopicDto.createDtoWithNonEmptyFields()])),

    getTopicWithTitle: jasmine.createSpy('getQuestionsForTopic')
        .and.returnValue(of([TopicDto.createDtoWithNonEmptyFields()])),

    getQuestionWithTitle: jasmine.createSpy('getQuestionsForTopic')
    .and.returnValue(of(QuestionDto.createDtoWithNonEmptyFields()))

};

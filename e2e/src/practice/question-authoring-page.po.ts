import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { Utils } from '../utils/utils.po';

export class QuestionAuthoringPage extends Utils {

  get form() {
    return element.all(by.css('.mtdj__question-auth-input-container form'));
  }

  get titleInput() {
    return element.all(by.css('#mtdj__question-auth-input-title input'));
  }

  get topicInput() {
    return element.all(by.css('#mtdj__question-auth-input-topic input'));
  }

  get sampleAnswerInput() {
    return element.all(by.css('#mtdj__question-auth-input-sample_answer textarea'));
  }

  get answerInput() {
    return element.all(by.css('#mtdj__question-auth-input-answer textarea'));
  }

  get hint1Input() {
    return element.all(by.css('#mtdj__question-auth-input-hint1 input'));
  }

  get hint2Input() {
    return element.all(by.css('#mtdj__question-auth-input-hint2 input'));
  }

  get hint3Input() {
    return element.all(by.css('#mtdj__question-auth-input-hint3 input'));
  }

  get option1Input() {
    return element.all(by.css('#mtdj__question-auth-input-option1 input'));
  }

  get option2Input() {
    return element.all(by.css('#mtdj__question-auth-input-option2 input'));
  }

  get option3Input() {
    return element.all(by.css('#mtdj__question-auth-input-option3 input'));
  }

  get option4Input() {
    return element.all(by.css('#mtdj__question-auth-input-option4 input'));
  }

  navigateToFeatureRoot() {
    this.navigateToPath('/practice/create');
  }

}

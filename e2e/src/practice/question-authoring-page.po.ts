import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { Utils } from '../utils/utils.po';
import { protractor } from 'protractor/built/ptor';

export class QuestionAuthoringPage extends Utils {

  get form() {
    return element(by.css('.mtdj__question-auth-input-container form'));
  }

  get titleInput() {
    return element(by.css('#mtdj__question-auth-input-title input'));
  }

  get topicInput() {
    return element(by.css('#mtdj__question-auth-input-topic input'));
  }

  get difficultySelectInput() {
    return element(by.css('#mtdj__question-auth-input-difficulty select'));
  }

  get bodyInput() {
    return element(by.css('#mtdj__question-auth-input-body textarea'));
  }

  get sampleAnswerInput() {
    return element(by.css('#mtdj__question-auth-input-sample_answer textarea'));
  }

  get answerInput() {
    return element(by.css('#mtdj__question-auth-input-answer textarea'));
  }

  get hint1Input() {
    return element(by.css('#mtdj__question-auth-input-hint1 input'));
  }

  get hint2Input() {
    return element(by.css('#mtdj__question-auth-input-hint2 input'));
  }

  get hint3Input() {
    return element(by.css('#mtdj__question-auth-input-hint3 input'));
  }

  get option1Input() {
    return element(by.css('#mtdj__question-auth-input-option1 input'));
  }

  get option2Input() {
    return element(by.css('#mtdj__question-auth-input-option2 input'));
  }

  get option3Input() {
    return element(by.css('#mtdj__question-auth-input-option3 input'));
  }

  get option4Input() {
    return element(by.css('#mtdj__question-auth-input-option4 input'));
  }

  get submissionSuccessAlert() {
    return element(by.css('.mtdj__question-auth-input-container .alert.alert-success'));
  }

  get submissionErrorAlert() {
    return element(by.css('.mtdj__question-auth-input-container .alert.alert-danger'));
  }

  get submitButton() {
    return element(by.css('.btn.btn-primary'));
  }

  navigateToFeatureRoot() {
    this.navigateToPath('/practice/create');
  }

  fillFormCorrectly() {
    this.titleInput.sendKeys('some-untaken-title');
    this.topicInput.sendKeys('some-existing-topic');
    this.difficultySelectInput.sendKeys(protractor.Key.ARROW_DOWN, protractor.Key.ARROW_DOWN);
    this.bodyInput.sendKeys('some stuff that will go in a question');
    this.answerInput.sendKeys('some stuff that will go in an answer');
  }

  checkFormEmpty() {
    return Promise.all([
      this.titleInput.getText().then((text) => text.length === 0),
      this.topicInput.getText().then((text) => text.length === 0),
      this.answerInput.getText().then((text) => text.length === 0),
      this.bodyInput.getText().then((text) => text.length === 0)
    ]).then(
      arrayOfStates => arrayOfStates.reduce(((cumulativeState, each) => cumulativeState && each), true)
      );
    
  }

}

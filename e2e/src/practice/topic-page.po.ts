import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { Utils } from '../utils/utils.po';

export class TopicPage extends Utils {

  getQuestionCards() {
    return element.all(by.css('.mtdj__topic_question_display .mtdj__topic_question_card'));
  }

  getNumberOfQuestionCards() {
    return this.getQuestionCards().count();
  }

  getFirstQuestionCard() {
    return this.getQuestionCards().first();
  }

  getFirstQuestionCardTitle() {
    return this.getFirstQuestionCard().element(by.css('.card-title')).getText();
  }

  clickFirstQuestionCard() {
    return this.getFirstQuestionCard().click();
  }

  navigateToFeatureRoot() {
    this.navigateToPath('/topics/pure-mathematics');
  }

}

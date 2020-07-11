import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { Utils } from '../utils/utils.po';

export class DashboardPage extends Utils {

  getTopicCards() {
    return element.all(by.css('.mtdj__dashboard_topic_display .mtdj__dashboard_topic_card'));
  }

  getNumberOfTopicCards() {
    return this.getTopicCards().count();
  }


  navigateToFeatureRoot() {
    this.navigateToPath('/dashboard');
  }

}

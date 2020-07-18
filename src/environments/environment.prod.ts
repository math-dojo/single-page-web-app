export const environment = {
  get production() {
    return true;
  },
  get name() {
    return 'production';
  },
  get apis() {
    return {
      get questionServiceConsumerEndpoint() {
        return '';
      },
      get questionQueueQuarantineConsumerEndpoint() {
        return '';
      }
    };
  }
};

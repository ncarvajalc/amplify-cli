import { supportedServices as servicesMetadata } from '../../provider-utils/supported-services';
import { categoryName } from '../../constants';

export const name = 'console';

export const run = async context => {
  const { amplify } = context;
  return amplify.serviceSelectionPrompt(context, categoryName, servicesMetadata).then(async result => {
    const providerController = servicesMetadata[result.service].providerController;
    if (!providerController) {
      context.print.error('Provider not configured for this category');
      return;
    }
    await providerController.openConsole(context, result.service);
  });
};

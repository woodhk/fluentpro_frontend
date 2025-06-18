/**
 * Data exports
 */

export * from './onboarding';
export * from './communication';

// Re-export as single data object for backwards compatibility
import { 
  welcome, 
  nativeLanguages, 
  industries, 
  summaryData,
  part3CompletionScreens 
} from './onboarding';

import { 
  communicationPartners, 
  communicationSituations,
  part2SummaryData,
  part3SummaryData
} from './communication';

export const data = {
  welcome,
  nativeLanguages,
  industries,
  summaryData,
  communicationPartners,
  communicationSituations,
  part2SummaryData,
  part3SummaryData,
  part3CompletionScreens,
};
// Helper function to merge Japanese translations
import { topicTranslationsJa } from '../constants.ja';
import { Topic } from '../types';

export function mergeJapaneseTranslations(topics: Topic[]): Topic[] {
  return topics.map(topic => {
    const jaData = topicTranslationsJa[topic.id];
    if (jaData) {
      return {
        ...topic,
        titleJa: jaData.title,
        descriptionJa: jaData.description,
        contentMarkdownJa: jaData.contentMarkdown,
        practicePromptJa: jaData.practicePrompt,
        expectedOutputDescriptionJa: jaData.expectedOutputDescription
      };
    }
    return topic;
  });
}

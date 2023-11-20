import { ref, type Ref } from 'vue';

export function useArticleText(fullArticleElement: Ref<HTMLDivElement | null>) {
  const regex = /\n{3,}/g; // This regex searches for three or more consecutive new lines.
  const articleTextData = fullArticleElement.value?.innerText.replace(regex, '\n\n').trim(); // Replace the three or more consecutive new lines with just two new lines.
  const articleText = ref(articleTextData);
  return { articleText };
}

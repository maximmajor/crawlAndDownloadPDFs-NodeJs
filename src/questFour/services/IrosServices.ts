

class IrosService {

  public async IrosCrawler(document: any): Promise<any> {
    const faqItems: string[] = [];
    const faqElements = document.querySelectorAll('.faq-item');
    if (faqElements.length === 0) {
      throw new Error('No FAQ items found');
    }

    faqElements.forEach((element: { querySelector: (arg0: string) => any; }) => {
      const questionElement = element.querySelector('.question');
      const answerElement = element.querySelector('.answer');

      if (!questionElement || !answerElement) {
        throw new Error('FAQ item missing question or answer');
      }

      const question = questionElement.textContent.trim();
      const answer = answerElement.textContent.trim();
      faqItems.push(`Q: ${question}\nA: ${answer}\n`);
    });

    return faqItems
  }
}

export default IrosService;
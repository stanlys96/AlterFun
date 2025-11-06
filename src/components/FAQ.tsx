import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What determines the value of creator tokens?",
      answer:
        "Creator token values are determined by market demand, creator engagement, exclusive content offerings, and overall community growth. As creators gain popularity and provide more value to token holders, the token value can increase accordingly.",
    },
    {
      question: "What are the risks involved with creator tokens?",
      answer:
        "Like any investment, creator tokens carry risks including market volatility, creator performance, and platform changes. Token values can fluctuate based on creator activity and market conditions. We recommend only investing what you can afford and diversifying your portfolio.",
    },
    {
      question: "How are VTubers and creators vetted on the platform?",
      answer:
        "We have a rigorous certification process for AlterFUN creators. This includes verifying their identity, reviewing their content history, assessing their community engagement, and ensuring they meet our platform guidelines and standards for quality and authenticity.",
    },
    {
      question: "What tangible benefits do token holders receive?",
      answer:
        "Token holders gain exclusive access to creator content, early merchandise releases, voting rights on creator decisions, private community channels, meet-and-greet opportunities, and potential financial returns as creator value increases.",
    },
    {
      question: "Is AlterFUN built on blockchain technology?",
      answer:
        "Yes, AlterFUN is built on the Solana blockchain, ensuring all transactions are transparent, secure, and trackable. This Web3 foundation provides true ownership of your creator tokens and enables seamless, low-cost transactions.",
    },
  ];

  return (
    <section id="faq" className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl text-center mb-12 font-bold">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

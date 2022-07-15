import { Content } from "@tiptap/react";

export const content: Content = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is notitap. A notion-like plug and play editor built on top of Tiptap/ProseMirror. ",
        },
      ],
    },
    {
      type: "resizableMedia",
      attrs: {
        src: "https://source.unsplash.com/8xznAGy4HcY/800x400",
        "media-type": "img",
        alt: "Something else",
        title: "Something",
        width: 655,
        height: null,
        dataAlign: "left",
        dataFloat: null,
      },
    },
    { type: "paragraph" },
    { type: "paragraph", content: [{ type: "text", text: "something " }] },
    {
      type: "resizableMedia",
      attrs: {
        src: "https://user-images.githubusercontent.com/45892659/178123048-0257e732-8cc2-466b-8447-1e2b7cd1b5d9.mov",
        "media-type": "video",
        alt: "Some Video",
        title: "Some Title Video",
        width: 655,
        height: 568.6061739943873,
        dataAlign: "left",
        dataFloat: null,
      },
    },
    { type: "paragraph" },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Expedita animi non explicabo sequi quos ab. In asperiores aliquam qui sequi aliquam ratione rerum ex. Sapiente repellat quia a cumque qui nihil consequatur molestias. Velit vitae tempore iure. Consequatur tempore architecto dicta et ab culpa et assumenda. Commodi qui temporibus et deleniti vero dolorem.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Maiores nobis facere mollitia. Adipisci magnam quo beatae iure unde. Eum deleniti vel veritatis eum quia voluptates molestiae repellendus. Deleniti et a eveniet. Rerum quis et rerum repellat.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Sunt aut voluptas quaerat. Earum iste omnis et minus autem voluptatem. Reiciendis cupiditate velit qui accusamus minima vel. Voluptas dolore nam perferendis iure et omnis. Exercitationem corporis culpa blanditiis. Quam eveniet ut provident ut earum dolore eos sed sapiente.",
        },
      ],
    },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
    { type: "paragraph" },
  ],
};

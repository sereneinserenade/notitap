import { Content } from "@tiptap/react";

export const content: Content = {
  type: "doc",
  content: [
    {
      type: "dBlock",
      content: [
        {
          type: "heading",
          attrs: {
            level: 1,
          },
          content: [
            {
              type: "text",
              text: "Welcome to notitap.",
            },
          ],
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "heading",
          attrs: {
            level: 3,
          },
          content: [
            {
              type: "text",
              text: "A notion like editor built with Tiptap",
            },
          ],
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "heading",
          attrs: {
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Features:",
            },
          ],
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Block Level Drag and Drop",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Resizable Media(Images, Videos)",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Supercharged Tables",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Link Previews",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "heading",
          attrs: {
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Resizable Media",
            },
          ],
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "heading",
          attrs: {
            level: 3,
          },
          content: [
            {
              type: "text",
              text: "Images:",
            },
          ],
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "resizableMedia",
          attrs: {
            src: "https://source.unsplash.com/8xznAGy4HcY/800x400",
            "media-type": "img",
            alt: "Something else",
            title: "Something",
            width: 574,
            height: 287,
            dataAlign: "center",
            dataFloat: null,
          },
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "heading",
          attrs: {
            level: 3,
          },
          content: [
            {
              type: "text",
              text: "Videos:",
            },
          ],
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "resizableMedia",
          attrs: {
            src: "https://user-images.githubusercontent.com/45892659/178123048-0257e732-8cc2-466b-8447-1e2b7cd1b5d9.mov",
            "media-type": "video",
            alt: "Some Video",
            title: "Some Title Video",
            width: 400,
            height: null,
            dataAlign: "center",
            dataFloat: null,
          },
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "heading",
          attrs: {
            level: 2,
          },
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "heading",
          attrs: {
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "SuperCharged Tables:",
            },
          ],
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "table",
          content: [
            {
              type: "tableRow",
              content: [
                {
                  type: "tableHeader",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Number",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableHeader",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Name",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableHeader",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Importance",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableHeader",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Reason",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "1",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Laptop",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "High Importance ",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Can do almost everything that a watch and a phone can do ",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "2",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Mobile",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Medium importance",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Can do everything a watch can do, but not everything a laptop can do ",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "tableRow",
              content: [
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "3",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Watch",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Low Importance",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "tableCell",
                  attrs: {
                    colspan: 1,
                    rowspan: 1,
                    colwidth: null,
                  },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "Can't do everything a phone or a laptop can do.",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
  ],
};

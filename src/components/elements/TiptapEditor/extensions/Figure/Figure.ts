import { Node, mergeAttributes } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

export interface FigureOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figure: {
      /**
       * Add a figure element
       */
      setFigure: (options: {
        src: string;
        alt?: string;
        title?: string;
        caption?: string;
      }) => ReturnType;

      /**
       * Converts an image to a figure
       */
      imageToFigure: () => ReturnType;

      /**
       * Converts a figure to an image
       */
      figureToImage: () => ReturnType;
    };
  }
}

export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const Figure = Node.create<FigureOptions>({
  name: "figure",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  atom: true,

  group: "block",

  content: "figcaption",

  draggable: true,

  selectable: true,

  isolating: false,

  parseHTML() {
    return [
      {
        tag: "figure",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            // prevent dragging nodes out of the figure
            dragstart: (view, event) => {
              if (!event.target) {
                return false;
              }

              const pos = view.posAtDOM(event.target as HTMLElement, 0);
              const $pos = view.state.doc.resolve(pos);

              if ($pos.parent.type === this.type) {
                console.log($pos.parent.type);
                event.preventDefault();
              }

              return false;
            },
          },
        },
      }),
    ];
  },
});

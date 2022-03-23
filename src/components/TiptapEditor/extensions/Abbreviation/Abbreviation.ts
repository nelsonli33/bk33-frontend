import { Mark } from '@tiptap/core';

export const Abbreviation = Mark.create({
    name: 'Abbreviation',

    addAttributes() {
        return {
          title: {
            default: null,
          },
        }
    },

    parseHTML() {
        return [
          {
            tag: 'abbr',
          },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['abbr', HTMLAttributes, 0]
    },  
})


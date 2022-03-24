import { Editor } from "@tiptap/core";
import React, { Component } from "react";
import { classNames } from "../../../../../utilities/css";

type CommandListProps = {
  items: any[];
  command: (props: any) => void;
};
type CommandListState = {
  selectedIndex: number;
};

class CommandList extends Component<CommandListProps, CommandListState> {
  state = {
    selectedIndex: 0,
  };

  componentDidUpdate(oldProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  onKeyDown({ event }) {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    });
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index) {
    const item = this.props.items[index];

    if (item) {
      this.props.command(item);
    }
  }

  render() {
    const { items } = this.props;

    return (
      <div className="max-h-96 w-64 scroll-py-3 overflow-y-auto rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
        {items.map((item, index) => {
          const active = index === this.state.selectedIndex;
          return (
            <div
              key={item.id}
              className={classNames(
                "flex cursor-pointer select-none px-4 py-3 hover:bg-gray-100",
                active && "bg-gray-100"
              )}
              role="button"
              onClick={() => this.selectItem(index)}
            >
              <div className={classNames("flex-shrink-0 self-center")}>
                <item.icon
                  className="h-9 w-9 border border-gray-300 bg-white text-gray-300"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 flex-auto">
                <p
                  className={classNames(
                    "font-sans text-sm",
                    active ? "text-gray-900" : "text-gray-700"
                  )}
                >
                  {item.title}
                </p>
                <p
                  className={classNames(
                    "font-sans text-xs",
                    active ? "text-gray-700" : "text-gray-500"
                  )}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default CommandList;

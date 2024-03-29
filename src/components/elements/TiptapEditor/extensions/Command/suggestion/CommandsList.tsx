import React, { Component } from "react";
import { classNames } from "../../../../../../utilities/css";
import { TiptapEditorContext } from "../../../context/TipTapEditorContext";

type CommandListProps = {
  items: any[];
  command: (props: any) => void;
};
type CommandListState = {
  selectedIndex: number;
};

class CommandList extends Component<CommandListProps, CommandListState> {
  static contextType = TiptapEditorContext;

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
    const computedSelectedIndex =
      (this.state.selectedIndex + this.props.items.length - 1) %
      this.props.items.length;

    this.setState({
      selectedIndex: computedSelectedIndex,
    });
  }

  downHandler() {
    const computedSelectedIndex =
      (this.state.selectedIndex + 1) % this.props.items.length;

    this.setState({
      selectedIndex: computedSelectedIndex,
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index) {
    const item = this.props.items[index];

    if (item) {
      switch (item.code) {
        case "upload":
          this.context?.inputFileRef?.current.click();
          break;
      }
      this.props.command(item);
    }
  }

  render() {
    return (
      <div className="max-h-96 w-64 scroll-py-3 overflow-y-auto bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
        {this.props.items.map((item, index) => {
          const active = index === this.state.selectedIndex;
          return (
            <div
              key={item.code}
              className={classNames(
                "flex cursor-pointer select-none px-4 py-3 hover:bg-gray-100",
                active && "bg-gray-100"
              )}
              role="button"
              onClick={() => this.selectItem(index)}
              tabIndex={index}
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

import { ArrowLeftIcon } from "@heroicons/react/outline";
import React from "react";
import Link from "../../../../../elements/Link";

interface PrimaryAction {
  content: string;
  disabled?: boolean;
  icon?: React.ReactNode | string;
  loading?: boolean;
  onAction: () => void;
}

export interface HeaderProps {
  title: string;
  primaryAction?: PrimaryAction;
  backToUrl?: string;
}

const Header = ({ title, primaryAction, backToUrl }: HeaderProps) => {
  const backToUrlMarkup = backToUrl ? (
    <Link
      url={backToUrl}
      className="inline-block group border border-gray-300 mr-4 rounded p-1 
        text-gray-400 hover:text-gray-900 hover:bg-gray-150"
    >
      <ArrowLeftIcon className="w-5 h-5" />
    </Link>
  ) : null;

  const primaryActionMarkup = primaryAction ? (
    <div className="sm:ml-16 sm:flex-none">
      <button
        type="button"
        className="btn-primary"
        onClick={primaryAction.onAction}
      >
        {primaryAction.content}
      </button>
    </div>
  ) : null;

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="flex items-center sm:flex-auto">
          {backToUrlMarkup}
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        {primaryActionMarkup}
      </div>
    </>
  );
};

export default Header;

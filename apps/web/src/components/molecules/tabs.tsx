import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

export type TabID = number;
export interface ITabType {
  title: string;
}

export interface ITabProps {
  title: ITabType['title'];
}

export interface ITabsProps {
  stretched?: boolean;
  centered?: boolean;
  onTabChange?: (tab: ITabType) => void;
}

export const Tab = ({ children }: PropsWithChildren & ITabProps) => {
  return <div>{children}</div>;
};

export const Tabs = ({ children, onTabChange, stretched, centered }: PropsWithChildren & ITabsProps) => {
  const [tabsList, setTabsList] = useState<ITabType[]>([]);
  const [activeTab, setActiveTab] = useState<TabID>(0);

  const tabs = Array.isArray(children) ? children : [children];

  useEffect(() => {
    const list = tabs.map((tab, idx) => ({ id: idx, title: tab.props.title }));

    setTabsList(list);
  }, []);

  const changeTab = (id: TabID) => {
    const tab = tabsList.find((_, idx) => idx === id);
    if (tab === undefined) {
      return;
    }

    if (activeTab == id) {
      return;
    }

    setActiveTab(id);
    onTabChange?.(tab);
  };

  const tabsListRender = tabsList.map(({ title }, idx) => {
    const isActive = idx === activeTab;

    return (
      <span
        className={`relative cursor-pointer snap-center rounded-md px-4 py-2 text-center transition hover:bg-emerald-200 hover:text-emerald-800 ${
          isActive ? 'bg-emerald-100 text-emerald-700' : ''
        } ${stretched ? 'w-full' : ''}`}
        key={idx}
        onClick={() => changeTab(idx)}
      >
        {title}
      </span>
    );
  });

  const activeTabRender = tabs.filter((_, idx) => idx === activeTab);

  return (
    <div className="container divide-y divide-gray-100">
      <div
        className={`flex snap-x snap-mandatory flex-nowrap space-x-4 overflow-x-auto p-4 font-medium ${
          centered ? 'justify-items-center' : ''
        }`}
      >
        {tabsListRender}
      </div>
      <div className="p-4">{activeTabRender}</div>
    </div>
  );
};

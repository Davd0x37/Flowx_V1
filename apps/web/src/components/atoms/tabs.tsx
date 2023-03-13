import { PropsWithChildren, useEffect, useState } from 'react';

export type TabID = number;
export interface ITabType {
  title: string;
}

export interface ITabProps {
  title: ITabType['title'];
}

export interface ITabsProps {
  onTabChange?: (tab: ITabType) => void;
}

export const Tab = ({ children }: PropsWithChildren & ITabProps) => {
  return <div className="p-2">{children}</div>;
};

export const Tabs = ({ children, onTabChange }: PropsWithChildren & ITabsProps) => {
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

  return (
    <div className="container p-4">
      <div className="flex snap-x snap-mandatory flex-nowrap gap-4 overflow-x-auto">
        {tabsList.map(({ title }, idx) => (
          <span
            className="bg-shade-dark border-shade-light hover:bg-shade-light hover:text-color-default container relative top-px w-20 min-w-fit max-w-fit cursor-pointer snap-center rounded rounded-b-none border border-b-0 p-2 text-center transition"
            key={idx}
            onClick={() => changeTab(idx)}
          >
            {title}
          </span>
        ))}
      </div>

      <div className="bg-shade-dark border-shade-light rounded rounded-t-none border">
        {tabs.filter((_, idx) => idx === activeTab)}
      </div>
    </div>
  );
};

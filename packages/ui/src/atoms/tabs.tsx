import { PropsWithChildren, useEffect, useState } from 'react';

import './tabs.css';

export type TabID = number;
export interface ITabType {
  title: string;
}

export interface ITabProps {
  title: ITabType['title'];
}

export const Tab = ({ children }: PropsWithChildren & ITabProps) => {
  return <div className="tab">{children}</div>;
};

export interface ITabsProps {
  onTabChange?: (tab: ITabType) => void;
}

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

    setActiveTab(id);
    onTabChange?.(tab);
  };

  return (
    <div className="tabs">
      <span>active: {activeTab}</span>
      <div className="tabs__header">
        {tabsList.map(({ title }, idx) => (
          <span className="tabs__title" key={idx} onClick={() => changeTab(idx)}>
            {title}
          </span>
        ))}
      </div>

      <div className="tabs__wrapper">{tabs.filter((_, idx) => idx === activeTab)}</div>
    </div>
  );
};

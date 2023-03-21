import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

export type TabID = number;
export interface ITabType {
  title: string;
}

export interface ITabProps {
  title: ITabType['title'];
}

export interface ITabsProps {
  vertical?: boolean;
  onTabChange?: (tab: ITabType) => void;
}

export const Tab = ({ children }: PropsWithChildren & ITabProps) => {
  return <div className="p-2">{children}</div>;
};

export const Tabs = ({ children, onTabChange, vertical }: PropsWithChildren & ITabsProps) => {
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
        className={
          (isActive
            ? 'bg-shade-light text-color-default'
            : 'bg-shade-dark border-shade-light hover:bg-shade-light hover:text-color-default') +
          ' relative cursor-pointer snap-center rounded border p-2 text-center transition ' +
          (vertical ? 'rounded-r-none border-r-0' : 'w-20 min-w-fit max-w-fit rounded-b-none border-b-0')
        }
        key={idx}
        onClick={() => changeTab(idx)}
      >
        {title}
      </span>
    );
  });

  const activeTabRender = tabs.filter((_, idx) => idx === activeTab);

  const horizontalTab = (
    <>
      <div className="flex snap-x snap-mandatory flex-nowrap gap-4 overflow-x-auto">{tabsListRender}</div>
      <div className="bg-shade-dark border-shade-light rounded rounded-t-none border">{activeTabRender}</div>
    </>
  );

  const verticalTab = (
    <>
      <div className="grid grid-cols-6">
        <div className="col-start-1 col-end-3 flex flex-col gap-4">{tabsListRender}</div>
        <div className="bg-shade-dark border-shade-light col-span-full col-start-3 rounded rounded-l-none border">
          {activeTabRender}
        </div>
      </div>
    </>
  );

  return <div className="container rounded border p-4">{vertical ? <>{verticalTab}</> : <>{horizontalTab}</>}</div>;
};

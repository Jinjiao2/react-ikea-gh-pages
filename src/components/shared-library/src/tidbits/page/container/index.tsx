import React, { Fragment, ReactNode } from "react";

import { Box, Grid } from "@tidbits/react-tidbits";

import { PageHeader } from "../header";
import { PageMenu } from "../menu";
import { PageMenuType, SectionMenuType } from "../menu/helper";
import { TabMenuType } from "../tab-menu/helper";

interface Props {
  "data-testid": string;
  actions?: ReactNode;
  roles?: string[];
  children?: ReactNode;
  projectId?: string;
  jobId?: string;
  pageMenuType: PageMenuType;
  sectionMenuType?: SectionMenuType;
  pageTabMenuType?: TabMenuType;
  subTitle?: string;
  title?: string;
  loadingJobName?: boolean;
  path?: string;
}

export const PageContainer = ({
  "data-testid": dataTestId,
  actions,
  roles,
  children,
  projectId,
  jobId,
  pageMenuType,
  sectionMenuType,
  pageTabMenuType,
  title,
  loadingJobName,
  path,
}: Props): JSX.Element => {
  const renderHeader = () => {
    return title || loadingJobName ? (
      <PageHeader
        title={title}
        projectId={projectId}
        data-testid={`${title}-page-header`}
        actions={actions}
        roles={roles}
        pageMenuType={pageMenuType}
        sectionMenuType={sectionMenuType}
        pageTabMenuType={pageTabMenuType}
        loadingJobName={loadingJobName}
        baseUrl={path || `/${pageMenuType?.toLowerCase()}`}
      />
    ) : null;
  };

  const renderMenu = (
    sectionMenuType?: SectionMenuType,
    pageMenuType?: PageMenuType
  ) => {
    return sectionMenuType ? (
      <PageMenu
        baseUrl={`/${pageMenuType?.toLowerCase()}`}
        projectId={projectId}
        jobId={jobId}
        sectionMenuType={sectionMenuType}
      />
    ) : (
      <Fragment />
    );
  };

  // TODO: Not responsive friendly
  const renderContent = () => {
    const columnTemplate = sectionMenuType
      ? "210px minmax(0, 1fr)"
      : "minmax(0, 1fr)";
    return (
      <Grid
        gridTemplateColumns={[columnTemplate]}
        gridColumnGap="20px"
        gridRowGap="10px"
        width="100%"
      >
        {renderMenu(sectionMenuType, pageMenuType)}
        <Box>{children}</Box>
      </Grid>
    );
  };

  return (
    <Box data-testid={dataTestId} mb="spacer10">
      {renderHeader()}
      {renderContent()}
    </Box>
  );
};

import React, { Fragment, ReactNode } from "react";

import {
  Box,
  Text,
  SectionHeading,
  TabbedHeader,
  InlineSpinner,
} from "@tidbits/react-tidbits";

import { PageTabMenu } from "../tab-menu";

import { PageMenuType, SectionMenuType } from "../menu/helper";
import { TabMenuType } from "../tab-menu/helper";

interface Props {
  "data-testid": string;
  actions?: ReactNode;
  roles?: string[];
  title: string | ReactNode;
  titleIcon?: ReactNode;
  pageMenuType?: PageMenuType;
  sectionMenuType?: SectionMenuType;
  pageTabMenuType?: TabMenuType;
  loadingJobName?: boolean;
  projectId?: string;
  baseUrl?: string;
}

export const PageHeader = ({
  actions,
  roles,
  title,
  titleIcon,
  projectId,
  pageMenuType,
  sectionMenuType,
  pageTabMenuType,
  loadingJobName,
  baseUrl,
  "data-testid": dataTestId,
}: Props): JSX.Element => {
  const renderActionButtons = () => {
    if (!actions) {
      return null;
    }
    if (Array.isArray(actions)) {
      return (
        <Fragment>
          {actions.filter(Boolean).map((button, idx) => (
            <SectionHeading.ToolButton key={idx}>
              {button}
            </SectionHeading.ToolButton>
          ))}
        </Fragment>
      );
    } else {
      return <SectionHeading.ToolButton>{actions}</SectionHeading.ToolButton>;
    }
  };
  const renderRoles = () => {
    return roles ? (
      <Text color="labelCaption" textStyle="h6Medium">
        Your Roles:{" "}
        {roles.map((role: string, index: number) => {
          return (index ? ", " : "") + role;
        })}
      </Text>
    ) : null;
  };

  return (
    <Box mt="spacer20" mb="spacer10">
      <TabbedHeader data-testid={dataTestId}>
        {loadingJobName && <InlineSpinner visible={true} mr="6px" />}
        <TabbedHeader.Title textStyle="h3Emph">
          {titleIcon}
          {title}
        </TabbedHeader.Title>

        {pageTabMenuType && (
          <PageTabMenu
            projectId={projectId}
            pageTabMenuType={pageTabMenuType}
            baseUrl={baseUrl}
          />
        )}
        {renderActionButtons()}
        {renderRoles()}
      </TabbedHeader>
    </Box>
  );
};

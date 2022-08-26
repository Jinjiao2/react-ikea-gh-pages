import styled from "styled-components";

import React from "react";
import { useFormContext } from "react-hook-form";

import { Box, Text, layouts } from "@tidbits/react-tidbits";

import { useThemeDetector } from "../../../shared/hooks/utils";

import { LakehouseFormData } from "../types";

export const ReviewStep = () => {
  const { getValues } = useFormContext<LakehouseFormData>();
  const { isDarkTheme } = useThemeDetector();

  return (
    <>
      <Text textStyle="h4Regular" mb="20px">
        Review
      </Text>
      <Container>
        <Info>
          <Text textStyle="bodyRegular">Lakehouse Name</Text>
          <Text textStyle="h4Medium">{getValues("name") || "–"}</Text>
        </Info>
        <Info>
          <Text textStyle="bodyRegular">Catalogs</Text>
          <Text textStyle="h4Medium">
            {getValues("catalogs")?.join(", ") || "–"}
          </Text>
        </Info>
        <Info>
          <Text textStyle="bodyRegular">Compute</Text>
          <Text textStyle="h4Medium">{getValues("namespaceType") || "–"}</Text>
        </Info>

        <Info>
          <Text textStyle="bodyRegular">Acscess Control</Text>
          <layouts.EvenGrid cols={[1, 2, 4]}>
            <GridItem>
              <Text textStyle="h5Regular">Admin</Text>
              <Text textStyle="h4Medium">
                {getValues("admins")?.join(", ")}
              </Text>
            </GridItem>
            <GridItem>
              <Text textStyle="h5Regular">Maintain</Text>
              <Text textStyle="h4Medium">–</Text>
            </GridItem>
            <GridItem>
              <Text textStyle="h5Regular">Developer</Text>
              <Text textStyle="h4Medium">–</Text>
            </GridItem>
            <GridItem>
              <Text textStyle="h5Regular">Report</Text>
              <Text textStyle="h4Medium">–</Text>
            </GridItem>
          </layouts.EvenGrid>
        </Info>
      </Container>
    </>
  );
};

const Container = styled(Box)`
  display: grid;
  gap: 30px;
`;

const Info = styled(Box)`
  display: grid;
  gap: 12px;
`;

const GridItem = styled(Info)`
  border-right: 1px solid ${({ theme: { colors } }) => colors.keyline};

  &:last-of-type {
    border: none;
  }
`;

import styled from "styled-components";

import React, { FC, memo } from "react";

import { Popover, Text } from "@tidbits/react-tidbits";
import { CloseFilledIcon, DownIcon } from "@tidbits/react-tidbits/Icons";

import { DropdownOptionType } from "../../../../../../shared/types/common";

type ButtonSelectProps = {
  displayedValue: string;
  disabled: boolean | undefined;
  isHidden: boolean;
  isCloseButtonShown: boolean;
  isError: boolean;
  placeholder?: string;
  setHidden: (value: boolean) => void;
  freeTextPlaceholder?: string;
  onChange: (value: DropdownOptionType | null) => void;
  onBlur: () => void;
};

export const SelectBox: FC<ButtonSelectProps> = memo(
  ({
    displayedValue,
    disabled,
    isHidden,
    isCloseButtonShown,
    isError,
    placeholder = "Select",
    setHidden,
    onChange,
    onBlur,
  }) => {
    return (
      <ButtonSelect
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (Popover.isKbInteraction(e)) {
            setHidden(!isHidden);
          }
          if (Popover.isKbDismiss(e)) {
            setHidden(true);
          }
          if (e.nativeEvent.code == "Tab") {
            setHidden(true);
          }
        }}
        $disabled={!!disabled}
        $error={isError}
      >
        <div className="valueContainer" onClick={() => setHidden(!isHidden)}>
          {displayedValue ? (
            <Text color="label">{displayedValue}</Text>
          ) : (
            <Text color="labelPlaceholder">{placeholder}</Text>
          )}
        </div>
        <div className="indicators">
          {isCloseButtonShown ? (
            <div
              className="indicator clearIcon"
              onClick={() => {
                if (!isHidden) {
                  setHidden(true);
                }
                onChange(null);
                onBlur();
              }}
            >
              <CloseFilledIcon name="close" width="10px" height="10px" />
            </div>
          ) : null}
          <span className="separator" />
          <div className="indicator" onClick={() => setHidden(!isHidden)}>
            <DownIcon name="down" width="10px" height="10px" />
          </div>
        </div>
      </ButtonSelect>
    );
  }
);

const ButtonSelect = styled("div")<{ $disabled: boolean; $error: boolean }>`
  display: flex;
  justify-content: space-between;
  border: 1px solid;
  padding: 0 1px;
  border-color: ${(props) =>
    props.$error ? props.theme.colors.badInputBdr : props.theme.colors.keyline};
  border-radius: 4px;
  background-color: ${(props) =>
    props.$disabled ? props.theme.colors.bgPlaceholder : props.theme.colors.bg};
  color: ${(props) =>
    props.$disabled
      ? props.theme.colors.labelCaption
      : props.theme.colors.label};
  font-size: 13px;
  pointer-events: ${({ $disabled }): string => ($disabled ? "none" : "auto")};

  &:focus {
    outline: none;
  }

  &:focus-within {
    border-color: ${({ theme: { colors } }) => colors.ctrlHover};
    box-shadow: 0 0 0 3px rgba(95, 171, 254, 0.55);
  }

  > .valueContainer {
    position: relative;
    display: flex;
    overflow: hidden;
    flex: 1 1 0;
    flex-wrap: wrap;
    align-items: center;
    padding: 2px 8px;
    box-sizing: border-box;
  }

  > .indicators {
    display: flex;
    align-items: center;
    align-self: stretch;
    flex-shrink: 0;
    color: ${(props) => props.theme.colors.labelPlaceholder};
  }

  .indicator {
    display: flex;
    padding: 9px 12px;
  }

  .clearIcon {
    cursor: pointer;
  }

  .separator {
    width: 1px;
    margin: 8px 0;
    align-self: stretch;
    background-color: ${(props) => props.theme.colors.keyline};
  }
`;

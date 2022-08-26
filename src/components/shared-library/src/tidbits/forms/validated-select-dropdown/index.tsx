import { ErrorMessage } from "@hookform/error-message";
import noop from "lodash/noop";
import styled, { css } from "styled-components";

import React, {
  ChangeEvent,
  Fragment,
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { RegisterOptions } from "react-hook-form/dist/types";

import {
  Box,
  Fade,
  InfoTooltip,
  MenuList,
  Popover,
  TableSearch,
  Text,
} from "@tidbits/react-tidbits";
import { Label } from "@tidbits/react-tidbits/Form";
import { InlineSpinner } from "@tidbits/react-tidbits/Spinner";

import { DropdownSelectProps } from "@acs/shared-library/tidbits/react-tidbits";

import {
  DropdownOptionType,
  GroupedDropdownOptionType,
} from "../../../../../shared/types/common";

import {
  DEFAULT_FREE_TEXT_VALUE,
  DEFAULT_VALIDATION_MESSAGE,
} from "../../helpers";
import { SystemMenuListItemProps } from "../../react-tidbits";
import { ValidationError } from "../validation-error";
import { FreeTextOption } from "./free-text-option";
import { SelectBox } from "./select-box";

interface Props<T> extends DropdownSelectProps<T> {
  title?: ReactNode;
  name: string;
  hint?: string | JSX.Element;
  classNames?: Partial<{
    label: string;
    dropdown: string;
  }>;
  validationOptions?: RegisterOptions;
  width?: string;
  description?: ReactNode;
  additionalOnChange?: (selected: DropdownOptionType) => void;
  fetchErrorMessage?: ReactNode;
  isCreatableSelect?: boolean;
  freeTextPlaceholder?: string;
  freeTextValidation?: (value: string) => string | boolean;
  isLoading?: boolean;
  options?: DropdownOptionType[] | GroupedDropdownOptionType[] | undefined;
  menuListProps?: SystemMenuListItemProps;
  validateOnlyTouched?: boolean;
  "data-testid"?: string;
  id?: string;
  showErrorMessage?: boolean;
  isSearchable?: boolean;
  isCloseButtonShown?: boolean;
}

export function ValidatedSelectDropdown<OptionType>({
  title,
  name,
  hint,
  validationOptions,
  description,
  additionalOnChange,
  fetchErrorMessage,
  isCreatableSelect = false,
  freeTextPlaceholder,
  freeTextValidation,
  options,
  isLoading,
  menuListProps,
  validateOnlyTouched = true,
  "data-testid": dataTestId,
  id,
  showErrorMessage = true,
  isSearchable = false,
  isCloseButtonShown = true,
  ...rest
}: Props<OptionType>): JSX.Element {
  const searchInputRef = useRef<RefObject<HTMLInputElement>>(null);
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext();
  const [freeTextValue, setFreeTextValue] = useState<string | null>(null);
  const [freeTextValidationResult, setFreeTextValidationResult] = useState<
    string | boolean
  >(true);
  const [searchText, setSearchText] = useState<string>("");
  const isRequired = validationOptions?.required;
  const getDisplayValue = (selected: DropdownOptionType) =>
    selected?.label ?? "";

  const getCloseButtonShownState = useCallback(
    (val: DropdownOptionType): boolean => {
      const value = getDisplayValue(val);
      return (
        !!value &&
        value !== rest?.placeholder &&
        !rest.disabled &&
        isCloseButtonShown
      );
    },
    [rest, isCloseButtonShown]
  );

  const freeTextError = useMemo(() => {
    if (typeof freeTextValidationResult === "string") {
      return freeTextValidationResult;
    } else if (!freeTextValidationResult) {
      return DEFAULT_VALIDATION_MESSAGE;
    }
    return "";
  }, [freeTextValidationResult]);

  const renderOptions = useCallback(
    (
      selectedValue: DropdownOptionType,
      onChange: (e: Event, value: DropdownOptionType | null) => void
    ) => {
      let menuListOptions: JSX.Element[];

      if ((options as GroupedDropdownOptionType[])[0]?.options) {
        menuListOptions = (options as GroupedDropdownOptionType[]).reduce(
          (acc: JSX.Element[], optionGroup: GroupedDropdownOptionType) => {
            return [
              ...acc,
              <MenuList.Item disabled key={optionGroup.label}>
                {optionGroup.label}
              </MenuList.Item>,
              optionGroup.options
                .filter((option) =>
                  option?.label
                    ?.toLowerCase()
                    .includes(searchText.trim().toLowerCase())
                )
                .map((option: DropdownOptionType, index: number) => (
                  <MenuList.Item
                    key={`${option.value}-${index}`}
                    selected={option.value === selectedValue?.value}
                    onClick={(e: Event) => {
                      setFreeTextValue(null);
                      setFreeTextValidationResult(true);
                      onChange(e, option);
                      additionalOnChange?.(option);
                    }}
                  >
                    <Popover.Tooltip
                      target={({ ref: tooltipRef, show, hide }: any) => (
                        <Text
                          as="div"
                          cursor="pointer"
                          width="100%"
                          p="spacer5"
                          ref={tooltipRef}
                          tabIndex="0"
                          onMouseOver={option?.tooltip ? show : noop}
                          onMouseLeave={hide}
                        >
                          {option.label}
                        </Text>
                      )}
                    >
                      <Text
                        as="div"
                        bg="label"
                        color="bg"
                        p="spacer5"
                        borderRadius="5px"
                      >
                        {option?.tooltip}
                      </Text>
                    </Popover.Tooltip>
                  </MenuList.Item>
                )),
            ] as JSX.Element[];
          },
          []
        );
      } else {
        menuListOptions = (options as DropdownOptionType[])
          .filter((option: DropdownOptionType) =>
            option?.label
              ?.toLowerCase()
              .includes(searchText.trim().toLowerCase())
          )
          .map((option: DropdownOptionType, index: number) => (
            <MenuList.Item
              key={`${option.value}-${index}`}
              selected={option.value === selectedValue?.value}
              onClick={(e: Event) => {
                setFreeTextValue(null);
                setFreeTextValidationResult(true);
                onChange(e, option);
                additionalOnChange?.(option);
              }}
            >
              {option.label}
            </MenuList.Item>
          ));
      }

      if (isCreatableSelect) {
        return [
          <FreeTextOption
            key="free-text-option"
            onKeyDown={(e: KeyboardEvent) => {
              if (
                freeTextValue &&
                e.code === "Enter" &&
                freeTextValidationResult === true
              ) {
                onChange(e, {
                  value: DEFAULT_FREE_TEXT_VALUE,
                  label: freeTextValue,
                });
              } else if (
                e.code === "Enter" &&
                selectedValue?.value == DEFAULT_FREE_TEXT_VALUE
              ) {
                onChange(e, null);
              }
              return;
            }}
            freeTextPlaceholder={freeTextPlaceholder}
            value={freeTextValue}
            errorText={freeTextError}
            onChange={(value) => {
              setFreeTextValue(value);
              if (freeTextValidation) {
                setFreeTextValidationResult(
                  value ? freeTextValidation(value) : true
                );
              }
            }}
          />,
          ...menuListOptions,
        ];
      }
      return menuListOptions;
    },
    [
      options,
      freeTextValue,
      freeTextValidationResult,
      freeTextPlaceholder,
      searchText,
    ]
  );

  const showErrors =
    (!validateOnlyTouched || !!get(touchedFields, name)) && !!get(errors, name);

  const handleSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event?.target?.value ?? "");
  };

  return (
    <ValidatedContainer
      textStyle="h6Regular"
      pb="spacer15"
      showErrorMessage={showErrorMessage}
    >
      <Box display="flex" gap="4px">
        <Title
          as="div"
          textStyle="h6Regular"
          my="unset"
          color="label"
          isRequired={isRequired}
        >
          {title}
        </Title>
        {hint && (
          <InfoTooltip>
            <InfoTooltip.Content>
              {typeof hint === "string" ? (
                <Text textStyle="bodyRegular">{hint}</Text>
              ) : (
                hint
              )}
            </InfoTooltip.Content>
          </InfoTooltip>
        )}
      </Box>
      <Box data-testid={dataTestId} id={id}>
        <Controller
          render={({
            field: { onChange: onChangeBase, onBlur: onBlurBase, value },
          }) => {
            return (
              <Popover.ClickAwayOpenState
                onClickAway={() => {
                  setSearchText("");
                }}
              >
                {({
                  isHidden,
                  setHidden,
                  containerRef,
                  targetRef,
                }: {
                  isHidden: boolean;
                  setHidden: (isHidden: boolean) => void;
                  containerRef: RefObject<HTMLDivElement>;
                  targetRef: RefObject<HTMLDivElement>;
                }) => (
                  <Box display="inline" ref={targetRef}>
                    <Popover.BaseDropdown
                      data-testid={`${dataTestId}-dropdown`}
                      ref={containerRef}
                      hidden={isHidden}
                      role="tooltip"
                      placement="bottom"
                      target={({
                        ref: baseRef,
                      }: {
                        ref: RefObject<HTMLDivElement>;
                      }) => (
                        <SelectBoxContainer ref={baseRef}>
                          <SelectBox
                            displayedValue={getDisplayValue(value)}
                            placeholder={rest?.placeholder}
                            disabled={rest.disabled}
                            isHidden={isHidden}
                            isCloseButtonShown={getCloseButtonShownState(value)}
                            isError={showErrors}
                            setHidden={(val) => setHidden(val)}
                            onChange={(val: DropdownOptionType | null) => {
                              onChangeBase(val);
                              additionalOnChange?.(undefined);
                            }}
                            onBlur={() => onBlurBase()}
                          />
                        </SelectBoxContainer>
                      )}
                      onClose={() => {
                        if (
                          freeTextValue &&
                          freeTextValidationResult === true
                        ) {
                          onChangeBase({
                            value: DEFAULT_FREE_TEXT_VALUE,
                            label: freeTextValue,
                          });
                        } else if (value?.value === DEFAULT_FREE_TEXT_VALUE) {
                          onChangeBase(null);
                        }
                        onBlurBase();
                      }}
                    >
                      <MenuList
                        maxHeight="300px"
                        minWidth="300px"
                        {...menuListProps}
                        data-testid={`${dataTestId}-menu`}
                        onBlur={(event: any) =>
                          setHidden(
                            !event.currentTarget.contains(event.relatedTarget)
                          )
                        }
                      >
                        {isLoading ? (
                          <MenuList.Item disabled>
                            <InlineSpinner visible={true} mr="6px" />
                            Loading...
                          </MenuList.Item>
                        ) : (
                          [
                            isSearchable && !isCreatableSelect ? (
                              <Fade
                                key="fade-search"
                                visible={isSearchable}
                                onEntered={() => {
                                  searchInputRef?.current?.focus();
                                }}
                              >
                                <OptionSearchBox
                                  handleSearchChange={handleSearchText}
                                  searchPlaceHolder="Search"
                                  key="search-box"
                                  inputProps={{ ref: searchInputRef }}
                                />
                              </Fade>
                            ) : (
                              <Fragment key="Search" />
                            ),
                            ...renderOptions(
                              value,
                              (e: Event, value: DropdownOptionType | null) => {
                                e.preventDefault();
                                onChangeBase(value);
                                setHidden(!isHidden);
                              }
                            ),
                          ]
                        )}
                      </MenuList>
                    </Popover.BaseDropdown>
                  </Box>
                )}
              </Popover.ClickAwayOpenState>
            );
          }}
          name={`${name}` as const}
          control={control}
          rules={validationOptions}
        />
      </Box>
      {showErrors && (
        <ErrorMessage errors={errors} name={name} as={<ValidationError />} />
      )}
      {fetchErrorMessage}
      {description && (
        <Text textStyle="bodySmallMedium" mt="spacer5">
          {description}
        </Text>
      )}
    </ValidatedContainer>
  );
}

const ValidatedContainer = styled(Label)`
  display: grid;
  grid-template-rows: 20px 36px ${(props) =>
      props.showErrorMessage ? "20px" : "0"};
`;

const SelectBoxContainer = styled(Box)`
  margin-top: 6px;
`;

const OptionSearchBox = styled(TableSearch)`
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${(props) => props.theme.colors.keyline};
`;

const MandatorySign = css`
  display: inline-block;
  margin-right: 4px;
  color: ${({ theme: { colors } }) => colors.error};
  content: "*";
`;

const Title = styled(Text)`
  &:before {
    ${(props) => (props.isRequired ? MandatorySign : "")}
  }
`;

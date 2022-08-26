// TODO: remove this after the request is approved (https://github.pie.apple.com/tidbits/react-tidbits/pull/2512/files)
import { DefaultTheme, StyledComponent } from 'styled-components'

import * as React from 'react'
import { RefObject } from 'react'

export type ResponsiveCSSValue = number | string | (number | string)[]

export type SpacerConst =
  | 'spacer0'
  | 'spacer5'
  | 'spacer10'
  | 'spacer15'
  | 'spacer20'
  | 'spacer25'
  | 'spacer30'
  | 'spacer40'
  | 'spacer70'
  | 'tight'
  | 'standardSmBp'
  | 'standard'
  | 'disassociate'
  | 'unrelated'
  | 'header'
  | 'footer'

export type Spacer = SpacerConst | SpacerConst[]

export type TextStyleName =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'bodyBpSm'
  | 'bodyViewS'
  | 'bodySmall'
  | 'bodyXs'
  | 'menuListItem'
  | 'emailBody'
  | 'kpi'
  | 'h1Elevated'

export type TextStyleVariant = 'Regular' | 'Medium' | 'Emph'

export type TextStyle =
  | 'h1Regular'
  | 'h1Medium'
  | 'h1Emph'
  | 'h1ElevatedRegular'
  | 'h1ElevatedEmph'
  | 'h2Regular'
  | 'h2Medium'
  | 'h2Emph'
  | 'h3Regular'
  | 'h3Medium'
  | 'h3Emph'
  | 'h4Regular'
  | 'h4Medium'
  | 'h4Emph'
  | 'h5Regular'
  | 'h5Medium'
  | 'h5Emph'
  | 'h6Regular'
  | 'h6Medium'
  | 'h6Emph'
  | 'bodyRegular'
  | 'bodyMedium'
  | 'bodyEmph'
  | 'bodyViewSRegular'
  | 'bodyViewSMedium'
  | 'bodyViewSEmph'
  | 'bodySmallRegular'
  | 'bodySmallMedium'
  | 'bodySmallEmph'
  | 'bodyXsRegular'
  | 'bodyXsEmph'
  | 'menuListItemRegular'
  | 'menuListItemEmph'
  | 'emailBodyRegular'
  | 'emailBodyEmph'
  | 'kpiRegular'

export type TextStyles = TextStyle | TextStyle[]

export type InputVariant = 'standard' | 'destructive' | 'disabled'

export interface SpaceProps extends SystemPaddingProps, SystemMarginProps {}

export interface SystemColorProps {
  bg?: ResponsiveCSSValue
  backgroundColor?: ResponsiveCSSValue
  color?: ResponsiveCSSValue
}

export interface SystemSpaceProps {
  sa?: Spacer
  spaceAbove?: Spacer
  sb?: Spacer
  spaceBelow?: Spacer
}

export interface SystemBordersProps {
  border?: ResponsiveCSSValue
  borderLeft?: ResponsiveCSSValue
  borderRight?: ResponsiveCSSValue
  borderTop?: ResponsiveCSSValue
  borderBottom?: ResponsiveCSSValue
  borderColor?: ResponsiveCSSValue
  borderRadius?: ResponsiveCSSValue
  borderStyle?: ResponsiveCSSValue
}

export interface SystemPaddingProps {
  p?: ResponsiveCSSValue
  padding?: ResponsiveCSSValue
  px?: ResponsiveCSSValue
  paddingX?: ResponsiveCSSValue
  py?: ResponsiveCSSValue
  paddingY?: ResponsiveCSSValue
  pt?: ResponsiveCSSValue
  paddingTop?: ResponsiveCSSValue
  pb?: ResponsiveCSSValue
  paddingBottom?: ResponsiveCSSValue
  pl?: ResponsiveCSSValue
  paddingLeft?: ResponsiveCSSValue
  pr?: ResponsiveCSSValue
  paddingRight?: ResponsiveCSSValue
}

export interface SystemMarginProps {
  m?: ResponsiveCSSValue
  margin?: ResponsiveCSSValue
  mb?: ResponsiveCSSValue
  marginBottom?: ResponsiveCSSValue
  mt?: ResponsiveCSSValue
  marginTop?: ResponsiveCSSValue
  ml?: ResponsiveCSSValue
  marginLeft?: ResponsiveCSSValue
  mr?: ResponsiveCSSValue
  marginRight?: ResponsiveCSSValue
  mx?: ResponsiveCSSValue
  marginX?: ResponsiveCSSValue
  my?: ResponsiveCSSValue
  marginY?: ResponsiveCSSValue
}

export interface SystemBoxProps
  extends SpaceProps,
    SystemColorProps,
    SystemSpaceProps,
    SystemBordersProps {
  alignContent?: ResponsiveCSSValue
  alignItems?: ResponsiveCSSValue
  alignSelf?: ResponsiveCSSValue
  gridColumn?: ResponsiveCSSValue
  gridColumnStart?: ResponsiveCSSValue
  gridColumnEnd?: ResponsiveCSSValue
  gridRow?: ResponsiveCSSValue
  gridRowStart?: ResponsiveCSSValue
  gridRowEnd?: ResponsiveCSSValue
  gridArea?: ResponsiveCSSValue
  bottom?: ResponsiveCSSValue
  cursor?: ResponsiveCSSValue
  display?: ResponsiveCSSValue
  flex?: ResponsiveCSSValue
  flexBasis?: ResponsiveCSSValue
  flexDirection?: ResponsiveCSSValue
  flexGrow?: ResponsiveCSSValue
  flexShrink?: ResponsiveCSSValue
  flexFlow?: ResponsiveCSSValue
  flexWrap?: ResponsiveCSSValue
  fontFamily?: ResponsiveCSSValue
  fontSize?: ResponsiveCSSValue
  width?: ResponsiveCSSValue
  height?: ResponsiveCSSValue
  justifyContent?: ResponsiveCSSValue
  justifySelf?: ResponsiveCSSValue
  justifyItems?: ResponsiveCSSValue
  placeContent?: ResponsiveCSSValue
  placeSelf?: ResponsiveCSSValue
  placeItems?: ResponsiveCSSValue
  left?: ResponsiveCSSValue
  minWidth?: ResponsiveCSSValue
  maxWidth?: ResponsiveCSSValue
  maxHeight?: ResponsiveCSSValue
  minHeight?: ResponsiveCSSValue
  order?: ResponsiveCSSValue
  overflow?: ResponsiveCSSValue
  position?: ResponsiveCSSValue
  right?: ResponsiveCSSValue
  textAlign?: ResponsiveCSSValue
  textStyle?: TextStyles
  textTransform?: ResponsiveCSSValue
  textOverflow?: ResponsiveCSSValue
  top?: ResponsiveCSSValue
  transform?: ResponsiveCSSValue
  verticalAlign?: ResponsiveCSSValue
  visibility?: ResponsiveCSSValue
  whiteSpace?: ResponsiveCSSValue
  wordBreak?: ResponsiveCSSValue
  zIndex?: ResponsiveCSSValue
}

interface InputIconProps {
  color?: ResponsiveCSSValue
  width?: ResponsiveCSSValue
  height?: ResponsiveCSSValue
  position?: ResponsiveCSSValue
  top?: ResponsiveCSSValue
  mt?: ResponsiveCSSValue
  pl?: ResponsiveCSSValue
  pr?: ResponsiveCSSValue
  left?: ResponsiveCSSValue
}

interface SystemInputTextProps {
  IconComponent?: React.ComponentType<InputIconProps>
  clearable?: boolean
  onChange?: any
  boxProps?: any
}

export type RefHandler = (ref: HTMLElement | null) => void

export interface ReferenceChildrenProps {
  ref: RefHandler
}

export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface ArrowComponentProps {
  placement?: PopoverPlacement
  bgColor?: string
  borderColor?: string
  size?: number
}

export interface PopoverBaseImplProps<ContainerProps = SystemBoxProps> {
  target: (props: ReferenceChildrenProps) => React.ReactNode
  zIndex?: number
  placement?: PopoverPlacement
  boundary?: Element | any
  positionFixed?: boolean
  role?: string
  popperProps?: any
  portalContainer?: Element
  unmountOnExit?: boolean
  mountOnEnter?: boolean
  onOpen?: () => void
  onClose?: () => void
  hidden?: boolean
  arrowSize?: number
  ArrowComponent?: React.ComponentType<ArrowComponentProps>
  Container?: React.ComponentType<ContainerProps>
}

export interface DropdownMenuChildrenProps {
  show: () => void
  hide: () => void
  isHidden: boolean
  setHidden: (hidden: boolean) => void
}

interface DropdownMenuTargetProps extends DropdownMenuChildrenProps {
  targetProps: { ref: Ref<HTMLElement>; onClick: () => void }
}

export interface DropdownMenuProps
  extends PopoverBaseImplProps<SystemBoxProps> {
  Container?: never
  containerProps?: SystemBoxProps
  target: (props: ReferenceChildrenProps) => React.ReactNode
  children: (children: DropdownMenuChildrenProps) => JSX.Element
}

interface SystemMenuListItemProps {
  cursor?: ResponsiveCSSValue
  color?: ResponsiveCSSValue
  hoverBg?: ResponsiveCSSValue
  hoverColor?: ResponsiveCSSValue
  textStyle?: TextStyles
  sa?: Spacer
  spaceAbove?: Spacer
  sb?: Spacer
  spaceBelow?: Spacer
  m?: ResponsiveCSSValue
  margin?: ResponsiveCSSValue
  mb?: ResponsiveCSSValue
  marginBottom?: ResponsiveCSSValue
  mt?: ResponsiveCSSValue
  marginTop?: ResponsiveCSSValue
  ml?: ResponsiveCSSValue
  marginLeft?: ResponsiveCSSValue
  mr?: ResponsiveCSSValue
  marginRight?: ResponsiveCSSValue
  mx?: ResponsiveCSSValue
  marginX?: ResponsiveCSSValue
  my?: ResponsiveCSSValue
  marginY?: ResponsiveCSSValue
  p?: ResponsiveCSSValue
  padding?: ResponsiveCSSValue
  px?: ResponsiveCSSValue
  paddingX?: ResponsiveCSSValue
  py?: ResponsiveCSSValue
  paddingY?: ResponsiveCSSValue
  pt?: ResponsiveCSSValue
  paddingTop?: ResponsiveCSSValue
  pb?: ResponsiveCSSValue
  paddingBottom?: ResponsiveCSSValue
  pl?: ResponsiveCSSValue
  paddingLeft?: ResponsiveCSSValue
  pr?: ResponsiveCSSValue
  paddingRight?: ResponsiveCSSValue
  width?: ResponsiveCSSValue
  minWidth?: ResponsiveCSSValue
  display?: ResponsiveCSSValue
  border?: ResponsiveCSSValue
  borderRadius?: ResponsiveCSSValue
  borderColor?: ResponsiveCSSValue
  borderTop?: ResponsiveCSSValue
  borderRight?: ResponsiveCSSValue
  borderBottom?: ResponsiveCSSValue
  borderLeft?: ResponsiveCSSValue
  borderStyle?: ResponsiveCSSValue
  liProps?: React.ComponentPropsWithoutRef<'li'>
}

export type ModalStateChildrenProps = {
  show: () => void
  hide: () => void
  isHidden: boolean
}

export type RefChildrenProps<T> = {
  ref: RefObject<T>
  setRef: (ref: RefObject<T>) => void
}

export interface DropdownSelectProps<ValueT> {
  name?: string
  value?: ValueT | null
  id?: string
  typeahead?: boolean
  dropdownProps?: DropdownMenuProps
  menuListProps?: SystemMenuListItemProps
  children?: any
  disabled?: boolean
  variant?: any
  placeholder?: string
  noResultsLabel?: string
  onChange?: (value: ValueT) => void
  onFilterChange?: (filter: string) => void
  filterEnabled?: boolean
}

export interface InputChipsProps<ValueT> {
  allowDuplicates?: boolean
  autocompleteExtraItems?: React.ReactNode
  autoCompleteOnly?: boolean
  children?: any
  ChipComponent?: React.ReactNode
  chipTitleRender?: (value: ValueT) => void
  defaultValue?: string
  disabled?: boolean
  dropdownProps?: DropdownMenuProps
  id?: string
  inputProps?: SystemInputTextProps
  isChipDisabled?: (value: ValueT) => void
  isOptionVisible?: (ValueT, any) => void
  menuListProps?: SystemMenuListItemProps
  name?: string
  noResultsLabel?: string
  onChange?: (value: ValueT) => void
  placeholder?: string
  showDropdownIfNoResults?: boolean
  value?: ValueT | null
  variant?: InputVariant
}

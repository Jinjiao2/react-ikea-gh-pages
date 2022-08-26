import { useTheme } from 'styled-components'

import { CSSProperties } from 'react'

type TextStyle = {
  em: { fontStyle: CSSProperties['fontWeight'] }
  fontFamily: CSSProperties['fontFamily']
  fontSize: CSSProperties['fontSize']
  fontWeight: CSSProperties['fontWeight']
  letterSpacing: CSSProperties['letterSpacing']
  lineHeight: CSSProperties['lineHeight']
}

export type TidbitsTheme = {
  font: string
  textStyles: {
    bodyBpSmEmph: TextStyle
    bodyBpSmMedium: TextStyle
    bodyBpSmRegular: TextStyle
    bodyEmph: TextStyle
    bodyMedium: TextStyle
    bodyRegular: TextStyle
    bodySmallEmph: TextStyle
    bodySmallMedium: TextStyle
    bodySmallRegular: TextStyle
    bodyViewSEmph: TextStyle
    bodyViewSMedium: TextStyle
    bodyViewSRegular: TextStyle
    bodyXsEmph: TextStyle
    bodyXsRegular: TextStyle
    emailBodyEmph: TextStyle
    emailBodyRegular: TextStyle
    h1ElevatedEmph: TextStyle
    h1ElevatedRegular: TextStyle
    h1Emph: TextStyle
    h1Regular: TextStyle
    h2Emph: TextStyle
    h2Regular: TextStyle
    h3Emph: TextStyle
    h3Regular: TextStyle
    h4Emph: TextStyle
    h4Medium: TextStyle
    h4Regular: TextStyle
    h5Emph: TextStyle
    h5Medium: TextStyle
    h5Regular: TextStyle
    h6Emph: TextStyle
    h6Medium: TextStyle
    h6Regular: TextStyle
    kpiRegular: TextStyle
    menuListItemEmph: TextStyle
    menuListItemRegular: TextStyle
  }
  colors: {
    SCHEME: string
    appleMusicRed: string //#DA0F47
    badInputBdr: string //#FF3333
    badInputBdrDark: string //#FF3333
    badInputBdrLight: string //#DE071C
    badInputBg: string //#FF3333
    badInputBgDark: string //#FF3333
    badInputBgLight: string //#DE071C
    badInputLabel: string //#FFFFFF
    badInputLabelDark: string //#FFFFFF
    badInputLabelLight: string //#FFFFFF
    bg: string //#1E1E1E
    bgDark: string //#1E1E1E
    bgLight: string //#FFFFFF
    bgPlaceholder: string //#252525
    bgPlaceholderDark: string //#252525
    bgPlaceholderLight: string //#FAFAFA
    clrBlue: string //#1184FF
    clrBlueDark: string //#1184FF
    clrBlueLight: string //#0070C9
    clrGray: string //#98989D
    clrGrayDark: string //#98989D
    clrGrayLight: string //#8E8E93
    clrGreen: string //#31D158
    clrGreenDark: string //#31D158
    clrGreenLight: string //#34C759
    clrIndigo: string //#5E5BE6
    clrIndigoDark: string //#5E5BE6
    clrIndigoLight: string //#5A55D5
    clrOrange: string //#FF9F0A
    clrOrangeDark: string //#FF9F0A
    clrOrangeLight: string //#FF9500
    clrPink: string //#FF573F
    clrPinkDark: string //#FF573F
    clrPinkLight: string //#FF2D55
    clrPurple: string //#BF5AF2
    clrPurpleDark: string //#BF5AF2
    clrPurpleLight: string //#AF51DE
    clrRed: string //#FF453A
    clrRedDark: string //#FF453A
    clrRedLight: string //#FF3C2F
    clrTeal: string //#64D1FF
    clrTealDark: string //#64D1FF
    clrTealLight: string //#5CC8FA
    clrYellow: string //#FFD60A
    clrYellowDark: string //#FFD60A
    clrYellowLight: string //#FFCC02
    ctrl: string //#3897FE
    ctrlBg: string //#2B2B2B
    ctrlBgDark: string //#2B2B2B
    ctrlBgLight: string //#F2F2F2
    ctrlDark: string //#3897FE
    ctrlDisabled: string //#575757
    ctrlDisabledDark: string //#575757
    ctrlDisabledLabel: string //#254160
    ctrlDisabledLabelDark: string //#254160
    ctrlDisabledLabelLight: string //#B2D4EE
    ctrlDisabledLight: string //#CCCCCC
    ctrlHover: string //#5FABFE
    ctrlHoverDark: string //#5FABFE
    ctrlHoverLight: string //#0064B4
    ctrlLight: string //#0070C9
    error: string //#FF3333
    errorBdr: string //#4B2222
    errorBdrDark: string //#4B2222
    errorBdrLight: string //#F8CDD2
    errorBg: string //#3F1F1F
    errorBgDark: string //#3F1F1F
    errorBgLight: string //#FDECED
    errorDark: string //#FF3333
    errorHover: string //#FF4747
    errorHoverDark: string //#FF4747
    errorHoverLight: string //#C70619
    errorLight: string //#DE071C
    focus: string //rgba(131,192,253,0.5)
    footerBg: string //#252525
    footerBgDark: string //#252525
    footerBgLight: string //#F2F2F2
    info: string //#3897FE
    infoBdr: string //#23364B
    infoBdrDark: string //#23364B
    infoBdrLight: string //#CCE2F4
    infoBg: string //#202933
    infoBgDark: string //#202933
    infoBgLight: string //#EBF4FB
    infoDark: string //#3897FE
    infoHover: string //#5FABFE
    infoHoverDark: string //#5FABFE
    infoHoverLight: string //#0064B4
    infoLight: string //#0070C9
    keyline: string //#3F3F3F
    keylineDark: string //#3F3F3F
    keylineLight: string //#D6D6D6
    label: string //#DDDDDD
    labelCaption: string //#888
    labelCaptionDark: string //#888
    labelCaptionLight: string //#666
    labelDark: string //#DDDDDD
    labelLegal: string //#454545
    labelLegalDark: string //#454545
    labelLegalLight: string //#CCCCCC
    labelLight: string //#333
    labelPlaceholder: string //#7D7D7D
    labelPlaceholderDark: string //#7D7D7D
    labelPlaceholderLight: string //#888
    navBg: string //#2B2B2B
    navBgDark: string //#2B2B2B
    navBgLight: string //rgba(240,240,240,0.8)
    navLabel: string //#DDDDDD
    navLabelDark: string //#DDDDDD
    navLabelDisabled: string //#575757
    navLabelDisabledDark: string //#575757
    navLabelDisabledLight: string //#888
    navLabelHover: string //#FFFFFF
    navLabelHoverDark: string //#FFFFFF
    navLabelHoverLight: string //#333
    navLabelLight: string //#000
    navLabelSelected: string //#E8E8E8
    navLabelSelectedDark: string //#E8E8E8
    navLabelSelectedLight: string //#000000
    podcastPurple: string //#7D50DF
    success: string //#007D1B
    successBdr: string //#223718
    successBdrDark: string //#223718
    successBdrLight: string //#CCE5D1
    successBg: string //#1F291A
    successBgDark: string //#1F291A
    successBgLight: string //#EBF5ED
    successDark: string //#007D1B
    successHover: string //#1A8A32
    successHoverDark: string //#1A8A32
    successHoverLight: string //#007018
    successLight: string //#007D1B
    title: string //#E8E8E8
    titleDark: string //#E8E8E8
    titleLight: string //#111111
    tvBlue: string //#00BFF1
    tvBlueHighContrast: string //#007FB1
    warning: string //#FFD60A
    warningBdr: string //#4B431A
    warningBdrDark: string //#4B431A
    warningBdrLight: string //#FFF5CC
    warningBg: string //#342F1B
    warningBgDark: string //#342F1B
    warningBgLight: string //#FFFBEB
    warningDark: string //#FFD60A
    warningHover: string //#FFDA22
    warningHoverDark: string //#FFDA22
    warningHoverLight: string //#E5B700
    warningLight: string //#FFCC00
  }
}

export function useTidbitsTheme(): TidbitsTheme {
  const theme = useTheme()
  return theme as TidbitsTheme
}

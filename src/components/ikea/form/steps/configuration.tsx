import styled from 'styled-components'

import React, { useState } from 'react'
import DatePicker from 'react-horizontal-datepicker'

import {
  Form,
  List,
  MenuList,
  Box,
  Grid,
  Input,
  SearchAltIcon,
  Link as TidbitsLink,
  Text,
} from '@tidbits/react-tidbits'

import EchartsProjects from '../chart'

export const ConfigurationStep = () => {
  const [showAddress, setShowAddress] = useState(false)
  const onSearch = () => {
    setShowAddress(true)
  }
  const selectedDay = (val) => {
    console.log(val)
  }
  return (
    <Box>
      <Text textStyle='h4Emph' mb='spacer15'>
        Return at your local IKEA store
      </Text>
      <Grid
        gridTemplateColumns={['minmax(0, 1fr)', '300px minmax(0, 1fr)']}
        gridColumnGap='35px'
        gridRowGap='5px'
        width='100%'
      >
        <Box p='10px' textStyle='bodyRegular'>
          <Form.Label>
            Search by city, province
            <Input.Text
              IconComponent={SearchAltIcon}
              type='text'
              placeholder='Search'
              onChange={onSearch}
            />
          </Form.Label>
          {showAddress && (
            <List.UL listStyle='noBullet' my='spacer15'>
              <List.LI>
                <Text textStyle='bodyEmph' mb='5px'>
                  IKEA Coquitlam
                </Text>
                <small>1000 Lougheed Highway, Coquitlam</small>
              </List.LI>
              <MenuList.HR />
              <List.LI>
                <Text textStyle='bodyEmph' mb='5px'>
                  IKEA Richmond
                </Text>
                <small>3320 Jacombs Road, Richmond</small>
              </List.LI>
            </List.UL>
          )}

          {showAddress && <EchartsProjects />}
        </Box>
        <Box textStyle='bodyRegular'>
          <Wrapper>
            <DatePicker
              endDate={40}
              getSelectedDay={selectedDay}
              labelFormat={'MMMM'}
              color={'#111'}
            />
          </Wrapper>
        </Box>
      </Grid>
    </Box>
  )
}

const Wrapper = styled(Box)`
  white-space: nowrap;
  padding: 0rem 6rem;
`
